export class EventBus {
  constructor() {
    this.listeners = new Map();
  }

  on(eventName, callback) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    this.listeners.get(eventName).add(callback);
    return () => this.off(eventName, callback);
  }

  once(eventName, callback) {
    const wrapper = (payload) => {
      this.off(eventName, wrapper);
      callback(payload);
    };
    return this.on(eventName, wrapper);
  }

  off(eventName, callback) {
    const set = this.listeners.get(eventName);
    if (set) {
      set.delete(callback);
      if (set.size === 0) {
        this.listeners.delete(eventName);
      }
    }
  }

  emit(eventName, payload = {}) {
    const set = this.listeners.get(eventName);
    if (!set) return;
    for (const callback of [...set]) {
      try {
        callback(payload);
      } catch (err) {
        console.error(`[EventBus] Error in listener for "${eventName}":`, err);
      }
    }
  }

  clear() {
    this.listeners.clear();
  }
}

export const globalEventBus = new EventBus();
