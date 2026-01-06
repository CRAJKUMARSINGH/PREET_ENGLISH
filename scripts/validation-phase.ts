import { db } from "../server/db";
import { lessons, vocabulary, conversationLines } from "../shared/schema";
import { eq, and, or, sql, asc, desc } from "drizzle-orm";
import { AuditPhase, AuditSummary } from "./audit-phase";
import { QualityRubric, QualityScore, ContentToScore } from "./quality-rubric";
import { VocabularyStoplist } from "./vocabulary-stoplist";
import { GeneratedContent } from "./llm-content-generator";

export interface ValidationResult {
  id: string;
  type: 'lesson' | 'vocabulary' | 'conversation' | 'content';
  isValid: boolean;
  score: number;
  issues: string[];
  suggestions: string[];
  timestamp: Date;
  validator: string; // Name of the validation process
}

export interface ValidationSummary {
  total: number;
  passed: number;
  failed: number;
  avgScore: number;
  results: ValidationResult[];
  qualityReport: {
    accuracy: number;
    relevance: number;
    clarity: number;
    completeness: number;
    culturalSensitivity: number;
    pedagogy: number;
    diversity: number;
    coherence: number;
  };
  complianceReport: {
    stoplistCompliance: number;
    contentStandards: number;
    culturalStandards: number;
    technicalStandards: number;
  };
}

export interface ReauditOptions {
  includeQualityScoring: boolean;
  includeStoplistCheck: boolean;
  includeCulturalReview: boolean;
  includeTechnicalReview: boolean;
  minAcceptableScore: number;
  detailedReport: boolean;
}

export class ValidationPhase {
  private auditPhase: AuditPhase;
  private qualityRubric: QualityRubric;
  private stoplist: VocabularyStoplist;

  constructor() {
    this.auditPhase = new AuditPhase();
    this.qualityRubric = new QualityRubric();
    this.stoplist = new VocabularyStoplist();
  }

  /**
   * Perform comprehensive validation with re-audit and final quality scoring
   */
  async validateAll(options?: Partial<ReauditOptions>): Promise<ValidationSummary> {
    console.log('🔍 Starting comprehensive validation phase...');
    
    const opts: ReauditOptions = {
      includeQualityScoring: true,
      includeStoplistCheck: true,
      includeCulturalReview: true,
      includeTechnicalReview: true,
      minAcceptableScore: 7.0,
      detailedReport: true,
      ...options
    };

    // Get all content from the database
    const allLessons = await db.select().from(lessons);
    const allVocabulary = await db.select().from(vocabulary);
    const allConversations = await db.select().from(conversationLines);

    console.log(`📊 Found ${allLessons.length} lessons, ${allVocabulary.length} vocabulary items, ${allConversations.length} conversations`);

    const results: ValidationResult[] = [];

    // Validate lessons
    for (const lesson of allLessons) {
      const result = await this.validateLesson(lesson, opts);
      results.push(result);
    }

    // Validate vocabulary
    for (const vocab of allVocabulary) {
      const result = await this.validateVocabulary(vocab, opts);
      results.push(result);
    }

    // Validate conversations
    for (const conv of allConversations) {
      const result = await this.validateConversation(conv, opts);
      results.push(result);
    }

    // Generate summary
    const summary = this.generateValidationSummary(results, opts);
    
    console.log(`✅ Validation completed: ${summary.passed} passed, ${summary.failed} failed`);
    return summary;
  }

