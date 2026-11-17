export class RecordedEngine {
  constructor(basePath = './public/assets/audio/en') {
    this.basePath = basePath;
    this.cache = new Map();
    this.currentAudio = null;
    this.volume = 0.8;
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, Number(vol) || 0));
    if (this.currentAudio) {
      this.currentAudio.volume = this.volume;
    }
  }

  cancel() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch {
        // Ignore
      }
      this.currentAudio = null;
    }
  }

  /**
   * Plays a recorded audio file if available, or resolves false so AudioManager can fall back to SpeechEngine.
   * @param {string} category - e.g. 'nouns', 'verbs', 'phrases'
   * @param {string} audioId - e.g. 'apple', 'jump', 'great_job'
   */
  play(category, audioId) {
    return new Promise((resolve) => {
      if (typeof Audio === 'undefined' || !audioId) {
        resolve(false);
        return;
      }

      const path = `${this.basePath}/${category}/${audioId}.mp3`;
      try {
        this.cancel();
        const audio = new Audio(path);
        audio.volume = this.volume;
        this.currentAudio = audio;

        audio.onended = () => {
          this.currentAudio = null;
          resolve(true);
        };
        audio.onerror = () => {
          this.currentAudio = null;
          resolve(false);
        };

        const playPromise = audio.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {
            this.currentAudio = null;
            resolve(false);
          });
        }
      } catch {
        resolve(false);
      }
    });
  }
}
