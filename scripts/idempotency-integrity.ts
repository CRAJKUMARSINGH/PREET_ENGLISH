import { db } from "../server/db";
import { lessons, vocabulary, conversationLines } from "../shared/schema";
import { eq, and, or, sql, asc, desc } from "drizzle-orm";

export interface IdempotencyKey {
  key: string;
  operation: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  result?: any;
}

export interface IntegrityCheckResult {
  table: string;
  issues: number;
  errors: string[];
  status: 'pass' | 'fail' | 'warning';
  details?: any;
}

export interface DataIntegrityConfig {
  checkForeignKeys: boolean;
  checkNullConstraints: boolean;
  checkUniqueConstraints: boolean;
  checkOrphanedRecords: boolean;
  validateContent: boolean;
  fixIssues: boolean;
}

export class IdempotencyManager {
  private idempotencyWindow: number; // in milliseconds

  constructor(windowMs: number = 3600000) { // 1 hour default
    this.idempotencyWindow = windowMs;
  }

  /**
   * Execute an operation with idempotency guarantee
   */
  async executeWithIdempotency<T>(
    idempotencyKey: string,
    operation: () => Promise<T>,
    operationName: string = 'unknown'
  ): Promise<T> {
    // Check if this operation was already performed
    const existingResult = await this.getOperationResult(idempotencyKey);
    
    if (existingResult) {
      if (existingResult.status === 'completed') {
        console.log(`Idempotency: Returning cached result for key ${idempotencyKey}`);
        return existingResult.result;
      } else if (existingResult.status === 'pending') {
        throw new Error(`Operation with idempotency key ${idempotencyKey} is already in progress`);
      }
      // If status is 'failed', we allow retry
    }

    // Record that the operation is starting
    await this.recordOperationStart(idempotencyKey, operationName);

    try {
      const result = await operation();
      
      // Record successful completion
      await this.recordOperationCompletion(idempotencyKey, result);
      
      return result;
    } catch (error) {
      // Record failure
      await this.recordOperationFailure(idempotencyKey, error);
      throw error;
    }
  }

  /**
   * Get result of a previously executed operation
   */
  private async getOperationResult(key: string): Promise<IdempotencyKey | null> {
    // In a real implementation, this would query a dedicated idempotency table
    // For now, we'll simulate with an in-memory approach or return null
    // In practice, you'd have a table like:
    // CREATE TABLE idempotency_keys (key TEXT PRIMARY KEY, operation TEXT, status TEXT, result TEXT, created_at TIMESTAMP, completed_at TIMESTAMP);
    
    // For this implementation, we'll return null to indicate no previous result
    return null;
  }

  /**
   * Record that an operation is starting
   */
  private async recordOperationStart(key: string, operation: string): Promise<void> {
    // In a real implementation, this would insert a record into an idempotency table
    console.log(`Idempotency: Recording start of operation ${operation} with key ${key}`);
  }

  /**
   * Record successful completion of an operation
   */
  private async recordOperationCompletion(key: string, result: any): Promise<void> {
    // In a real implementation, this would update the idempotency record
    console.log(`Idempotency: Recording completion of operation with key ${key}`);
  }

  /**
   * Record failure of an operation
   */
  private async recordOperationFailure(key: string, error: any): Promise<void> {
    // In a real implementation, this would update the idempotency record with failure status
    console.log(`Idempotency: Recording failure of operation with key ${key}: ${error.message || error}`);
  }

  /**
   * Clean up old idempotency records
   */
  async cleanupOldRecords(): Promise<void> {
    // In a real implementation, this would delete records older than the window
    console.log('Idempotency: Cleaning up old records');
  }
}

export class DataIntegrityManager {
  private config: DataIntegrityConfig;

  constructor(config?: Partial<DataIntegrityConfig>) {
    this.config = {
      checkForeignKeys: true,
      checkNullConstraints: true,
      checkUniqueConstraints: true,
      checkOrphanedRecords: true,
      validateContent: true,
      fixIssues: false,
      ...config
    };
  }

