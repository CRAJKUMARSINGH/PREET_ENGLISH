import { db } from "../server/db";
import { lessons, vocabulary, conversationLines } from "../shared/schema";
import { eq, and, or, sql } from "drizzle-orm";
import { QualityRubric, QualityScore, ContentToScore } from "./quality-rubric";
import { VocabularyStoplist } from "./vocabulary-stoplist";

// Define explicit interfaces to avoid circular references
interface Lesson {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  difficulty: string;
  order: number;
  imageUrl: string | null;
  emojiTheme: string | null;
  hindiTitle: string | null;
  hindiDescription: string | null;
  category: string;
}

interface Vocabulary {
  id: number;
  lessonId: number;
  word: string;
  pronunciation?: string | null;
  definition: string;
  example: string;
  hindiTranslation?: string | null;
  hindiPronunciation?: string | null;
  audioUrl?: string | null;
}

interface ConversationLine {
  id: number;
  lessonId: number;
  speaker: string;
  englishText: string;
  hindiText: string;
  emoji: string | null;
  lineOrder: number;
}

export interface AuditResult {
  id: string;
  type: 'lesson' | 'vocabulary' | 'conversation';
  status: 'pass' | 'fail' | 'warning';
  issues: string[];
  suggestions: string[];
  score?: number;
  timestamp: Date;
}

export interface AuditSummary {
  total: number;
  passed: number;
  failed: number;
  warnings: number;
  results: AuditResult[];
  qualityScore?: number;
}

export class AuditPhase {
  private qualityRubric: QualityRubric;
  private stoplist: VocabularyStoplist;
  private results: AuditResult[];

  constructor() {
    this.qualityRubric = new QualityRubric();
    this.stoplist = new VocabularyStoplist();
    this.results = [];
  }

  /**
   * Perform comprehensive audit of all content
   */
  async performAudit(): Promise<AuditSummary> {
    console.log('🔍 Starting audit phase...');
    this.results = [];

    // Audit lessons
    await this.auditLessons();
    
    // Audit vocabulary
    await this.auditVocabulary();
    
    // Audit conversations
    await this.auditConversations();

    // Generate summary
    const summary = this.generateSummary();
    
    console.log(`✅ Audit completed: ${summary.passed} passed, ${summary.failed} failed, ${summary.warnings} warnings`);
    return summary;
  }

  /**
   * Audit all lessons
   */
  async auditLessons(): Promise<void> {
    console.log('📝 Auditing lessons...');
    
    const lessonsData = await db
      .select()
      .from(lessons)
      .leftJoin(vocabulary, eq(lessons.id, vocabulary.lessonId))
      .leftJoin(conversationLines, eq(lessons.id, conversationLines.lessonId));

    // Group by lesson
    const lessonsMap = new Map<number, {
      lesson: Lesson;
      vocabulary: Vocabulary[];
      conversations: ConversationLine[];
    }>();

    for (const row of lessonsData) {
      if (!lessonsMap.has(row.lessons.id)) {
        lessonsMap.set(row.lessons.id, {
          lesson: row.lessons,
          vocabulary: [],
          conversations: []
        });
      }

      const lessonData = lessonsMap.get(row.lessons.id)!;
      
      if (row.vocabulary && !lessonData.vocabulary.some(v => v.id === row.vocabulary!.id)) {
        lessonData.vocabulary.push(row.vocabulary);
      }
      
      if (row.conversation_lines && !lessonData.conversations.some(c => c.id === row.conversation_lines!.id)) {
        lessonData.conversations.push(row.conversation_lines);
      }
    }

    // Audit each lesson
    for (const [id, data] of lessonsMap) {
      const result = this.auditSingleLesson(data.lesson, data.vocabulary, data.conversations);
      this.results.push(result);
    }

    console.log(`📝 Completed auditing ${lessonsMap.size} lessons`);
  }

  /**
   * Audit all vocabulary items
   */
  async auditVocabulary(): Promise<void> {
    console.log('📚 Auditing vocabulary...');
    
    const vocabItems = await db.select().from(vocabulary);
    
    for (const vocab of vocabItems) {
      const result = this.auditSingleVocabulary(vocab);
      this.results.push(result);
    }

    console.log(`📚 Completed auditing ${vocabItems.length} vocabulary items`);
  }

  /**
   * Audit all conversation lines
   */
  async auditConversations(): Promise<void> {
    console.log('💬 Auditing conversations...');
    
    const conversations = await db.select().from(conversationLines);
    
    for (const conv of conversations) {
      const result = this.auditSingleConversation(conv);
      this.results.push(result);
    }

    console.log(`💬 Completed auditing ${conversations.length} conversation lines`);
  }

