import { HUD } from './HUD.js';
import { MissionUI } from './MissionUI.js';
import { SettingsUI } from './SettingsUI.js';

export class UIManager {
  constructor({
    eventBus,
    inventoryManager,
    learningManager,
    missionManager,
    vocabularyManager,
    saveManager,
    initialSettings,
    onStartNewGame,
    onContinueGame,
    onResetWorldObjects,
    onExportSave,
    onImportSave,
    onUIModalStateChange
  }) {
    this.eventBus = eventBus;
    this.saveManager = saveManager;
    this.onStartNewGame = onStartNewGame;
    this.onContinueGame = onContinueGame;
    this.onResetWorldObjects = onResetWorldObjects;
    this.onExportSave = onExportSave;
    this.onImportSave = onImportSave;
    this.onUIModalStateChange = onUIModalStateChange;

    this.hud = new HUD(eventBus, inventoryManager, learningManager, initialSettings);
    this.missionUI = new MissionUI(
      eventBus,
      missionManager,
      vocabularyManager,
      initialSettings,
      () => this.closeMissionModal()
    );
    this.settingsUI = new SettingsUI(eventBus, saveManager, initialSettings);

    this.titleScreenEl = document.getElementById('title-screen');
    this.hudScreenEl = document.getElementById('hud-screen');
    this.settingsModalEl = document.getElementById('settings-modal');
    this.missionModalEl = document.getElementById('mission-modal');

    this.btnStartNew = document.getElementById('btn-start-game');
    this.btnContinue = document.getElementById('btn-continue-game');
    this.btnTitleSettings = document.getElementById('btn-title-settings');

    this.btnOpenSettings = document.getElementById('open-settings-btn');
    this.btnCloseSettings = document.getElementById('close-settings-btn');
    this.btnBackToTitle = document.getElementById('back-to-title-btn');
    this.resetObjectsRowEl = document.getElementById('setting-row-reset-objects');
    this.btnResetWorldObjects = document.getElementById('reset-world-objects-btn');
    this.btnExportSave = document.getElementById('export-save-btn');
    this.btnImportSave = document.getElementById('import-save-btn');
    this.importSaveFileInput = document.getElementById('import-save-file-input');
    this.btnQuickLang = document.getElementById('quick-lang-btn');

    this.btnOpenMissions = document.getElementById('open-missions-btn');
    this.btnOpenWordBook = document.getElementById('open-wordbook-btn');
    this.btnCloseMissionModal = document.getElementById('close-mission-modal-btn');

    this.inGame = false;
    this._resetFeedbackTimer = null;
    this._exportFeedbackTimer = null;
    this._importFeedbackTimer = null;
    this._bindEvents();
  }

