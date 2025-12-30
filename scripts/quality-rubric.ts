/**
 * Quality Rubric and Scorer for Preet English Content
 * Industry-standard quality assessment system (target: 9/10)
 */

export interface QualityCriteria {
  accuracy: number;      // 0-1: Correctness of translations and pronunciations
  relevance: number;     // 0-1: Relevance to category and learning objectives
  clarity: number;       // 0-1: Clarity of explanations and examples
  completeness: number;  // 0-1: Completeness of content
  culturalSensitivity: number; // 0-1: Appropriate for Hindi-speaking audience
  pedagogy: number;      // 0-1: Educational effectiveness
  diversity: number;     // 0-1: Range of vocabulary and expressions
  coherence: number;     // 0-1: Logical flow and organization
}

export interface QualityScore {
  overall: number;       // 0-10 scale
  criteria: QualityCriteria;
  breakdown: Record<string, number>;
  feedback: string[];
}

export interface ContentToScore {
  title: string;
  content: string;
  vocabulary: Array<{
    word: string;
    hindi: string;
    pronunciation: string;
    definition: string;
    example: string;
  }>;
  conversations: Array<{
    speaker: string;
    english: string;
    hindi: string;
  }>;
  category: string;
  difficulty: string;
}

export class QualityRubric {
  private readonly WEIGHTS: QualityCriteria = {
    accuracy: 0.20,           // 20% - Most critical for language learning
    relevance: 0.15,          // 15% - Content must be relevant
    clarity: 0.15,            // 15% - Clear explanations are essential
    completeness: 0.15,       // 15% - Complete information
    culturalSensitivity: 0.15, // 15% - Important for target audience
    pedagogy: 0.10,           // 10% - Educational value
    diversity: 0.05,          // 5% - Variety in content
    coherence: 0.05           // 5% - Logical organization
  };

  /**
   * Calculate quality score for content
   */
  public scoreContent(content: ContentToScore): QualityScore {
    const criteria: QualityCriteria = {
      accuracy: this.evaluateAccuracy(content),
      relevance: this.evaluateRelevance(content),
      clarity: this.evaluateClarity(content),
      completeness: this.evaluateCompleteness(content),
      culturalSensitivity: this.evaluateCulturalSensitivity(content),
      pedagogy: this.evaluatePedagogy(content),
      diversity: this.evaluateDiversity(content),
      coherence: this.evaluateCoherence(content)
    };

    // Calculate weighted overall score
    const overall = Object.entries(criteria).reduce((sum, [key, score]) => {
      return sum + (score * this.WEIGHTS[key as keyof QualityCriteria]);
    }, 0);

    // Generate feedback
    const feedback: string[] = this.generateFeedback(content, criteria);

    return {
      overall: Math.round(overall * 100) / 10, // Scale to 0-10
      criteria,
      breakdown: this.getDetailedBreakdown(content, criteria),
      feedback
    };
  }

  /**
   * Evaluate accuracy of translations and pronunciations
   */
  private evaluateAccuracy(content: ContentToScore): number {
    let score = 0;
    const totalChecks = content.vocabulary.length + content.conversations.length;
    
    if (totalChecks === 0) return 1.0; // No content to check, assume perfect

    // Check vocabulary for proper translations
    for (const vocab of content.vocabulary) {
      if (vocab.hindi && vocab.hindi.trim().length > 0) score++;
      if (vocab.pronunciation && vocab.pronunciation.trim().length > 0) score++;
      if (vocab.definition && vocab.definition.trim().length > 0) score++;
      if (vocab.example && vocab.example.trim().length > 0) score++;
    }

    // Check conversations for translations
    for (const conv of content.conversations) {
      if (conv.hindi && conv.hindi.trim().length > 0) score++;
      if (conv.english && conv.english.trim().length > 0) score++;
    }

    return score / (totalChecks * 4); // 4 checks per vocabulary item, 2 per conversation
  }

  /**
   * Evaluate relevance to category and learning objectives
   */
  private evaluateRelevance(content: ContentToScore): number {
    // Check if content matches category
    const categoryKeywords = this.getCategoryKeywords(content.category);
    const contentText = `${content.title} ${content.content} ${content.vocabulary.map(v => `${v.word} ${v.definition} ${v.example}`).join(' ')}`;
    
    let matches = 0;
    for (const keyword of categoryKeywords) {
      if (contentText.toLowerCase().includes(keyword.toLowerCase())) {
        matches++;
      }
    }

    return Math.min(1.0, matches / Math.max(categoryKeywords.length, 1));
  }

