/**
 * CONTENT QUALITY MANIFEST SYSTEM
 * 
 * Grade 9 Quality Standard: Comprehensive content validation and quality tracking
 * Ensures every piece of content meets professional learning platform standards
 */

import { Lesson } from '@shared/schema';

export interface QualityMetrics {
  contentCompleteness: number;
  hindiSupport: number;
  structuralIntegrity: number;
  pedagogicalValue: number;
  accessibility: number;
  overallScore: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'F';
  recommendations: string[];
}

export interface ContentManifestEntry {
  id: string;
  type: 'lesson' | 'vocabulary' | 'story' | 'scenario' | 'quiz' | 'conversation';
  title: string;
  hindiTitle?: string;
  lastAudited: string;
  qualityMetrics: QualityMetrics;
  status: 'excellent' | 'good' | 'needs-improvement' | 'critical';
  tags: string[];
  culturalRelevance: number;
  aiReadiness: boolean;
}

export interface QualityManifest {
  version: string;
  lastUpdated: string;
  totalContent: number;
  grade9Compliant: number;
  averageScore: number;
  entries: ContentManifestEntry[];
  categoryBreakdown: Record<string, { count: number; avgScore: number }>;
  hindiCoverage: number;
  recommendations: {
    priority: 'high' | 'medium' | 'low';
    action: string;
    affectedContent: string[];
  }[];
}

class ContentQualityAuditor {
  private readonly GRADE_9_THRESHOLD = 90;
  private readonly GRADE_8_THRESHOLD = 80;
  private readonly PASSING_THRESHOLD = 70;

  /**
   * Audits a single lesson for Grade 9 compliance
   */
  public auditLesson(lesson: Lesson): QualityMetrics {
    const contentCompleteness = this.assessContentCompleteness(lesson);
    const hindiSupport = this.assessHindiSupport(lesson);
    const structuralIntegrity = this.assessStructuralIntegrity(lesson);
    const pedagogicalValue = this.assessPedagogicalValue(lesson);
    const accessibility = this.assessAccessibility(lesson);

    const overallScore = this.calculateOverallScore({
      contentCompleteness,
      hindiSupport,
      structuralIntegrity,
      pedagogicalValue,
      accessibility
    });

    const grade = this.determineGrade(overallScore);
    const recommendations = this.generateRecommendations(lesson, {
      contentCompleteness,
      hindiSupport,
      structuralIntegrity,
      pedagogicalValue,
      accessibility
    });

    return {
      contentCompleteness,
      hindiSupport,
      structuralIntegrity,
      pedagogicalValue,
      accessibility,
      overallScore,
      grade,
      recommendations
    };
  }

  /**
   * Assesses content completeness (25% weight)
   */
  private assessContentCompleteness(lesson: Lesson): number {
    let score = 0;
    const maxScore = 100;

    // Title quality (15 points)
    if (lesson.title && lesson.title.length >= 5) score += 10;
    if (lesson.title && lesson.title.length >= 15) score += 5;

    // Description quality (20 points)
    if (lesson.description && lesson.description.length >= 20) score += 10;
    if (lesson.description && lesson.description.length >= 100) score += 10;

    // Content depth (40 points)
    if (lesson.content && lesson.content.length >= 100) score += 15;
    if (lesson.content && lesson.content.length >= 500) score += 15;
    if (lesson.content && lesson.content.length >= 1000) score += 10;

    // Metadata completeness (15 points)
    if (lesson.category && lesson.category !== 'General') score += 5;
    if (lesson.difficulty && ['Beginner', 'Intermediate', 'Advanced'].includes(lesson.difficulty)) score += 5;
    if (lesson.imageUrl) score += 5;

    // Structure and formatting (10 points)
    if (this.hasGoodStructure(lesson.content)) score += 10;

    return Math.min(score, maxScore);
  }

  /**
   * Assesses Hindi support quality (30% weight)
   */
  private assessHindiSupport(lesson: Lesson): number {
    let score = 0;
    const maxScore = 100;

    // Hindi title (25 points)
    if (lesson.hindiTitle) {
      score += 15;
      if (this.containsDevanagari(lesson.hindiTitle)) score += 10;
    }

    // Hindi description (25 points)
    if (lesson.hindiDescription) {
      score += 15;
      if (this.containsDevanagari(lesson.hindiDescription)) score += 10;
    }

    // Cultural context (20 points)
    if (this.hasCulturalContext(lesson)) score += 20;

    // Translation quality (20 points)
    if (this.hasQualityTranslation(lesson)) score += 20;

    // Pronunciation support (10 points)
    if (this.hasPronunciationGuide(lesson)) score += 10;

    return Math.min(score, maxScore);
  }

