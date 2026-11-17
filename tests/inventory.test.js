import { EventBus } from '../src/core/EventBus.js';
import { InventoryManager } from '../src/inventory/InventoryManager.js';
import { LearningEvents } from '../src/learning/LearningEvents.js';

export async function runInventoryTests(assert) {
  const bus = new EventBus();
  const inv = new InventoryManager(bus, [], []);

  // Test 1: Initial items loaded into 9 slots
  const initialSlots = inv.getSlots();
  assert(initialSlots.length === 9, 'Inventory should have 9 slots');
  assert(inv.getItemCount('wood') === 15, 'Initial wood count should be 15');
  assert(inv.getItemCount('apple') === 2, 'Initial apple count should be 2');

  // Test 2: Adding items stacks onto existing slot and emits ITEM_COLLECTED
  let collectedEvent = null;
  bus.on(LearningEvents.ITEM_COLLECTED, (payload) => {
    collectedEvent = payload;
  });

  inv.addItem('apple', 3);
  assert(inv.getItemCount('apple') === 5, 'Apple count should increase from 2 to 5');
  assert(collectedEvent && collectedEvent.itemId === 'apple' && collectedEvent.totalCount === 5, 'ITEM_COLLECTED event should fire with updated count');

  // Test 3: Stack limit of 99
  inv.addItem('wood', 90);
  assert(inv.getItemCount('wood') === 99, 'Stack should cap at 99 when no empty slots are free');

  // Test 4: Removing items & slot selection
  inv.selectSlot(1); // stone slot
  assert(inv.selectedSlot === 1, 'Selected slot should be 1');
  const removed = inv.removeItem('stone', 5);
  assert(removed === true && inv.getItemCount('stone') === 10, 'Stone count should decrease from 15 to 10');

  // Test 5: Serialize and restore state
  const saved = inv.getSerializedState();
  inv.resetToInitial();
  assert(inv.getItemCount('apple') === 2, 'Reset should restore apple count to 2');
  inv.restoreState(saved);
  assert(inv.getItemCount('apple') === 5, 'Restored state should have 5 apples');
}
