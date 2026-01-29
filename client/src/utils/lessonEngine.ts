/**
 * GENIUS LESSON ENGINE
 * 
 * Central Intelligence for lesson flow management and content integration
 * Ensures no lesson is orphaned and provides perfect navigation flow
 */

import { Lesson } from '@shared/schema';

export interface EnrichedLesson extends Lesson {
  metadata: {
    isFirst: boolean;
    isLast: boolean;
    nextId: number | null;
    prevId: number | null;
    estimatedTime: string;
    completionRate: number;
    hindiReadiness: boolean;
    qualityScore: number;
  };
  navigation: {
    nextLesson?: EnrichedLesson;
    prevLesson?: EnrichedLesson;
    relatedLessons: EnrichedLesson[];
  };
  hindiMeta: {
    title: string;
    description: string;
    cta: string;
    culturalContext?: string;
  };
}

export interface LessonFlowMap {
  byId: Map<number, EnrichedLesson>;
  byCategory: Map<string, EnrichedLesson[]>;
  byDifficulty: Map<string, EnrichedLesson[]>;
  sequence: EnrichedLesson[];
}

class LessonEngine {
  private flowMap: LessonFlowMap | null = null;

  /**
   * Creates an integrated flow from raw lesson data
   * Automatically links lessons and enriches with metadata
   */
  public createIntegratedFlow(rawLessons: Lesson[]): LessonFlowMap {
    // Sort lessons by order to ensure logical 1 -> N flow
    const sorted = [...rawLessons].sort((a, b) => a.order - b.order);
    
    // Enrich each lesson with metadata and navigation
    const enriched: EnrichedLesson[] = sorted.map((lesson, index) => {
      return this.enrichLesson(lesson, index, sorted);
    });

    // Build the flow map for efficient lookups
    const flowMap: LessonFlowMap = {
      byId: new Map(),
      byCategory: new Map(),
      byDifficulty: new Map(),
      sequence: enriched
    };

    // Populate maps
    enriched.forEach(lesson => {
      flowMap.byId.set(lesson.id, lesson);
      
      // Group by category
      if (!flowMap.byCategory.has(lesson.category)) {
        flowMap.byCategory.set(lesson.category, []);
      }
      flowMap.byCategory.get(lesson.category)!.push(lesson);
      
      // Group by difficulty
      if (!flowMap.byDifficulty.has(lesson.difficulty)) {
        flowMap.byDifficulty.set(lesson.difficulty, []);
      }
      flowMap.byDifficulty.get(lesson.difficulty)!.push(lesson);
    });

    // Add navigation references
    this.linkNavigationReferences(enriched, flowMap);

    this.flowMap = flowMap;
    return flowMap;
  }

  /**
   * Enriches a single lesson with Grade 9 metadata
   */
  private enrichLesson(lesson: Lesson, index: number, allLessons: Lesson[]): EnrichedLesson {
    const wordCount = this.estimateWordCount(lesson.content);
    const hindiReadiness = this.assessHindiReadiness(lesson);
    const qualityScore = this.calculateQualityScore(lesson);

    return {
      ...lesson,
      metadata: {
        isFirst: index === 0,
        isLast: index === allLessons.length - 1,
        nextId: allLessons[index + 1]?.id || null,
        prevId: allLessons[index - 1]?.id || null,
        estimatedTime: this.calculateEstimatedTime(wordCount),
        completionRate: 0, // Will be updated from user progress
        hindiReadiness,
        qualityScore
      },
      navigation: {
        nextLesson: undefined, // Will be populated later
        prevLesson: undefined, // Will be populated later
        relatedLessons: [] // Will be populated based on category/difficulty
      },
      hindiMeta: this.generateHindiMeta(lesson)
    };
  }

  /**
   * Links navigation references between lessons
   */
  private linkNavigationReferences(lessons: EnrichedLesson[], flowMap: LessonFlowMap): void {
    lessons.forEach((lesson, index) => {
      // Link previous/next lessons
      if (index > 0) {
        lesson.navigation.prevLesson = lessons[index - 1];
      }
      if (index < lessons.length - 1) {
        lesson.navigation.nextLesson = lessons[index + 1];
      }

      // Find related lessons (same category, different difficulty or vice versa)
      lesson.navigation.relatedLessons = this.findRelatedLessons(lesson, flowMap);
    });
  }

