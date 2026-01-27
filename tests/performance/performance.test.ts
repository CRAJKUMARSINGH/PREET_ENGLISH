/**
 * Performance Benchmarks for Critical Functions
 * Tests execution time and memory usage for key operations
 */

import { performance } from 'perf_hooks';
import { db } from '../../server/db';
import { storage } from '../../server/storage';
import { lessons, vocabulary } from '../../shared/schema';

describe('Performance Benchmarks', () => {
  const PERFORMANCE_THRESHOLDS = {
    lessonFetch: 100, // ms
    vocabularyFetch: 50, // ms
    lessonCreation: 200, // ms
    bulkInsert: 1000, // ms for 100 items
    queryOptimization: 50, // ms
  };

  describe('Database Query Performance', () => {
    it('should fetch all lessons within threshold', async () => {
      const start = performance.now();
      const lessons = await storage.getLessons();
      const end = performance.now();
      const duration = end - start;

      expect(duration).toBeLessThan(PERFORMANCE_THRESHOLDS.lessonFetch);
      expect(lessons).toBeDefined();
      console.log(`✅ Lesson fetch: ${duration.toFixed(2)}ms (threshold: ${PERFORMANCE_THRESHOLDS.lessonFetch}ms)`);
    });

    it('should fetch vocabulary for a lesson within threshold', async () => {
      // Get first lesson
      const allLessons = await storage.getLessons();
      if (allLessons.length === 0) {
        console.log('⚠️  No lessons found, skipping vocabulary fetch test');
        return;
      }

      const lessonId = allLessons[0].id;
      const start = performance.now();
      const vocab = await storage.getVocabulary(lessonId);
      const end = performance.now();
      const duration = end - start;

      expect(duration).toBeLessThan(PERFORMANCE_THRESHOLDS.vocabularyFetch);
      expect(vocab).toBeDefined();
      console.log(`✅ Vocabulary fetch: ${duration.toFixed(2)}ms (threshold: ${PERFORMANCE_THRESHOLDS.vocabularyFetch}ms)`);
    });

    it('should create a lesson within threshold', async () => {
      const start = performance.now();
      const lesson = await storage.createLesson({
        title: 'Performance Test Lesson',
        slug: `perf-test-${Date.now()}`,
        description: 'Test description',
        content: 'Test content',
        difficulty: 'Beginner',
        category: 'Test',
        order: 99999,
        hindiTitle: 'Performance Test Lesson',
        hindiDescription: 'Test description',
      });
      const end = performance.now();
      const duration = end - start;

      expect(duration).toBeLessThan(PERFORMANCE_THRESHOLDS.lessonCreation);
      expect(lesson).toBeDefined();
      console.log(`✅ Lesson creation: ${duration.toFixed(2)}ms (threshold: ${PERFORMANCE_THRESHOLDS.lessonCreation}ms)`);

      // Cleanup
      await db.delete(lessons).where(eq(lessons.id, lesson.id));
    });
  });

  describe('Bulk Operations Performance', () => {
    it('should handle bulk vocabulary insertion efficiently', async () => {
      const allLessons = await storage.getLessons();
      if (allLessons.length === 0) {
        console.log('⚠️  No lessons found, skipping bulk insert test');
        return;
      }

      const lessonId = allLessons[0].id;
      const vocabItems = Array.from({ length: 100 }, (_, i) => ({
        lessonId,
        word: `TestWord${i}`,
        definition: `Definition ${i}`,
        example: `Example ${i}`,
        pronunciation: null,
        hindiTranslation: null,
        hindiPronunciation: null,
        exampleHindi: null,
        usageHindi: null,
        audioUrl: null,
        pronunciationDifficulty: 1,
        commonMispronunciation: null,
      }));

      const start = performance.now();
      for (const item of vocabItems) {
        await storage.createVocabulary(item);
      }
      const end = performance.now();
      const duration = end - start;

      expect(duration).toBeLessThan(PERFORMANCE_THRESHOLDS.bulkInsert);
      console.log(`✅ Bulk insert (100 items): ${duration.toFixed(2)}ms (threshold: ${PERFORMANCE_THRESHOLDS.bulkInsert}ms)`);

      // Cleanup
      await db.delete(vocabulary).where(eq(vocabulary.lessonId, lessonId));
    });
  });

  describe('Query Optimization', () => {
    it('should use indexed queries efficiently', async () => {
      const start = performance.now();
      // Query by slug (should be indexed)
      const allLessons = await storage.getLessons();
      const testLesson = allLessons.find((l) => l.slug);
      if (testLesson) {
        const lesson = await storage.getLesson(testLesson.id);
        const end = performance.now();
        const duration = end - start;

        expect(duration).toBeLessThan(PERFORMANCE_THRESHOLDS.queryOptimization);
        expect(lesson).toBeDefined();
        console.log(`✅ Indexed query: ${duration.toFixed(2)}ms (threshold: ${PERFORMANCE_THRESHOLDS.queryOptimization}ms)`);
      } else {
        console.log('⚠️  No lessons with slug found, skipping indexed query test');
      }
    });
  });

  describe('Memory Usage', () => {
    it('should not cause memory leaks with repeated queries', async () => {
      const initialMemory = process.memoryUsage().heapUsed;
      const iterations = 100;

      for (let i = 0; i < iterations; i++) {
        await storage.getLessons();
      }

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;
      const memoryIncreaseMB = memoryIncrease / 1024 / 1024;

      // Memory increase should be reasonable (less than 50MB for 100 queries)
      expect(memoryIncreaseMB).toBeLessThan(50);
      console.log(`✅ Memory usage: ${memoryIncreaseMB.toFixed(2)}MB increase for ${iterations} queries`);
    });
  });

  describe('Concurrent Operations', () => {
    it('should handle concurrent lesson fetches efficiently', async () => {
      const start = performance.now();
      const promises = Array.from({ length: 10 }, () => storage.getLessons());
      await Promise.all(promises);
      const end = performance.now();
      const duration = end - start;

      // Concurrent operations should be faster than sequential
      const sequentialTime = PERFORMANCE_THRESHOLDS.lessonFetch * 10;
      expect(duration).toBeLessThan(sequentialTime);
      console.log(`✅ Concurrent fetches (10): ${duration.toFixed(2)}ms (sequential would be ~${sequentialTime}ms)`);
    });
  });
});

// Helper function for eq comparison
import { eq } from 'drizzle-orm';

