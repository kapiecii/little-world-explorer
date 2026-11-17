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
    onUIModalStateChange
  }) {
    this.eventBus = eventBus;
    this.saveManager = saveManager;
    this.onStartNewGame = onStartNewGame;
    this.onContinueGame = onContinueGame;
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
    this.btnQuickLang = document.getElementById('quick-lang-btn');

    this.btnOpenMissions = document.getElementById('open-missions-btn');
    this.btnOpenWordBook = document.getElementById('open-wordbook-btn');
    this.btnCloseMissionModal = document.getElementById('close-mission-modal-btn');

    this.inGame = false;
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