  /**
   * Validate a single lesson
   */
  async validateLesson(lesson: typeof lessons.$inferSelect, options: ReauditOptions): Promise<ValidationResult> {
    const result: ValidationResult = {
      id: `lesson-${lesson.id}`,
      type: 'lesson',
      isValid: true,
      score: 10,
      issues: [],
      suggestions: [],
      timestamp: new Date(),
      validator: 'ValidationPhase.validateLesson'
    };

    // Get associated vocabulary and conversations for comprehensive scoring
    const lessonVocab = await db
      .select()
      .from(vocabulary)
      .where(eq(vocabulary.lessonId, lesson.id));
    
    const lessonConvs = await db
      .select()
      .from(conversationLines)
      .where(eq(conversationLines.lessonId, lesson.id));

    // Perform quality scoring
    if (options.includeQualityScoring) {
      const contentToScore: ContentToScore = {
        title: lesson.title,
        content: lesson.content,
        vocabulary: lessonVocab.map(v => ({
          word: v.word,
          hindi: v.hindiTranslation || '',
          pronunciation: v.pronunciation || '',
          definition: v.definition,
          example: v.example
        })),
        conversations: lessonConvs.map(c => ({
          speaker: c.speaker,
          english: c.englishText,
          hindi: c.hindiText
        })),
        category: lesson.category,
        difficulty: lesson.difficulty
      };

      const qualityScore = this.qualityRubric.scoreContent(contentToScore);
      result.score = qualityScore.overall;
      
      if (qualityScore.overall < options.minAcceptableScore) {
        result.isValid = false;
        result.issues.push(`Low quality score: ${qualityScore.overall}/10`);
      }
      
      // Add specific feedback
      if (qualityScore.criteria.accuracy < 0.8) {
        result.issues.push('Accuracy issues detected');
      }
      if (qualityScore.criteria.clarity < 0.8) {
        result.suggestions.push('Consider improving clarity of explanations');
      }
    }

    // Check stoplist compliance
    if (options.includeStoplistCheck) {
      for (const vocab of lessonVocab) {
        if (this.stoplist.shouldExclude(vocab.word, lesson.category, lesson.difficulty)) {
          result.issues.push(`Vocabulary word '${vocab.word}' is in stoplist for ${lesson.difficulty} level`);
          result.isValid = false;
        }
      }
    }

    // Check cultural compliance
    if (options.includeCulturalReview) {
      if (!lesson.hindiTitle || lesson.hindiTitle.trim().length === 0) {
        result.issues.push('Missing Hindi title - not culturally appropriate for Hindi speakers');
        result.isValid = false;
      }
    }

    // Check technical compliance
    if (options.includeTechnicalReview) {
      if (!lesson.title || lesson.title.trim().length === 0) {
        result.issues.push('Missing lesson title');
        result.isValid = false;
      }
      if (!lesson.content || lesson.content.trim().length === 0) {
        result.issues.push('Missing lesson content');
        result.isValid = false;
      }
    }

    return result;
  }

  /**
   * Validate a single vocabulary item
   */
  async validateVocabulary(vocab: typeof vocabulary.$inferSelect, options: ReauditOptions): Promise<ValidationResult> {
    const result: ValidationResult = {
      id: `vocab-${vocab.id}`,
      type: 'vocabulary',
      isValid: true,
      score: 10,
      issues: [],
      suggestions: [],
      timestamp: new Date(),
      validator: 'ValidationPhase.validateVocabulary'
    };

    // Check basic requirements
    if (!vocab.word || vocab.word.trim().length === 0) {
      result.issues.push('Missing or empty word');
      result.isValid = false;
    }

    if (!vocab.definition || vocab.definition.trim().length === 0) {
      result.issues.push('Missing or empty definition');
      result.isValid = false;
    }

    if (!vocab.example || vocab.example.trim().length === 0) {
      result.issues.push('Missing or empty example');
      result.isValid = false;
    }

    // Check Hindi translation
    if (!vocab.hindiTranslation || vocab.hindiTranslation.trim().length === 0) {
      result.issues.push('Missing Hindi translation');
      result.isValid = false;
    }

    // Check stoplist compliance
    if (options.includeStoplistCheck) {
      const lesson = await this.getLessonById(vocab.lessonId);
      if (lesson && this.stoplist.shouldExclude(vocab.word, lesson.category, lesson.difficulty)) {
        result.issues.push(`Word '${vocab.word}' is in stoplist for ${lesson.difficulty} level in category ${lesson.category}`);
        result.isValid = false;
      }
    }

    // Calculate score based on completeness
    let score = 10;
    if (!vocab.hindiTranslation) score -= 2;
    if (!vocab.pronunciation) score -= 1;
    if (!vocab.example) score -= 1;
    
    result.score = Math.max(0, score);

    if (result.score < options.minAcceptableScore) {
      result.isValid = false;
    }

    return result;
  }

