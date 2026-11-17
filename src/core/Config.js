export const Config = {
  GAME_NAME: 'Little World Explorer',
  VERSION: 1,

  WORLD: {
    WIDTH: 64,
    DEPTH: 64,
    MAX_HEIGHT: 16,
    BLOCK_SIZE: 1,
    CHUNK_SIZE: 16,
    WATER_LEVEL: 1
  },

  PLAYER: {
    START_POS: [32, 5, 38],
    WALK_SPEED: 5.5,
    RUN_SPEED: 9.0,
    JUMP_FORCE: 8.8,
    GRAVITY: 22.0,
    RADIUS: 0.35,
    HEIGHT: 1.5
  },

  CAMERA: {
    INITIAL_DISTANCE: 6.0,
    INITIAL_HEIGHT: 3.0,
    MIN_DISTANCE: 3.0,
    MAX_DISTANCE: 14.0,
    LOOK_AT_HEIGHT_OFFSET: 1.1,
    ROTATION_SPEED: 0.0045
  },

  INTERACTION: {
    MAX_DISTANCE: 8.5,
    BREAK_HOLD_MS: 380
  },

  INVENTORY: {
    SLOTS: 9,
    MAX_STACK: 99,
    INITIAL_ITEMS: [
      { id: 'wood', name: { en: 'Wood', ja: '木材' }, icon: '🪵', count: 15, placeable: true, blockId: 'wood' },
      { id: 'stone', name: { en: 'Stone', ja: '石' }, icon: '🪨', count: 15, placeable: true, blockId: 'stone' },
      { id: 'red', name: { en: 'Red Block', ja: '赤いブロック' }, icon: '🟥', count: 12, placeable: true, blockId: 'red' },
      { id: 'blue', name: { en: 'Blue Block', ja: '青いブロック' }, icon: '🟦', count: 12, placeable: true, blockId: 'blue' },
      { id: 'yellow', name: { en: 'Yellow Block', ja: '黄色いブロック' }, icon: '🟨', count: 12, placeable: true, blockId: 'yellow' },
      { id: 'flower', name: { en: 'Flower', ja: '花' }, icon: '🌸', count: 5, placeable: true, blockId: 'flower' },
      { id: 'apple', name: { en: 'Apple', ja: 'リンゴ' }, icon: '🍎', count: 2, placeable: false },
      { id: 'seed', name: { en: 'Seed', ja: '種' }, icon: '🌱', count: 5, placeable: false, toolType: 'seed' },
      { id: 'water', name: { en: 'Water', ja: '水やり' }, icon: '💧', count: 99, placeable: false, toolType: 'water' }
    ]
  },

  AUDIO: {
    DEFAULT_LANG: 'en-US',
    SPEECH_RATE: 0.85,
    SPEECH_PITCH: 1.0,
    DEFAULT_VOLUME: 0.8
  },

  SETTINGS_DEFAULT: {
    language: 'en', // 'en' or 'ja' (English + Japanese display)
    voiceEnabled: true,
    voiceVolume: 0.8,
    bgmEnabled: true,
    sfxEnabled: true,
    learningLevel: 1 // 1, 2, or 3
  },

  SAVE: {
    DB_NAME: 'LittleWorldExplorerDB',
    DB_VERSION: 1,
    STORE_NAME: 'saves',
    SAVE_KEY: 'world_001',
    SETTINGS_STORAGE_KEY: 'lwe_settings_v1',
    AUTO_SAVE_INTERVAL_MS: 30000
  }
};