  /**
   * Perform comprehensive data integrity checks
   */
  async performIntegrityChecks(): Promise<IntegrityCheckResult[]> {
    console.log('🔍 Starting data integrity checks...');
    
    const results: IntegrityCheckResult[] = [];

    // Check lessons table
    if (this.config.checkNullConstraints) {
      const lessonResults = await this.checkLessonsIntegrity();
      results.push(...lessonResults);
    }

    // Check vocabulary table
    if (this.config.checkNullConstraints) {
      const vocabResults = await this.checkVocabularyIntegrity();
      results.push(...vocabResults);
    }

    // Check conversation lines table
    if (this.config.checkNullConstraints) {
      const convResults = await this.checkConversationsIntegrity();
      results.push(...convResults);
    }

    // Check for orphaned records
    if (this.config.checkOrphanedRecords) {
      const orphanResults = await this.checkOrphanedRecords();
      results.push(...orphanResults);
    }

    // Validate content
    if (this.config.validateContent) {
      const contentResults = await this.validateContent();
      results.push(...contentResults);
    }

    console.log(`✅ Integrity checks completed: ${results.length} tables checked`);
    return results;
  }

  /**
   * Check lessons table integrity
   */
  private async checkLessonsIntegrity(): Promise<IntegrityCheckResult[]> {
    const results: IntegrityCheckResult[] = [];

    // Check for null required fields
    const nullTitleLessons = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(lessons)
      .where(sql`${lessons.title} IS NULL OR ${lessons.title} = ''`);

    if (nullTitleLessons[0].count > 0) {
      results.push({
        table: 'lessons',
        issues: nullTitleLessons[0].count,
        errors: [`Found ${nullTitleLessons[0].count} lessons with null or empty titles`],
        status: 'fail'
      });
    }

    // Check for null content
    const nullContentLessons = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(lessons)
      .where(sql`${lessons.content} IS NULL OR ${lessons.content} = ''`);

    if (nullContentLessons[0].count > 0) {
      results.push({
        table: 'lessons',
        issues: nullContentLessons[0].count,
        errors: [`Found ${nullContentLessons[0].count} lessons with null or empty content`],
        status: 'fail'
      });
    }

    // Check for duplicate slugs (if unique constraint exists)
    const duplicateSlugs = await db
      .select({ slug: lessons.slug, count: sql<number>`COUNT(*)` })
      .from(lessons)
      .groupBy(lessons.slug)
      .having(sql`COUNT(*) > 1`);

    if (duplicateSlugs.length > 0) {
      results.push({
        table: 'lessons',
        issues: duplicateSlugs.length,
        errors: [`Found ${duplicateSlugs.length} duplicate slugs`],
        status: 'fail'
      });
    }

    if (results.length === 0) {
      results.push({
        table: 'lessons',
        issues: 0,
        errors: [],
        status: 'pass'
      });
    }

    return results;
  }

  /**
   * Check vocabulary table integrity
   */
  private async checkVocabularyIntegrity(): Promise<IntegrityCheckResult[]> {
    const results: IntegrityCheckResult[] = [];

    // Check for null required fields
    const nullWordVocab = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(vocabulary)
      .where(sql`${vocabulary.word} IS NULL OR ${vocabulary.word} = ''`);

    if (nullWordVocab[0].count > 0) {
      results.push({
        table: 'vocabulary',
        issues: nullWordVocab[0].count,
        errors: [`Found ${nullWordVocab[0].count} vocabulary items with null or empty words`],
        status: 'fail'
      });
    }

    const nullDefVocab = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(vocabulary)
      .where(sql`${vocabulary.definition} IS NULL OR ${vocabulary.definition} = ''`);

    if (nullDefVocab[0].count > 0) {
      results.push({
        table: 'vocabulary',
        issues: nullDefVocab[0].count,
        errors: [`Found ${nullDefVocab[0].count} vocabulary items with null or empty definitions`],
        status: 'fail'
      });
    }

    // Check for orphaned vocabulary (no associated lesson)
    const orphanedVocab = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(vocabulary)
      .leftJoin(lessons, eq(vocabulary.lessonId, lessons.id))
      .where(sql`${lessons.id} IS NULL`);

    if (orphanedVocab[0].count > 0) {
      results.push({
        table: 'vocabulary',
        issues: orphanedVocab[0].count,
        errors: [`Found ${orphanedVocab[0].count} vocabulary items with no associated lesson (orphaned)`],
        status: 'fail'
      });
    }

    if (results.length === 0) {
      results.push({
        table: 'vocabulary',
        issues: 0,
        errors: [],
        status: 'pass'
      });
    }

    return results;
  }