  /**
   * Validate a single conversation item
   */
  async validateConversation(conv: typeof conversationLines.$inferSelect, options: ReauditOptions): Promise<ValidationResult> {
    const result: ValidationResult = {
      id: `conv-${conv.id}`,
      type: 'conversation',
      isValid: true,
      score: 10,
      issues: [],
      suggestions: [],
      timestamp: new Date(),
      validator: 'ValidationPhase.validateConversation'
    };

    // Check basic requirements
    if (!conv.speaker || !['A', 'B', 'C', 'D'].includes(conv.speaker)) {
      result.issues.push(`Invalid speaker: ${conv.speaker}. Use A, B, C, or D.`);
      result.isValid = false;
    }

    if (!conv.englishText || conv.englishText.trim().length === 0) {
      result.issues.push('Missing or empty English text');
      result.isValid = false;
    }

    if (!conv.hindiText || conv.hindiText.trim().length === 0) {
      result.issues.push('Missing or empty Hindi text');
      result.isValid = false;
    }

    // Check cultural compliance
    if (options.includeCulturalReview) {
      if (conv.hindiText && conv.hindiText.length < 5) {
        result.issues.push('Hindi text too short for meaningful translation');
        result.isValid = false;
      }
    }

    // Calculate score based on completeness
    let score = 10;
    if (!conv.hindiText) score -= 3;
    if (conv.englishText.length < 10) score -= 1; // Too short
    
    result.score = Math.max(0, score);

    if (result.score < options.minAcceptableScore) {
      result.isValid = false;
    }

    return result;
  }

  /**
   * Perform re-audit on content
   */
  async reaudit(content: any, type: 'lesson' | 'vocabulary' | 'conversation' | 'content'): Promise<ValidationResult> {
    switch (type) {
      case 'lesson':
        return this.validateLesson(content, {
          includeQualityScoring: true,
          includeStoplistCheck: true,
          includeCulturalReview: true,
          includeTechnicalReview: true,
          minAcceptableScore: 7.0,
          detailedReport: true
        });
      case 'vocabulary':
        return this.validateVocabulary(content, {
          includeQualityScoring: true,
          includeStoplistCheck: true,
          includeCulturalReview: true,
          includeTechnicalReview: true,
          minAcceptableScore: 7.0,
          detailedReport: true
        });
      case 'conversation':
        return this.validateConversation(content, {
          includeQualityScoring: true,
          includeStoplistCheck: true,
          includeCulturalReview: true,
          includeTechnicalReview: true,
          minAcceptableScore: 7.0,
          detailedReport: true
        });
      case 'content':
        return this.validateGeneratedContent(content as GeneratedContent);
      default:
        throw new Error(`Unknown content type: ${type}`);
    }
  }

  /**
   * Validate generated content
   */
  private async validateGeneratedContent(content: GeneratedContent): Promise<ValidationResult> {
    const result: ValidationResult = {
      id: `content-${Date.now()}`,
      type: 'content',
      isValid: true,
      score: 10,
      issues: [],
      suggestions: [],
      timestamp: new Date(),
      validator: 'ValidationPhase.validateGeneratedContent'
    };

    // Convert to ContentToScore for quality rubric
    const contentToScore: ContentToScore = {
      title: content.title,
      content: content.content,
      vocabulary: content.vocabulary.map(v => ({
        word: v.word,
        hindi: v.hindi,
        pronunciation: v.pronunciation || '',
        definition: v.definition,
        example: v.example
      })),
      conversations: content.conversations.map(c => ({
        speaker: c.speaker,
        english: c.english,
        hindi: c.hindi
      })),
      category: content.metadata.category,
      difficulty: content.metadata.difficulty
    };

    const qualityScore = this.qualityRubric.scoreContent(contentToScore);
    result.score = qualityScore.overall;

    if (qualityScore.overall < 7.0) {
      result.isValid = false;
      result.issues.push(`Low quality score: ${qualityScore.overall}/10`);
    }

    // Check for Hindi content
    if (!content.title.includes(' ') && !content.content.includes('\u0900-\u097F')) {
      result.issues.push('Insufficient Hindi content detected');
      result.isValid = false;
    }

    return result;
  }

