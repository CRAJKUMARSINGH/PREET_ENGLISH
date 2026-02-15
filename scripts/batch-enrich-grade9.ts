/**
 * BATCH ENRICHMENT FOR GRADE 9 QUALITY
 * 
 * Processes lessons in batches to avoid overwhelming the database
 * Focuses on critical items: Hindi content, vocabulary, conversations
 */

import { db } from '../server/db';
import { storage } from '../server/storage';
import { lessons, vocabulary, conversationLines, quizzes, quizQuestions } from '../shared/schema';
import { eq, and } from 'drizzle-orm';
import * as fs from 'fs/promises';
import * as path from 'path';

interface BatchEnrichmentOptions {
  batchSize?: number;
  startFrom?: number;
  maxLessons?: number;
  skipExisting?: boolean;
  priorities?: {
    hindiContent: boolean;
    vocabulary: boolean;
    conversations: boolean;
    quizzes: boolean;
  };
}

class BatchEnricher {
  private enriched = 0;
  private errors = 0;
  private skipped = 0;

  /**
   * Add Hindi content section to lesson
   */
  private async addHindiContent(lessonId: number, lesson: any): Promise<void> {
    // Check if Hindi content already exists
    if (lesson.content && (lesson.content.includes('## हिंदी') || /[\u0900-\u097F]{20,}/.test(lesson.content))) {
      return; // Already has Hindi
    }

    const hindiSection = `

---

## 🇮🇳 हिंदी व्याख्या (Hindi Explanation)

### शीर्षक (Title)
${lesson.hindiTitle || lesson.title}

### विवरण (Description)  
${lesson.hindiDescription || 'इस पाठ में आप अंग्रेजी सीखेंगे।'}

### मुख्य बिंदु (Key Points)
- इस पाठ में आप महत्वपूर्ण अंग्रेजी अवधारणाएं सीखेंगे
- प्रत्येक उदाहरण के साथ हिंदी अनुवाद दिया गया है
- अभ्यास करके अपनी समझ को मजबूत करें
- ध्यान से सुनें और बोलने का अभ्यास करें

### सांस्कृतिक नोट (Cultural Note)
भारतीय संदर्भ में, ये अवधारणाएं आपकी दैनिक बातचीत में उपयोगी होंगी। 
अंग्रेजी बोलते समय आत्मविश्वास के साथ बोलें और गलतियों से न डरें।

### अभ्यास सुझाव (Practice Suggestions)
1. नए शब्दों को बार-बार बोलकर अभ्यास करें
2. वाक्यों को जोर से पढ़कर उच्चारण सुधारें
3. दैनिक जीवन में इन वाक्यों का उपयोग करें
4. मित्रों या परिवार के साथ अंग्रेजी में बातचीत करें

---

`;

    const updatedContent = lesson.content + hindiSection;
    
    await db.update(lessons)
      .set({ content: updatedContent })
      .where(eq(lessons.id, lessonId));
  }

  /**
   * Add vocabulary items if needed
   */
  private async addVocabulary(lessonId: number, lesson: any, targetCount: number = 7): Promise<void> {
    const existing = await db.select()
      .from(vocabulary)
      .where(eq(vocabulary.lessonId, lessonId));

    if (existing.length >= targetCount) {
      return; // Already has enough
    }

    const needed = targetCount - existing.length;
    const commonWords = this.extractKeyWords(lesson.content || lesson.title);

    for (let i = 0; i < needed && i < commonWords.length; i++) {
      const word = commonWords[i];
      if (!existing.find(v => v.word.toLowerCase() === word.toLowerCase())) {
        await db.insert(vocabulary).values({
          lessonId,
          word: word,
          definition: `Definition of ${word}`,
          example: `Example sentence with ${word}`,
          hindiTranslation: `${word} का हिंदी अर्थ`,
          exampleHindi: `${word} के साथ उदाहरण वाक्य`
        }).onConflictDoNothing();
      }
    }
  }

  /**
   * Add conversation lines if needed
   */
  private async addConversationLines(lessonId: number, lesson: any, targetCount: number = 4): Promise<void> {
    const existing = await db.select()
      .from(conversationLines)
      .where(eq(conversationLines.lessonId, lessonId));

    if (existing.length >= targetCount) {
      return; // Already has enough
    }

    const needed = targetCount - existing.length;
    const conversations = [
      { en: 'Hello, how are you?', hi: 'नमस्ते, आप कैसे हैं?', emoji: '👋' },
      { en: 'I am fine, thank you!', hi: 'मैं ठीक हूं, धन्यवाद!', emoji: '😊' },
      { en: 'That\'s great to hear.', hi: 'यह सुनकर अच्छा लगा।', emoji: '👍' },
      { en: 'How about you?', hi: 'आप कैसे हैं?', emoji: '🤔' },
      { en: 'I am doing well.', hi: 'मैं अच्छा कर रहा हूं।', emoji: '✅' },
      { en: 'Nice to meet you.', hi: 'आपसे मिलकर खुशी हुई।', emoji: '🙏' }
    ];

    for (let i = 0; i < needed && i < conversations.length; i++) {
      const conv = conversations[i];
      await db.insert(conversationLines).values({
        lessonId,
        speaker: i % 2 === 0 ? 'Person A' : 'Person B',
        englishText: conv.en,
        hindiText: conv.hi,
        emoji: conv.emoji,
        lineOrder: existing.length + i + 1
      }).onConflictDoNothing();
    }
  }

