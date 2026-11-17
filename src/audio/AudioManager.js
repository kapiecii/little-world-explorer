import { Config } from '../core/Config.js';
import { LearningEvents } from '../learning/LearningEvents.js';
import { SpeechEngine } from './SpeechEngine.js';
import { RecordedEngine } from './RecordedEngine.js';

export const AudioPriority = {
  LOW: 1,
  NORMAL: 2,
  HIGH: 3
};

export class AudioManager {
  constructor(eventBus, settings = {}) {
    this.eventBus = eventBus;
    this.speechEngine = new SpeechEngine();
    this.recordedEngine = new RecordedEngine();

    this.enabled = settings.voiceEnabled ?? Config.SETTINGS_DEFAULT.voiceEnabled;
    this.voiceVolume = settings.voiceVolume ?? Config.SETTINGS_DEFAULT.voiceVolume;
    this.sfxEnabled = settings.sfxEnabled ?? Config.SETTINGS_DEFAULT.sfxEnabled;
    this.bgmEnabled = settings.bgmEnabled ?? Config.SETTINGS_DEFAULT.bgmEnabled;
    this.language = Config.AUDIO.DEFAULT_LANG;

    this.speechEngine.setVolume(this.voiceVolume);
    this.recordedEngine.setVolume(this.voiceVolume);
    if (settings.voiceURI) {
      this.speechEngine.setVoiceByURI(settings.voiceURI);
    }

    this.currentPriority = 0;
    this.isPlayingVoice = false;
    this.queue = [];
    this.recentSpoken = new Map(); // text -> timestamp
    this.cooldownMs = 2000;

    this.audioCtx = null;
    this.bgmTimer = null;

    this._bindEvents();
  }

  _bindEvents() {
    if (!this.eventBus) return;

    this.eventBus.on(LearningEvents.SPEAK_REQUESTED, (payload) => {
      this.speak(payload.text, {
        priority: payload.priority ?? AudioPriority.NORMAL,
        force: payload.force ?? false,
        category: payload.category,
        audioId: payload.audioId
      });
    });

    this.eventBus.on(LearningEvents.SFX_REQUESTED, (payload) => {
      this.playSfx(payload.type);
    });

    this.eventBus.on(LearningEvents.SETTINGS_CHANGED, (settings) => {
      this.applySettings(settings);
    });
  }

  applySettings(settings = {}) {
    if (settings.voiceEnabled !== undefined) {
      this.enabled = Boolean(settings.voiceEnabled);
      if (!this.enabled) {
        this.speechEngine.cancel();
        this.recordedEngine.cancel();
        this.queue = [];
      }
    }
    if (settings.voiceVolume !== undefined) {
      this.voiceVolume = Number(settings.voiceVolume);
      this.speechEngine.setVolume(this.voiceVolume);
      this.recordedEngine.setVolume(this.voiceVolume);
    }
    if (settings.voiceURI !== undefined) {
      this.speechEngine.setVoiceByURI(settings.voiceURI);
    }
    if (settings.sfxEnabled !== undefined) {
      this.sfxEnabled = Boolean(settings.sfxEnabled);
    }
    if (settings.bgmEnabled !== undefined) {
      this.bgmEnabled = Boolean(settings.bgmEnabled);
      if (!this.bgmEnabled) {
        this.stopBgm();
      } else if (this.audioCtx) {
        this.startBgm();
      }
    }
  }

  unlockAudio() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        try {
          this.audioCtx = new AudioContextClass();
        } catch {
          this.audioCtx = null;
        }
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    if (this.bgmEnabled) {
      this.startBgm();
    }
  }

  speak(text, options = {}) {
    if (!this.enabled || !text) return false;

    const priority = options.priority ?? AudioPriority.NORMAL;
    const force = Boolean(options.force);
    const now = Date.now();

    // Duplicate suppression for automatic triggers
    if (!force) {
      const lastTime = this.recentSpoken.get(text) || 0;
      if (now - lastTime < this.cooldownMs) {
        return false;
      }
    }

    this.recentSpoken.set(text, now);

    // If currently speaking:
    // - Higher or equal priority with force interrupts immediately
    // - Lower priority while busy is dropped if LOW, or queued if NORMAL
    if (this.isPlayingVoice) {
      if (priority > this.currentPriority || force) {
        this.speechEngine.cancel();
        this.recordedEngine.cancel();
        this.queue = [];
        this._executeSpeak(text, priority);
        return true;
      } else if (priority === AudioPriority.LOW) {
        return false;
      } else {
        if (this.queue.length < 2) {
          this.queue.push({ text, priority });
        }
        return true;
      }
    }

    this._executeSpeak(text, priority);
    return true;
  }

  async _executeSpeak(text, priority) {
    this.isPlayingVoice = true;
    this.currentPriority = priority;

    await this.speechEngine.speak(text, {
      lang: this.language,
      volume: this.voiceVolume,
      interrupt: true
    });

    this.isPlayingVoice = false;
    this.currentPriority = 0;

    if (this.queue.length > 0 && this.enabled) {
      const next = this.queue.shift();
      this._executeSpeak(next.text, next.priority);
    }
  }

  playSfx(type) {
    if (!this.sfxEnabled) return;
    this.unlockAudio();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    try {
      if (type === 'jump') {
        this._playTone(ctx, 280, 520, 0.16, 'sine', 0.14);
      } else if (type === 'collect') {
        this._playNote(ctx, 587.33, now, 0.09, 'triangle', 0.18);
        this._playNote(ctx, 880.0, now + 0.09, 0.16, 'triangle', 0.18);
      } else if (type === 'place') {
        this._playTone(ctx, 220, 330, 0.09, 'triangle', 0.15);
      } else if (type === 'break') {
        this._playTone(ctx, 190, 110, 0.12, 'sawtooth', 0.12);
      } else if (type === 'select') {
        this._playNote(ctx, 659.25, now, 0.07, 'sine', 0.12);
      } else if (type === 'water') {
        this._playTone(ctx, 420, 660, 0.18, 'sine', 0.14);
      } else if (type === 'mission_complete') {
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          this._playNote(ctx, freq, now + idx * 0.11, 0.2, 'triangle', 0.2);
        });
      }
    } catch {
      // Ignore WebAudio errors
    }
  }

  _playTone(ctx, startFreq, endFreq, duration, oscType, gainVal) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = oscType;
    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(Math.max(40, endFreq), ctx.currentTime + duration);

    gain.gain.setValueAtTime(gainVal, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }

  _playNote(ctx, freq, startTime, duration, oscType, gainVal) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = oscType;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(gainVal, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  startBgm() {
    if (this.bgmTimer || !this.bgmEnabled || !this.audioCtx) return;
    // Gentle, soft marimba-like lullaby notes in C major pentatonic
    const melody = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 392.0, 329.63];
    let step = 0;
    this.bgmTimer = setInterval(() => {
      if (!this.bgmEnabled || !this.audioCtx || this.audioCtx.state !== 'running') return;
      const freq = melody[step % melody.length];
      step++;
      this._playNote(this.audioCtx, freq, this.audioCtx.currentTime, 0.45, 'sine', 0.025);
    }, 1400);
  }

  stopBgm() {
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }
}
