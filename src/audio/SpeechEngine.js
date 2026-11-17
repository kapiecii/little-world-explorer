import { Config } from '../core/Config.js';

const EXCLUDED_VOICE_PATTERN =
  /kyoko|otoya|hattori|o-ren|oren|japanese|日本語|albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|hysterical|jester|organ|princess|ralph|superstar|trinoids|whisper|wobble|zarvox|fred|junior|kathy/i;

const TIER1_VOICE_PATTERN =
  /google us english|samantha|ava|allison|microsoft aria|microsoft jenny|microsoft ana|microsoft guy|microsoft zira|microsoft david|microsoft mark|alex|victoria/i;

const TIER2_VOICE_PATTERN =
  /google uk english|microsoft hazel|microsoft george|microsoft susan|microsoft catherine|microsoft james|microsoft linda|microsoft richard|karen|daniel|moira|tessa|serena|flo|sandy|shelley|reed/i;

export class SpeechEngine {
  constructor() {
    this.available =
      typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      'SpeechSynthesisUtterance' in window;

    this.language = Config.AUDIO.DEFAULT_LANG;
    this.rate = Config.AUDIO.SPEECH_RATE;
    this.pitch = Config.AUDIO.SPEECH_PITCH;
    this.volume = Config.AUDIO.DEFAULT_VOLUME;

    this.preferredVoice = null;
    this.selectedVoiceURI = null; // Optional user-pinned voiceURI
    this.englishVoices = [];
    this.isSpeaking = false;
    this._speakTimeout = null;

    if (this.available) {
      this._initVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          this._initVoices();
        };
      }
    }
  }

  _scoreVoice(voice) {
    const langRaw = (voice.lang || '').replace('_', '-').toLowerCase();
    const label = `${voice.name || ''} ${voice.voiceURI || ''}`;

    if (!langRaw.startsWith('en')) return -1000;
    if (EXCLUDED_VOICE_PATTERN.test(label)) return -500;

    let score = 10;

    if (TIER1_VOICE_PATTERN.test(label)) {
      score += 100;
    } else if (TIER2_VOICE_PATTERN.test(label)) {
      score += 75;
    }

    if (langRaw === 'en-us') {
      score += 35;
    } else if (langRaw === 'en-gb' || langRaw === 'en-au' || langRaw === 'en-ca') {
      score += 20;
    }

    if (/enhanced|premium|natural|online/i.test(label)) {
      score += 25;
    }

    return score;
  }

  _initVoices() {
    if (!this.available) return [];
    try {
      const allVoices = window.speechSynthesis.getVoices() || [];
      if (allVoices.length === 0) return [];

      // Filter and sort genuine English voices by quality score
      const scored = allVoices
        .map(v => ({ voice: v, score: this._scoreVoice(v) }))
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score);

      this.englishVoices = scored.map(s => s.voice);

      if (this.selectedVoiceURI) {
        const pinned = this.englishVoices.find(
          v => v.voiceURI === this.selectedVoiceURI || v.name === this.selectedVoiceURI
        );
        if (pinned) {
          this.preferredVoice = pinned;
          return this.englishVoices;
        }
      }

      this.preferredVoice = this.englishVoices[0] || null;
      return this.englishVoices;
    } catch {
      this.preferredVoice = null;
      return [];
    }
  }

  async _ensureVoicesLoaded() {
    if (!this.available) return;
    if (this.preferredVoice && this.englishVoices.length > 0) return;

    this._initVoices();
    if (this.preferredVoice) return;

    // Wait up to 450ms if browser loads voices asynchronously on startup
    await new Promise((resolve) => {
      let elapsed = 0;
      const timer = setInterval(() => {
        this._initVoices();
        elapsed += 50;
        if (this.preferredVoice || elapsed >= 450) {
          clearInterval(timer);
          resolve();
        }
      }, 50);
    });
  }

  getEnglishVoices() {
    if (this.englishVoices.length === 0) {
      this._initVoices();
    }
    return this.englishVoices;
  }

  setVoiceByURI(voiceURI) {
    this.selectedVoiceURI = voiceURI || null;
    this._initVoices();
  }

  getCurrentVoice() {
    if (!this.preferredVoice) {
      this._initVoices();
    }
    return this.preferredVoice;
  }

  isAvailable() {
    return this.available;
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, Number(vol) || 0));
  }

  cancel() {
    if (!this.available) return;
    if (this._speakTimeout) {
      clearTimeout(this._speakTimeout);
      this._speakTimeout = null;
    }
    try {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
    } catch {
      // Ignore environment errors
    }
  }

  async speak(text, options = {}) {
    if (!this.available || !text) {
      return false;
    }

    await this._ensureVoicesLoaded();

    return new Promise((resolve) => {
      try {
        if (this._speakTimeout) {
          clearTimeout(this._speakTimeout);
          this._speakTimeout = null;
        }

        const wasSpeaking = window.speechSynthesis.speaking || window.speechSynthesis.pending;
        if (options.interrupt !== false && wasSpeaking) {
          window.speechSynthesis.cancel();
        }

        // Delay slightly after cancel() to prevent macOS Chrome/Safari from dropping utterance.voice
        const startDelay = wasSpeaking ? 25 : 0;

        this._speakTimeout = setTimeout(() => {
          this._speakTimeout = null;
          try {
            const utterance = new SpeechSynthesisUtterance(text);

            const voice = this.getCurrentVoice();
            if (voice) {
              utterance.voice = voice;
              // Match the voice's exact lang tag (e.g. en-US or en_US) so Safari/Chrome doesn't fall back to OS Japanese voice
              utterance.lang = voice.lang || this.language;
            } else {
              utterance.lang = options.lang || this.language;
            }

            utterance.rate = options.rate || this.rate;
            utterance.pitch = options.pitch || this.pitch;
            utterance.volume = options.volume !== undefined ? options.volume : this.volume;

            this.isSpeaking = true;

            utterance.onend = () => {
              this.isSpeaking = false;
              resolve(true);
            };

            utterance.onerror = () => {
              this.isSpeaking = false;
              resolve(false);
            };

            window.speechSynthesis.speak(utterance);
          } catch {
            this.isSpeaking = false;
            resolve(false);
          }
        }, startDelay);
      } catch {
        this.isSpeaking = false;
        resolve(false);
      }
    });
  }
}
