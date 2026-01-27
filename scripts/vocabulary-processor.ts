import { db } from "../server/db";
import { vocabulary, lessons } from "../shared/schema";
import { eq, and, or, sql, asc, desc } from "drizzle-orm";
import { VocabularyStoplist } from "./vocabulary-stoplist";
import { QualityRubric } from "./quality-rubric";

export interface VocabularyItem {
  id?: number;
  word: string;
  hindi: string;
  pronunciation?: string;
  definition: string;
  example: string;
  lessonId?: number;
  category?: string;
  difficulty?: string;
  frequency?: number;
  isCommon?: boolean;
  synonyms?: string[];
  antonyms?: string[];
  usageNotes?: string[];
  culturalNotes?: string[];
}

export interface ProcessedVocabulary {
  extracted: VocabularyItem[];
  filtered: VocabularyItem[];
  enriched: VocabularyItem[];
  deduplicated: VocabularyItem[];
}

export interface ProcessingOptions {
  sourceText?: string;
  category?: string;
  difficulty?: string;
  excludeStopWords?: boolean;
  minFrequency?: number;
  maxResults?: number;
  includeSynonyms?: boolean;
  includeExamples?: boolean;
  deduplicationStrategy?: 'exact' | 'semantic' | 'frequency';
}

export class VocabularyProcessor {
  private stoplist: VocabularyStoplist;
  private qualityRubric: QualityRubric;

  constructor() {
    this.stoplist = new VocabularyStoplist();
    this.qualityRubric = new QualityRubric();
  }

  /**
   * Extract vocabulary from source text
   */
  async extract(sourceText: string, options?: Partial<ProcessingOptions>): Promise<VocabularyItem[]> {
    console.log('🔍 Extracting vocabulary from source text...');
    
    const opts: ProcessingOptions = {
      excludeStopWords: true,
      minFrequency: 1,
      maxResults: 100,
      includeSynonyms: false,
      includeExamples: true,
      deduplicationStrategy: 'exact',
      ...options
    };

    // Basic text processing to extract potential vocabulary words
    const words = this.extractWords(sourceText);
    
    // Count word frequencies
    const wordFreq = this.countFrequencies(words);
    
    // Filter and create vocabulary items
    const vocabularyItems: VocabularyItem[] = [];
    
    for (const [word, freq] of Object.entries(wordFreq)) {
      if (freq >= (opts.minFrequency || 1) && word.length > 2) { // Only words with min length of 3
        // Check if word should be excluded
        if (opts.excludeStopWords && opts.category && opts.difficulty) {
          if (this.stoplist.shouldExclude(word, opts.category, opts.difficulty)) {
            continue; // Skip stop words
          }
        }
        
        // Create vocabulary item
        const vocabItem: VocabularyItem = {
          word: word.toLowerCase(),
          hindi: '', // Will be filled later
          definition: `Definition for ${word}`,
          example: `Example sentence with ${word}`,
          frequency: freq,
          isCommon: freq > 10, // Simple heuristic for common words
          category: opts.category,
          difficulty: opts.difficulty
        };
        
        vocabularyItems.push(vocabItem);
        
        // Stop if we've reached max results
        if (opts.maxResults && vocabularyItems.length >= opts.maxResults) {
          break;
        }
      }
    }
    
    console.log(`✅ Extracted ${vocabularyItems.length} vocabulary items`);
    return vocabularyItems;
  }

  /**
   * Filter vocabulary based on various criteria
   */
  async filter(vocabularyList: VocabularyItem[], options?: Partial<ProcessingOptions>): Promise<VocabularyItem[]> {
    console.log(`🔍 Filtering ${vocabularyList.length} vocabulary items...`);
    
    const opts: ProcessingOptions = {
      excludeStopWords: true,
      minFrequency: 1,
      ...options
    };

    let filtered = [...vocabularyList];

    // Filter by minimum frequency
    if (opts.minFrequency !== undefined) {
      filtered = filtered.filter(item => (item.frequency || 0) >= opts.minFrequency!);
    }

    // Filter by stoplist if specified
    if (opts.excludeStopWords && opts.category && opts.difficulty) {
      filtered = filtered.filter(item => 
        !this.stoplist.shouldExclude(item.word, opts.category!, opts.difficulty!)
      );
    }

    // Filter by difficulty level if specified
    if (opts.difficulty) {
      filtered = filtered.filter(item => 
        !item.difficulty || item.difficulty === opts.difficulty
      );
    }

    // Filter by category if specified
    if (opts.category) {
      filtered = filtered.filter(item => 
        !item.category || item.category === opts.category
      );
    }

    console.log(`✅ Filtered to ${filtered.length} vocabulary items`);
    return filtered;
  }

