import { LearningEvents } from '../learning/LearningEvents.js';

export class HUD {
  constructor(eventBus, inventoryManager, learningManager, settings = {}) {
    this.eventBus = eventBus;
    this.inventoryManager = inventoryManager;
    this.learningManager = learningManager;
    this.language = settings.language || 'en';

    this.wordBannerEl = document.getElementById('word-banner');
    this.wordIconEl = document.getElementById('word-banner-icon');
    this.wordTextEl = document.getElementById('word-banner-text');
    this.wordSubEl = document.getElementById('word-banner-sub');
    this.speakBtnEl = document.getElementById('word-speak-btn');
    this.inventoryBarEl = document.getElementById('inventory-bar');
    this.saveIndicatorEl = document.getElementById('save-indicator');
    this.breakProgressEl = document.getElementById('break-progress-ring');

    this._bindEvents();
    this.renderInventory(
      this.inventoryManager ? this.inventoryManager.getSlots() : [],
      this.inventoryManager ? this.inventoryManager.selectedSlot : 0
    );
  }

  _bindEvents() {
    if (this.speakBtnEl) {
      this.speakBtnEl.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.learningManager) {
          this.learningManager.speakCurrentWord();
        }
      });
    }

    if (!this.eventBus) return;

    this.eventBus.on(LearningEvents.WORD_BANNER_UPDATED, (banner) => {
      this.renderWordBanner(banner);
    });

    this.eventBus.on(LearningEvents.INVENTORY_UPDATED, ({ slots, selectedSlot }) => {
      this.renderInventory(slots, selectedSlot);
    });

    this.eventBus.on(LearningEvents.SETTINGS_CHANGED, (settings) => {
      if (settings.language) {
        this.language = settings.language;
        if (this.learningManager?.currentWordBanner) {
          this.renderWordBanner(this.learningManager.currentWordBanner);
        }
        if (this.inventoryManager) {
          this.renderInventory(this.inventoryManager.getSlots(), this.inventoryManager.selectedSlot);
        }
      }
    });

    this.eventBus.on(LearningEvents.SAVE_COMPLETED, () => {
      this.showSaveIndicator();
    });
  }

  renderWordBanner(banner) {
    if (!this.wordBannerEl || !banner) return;

    this.wordBannerEl.classList.remove('hidden');
    this.wordBannerEl.classList.remove('pop-anim');
    void this.wordBannerEl.offsetWidth; // Reflow for animation restart
    this.wordBannerEl.classList.add('pop-anim');

    if (this.wordIconEl) {
      this.wordIconEl.textContent = banner.icon || '✨';
    }

    // Section 9.2: English mode -> "APPLE", Japanese mode -> "APPLE（リンゴ）"
    if (this.wordTextEl) {
      if (this.language === 'ja' && banner.ja) {
        this.wordTextEl.textContent = `${banner.en}（${banner.ja}）`;
      } else {
        this.wordTextEl.textContent = banner.en;
      }
    }

    if (this.wordSubEl) {
      const subText = banner.customSub || banner.speech || '';
      this.wordSubEl.textContent = subText;
    }
  }

  renderInventory(slots = [], selectedSlot = 0) {
    if (!this.inventoryBarEl) return;
    this.inventoryBarEl.innerHTML = '';

    for (let i = 0; i < 9; i++) {
      const item = slots[i];
      const slotEl = document.createElement('button');
      slotEl.type = 'button';
      slotEl.className = `inv-slot ${i === selectedSlot ? 'active' : ''}`;
      slotEl.dataset.slotIndex = String(i);
      slotEl.title = item
        ? (this.language === 'ja' ? `${item.name.en} (${item.name.ja})` : item.name.en)
        : `Slot ${i + 1}`;

      const keyBadge = document.createElement('span');
      keyBadge.className = 'inv-key';
      keyBadge.textContent = String(i + 1);
      slotEl.appendChild(keyBadge);

      if (item) {
        const iconSpan = document.createElement('span');
        iconSpan.className = 'inv-icon';
        iconSpan.textContent = item.icon || '🧱';
        slotEl.appendChild(iconSpan);

        const countSpan = document.createElement('span');
        countSpan.className = 'inv-count';
        countSpan.textContent = String(item.count);
        slotEl.appendChild(countSpan);

        const labelSpan = document.createElement('span');
        labelSpan.className = 'inv-label';
        labelSpan.textContent = this.language === 'ja' ? item.name.ja : item.name.en;
        slotEl.appendChild(labelSpan);
      }

      slotEl.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.inventoryManager) {
          this.inventoryManager.selectSlot(i);
        }
      });

      this.inventoryBarEl.appendChild(slotEl);
    }
  }

  updateBreakProgress(ratio) {
    if (!this.breakProgressEl) return;
    if (ratio <= 0.05) {
      this.breakProgressEl.classList.add('hidden');
    } else {
      this.breakProgressEl.classList.remove('hidden');
      const pct = Math.round(ratio * 100);
      this.breakProgressEl.style.setProperty('--progress', `${pct}%`);
    }
  }

  showSaveIndicator() {
    if (!this.saveIndicatorEl) return;
    this.saveIndicatorEl.classList.add('visible');
    clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => {
      this.saveIndicatorEl.classList.remove('visible');
    }, 1600);
  }
}
