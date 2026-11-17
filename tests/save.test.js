import { EventBus } from '../src/core/EventBus.js';
import { SaveManager } from '../src/save/SaveManager.js';

export async function runSaveTests(assert) {
  const bus = new EventBus();
  const saveMgr = new SaveManager(bus);
  await saveMgr.init();

  // Test 1: Settings save and load via LocalStorage
  saveMgr.saveSettings({
    language: 'ja',
    voiceEnabled: false,
    voiceVolume: 0.65,
    learningLevel: 3
  });
  const loadedSettings = saveMgr.loadSettings();
  assert(loadedSettings.language === 'ja', 'Saved language setting should be "ja"');
  assert(loadedSettings.voiceEnabled === false, 'Saved voiceEnabled setting should be false');
  assert(loadedSettings.learningLevel === 3, 'Saved learningLevel setting should be 3');

  // Test 2: Full game save & load via IndexedDB
  const sampleState = {
    world: {
      blocks: [{ x: 10, y: 3, z: 10, id: 'wood' }, { x: 11, y: 3, z: 10, id: null }],
      farmPlots: [{ uid: 'farm_plot_0', growthStage: 3 }],
      collectedObjectIds: ['apple_0', 'apple_1']
    },
    player: {
      position: [15, 4, 20],
      inventory: {
        selectedSlot: 2,
        slots: [{ id: 'wood', name: { en: 'Wood', ja: '木材' }, icon: '🪵', count: 25, placeable: true, blockId: 'wood' }]
      }
    },
    learning: {
      discoveredWords: ['apple', 'tree', 'wood'],
      completedMissions: ['find_apples_001'],
      activeMissionId: 'stack_three_blocks_001',
      progress: { find_apples_001: 3, stack_three_blocks_001: 1 }
    },
    settings: loadedSettings
  };

  await saveMgr.saveGame(sampleState, 'test_save');
  const hasData = await saveMgr.hasSaveData();
  assert(hasData === true, 'SaveManager.hasSaveData() should return true after saving');

  const restored = await saveMgr.loadGame();
  assert(restored && restored.version === 1, 'Restored save should have version 1');
  assert(restored.world.blocks.length === 2 && restored.world.blocks[0].id === 'wood', 'Restored world block diffs should match');
  assert(restored.player.position[0] === 15 && restored.player.position[2] === 20, 'Restored player position should match');
  assert(restored.learning.discoveredWords.includes('tree'), 'Restored discoveredWords should include "tree"');
  assert(restored.learning.completedMissions.includes('find_apples_001'), 'Restored completedMissions should include "find_apples_001"');

  // Clean up test save and restore default settings
  await saveMgr.clearSave();
  saveMgr.saveSettings({
    language: 'en',
    voiceEnabled: true,
    voiceVolume: 0.8,
    learningLevel: 1
  });
}