  /**
   * Enrich vocabulary with additional information
   */
  async enrich(vocabularyList: VocabularyItem[], options?: Partial<ProcessingOptions>): Promise<VocabularyItem[]> {
    console.log(`✨ Enriching ${vocabularyList.length} vocabulary items...`);
    
    const opts: ProcessingOptions = {
      includeSynonyms: true,
      includeExamples: true,
      ...options
    };

    const enrichedVocabulary: VocabularyItem[] = [];

    for (const item of vocabularyList) {
      // Create enriched item with additional data
      const enrichedItem: VocabularyItem = {
        ...item,
        // Add pronunciation (simplified - in real implementation, use pronunciation API)
        pronunciation: this.generatePronunciation(item.word),
        
        // Add Hindi translation (in real implementation, use translation API)
        hindi: item.hindi || this.generateHindiTranslation(item.word),
        
        // Add example sentence if needed
        example: item.example || `Example with ${item.word}`,
        
        // Add synonyms if requested
        synonyms: opts.includeSynonyms ? this.generateSynonyms(item.word) : item.synonyms,
        
        // Add usage notes
        usageNotes: this.generateUsageNotes(item.word, item.difficulty || 'beginner'),
        
        // Add cultural notes
        culturalNotes: this.generateCulturalNotes(item.word, item.category || 'general')
      };

      enrichedVocabulary.push(enrichedItem);
    }

    console.log(`✅ Enriched ${enrichedVocabulary.length} vocabulary items`);
    return enrichedVocabulary;
  }

  /**
   * Deduplicate vocabulary items
   */
  async deduplicate(vocabularyList: VocabularyItem[], strategy: 'exact' | 'semantic' | 'frequency' = 'exact'): Promise<VocabularyItem[]> {
    console.log(`🔄 Deduplicating ${vocabularyList.length} vocabulary items using ${strategy} strategy...`);
    
    switch (strategy) {
      case 'exact':
        return this.deduplicateExact(vocabularyList);
      case 'semantic':
        return this.deduplicateSemantic(vocabularyList);
      case 'frequency':
        return this.deduplicateByFrequency(vocabularyList);
      default:
        return this.deduplicateExact(vocabularyList);
    }
  }

  /**
   * Process vocabulary through the complete pipeline
   */
  async process(sourceText: string, options?: Partial<ProcessingOptions>): Promise<ProcessedVocabulary> {
    console.log('⚙️ Starting vocabulary processing pipeline...');
    
    const opts: ProcessingOptions = {
      excludeStopWords: true,
      minFrequency: 1,
      maxResults: 100,
      includeSynonyms: false,
      includeExamples: true,
      deduplicationStrategy: 'exact',
      ...options
    };

    // Extract vocabulary
    const extracted = await this.extract(sourceText, opts);
    
    // Filter vocabulary
    const filtered = await this.filter(extracted, opts);
    
    // Enrich vocabulary
    const enriched = await this.enrich(filtered, opts);
    
    // Deduplicate vocabulary
    const deduplicated = await this.deduplicate(enriched, opts.deduplicationStrategy);
    
    const result: ProcessedVocabulary = {
      extracted,
      filtered,
      enriched,
      deduplicated
    };
    
    console.log(`✅ Processing completed: ${result.extracted.length} → ${result.deduplicated.length} items`);
    return result;
  }

  /**
   * Extract words from text (basic implementation)
   */
  private extractWords(text: string): string[] {
    // Remove punctuation and split into words
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ') // Replace punctuation with spaces
      .split(/\s+/)
      .filter(word => word.length > 0); // Remove empty strings
    
    return words;
  }

  /**
   * Count word frequencies
   */
  private countFrequencies(words: string[]): Record<string, number> {
    const freq: Record<string, number> = {};
    
    for (const word of words) {
      freq[word] = (freq[word] || 0) + 1;
    }
    
    return freq;
  }

  /**
   * Generate pronunciation for a word (simplified)
   */
  private generatePronunciation(word: string): string {
    // In a real implementation, this would use a pronunciation API
    // For now, return a simplified phonetic representation
    return word; // Placeholder
  }

  /**
   * Generate Hindi translation for a word (simplified)
   */
  private generateHindiTranslation(word: string): string {
    // In a real implementation, this would use a translation API
    // For now, return the English word as placeholder
    return word; // Placeholder
  }

