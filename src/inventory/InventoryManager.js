import { Config } from '../core/Config.js';
import { LearningEvents } from '../learning/LearningEvents.js';

export class InventoryManager {
  constructor(eventBus, blockDefs = [], objectDefs = []) {
    this.eventBus = eventBus;
    this.maxSlots = Config.INVENTORY.SLOTS;
    this.maxStack = Config.INVENTORY.MAX_STACK;
    this.selectedSlot = 0;

    this.itemCatalog = new Map();
    this._buildItemCatalog(blockDefs, objectDefs);

    this.slots = new Array(this.maxSlots).fill(null);
    this.extraItems = {};
    this.resetToInitial();
  }

  _buildItemCatalog(blockDefs = [], objectDefs = []) {
    // Register initial items first
    for (const item of Config.INVENTORY.INITIAL_ITEMS) {
      this.itemCatalog.set(item.id, { ...item });
    }
    // Register blocks
    for (const b of blockDefs) {
      if (!this.itemCatalog.has(b.id)) {
        this.itemCatalog.set(b.id, {
          id: b.id,
          name: b.name || { en: b.id, ja: b.id },
          icon: b.icon || '🧱',
          placeable: b.id !== 'water',
          blockId: b.id
        });
      }
    }
    // Register collectible objects
    for (const o of objectDefs) {
      const id = o.collectId || o.id;
      if (!this.itemCatalog.has(id)) {
        this.itemCatalog.set(id, {
          id,
          name: o.name || { en: id, ja: id },
          icon: o.icon || '✨',
          placeable: id === 'flower',
          blockId: id === 'flower' ? 'flower' : null
        });
      }
    }
  }

  resetToInitial() {
    this.slots = new Array(this.maxSlots).fill(null);
    this.extraItems = {};
    Config.INVENTORY.INITIAL_ITEMS.forEach((item, index) => {
      if (index < this.maxSlots) {
        this.slots[index] = {
          id: item.id,
          name: { ...item.name },
          icon: item.icon,
          count: item.count,
          placeable: Boolean(item.placeable),
          blockId: item.blockId || null,
          toolType: item.toolType || null
        };
      }
    });
    this.selectedSlot = 0;
    this._notifyUpdate();
  }

  getItemDefinition(itemId) {
    if (this.itemCatalog.has(itemId)) {
      return this.itemCatalog.get(itemId);
    }
    return {
      id: itemId,
      name: { en: itemId.charAt(0).toUpperCase() + itemId.slice(1), ja: itemId },
      icon: '📦',
      placeable: false,
      blockId: null
    };
  }

  addItem(itemId, count = 1, options = {}) {
    if (!itemId || count <= 0) return 0;

    let remaining = count;
    const def = this.getItemDefinition(itemId);
    const hasHotbarSlot = this.slots.some(slot => slot && slot.id === itemId);

    // 1. Stack onto existing slot with the same itemId
    for (let i = 0; i < this.maxSlots; i++) {
      const slot = this.slots[i];
      if (slot && slot.id === itemId && slot.count < this.maxStack) {
        const space = this.maxStack - slot.count;
        const toAdd = Math.min(space, remaining);
        slot.count += toAdd;
        remaining -= toAdd;
        if (remaining <= 0) break;
      }
    }

    // 2. Place into empty slot if needed
    if (remaining > 0) {
      for (let i = 0; i < this.maxSlots; i++) {
        if (!this.slots[i]) {
          const toAdd = Math.min(this.maxStack, remaining);
          this.slots[i] = {
            id: def.id,
            name: { ...def.name },
            icon: def.icon,
            count: toAdd,
            placeable: Boolean(def.placeable),
            blockId: def.blockId || null,
            toolType: def.toolType || null
          };
          remaining -= toAdd;
          if (remaining <= 0) break;
        }
      }
    }

    // 3. If all 9 hotbar slots are occupied by other items, store collected item in extraItems bag
    if (remaining > 0 && !hasHotbarSlot) {
      const currentExtra = this.extraItems[itemId] || 0;
      const space = Math.max(0, this.maxStack - currentExtra);
      const toAdd = Math.min(space, remaining);
      if (toAdd > 0) {
        this.extraItems[itemId] = currentExtra + toAdd;
        remaining -= toAdd;
      }
    }

    const added = count - remaining;
    if (added > 0 || options.alwaysEmit) {
      const totalCount = this.getItemCount(itemId);
      if (this.eventBus) {
        this.eventBus.emit(LearningEvents.ITEM_COLLECTED, {
          itemId,
          added: added > 0 ? added : count,
          totalCount,
          item: def
        });
      }
      this._notifyUpdate();
    }
    return added;
  }

