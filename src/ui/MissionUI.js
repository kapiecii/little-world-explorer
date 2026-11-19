import { LearningEvents } from '../learning/LearningEvents.js';
import { AudioPriority } from '../audio/AudioManager.js';

const MISSION_CATEGORIES = [
  { id: 'all', icon: '🌟', en: 'All', ja: 'すべて' },
  { id: 'english', icon: '🗣️', en: 'English', ja: '英語' },
  { id: 'color_shape', icon: '🎨', en: 'Color & Shape', ja: '色・形' },
  { id: 'math', icon: '🔢', en: 'Math', ja: '算数' },
  { id: 'science', icon: '🌱', en: 'Science', ja: '自然' },
  { id: 'spatial', icon: '🧭', en: 'Spatial', ja: '空間' },
  { id: 'logic', icon: '🧩', en: 'Logic', ja: '論理' }
];

export class MissionUI {
  constructor(eventBus, missionManager, vocabularyManager, settings = {}, onRequestCloseModal = null) {
    this.eventBus = eventBus;
    this.missionManager = missionManager;
    this.vocabularyManager = vocabularyManager;
    this.language = settings.language || 'en';
    this.onRequestCloseModal = onRequestCloseModal;
    this.selectedCategory = 'all';

    this.hudCardEl = document.getElementById('mission-hud-card');
    this.hudIconEl = document.getElementById('mission-hud-icon');
    this.hudTitleEl = document.getElementById('mission-hud-title');
    this.hudSubEl = document.getElementById('mission-hud-sub');
    this.hudProgressFillEl = document.getElementById('mission-progress-fill');
    this.hudProgressTextEl = document.getElementById('mission-progress-text');

    this.speakMissionBtn = document.getElementById('mission-speak-btn');
    this.pauseMissionBtn = document.getElementById('mission-pause-btn');
    this.openMissionsBtn = document.getElementById('open-missions-btn');

    this.modalEl = document.getElementById('mission-modal');
    this.closeModalBtn = document.getElementById('close-mission-modal-btn');
    this.filterBarEl = document.getElementById('mission-filter-bar');
    this.missionListContainer = document.getElementById('mission-list-container');
    this.wordBookContainer = document.getElementById('wordbook-list-container');
    this.tabMissionsBtn = document.getElementById('tab-missions-btn');
    this.tabWordBookBtn = document.getElementById('tab-wordbook-btn');

    this.celebrationEl = document.getElementById('mission-celebration');
    this.celebrationTextEl = document.getElementById('mission-celebration-text');

    this._bindEvents();
    this.renderHudCard();
  }