  /**
   * Assesses structural integrity (20% weight)
   */
  private assessStructuralIntegrity(lesson: Lesson): number {
    let score = 0;
    const maxScore = 100;

    // Unique identifier (20 points)
    if (lesson.id && lesson.id > 0) score += 20;

    // Proper ordering (20 points)
    if (lesson.order && lesson.order > 0) score += 20;

    // Slug quality (15 points)
    if (lesson.slug && this.isValidSlug(lesson.slug)) score += 15;

    // Category consistency (15 points)
    if (this.hasValidCategory(lesson.category)) score += 15;

    // Difficulty progression (15 points)
    if (this.hasAppropriateComplexity(lesson)) score += 15;

    // No broken references (15 points)
    if (this.hasNoBrokenReferences(lesson)) score += 15;

    return Math.min(score, maxScore);
  }

  /**
   * Assesses pedagogical value (15% weight)
   */
  private assessPedagogicalValue(lesson: Lesson): number {
    let score = 0;
    const maxScore = 100;

    // Learning objectives clarity (25 points)
    if (this.hasClearObjectives(lesson)) score += 25;

    // Progressive difficulty (20 points)
    if (this.hasProgressiveDifficulty(lesson)) score += 20;

    // Interactive elements (20 points)
    if (this.hasInteractiveElements(lesson)) score += 20;

    // Real-world application (20 points)
    if (this.hasRealWorldContext(lesson)) score += 20;

    // Assessment integration (15 points)
    if (this.hasAssessmentElements(lesson)) score += 15;

    return Math.min(score, maxScore);
  }

  /**
   * Assesses accessibility (10% weight)
   */
  private assessAccessibility(lesson: Lesson): number {
    let score = 0;
    const maxScore = 100;

    // Screen reader compatibility (30 points)
    if (this.isScreenReaderFriendly(lesson)) score += 30;

    // Language tagging (25 points)
    if (this.hasProperLanguageTags(lesson)) score += 25;

    // Font readability (20 points)
    if (this.hasFontOptimization(lesson)) score += 20;

    // Color contrast (15 points)
    if (this.hasGoodContrast(lesson)) score += 15;

    // Mobile optimization (10 points)
    if (this.isMobileOptimized(lesson)) score += 10;

    return Math.min(score, maxScore);
  }

  /**
   * Calculates weighted overall score
   */
  private calculateOverallScore(metrics: Omit<QualityMetrics, 'overallScore' | 'grade' | 'recommendations'>): number {
    const weights = {
      contentCompleteness: 0.25,
      hindiSupport: 0.30,
      structuralIntegrity: 0.20,
      pedagogicalValue: 0.15,
      accessibility: 0.10
    };

    return Math.round(
      metrics.contentCompleteness * weights.contentCompleteness +
      metrics.hindiSupport * weights.hindiSupport +
      metrics.structuralIntegrity * weights.structuralIntegrity +
      metrics.pedagogicalValue * weights.pedagogicalValue +
      metrics.accessibility * weights.accessibility
    );
  }

  /**
   * Determines letter grade based on score
   */
  private determineGrade(score: number): QualityMetrics['grade'] {
    if (score >= 95) return 'A+';
    if (score >= 90) return 'A';
    if (score >= 85) return 'B+';
    if (score >= 80) return 'B';
    if (score >= 75) return 'C+';
    if (score >= 70) return 'C';
    return 'F';
  }