  /**
   * Audit a single lesson with its associated content
   */
  private auditSingleLesson(
    lesson: Lesson,
    vocabulary: Vocabulary[],
    conversations: ConversationLine[]
  ): AuditResult {
    const result: AuditResult = {
      id: `lesson-${lesson.id}`,
      type: 'lesson',
      status: 'pass',
      issues: [],
      suggestions: [],
      timestamp: new Date()
    };

    // Check lesson structure
    if (!lesson.title || lesson.title.trim().length === 0) {
      result.issues.push('Missing or empty title');
      result.status = result.status === 'pass' ? 'fail' : result.status;
    }

    if (!lesson.content || lesson.content.trim().length === 0) {
      result.issues.push('Missing or empty content');
      result.status = result.status === 'pass' ? 'fail' : result.status;
    }

    if (!lesson.category) {
      result.issues.push('Missing category');
      result.status = result.status === 'pass' ? 'fail' : result.status;
    }

    if (!lesson.difficulty) {
      result.issues.push('Missing difficulty level');
      result.status = result.status === 'pass' ? 'fail' : result.status;
    }

    // Check if lesson has adequate vocabulary
    if (vocabulary.length === 0) {
      result.issues.push('Lesson has no vocabulary');
      result.status = result.status === 'pass' ? 'warning' : result.status;
    } else if (vocabulary.length < 3) {
      result.suggestions.push('Consider adding more vocabulary items (recommended: 3-10)');
      if (result.status === 'pass') result.status = 'warning';
    }

    // Check if lesson has adequate conversations
    if (conversations.length === 0) {
      result.issues.push('Lesson has no conversation lines');
      result.status = result.status === 'pass' ? 'warning' : result.status;
    } else if (conversations.length < 2) {
      result.suggestions.push('Consider adding more conversation lines (recommended: 2-5)');
      if (result.status === 'pass') result.status = 'warning';
    }

    // Check for Hindi content
    if (!lesson.hindiTitle || lesson.hindiTitle.trim().length === 0) {
      result.issues.push('Missing Hindi title');
      result.status = result.status === 'pass' ? 'warning' : result.status;
    }

    // Calculate quality score
    const contentToScore: ContentToScore = {
      title: lesson.title,
      content: lesson.content,
      vocabulary: vocabulary.map(v => ({
        word: v.word,
        hindi: v.hindiTranslation || '',
        pronunciation: v.pronunciation || '',
        definition: v.definition,
        example: v.example
      })),
      conversations: conversations.map(c => ({
        speaker: c.speaker,
        english: c.englishText,
        hindi: c.hindiText
      })),
      category: lesson.category,
      difficulty: lesson.difficulty
    };

    const qualityScore = this.qualityRubric.scoreContent(contentToScore);
    result.score = qualityScore.overall;

    if (qualityScore.overall < 7.0) {
      result.issues.push(`Low quality score: ${qualityScore.overall}/10`);
      result.status = 'fail';
    } else if (qualityScore.overall < 8.0) {
      result.suggestions.push(`Quality score could be improved: ${qualityScore.overall}/10`);
      if (result.status === 'pass') result.status = 'warning';
    }

    // Check for stoplist words in vocabulary
    for (const vocab of vocabulary) {
      if (this.stoplist.shouldExclude(vocab.word, lesson.category, lesson.difficulty)) {
        result.issues.push(`Vocabulary word '${vocab.word}' is in stoplist for ${lesson.difficulty} level`);
        if (result.status === 'pass') result.status = 'warning';
      }
    }

    return result;
  }

  /**
   * Audit a single vocabulary item
   */
  private auditSingleVocabulary(vocab: Vocabulary): AuditResult {
    const result: AuditResult = {
      id: `vocab-${vocab.id}`,
      type: 'vocabulary',
      status: 'pass',
      issues: [],
      suggestions: [],
      timestamp: new Date()
    };

    // Check required fields
    if (!vocab.word || vocab.word.trim().length === 0) {
      result.issues.push('Missing or empty word');
      result.status = 'fail';
    }

    if (!vocab.definition || vocab.definition.trim().length === 0) {
      result.issues.push('Missing or empty definition');
      result.status = result.status === 'pass' ? 'fail' : result.status;
    }

    if (!vocab.example || vocab.example.trim().length === 0) {
      result.issues.push('Missing or empty example');
      result.status = result.status === 'pass' ? 'warning' : result.status;
    }

    // Check Hindi translation
    if (!vocab.hindiTranslation || vocab.hindiTranslation.trim().length === 0) {
      result.issues.push('Missing Hindi translation');
      result.status = result.status === 'pass' ? 'warning' : result.status;
    }

    // Check if word is in stoplist
    const lesson = this.getLessonById(vocab.lessonId);
    if (lesson && this.stoplist.shouldExclude(vocab.word, lesson.category, lesson.difficulty)) {
      result.issues.push(`Word '${vocab.word}' is in stoplist for ${lesson.difficulty} level in category ${lesson.category}`);
      result.status = result.status === 'pass' ? 'warning' : result.status;
    }

    return result;
  }

