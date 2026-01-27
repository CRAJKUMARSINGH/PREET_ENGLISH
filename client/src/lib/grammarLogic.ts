/**
 * Grammar Logic Engine for PREET_ENGLISH
 * Handles grammar analysis, correction, and feedback
 */

export interface GrammarError {
  type: 'spelling' | 'grammar' | 'punctuation' | 'style';
  message: string;
  suggestion: string;
  position: {
    start: number;
    end: number;
  };
  severity: 'low' | 'medium' | 'high';
}

export interface GrammarAnalysis {
  errors: GrammarError[];
  score: number;
  suggestions: string[];
  correctedText: string;
}

export class GrammarEngine {
  private commonErrors: Map<string, string> = new Map();
  private grammarRules: Map<string, RegExp> = new Map();

  constructor() {
    this.initializeCommonErrors();
    this.initializeGrammarRules();
  }

  private initializeCommonErrors() {
    // Common errors for Hindi speakers learning English
    this.commonErrors.set('i am going to school', 'I am going to school');
    this.commonErrors.set('he is more taller', 'he is taller');
    this.commonErrors.set('i have a good news', 'I have good news');
    this.commonErrors.set('she is having a car', 'she has a car');
    this.commonErrors.set('i am understanding', 'I understand');
    this.commonErrors.set('please do the needful', 'please take the necessary action');
    this.commonErrors.set('out of station', 'out of town');
    this.commonErrors.set('good name', 'name');
    this.commonErrors.set('what is your good name', 'what is your name');
    this.commonErrors.set('i am having', 'I have');
  }

  private initializeGrammarRules() {
    // Basic grammar rules
    this.grammarRules.set('double_comparative', /\b(more|most)\s+(better|worse|taller|shorter|bigger|smaller|faster|slower)\b/gi);
    this.grammarRules.set('incorrect_article', /\ba\s+(hour|honest|honor|heir)\b/gi);
    this.grammarRules.set('subject_verb_disagreement', /\b(he|she|it)\s+(are|have)\b/gi);
    this.grammarRules.set('missing_article', /\b(go to|at)\s+(school|college|university|hospital|market)\b/gi);
  }

  /**
   * Analyze text for grammar errors
   */
  analyzeText(text: string): GrammarAnalysis {
    const errors: GrammarError[] = [];
    let correctedText = text;
    let score = 100;

    // Check for common errors
    for (const [incorrect, correct] of this.commonErrors) {
      const regex = new RegExp(incorrect, 'gi');
      const matches = text.matchAll(regex);
      
      for (const match of matches) {
        if (match.index !== undefined) {
          errors.push({
            type: 'grammar',
            message: `Consider using "${correct}" instead of "${match[0]}"`,
            suggestion: correct,
            position: {
              start: match.index,
              end: match.index + match[0].length
            },
            severity: 'medium'
          });
          
          correctedText = correctedText.replace(match[0], correct);
          score -= 10;
        }
      }
    }

    // Check grammar rules
    for (const [ruleName, regex] of this.grammarRules) {
      const matches = text.matchAll(regex);
      
      for (const match of matches) {
        if (match.index !== undefined) {
          let message = '';
          let suggestion = '';
          
          switch (ruleName) {
            case 'double_comparative':
              message = 'Avoid using double comparatives';
              suggestion = match[0].replace(/more\s+|most\s+/gi, '');
              break;
            case 'incorrect_article':
              message = 'Use "an" before words starting with vowel sounds';
              suggestion = match[0].replace(/\ba\s+/gi, 'an ');
              break;
            case 'subject_verb_disagreement':
              message = 'Subject-verb disagreement';
              suggestion = match[0].replace(/are/gi, 'is').replace(/have/gi, 'has');
              break;
            case 'missing_article':
              message = 'Consider adding an article';
              suggestion = match[0].replace(/\b(go to|at)\s+/gi, '$1 the ');
              break;
          }
          
          errors.push({
            type: 'grammar',
            message,
            suggestion,
            position: {
              start: match.index,
              end: match.index + match[0].length
            },
            severity: 'high'
          });
          
          correctedText = correctedText.replace(match[0], suggestion);
          score -= 15;
        }
      }
    }

    // Check capitalization
    const sentences = text.split(/[.!?]+/);
    sentences.forEach((sentence, index) => {
      const trimmed = sentence.trim();
      if (trimmed && !trimmed.match(/^[A-Z]/)) {
        const sentenceStart = text.indexOf(trimmed);
        if (sentenceStart !== -1) {
          errors.push({
            type: 'grammar',
            message: 'Sentences should start with a capital letter',
            suggestion: trimmed.charAt(0).toUpperCase() + trimmed.slice(1),
            position: {
              start: sentenceStart,
              end: sentenceStart + 1
            },
            severity: 'medium'
          });
          score -= 5;
        }
      }
    });

    // Generate suggestions
    const suggestions = this.generateSuggestions(text, errors);

    return {
      errors,
      score: Math.max(0, score),
      suggestions,
      correctedText
    };
  }