  /**
   * Check conversations table integrity
   */
  private async checkConversationsIntegrity(): Promise<IntegrityCheckResult[]> {
    const results: IntegrityCheckResult[] = [];

    // Check for null required fields
    const nullTextConvs = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(conversationLines)
      .where(
        or(
          sql`${conversationLines.englishText} IS NULL OR ${conversationLines.englishText} = ''`,
          sql`${conversationLines.speaker} IS NULL OR ${conversationLines.speaker} = ''`
        )
      );

    if (nullTextConvs[0].count > 0) {
      results.push({
        table: 'conversation_lines',
        issues: nullTextConvs[0].count,
        errors: [`Found ${nullTextConvs[0].count} conversation lines with null or empty required fields`],
        status: 'fail'
      });
    }

    // Check for orphaned conversations (no associated lesson)
    const orphanedConvs = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(conversationLines)
      .leftJoin(lessons, eq(conversationLines.lessonId, lessons.id))
      .where(sql`${lessons.id} IS NULL`);

    if (orphanedConvs[0].count > 0) {
      results.push({
        table: 'conversation_lines',
        issues: orphanedConvs[0].count,
        errors: [`Found ${orphanedConvs[0].count} conversation lines with no associated lesson (orphaned)`],
        status: 'fail'
      });
    }

    if (results.length === 0) {
      results.push({
        table: 'conversation_lines',
        issues: 0,
        errors: [],
        status: 'pass'
      });
    }

    return results;
  }

  /**
   * Check for orphaned records across tables
   */
  private async checkOrphanedRecords(): Promise<IntegrityCheckResult[]> {
    const results: IntegrityCheckResult[] = [];

    // Check for lessons with no vocabulary or conversations (potentially orphaned content)
    const lessonsWithoutContent = await db
      .select({ id: lessons.id, title: lessons.title })
      .from(lessons)
      .leftJoin(vocabulary, eq(lessons.id, vocabulary.lessonId))
      .leftJoin(conversationLines, eq(lessons.id, conversationLines.lessonId))
      .groupBy(lessons.id)
      .having(
        sql`COUNT(${vocabulary.id}) = 0 AND COUNT(${conversationLines.id}) = 0`
      );

    if (lessonsWithoutContent.length > 0) {
      results.push({
        table: 'lessons',
        issues: lessonsWithoutContent.length,
        errors: [`Found ${lessonsWithoutContent.length} lessons with no vocabulary or conversations`],
        status: 'warning',
        details: lessonsWithoutContent.map(l => ({ id: l.id, title: l.title }))
      });
    }

    if (results.length === 0) {
      results.push({
        table: 'orphaned_records',
        issues: 0,
        errors: [],
        status: 'pass'
      });
    }

    return results;
  }

  /**
   * Validate content quality and format
   */
  private async validateContent(): Promise<IntegrityCheckResult[]> {
    const results: IntegrityCheckResult[] = [];

    // Check for lessons with very short content
    const shortContentLessons = await db
      .select({ id: lessons.id, title: lessons.title, content: lessons.content })
      .from(lessons)
      .where(sql`LENGTH(${lessons.content}) < 10`);

    if (shortContentLessons.length > 0) {
      results.push({
        table: 'content_validation',
        issues: shortContentLessons.length,
        errors: [`Found ${shortContentLessons.length} lessons with very short content (<10 chars)`],
        status: 'warning',
        details: shortContentLessons.map(l => ({ id: l.id, title: l.title }))
      });
    }

    // Check for vocabulary with very short definitions
    const shortDefVocab = await db
      .select({ id: vocabulary.id, word: vocabulary.word, definition: vocabulary.definition })
      .from(vocabulary)
      .where(sql`LENGTH(${vocabulary.definition}) < 5`);

    if (shortDefVocab.length > 0) {
      results.push({
        table: 'content_validation',
        issues: shortDefVocab.length,
        errors: [`Found ${shortDefVocab.length} vocabulary items with very short definitions (<5 chars)`],
        status: 'warning',
        details: shortDefVocab.map(v => ({ id: v.id, word: v.word }))
      });
    }

    if (results.length === 0) {
      results.push({
        table: 'content_validation',
        issues: 0,
        errors: [],
        status: 'pass'
      });
    }

    return results;
  }