  /**
   * Finds related lessons based on category and difficulty
   */
  private findRelatedLessons(lesson: EnrichedLesson, flowMap: LessonFlowMap): EnrichedLesson[] {
    const related: EnrichedLesson[] = [];
    
    // Same category, different difficulty
    const categoryLessons = flowMap.byCategory.get(lesson.category) || [];
    const sameCategoryDifferentDifficulty = categoryLessons.filter(l => 
      l.id !== lesson.id && l.difficulty !== lesson.difficulty
    );
    
    // Same difficulty, different category
    const difficultyLessons = flowMap.byDifficulty.get(lesson.difficulty) || [];
    const sameDifficultyDifferentCategory = difficultyLessons.filter(l => 
      l.id !== lesson.id && l.category !== lesson.category
    );

    // Combine and limit to 5 most relevant
    related.push(...sameCategoryDifferentDifficulty.slice(0, 3));
    related.push(...sameDifficultyDifferentCategory.slice(0, 2));

    return related.slice(0, 5);
  }

  /**
   * Generates Hindi metadata for a lesson
   */
  private generateHindiMeta(lesson: Lesson): EnrichedLesson['hindiMeta'] {
    // Use existing Hindi fields or generate intelligent defaults
    const title = lesson.hindiTitle || this.translateToHindi(lesson.title);
    const description = lesson.hindiDescription || this.generateHindiDescription(lesson);
    
    return {
      title,
      description,
      cta: "पाठ शुरू करें", // "Start Lesson"
      culturalContext: this.generateCulturalContext(lesson)
    };
  }

  /**
   * Assesses if a lesson has adequate Hindi support
   */
  private assessHindiReadiness(lesson: Lesson): boolean {
    const hasHindiTitle = lesson.hindiTitle && lesson.hindiTitle.trim().length > 0;
    const hasHindiDescription = lesson.hindiDescription && lesson.hindiDescription.trim().length > 0;
    const hasDevanagariContent = this.containsDevanagari(lesson.hindiTitle || '') || 
                                this.containsDevanagari(lesson.hindiDescription || '');
    
    return hasHindiTitle && hasHindiDescription && hasDevanagariContent;
  }

  /**
   * Calculates a quality score for the lesson (Grade 9 standard)
   */
  private calculateQualityScore(lesson: Lesson): number {
    let score = 0;
    const maxScore = 100;

    // Content quality (40 points)
    if (lesson.content && lesson.content.length > 100) score += 20;
    if (lesson.content && lesson.content.length > 500) score += 20;

    // Hindi support (30 points)
    if (lesson.hindiTitle) score += 15;
    if (lesson.hindiDescription) score += 15;

    // Metadata completeness (20 points)
    if (lesson.description && lesson.description.length > 50) score += 10;
    if (lesson.category && lesson.category !== 'General') score += 5;
    if (lesson.imageUrl) score += 5;

    // Structure (10 points)
    if (lesson.difficulty && ['Beginner', 'Intermediate', 'Advanced'].includes(lesson.difficulty)) score += 5;
    if (lesson.order && lesson.order > 0) score += 5;

    return Math.min(score, maxScore);
  }

  /**
   * Estimates word count from content
   */
  private estimateWordCount(content: string): number {
    return content.split(/\s+/).filter(word => word.length > 0).length;
  }

  /**
   * Calculates estimated reading/completion time
   */
  private calculateEstimatedTime(wordCount: number): string {
    // Average reading speed: 200 words per minute
    // Add time for exercises and interaction
    const readingMinutes = wordCount / 200;
    const totalMinutes = Math.ceil(readingMinutes * 1.5); // 50% extra for interaction
    
    if (totalMinutes < 1) return "< 1 min";
    if (totalMinutes < 60) return `${totalMinutes} min`;
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }

  /**
   * Checks if text contains Devanagari characters
   */
  private containsDevanagari(text: string): boolean {
    return /[\u0900-\u097F]/.test(text);
  }

  /**
   * Simple title translation (in real app, use proper translation service)
   */
  private translateToHindi(title: string): string {
    const commonTranslations: Record<string, string> = {
      'Introduction': 'परिचय',
      'Basic': 'बुनियादी',
      'Advanced': 'उन्नत',
      'Grammar': 'व्याकरण',
      'Vocabulary': 'शब्दावली',
      'Conversation': 'बातचीत',
      'Pronunciation': 'उच्चारण',
      'Listening': 'सुनना',
      'Speaking': 'बोलना',
      'Reading': 'पढ़ना',
      'Writing': 'लेखन'
    };

    // Simple word replacement
    let translated = title;
    Object.entries(commonTranslations).forEach(([en, hi]) => {
      translated = translated.replace(new RegExp(en, 'gi'), hi);
    });

    return translated !== title ? translated : `${title} (पाठ)`;
  }

