import { LearningEvents } from '../learning/LearningEvents.js';
import { AudioPriority } from '../audio/AudioManager.js';
import { SpeechEngine } from '../audio/SpeechEngine.js';

export class SettingsUI {
  constructor(eventBus, saveManager, initialSettings = {}) {
    this.eventBus = eventBus;
    this.saveManager = saveManager;
    this.settings = { ...initialSettings };
    this.voiceHelper = new SpeechEngine();

    this.modalEl = document.getElementById('settings-modal');
    this.langEnBtn = document.getElementById('set-lang-en');
    this.langJaBtn = document.getElementById('set-lang-ja');
    this.voiceToggleBtn = document.getElementById('set-voice-toggle');
    this.voiceSelectEl = document.getElementById('set-voice-select');
    this.voiceTestBtn = document.getElementById('set-voice-test-btn');
    this.volumeRange = document.getElementById('set-voice-volume');
    this.volumeValueEl = document.getElementById('set-voice-volume-val');
    this.bgmToggleBtn = document.getElementById('set-bgm-toggle');
    this.sfxToggleBtn = document.getElementById('set-sfx-toggle');
    this.level1Btn = document.getElementById('set-level-1');
    this.level2Btn = document.getElementById('set-level-2');
    this.level3Btn = document.getElementById('set-level-3');

    this._bindEvents();
    this.populateVoiceList();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.addEventListener?.('voiceschanged', () => {
        this.populateVoiceList();
      });
    }
    this.syncControls();
  }

  populateVoiceList() {
    if (!this.voiceSelectEl) return;
    const voices = this.voiceHelper.getEnglishVoices();
    const currentVal = this.settings.voiceURI || '';

    this.voiceSelectEl.innerHTML = '';
    const autoOpt = document.createElement('option');
    autoOpt.value = '';
    const bestName = voices[0] ? `Auto (${voices[0].name})` : 'Auto (Native English)';
    autoOpt.textContent = bestName;
    this.voiceSelectEl.appendChild(autoOpt);

    for (const v of voices) {
      const opt = document.createElement('option');
      opt.value = v.voiceURI || v.name;
      opt.textContent = `${v.name} (${v.lang})`;
      this.voiceSelectEl.appendChild(opt);
    }

    this.voiceSelectEl.value = currentVal;
  }

  _bindEvents() {
    this.langEnBtn?.addEventListener('click', () => this.updateSetting({ language: 'en' }));
    this.langJaBtn?.addEventListener('click', () => this.updateSetting({ language: 'ja' }));

    this.voiceToggleBtn?.addEventListener('click', () => {
      this.updateSetting({ voiceEnabled: !this.settings.voiceEnabled });
    });

    this.voiceSelectEl?.addEventListener('change', (e) => {
      this.updateSetting({ voiceURI: e.target.value || '' });
    });

    this.voiceTestBtn?.addEventListener('click', () => {
      if (this.eventBus) {
        this.eventBus.emit(LearningEvents.SPEAK_REQUESTED, {
          text: 'Hello! Welcome to Little World Explorer! Let us find a red apple!',
          priority: AudioPriority.HIGH,
          force: true
        });
      }
    });

    this.volumeRange?.addEventListener('input', (e) => {
      const val = Number(e.target.value) / 100;
      this.updateSetting({ voiceVolume: val });
    });

    this.bgmToggleBtn?.addEventListener('click', () => {
      this.updateSetting({ bgmEnabled: !this.settings.bgmEnabled });
    });

    this.sfxToggleBtn?.addEventListener('click', () => {
      this.updateSetting({ sfxEnabled: !this.settings.sfxEnabled });
    });

    this.level1Btn?.addEventListener('click', () => this.updateSetting({ learningLevel: 1 }));
    this.level2Btn?.addEventListener('click', () => this.updateSetting({ learningLevel: 2 }));
    this.level3Btn?.addEventListener('click', () => this.updateSetting({ learningLevel: 3 }));
  }

  updateSetting(partial) {
    this.settings = { ...this.settings, ...partial };
    if (this.saveManager) {
      this.saveManager.saveSettings(this.settings);
    }
    this.syncControls();
    if (this.eventBus) {
      this.eventBus.emit(LearningEvents.SETTINGS_CHANGED, { ...this.settings });
    }
  }

  syncControls() {
    if (this.langEnBtn && this.langJaBtn) {
      this.langEnBtn.classList.toggle('active', this.settings.language === 'en');
      this.langJaBtn.classList.toggle('active', this.settings.language === 'ja');
    }

    if (this.voiceToggleBtn) {
      this.voiceToggleBtn.textContent = this.settings.voiceEnabled ? '🔊 ON' : '🔇 OFF';
      this.voiceToggleBtn.classList.toggle('active', Boolean(this.settings.voiceEnabled));
    }

    if (this.voiceSelectEl && this.settings.voiceURI !== undefined) {
      this.voiceSelectEl.value = this.settings.voiceURI || '';
    }

    if (this.volumeRange) {
      const pct = Math.round((this.settings.voiceVolume ?? 0.8) * 100);
      this.volumeRange.value = String(pct);
      if (this.volumeValueEl) {
        this.volumeValueEl.textContent = `${pct}%`;
      }
    }

    if (this.bgmToggleBtn) {
      this.bgmToggleBtn.textContent = this.settings.bgmEnabled ? '🎵 ON' : '🔇 OFF';
      this.bgmToggleBtn.classList.toggle('active', Boolean(this.settings.bgmEnabled));
    }

    if (this.sfxToggleBtn) {
      this.sfxToggleBtn.textContent = this.settings.sfxEnabled ? '🔔 ON' : '🔇 OFF';
      this.sfxToggleBtn.classList.toggle('active', Boolean(this.settings.sfxEnabled));
    }

    const lvl = Number(this.settings.learningLevel) || 1;
    this.level1Btn?.classList.toggle('active', lvl === 1);
    this.level2Btn?.classList.toggle('active', lvl === 2);
    this.level3Btn?.classList.toggle('active', lvl === 3);
  }

  getSettings() {
    return { ...this.settings };
  }
}