  removeItem(itemId, count = 1) {
    if (!itemId || count <= 0) return false;
    const total = this.getItemCount(itemId);
    if (total < count) return false;

    let remaining = count;
    // Prefer removing from selected slot first if it matches
    const sel = this.slots[this.selectedSlot];
    if (sel && sel.id === itemId) {
      const take = Math.min(sel.count, remaining);
      sel.count -= take;
      remaining -= take;
      if (sel.count <= 0) {
        this.slots[this.selectedSlot] = null;
      }
    }

    for (let i = this.maxSlots - 1; i >= 0 && remaining > 0; i--) {
      const slot = this.slots[i];
      if (slot && slot.id === itemId) {
        const take = Math.min(slot.count, remaining);
        slot.count -= take;
        remaining -= take;
        if (slot.count <= 0) {
          this.slots[i] = null;
        }
      }
    }

    if (remaining > 0 && this.extraItems[itemId]) {
      const take = Math.min(this.extraItems[itemId], remaining);
      this.extraItems[itemId] -= take;
      remaining -= take;
      if (this.extraItems[itemId] <= 0) {
        delete this.extraItems[itemId];
      }
    }

    this._notifyUpdate();
    return true;
  }

  getItemCount(itemId) {
    const hotbarCount = this.slots.reduce((sum, slot) => {
      if (slot && slot.id === itemId) return sum + slot.count;
      return sum;
    }, 0);
    return hotbarCount + (this.extraItems[itemId] || 0);
  }

  selectSlot(index) {
    const normalized = ((index % this.maxSlots) + this.maxSlots) % this.maxSlots;
    this.selectedSlot = normalized;
    if (this.eventBus) {
      this.eventBus.emit(LearningEvents.SLOT_SELECTED, {
        slotIndex: this.selectedSlot,
        item: this.getSelectedItem()
      });
    }
    this._notifyUpdate();
  }

  cycleSlot(delta) {
    const step = delta > 0 ? 1 : -1;
    this.selectSlot(this.selectedSlot + step);
  }

  getSelectedItem() {
    return this.slots[this.selectedSlot] || null;
  }

  getSlots() {
    return this.slots.map(s => (s ? { ...s, name: { ...s.name } } : null));
  }

  getSerializedState() {
    return {
      selectedSlot: this.selectedSlot,
      slots: this.getSlots(),
      extraItems: { ...this.extraItems }
    };
  }

  restoreState(savedInventory) {
    if (!savedInventory) return;
    this.extraItems = savedInventory.extraItems && typeof savedInventory.extraItems === 'object'
      ? { ...savedInventory.extraItems }
      : {};
    const rawSlots = Array.isArray(savedInventory) ? savedInventory : savedInventory.slots;
    if (Array.isArray(rawSlots)) {
      this.slots = new Array(this.maxSlots).fill(null);
      for (let i = 0; i < Math.min(this.maxSlots, rawSlots.length); i++) {
        const item = rawSlots[i];
        if (item && item.id && item.count > 0) {
          const def = this.getItemDefinition(item.id);
          this.slots[i] = {
            id: item.id,
            name: item.name || { ...def.name },
            icon: item.icon || def.icon,
            count: Math.min(this.maxStack, Math.max(1, Number(item.count) || 1)),
            placeable: item.placeable !== undefined ? Boolean(item.placeable) : Boolean(def.placeable),
            blockId: item.blockId !== undefined ? item.blockId : (def.blockId || null),
            toolType: item.toolType !== undefined ? item.toolType : (def.toolType || null)
          };
        }
      }
    }
    if (typeof savedInventory.selectedSlot === 'number') {
      this.selectedSlot = Math.max(0, Math.min(this.maxSlots - 1, savedInventory.selectedSlot));
    }
    this._notifyUpdate();
  }

  _notifyUpdate() {
    if (this.eventBus) {
      this.eventBus.emit(LearningEvents.INVENTORY_UPDATED, {
        slots: this.getSlots(),
        selectedSlot: this.selectedSlot,
        selectedItem: this.getSelectedItem()
      });
    }
  }
}