  /**
   * Generate synonyms for a word (simplified)
   */
  private generateSynonyms(word: string): string[] {
    // In a real implementation, this would use a thesaurus API
    // For now, return empty array
    return []; // Placeholder
  }

  /**
   * Generate usage notes for a word
   */
  private generateUsageNotes(word: string, difficulty: string): string[] {
    const notes: string[] = [];
    
    // Add difficulty-appropriate notes
    if (difficulty === 'beginner') {
      notes.push(`Use this word in simple sentences`);
    } else if (difficulty === 'intermediate') {
      notes.push(`This word can be used in formal and informal contexts`);
    } else {
      notes.push(`This word has nuanced meanings depending on context`);
    }
    
    return notes;
  }

  /**
   * Generate cultural notes for a word
   */
  private generateCulturalNotes(word: string, category: string): string[] {
    const notes: string[] = [];
    
    // Add category-specific cultural notes
    if (category === 'social') {
      notes.push(`Use appropriate forms of address with this word`);
    } else if (category === 'professional') {
      notes.push(`This word is commonly used in business settings`);
    }
    
    return notes;
  }

  /**
   * Deduplicate using exact word matching
   */
  private deduplicateExact(vocabularyList: VocabularyItem[]): VocabularyItem[] {
    const seen = new Set<string>();
    const result: VocabularyItem[] = [];
    
    for (const item of vocabularyList) {
      const key = item.word.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        result.push(item);
      }
    }
    
    return result;
  }

  /**
   * Deduplicate using semantic similarity (simplified)
   */
  private deduplicateSemantic(vocabularyList: VocabularyItem[]): VocabularyItem[] {
    // In a real implementation, this would use semantic analysis
    // For now, just do exact matching
    return this.deduplicateExact(vocabularyList);
  }

  /**
   * Deduplicate by keeping highest frequency items
   */
  private deduplicateByFrequency(vocabularyList: VocabularyItem[]): VocabularyItem[] {
    // Group by word
    const grouped = new Map<string, VocabularyItem[]>();
    
    for (const item of vocabularyList) {
      const key = item.word.toLowerCase();
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)!.push(item);
    }
    
    // For each group, keep the item with highest frequency
    const result: VocabularyItem[] = [];
    
    for (const items of grouped.values()) {
      // Sort by frequency descending and take the first one
      const highestFreq = items.sort((a, b) => (b.frequency || 0) - (a.frequency || 0))[0];
      result.push(highestFreq);
    }
    
    return result;
  }

  /**
   * Extract vocabulary from existing lessons in the database
   */
  async extractFromLessons(lessonIds?: number[]): Promise<VocabularyItem[]> {
    console.log('🔍 Extracting vocabulary from existing lessons...');
    
    let dbVocabulary = await db.select().from(vocabulary);
    
    if (lessonIds && lessonIds.length > 0) {
      dbVocabulary = await db.select().from(vocabulary)
        .where(
          or(...lessonIds.map(id => eq(vocabulary.lessonId, id)))
        );
    }
    
    const vocabularyItems: VocabularyItem[] = dbVocabulary.map(v => ({
      id: v.id,
      word: v.word,
      hindi: v.hindiTranslation || '',
      pronunciation: v.pronunciation || '',
      definition: v.definition,
      example: v.example,
      lessonId: v.lessonId,
      frequency: 1 // Default frequency for database items
    }));
    
    console.log(`✅ Extracted ${vocabularyItems.length} vocabulary items from lessons`);
    return vocabularyItems;
  }

  /**
   * Merge vocabulary lists
   */
  async mergeVocabularyLists(lists: VocabularyItem[][]): Promise<VocabularyItem[]> {
    console.log(`🔗 Merging ${lists.length} vocabulary lists...`);
    
    const allItems: VocabularyItem[] = [];
    
    for (const list of lists) {
      allItems.push(...list);
    }
    
    // Deduplicate the merged list
    const deduplicated = await this.deduplicate(allItems, 'frequency');
    
    console.log(`✅ Merged and deduplicated to ${deduplicated.length} items`);
    return deduplicated;
  }

  /**
   * Validate vocabulary items
   */
  async validateVocabulary(vocabularyList: VocabularyItem[]): Promise<{ valid: VocabularyItem[]; invalid: { item: VocabularyItem; errors: string[] }[] }> {
    const valid: VocabularyItem[] = [];
    const invalid: { item: VocabularyItem; errors: string[] }[] = [];

    for (const item of vocabularyList) {
      const errors: string[] = [];
      
      // Validate required fields
      if (!item.word || item.word.trim().length === 0) {
        errors.push('Word is required');
      }
      
      if (!item.definition || item.definition.trim().length === 0) {
        errors.push('Definition is required');
      }
      
      if (!item.example || item.example.trim().length === 0) {
        errors.push('Example is required');
      }
      
      if (errors.length > 0) {
        invalid.push({ item, errors });
      } else {
        valid.push(item);
      }
    }
    
    return { valid, invalid };
  }

  /**
   * Save processed vocabulary to database
   */
  async saveToDatabase(vocabularyList: VocabularyItem[], lessonId?: number): Promise<void> {
    console.log(`💾 Saving ${vocabularyList.length} vocabulary items to database...`);
    
    for (const item of vocabularyList) {
      await db.insert(vocabulary).values({
        lessonId: lessonId || item.lessonId || 1, // Default to lesson 1 if not specified
        word: item.word,
        hindiTranslation: item.hindi,
        pronunciation: item.pronunciation,
        definition: item.definition,
        example: item.example,
        // Note: The vocabulary table doesn't have all the enrichment fields
        // Only saving the core fields
      }).onConflictDoNothing(); // Avoid duplicates
    }
    
    console.log(`✅ Saved ${vocabularyList.length} vocabulary items to database`);
  }

  /**
   * Get vocabulary statistics
   */
  getVocabularyStats(vocabularyList: VocabularyItem[]): Record<string, any> {
    const total = vocabularyList.length;
    const withHindi = vocabularyList.filter(v => v.hindi && v.hindi.trim().length > 0).length;
    const withPronunciation = vocabularyList.filter(v => v.pronunciation && v.pronunciation.trim().length > 0).length;
    const withExamples = vocabularyList.filter(v => v.example && v.example.trim().length > 0).length;
    
    // Get frequency distribution
    const frequencies: number[] = vocabularyList.map(v => v.frequency || 0);
    const avgFrequency = frequencies.length > 0 ? frequencies.reduce((a, b) => a + b, 0) / frequencies.length : 0;
    
    return {
      total,
      withHindi,
      withPronunciation,
      withExamples,
      avgFrequency,
      completeness: {
        hindi: total > 0 ? (withHindi / total * 100).toFixed(2) + '%' : '0%',
        pronunciation: total > 0 ? (withPronunciation / total * 100).toFixed(2) + '%' : '0%',
        examples: total > 0 ? (withExamples / total * 100).toFixed(2) + '%' : '0%'
      }
    };
  }
}

