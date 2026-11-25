import { LearningEvents } from './LearningEvents.js';
import { AudioPriority } from '../audio/AudioManager.js';

export class LearningManager {
  constructor(eventBus, vocabularyManager, missionManager, inventoryManager, settings = {}) {
    this.eventBus = eventBus;
    this.vocabularyManager = vocabularyManager;
    this.missionManager = missionManager;
    this.inventoryManager = inventoryManager;

    this.learningLevel = settings.learningLevel || 1;
    this.language = settings.language || 'en';
    this.currentWordBanner = null;
    this.collectionCounters = {}; // itemId -> count collected in session

    this._bindEvents();
  }

  _bindEvents() {
    if (!this.eventBus) return;

    this.eventBus.on(LearningEvents.SETTINGS_CHANGED, (settings) => {
      if (settings.learningLevel !== undefined) {
        this.learningLevel = Number(settings.learningLevel) || 1;
      }
      if (settings.language !== undefined) {
        this.language = settings.language;
      }
      if (this.currentWordBanner) {
        this._emitBanner(this.currentWordBanner.id);
      }
    });

    // 1. First-time discovery (hover/look at object)
    this.eventBus.on(LearningEvents.OBJECT_DISCOVERED, ({ id }) => {
      if (!id) return;
      const isNew = this.vocabularyManager.markDiscovered(id);
      if (isNew) {
        this._emitBanner(id, { isNew: true });
        const text = this.vocabularyManager.getSpeechForLevel(id, this.learningLevel);
        this.eventBus.emit(LearningEvents.SPEAK_REQUESTED, {
          text,
          priority: AudioPriority.NORMAL,
          force: false
        });
        this.eventBus.emit(LearningEvents.SAVE_REQUESTED, { reason: 'word_discovered' });
      }
    });

    // 2. Explicit click / selection on object or block
    this.eventBus.on(LearningEvents.OBJECT_SELECTED, ({ id }) => {
      if (!id) return;
      this.vocabularyManager.markDiscovered(id);
      this._emitBanner(id, { isNew: false });

      const text = this.vocabularyManager.getSpeechForLevel(id, this.learningLevel);
      this.eventBus.emit(LearningEvents.SFX_REQUESTED, { type: 'select' });
      this.eventBus.emit(LearningEvents.SPEAK_REQUESTED, {
        text,
        priority: AudioPriority.HIGH,
        force: true
      });

      this.missionManager.recordAction('select', id, 1);
      if (['cow', 'sheep', 'chicken', 'dog', 'cat', 'fish'].includes(id)) {
        this.missionManager.recordAction('select_animal', 'any', 1);
      }
      if (id.startsWith('shape_')) {
        this.missionManager.recordAction('select_shape', 'any', 1);
      }
      if (['car', 'bus', 'bicycle'].includes(id)) {
        this.missionManager.recordAction('select_vehicle', 'any', 1);
      }
    });

    // 3. Player jumped & ran
    this.eventBus.on(LearningEvents.PLAYER_JUMPED, () => {
      this.vocabularyManager.markDiscovered('jump');
      this.eventBus.emit(LearningEvents.SFX_REQUESTED, { type: 'jump' });
      this.missionManager.recordAction('jump', 'any', 1);
    });

    this.eventBus.on(LearningEvents.PLAYER_RAN, () => {
      this.vocabularyManager.markDiscovered('run');
      this.eventBus.emit(LearningEvents.SPEAK_REQUESTED, {
        text: 'Run!',
        priority: AudioPriority.LOW,
        force: false
      });
      this.missionManager.recordAction('run', 'any', 1);
    });

    this.eventBus.on(LearningEvents.PLAYER_WALKED, () => {
      this.vocabularyManager.markDiscovered('walk');
      this.missionManager.recordAction('walk', 'any', 1);
    });

    // 4. Item collected
    this.eventBus.on(LearningEvents.ITEM_COLLECTED, ({ itemId, item }) => {
      if (!itemId) return;
      this.vocabularyManager.markDiscovered(itemId);
      this.collectionCounters[itemId] = (this.collectionCounters[itemId] || 0) + 1;
      const sessionCount = this.collectionCounters[itemId];

      this._emitBanner(itemId, {
        customSub: `${sessionCount} ${item?.name?.en || itemId}`
      });

      this.eventBus.emit(LearningEvents.SFX_REQUESTED, { type: 'collect' });

      const countPhrase = this.vocabularyManager.formatCountSpeech(item?.name?.en || itemId, sessionCount);
      this.eventBus.emit(LearningEvents.SPEAK_REQUESTED, {
        text: countPhrase,
        priority: AudioPriority.NORMAL,
        force: true
      });

      this.missionManager.recordAction('collect', itemId, 1);
      this.eventBus.emit(LearningEvents.SAVE_REQUESTED, { reason: 'item_collected' });
    });

    // 5. Block placed & stacked
    this.eventBus.on(LearningEvents.BLOCK_PLACED, ({ blockId, stackHeight, spatialRelation, isRiverBridge, isAnimalArea, isFarmArea, isBuildingArea, stageId }) => {
      this.vocabularyManager.markDiscovered(blockId);
      this.eventBus.emit(LearningEvents.SFX_REQUESTED, { type: 'place' });
      this.missionManager.recordAction('place', blockId, 1);

      if (['red', 'blue', 'yellow', 'green'].includes(blockId)) {
        this.missionManager.recordAction('place_color', blockId, 1);
      }
      if (spatialRelation === 'on_table' || spatialRelation === 'under_table') {
        this.missionManager.recordAction('spatial_place', spatialRelation, 1);
      }
      if (isRiverBridge) {
        this.missionManager.recordAction('bridge', 'river', 1);
      }
      if (isAnimalArea) {
        this.missionManager.recordAction('build_fence', 'animal_area', 1);
      }
      if (isFarmArea) {
        this.missionManager.recordAction('build_farm', 'farm_area', 1);
      }
      if (isBuildingArea) {
        this.missionManager.recordAction('build_plaza', 'building_area', 1);
      }
      if (stageId === 'town') {
        this.missionManager.recordAction('build_town', 'town', 1);
      }
      if (stackHeight >= 2) {
        this.missionManager.recordAction('stack', 'any', stackHeight, true);
      }

      if (spatialRelation === 'on_table') {
        this.vocabularyManager.markDiscovered('on');
        this._emitBanner('on');
        this.eventBus.emit(LearningEvents.SPEAK_REQUESTED, {
          text: 'On the table!',
          priority: AudioPriority.HIGH,
          force: true
        });
      } else if (spatialRelation === 'under_table') {
        this.vocabularyManager.markDiscovered('under');
        this._emitBanner('under');
        this.eventBus.emit(LearningEvents.SPEAK_REQUESTED, {
          text: 'Under the table!',
          priority: AudioPriority.HIGH,
          force: true
        });
      } else if (isRiverBridge) {
        this.eventBus.emit(LearningEvents.SPEAK_REQUESTED, {
          text: 'Bridge block!',
          priority: AudioPriority.NORMAL,
          force: false
        });
      } else if (stackHeight >= 2) {
        this.vocabularyManager.markDiscovered('up');
        const phrase = this.vocabularyManager.formatCountSpeech('block', stackHeight);
        this._emitBanner(blockId, { customEn: phrase.replace('!', '').toUpperCase() });
        this.eventBus.emit(LearningEvents.SPEAK_REQUESTED, {
          text: phrase,
          priority: AudioPriority.HIGH,
          force: true
        });
      } else {
        this._emitBanner(blockId);
        const speech = this.vocabularyManager.getSpeechForLevel(blockId, 1);
        this.eventBus.emit(LearningEvents.SPEAK_REQUESTED, {
          text: speech,
          priority: AudioPriority.LOW,
          force: false
        });
      }

      this.eventBus.emit(LearningEvents.SAVE_REQUESTED, { reason: 'block_placed' });
    });

    // 6. Block destroyed
    this.eventBus.on(LearningEvents.BLOCK_DESTROYED, ({ blockId } = {}) => {
      this.eventBus.emit(LearningEvents.SFX_REQUESTED, { type: 'break' });
      this.missionManager.recordAction('break', blockId || 'any', 1);
      this.eventBus.emit(LearningEvents.SAVE_REQUESTED, { reason: 'block_destroyed' });
    });

    // 7. Seed planted & plant growth (Science)
    this.eventBus.on(LearningEvents.SEED_PLANTED, () => {
      this.vocabularyManager.markDiscovered('seed');
      this._emitBanner('seed');
      this.eventBus.emit(LearningEvents.SFX_REQUESTED, { type: 'place' });
      this.eventBus.emit(LearningEvents.SPEAK_REQUESTED, {
        text: 'You planted a seed!',
        priority: AudioPriority.HIGH,
        force: true
      });
      this.missionManager.recordAction('plant', 'farm_plot', 1);
    });

    this.eventBus.on(LearningEvents.PLANT_GROWN, ({ stageName }) => {
      const wordId = stageName.toLowerCase();
      this.vocabularyManager.markDiscovered(wordId);
      this._emitBanner(wordId);
      this.eventBus.emit(LearningEvents.SFX_REQUESTED, { type: 'water' });
      this.eventBus.emit(LearningEvents.SPEAK_REQUESTED, {
        text: `${stageName}! It grew!`,
        priority: AudioPriority.HIGH,
        force: true
      });
      this.missionManager.recordAction('grow', wordId, 1);
    });

    // 8. Town Traffic Light & Stage Travel
    this.eventBus.on(LearningEvents.TRAFFIC_LIGHT_CHANGED, ({ name, word, speech }) => {
      const wordId = word === 'Stop' ? 'stop' : word === 'Go' ? 'go' : 'traffic_light';
      this.vocabularyManager.markDiscovered(wordId);
      this._emitBanner(wordId, { customSub: speech });
      this.eventBus.emit(LearningEvents.SFX_REQUESTED, { type: 'select' });
      this.eventBus.emit(LearningEvents.SPEAK_REQUESTED, {
        text: speech || 'Traffic light!',
        priority: AudioPriority.HIGH,
        force: true
      });
      this.missionManager.recordAction('traffic_light', name || 'any', 1);
    });

    this.eventBus.on(LearningEvents.STAGE_CHANGED, ({ stageId }) => {
      if (!stageId) return;
      this.vocabularyManager.markDiscovered(stageId);
      this._emitBanner(stageId);
      this.missionManager.recordAction('visit_stage', stageId, 1);
    });

    // 9. Mission started / completed
    this.eventBus.on(LearningEvents.MISSION_STARTED, (mission) => {
      if (mission && mission.audio) {
        this.eventBus.emit(LearningEvents.SPEAK_REQUESTED, {
          text: mission.audio,
          priority: AudioPriority.HIGH,
          force: true
        });
      }
    });

    this.eventBus.on(LearningEvents.MISSION_COMPLETED, (mission) => {
      this.eventBus.emit(LearningEvents.SFX_REQUESTED, { type: 'mission_complete' });
      this.eventBus.emit(LearningEvents.SPEAK_REQUESTED, {
        text: 'Great job! Mission complete!',
        priority: AudioPriority.HIGH,
        force: true
      });
      if (mission?.reward?.itemId && this.inventoryManager) {
        this.inventoryManager.addItem(mission.reward.itemId, 1);
      }
      this.eventBus.emit(LearningEvents.SAVE_REQUESTED, { reason: 'mission_completed' });
    });
  }

