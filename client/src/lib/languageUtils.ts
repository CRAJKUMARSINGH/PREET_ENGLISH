/**
 * Language Utilities for PREET_ENGLISH
 * Handles language detection, translation helpers, and cultural context
 */

export interface LanguageDetectionResult {
  language: 'en' | 'hi' | 'mixed' | 'unknown';
  confidence: number;
  details: {
    englishWords: number;
    hindiWords: number;
    totalWords: number;
  };
}

export interface CulturalContext {
  situation: string;
  formalLevel: 'very-formal' | 'formal' | 'neutral' | 'informal' | 'very-informal';
  culturalNotes: string[];
  alternatives: string[];
}

export class LanguageUtils {
  private englishWords: Set<string> = new Set();
  private hindiWords: Set<string> = new Set();
  private commonHinglishPatterns: RegExp[] = [];

  constructor() {
    this.initializeWordSets();
    this.initializeHinglishPatterns();
  }

  private initializeWordSets() {
    // Common English words
    const commonEnglish = [
      'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with',
      'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'she', 'or', 'an',
      'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about',
      'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him',
      'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
      'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after',
      'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because',
      'any', 'these', 'give', 'day', 'most', 'us', 'is', 'was', 'are', 'been', 'has', 'had', 'were'
    ];

    // Common Hindi words (romanized)
    const commonHindi = [
      'aur', 'hai', 'hain', 'ka', 'ki', 'ke', 'ko', 'se', 'me', 'main', 'tu', 'tum', 'aap', 'yeh', 'woh',
      'kya', 'kaun', 'kab', 'kahan', 'kaise', 'kyun', 'jo', 'jab', 'agar', 'lekin', 'par', 'ya', 'nahi',
      'haan', 'achha', 'theek', 'sahi', 'galat', 'bhi', 'sirf', 'bas', 'abhi', 'phir', 'kabhi', 'hamesha',
      'sabhi', 'koi', 'kuch', 'sab', 'zyada', 'kam', 'bahut', 'thoda', 'pura', 'adha', 'pehle', 'baad',
      'upar', 'neeche', 'andar', 'bahar', 'paas', 'dur', 'yahan', 'wahan', 'ghar', 'school', 'office',
      'paani', 'khana', 'time', 'din', 'raat', 'subah', 'shaam', 'dost', 'family', 'mummy', 'papa'
    ];

    commonEnglish.forEach(word => this.englishWords.add(word.toLowerCase()));
    commonHindi.forEach(word => this.hindiWords.add(word.toLowerCase()));
  }

  private initializeHinglishPatterns() {
    // Common Hinglish patterns
    this.commonHinglishPatterns = [
      /\b(kar|kar ke|kar diya|kar do|kar raha|kar rahe)\b/gi,
      /\b(ho|ho gaya|ho raha|ho rahe|ho jayega)\b/gi,
      /\b(na|nahi|mat|kyun|kya|kaun|kab|kahan)\b/gi,
      /\b(ji|haan|achha|theek|sahi)\b/gi,
      /\b(bhi|sirf|bas|abhi|phir)\b/gi
    ];
  }

