import { EventBus } from '../src/core/EventBus.js';
import { VocabularyManager } from '../src/learning/VocabularyManager.js';
import { MissionManager } from '../src/learning/MissionManager.js';
import { LearningManager } from '../src/learning/LearningManager.js';
import { InventoryManager } from '../src/inventory/InventoryManager.js';
import { LearningEvents } from '../src/learning/LearningEvents.js';

export async function runLearningTests(assert) {
  const bus = new EventBus();
  const vocabList = [
    {
      id: 'apple',
      category: 'english',
      en: 'Apple',
      ja: 'リンゴ',
      icon: '🍎',
      levels: { 1: 'Apple!', 2: 'Red Apple!', 3: 'Find a red apple!' }
    },
    {
      id: 'tree',
      category: 'english',
      en: 'Tree',
      ja: '木',
      icon: '🌳',
      levels: { 1: 'Tree!', 2: 'Big Green Tree!', 3: 'Look at the big green tree!' }
    }
  ];

  const missionsList = [
    {
      id: 'find_apples_001',
      category: 'english',
      difficulty: 1,
      instruction: { en: 'Find 3 apples!', ja: 'リンゴを3個見つけよう！' },
      audio: 'Find three apples!',
      objective: { type: 'collect', target: 'apple', count: 3 },
      reward: { type: 'decoration', itemId: 'star' }
    },
    {
      id: 'stack_three_blocks_001',
      category: 'math',
      difficulty: 2,
      instruction: { en: 'Stack 3 blocks high!', ja: 'ブロックを3つ積み上げよう！' },
      audio: 'Stack three blocks high!',
      objective: { type: 'stack', target: 'any', count: 3 },
      reward: { type: 'decoration', itemId: 'star' }
    },
    {
      id: 'break_two_stones_001',
      category: 'math',
      difficulty: 2,
      instruction: { en: 'Remove 2 stone blocks!', ja: '石ブロックを2個取り除こう！' },
      audio: 'Remove two stone blocks!',
      objective: { type: 'break', target: 'stone', count: 2 },
      reward: { type: 'decoration', itemId: 'star' }
    },
    {
      id: 'run_fast_001',
      category: 'english',
      difficulty: 1,
      instruction: { en: 'Run fast with Shift!', ja: 'Shiftキーを押しながら3秒走ろう！' },
      audio: 'Run fast with Shift!',
      objective: { type: 'run', target: 'any', count: 3 },
      reward: { type: 'decoration', itemId: 'star' }
    },
    {
      id: 'place_colorful_blocks_001',
      category: 'color_shape',
      difficulty: 2,
      instruction: { en: 'Place 5 colorful blocks!', ja: 'カラフルな色ブロックを5個置こう！' },
      audio: 'Place five colorful blocks!',
      objective: { type: 'place_color', target: 'any', count: 5 },
      reward: { type: 'decoration', itemId: 'star' }
    },
    {
      id: 'build_animal_fence_001',
      category: 'logic',
      difficulty: 3,
      instruction: { en: 'Build a fence in the animal area!', ja: '動物エリアにブロックを6個置いて柵を作ろう！' },
      audio: 'Build a fence in the animal area!',
      objective: { type: 'build_fence', target: 'animal_area', count: 6 },
      reward: { type: 'decoration', itemId: 'star' }
    },
    {
      id: 'bloom_flower_001',
      category: 'science',
      difficulty: 3,
      instruction: { en: 'Grow a flower to full bloom!', ja: '畑の植物に水をあげて花を咲かせよう！' },
      audio: 'Grow a flower to full bloom!',
      objective: { type: 'grow', target: 'flower', count: 1 },
      reward: { type: 'decoration', itemId: 'star' }
    }
  ];

  const inv = new InventoryManager(bus, [], []);
  const vocab = new VocabularyManager(vocabList, [], []);
  const missions = new MissionManager(bus, missionsList);
  const learning = new LearningManager(bus, vocab, missions, inv, { learningLevel: 1, language: 'en' });

  const spokenTexts = [];
  bus.on(LearningEvents.SPEAK_REQUESTED, ({ text }) => {
    spokenTexts.push(text);
  });

  // Test 1: First-time discovery speaks once, repeated discovery does not repeat automatically
  bus.emit(LearningEvents.OBJECT_DISCOVERED, { id: 'tree' });
  bus.emit(LearningEvents.OBJECT_DISCOVERED, { id: 'tree' });
  assert(spokenTexts.filter(t => t === 'Tree!').length === 1, 'OBJECT_DISCOVERED should only speak once for the same word');

  // Test 2: Clicking (OBJECT_SELECTED) always speaks and respects learning level
  bus.emit(LearningEvents.SETTINGS_CHANGED, { learningLevel: 2 });
  bus.emit(LearningEvents.OBJECT_SELECTED, { id: 'apple' });
  assert(spokenTexts.includes('Red Apple!'), 'Level 2 selection should speak "Red Apple!"');

  // Test 3: Mission start, pause, resume, progress, and completion
  missions.startMission('find_apples_001');
  assert(missions.getActiveMission()?.id === 'find_apples_001', 'Mission find_apples_001 should be active');

  missions.pauseMission();
  assert(missions.getActiveMission() === null, 'Paused mission should clear active mission');

  missions.startMission('find_apples_001');
  inv.addItem('apple', 1); // 1st apple -> "One apple!"
  inv.addItem('apple', 1); // 2nd apple -> "Two apples!"
  inv.addItem('apple', 1); // 3rd apple -> "Three apples!" & mission complete!

  assert(spokenTexts.includes('One apple!'), 'Collecting 1st apple should speak "One apple!"');
  assert(spokenTexts.includes('Two apples!'), 'Collecting 2nd apple should speak "Two apples!"');
  assert(spokenTexts.includes('Three apples!'), 'Collecting 3rd apple should speak "Three apples!"');
  assert(missions.completedMissions.has('find_apples_001'), 'Mission find_apples_001 should be marked completed');

  // Test 4: Stacking 3 blocks speaks "Three blocks!" (MVP Section 14.2)
  missions.startMission('stack_three_blocks_001');
  bus.emit(LearningEvents.BLOCK_PLACED, { blockId: 'wood', stackHeight: 3 });
  assert(spokenTexts.includes('Three blocks!'), 'Stacking 3 blocks should speak "Three blocks!"');
  assert(missions.completedMissions.has('stack_three_blocks_001'), 'Stacking 3 blocks should complete stack_three_blocks_001');
  assert(learning.getSerializedState().discoveredWords.includes('tree'), 'Discovered words should be serialized');

  // Test 5: Breaking stone blocks completes break mission
  missions.startMission('break_two_stones_001');
  bus.emit(LearningEvents.BLOCK_DESTROYED, { blockId: 'wood' });
  assert(!missions.completedMissions.has('break_two_stones_001'), 'Breaking wood should not advance stone break mission');
  bus.emit(LearningEvents.BLOCK_DESTROYED, { blockId: 'stone' });
  bus.emit(LearningEvents.BLOCK_DESTROYED, { blockId: 'stone' });
  assert(missions.completedMissions.has('break_two_stones_001'), 'Breaking 2 stones should complete break_two_stones_001');

  // Test 6: Running completes run mission and discovers "run"
  missions.startMission('run_fast_001');
  bus.emit(LearningEvents.PLAYER_RAN, { position: [10, 3, 10] });
  bus.emit(LearningEvents.PLAYER_RAN, { position: [11, 3, 10] });
  bus.emit(LearningEvents.PLAYER_RAN, { position: [12, 3, 10] });
  assert(missions.completedMissions.has('run_fast_001'), 'Running 3 seconds should complete run_fast_001');
  assert(vocab.isDiscovered('run'), 'Running should mark "run" as discovered');

  // Test 7: Placing colorful blocks completes place_color mission
  missions.startMission('place_colorful_blocks_001');
  bus.emit(LearningEvents.BLOCK_PLACED, { blockId: 'stone', stackHeight: 1 });
  for (const colorId of ['red', 'blue', 'yellow', 'green', 'red']) {
    bus.emit(LearningEvents.BLOCK_PLACED, { blockId: colorId, stackHeight: 1 });
  }
  assert(missions.completedMissions.has('place_colorful_blocks_001'), 'Placing 5 color blocks should complete place_colorful_blocks_001');

  // Test 8: Placing blocks in animal area completes build_fence mission
  missions.startMission('build_animal_fence_001');
  for (let i = 0; i < 6; i++) {
    bus.emit(LearningEvents.BLOCK_PLACED, { blockId: 'wood', stackHeight: 1, isAnimalArea: true });
  }
  assert(missions.completedMissions.has('build_animal_fence_001'), 'Placing 6 blocks in animal area should complete build_animal_fence_001');

  // Test 9: Plant reaching Flower stage completes bloom_flower_001
  missions.startMission('bloom_flower_001');
  bus.emit(LearningEvents.PLANT_GROWN, { stageName: 'Sprout' });
  assert(!missions.completedMissions.has('bloom_flower_001'), 'Sprout stage should not complete flower bloom mission');
  bus.emit(LearningEvents.PLANT_GROWN, { stageName: 'Flower' });
  assert(missions.completedMissions.has('bloom_flower_001'), 'Flower stage should complete bloom_flower_001');
}
