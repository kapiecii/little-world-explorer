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
}