  _bindEvents() {
    if (this.speakMissionBtn) {
      this.speakMissionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const active = this.missionManager?.getActiveMission();
        if (active && this.eventBus) {
          this.eventBus.emit(LearningEvents.SPEAK_REQUESTED, {
            text: active.audio || active.instruction.en,
            priority: AudioPriority.HIGH,
            force: true
          });
        }
      });
    }

    if (this.pauseMissionBtn) {
      this.pauseMissionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.missionManager?.getActiveMission()) {
          this.missionManager.pauseMission();
        } else {
          // Start first uncompleted mission or first mission
          const all = this.missionManager.getAllMissions();
          const next = all.find(m => !m.completed) || all[0];
          if (next) this.missionManager.startMission(next.id, true);
        }
      });
    }

    if (this.tabMissionsBtn && this.tabWordBookBtn) {
      this.tabMissionsBtn.addEventListener('click', () => this.switchTab('missions'));
      this.tabWordBookBtn.addEventListener('click', () => this.switchTab('wordbook'));
    }

    if (!this.eventBus) return;

    this.eventBus.on(LearningEvents.MISSION_STARTED, () => {
      this.renderHudCard();
      this.renderModalContent();
    });

    this.eventBus.on(LearningEvents.MISSION_PROGRESS, () => {
      this.renderHudCard();
    });

    this.eventBus.on(LearningEvents.MISSION_PAUSED, () => {
      this.renderHudCard();
      this.renderModalContent();
    });

    this.eventBus.on(LearningEvents.MISSION_COMPLETED, (mission) => {
      this.renderHudCard();
      this.renderModalContent();
      this.showCelebration(mission);
    });

    this.eventBus.on(LearningEvents.SETTINGS_CHANGED, (settings) => {
      if (settings.language) {
        this.language = settings.language;
        this.renderHudCard();
        this.renderModalContent();
      }
    });
  }

  switchTab(tab) {
    if (!this.missionListContainer || !this.wordBookContainer) return;
    if (tab === 'wordbook') {
      this.tabWordBookBtn?.classList.add('active');
      this.tabMissionsBtn?.classList.remove('active');
      this.filterBarEl?.classList.add('hidden');
      this.wordBookContainer.classList.remove('hidden');
      this.missionListContainer.classList.add('hidden');
      this.renderWordBook();
    } else {
      this.tabMissionsBtn?.classList.add('active');
      this.tabWordBookBtn?.classList.remove('active');
      this.filterBarEl?.classList.remove('hidden');
      this.missionListContainer.classList.remove('hidden');
      this.wordBookContainer.classList.add('hidden');
      this.renderMissionList();
    }
  }

  renderHudCard() {
    if (!this.hudCardEl || !this.missionManager) return;
    const active = this.missionManager.getActiveMission();

    if (!active) {
      if (this.hudIconEl) this.hudIconEl.textContent = '🧭';
      if (this.hudTitleEl) {
        this.hudTitleEl.textContent = this.language === 'ja'
          ? 'Free Play! (自由にあそぼう)'
          : 'Free Play! Pick a Mission';
      }
      if (this.hudSubEl) {
        this.hudSubEl.textContent = this.language === 'ja'
          ? 'ミッションボタンからチャレンジを選べるよ'
          : 'Click Missions to start a fun challenge!';
      }
      if (this.hudProgressFillEl) this.hudProgressFillEl.style.width = '0%';
      if (this.hudProgressTextEl) this.hudProgressTextEl.textContent = '0 / 0';
      if (this.pauseMissionBtn) {
        this.pauseMissionBtn.textContent = '▶️ Start';
        this.pauseMissionBtn.title = 'Start a mission';
      }
      return;
    }

    const total = active.objective?.count || 1;
    const current = Math.min(total, active.current || 0);
    const pct = Math.round((current / total) * 100);

    if (this.hudIconEl) this.hudIconEl.textContent = active.icon || '🌟';
    if (this.hudTitleEl) this.hudTitleEl.textContent = active.instruction.en;
    if (this.hudSubEl) {
      this.hudSubEl.textContent = this.language === 'ja' ? active.instruction.ja : `${active.difficultyLabel} Mission`;
    }
    if (this.hudProgressFillEl) this.hudProgressFillEl.style.width = `${pct}%`;
    if (this.hudProgressTextEl) this.hudProgressTextEl.textContent = `${current} / ${total}`;
    if (this.pauseMissionBtn) {
      this.pauseMissionBtn.textContent = '⏸️ Pause';
      this.pauseMissionBtn.title = 'Pause mission anytime';
    }
  }

  renderModalContent() {
    this.renderMissionList();
    this.renderWordBook();
  }

  renderCategoryFilters() {
    if (!this.filterBarEl || !this.missionManager) return;
    const allMissions = this.missionManager.getAllMissions();
    this.filterBarEl.innerHTML = '';

    for (const cat of MISSION_CATEGORIES) {
      const catMissions = cat.id === 'all'
        ? allMissions
        : allMissions.filter(m => m.category === cat.id);
      const completedCount = catMissions.filter(m => m.completed).length;

      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = `filter-pill ${this.selectedCategory === cat.id ? 'active' : ''}`;
      const label = this.language === 'ja' ? cat.ja : cat.en;
      pill.textContent = `${cat.icon} ${label} (${completedCount}/${catMissions.length})`;
      pill.addEventListener('click', () => {
        this.selectedCategory = cat.id;
        this.renderMissionList();
      });
      this.filterBarEl.appendChild(pill);
    }
  }

  renderMissionList() {
    if (!this.missionListContainer || !this.missionManager) return;
    this.renderCategoryFilters();

    const allMissions = this.missionManager.getAllMissions();
    const missions = this.selectedCategory === 'all'
      ? allMissions
      : allMissions.filter(m => m.category === this.selectedCategory);
    this.missionListContainer.innerHTML = '';

    for (const m of missions) {
      const card = document.createElement('div');
      card.className = `mission-item-card ${m.active ? 'active' : ''} ${m.completed ? 'completed' : ''}`;

      const total = m.objective?.count || 1;
      const current = m.current || 0;

      const left = document.createElement('div');
      left.className = 'mission-item-info';
      left.innerHTML = `
        <div class="mission-item-header">
          <span class="mission-item-icon">${m.icon || '🌟'}</span>
          <span class="mission-item-en">${m.instruction.en}</span>
          <span class="mission-badge">${m.difficultyLabel || 'Easy'}</span>
          ${m.completed ? '<span class="mission-star-badge">⭐ Done!</span>' : ''}
        </div>
        <div class="mission-item-ja">${m.instruction.ja} (${current} / ${total})</div>
      `;

      const actions = document.createElement('div');
      actions.className = 'mission-item-actions';

      const actionBtn = document.createElement('button');
      actionBtn.type = 'button';
      actionBtn.className = 'btn-primary btn-small';
      if (m.active) {
        actionBtn.textContent = this.language === 'ja' ? '⏸️ 中断する' : '⏸️ Pause';
        actionBtn.addEventListener('click', () => {
          this.missionManager.pauseMission();
        });
      } else if (m.completed) {
        actionBtn.textContent = this.language === 'ja' ? '🔄 もういちど' : '🔄 Play Again';
        actionBtn.addEventListener('click', () => {
          this.missionManager.startMission(m.id, true);
          if (this.onRequestCloseModal) {
            this.onRequestCloseModal();
          } else {
            this.modalEl?.classList.add('hidden');
          }
        });
      } else {
        actionBtn.textContent = this.language === 'ja' ? '▶️ はじめる' : '▶️ Start';
        actionBtn.addEventListener('click', () => {
          this.missionManager.startMission(m.id, false);
          if (this.onRequestCloseModal) {
            this.onRequestCloseModal();
          } else {
            this.modalEl?.classList.add('hidden');
          }
        });
      }

      actions.appendChild(actionBtn);
      card.append(left, actions);
      this.missionListContainer.appendChild(card);
    }
  }

  renderWordBook() {
    if (!this.wordBookContainer || !this.vocabularyManager) return;
    const allWords = this.vocabularyManager.getAllWords();
    this.wordBookContainer.innerHTML = '';

    for (const w of allWords) {
      const discovered = this.vocabularyManager.isDiscovered(w.id);
      const item = document.createElement('button');
      item.type = 'button';
      item.className = `wordbook-card ${discovered ? 'discovered' : 'locked'}`;
      item.innerHTML = `
        <span class="wb-icon">${discovered ? (w.icon || '✨') : '❓'}</span>
        <span class="wb-en">${w.en}</span>
        <span class="wb-ja">${this.language === 'ja' ? w.ja : ''}</span>
        <span class="wb-speak">🔊</span>
      `;
      item.addEventListener('click', () => {
        this.vocabularyManager.markDiscovered(w.id);
        this.renderWordBook();
        if (this.eventBus) {
          this.eventBus.emit(LearningEvents.SPEAK_REQUESTED, {
            text: `${w.en}!`,
            priority: AudioPriority.HIGH,
            force: true
          });
        }
      });
      this.wordBookContainer.appendChild(item);
    }
  }

  showCelebration(mission) {
    if (!this.celebrationEl) return;
    if (this.celebrationTextEl && mission) {
      this.celebrationTextEl.textContent = this.language === 'ja'
        ? `🎉 GREAT JOB! 「${mission.instruction.en}」クリア！ ⭐`
        : `🎉 GREAT JOB! "${mission.instruction.en}" Complete! ⭐`;
    }
    this.celebrationEl.classList.remove('hidden');
    clearTimeout(this._celebTimer);
    this._celebTimer = setTimeout(() => {
      this.celebrationEl.classList.add('hidden');
    }, 3400);
  }
}
