import { db } from "../server/db";
import { lessons, vocabulary, conversationLines } from "../shared/schema";
import { eq, and, or, sql, asc, desc } from "drizzle-orm";
import { VocabularyProcessor } from "./vocabulary-processor";
import { LLMContentGenerator } from "./llm-content-generator";
import { MarkdownComposer } from "./markdown-composer";
import { AuditPhase } from "./audit-phase";
import { QualityRubric } from "./quality-rubric";

export interface BatchProcessOptions {
  batchSize?: number;
  maxRetries?: number;
  dryRun?: boolean;
  resumeFrom?: number;
  transactionTimeout?: number;
  validateBeforeInsert?: boolean;
  stopOnError?: boolean;
}

export interface BatchProcessResult {
  success: boolean;
  processed: number;
  errors: number;
  skipped: number;
  total: number;
  startTime: Date;
  endTime: Date;
  duration: number; // in milliseconds
  errorDetails?: Array<{ index: number; error: any; item: any }>;
}

export interface ProcessItem {
  id?: string;
  type: 'lesson' | 'vocabulary' | 'conversation' | 'content';
  data: any;
  category?: string;
  difficulty?: string;
  metadata?: Record<string, any>;
}

export class BatchProcessor {
  private vocabularyProcessor: VocabularyProcessor;
  private contentGenerator: LLMContentGenerator;
  private markdownComposer: MarkdownComposer;
  private auditPhase: AuditPhase;
  private qualityRubric: QualityRubric;

  constructor() {
    this.vocabularyProcessor = new VocabularyProcessor();
    this.contentGenerator = new LLMContentGenerator();
    this.markdownComposer = new MarkdownComposer();
    this.auditPhase = new AuditPhase();
    this.qualityRubric = new QualityRubric();
  }

  /**
   * Process a batch of items with transactions, resume capability, and dry-run
   */
  async processBatch(
    items: ProcessItem[], 
    options?: Partial<BatchProcessOptions>
  ): Promise<BatchProcessResult> {
    const opts: BatchProcessOptions = {
      batchSize: 10,
      maxRetries: 3,
      dryRun: false,
      resumeFrom: 0,
      transactionTimeout: 30000,
      validateBeforeInsert: true,
      stopOnError: false,
      ...options
    };

    console.log(`📦 Starting batch processing of ${items.length} items...`);
    console.log(`⚙️  Options: batchSize=${opts.batchSize}, dryRun=${opts.dryRun}, resumeFrom=${opts.resumeFrom}`);

    const startTime = new Date();
    let processed = 0;
    let errors = 0;
    let skipped = 0;
    const errorDetails: Array<{ index: number; error: any; item: any }> = [];

    try {
      // Start from the resume point
      const startIndex = opts.resumeFrom || 0;
      const itemsToProcess = items.slice(startIndex);

      // Process in batches
      for (let i = 0; i < itemsToProcess.length; i += opts.batchSize!) {
        const batch = itemsToProcess.slice(i, i + opts.batchSize!);
        console.log(`🔄 Processing batch ${Math.floor(i / opts.batchSize!) + 1} (${batch.length} items)...`);

        // Process batch with transaction
        const batchResult = await this.processBatchWithTransaction(batch, opts);
        
        processed += batchResult.processed;
        errors += batchResult.errors;
        skipped += batchResult.skipped;
        
        if (batchResult.errorDetails) {
          errorDetails.push(...batchResult.errorDetails);
        }

        // If stopOnError and there were errors, break
        if (opts.stopOnError && batchResult.errors > 0) {
          console.log(`❌ Stopping batch processing due to error (stopOnError=true)`);
          break;
        }
      }

      const endTime = new Date();
      const duration = endTime.getTime() - startTime.getTime();

      const result: BatchProcessResult = {
        success: errors === 0,
        processed,
        errors,
        skipped,
        total: items.length,
        startTime,
        endTime,
        duration,
        errorDetails: errorDetails.length > 0 ? errorDetails : undefined
      };

      console.log(`✅ Batch processing completed: ${processed} processed, ${errors} errors, ${skipped} skipped`);
      return result;

    } catch (error) {
      const endTime = new Date();
      const duration = endTime.getTime() - startTime.getTime();

      console.error('❌ Batch processing failed:', error);
      return {
        success: false,
        processed,
        errors: errors + 1, // Account for the error that caused the catch
        skipped: items.length - processed - errors - 1,
        total: items.length,
        startTime,
        endTime,
        duration,
        errorDetails: [...errorDetails, { index: processed, error, item: items[processed] }]
      };
    }
  }

