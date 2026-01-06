/**
 * Master Stoplist for Basic/Common Vocabulary
 * Excludes basic/common words that don't need to be taught in advanced lessons
 */

export interface StoplistEntry {
  word: string;
  frequency: number; // 1-10 scale, higher means more common
  categories: string[]; // Categories where this word should be excluded
  reason: string; // Why this word is in the stoplist
}

export class VocabularyStoplist {
  private readonly stoplist: Map<string, StoplistEntry>;

  constructor() {
    this.stoplist = new Map();
    this.initializeStoplist();
  }

  /**
   * Initialize the master stoplist with common vocabulary
   */
  private initializeStoplist(): void {
    const stoplistData: StoplistEntry[] = [
      // Basic pronouns
      { word: 'i', frequency: 10, categories: ['intermediate', 'advanced'], reason: 'Basic pronoun' },
      { word: 'you', frequency: 10, categories: ['intermediate', 'advanced'], reason: 'Basic pronoun' },
      { word: 'he', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic pronoun' },
      { word: 'she', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic pronoun' },
      { word: 'it', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic pronoun' },
      { word: 'we', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic pronoun' },
      { word: 'they', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic pronoun' },
      { word: 'me', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic pronoun' },
      { word: 'him', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic pronoun' },
      { word: 'her', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic pronoun' },
      { word: 'us', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic pronoun' },
      { word: 'them', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic pronoun' },
      { word: 'my', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic possessive' },
      { word: 'your', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic possessive' },
      { word: 'his', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic possessive' },
      { word: 'her', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic possessive' },
      { word: 'its', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic possessive' },
      { word: 'our', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic possessive' },
      { word: 'their', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic possessive' },
      { word: 'mine', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic possessive' },
      { word: 'yours', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic possessive' },
      { word: 'hers', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic possessive' },
      { word: 'ours', frequency: 5, categories: ['intermediate', 'advanced'], reason: 'Basic possessive' },
      { word: 'theirs', frequency: 5, categories: ['intermediate', 'advanced'], reason: 'Basic possessive' },

      // Basic articles and determiners
      { word: 'the', frequency: 10, categories: ['intermediate', 'advanced'], reason: 'Basic article' },
      { word: 'a', frequency: 10, categories: ['intermediate', 'advanced'], reason: 'Basic article' },
      { word: 'an', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic article' },
      { word: 'this', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic demonstrative' },
      { word: 'that', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic demonstrative' },
      { word: 'these', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic demonstrative' },
      { word: 'those', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic demonstrative' },
      { word: 'some', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic determiner' },
      { word: 'any', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic determiner' },
      { word: 'all', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic determiner' },
      { word: 'each', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic determiner' },
      { word: 'every', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic determiner' },
      { word: 'either', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic determiner' },
      { word: 'neither', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic determiner' },
      { word: 'both', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic determiner' },
      { word: 'few', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic determiner' },
      { word: 'many', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic determiner' },
      { word: 'much', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic determiner' },
      { word: 'several', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic determiner' },
      { word: 'most', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic determiner' },
      { word: 'other', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic determiner' },
      { word: 'another', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic determiner' },
      { word: 'which', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic determiner' },
      { word: 'whose', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic determiner' },
      { word: 'what', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic determiner' },
      { word: 'who', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic determiner' },
      { word: 'whom', frequency: 5, categories: ['advanced'], reason: 'Basic determiner' },

      // Basic prepositions
      { word: 'in', frequency: 10, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'on', frequency: 10, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'at', frequency: 10, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'by', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'for', frequency: 10, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'of', frequency: 10, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'to', frequency: 10, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'with', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'about', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'as', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'from', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'up', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'out', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'down', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'off', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'over', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'under', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'again', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'further', frequency: 6, categories: ['advanced'], reason: 'Basic preposition' },
      { word: 'then', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'once', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'here', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'there', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'when', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'where', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'why', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'how', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'all', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'any', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'both', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'each', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'few', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'more', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'most', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'other', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'some', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'such', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'no', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'nor', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'not', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'only', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'own', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'same', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'so', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'than', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'too', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'very', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'can', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'will', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'just', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'don', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition contraction' },
      { word: 'should', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },
      { word: 'now', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic preposition' },

      // Basic verbs
      { word: 'be', frequency: 10, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },
      { word: 'have', frequency: 10, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },
      { word: 'do', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },
      { word: 'say', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },
      { word: 'get', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },
      { word: 'make', frequency: 10, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },
      { word: 'go', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },
      { word: 'know', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },
      { word: 'take', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },
      { word: 'see', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },
      { word: 'come', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },
      { word: 'think', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },
      { word: 'look', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },
      { word: 'want', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },
      { word: 'give', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },
      { word: 'use', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },
      { word: 'find', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },
      { word: 'tell', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },
      { word: 'ask', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },
      { word: 'work', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },
      { word: 'seem', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },
      { word: 'feel', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },
      { word: 'try', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },
      { word: 'leave', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },
      { word: 'call', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic verb' },

      // Basic adjectives
      { word: 'good', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },
      { word: 'new', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },
      { word: 'first', frequency: 10, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },
      { word: 'last', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },
      { word: 'long', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },
      { word: 'great', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },
      { word: 'little', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },
      { word: 'own', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },
      { word: 'other', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },
      { word: 'old', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },
      { word: 'right', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },
      { word: 'big', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },
      { word: 'high', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },
      { word: 'different', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },
      { word: 'small', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },
      { word: 'large', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },
      { word: 'next', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },
      { word: 'early', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },
      { word: 'young', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },
      { word: 'important', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },
      { word: 'few', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },
      { word: 'public', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },
      { word: 'bad', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },
      { word: 'same', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },
      { word: 'able', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic adjective' },

      // Basic adverbs
      { word: 'up', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'so', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'out', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'just', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'now', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'how', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'then', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'more', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'also', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'here', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'well', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'only', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'very', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'even', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'back', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'there', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'down', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'still', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'in', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'as', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'too', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'when', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'never', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'really', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'most', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },
      { word: 'often', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic adverb' },

      // Numbers
      { word: 'one', frequency: 10, categories: ['intermediate', 'advanced'], reason: 'Basic number' },
      { word: 'two', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic number' },
      { word: 'three', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic number' },
      { word: 'four', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic number' },
      { word: 'five', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic number' },
      { word: 'six', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic number' },
      { word: 'seven', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic number' },
      { word: 'eight', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic number' },
      { word: 'nine', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic number' },
      { word: 'ten', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic number' },
      { word: 'first', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic number ordinal' },
      { word: 'second', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic number ordinal' },
      { word: 'third', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic number ordinal' },
      { word: 'fourth', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic number ordinal' },
      { word: 'fifth', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic number ordinal' },

      // Time-related words
      { word: 'time', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic time word' },
      { word: 'year', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic time word' },
      { word: 'day', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic time word' },
      { word: 'week', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic time word' },
      { word: 'month', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic time word' },
      { word: 'today', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic time word' },
      { word: 'yesterday', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic time word' },
      { word: 'tomorrow', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic time word' },
      { word: 'morning', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic time word' },
      { word: 'evening', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic time word' },
      { word: 'night', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic time word' },
      { word: 'hour', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic time word' },
      { word: 'minute', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic time word' },
      { word: 'second', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic time word' },
      { word: 'now', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic time word' },
      { word: 'soon', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic time word' },
      { word: 'later', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic time word' },
      { word: 'early', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic time word' },
      { word: 'ago', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic time word' },
      { word: 'before', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic time word' },
      { word: 'after', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic time word' },
      { word: 'while', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic time word' },
      { word: 'since', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic time word' },
      { word: 'until', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic time word' },

      // Family and people
      { word: 'man', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic person word' },
      { word: 'woman', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic person word' },
      { word: 'child', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic person word' },
      { word: 'people', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic person word' },
      { word: 'person', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic person word' },
      { word: 'family', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic person word' },
      { word: 'mother', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic person word' },
      { word: 'father', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic person word' },
      { word: 'parent', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic person word' },
      { word: 'son', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic person word' },
      { word: 'daughter', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic person word' },
      { word: 'sister', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic person word' },
      { word: 'brother', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic person word' },
      { word: 'friend', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic person word' },
      { word: 'boy', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic person word' },
      { word: 'girl', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic person word' },
      { word: 'husband', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic person word' },
      { word: 'wife', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic person word' },
      { word: 'teacher', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic person word' },
      { word: 'student', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic person word' },
      { word: 'doctor', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic person word' },
      { word: 'student', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic person word' },

      // Common Hindi words that don't need translation in advanced contexts
      { word: 'ka', frequency: 10, categories: ['intermediate', 'advanced'], reason: 'Hindi grammatical particle' },
      { word: 'ke', frequency: 10, categories: ['intermediate', 'advanced'], reason: 'Hindi grammatical particle' },
      { word: 'ki', frequency: 10, categories: ['intermediate', 'advanced'], reason: 'Hindi grammatical particle' },
      { word: 'hai', frequency: 10, categories: ['intermediate', 'advanced'], reason: 'Hindi verb form' },
      { word: 'hain', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Hindi verb form' },
      { word: 'tha', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Hindi verb form' },
      { word: 'the', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Hindi verb form' },
      { word: 'raha', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Hindi verb form' },
      { word: 'rahi', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Hindi verb form' },
      { word: 'rahe', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Hindi verb form' },
      { word: 'na', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Hindi particle' },
      { word: 'nahi', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Hindi particle' },
      { word: 'to', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Hindi particle' },
      { word: 'hi', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Hindi particle' },
      { word: 'bhi', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Hindi particle' },
      { word: 'hi', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Hindi particle' },
      { word: 'se', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Hindi postposition' },
      { word: 'me', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Hindi postposition' },
      { word: 'par', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Hindi postposition' },
      { word: 'ne', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Hindi postposition' },
      { word: 'kaun', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi question word' },
      { word: 'kyun', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi question word' },
      { word: 'kya', frequency: 9, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi question word' },
      { word: 'kab', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi question word' },
      { word: 'kahan', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi question word' },
      { word: 'kaise', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi question word' },
      { word: 'kaun', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi question word' },
      { word: 'yeh', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi demonstrative' },
      { word: 'vah', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi demonstrative' },
      { word: 'ye', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi demonstrative' },
      { word: 'wo', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi demonstrative' },
      { word: 'ham', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi pronoun' },
      { word: 'hum', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi pronoun' },
      { word: 'tum', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi pronoun' },
      { word: 'aap', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi pronoun' },
      { word: 'mai', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi pronoun' },
      { word: 'main', frequency: 8, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi pronoun' },
      { word: 'tera', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi pronoun' },
      { word: 'tera', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi pronoun' },
      { word: 'mera', frequency: 7, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi pronoun' },
      { word: 'hamara', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi pronoun' },
      { word: 'aapka', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi pronoun' },
      { word: 'iska', frequency: 6, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi pronoun' },
      { word: 'unaka', frequency: 5, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi pronoun' },
      { word: 'inaka', frequency: 5, categories: ['intermediate', 'advanced'], reason: 'Basic Hindi pronoun' }
    ];

    // Add all entries to the stoplist map
    for (const entry of stoplistData) {
      this.stoplist.set(entry.word.toLowerCase(), entry);
    }
  }

  /**
   * Check if a word should be excluded based on the stoplist
   */
  public shouldExclude(word: string, category: string, difficulty: string = 'beginner'): boolean {
    const normalizedWord = word.toLowerCase().trim();
    const entry = this.stoplist.get(normalizedWord);
    
    if (!entry) {
      return false; // Word not in stoplist
    }

    // Check if this word should be excluded for the given difficulty level
    // More common words are excluded from higher difficulty levels
    if (difficulty === 'advanced' && entry.categories.includes('advanced')) {
      return true;
    } else if (difficulty === 'intermediate' && entry.categories.includes('intermediate')) {
      return true;
    } else if (difficulty === 'beginner' && entry.categories.includes('beginner')) {
      return true;
    }

    // Also check if the word should be excluded for the specific category
    if (entry.categories.includes(category)) {
      return true;
    }

    return false;
  }

  /**
   * Filter vocabulary based on stoplist
   */
  public filterVocabulary(vocabulary: Array<{word: string, hindi: string, pronunciation: string, definition: string, example: string}>, 
                         category: string, 
                         difficulty: string = 'beginner'): Array<{word: string, hindi: string, pronunciation: string, definition: string, example: string}> {
    return vocabulary.filter(vocab => !this.shouldExclude(vocab.word, category, difficulty));
  }

  /**
   * Get stoplist entry for a word
   */
  public getStoplistEntry(word: string): StoplistEntry | undefined {
    return this.stoplist.get(word.toLowerCase());
  }

  /**
   * Get all words in stoplist for a specific category
   */
  public getWordsForCategory(category: string): StoplistEntry[] {
    return Array.from(this.stoplist.values())
      .filter(entry => entry.categories.includes(category));
  }

  /**
   * Get all words in stoplist for a specific difficulty level
   */
  public getWordsForDifficulty(difficulty: string): StoplistEntry[] {
    return Array.from(this.stoplist.values())
      .filter(entry => entry.categories.includes(difficulty));
  }

  /**
   * Get stoplist statistics
   */
  public getStatistics(): Record<string, number> {
    const stats: Record<string, number> = {};
    
    for (const entry of this.stoplist.values()) {
      for (const category of entry.categories) {
        stats[category] = (stats[category] || 0) + 1;
      }
    }
    
    return stats;
  }

  /**
   * Add a new word to the stoplist
   */
  public addToStoplist(entry: StoplistEntry): void {
    this.stoplist.set(entry.word.toLowerCase(), entry);
  }

  /**
   * Remove a word from the stoplist
   */
  public removeFromStoplist(word: string): boolean {
    return this.stoplist.delete(word.toLowerCase());
  }

  /**
   * Get the entire stoplist
   */
  public getAllStoplist(): Map<string, StoplistEntry> {
    return new Map(this.stoplist);
  }
}

// Example usage
export function createVocabularyStoplist(): VocabularyStoplist {
  return new VocabularyStoplist();
}

// Example of how to use the stoplist
// This code is only executed when the file is run directly
const runVocabularyStoplistExample = () => {
  const stoplist = new VocabularyStoplist();
  
  console.log('Stoplist statistics:', stoplist.getStatistics());
  
  // Test some words
  console.log('Should exclude "the" for intermediate:', stoplist.shouldExclude('the', 'daily_life', 'intermediate'));
  console.log('Should exclude "hello" for intermediate:', stoplist.shouldExclude('hello', 'daily_life', 'intermediate'));
  
  // Test filtering vocabulary
  const testVocab = [
    { word: 'hello', hindi: 'नमस्ते', pronunciation: 'namaste', definition: 'greeting', example: 'Hello, how are you?' },
    { word: 'the', hindi: 'वह', pronunciation: 'vah', definition: 'definite article', example: 'The book is good' },
    { word: 'and', hindi: 'और', pronunciation: 'aur', definition: 'conjunction', example: 'Tea and coffee' }
  ];
  
  const filtered = stoplist.filterVocabulary(testVocab, 'daily_life', 'intermediate');
  console.log('Filtered vocabulary:', filtered);
};

// Uncomment the line below to run the example
// runVocabularyStoplistExample();