  /**
   * Generates Hindi description based on lesson content
   */
  private generateHindiDescription(lesson: Lesson): string {
    const difficulty = lesson.difficulty.toLowerCase();
    const category = lesson.category.toLowerCase();
    
    let description = "इस पाठ में आप ";
    
    if (category.includes('grammar')) {
      description += "व्याकरण के नियम";
    } else if (category.includes('vocabulary')) {
      description += "नए शब्द";
    } else if (category.includes('conversation')) {
      description += "बातचीत के तरीके";
    } else {
      description += "अंग्रेजी भाषा के महत्वपूर्ण पहलू";
    }
    
    description += " सीखेंगे। ";
    
    if (difficulty === 'beginner') {
      description += "यह शुरुआती स्तर का पाठ है।";
    } else if (difficulty === 'intermediate') {
      description += "यह मध्यम स्तर का पाठ है।";
    } else {
      description += "यह उन्नत स्तर का पाठ है।";
    }

    return description;
  }

  /**
   * Generates cultural context for the lesson
   */
  private generateCulturalContext(lesson: Lesson): string | undefined {
    if (lesson.category.toLowerCase().includes('business')) {
      return "भारतीय व्यापारिक संदर्भ में उपयोगी";
    } else if (lesson.category.toLowerCase().includes('social')) {
      return "सामाजिक परिस्थितियों में प्रयोग";
    } else if (lesson.category.toLowerCase().includes('formal')) {
      return "औपचारिक अवसरों के लिए उपयुक्त";
    }
    return undefined;
  }

  /**
   * Gets the next lesson in the sequence
   */
  public getNextLesson(currentId: number): EnrichedLesson | null {
    if (!this.flowMap) return null;
    const current = this.flowMap.byId.get(currentId);
    return current?.navigation.nextLesson || null;
  }

  /**
   * Gets the previous lesson in the sequence
   */
  public getPreviousLesson(currentId: number): EnrichedLesson | null {
    if (!this.flowMap) return null;
    const current = this.flowMap.byId.get(currentId);
    return current?.navigation.prevLesson || null;
  }

  /**
   * Gets lessons by category
   */
  public getLessonsByCategory(category: string): EnrichedLesson[] {
    if (!this.flowMap) return [];
    return this.flowMap.byCategory.get(category) || [];
  }

  /**
   * Gets lessons by difficulty
   */
  public getLessonsByDifficulty(difficulty: string): EnrichedLesson[] {
    if (!this.flowMap) return [];
    return this.flowMap.byDifficulty.get(difficulty) || [];
  }

  /**
   * Validates the lesson flow for Grade 9 compliance
   */
  public validateFlow(): { isValid: boolean; issues: string[] } {
    if (!this.flowMap) {
      return { isValid: false, issues: ['Flow map not initialized'] };
    }

    const issues: string[] = [];
    const lessons = this.flowMap.sequence;

    // Check for gaps in sequence
    for (let i = 1; i < lessons.length; i++) {
      if (lessons[i].order - lessons[i-1].order > 1) {
        issues.push(`Gap in sequence between lesson ${lessons[i-1].order} and ${lessons[i].order}`);
      }
    }

    // Check Hindi readiness
    const hindiReadyCount = lessons.filter(l => l.metadata.hindiReadiness).length;
    const hindiCoverage = (hindiReadyCount / lessons.length) * 100;
    
    if (hindiCoverage < 90) {
      issues.push(`Hindi coverage ${hindiCoverage.toFixed(1)}% below Grade 9 target (90%)`);
    }

    // Check quality scores
    const avgQuality = lessons.reduce((sum, l) => sum + l.metadata.qualityScore, 0) / lessons.length;
    
    if (avgQuality < 80) {
      issues.push(`Average quality score ${avgQuality.toFixed(1)} below Grade 9 minimum (80)`);
    }

    return {
      isValid: issues.length === 0,
      issues
    };
  }
}

// Singleton instance
export const lessonEngine = new LessonEngine();

// Utility functions for components
export function getEnrichedLessons(rawLessons: Lesson[]): EnrichedLesson[] {
  const flowMap = lessonEngine.createIntegratedFlow(rawLessons);
  return flowMap.sequence;
}

export function getNextLessonId(currentId: number): number | null {
  const nextLesson = lessonEngine.getNextLesson(currentId);
  return nextLesson?.id || null;
}

export function getPreviousLessonId(currentId: number): number | null {
  const prevLesson = lessonEngine.getPreviousLesson(currentId);
  return prevLesson?.id || null;
}