  /**
   * Evaluate clarity of explanations and examples
   */
  private evaluateClarity(content: ContentToScore): number {
    let clarityScore = 0;
    let totalChecks = 0;

    // Check vocabulary examples for clarity
    for (const vocab of content.vocabulary) {
      totalChecks++;
      if (vocab.example && this.isClearExample(vocab.example)) {
        clarityScore++;
      }
    }

    // Check content for clarity
    if (content.content && this.isClearContent(content.content)) {
      clarityScore++;
    }
    totalChecks++;

    return totalChecks > 0 ? clarityScore / totalChecks : 1.0;
  }

  /**
   * Evaluate completeness of content
   */
  private evaluateCompleteness(content: ContentToScore): number {
    const requiredFields = [
      content.title,
      content.content,
      content.vocabulary.length > 0,
      content.conversations.length > 0
    ];

    const filledFields = requiredFields.filter(field => field).length;
    return filledFields / requiredFields.length;
  }

  /**
   * Evaluate cultural sensitivity for Hindi-speaking audience
   */
  private evaluateCulturalSensitivity(content: ContentToScore): number {
    let score = 0;
    let totalChecks = 0;

    // Check for Hindi content presence
    for (const vocab of content.vocabulary) {
      totalChecks++;
      if (vocab.hindi && this.isAppropriateHindi(vocab.hindi)) {
        score++;
      }
    }

    for (const conv of content.conversations) {
      totalChecks++;
      if (conv.hindi && this.isAppropriateHindi(conv.hindi)) {
        score++;
      }
    }

    return totalChecks > 0 ? score / totalChecks : 1.0;
  }

  /**
   * Evaluate pedagogical effectiveness
   */
  private evaluatePedagogy(content: ContentToScore): number {
    // Score based on difficulty-appropriate content
    const difficultyScore = this.getDifficultyAppropriateness(content);
    
    // Score based on vocabulary count (appropriate for lesson length)
    const vocabCount = content.vocabulary.length;
    const vocabScore = Math.min(1.0, Math.max(0.5, vocabCount / 10)); // Target: 5-10 vocab items
    
    return (difficultyScore + vocabScore) / 2;
  }

  /**
   * Evaluate diversity of vocabulary and expressions
   */
  private evaluateDiversity(content: ContentToScore): number {
    const uniqueWords = new Set(content.vocabulary.map(v => v.word.toLowerCase()));
    const uniqueRatio = uniqueWords.size / Math.max(content.vocabulary.length, 1);
    
    return Math.min(1.0, uniqueRatio * 2); // Boost for diversity
  }

  /**
   * Evaluate coherence and logical flow
   */
  private evaluateCoherence(content: ContentToScore): number {
    // Check if vocabulary and conversations relate to the main topic
    const topicWords = content.title.toLowerCase().split(/\s+/);
    const contentText = content.content.toLowerCase();
    
    let topicMatches = 0;
    for (const word of topicWords) {
      if (contentText.includes(word)) {
        topicMatches++;
      }
    }
    
    return Math.min(1.0, topicMatches / Math.max(topicWords.length, 1));
  }

  /**
   * Helper: Check if example is clear and educational
   */
  private isClearExample(example: string): boolean {
    return example.length > 5 && example.length < 200 && example.includes(' ') && !example.includes('...') && !example.includes('___');
  }

  /**
   * Helper: Check if content is clear and well-formatted
   */
  private isClearContent(content: string): boolean {
    return content.length > 10 && content.includes('#') || content.includes('\n') || content.includes('.');
  }

  /**
   * Helper: Check if Hindi content is appropriate
   */
  private isAppropriateHindi(hindi: string): boolean {
    // Basic check for valid Hindi text (Devanagari script)
    const devanagariRegex = /[\u0900-\u097F\s.,!?।]/;
    return devanagariRegex.test(hindi) && hindi.length > 1;
  }