  /**
   * Audit a single conversation line
   */
  private auditSingleConversation(conv: ConversationLine): AuditResult {
    const result: AuditResult = {
      id: `conv-${conv.id}`,
      type: 'conversation',
      status: 'pass',
      issues: [],
      suggestions: [],
      timestamp: new Date()
    };

    // Check required fields
    if (!conv.speaker || !['A', 'B', 'C', 'D'].includes(conv.speaker)) {
      result.issues.push(`Invalid speaker: ${conv.speaker}. Use A, B, C, or D.`);
      result.status = 'fail';
    }

    if (!conv.englishText || conv.englishText.trim().length === 0) {
      result.issues.push('Missing or empty English text');
      result.status = 'fail';
    }

    if (!conv.hindiText || conv.hindiText.trim().length === 0) {
      result.issues.push('Missing or empty Hindi text');
      result.status = result.status === 'pass' ? 'warning' : result.status;
    }

    // Check text quality
    if (conv.englishText.length < 5) {
      result.issues.push('English text too short');
      result.status = result.status === 'pass' ? 'warning' : result.status;
    }

    if (conv.hindiText.length < 5) {
      result.issues.push('Hindi text too short');
      result.status = result.status === 'pass' ? 'warning' : result.status;
    }

    return result;
  }

  /**
   * Helper to get lesson by ID
   */
  private getLessonById(lessonId: number): Lesson | null {
    // In a real implementation, this would query the database
    // For now, we'll return null since we don't have a cache
    return null;
  }

  /**
   * Generate audit summary
   */
  private generateSummary(): AuditSummary {
    const total = this.results.length;
    const passed = this.results.filter(r => r.status === 'pass').length;
    const failed = this.results.filter(r => r.status === 'fail').length;
    const warnings = this.results.filter(r => r.status === 'warning').length;

    // Calculate average quality score if available
    const scoredResults = this.results.filter(r => r.score !== undefined);
    let qualityScore: number | undefined;
    if (scoredResults.length > 0) {
      const totalScore = scoredResults.reduce((sum, r) => sum + (r.score || 0), 0);
      qualityScore = totalScore / scoredResults.length;
    }

    return {
      total,
      passed,
      failed,
      warnings,
      results: this.results,
      qualityScore
    };
  }

  /**
   * Get audit results filtered by status
   */
  getResultsByStatus(status: 'pass' | 'fail' | 'warning'): AuditResult[] {
    return this.results.filter(r => r.status === status);
  }

  /**
   * Get audit results by type
   */
  getResultsByType(type: 'lesson' | 'vocabulary' | 'conversation'): AuditResult[] {
    return this.results.filter(r => r.type === type);
  }

  /**
   * Export audit results as JSON
   */
  exportResults(): string {
    return JSON.stringify({
      timestamp: new Date(),
      summary: this.generateSummary(),
      details: this.results
    }, null, 2);
  }

  /**
   * Perform a quick validation of content before full audit
   */
  async quickValidate(content: ContentToScore): Promise<QualityScore> {
    return this.qualityRubric.scoreContent(content);
  }

  /**
   * Check if content meets minimum quality standards
   */
  async meetsMinimumStandards(content: ContentToScore): Promise<boolean> {
    const score = await this.quickValidate(content);
    return score.overall >= 7.0; // Minimum acceptable score
  }
}

// Example usage
export function createAuditPhase(): AuditPhase {
  return new AuditPhase();
}

// Example of how to use the audit phase
if (require.main === module) {
  (async () => {
    const audit = new AuditPhase();
    
    // Perform full audit
    const summary = await audit.performAudit();
    console.log('Audit Summary:', summary);
    
    // Export results
    const resultsJson = audit.exportResults();
    console.log('Audit Results JSON length:', resultsJson.length);
  })();
}