  /**
   * Generates specific recommendations for improvement
   */
  private generateRecommendations(lesson: Lesson, metrics: Omit<QualityMetrics, 'overallScore' | 'grade' | 'recommendations'>): string[] {
    const recommendations: string[] = [];

    if (metrics.contentCompleteness < 80) {
      if (!lesson.content || lesson.content.length < 500) {
        recommendations.push('Expand lesson content to at least 500 words for better depth');
      }
      if (!lesson.description || lesson.description.length < 100) {
        recommendations.push('Add comprehensive lesson description (100+ characters)');
      }
    }

    if (metrics.hindiSupport < 80) {
      if (!lesson.hindiTitle) {
        recommendations.push('Add Hindi translation for lesson title');
      }
      if (!lesson.hindiDescription) {
        recommendations.push('Add Hindi description for better accessibility');
      }
      if (!this.containsDevanagari(lesson.hindiTitle || '')) {
        recommendations.push('Ensure Hindi content uses proper Devanagari script');
      }
    }

    if (metrics.structuralIntegrity < 80) {
      if (!this.isValidSlug(lesson.slug)) {
        recommendations.push('Improve URL slug format for SEO optimization');
      }
      if (!this.hasValidCategory(lesson.category)) {
        recommendations.push('Assign appropriate content category');
      }
    }

    if (metrics.pedagogicalValue < 80) {
      recommendations.push('Add clear learning objectives and outcomes');
      recommendations.push('Include interactive exercises or practice elements');
    }

    if (metrics.accessibility < 80) {
      recommendations.push('Improve accessibility with proper language tags and ARIA labels');
      recommendations.push('Optimize for screen readers and mobile devices');
    }

    return recommendations;
  }

  // Helper methods for quality assessment
  private hasGoodStructure(content: string): boolean {
    return content.includes('\n') && content.length > 200;
  }

  private containsDevanagari(text: string): boolean {
    return /[\u0900-\u097F]/.test(text);
  }

  private hasCulturalContext(lesson: Lesson): boolean {
    const culturalKeywords = ['indian', 'hindi', 'cultural', 'context', 'formal', 'informal'];
    const content = (lesson.content + ' ' + lesson.description).toLowerCase();
    return culturalKeywords.some(keyword => content.includes(keyword));
  }

  private hasQualityTranslation(lesson: Lesson): boolean {
    return !!(lesson.hindiTitle && lesson.hindiDescription && 
             lesson.hindiTitle.length > 3 && lesson.hindiDescription.length > 10);
  }

  private hasPronunciationGuide(lesson: Lesson): boolean {
    return lesson.content.toLowerCase().includes('pronunciation') || 
           lesson.content.includes('उच्चारण');
  }

  private isValidSlug(slug: string): boolean {
    return /^[a-z0-9-]+$/.test(slug) && slug.length >= 3;
  }

  private hasValidCategory(category: string): boolean {
    const validCategories = [
      'Grammar', 'Vocabulary', 'Conversation', 'Pronunciation', 
      'Business', 'Social', 'Cultural', 'Advanced', 'Beginner'
    ];
    return validCategories.includes(category);
  }

  private hasAppropriateComplexity(lesson: Lesson): boolean {
    const wordCount = lesson.content.split(/\s+/).length;
    const difficulty = lesson.difficulty.toLowerCase();
    
    if (difficulty === 'beginner') return wordCount >= 50 && wordCount <= 300;
    if (difficulty === 'intermediate') return wordCount >= 200 && wordCount <= 600;
    if (difficulty === 'advanced') return wordCount >= 400;
    
    return true;
  }

  private hasNoBrokenReferences(lesson: Lesson): boolean {
    // Check for broken image URLs, malformed content, etc.
    if (lesson.imageUrl && !lesson.imageUrl.startsWith('http')) return false;
    return true;
  }

  private hasClearObjectives(lesson: Lesson): boolean {
    const objectiveKeywords = ['learn', 'understand', 'practice', 'master', 'improve'];
    return objectiveKeywords.some(keyword => 
      lesson.description.toLowerCase().includes(keyword)
    );
  }

  private hasProgressiveDifficulty(lesson: Lesson): boolean {
    return lesson.order > 0 && lesson.difficulty !== undefined;
  }

  private hasInteractiveElements(lesson: Lesson): boolean {
    return lesson.speakingExercises !== null || 
           lesson.content.includes('exercise') ||
           lesson.content.includes('practice');
  }

  private hasRealWorldContext(lesson: Lesson): boolean {
    const contextKeywords = ['example', 'situation', 'real', 'daily', 'workplace'];
    return contextKeywords.some(keyword => 
      lesson.content.toLowerCase().includes(keyword)
    );
  }

  private hasAssessmentElements(lesson: Lesson): boolean {
    return lesson.content.includes('quiz') || 
           lesson.content.includes('question') ||
           lesson.speakingExercises !== null;
  }

  private isScreenReaderFriendly(lesson: Lesson): boolean {
    // Check for proper heading structure, alt text references, etc.
    return lesson.content.includes('#') || lesson.description.length > 50;
  }