  /**
   * Process a single batch with database transaction
   */
  private async processBatchWithTransaction(
    batch: ProcessItem[], 
    options: BatchProcessOptions
  ): Promise<BatchProcessResult> {
    const result: BatchProcessResult = {
      success: true,
      processed: 0,
      errors: 0,
      skipped: 0,
      total: batch.length,
      startTime: new Date(),
      endTime: new Date(),
      duration: 0
    };

    if (options.dryRun) {
      // In dry run mode, just validate and report what would happen
      for (const item of batch) {
        try {
          await this.validateItem(item, options);
          result.processed++;
          console.log(`📝 DRY RUN: Would process item ${item.id || 'unknown'} of type ${item.type}`);
        } catch (error) {
          result.errors++;
          console.error(`❌ DRY RUN: Validation failed for item ${item.id || 'unknown'}:`, error);
        }
      }
      
      result.endTime = new Date();
      result.duration = result.endTime.getTime() - result.startTime.getTime();
      return result;
    }

    // Process items in a database transaction
    return db.transaction(async (tx) => {
      for (const item of batch) {
        try {
          // Validate item if required
          if (options.validateBeforeInsert) {
            await this.validateItem(item, options);
          }

          // Process the specific item
          await this.processItemInTransaction(tx, item, options);
          result.processed++;

          console.log(`✅ Processed item ${item.id || 'unknown'} of type ${item.type}`);
        } catch (error) {
          result.errors++;
          console.error(`❌ Error processing item ${item.id || 'unknown'}:`, error);
          
          if (options.stopOnError) {
            throw error; // Rethrow to rollback transaction
          }
        }
      }

      result.endTime = new Date();
      result.duration = result.endTime.getTime() - result.startTime.getTime();
      return result;
    });
  }

  /**
   * Process a single item within a transaction
   */
  private async processItemInTransaction(
    tx: any, // Drizzle transaction
    item: ProcessItem,
    options: BatchProcessOptions
  ): Promise<void> {
    switch (item.type) {
      case 'lesson':
        await this.processLessonItem(tx, item);
        break;
      case 'vocabulary':
        await this.processVocabularyItem(tx, item);
        break;
      case 'conversation':
        await this.processConversationItem(tx, item);
        break;
      case 'content':
        await this.processContentItem(tx, item);
        break;
      default:
        throw new Error(`Unknown item type: ${item.type}`);
    }
  }

  /**
   * Process a lesson item
   */
  private async processLessonItem(tx: any, item: ProcessItem): Promise<void> {
    // In a real implementation, this would insert the lesson into the database
    // For now, we'll just validate the structure
    const lessonData = item.data;
    
    if (!lessonData.title || !lessonData.content) {
      throw new Error('Lesson must have title and content');
    }

    // Insert lesson into database
    await tx.insert(lessons).values({
      title: lessonData.title,
      slug: lessonData.slug || this.generateSlug(lessonData.title),
      description: lessonData.description || '',
      content: lessonData.content,
      difficulty: lessonData.difficulty || 'Beginner',
      order: lessonData.order || 1,
      imageUrl: lessonData.imageUrl || null,
      emojiTheme: lessonData.emojiTheme || null,
      hindiTitle: lessonData.hindiTitle || lessonData.title,
      hindiDescription: lessonData.hindiDescription || lessonData.description || '',
      category: lessonData.category || 'General'
    });
  }

