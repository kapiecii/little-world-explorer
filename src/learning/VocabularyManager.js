const NUMBER_WORDS = [
  'Zero', 'One', 'Two', 'Three', 'Four', 'Five',
  'Six', 'Seven', 'Eight', 'Nine', 'Ten'
];

export class VocabularyManager {
  constructor(vocabularyList = [], blockDefs = [], objectDefs = []) {
    this.words = new Map();
    this.discoveredWords = new Set();
    this.wordCounts = {};

    this._registerAll(vocabularyList, blockDefs, objectDefs);
  }

  _registerAll(vocabularyList, blockDefs, objectDefs) {
    for (const item of vocabularyList) {
      this.words.set(item.id, { ...item });
    }

    for (const b of blockDefs) {
      if (!this.words.has(b.id)) {
        const colorName = b.learning?.color
          ? b.learning.color.charAt(0).toUpperCase() + b.learning.color.slice(1)
          : '';
        this.words.set(b.id, {
          id: b.id,
          category: 'english',
          subCategory: 'block',
          en: b.name.en,
          ja: b.name.ja,
          icon: b.icon || '🧱',
          levels: {
            1: `${b.name.en}!`,
            2: colorName ? `${colorName} ${b.name.en}!` : `${b.name.en}!`,
            3: `Let's build with ${b.name.en.toLowerCase()}!`
          }
        });
      }
    }

    for (const o of objectDefs) {
      if (!this.words.has(o.id)) {
        this.words.set(o.id, {
          id: o.id,
          category: 'english',
          subCategory: o.type || 'object',
          en: o.name.en,
          ja: o.name.ja,
          icon: o.icon || '✨',
          levels: {
            1: o.audio?.level1 || `${o.name.en}!`,
            2: o.audio?.level2 || `${o.name.en}!`,
            3: o.audio?.level3 || `Look at the ${o.name.en.toLowerCase()}!`
          }
        });
      }
    }
  }

  getWord(id) {
    if (!id) return null;
    if (this.words.has(id)) return this.words.get(id);
    // Fallback for flower variants
    if (id.startsWith('flower_') && this.words.has('flower')) {
      return this.words.get(id) || this.words.get('flower');
    }
    return null;
  }

  getAllWords() {
    return Array.from(this.words.values());
  }

  markDiscovered(id) {
    if (!id) return false;
    const isFirstTime = !this.discoveredWords.has(id);
    this.discoveredWords.add(id);
    this.wordCounts[id] = (this.wordCounts[id] || 0) + 1;
    return isFirstTime;
  }

  isDiscovered(id) {
    return this.discoveredWords.has(id);
  }

  getDiscoveredWords() {
    return Array.from(this.discoveredWords);
  }

  getSpeechForLevel(id, level = 1) {
    const entry = this.getWord(id);
    if (!entry) {
      return `${id}!`;
    }
    const lvlKey = String(Math.max(1, Math.min(3, Number(level) || 1)));
    return entry.levels?.[lvlKey] || entry.levels?.['1'] || `${entry.en}!`;
  }

  formatCountSpeech(nounEn, count) {
    const cleanNoun = (nounEn || 'item').toLowerCase();
    const numWord = NUMBER_WORDS[count] || String(count);
    if (count === 1) {
      return `${numWord} ${cleanNoun}!`;
    }
    const plural = cleanNoun.endsWith('s') ? cleanNoun : `${cleanNoun}s`;
    return `${numWord} ${plural}!`;
  }

  restoreState(discovered = [], counts = {}) {
    this.discoveredWords = new Set(Array.isArray(discovered) ? discovered : []);
    this.wordCounts = counts && typeof counts === 'object' ? { ...counts } : {};
  }
}