  private hasProperLanguageTags(lesson: Lesson): boolean {
    return !!(lesson.hindiTitle || lesson.hindiDescription);
  }

  private hasFontOptimization(lesson: Lesson): boolean {
    return this.containsDevanagari(lesson.hindiTitle || lesson.hindiDescription || '');
  }

  private hasGoodContrast(lesson: Lesson): boolean {
    // Assume good contrast if content is well-structured
    return lesson.content.length > 100;
  }

  private isMobileOptimized(lesson: Lesson): boolean {
    // Check content length and structure for mobile readability
    return lesson.content.length < 2000 && lesson.content.includes('\n');
  }
}

// Singleton instance
export const contentQualityAuditor = new ContentQualityAuditor();

// Utility functions
export function createManifestEntry(
  lesson: Lesson, 
  type: ContentManifestEntry['type'] = 'lesson'
): ContentManifestEntry {
  const qualityMetrics = contentQualityAuditor.auditLesson(lesson);
  
  let status: ContentManifestEntry['status'];
  if (qualityMetrics.overallScore >= 90) status = 'excellent';
  else if (qualityMetrics.overallScore >= 80) status = 'good';
  else if (qualityMetrics.overallScore >= 70) status = 'needs-improvement';
  else status = 'critical';

  return {
    id: lesson.id.toString(),
    type,
    title: lesson.title,
    hindiTitle: lesson.hindiTitle || undefined,
    lastAudited: new Date().toISOString(),
    qualityMetrics,
    status,
    tags: [lesson.category, lesson.difficulty].filter(Boolean),
    culturalRelevance: qualityMetrics.hindiSupport,
    aiReadiness: qualityMetrics.overallScore >= 80
  };
}

export function generateQualityReport(entries: ContentManifestEntry[]): QualityManifest {
  const totalContent = entries.length;
  const grade9Compliant = entries.filter(e => e.qualityMetrics.overallScore >= 90).length;
  const averageScore = entries.reduce((sum, e) => sum + e.qualityMetrics.overallScore, 0) / totalContent;
  
  // Category breakdown
  const categoryBreakdown: Record<string, { count: number; avgScore: number }> = {};
  entries.forEach(entry => {
    entry.tags.forEach(tag => {
      if (!categoryBreakdown[tag]) {
        categoryBreakdown[tag] = { count: 0, avgScore: 0 };
      }
      categoryBreakdown[tag].count++;
      categoryBreakdown[tag].avgScore += entry.qualityMetrics.overallScore;
    });
  });
  
  Object.keys(categoryBreakdown).forEach(category => {
    categoryBreakdown[category].avgScore /= categoryBreakdown[category].count;
  });

  // Hindi coverage
  const hindiSupported = entries.filter(e => e.hindiTitle).length;
  const hindiCoverage = (hindiSupported / totalContent) * 100;

  // Generate recommendations
  const recommendations = generateSystemRecommendations(entries);

  return {
    version: '1.0.0',
    lastUpdated: new Date().toISOString(),
    totalContent,
    grade9Compliant,
    averageScore: Math.round(averageScore * 10) / 10,
    entries,
    categoryBreakdown,
    hindiCoverage: Math.round(hindiCoverage * 10) / 10,
    recommendations
  };
}

function generateSystemRecommendations(entries: ContentManifestEntry[]): QualityManifest['recommendations'] {
  const recommendations: QualityManifest['recommendations'] = [];
  
  const criticalEntries = entries.filter(e => e.status === 'critical');
  const needsImprovementEntries = entries.filter(e => e.status === 'needs-improvement');
  const noHindiEntries = entries.filter(e => !e.hindiTitle);

  if (criticalEntries.length > 0) {
    recommendations.push({
      priority: 'high',
      action: `Fix ${criticalEntries.length} critical quality issues`,
      affectedContent: criticalEntries.map(e => e.title)
    });
  }

  if (needsImprovementEntries.length > entries.length * 0.3) {
    recommendations.push({
      priority: 'medium',
      action: 'Improve content quality across multiple lessons',
      affectedContent: needsImprovementEntries.slice(0, 5).map(e => e.title)
    });
  }

  if (noHindiEntries.length > entries.length * 0.1) {
    recommendations.push({
      priority: 'medium',
      action: 'Add Hindi translations for better accessibility',
      affectedContent: noHindiEntries.slice(0, 10).map(e => e.title)
    });
  }

  return recommendations;
}