  /**
   * Process a vocabulary item
   */
  private async processVocabularyItem(tx: any, item: ProcessItem): Promise<void> {
    const vocabData = item.data;
    
    if (!vocabData.word || !vocabData.definition) {
      throw new Error('Vocabulary must have word and definition');
    }

    // Insert vocabulary into database
    await tx.insert(vocabulary).values({
      lessonId: vocabData.lessonId || 1,
      word: vocabData.word,
      pronunciation: vocabData.pronunciation || null,
      definition: vocabData.definition,
      example: vocabData.example || '',
      hindiTranslation: vocabData.hindiTranslation || vocabData.hindi || '',
      hindiPronunciation: vocabData.hindiPronunciation || null,
      audioUrl: vocabData.audioUrl || null
    });
  }

  /**
   * Process a conversation item
   */
  private async processConversationItem(tx: any, item: ProcessItem): Promise<void> {
    const convData = item.data;
    
    if (!convData.speaker || !convData.englishText) {
      throw new Error('Conversation must have speaker and english text');
    }

    // Insert conversation line into database
    await tx.insert(conversationLines).values({
      lessonId: convData.lessonId || 1,
      speaker: convData.speaker,
      englishText: convData.englishText,
      hindiText: convData.hindiText || '',
      emoji: convData.emoji || null,
      lineOrder: convData.lineOrder || 1
    });
  }

  /**
   * Process a content item (generate full lesson with vocab and conversations)
   */
  private async processContentItem(tx: any, item: ProcessItem): Promise<void> {
    const contentData = item.data;
    
    // Generate content using LLM if needed
    if (!contentData.generated) {
      const generated = await this.contentGenerator.generateContent({
        topic: contentData.topic || 'general',
        category: contentData.category || 'daily_life',
        difficulty: contentData.difficulty || 'beginner'
      });
      
      contentData.generated = generated;
    }

    // Create lesson from generated content
    const lessonId = await this.createLessonFromContent(tx, contentData.generated);
    
    // Add vocabulary
    for (const vocab of contentData.generated.vocabulary) {
      await tx.insert(vocabulary).values({
        lessonId: lessonId,
        word: vocab.word,
        hindiTranslation: vocab.hindi,
        pronunciation: vocab.pronunciation,
        definition: vocab.definition,
        example: vocab.example,
      });
    }
    
    // Add conversations
    for (const conv of contentData.generated.conversations) {
      await tx.insert(conversationLines).values({
        lessonId: lessonId,
        speaker: conv.speaker,
        englishText: conv.english,
        hindiText: conv.hindi,
        lineOrder: 1 // This would need to be properly calculated in a real implementation
      });
    }
  }

  /**
   * Create a lesson from generated content
   */
  private async createLessonFromContent(tx: any, content: any): Promise<number> {
    const [newLesson] = await tx.insert(lessons).values({
      title: content.title,
      slug: this.generateSlug(content.title),
      description: `Lesson about ${content.metadata.category}`,
      content: this.markdownComposer.compose(content),
      difficulty: content.metadata.difficulty,
      order: 1, // This would need to be properly calculated in a real implementation
      hindiTitle: content.title, // Hindi first
      category: content.metadata.category
    }).returning();

    return newLesson.id;
  }

  /**
   * Validate a single item
   */
  private async validateItem(item: ProcessItem, options: BatchProcessOptions): Promise<boolean> {
    switch (item.type) {
      case 'lesson':
        return this.validateLessonItem(item);
      case 'vocabulary':
        return this.validateVocabularyItem(item);
      case 'conversation':
        return this.validateConversationItem(item);
      case 'content':
        return this.validateContentItem(item);
      default:
        throw new Error(`Unknown item type: ${item.type}`);
    }
  }

  /**
   * Validate lesson item
   */
  private async validateLessonItem(item: ProcessItem): Promise<boolean> {
    const lessonData = item.data;
    
    if (!lessonData.title || typeof lessonData.title !== 'string') {
      throw new Error('Lesson title is required and must be a string');
    }
    
    if (!lessonData.content || typeof lessonData.content !== 'string') {
      throw new Error('Lesson content is required and must be a string');
    }
    
    return true;
  }