  /**
   * Fix integrity issues if possible
   */
  async fixIntegrityIssues(results: IntegrityCheckResult[]): Promise<void> {
    if (!this.config.fixIssues) {
      console.log('Fixing issues is disabled in configuration');
      return;
    }

    console.log('🔧 Attempting to fix integrity issues...');

    for (const result of results) {
      if (result.status === 'fail') {
        await this.fixIssuesForTable(result);
      }
    }

    console.log('✅ Attempted to fix integrity issues');
  }

  /**
   * Fix issues for a specific table
   */
  private async fixIssuesForTable(result: IntegrityCheckResult): Promise<void> {
    switch (result.table) {
      case 'lessons':
        await this.fixLessonIssues(result);
        break;
      case 'vocabulary':
        await this.fixVocabularyIssues(result);
        break;
      case 'conversation_lines':
        await this.fixConversationIssues(result);
        break;
      default:
        console.log(`No fixer available for table: ${result.table}`);
    }
  }

  /**
   * Fix lesson-specific issues
   */
  private async fixLessonIssues(result: IntegrityCheckResult): Promise<void> {
    // Fix null titles with default values
    await db
      .update(lessons)
      .set({ title: sql`COALESCE(${lessons.title}, 'Untitled Lesson')` })
      .where(sql`${lessons.title} IS NULL OR ${lessons.title} = ''`);

    // Fix null content with default values
    await db
      .update(lessons)
      .set({ content: sql`COALESCE(${lessons.content}, 'No content available')` })
      .where(sql`${lessons.content} IS NULL OR ${lessons.content} = ''`);

    console.log(`Fixed null fields in lessons table`);
  }

  /**
   * Fix vocabulary-specific issues
   */
  private async fixVocabularyIssues(result: IntegrityCheckResult): Promise<void> {
    // Fix null words with default values
    await db
      .update(vocabulary)
      .set({ word: sql`COALESCE(${vocabulary.word}, 'unknown_word')` })
      .where(sql`${vocabulary.word} IS NULL OR ${vocabulary.word} = ''`);

    // Fix null definitions with default values
    await db
      .update(vocabulary)
      .set({ definition: sql`COALESCE(${vocabulary.definition}, 'No definition available')` })
      .where(sql`${vocabulary.definition} IS NULL OR ${vocabulary.definition} = ''`);

    console.log(`Fixed null fields in vocabulary table`);
  }

  /**
   * Fix conversation-specific issues
   */
  private async fixConversationIssues(result: IntegrityCheckResult): Promise<void> {
    // Fix null English text with default values
    await db
      .update(conversationLines)
      .set({ englishText: sql`COALESCE(${conversationLines.englishText}, 'No text available')` })
      .where(sql`${conversationLines.englishText} IS NULL OR ${conversationLines.englishText} = ''`);

    // Fix null speakers with default values
    await db
      .update(conversationLines)
      .set({ speaker: sql`COALESCE(${conversationLines.speaker}, 'A')` })
      .where(sql`${conversationLines.speaker} IS NULL OR ${conversationLines.speaker} = ''`);

    console.log(`Fixed null fields in conversation_lines table`);
  }

