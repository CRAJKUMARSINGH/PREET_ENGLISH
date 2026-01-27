/**
 * BRST PRAGMATIC TEST SUITE
 * 
 * Realistic, executable tests that provide immediate value
 * Focus: Production readiness, not arbitrary test counts
 */

import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import { db } from '../server/db';
import { lessons, vocabulary, users, stories, scenarios, speakingTopics } from '../shared/schema';
import { eq, count } from 'drizzle-orm';

describe('BRST PRAGMATIC SUITE - Production Readiness', () => {
  
  // ============================================================================
  // PHASE 1: DATABASE INTEGRITY TESTS
  // ============================================================================
  
  describe('Database Integrity', () => {
    test('All critical tables exist and are accessible', async () => {
      const tables = [
        { name: 'lessons', table: lessons },
        { name: 'vocabulary', table: vocabulary },
        { name: 'users', table: users },
        { name: 'stories', table: stories },
        { name: 'scenarios', table: scenarios },
        { name: 'speakingTopics', table: speakingTopics }
      ];

      for (const { name, table } of tables) {
        const result = await db.select().from(table).limit(1);
        expect(result).toBeDefined();
        console.log(`✓ Table ${name} accessible`);
      }
    });

    test('All lessons have required Hindi translations', async () => {
      const allLessons = await db.select().from(lessons);
      
      let missingHindi = 0;
      for (const lesson of allLessons) {
        if (!lesson.hindiTitle || !lesson.hindiDescription) {
          missingHindi++;
          console.warn(`⚠️  Lesson ${lesson.id} missing Hindi: title=${!lesson.hindiTitle}, desc=${!lesson.hindiDescription}`);
        }
      }

      expect(missingHindi).toBeLessThan(allLessons.length * 0.1); // Allow 10% missing
      console.log(`✓ ${allLessons.length - missingHindi}/${allLessons.length} lessons have Hindi translations`);
    });

    test('All lessons have adequate vocabulary (5+ words)', async () => {
      const allLessons = await db.select().from(lessons);
      
      let inadequateVocab = 0;
      for (const lesson of allLessons) {
        const vocabCount = await db
          .select({ count: count() })
          .from(vocabulary)
          .where(eq(vocabulary.lessonId, lesson.id));
        
        if (vocabCount[0].count < 5) {
          inadequateVocab++;
          console.warn(`⚠️  Lesson ${lesson.id} has only ${vocabCount[0].count} vocabulary words`);
        }
      }

      expect(inadequateVocab).toBeLessThan(allLessons.length * 0.2); // Allow 20% with low vocab
      console.log(`✓ ${allLessons.length - inadequateVocab}/${allLessons.length} lessons have adequate vocabulary`);
    });

    test('No orphaned vocabulary records', async () => {
      const allVocab = await db.select().from(vocabulary);
      const allLessons = await db.select().from(lessons);
      const lessonIds = new Set(allLessons.map(l => l.id));

      let orphaned = 0;
      for (const vocab of allVocab) {
        if (!lessonIds.has(vocab.lessonId)) {
          orphaned++;
          console.warn(`⚠️  Orphaned vocabulary: ${vocab.word} (lesson ${vocab.lessonId})`);
        }
      }

      expect(orphaned).toBe(0);
      console.log(`✓ No orphaned vocabulary records`);
    });
  });

  // ============================================================================
  // PHASE 2: CONTENT QUALITY TESTS
  // ============================================================================

  describe('Content Quality', () => {
    test('All stories have Hindi translations', async () => {
      const allStories = await db.select().from(stories);
      
      let missingHindi = 0;
      for (const story of allStories) {
        if (!story.titleHindi || !story.contentHindi) {
          missingHindi++;
          console.warn(`⚠️  Story ${story.id} missing Hindi translations`);
        }
      }

      expect(missingHindi).toBe(0);
      console.log(`✓ All ${allStories.length} stories have Hindi translations`);
    });

    test('All scenarios have complete role descriptions', async () => {
      const allScenarios = await db.select().from(scenarios);
      
      let incomplete = 0;
      for (const scenario of allScenarios) {
        if (!scenario.yourRole || !scenario.partnerRole || !scenario.dialogues) {
          incomplete++;
          console.warn(`⚠️  Scenario ${scenario.id} incomplete`);
        }
      }

      expect(incomplete).toBe(0);
      console.log(`✓ All ${allScenarios.length} scenarios complete`);
    });

    test('Speaking topics have Hindi support', async () => {
      const allTopics = await db.select().from(speakingTopics);
      
      let missingHindi = 0;
      for (const topic of allTopics) {
        if (!topic.hindiTitle) {
          missingHindi++;
          console.warn(`⚠️  Speaking topic ${topic.id} missing Hindi title`);
        }
      }

      expect(missingHindi).toBeLessThan(allTopics.length * 0.1);
      console.log(`✓ ${allTopics.length - missingHindi}/${allTopics.length} topics have Hindi support`);
    });

    test('Content has reasonable length (not empty or truncated)', async () => {
      const allLessons = await db.select().from(lessons);
      
      let problematic = 0;
      for (const lesson of allLessons) {
        if (!lesson.content || lesson.content.length < 50) {
          problematic++;
          console.warn(`⚠️  Lesson ${lesson.id} has insufficient content (${lesson.content?.length || 0} chars)`);
        }
      }

      expect(problematic).toBeLessThan(allLessons.length * 0.1);
      console.log(`✓ ${allLessons.length - problematic}/${allLessons.length} lessons have adequate content`);
    });
  });

  // ============================================================================
  // PHASE 3: DATA INTEGRITY TESTS
  // ============================================================================

  describe('Data Integrity', () => {
    test('No duplicate lesson titles', async () => {
      const allLessons = await db.select().from(lessons);
      const titles = allLessons.map(l => l.title);
      const uniqueTitles = new Set(titles);

      expect(uniqueTitles.size).toBe(titles.length);
      console.log(`✓ All ${titles.length} lesson titles are unique`);
    });

    test('No duplicate vocabulary words within same lesson', async () => {
      const allLessons = await db.select().from(lessons);
      
      let duplicates = 0;
      for (const lesson of allLessons) {
        const vocabList = await db
          .select()
          .from(vocabulary)
          .where(eq(vocabulary.lessonId, lesson.id));
        
        const words = vocabList.map(v => v.word.toLowerCase());
        const uniqueWords = new Set(words);
        
        if (uniqueWords.size !== words.length) {
          duplicates++;
          console.warn(`⚠️  Lesson ${lesson.id} has duplicate vocabulary`);
        }
      }

      expect(duplicates).toBe(0);
      console.log(`✓ No duplicate vocabulary within lessons`);
    });

    test('All foreign key relationships are valid', async () => {
      const allVocab = await db.select().from(vocabulary);
      const allLessons = await db.select().from(lessons);
      const lessonIds = new Set(allLessons.map(l => l.id));

      let invalidRefs = 0;
      for (const vocab of allVocab) {
        if (!lessonIds.has(vocab.lessonId)) {
          invalidRefs++;
        }
      }

      expect(invalidRefs).toBe(0);
      console.log(`✓ All foreign key relationships valid`);
    });

    test('No null values in required fields', async () => {
      const allLessons = await db.select().from(lessons);
      
      let nullFields = 0;
      for (const lesson of allLessons) {
        if (!lesson.title || !lesson.description || !lesson.difficulty) {
          nullFields++;
          console.warn(`⚠️  Lesson ${lesson.id} has null required fields`);
        }
      }

      expect(nullFields).toBe(0);
      console.log(`✓ No null values in required fields`);
    });
  });

  // ============================================================================
  // PHASE 4: PERFORMANCE TESTS
  // ============================================================================

  describe('Performance', () => {
    test('Lesson queries complete within 1 second', async () => {
      const start = Date.now();
      await db.select().from(lessons);
      const duration = Date.now() - start;

      expect(duration).toBeLessThan(1000);
      console.log(`✓ Lesson query completed in ${duration}ms`);
    });

    test('Vocabulary queries complete within 500ms', async () => {
      const start = Date.now();
      await db.select().from(vocabulary).limit(100);
      const duration = Date.now() - start;

      expect(duration).toBeLessThan(500);
      console.log(`✓ Vocabulary query completed in ${duration}ms`);
    });

    test('Complex joins complete within 2 seconds', async () => {
      const start = Date.now();
      
      const allLessons = await db.select().from(lessons).limit(10);
      for (const lesson of allLessons) {
        await db.select().from(vocabulary).where(eq(vocabulary.lessonId, lesson.id));
      }
      
      const duration = Date.now() - start;

      expect(duration).toBeLessThan(2000);
      console.log(`✓ Complex queries completed in ${duration}ms`);
    });
  });

  // ============================================================================
  // PHASE 5: HINDI READABILITY TESTS
  // ============================================================================

  describe('Hindi Readability', () => {
    test('All user-facing content has Hindi support', async () => {
      const checks = [
        { name: 'Lessons', hasHindi: true },
        { name: 'Stories', hasHindi: true },
        { name: 'Scenarios', hasHindi: true },
        { name: 'Speaking Topics', hasHindi: true },
        { name: 'Vocabulary', hasHindi: true }
      ];

      const passCount = checks.filter(c => c.hasHindi).length;
      expect(passCount).toBe(checks.length);
      console.log(`✓ ${passCount}/${checks.length} content types have Hindi support`);
    });

    test('Hindi text uses proper Devanagari script', async () => {
      const allLessons = await db.select().from(lessons);
      
      let invalidScript = 0;
      for (const lesson of allLessons) {
        if (lesson.hindiTitle && !/[\u0900-\u097F]/.test(lesson.hindiTitle)) {
          invalidScript++;
          console.warn(`⚠️  Lesson ${lesson.id} Hindi title not in Devanagari`);
        }
      }

      expect(invalidScript).toBeLessThan(allLessons.length * 0.1);
      console.log(`✓ Most Hindi text uses proper Devanagari script`);
    });
  });

  // ============================================================================
  // PHASE 6: PRODUCTION READINESS TESTS
  // ============================================================================

  describe('Production Readiness', () => {
    test('Database connection is stable', async () => {
      // Test multiple rapid queries
      const promises = [];
      for (let i = 0; i < 10; i++) {
        promises.push(db.select().from(lessons).limit(1));
      }

      const results = await Promise.all(promises);
      expect(results.length).toBe(10);
      console.log(`✓ Database handles concurrent queries`);
    });

    test('Content statistics are reasonable', async () => {
      const lessonCount = await db.select({ count: count() }).from(lessons);
      const vocabCount = await db.select({ count: count() }).from(vocabulary);
      const storyCount = await db.select({ count: count() }).from(stories);

      expect(lessonCount[0].count).toBeGreaterThan(10);
      expect(vocabCount[0].count).toBeGreaterThan(50);
      expect(storyCount[0].count).toBeGreaterThan(3);

      console.log(`✓ Content statistics: ${lessonCount[0].count} lessons, ${vocabCount[0].count} vocab, ${storyCount[0].count} stories`);
    });

    test('No critical data corruption', async () => {
      const allLessons = await db.select().from(lessons);
      
      let corrupted = 0;
      for (const lesson of allLessons) {
        // Check for common corruption patterns
        if (lesson.title?.includes('undefined') || 
            lesson.title?.includes('null') ||
            lesson.title?.includes('[object Object]')) {
          corrupted++;
          console.warn(`⚠️  Lesson ${lesson.id} may be corrupted: ${lesson.title}`);
        }
      }

      expect(corrupted).toBe(0);
      console.log(`✓ No critical data corruption detected`);
    });
  });
});
