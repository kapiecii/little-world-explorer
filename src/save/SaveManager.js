import { Config } from '../core/Config.js';
import { LearningEvents } from '../learning/LearningEvents.js';

export class SaveManager {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.dbName = Config.SAVE.DB_NAME;
    this.dbVersion = Config.SAVE.DB_VERSION;
    this.storeName = Config.SAVE.STORE_NAME;
    this.saveKey = Config.SAVE.SAVE_KEY;
    this.settingsKey = Config.SAVE.SETTINGS_STORAGE_KEY;

    this.db = null;
    this.memoryFallback = new Map();
    this.debounceTimer = null;
    this.autoSaveTimer = null;
    this.stateProvider = null;
  }

  async init() {
    if (typeof indexedDB === 'undefined') {
      return false;
    }

    return new Promise((resolve) => {
      try {
        const req = indexedDB.open(this.dbName, this.dbVersion);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName, { keyPath: 'id' });
          }
        };
        req.onsuccess = (e) => {
          this.db = e.target.result;
          resolve(true);
        };
        req.onerror = () => {
          resolve(false);
        };
      } catch {
        resolve(false);
      }
    });
  }

  setStateProvider(fn) {
    this.stateProvider = fn;
  }

  startAutoSave() {
    this.stopAutoSave();
    this.autoSaveTimer = setInterval(() => {
      this.triggerSave('auto_interval');
    }, Config.SAVE.AUTO_SAVE_INTERVAL_MS);
  }

  stopAutoSave() {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
  }

  requestSaveDebounced(delayMs = 500) {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = setTimeout(() => {
      this.triggerSave('debounced');
    }, delayMs);
  }

  async triggerSave(reason = 'manual') {
    if (!this.stateProvider) return false;
    const state = this.stateProvider();
    return this.saveGame(state, reason);
  }

  async saveGame(stateData, reason = 'manual') {
    if (!stateData) return false;
    const now = Date.now();
    const record = {
      id: this.saveKey,
      version: Config.VERSION,
      world: {
        id: this.saveKey,
        currentStageId: stateData.world?.currentStageId || 'island',
        blocks: stateData.world?.blocks || [],
        farmPlots: stateData.world?.farmPlots || [],
        collectedObjectIds: stateData.world?.collectedObjectIds || [],
        stages: stateData.world?.stages || {},
        createdAt: stateData.world?.createdAt || now,
        updatedAt: now
      },
      player: {
        position: stateData.player?.position || [...Config.PLAYER.START_POS],
        inventory: stateData.player?.inventory || []
      },
      learning: {
        discoveredWords: stateData.learning?.discoveredWords || [],
        wordCounts: stateData.learning?.wordCounts || {},
        completedMissions: stateData.learning?.completedMissions || [],
        activeMissionId: stateData.learning?.activeMissionId || null,
        progress: stateData.learning?.progress || {}
      },
      settings: stateData.settings || this.loadSettings()
    };

    if (stateData.settings) {
      this.saveSettings(stateData.settings);
    }

    // Also store in memory fallback and localStorage backup
    this.memoryFallback.set(this.saveKey, record);
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`${this.saveKey}_backup`, JSON.stringify(record));
      }
    } catch {
      // Ignore quota errors
    }

    if (!this.db) {
      await this.init();
    }

    if (this.db) {
      await new Promise((resolve) => {
        try {
          const tx = this.db.transaction([this.storeName], 'readwrite');
          const store = tx.objectStore(this.storeName);
          store.put(record);
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        } catch {
          resolve(false);
        }
      });
    }

    if (this.eventBus) {
      this.eventBus.emit(LearningEvents.SAVE_COMPLETED, { reason, timestamp: now });
    }
    return true;
  }

  async loadGame() {
    if (!this.db) {
      await this.init();
    }

    if (this.db) {
      const fromDb = await new Promise((resolve) => {
        try {
          const tx = this.db.transaction([this.storeName], 'readonly');
          const store = tx.objectStore(this.storeName);
          const req = store.get(this.saveKey);
          req.onsuccess = () => resolve(req.result || null);
          req.onerror = () => resolve(null);
        } catch {
          resolve(null);
        }
      });
      if (fromDb) return fromDb;
    }

    if (this.memoryFallback.has(this.saveKey)) {
      return this.memoryFallback.get(this.saveKey);
    }

    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(`${this.saveKey}_backup`);
        if (raw) return JSON.parse(raw);
      }
    } catch {
      // Ignore
    }

    return null;
  }

  async hasSaveData() {
    const data = await this.loadGame();
    return Boolean(data && data.world);
  }

  validateSaveData(data) {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return { valid: false, error: 'Invalid save format: expected JSON object' };
    }
    if (!data.world || typeof data.world !== 'object') {
      return { valid: false, error: 'Invalid save format: missing world data' };
    }
    if (data.world.blocks !== undefined && !Array.isArray(data.world.blocks)) {
      return { valid: false, error: 'Invalid save format: world.blocks must be an array' };
    }
    if (data.player !== undefined && (typeof data.player !== 'object' || data.player === null)) {
      return { valid: false, error: 'Invalid save format: invalid player data' };
    }
    if (data.learning !== undefined && (typeof data.learning !== 'object' || data.learning === null)) {
      return { valid: false, error: 'Invalid save format: invalid learning data' };
    }
    return { valid: true };
  }

  async exportSaveJson(overrideState = null) {
    let record = null;
    if (overrideState) {
      await this.saveGame(overrideState, 'export');
      record = await this.loadGame();
    } else {
      record = await this.loadGame();
    }
    if (!record || !record.world) {
      return null;
    }

    const exportPayload = {
      app: 'little-world-explorer',
      exportedAt: new Date().toISOString(),
      version: record.version || Config.VERSION,
      world: record.world,
      player: record.player,
      learning: record.learning,
      settings: record.settings || this.loadSettings()
    };

    return JSON.stringify(exportPayload, null, 2);
  }

  async importSaveJson(jsonText) {
    if (typeof jsonText !== 'string' || !jsonText.trim()) {
      return { ok: false, error: 'Empty save file' };
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      return { ok: false, error: 'Invalid JSON file' };
    }

    const check = this.validateSaveData(parsed);
    if (!check.valid) {
      return { ok: false, error: check.error };
    }

    const savedOk = await this.saveGame(parsed, 'import');
    if (!savedOk) {
      return { ok: false, error: 'Failed to persist imported save' };
    }

    const loaded = await this.loadGame();
    return { ok: true, data: loaded };
  }

  async clearSave() {
    this.memoryFallback.delete(this.saveKey);
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(`${this.saveKey}_backup`);
      }
    } catch {
      // Ignore
    }
    if (this.db) {
      await new Promise((resolve) => {
        try {
          const tx = this.db.transaction([this.storeName], 'readwrite');
          tx.objectStore(this.storeName).delete(this.saveKey);
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        } catch {
          resolve(false);
        }
      });
    }
  }

  saveSettings(settings) {
    const merged = { ...Config.SETTINGS_DEFAULT, ...this.loadSettings(), ...settings };
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.settingsKey, JSON.stringify(merged));
      }
    } catch {
      // Ignore
    }
    this.memoryFallback.set(this.settingsKey, merged);
    return merged;
  }

  loadSettings() {
    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(this.settingsKey);
        if (raw) {
          return { ...Config.SETTINGS_DEFAULT, ...JSON.parse(raw) };
        }
      }
    } catch {
      // Ignore
    }
    if (this.memoryFallback.has(this.settingsKey)) {
      return { ...Config.SETTINGS_DEFAULT, ...this.memoryFallback.get(this.settingsKey) };
    }
    return { ...Config.SETTINGS_DEFAULT };
  }
}