  _bindEvents() {
    this.btnStartNew?.addEventListener('click', () => {
      this.hideTitleScreen();
      if (this.onStartNewGame) this.onStartNewGame();
    });

    this.btnContinue?.addEventListener('click', () => {
      this.hideTitleScreen();
      if (this.onContinueGame) this.onContinueGame();
    });

    this.btnTitleSettings?.addEventListener('click', () => {
      this.openSettingsModal();
    });

    this.btnOpenSettings?.addEventListener('click', () => {
      this.openSettingsModal();
    });

    this.btnCloseSettings?.addEventListener('click', () => {
      this.closeSettingsModal();
    });

    this.btnBackToTitle?.addEventListener('click', () => {
      this.closeSettingsModal();
      this.showTitleScreen();
    });

    this.btnResetWorldObjects?.addEventListener('click', async () => {
      if (!this.inGame || !this.onResetWorldObjects) return;
      await this.onResetWorldObjects();
      this.btnResetWorldObjects.classList.add('active');
      this.btnResetWorldObjects.textContent = '✅ Reset! (もどしました)';
      clearTimeout(this._resetFeedbackTimer);
      this._resetFeedbackTimer = setTimeout(() => {
        this.btnResetWorldObjects.textContent = '🔄 Reset Objects (初期状態に戻す)';
        this.btnResetWorldObjects.classList.remove('active');
      }, 1800);
    });

    this.btnExportSave?.addEventListener('click', async () => {
      if (!this.onExportSave) return;
      const res = await this.onExportSave();
      clearTimeout(this._exportFeedbackTimer);
      if (res?.ok) {
        this.btnExportSave.classList.add('active');
        this.btnExportSave.textContent = '✅ Exported! (書き出し完了)';
      } else {
        this.btnExportSave.textContent = '⚠️ No Save (データなし)';
      }
      this._exportFeedbackTimer = setTimeout(() => {
        this.btnExportSave.textContent = '⬇️ Export (書き出し)';
        this.btnExportSave.classList.remove('active');
      }, 2000);
    });

    this.btnImportSave?.addEventListener('click', () => {
      this.importSaveFileInput?.click();
    });

    this.importSaveFileInput?.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      e.target.value = '';
      if (!file || !this.onImportSave) return;

      let text = '';
      try {
        text = await file.text();
      } catch {
        text = '';
      }

      const res = await this.onImportSave(text);
      clearTimeout(this._importFeedbackTimer);
      if (res?.ok) {
        this.btnImportSave.classList.add('active');
        this.btnImportSave.textContent = '✅ Imported! (読み込み完了)';
      } else {
        this.btnImportSave.textContent = '❌ Invalid File (読み込み失敗)';
      }
      this._importFeedbackTimer = setTimeout(() => {
        this.btnImportSave.textContent = '⬆️ Import (読み込み)';
        this.btnImportSave.classList.remove('active');
      }, 2200);
    });

    this.btnQuickLang?.addEventListener('click', () => {
      const current = this.settingsUI.getSettings().language;
      const next = current === 'en' ? 'ja' : 'en';
      this.settingsUI.updateSetting({ language: next });
      this._updateQuickLangLabel(next);
    });

    this.btnOpenMissions?.addEventListener('click', () => {
      this.missionUI.switchTab('missions');
      this.openMissionModal();
    });

    this.btnOpenWordBook?.addEventListener('click', () => {
      this.missionUI.switchTab('wordbook');
      this.openMissionModal();
    });

    this.btnCloseMissionModal?.addEventListener('click', () => {
      this.closeMissionModal();
    });

    // Esc key toggles Settings / Menu and releases pointer lock (Section 3.3)
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && this.inGame) {
        if (document.pointerLockElement) {
          document.exitPointerLock();
        }
        if (!this.missionModalEl?.classList.contains('hidden')) {
          this.closeMissionModal();
        } else if (!this.settingsModalEl?.classList.contains('hidden')) {
          this.closeSettingsModal();
        } else {
          this.openSettingsModal();
        }
      }
    });

    this._updateQuickLangLabel(this.settingsUI.getSettings().language);
  }

  _updateQuickLangLabel(lang) {
    if (!this.btnQuickLang) return;
    this.btnQuickLang.textContent = lang === 'ja' ? '🌐 EN / 日本語' : '🌐 English Only';
  }

  async refreshContinueButton() {
    if (!this.btnContinue || !this.saveManager) return;
    const hasSave = await this.saveManager.hasSaveData();
    this.btnContinue.disabled = !hasSave;
    this.btnContinue.classList.toggle('hidden', !hasSave);
  }

  showTitleScreen() {
    this.inGame = false;
    this.titleScreenEl?.classList.remove('hidden');
    this.hudScreenEl?.classList.add('hidden');
    this.refreshContinueButton();
    this._notifyModalState();
  }

  hideTitleScreen() {
    this.inGame = true;
    this.titleScreenEl?.classList.add('hidden');
    this.hudScreenEl?.classList.remove('hidden');
    this._notifyModalState();
  }

  openSettingsModal() {
    this.resetObjectsRowEl?.classList.toggle('hidden', !this.inGame);
    this.settingsModalEl?.classList.remove('hidden');
    this._notifyModalState();
  }

  closeSettingsModal() {
    this.settingsModalEl?.classList.add('hidden');
    this._notifyModalState();
  }

  openMissionModal() {
    this.missionUI.renderModalContent();
    this.missionModalEl?.classList.remove('hidden');
    this._notifyModalState();
  }

  closeMissionModal() {
    this.missionModalEl?.classList.add('hidden');
    this._notifyModalState();
  }

  isAnyModalOpen() {
    const titleVisible = !this.titleScreenEl?.classList.contains('hidden');
    const settingsVisible = !this.settingsModalEl?.classList.contains('hidden');
    const missionVisible = !this.missionModalEl?.classList.contains('hidden');
    return Boolean(titleVisible || settingsVisible || missionVisible);
  }

  _notifyModalState() {
    const gameplayActive = this.inGame && !this.isAnyModalOpen();
    if (gameplayActive && document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
    if (this.onUIModalStateChange) {
      this.onUIModalStateChange(gameplayActive);
    }
  }
}