  /**
   * Detect language of input text
   */
  detectLanguage(text: string): LanguageDetectionResult {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const totalWords = words.length;
    
    if (totalWords === 0) {
      return {
        language: 'unknown',
        confidence: 0,
        details: { englishWords: 0, hindiWords: 0, totalWords: 0 }
      };
    }

    let englishWords = 0;
    let hindiWords = 0;

    words.forEach(word => {
      if (this.englishWords.has(word)) {
        englishWords++;
      } else if (this.hindiWords.has(word)) {
        hindiWords++;
      }
    });

    // Check for Hinglish patterns
    let hinglishPatterns = 0;
    this.commonHinglishPatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) hinglishPatterns += matches.length;
    });

    const englishRatio = englishWords / totalWords;
    const hindiRatio = (hindiWords + hinglishPatterns) / totalWords;

    let language: 'en' | 'hi' | 'mixed' | 'unknown';
    let confidence: number;

    if (englishRatio > 0.7) {
      language = 'en';
      confidence = englishRatio;
    } else if (hindiRatio > 0.7) {
      language = 'hi';
      confidence = hindiRatio;
    } else if (englishRatio > 0.3 && hindiRatio > 0.3) {
      language = 'mixed';
      confidence = Math.min(englishRatio + hindiRatio, 1);
    } else {
      language = 'unknown';
      confidence = Math.max(englishRatio, hindiRatio);
    }

    return {
      language,
      confidence,
      details: {
        englishWords,
        hindiWords: hindiWords + hinglishPatterns,
        totalWords
      }
    };
  }

  /**
   * Get cultural context for a phrase or situation
   */
  getCulturalContext(text: string, situation?: string): CulturalContext {
    const lowerText = text.toLowerCase();
    
    // Determine formality level
    let formalLevel: CulturalContext['formalLevel'] = 'neutral';
    const culturalNotes: string[] = [];
    const alternatives: string[] = [];

    // Check for formal indicators
    if (lowerText.includes('sir') || lowerText.includes('madam') || lowerText.includes('please') || lowerText.includes('kindly')) {
      formalLevel = 'formal';
    }

    // Check for very formal indicators
    if (lowerText.includes('your good name') || lowerText.includes('do the needful') || lowerText.includes('revert back')) {
      formalLevel = 'very-formal';
      culturalNotes.push('This is a very Indian English expression');
    }

    // Check for informal indicators
    if (lowerText.includes('yaar') || lowerText.includes('bro') || lowerText.includes('dude')) {
      formalLevel = 'informal';
    }

    // Specific cultural contexts
    if (lowerText.includes('what is your good name')) {
      culturalNotes.push('In Indian English, "good name" is common, but in international English, just say "What is your name?"');
      alternatives.push('What is your name?', 'May I know your name?', 'Could you tell me your name?');
    }

    if (lowerText.includes('do the needful')) {
      culturalNotes.push('This is a common Indian English phrase, but internationally use more specific language');
      alternatives.push('Please take the necessary action', 'Please handle this', 'Please take care of this');
    }

    if (lowerText.includes('out of station')) {
      culturalNotes.push('Indian English uses "out of station", but internationally say "out of town"');
      alternatives.push('out of town', 'traveling', 'away on business');
    }

    if (lowerText.includes('prepone')) {
      culturalNotes.push('"Prepone" is Indian English. Internationally, use "move forward" or "reschedule earlier"');
      alternatives.push('move the meeting forward', 'reschedule to an earlier time', 'advance the deadline');
    }

    // Situation-specific contexts
    const contextSituation = situation || this.detectSituation(text);

    return {
      situation: contextSituation,
      formalLevel,
      culturalNotes,
      alternatives
    };
  }

  private detectSituation(text: string): string {
    const lowerText = text.toLowerCase();

    if (lowerText.includes('meeting') || lowerText.includes('office') || lowerText.includes('work')) {
      return 'professional';
    }
    if (lowerText.includes('restaurant') || lowerText.includes('order') || lowerText.includes('food')) {
      return 'dining';
    }
    if (lowerText.includes('shop') || lowerText.includes('buy') || lowerText.includes('price')) {
      return 'shopping';
    }
    if (lowerText.includes('doctor') || lowerText.includes('hospital') || lowerText.includes('medicine')) {
      return 'medical';
    }
    if (lowerText.includes('friend') || lowerText.includes('family') || lowerText.includes('home')) {
      return 'personal';
    }

    return 'general';
  }

  /**
   * Convert Hinglish to proper English
   */
  convertHinglishToEnglish(text: string): string {
    let converted = text;

    // Common Hinglish to English conversions
    const conversions = new Map([
      ['what is your good name', 'what is your name'],
      ['do the needful', 'take the necessary action'],
      ['out of station', 'out of town'],
      ['prepone', 'reschedule earlier'],
      ['revert back', 'reply'],
      ['good name', 'name'],
      ['itself', ''], // Remove unnecessary "itself"
      ['only', ''], // Remove unnecessary "only" at end of sentences
      ['na', 'right?'],
      ['yaar', 'friend'],
      ['achha', 'okay'],
      ['theek hai', 'alright'],
      ['bas', 'just'],
      ['abhi', 'now'],
      ['phir', 'then']
    ]);

    conversions.forEach((english, hinglish) => {
      const regex = new RegExp(hinglish, 'gi');
      converted = converted.replace(regex, english);
    });

    return converted.trim();
  }

  /**
   * Get pronunciation tips for Hindi speakers
   */
  getPronunciationTips(word: string): string[] {
    const tips: string[] = [];
    const lowerWord = word.toLowerCase();

    // Common pronunciation challenges for Hindi speakers
    if (lowerWord.includes('th')) {
      tips.push('For "th" sounds, place your tongue between your teeth');
    }

    if (lowerWord.includes('w')) {
      tips.push('English "w" is different from Hindi "व" - round your lips more');
    }

    if (lowerWord.includes('v')) {
      tips.push('English "v" requires touching your lower lip to upper teeth');
    }

    if (lowerWord.match(/[aeiou]{2,}/)) {
      tips.push('Pay attention to vowel combinations - they may sound different from Hindi');
    }

    if (lowerWord.endsWith('ed')) {
      tips.push('Past tense "-ed" can be pronounced as /t/, /d/, or /ɪd/ depending on the preceding sound');
    }

    if (lowerWord.includes('r')) {
      tips.push('English "r" is softer than Hindi "र" - don\'t roll it');
    }

    return tips;
  }

  /**
   * Check if text uses Indian English patterns
   */
  hasIndianEnglishPatterns(text: string): {
    hasPatterns: boolean;
    patterns: string[];
    suggestions: string[];
  } {
    const patterns: string[] = [];
    const suggestions: string[] = [];
    const lowerText = text.toLowerCase();

    const indianPatterns = [
      { pattern: 'good name', suggestion: 'Use just "name"' },
      { pattern: 'do the needful', suggestion: 'Be more specific about what action is needed' },
      { pattern: 'out of station', suggestion: 'Use "out of town" or "traveling"' },
      { pattern: 'prepone', suggestion: 'Use "reschedule earlier" or "move forward"' },
      { pattern: 'revert back', suggestion: 'Use just "reply" or "respond"' },
      { pattern: 'i am having', suggestion: 'Use "I have" for possession' },
      { pattern: 'more better', suggestion: 'Use just "better"' },
      { pattern: 'less worse', suggestion: 'Use just "worse"' }
    ];

    indianPatterns.forEach(({ pattern, suggestion }) => {
      if (lowerText.includes(pattern)) {
        patterns.push(pattern);
        suggestions.push(suggestion);
      }
    });

    return {
      hasPatterns: patterns.length > 0,
      patterns,
      suggestions
    };
  }
}

// Singleton instance
export const languageUtils = new LanguageUtils();

// Utility functions
export const detectLanguage = (text: string) => languageUtils.detectLanguage(text);
export const getCulturalContext = (text: string, situation?: string) => 
  languageUtils.getCulturalContext(text, situation);
export const convertHinglishToEnglish = (text: string) => languageUtils.convertHinglishToEnglish(text);
export const getPronunciationTips = (word: string) => languageUtils.getPronunciationTips(word);
export const checkIndianEnglishPatterns = (text: string) => languageUtils.hasIndianEnglishPatterns(text);