  /**
   * Generate validation summary
   */
  private generateValidationSummary(results: ValidationResult[], options: ReauditOptions): ValidationSummary {
    const total = results.length;
    const passed = results.filter(r => r.isValid).length;
    const failed = total - passed;
    
    const avgScore = results.reduce((sum, r) => sum + r.score, 0) / total;

    // Calculate quality report averages
    // Since we don't have detailed quality scores for each item, we'll perform a new audit for the report
    const qualityReport = {
      accuracy: 0,
      relevance: 0,
      clarity: 0,
      completeness: 0,
      culturalSensitivity: 0,
      pedagogy: 0,
      diversity: 0,
      coherence: 0
    };

    // Calculate compliance report
    const stoplistViolations = results.filter(r => r.issues.some(i => i.includes('stoplist'))).length;
    const contentIssues = results.filter(r => r.issues.some(i => i.includes('content'))).length;
    const culturalIssues = results.filter(r => r.issues.some(i => i.includes('cultural') || i.includes('Hindi'))).length;
    const technicalIssues = results.filter(r => r.issues.some(i => i.includes('title') || i.includes('missing'))).length;

    const complianceReport = {
      stoplistCompliance: total > 0 ? ((total - stoplistViolations) / total) * 100 : 100,
      contentStandards: total > 0 ? ((total - contentIssues) / total) * 100 : 100,
      culturalStandards: total > 0 ? ((total - culturalIssues) / total) * 100 : 100,
      technicalStandards: total > 0 ? ((total - technicalIssues) / total) * 100 : 100
    };

    return {
      total,
      passed,
      failed,
      avgScore,
      results,
      qualityReport,
      complianceReport
    };
  }