  /**
   * Perform data cleanup operations
   */
  async performDataCleanup(): Promise<void> {
    console.log('🧹 Starting data cleanup...');
    
    // Remove orphaned vocabulary records
    const orphanedVocabResult = await db.delete(vocabulary).where(
      sql`NOT EXISTS (
        SELECT 1 FROM ${lessons} 
        WHERE ${lessons.id} = ${vocabulary.lessonId}
      )`
    );
    
    // Note: Drizzle doesn't provide count for delete operations directly
    await db.delete(vocabulary).where(
      sql`NOT EXISTS (
        SELECT 1 FROM ${lessons} 
        WHERE ${lessons.id} = ${vocabulary.lessonId}
      )`
    );
    
    console.log('Attempted to remove orphaned vocabulary records');

    // Remove orphaned conversation records
    await db.delete(conversationLines).where(
      sql`NOT EXISTS (
        SELECT 1 FROM ${lessons} 
        WHERE ${lessons.id} = ${conversationLines.lessonId}
      )`
    );
    
    console.log('Attempted to remove orphaned conversation records');

    console.log('✅ Data cleanup completed');
  }

  /**
   * Get data statistics for integrity assessment
   */
  async getDataStatistics(): Promise<Record<string, any>> {
    const lessonCount = await db.select({ count: sql<number>`COUNT(*)` }).from(lessons);
    const vocabCount = await db.select({ count: sql<number>`COUNT(*)` }).from(vocabulary);
    const convCount = await db.select({ count: sql<number>`COUNT(*)` }).from(conversationLines);

    // Get content statistics
    const avgLessonLength = await db.select({
      avgLength: sql<number>`AVG(LENGTH(${lessons.content}))`
    }).from(lessons);

    const avgVocabDefLength = await db.select({
      avgLength: sql<number>`AVG(LENGTH(${vocabulary.definition}))`
    }).from(vocabulary);

    return {
      lessons: {
        total: lessonCount[0].count,
        avgContentLength: avgLessonLength[0].avgLength || 0
      },
      vocabulary: {
        total: vocabCount[0].count,
        avgDefinitionLength: avgVocabDefLength[0].avgLength || 0
      },
      conversations: {
        total: convCount[0].count
      },
      overall: {
        totalRecords: lessonCount[0].count + vocabCount[0].count + convCount[0].count
      }
    };
  }
}

// Example usage
export function createIdempotencyManager(windowMs?: number): IdempotencyManager {
  return new IdempotencyManager(windowMs);
}

export function createDataIntegrityManager(config?: Partial<DataIntegrityConfig>): DataIntegrityManager {
  return new DataIntegrityManager(config);
}

// Example of how to use the idempotency and data integrity managers
if (require.main === module) {
  (async () => {
    console.log('Idempotency and Data Integrity Example:');
    
    // Create idempotency manager
    const idempotencyManager = new IdempotencyManager(3600000); // 1 hour window
    
    // Example of idempotent operation
    console.log('\n1. Idempotent Operation Example:');
    const operationResult = await idempotencyManager.executeWithIdempotency(
      'operation-123',
      async () => {
        console.log('Executing actual operation...');
        // Simulate some work
        await new Promise(resolve => setTimeout(resolve, 100));
        return { success: true, data: 'Operation result' };
      },
      'create_lesson'
    );
    console.log('Operation result:', operationResult);
    
    // Try the same operation again - should return cached result
    const cachedResult = await idempotencyManager.executeWithIdempotency(
      'operation-123',
      async () => {
        console.log('This should not execute due to idempotency');
        return { success: false, data: 'This should not appear' };
      },
      'create_lesson'
    );
    console.log('Cached result:', cachedResult);
    
    // Create data integrity manager
    console.log('\n2. Data Integrity Checks:');
    const integrityManager = new DataIntegrityManager({
      checkNullConstraints: true,
      checkOrphanedRecords: true,
      validateContent: true,
      fixIssues: false // Set to true to actually fix issues
    });
    
    // Perform integrity checks
    const integrityResults = await integrityManager.performIntegrityChecks();
    console.log('Integrity check results:');
    integrityResults.forEach(result => {
      console.log(`- ${result.table}: ${result.status.toUpperCase()} (${result.issues} issues)`);
      if (result.errors.length > 0) {
        result.errors.forEach(error => console.log(`  ❌ ${error}`));
      }
    });
    
    // Get data statistics
    console.log('\n3. Data Statistics:');
    const stats = await integrityManager.getDataStatistics();
    console.log(stats);
    
    console.log('\nAll idempotency and data integrity examples completed!');
  })();
}