  private generateSuggestions(text: string, errors: GrammarError[]): string[] {
    const suggestions: string[] = [];

    if (errors.length === 0) {
      suggestions.push('Great job! Your grammar is perfect.');
      return suggestions;
    }

    // Group errors by type
    const errorsByType = errors.reduce((acc, error) => {
      if (!acc[error.type]) acc[error.type] = [];
      acc[error.type].push(error);
      return acc;
    }, {} as Record<string, GrammarError[]>);

    // Generate type-specific suggestions
    if (errorsByType.grammar) {
      suggestions.push('Focus on subject-verb agreement and proper article usage.');
    }
    
    if (errorsByType.spelling) {
      suggestions.push('Double-check your spelling, especially for commonly confused words.');
    }

    if (errorsByType.punctuation) {
      suggestions.push('Pay attention to punctuation marks and capitalization.');
    }

    // Add specific suggestions based on error patterns
    const hasCapitalizationErrors = errors.some(e => e.message.includes('capital letter'));
    if (hasCapitalizationErrors) {
      suggestions.push('Remember to capitalize the first letter of each sentence.');
    }

    const hasArticleErrors = errors.some(e => e.message.includes('article'));
    if (hasArticleErrors) {
      suggestions.push('Practice using "a", "an", and "the" correctly.');
    }

    return suggestions;
  }

  /**
   * Get grammar tips for Hindi speakers
   */
  getHindiSpeakerTips(): string[] {
    return [
      'In English, use "I have" instead of "I am having" for possession.',
      'Avoid double comparatives like "more better" - use just "better".',
      'Use articles (a, an, the) before nouns - Hindi doesn\'t have articles.',
      'English word order is usually Subject-Verb-Object.',
      'Use "going to" for future plans, not just "will".',
      'Prepositions in English are different from Hindi - practice them.',
      'Use present simple for habits, not present continuous.',
      'Count vs. non-count nouns work differently in English.'
    ];
  }

  /**
   * Check if text is appropriate for difficulty level
   */
  checkDifficultyLevel(text: string, targetLevel: 'beginner' | 'intermediate' | 'advanced'): {
    isAppropriate: boolean;
    actualLevel: string;
    suggestions: string[];
  } {
    const wordCount = text.split(/\s+/).length;
    const avgWordLength = text.replace(/\s+/g, '').length / wordCount;
    const complexWords = text.match(/\b\w{7,}\b/g)?.length || 0;
    const complexWordRatio = complexWords / wordCount;

    let actualLevel = 'beginner';
    let isAppropriate = true;
    const suggestions: string[] = [];

    // Determine actual level
    if (avgWordLength > 5 && complexWordRatio > 0.3) {
      actualLevel = 'advanced';
    } else if (avgWordLength > 4 && complexWordRatio > 0.2) {
      actualLevel = 'intermediate';
    }

    // Check appropriateness
    if (targetLevel === 'beginner' && actualLevel !== 'beginner') {
      isAppropriate = false;
      suggestions.push('Try using simpler words and shorter sentences.');
    } else if (targetLevel === 'intermediate' && actualLevel === 'advanced') {
      isAppropriate = false;
      suggestions.push('Consider using slightly simpler vocabulary.');
    } else if (targetLevel === 'advanced' && actualLevel === 'beginner') {
      suggestions.push('You could challenge yourself with more complex vocabulary and sentence structures.');
    }

    return {
      isAppropriate,
      actualLevel,
      suggestions
    };
  }
}

// Singleton instance
export const grammarEngine = new GrammarEngine();

// Utility functions
export const analyzeGrammar = (text: string) => grammarEngine.analyzeText(text);
export const getHindiSpeakerTips = () => grammarEngine.getHindiSpeakerTips();
export const checkTextDifficulty = (text: string, level: 'beginner' | 'intermediate' | 'advanced') => 
  grammarEngine.checkDifficultyLevel(text, level);