  /**
   * Validate vocabulary item
   */
  private async validateVocabularyItem(item: ProcessItem): Promise<boolean> {
    const vocabData = item.data;
    
    if (!vocabData.word || typeof vocabData.word !== 'string') {
      throw new Error('Vocabulary word is required and must be a string');
    }
    
    if (!vocabData.definition || typeof vocabData.definition !== 'string') {
      throw new Error('Vocabulary definition is required and must be a string');
    }
    
    return true;
  }

  /**
   * Validate conversation item
   */
  private async validateConversationItem(item: ProcessItem): Promise<boolean> {
    const convData = item.data;
    
    if (!convData.speaker || !['A', 'B', 'C', 'D'].includes(convData.speaker)) {
      throw new Error('Conversation speaker must be A, B, C, or D');
    }
    
    if (!convData.englishText || typeof convData.englishText !== 'string') {
      throw new Error('Conversation english text is required and must be a string');
    }
    
    return true;
  }

  /**
   * Validate content item
   */
  private async validateContentItem(item: ProcessItem): Promise<boolean> {
    const contentData = item.data;
    
    if (!contentData.topic && !contentData.generated) {
      throw new Error('Content item must have either a topic for generation or generated content');
    }
    
    return true;
  }

  /**
   * Generate a URL-friendly slug
   */
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/--+/g, '-') // Replace multiple hyphens with single
      .trim();
  }

  /**
   * Resume a failed batch process
   */
  async resumeBatch(
    items: ProcessItem[],
    lastProcessedIndex: number,
    options?: Partial<BatchProcessOptions>
  ): Promise<BatchProcessResult> {
    console.log(`🔄 Resuming batch processing from index ${lastProcessedIndex}...`);
    
    const updatedOptions: Partial<BatchProcessOptions> = {
      ...options,
      resumeFrom: lastProcessedIndex
    };
    
    return this.processBatch(items, updatedOptions);
  }

  /**
   * Perform a dry run of the batch process
   */
  async dryRun(items: ProcessItem[], options?: Partial<BatchProcessOptions>): Promise<BatchProcessResult> {
    console.log(`🧪 Performing dry run of ${items.length} items...`);
    
    const updatedOptions: Partial<BatchProcessOptions> = {
      ...options,
      dryRun: true
    };
    
    return this.processBatch(items, updatedOptions);
  }

  /**
   * Process items with progress tracking
   */
  async processWithProgress(
    items: ProcessItem[],
    onProgress?: (progress: { processed: number; total: number; percentage: number; currentBatch: number; totalBatches: number }) => void,
    options?: Partial<BatchProcessOptions>
  ): Promise<BatchProcessResult> {
    const opts: BatchProcessOptions = {
      batchSize: 10,
      ...options
    };

    const total = items.length;
    const totalBatches = Math.ceil(total / opts.batchSize!);
    let processed = 0;

    const result: BatchProcessResult = {
      success: true,
      processed: 0,
      errors: 0,
      skipped: 0,
      total,
      startTime: new Date(),
      endTime: new Date(),
      duration: 0
    };

    for (let i = 0; i < items.length; i += opts.batchSize!) {
      const batch = items.slice(i, i + opts.batchSize!);
      const batchResult = await this.processBatchWithTransaction(batch, opts);
      
      result.processed += batchResult.processed;
      result.errors += batchResult.errors;
      result.skipped += batchResult.skipped;
      
      processed += batch.length;
      
      // Report progress
      if (onProgress) {
        onProgress({
          processed,
          total,
          percentage: Math.round((processed / total) * 100),
          currentBatch: Math.floor(i / opts.batchSize!) + 1,
          totalBatches
        });
      }
    }

    result.endTime = new Date();
    result.duration = result.endTime.getTime() - result.startTime.getTime();
    result.success = result.errors === 0;

    return result;
  }

  /**
   * Process a large dataset with automatic batching and error recovery
   */
  async processLargeDataset(
    generator: AsyncGenerator<ProcessItem>,
    options?: Partial<BatchProcessOptions>
  ): Promise<BatchProcessResult> {
    const opts: BatchProcessOptions = {
      batchSize: 50,
      maxRetries: 3,
      dryRun: false,
      validateBeforeInsert: true,
      ...options
    };

    console.log(`🚛 Processing large dataset with automatic batching...`);
    
    const startTime = new Date();
    let processed = 0;
    let errors = 0;
    let skipped = 0;
    const errorDetails: Array<{ index: number; error: any; item: any }> = [];

    // Process items in batches from the generator
    const batch: ProcessItem[] = [];
    let index = 0;

    for await (const item of generator) {
      batch.push(item);
      
      // Process batch when it reaches the specified size
      if (batch.length >= opts.batchSize!) {
        try {
          const batchResult = await this.processBatchWithTransaction(batch, opts);
          processed += batchResult.processed;
          errors += batchResult.errors;
          skipped += batchResult.skipped;
          
          if (batchResult.errorDetails) {
            errorDetails.push(...batchResult.errorDetails);
          }
        } catch (error) {
          errors++;
          errorDetails.push({ index, error, item });
          console.error(`❌ Error processing batch containing item at index ${index}:`, error);
        }
        
        // Clear the batch for next iteration
        batch.length = 0;
      }
      
      index++;
    }

    // Process remaining items in the final batch
    if (batch.length > 0) {
      try {
        const batchResult = await this.processBatchWithTransaction(batch, opts);
        processed += batchResult.processed;
        errors += batchResult.errors;
        skipped += batchResult.skipped;
        
        if (batchResult.errorDetails) {
          errorDetails.push(...batchResult.errorDetails);
        }
      } catch (error) {
        errors++;
        errorDetails.push({ index: index - batch.length, error, item: batch[0] });
        console.error(`❌ Error processing final batch:`, error);
      }
    }

    const endTime = new Date();
    const duration = endTime.getTime() - startTime.getTime();

    const result: BatchProcessResult = {
      success: errors === 0,
      processed,
      errors,
      skipped,
      total: index,
      startTime,
      endTime,
      duration,
      errorDetails: errorDetails.length > 0 ? errorDetails : undefined
    };

    console.log(`✅ Large dataset processing completed: ${processed} processed, ${errors} errors`);
    return result;
  }
}