  /**
   * Helper: Get category-specific keywords
   */
  private getCategoryKeywords(category: string): string[] {
    const categoryMap: Record<string, string[]> = {
      'daily_life': ['home', 'family', 'house', 'daily', 'everyday', 'routine', 'household'],
      'social': ['meet', 'greet', 'friend', 'social', 'introduce', 'conversation', 'chat'],
      'professional': ['work', 'office', 'job', 'business', 'meeting', 'colleague', 'professional'],
      'travel': ['travel', 'trip', 'journey', 'hotel', 'airport', 'ticket', 'destination'],
      'food': ['food', 'eat', 'drink', 'restaurant', 'meal', 'recipe', 'cooking'],
      'health': ['health', 'doctor', 'medicine', 'hospital', 'sick', 'well', 'medical'],
      'education': ['school', 'study', 'learn', 'student', 'teacher', 'class', 'education'],
      'technology': ['computer', 'phone', 'internet', 'tech', 'digital', 'software', 'app'],
      'environment': ['nature', 'environment', 'nature', 'green', 'eco', 'climate', 'earth'],
      'culture': ['culture', 'tradition', 'festival', 'custom', 'celebration', 'heritage'],
      'sports': ['sport', 'game', 'play', 'exercise', 'team', 'match', 'competition'],
      'entertainment': ['movie', 'music', 'show', 'fun', 'entertain', 'watch', 'enjoy'],
      'business': ['business', 'company', 'trade', 'market', 'commerce', 'entrepreneur'],
      'interview_practice': ['interview', 'job', 'question', 'answer', 'resume', 'career']
    };

    return categoryMap[category] || [];
  }

  /**
   * Helper: Get difficulty-appropriateness score
   */
  private getDifficultyAppropriateness(content: ContentToScore): number {
    // Basic heuristic: harder content should have more vocabulary and examples
    const vocabCount = content.vocabulary.length;
    const avgExampleLength = content.vocabulary.reduce((sum, v) => sum + v.example.length, 0) / Math.max(content.vocabulary.length, 1);
    
    if (content.difficulty === 'Beginner') {
      return Math.min(1.0, Math.max(0.5, (vocabCount / 5) * (avgExampleLength / 20)));
    } else if (content.difficulty === 'Intermediate') {
      return Math.min(1.0, Math.max(0.5, (vocabCount / 8) * (avgExampleLength / 25)));
    } else { // Advanced
      return Math.min(1.0, Math.max(0.5, (vocabCount / 12) * (avgExampleLength / 30)));
    }
  }

  /**
   * Generate detailed feedback for content
   */
  private generateFeedback(content: ContentToScore, criteria: QualityCriteria): string[] {
    const feedback: string[] = [];

    if (criteria.accuracy < 0.8) {
      feedback.push('⚠️ Translations or pronunciations may need review');
    }
    
    if (criteria.relevance < 0.7) {
      feedback.push('⚠️ Content may not align well with category');
    }
    
    if (criteria.clarity < 0.8) {
      feedback.push('⚠️ Examples or explanations could be clearer');
    }
    
    if (criteria.completeness < 0.8) {
      feedback.push('⚠️ Content appears incomplete');
    }
    
    if (criteria.culturalSensitivity < 0.8) {
      feedback.push('⚠️ Hindi content may need cultural review');
    }
    
    if (criteria.pedagogy < 0.7) {
      feedback.push('⚠️ Content may not match difficulty level appropriately');
    }

    if (feedback.length === 0) {
      feedback.push('✅ Content meets quality standards');
    }

    return feedback;
  }

  /**
   * Get detailed breakdown of scores
   */
  private getDetailedBreakdown(content: ContentToScore, criteria: QualityCriteria): Record<string, number> {
    return {
      'Accuracy Score': Math.round(criteria.accuracy * 100),
      'Relevance Score': Math.round(criteria.relevance * 100),
      'Clarity Score': Math.round(criteria.clarity * 100),
      'Completeness Score': Math.round(criteria.completeness * 100),
      'Cultural Sensitivity Score': Math.round(criteria.culturalSensitivity * 100),
      'Pedagogy Score': Math.round(criteria.pedagogy * 100),
      'Diversity Score': Math.round(criteria.diversity * 100),
      'Coherence Score': Math.round(criteria.coherence * 100)
    };
  }
}

// Example usage
export function createQualityScorer(): QualityRubric {
  return new QualityRubric();
}

// Example of how to use the quality scorer
// This code is only executed when the file is run directly
const runExample = () => {
  const scorer = new QualityRubric();
  
  const sampleContent: ContentToScore = {
    title: "Basic Greetings",
    content: "# Basic Greetings\n\nLearn essential greeting phrases for daily use.",
    vocabulary: [
      {
        word: "hello",
        hindi: "नमस्ते",
        pronunciation: "namaste",
        definition: "A common greeting",
        example: "Hello, how are you?"
      }
    ],
    conversations: [
      {
        speaker: "A",
        english: "Hello, how are you?",
        hindi: "नमस्ते, आप कैसे हैं?"
      }
    ],
    category: "daily_life",
    difficulty: "Beginner"
  };

  const score = scorer.scoreContent(sampleContent);
  console.log('Quality Score:', score.overall);
  console.log('Criteria:', score.criteria);
  console.log('Feedback:', score.feedback);
};

// Uncomment the line below to run the example
// runExample();