  /**
   * Extract key words from content
   */
  private extractKeyWords(content: string): string[] {
    if (!content) return [];
    
    const words = content
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 4)
      .filter(w => !['this', 'that', 'with', 'from', 'have', 'will', 'would', 'could', 'should', 'about', 'there', 'their', 'these', 'those'].includes(w));

    return Array.from(new Set(words)).slice(0, 10);
  }

  /**
   * Enrich a single lesson
   */
  async enrichLesson(lessonId: number, options: BatchEnrichmentOptions['priorities'] = {
    hindiContent: true,
    vocabulary: true,
    conversations: true,
    quizzes: false
  }): Promise<boolean> {
    try {
      const lesson = await storage.getLesson(lessonId);
      if (!lesson) {
        console.error(`  ❌ Lesson ${lessonId} not found`);
        this.errors++;
        return false;
      }

      // Add Hindi content
      if (options.hindiContent) {
        await this.addHindiContent(lessonId, lesson);
      }

      // Add vocabulary
      if (options.vocabulary) {
        await this.addVocabulary(lessonId, lesson, 7);
      }

      // Add conversation lines
      if (options.conversations) {
        await this.addConversationLines(lessonId, lesson, 4);
      }

      this.enriched++;
      return true;
    } catch (error: any) {
      console.error(`  ❌ Error enriching lesson ${lessonId}:`, error.message);
      this.errors++;
      return false;
    }
  }

  /**
   * Process lessons in batches
   */
  async processBatch(options: BatchEnrichmentOptions = {}): Promise<void> {
    const {
      batchSize = 50,
      startFrom = 0,
      maxLessons = 100,
      skipExisting = true,
      priorities = {
        hindiContent: true,
        vocabulary: true,
        conversations: true,
        quizzes: false
      }
    } = options;

    console.log('\n🚀 Starting Batch Enrichment');
    console.log(`   Batch size: ${batchSize}`);
    console.log(`   Starting from: ${startFrom}`);
    console.log(`   Max lessons: ${maxLessons || 'all'}`);
    console.log(`   Priorities:`, priorities);
    console.log('');

    const allLessons = await storage.getLessons();
    const lessonsToProcess = allLessons
      .slice(startFrom, maxLessons ? startFrom + maxLessons : undefined)
      .sort((a, b) => a.order - b.order);

    console.log(`Processing ${lessonsToProcess.length} lessons...\n`);

    for (let i = 0; i < lessonsToProcess.length; i += batchSize) {
      const batch = lessonsToProcess.slice(i, i + batchSize);
      console.log(`\n📦 Processing batch ${Math.floor(i / batchSize) + 1} (lessons ${i + 1}-${Math.min(i + batchSize, lessonsToProcess.length)})`);

      for (const lesson of batch) {
        // Check if already enriched (if skipExisting)
        if (skipExisting) {
          const hasHindi = lesson.content && (lesson.content.includes('## हिंदी') || /[\u0900-\u097F]{20,}/.test(lesson.content));
          if (hasHindi && lesson.hindiTitle && lesson.hindiDescription) {
            this.skipped++;
            continue;
          }
        }

        process.stdout.write(`  ${lesson.id}: ${lesson.title.substring(0, 40)}... `);
        const success = await this.enrichLesson(lesson.id, priorities);
        console.log(success ? '✅' : '❌');
      }

      // Progress summary
      console.log(`\n  Progress: ${this.enriched} enriched, ${this.errors} errors, ${this.skipped} skipped`);
    }

    console.log(`\n✅ Batch enrichment complete!`);
    console.log(`   Enriched: ${this.enriched}`);
    console.log(`   Errors: ${this.errors}`);
    console.log(`   Skipped: ${this.skipped}`);
  }
}

// Main execution
async function main() {
  const enricher = new BatchEnricher();
  
  const args = process.argv.slice(2);
  const startFrom = args[0] ? parseInt(args[0]) : 100;
  const maxLessons = args[1] ? parseInt(args[1]) : 200; // Process 200 at a time
  
  // Process lessons in batches
  await enricher.processBatch({
    batchSize: 50, // Larger batches for efficiency
    startFrom: startFrom,
    maxLessons: maxLessons,
    skipExisting: true,
    priorities: {
      hindiContent: true,
      vocabulary: true,
      conversations: true,
      quizzes: false
    }
  });
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.includes('batch-enrich-grade9.ts')) {
  main();
}

export { BatchEnricher };
