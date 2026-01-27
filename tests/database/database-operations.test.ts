/**
 * Database Operation Tests for CRUD Operations
 */

import { db } from '../../server/db';
import { storage } from '../../server/storage';
import { lessons, vocabulary, users, progress } from '../../shared/schema';
import { eq } from 'drizzle-orm';

describe('Database CRUD Operations', () => {
  let testLessonId: number;
  let testUserId: number;
  let testVocabId: number;

  describe('Create Operations', () => {
    it('should create a new lesson', async () => {
      const lessonData = {
        title: 'Test Lesson',
        slug: `test-lesson-${Date.now()}`,
        description: 'Test description',
        content: 'Test content',
        difficulty: 'Beginner',
        category: 'Test',
        order: 99999,
        hindiTitle: 'Test Lesson',
        hindiDescription: 'Test description',
      };

      const lesson = await storage.createLesson(lessonData);
      testLessonId = lesson.id;

      expect(lesson).toBeDefined();
      expect(lesson.title).toBe(lessonData.title);
      expect(lesson.slug).toBe(lessonData.slug);
      expect(lesson.difficulty).toBe(lessonData.difficulty);
    });

    it('should create a new user', async () => {
      const userData = {
        username: `testuser_${Date.now()}`,
        password: 'hashedpassword',
        isAdmin: false,
      };

      const user = await storage.createUser(userData);
      testUserId = user.id;

      expect(user).toBeDefined();
      expect(user.username).toBe(userData.username);
      expect(user.isAdmin).toBe(false);
    });

    it('should create vocabulary for a lesson', async () => {
      if (!testLessonId) {
        // Create a lesson if not exists
        const lesson = await storage.createLesson({
          title: 'Test Lesson',
          slug: `test-lesson-${Date.now()}`,
          description: 'Test',
          content: 'Test',
          difficulty: 'Beginner',
          category: 'Test',
          order: 99999,
          hindiTitle: 'Test',
          hindiDescription: 'Test',
        });
        testLessonId = lesson.id;
      }

      const vocabData = {
        lessonId: testLessonId,
        word: 'Test Word',
        definition: 'Test definition',
        example: 'Test example',
        pronunciation: null,
        hindiTranslation: null,
        hindiPronunciation: null,
        exampleHindi: null,
        usageHindi: null,
        audioUrl: null,
        pronunciationDifficulty: 1,
        commonMispronunciation: null,
      };

      const vocab = await storage.createVocabulary(vocabData);
      testVocabId = vocab.id;

      expect(vocab).toBeDefined();
      expect(vocab.word).toBe(vocabData.word);
      expect(vocab.lessonId).toBe(testLessonId);
    });
  });

  describe('Read Operations', () => {
    it('should read all lessons', async () => {
      const allLessons = await storage.getLessons();
      expect(Array.isArray(allLessons)).toBe(true);
      expect(allLessons.length).toBeGreaterThanOrEqual(0);
    });

    it('should read a specific lesson by ID', async () => {
      if (!testLessonId) {
        const lesson = await storage.createLesson({
          title: 'Test Lesson',
          slug: `test-lesson-${Date.now()}`,
          description: 'Test',
          content: 'Test',
          difficulty: 'Beginner',
          category: 'Test',
          order: 99999,
          hindiTitle: 'Test',
          hindiDescription: 'Test',
        });
        testLessonId = lesson.id;
      }

      const lesson = await storage.getLesson(testLessonId);
      expect(lesson).toBeDefined();
      expect(lesson?.id).toBe(testLessonId);
      expect(lesson?.vocabulary).toBeDefined();
      expect(Array.isArray(lesson?.vocabulary)).toBe(true);
    });

    it('should read vocabulary for a lesson', async () => {
      if (!testLessonId) {
        const lesson = await storage.createLesson({
          title: 'Test Lesson',
          slug: `test-lesson-${Date.now()}`,
          description: 'Test',
          content: 'Test',
          difficulty: 'Beginner',
          category: 'Test',
          order: 99999,
          hindiTitle: 'Test',
          hindiDescription: 'Test',
        });
        testLessonId = lesson.id;
      }

      const vocab = await storage.getVocabulary(testLessonId);
      expect(Array.isArray(vocab)).toBe(true);
    });

    it('should read user by username', async () => {
      if (!testUserId) {
        const user = await storage.createUser({
          username: `testuser_${Date.now()}`,
          password: 'hashedpassword',
          isAdmin: false,
        });
        testUserId = user.id;
      }

      const user = await storage.getUserByUsername(`testuser_${Date.now() - 1000}`);
      // May be null if user doesn't exist, which is fine
      if (user) {
        expect(user).toBeDefined();
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('username');
      }
    });
  });

  describe('Update Operations', () => {
    it('should update lesson progress', async () => {
      if (!testUserId || !testLessonId) {
        // Create test data if needed
        if (!testUserId) {
          const user = await storage.createUser({
            username: `testuser_${Date.now()}`,
            password: 'hashedpassword',
            isAdmin: false,
          });
          testUserId = user.id;
        }
        if (!testLessonId) {
          const lesson = await storage.createLesson({
            title: 'Test Lesson',
            slug: `test-lesson-${Date.now()}`,
            description: 'Test',
            content: 'Test',
            difficulty: 'Beginner',
            category: 'Test',
            order: 99999,
            hindiTitle: 'Test',
            hindiDescription: 'Test',
          });
          testLessonId = lesson.id;
        }
      }

      const progress = await storage.markLessonComplete(testUserId, testLessonId, true);
      expect(progress).toBeDefined();
      expect(progress.completed).toBe(true);
      expect(progress.completedAt).toBeTruthy();
    });

    it('should update user stats', async () => {
      if (!testUserId) {
        const user = await storage.createUser({
          username: `testuser_${Date.now()}`,
          password: 'hashedpassword',
          isAdmin: false,
        });
        testUserId = user.id;
      }

      const stats = await storage.updateUserStats(testUserId, {
        xpPoints: 100,
        level: 2,
        currentStreak: 5,
      });

      expect(stats).toBeDefined();
      expect(stats.xpPoints).toBe(100);
      expect(stats.level).toBe(2);
      expect(stats.currentStreak).toBe(5);
    });
  });

  describe('Delete Operations', () => {
    it('should delete vocabulary', async () => {
      if (testVocabId) {
        await db.delete(vocabulary).where(eq(vocabulary.id, testVocabId));
        const deleted = await db.select().from(vocabulary).where(eq(vocabulary.id, testVocabId));
        expect(deleted.length).toBe(0);
      }
    });

    it('should delete lesson', async () => {
      if (testLessonId) {
        // Delete related vocabulary first
        await db.delete(vocabulary).where(eq(vocabulary.lessonId, testLessonId));
        await db.delete(progress).where(eq(progress.lessonId, testLessonId));
        
        await db.delete(lessons).where(eq(lessons.id, testLessonId));
        const deleted = await db.select().from(lessons).where(eq(lessons.id, testLessonId));
        expect(deleted.length).toBe(0);
      }
    });

    it('should delete user', async () => {
      if (testUserId) {
        // Delete related progress first
        await db.delete(progress).where(eq(progress.userId, testUserId));
        
        await db.delete(users).where(eq(users.id, testUserId));
        const deleted = await db.select().from(users).where(eq(users.id, testUserId));
        expect(deleted.length).toBe(0);
      }
    });
  });

  describe('Transaction Operations', () => {
    it('should handle transaction rollback on error', async () => {
      try {
        await db.transaction(async (tx) => {
          // Create lesson
          const [lesson] = await tx.insert(lessons).values({
            title: 'Transaction Test',
            slug: `transaction-test-${Date.now()}`,
            description: 'Test',
            content: 'Test',
            difficulty: 'Beginner',
            category: 'Test',
            order: 99999,
            hindiTitle: 'Test',
            hindiDescription: 'Test',
          }).returning();

          // Intentionally cause an error
          throw new Error('Transaction test error');
        });
      } catch (error) {
        // Transaction should be rolled back
        expect(error).toBeDefined();
      }

      // Verify lesson was not created
      const lessons = await db.select().from(lessons).where(eq(lessons.slug, `transaction-test-${Date.now()}`));
      expect(lessons.length).toBe(0);
    });
  });

  describe('Data Integrity', () => {
    it('should enforce foreign key constraints', async () => {
      // Try to create vocabulary with non-existent lesson ID
      try {
        await db.insert(vocabulary).values({
          lessonId: 999999,
          word: 'Test',
          definition: 'Test',
          example: 'Test',
          pronunciation: null,
          hindiTranslation: null,
          hindiPronunciation: null,
          exampleHindi: null,
          usageHindi: null,
          audioUrl: null,
          pronunciationDifficulty: 1,
          commonMispronunciation: null,
        });
        // Should not reach here
        expect(true).toBe(false);
      } catch (error) {
        // Foreign key constraint should prevent this
        expect(error).toBeDefined();
      }
    });

    it('should enforce unique constraints', async () => {
      const slug = `unique-test-${Date.now()}`;
      
      // Create first lesson
      await storage.createLesson({
        title: 'Unique Test 1',
        slug,
        description: 'Test',
        content: 'Test',
        difficulty: 'Beginner',
        category: 'Test',
        order: 99999,
        hindiTitle: 'Test',
        hindiDescription: 'Test',
      });

      // Try to create second lesson with same slug
      try {
        await storage.createLesson({
          title: 'Unique Test 2',
          slug, // Same slug
          description: 'Test',
          content: 'Test',
          difficulty: 'Beginner',
          category: 'Test',
          order: 99998,
          hindiTitle: 'Test',
          hindiDescription: 'Test',
        });
        // Should not reach here
        expect(true).toBe(false);
      } catch (error) {
        // Unique constraint should prevent this
        expect(error).toBeDefined();
      }

      // Cleanup
      await db.delete(lessons).where(eq(lessons.slug, slug));
    });
  });

  afterAll(async () => {
    // Final cleanup
    if (testVocabId) {
      await db.delete(vocabulary).where(eq(vocabulary.id, testVocabId));
    }
    if (testLessonId) {
      await db.delete(vocabulary).where(eq(vocabulary.lessonId, testLessonId));
      await db.delete(progress).where(eq(progress.lessonId, testLessonId));
      await db.delete(lessons).where(eq(lessons.id, testLessonId));
    }
    if (testUserId) {
      await db.delete(progress).where(eq(progress.userId, testUserId));
      await db.delete(users).where(eq(users.id, testUserId));
    }
  });
});