// Example usage
export function createVocabularyProcessor(): VocabularyProcessor {
  return new VocabularyProcessor();
}

// Example of how to use the vocabulary processor
// This code is only executed when the file is run directly
const runVocabularyProcessorExample = async () => {
  const processor = new VocabularyProcessor();
  
  // Sample text for processing
  const sampleText = `
    Hello everyone! Welcome to our English learning platform. 
    Today we will learn about introductions. 
    When meeting someone new, we say "hello" and ask "how are you?".
    The person might respond "I am fine, thank you".
    Learning English is very important for professional growth.
    Practice speaking, listening, reading, and writing every day.
  `;
  
  try {
    // Process the vocabulary
    const result = await processor.process(sampleText, {
      category: 'daily_life',
      difficulty: 'beginner',
      minFrequency: 1,
      maxResults: 20,
      includeSynonyms: true
    });
    
    console.log('Processing Results:');
    console.log(`- Extracted: ${result.extracted.length} items`);
    console.log(`- Filtered: ${result.filtered.length} items`);
    console.log(`- Enriched: ${result.enriched.length} items`);
    console.log(`- Deduplicated: ${result.deduplicated.length} items`);
    
    // Show first few results
    console.log('\nFirst 3 deduplicated items:');
    result.deduplicated.slice(0, 3).forEach((item, index) => {
      console.log(`${index + 1}. ${item.word} - ${item.hindi} - ${item.definition}`);
    });
    
    // Get statistics
    const stats = processor.getVocabularyStats(result.deduplicated);
    console.log('\nStatistics:', stats);
    
    // Validate the vocabulary
    const validation = await processor.validateVocabulary(result.deduplicated);
    console.log(`\nValidation: ${validation.valid.length} valid, ${validation.invalid.length} invalid`);
  } catch (error) {
    console.error('Error processing vocabulary:', error);
  }
};

// Uncomment the line below to run the example
// runVocabularyProcessorExample();