  /**
   * Get lesson by ID
   */
  private async getLessonById(lessonId: number): Promise<typeof lessons.$inferSelect | null> {
    const [lesson] = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id, lessonId));
    
    return lesson || null;
  }

  /**
   * Validate content against industry standards
   */
  async validateAgainstStandards(content: ContentToScore): Promise<{ 
    meetsStandards: boolean; 
    score: number; 
    feedback: string[] 
  }> {
    const qualityScore = this.qualityRubric.scoreContent(content);
    const feedback: string[] = [];

    // Check against industry standards (9/10 target)
    if (qualityScore.overall >= 9.0) {
      feedback.push('✅ Content meets high industry standards');
    } else if (qualityScore.overall >= 8.0) {
      feedback.push('✅ Content meets good industry standards, but has room for improvement');
    } else if (qualityScore.overall >= 7.0) {
      feedback.push('⚠️ Content meets minimum standards but needs enhancement');
    } else {
      feedback.push('❌ Content does not meet industry standards');
    }

    // Detailed feedback
    if (qualityScore.criteria.accuracy < 0.8) {
      feedback.push('⚠️ Accuracy of translations needs improvement');
    }
    if (qualityScore.criteria.clarity < 0.8) {
      feedback.push('⚠️ Clarity of explanations needs improvement');
    }
    if (qualityScore.criteria.culturalSensitivity < 0.8) {
      feedback.push('⚠️ Cultural appropriateness needs improvement');
    }

    return {
      meetsStandards: qualityScore.overall >= 7.0,
      score: qualityScore.overall,
      feedback
    };
  }

  /**
   * Perform final quality scoring
   */
  async finalQualityScoring(content: ContentToScore): Promise<QualityScore> {
    return this.qualityRubric.scoreContent(content);
  }

  /**
   * Validate batch of content items
   */
  async validateBatch(items: Array<{ type: 'lesson' | 'vocabulary' | 'conversation' | 'content'; data: any }>): Promise<ValidationSummary> {
    const results: ValidationResult[] = [];

    for (const item of items) {
      try {
        const result = await this.reaudit(item.data, item.type);
        results.push(result);
      } catch (error) {
        results.push({
          id: `error-${Date.now()}`,
          type: item.type,
          isValid: false,
          score: 0,
          issues: [`Validation error: ${error}`],
          suggestions: [],
          timestamp: new Date(),
          validator: 'ValidationPhase.validateBatch'
        });
      }
    }

    const total = results.length;
    const passed = results.filter(r => r.isValid).length;
    const failed = total - passed;
    const avgScore = results.reduce((sum, r) => sum + r.score, 0) / (total || 1);

    return {
      total,
      passed,
      failed,
      avgScore,
      results,
      qualityReport: {
        accuracy: 0, relevance: 0, clarity: 0, completeness: 0,
        culturalSensitivity: 0, pedagogy: 0, diversity: 0, coherence: 0
      },
      complianceReport: {
        stoplistCompliance: 0, contentStandards: 0, 
        culturalStandards: 0, technicalStandards: 0
      }
    };
  }

  /**
   * Generate detailed validation report
   */
  generateDetailedReport(summary: ValidationSummary): string {
    let report = '# Validation Report\n\n';
    report += `**Generated:** ${new Date().toISOString()}\n\n`;
    
    report += '## Summary\n';
    report += `- Total Items: ${summary.total}\n`;
    report += `- Passed: ${summary.passed}\n`;
    report += `- Failed: ${summary.failed}\n`;
    report += `- Average Score: ${summary.avgScore.toFixed(2)}/10\n\n`;
    
    report += '## Compliance Report\n';
    report += `- Stoplist Compliance: ${summary.complianceReport.stoplistCompliance.toFixed(2)}%\n`;
    report += `- Content Standards: ${summary.complianceReport.contentStandards.toFixed(2)}%\n`;
    report += `- Cultural Standards: ${summary.complianceReport.culturalStandards.toFixed(2)}%\n`;
    report += `- Technical Standards: ${summary.complianceReport.technicalStandards.toFixed(2)}%\n\n`;
    
    if (summary.results.some(r => !r.isValid)) {
      report += '## Failed Items\n';
      const failedItems = summary.results.filter(r => !r.isValid);
      for (const item of failedItems) {
        report += `- ${item.id} (${item.type}): ${item.issues.join(', ')}\n`;
      }
      report += '\n';
    }
    
    report += '## Recommendations\n';
    if (summary.avgScore < 8.0) {
      report += '- Consider improving overall content quality\n';
    }
    if (summary.complianceReport.culturalStandards < 90) {
      report += '- Enhance cultural appropriateness for Hindi-speaking audience\n';
    }
    if (summary.complianceReport.stoplistCompliance < 95) {
      report += '- Review stoplist compliance\n';
    }
    
    return report;
  }
}

// Example usage
export function createValidationPhase(): ValidationPhase {
  return new ValidationPhase();
}

// Example of how to use the validation phase
if (require.main === module) {
  (async () => {
    const validator = new ValidationPhase();
    
    // Perform comprehensive validation
    console.log('Starting validation process...');
    const summary = await validator.validateAll({
      minAcceptableScore: 7.0,
      detailedReport: true
    });
    
    console.log(`Validation Summary: ${summary.passed} passed, ${summary.failed} failed`);
    console.log(`Average Score: ${summary.avgScore.toFixed(2)}/10`);
    
    // Generate detailed report
    const report = validator.generateDetailedReport(summary);
    console.log('\nDetailed Report:');
    console.log(report);
    
    // Validate a sample content
    const sampleContent: ContentToScore = {
      title: 'Introduction to Greetings',
      content: 'This lesson covers basic greeting phrases.',
      vocabulary: [
        {
          word: 'hello',
          hindi: 'नमस्ते',
          pronunciation: 'namaste',
          definition: 'A common greeting',
          example: 'Hello, how are you?'
        }
      ],
      conversations: [
        {
          speaker: 'A',
          english: 'Hello, how are you?',
          hindi: 'नमस्ते, आप कैसे हैं?'
        }
      ],
      category: 'daily_life',
      difficulty: 'beginner'
    };
    
    const standardsCheck = await validator.validateAgainstStandards(sampleContent);
    console.log('\nStandards Check:', standardsCheck);
  })();
}