// Example usage
export function createBatchProcessor(): BatchProcessor {
  return new BatchProcessor();
}

// Example of how to use the batch processor
if (require.main === module) {
  (async () => {
    const processor = new BatchProcessor();
    
    // Create sample items to process
    const sampleItems: ProcessItem[] = [
      {
        id: 'lesson-1',
        type: 'lesson',
        data: {
          title: 'Introduction to Daily Life',
          content: 'This lesson covers basic daily life vocabulary and phrases.',
          category: 'daily_life',
          difficulty: 'beginner'
        }
      },
      {
        id: 'vocab-1',
        type: 'vocabulary',
        data: {
          word: 'hello',
          definition: 'A common greeting',
          example: 'Hello, how are you?',
          hindi: 'नमस्ते'
        }
      },
      {
        id: 'conv-1',
        type: 'conversation',
        data: {
          speaker: 'A',
          englishText: 'Hello, how are you?',
          hindiText: 'नमस्ते, आप कैसे हैं?'
        }
      },
      {
        id: 'content-1',
        type: 'content',
        data: {
          topic: 'Introductions',
          category: 'daily_life',
          difficulty: 'beginner'
        }
      }
    ];

    try {
      // Perform a dry run first
      console.log('🧪 Performing dry run...');
      const dryRunResult = await processor.dryRun(sampleItems, { batchSize: 2 });
      console.log('Dry run result:', dryRunResult);

      // Process with progress tracking
      console.log('\n🚀 Processing with progress tracking...');
      const result = await processor.processWithProgress(
        sampleItems, 
        (progress) => {
          console.log(`📊 Progress: ${progress.percentage}% (${progress.processed}/${progress.total}) - Batch ${progress.currentBatch}/${progress.totalBatches}`);
        },
        { batchSize: 2 }
      );
      
      console.log('\nFinal result:', result);
    } catch (error) {
      console.error('Error in batch processing:', error);
    }
  })();
}