  speakCurrentWord() {
    if (!this.currentWordBanner) return;
    const text = this.vocabularyManager.getSpeechForLevel(this.currentWordBanner.id, this.learningLevel);
    this.eventBus.emit(LearningEvents.SPEAK_REQUESTED, {
      text,
      priority: AudioPriority.HIGH,
      force: true
    });
  }

  _emitBanner(id, extra = {}) {
    const word = this.vocabularyManager.getWord(id) || {
      id,
      en: id.toUpperCase(),
      ja: id,
      icon: '✨'
    };
    this.currentWordBanner = {
      id: word.id,
      en: extra.customEn || word.en.toUpperCase(),
      ja: word.ja,
      icon: word.icon || '✨',
      speech: this.vocabularyManager.getSpeechForLevel(word.id, this.learningLevel),
      customSub: extra.customSub || null,
      isNew: Boolean(extra.isNew)
    };
    this.eventBus.emit(LearningEvents.WORD_BANNER_UPDATED, this.currentWordBanner);
  }

  getSerializedState() {
    return {
      discoveredWords: this.vocabularyManager.getDiscoveredWords(),
      wordCounts: { ...this.vocabularyManager.wordCounts },
      ...this.missionManager.getSerializedState()
    };
  }

  restoreState(learningData = {}) {
    if (!learningData) return;
    this.vocabularyManager.restoreState(learningData.discoveredWords, learningData.wordCounts);
    this.missionManager.restoreState(learningData);
  }
}
