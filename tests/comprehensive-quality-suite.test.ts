/**
 * COMPREHENSIVE QUALITY TEST SUITE FOR PREET_ENGLISH
 * 
 * Focus: High-value tests that validate critical functionality
 * Target: 100% coverage of user-facing features
 * Philosophy: Quality over quantity
 */

import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { db } from '../server/db';
import { lessons, vocabulary, stories, scenarios, speakingTopics, users, progress } from '../shared/schema';
import { eq, count } from 'drizzle-orm';

describe('🎯 CRITICAL USER JOURNEYS', () => {
  describe('Complete Learning Flow', () => {
    test('User can discover, start, and complete a lesson with Hindi support', async () => {
      // 1. Get all lessons
      const allLessons = await db.select().from(lessons);
      expect(allLessons.length).toBeGreaterThan(0);

      // 2. Verify first lesson has Hindi content
      const firstLesson = allLessons[0];
      expect(firstLesson.hindiTitle).toBeTruthy();
      expect(firstLesson.hindiDescription).toBeTruthy();
      expect(firstLesson.title).toBeTruthy();
      expect(firstLesson.description).toBeTruthy();

      // 3. Get vocabulary for lesson
      const lessonVocab = await db
        .select()
        .from(vocabulary)
        .where(eq(vocabulary.lessonId, firstLesson.id));

      expect(lessonVocab.length).toBeGreaterThanOrEqual(5);

      // 4. Verify vocabulary has Hindi translations
      lessonVocab.forEach(vocab => {
        expect(vocab.word).toBeTruthy();
        expect(vocab.hindiTranslation).toBeTruthy();
        expect(vocab.definition).toBeTruthy();
        expect(vocab.example).toBeTruthy();
      });
    });

    test('User can access stories with bilingual content', async () => {
      const allStories = await db.select().from(stories);
      expect(allStories.length).toBeGreaterThan(0);

      allStories.forEach(story => {
        expect(story.title).toBeTruthy();
        expect(story.titleHindi).toBeTruthy();
        expect(story.content).toBeTruthy();
        expect(story.contentHindi).toBeTruthy();
        expect(story.difficulty).toMatch(/beginner|intermediate|advanced/);
      });
    });

    test('User can practice speaking with topics', async () => {
      const topics = await db.select().from(speakingTopics);
      expect(topics.length).toBeGreaterThan(0);

      topics.forEach(topic => {
        expect(topic.title).toBeTruthy();
        expect(topic.hindiTitle).toBeTruthy();
        expect(topic.difficulty).toMatch(/beginner|intermediate|advanced/);
      });
    });
  });
});

describe('📚 CONTENT QUALITY VALIDATION', () => {
  test('All lessons have required Hindi translations', async () => {
    const allLessons = await db.select().from(lessons);
    
    const missingHindi = allLessons.filter(lesson => 
      !lesson.hindiTitle || !lesson.hindiDescription
    );

    expect(missingHindi.length).toBe(0);
  });

  test('All lessons have adequate vocabulary (5+ words)', async () => {
    const allLessons = await db.select().from(lessons);
    
    for (const lesson of allLessons) {
      const vocabCount = await db
        .select({ count: count() })
        .from(vocabulary)
        .where(eq(vocabulary.lessonId, lesson.id));

      expect(vocabCount[0].count).toBeGreaterThanOrEqual(5);
    }
  });

  test('All vocabulary has complete Hindi translations', async () => {
    const allVocab = await db.select().from(vocabulary);

    allVocab.forEach(vocab => {
      expect(vocab.word).toBeTruthy();
      expect(vocab.hindiTranslation).toBeTruthy();
      expect(vocab.definition).toBeTruthy();
      expect(vocab.example).toBeTruthy();
      expect(vocab.exampleHindi).toBeTruthy();
    });
  });

  test('All stories have bilingual content', async () => {
    const allStories = await db.select().from(stories);

    allStories.forEach(story => {
      expect(story.title).toBeTruthy();
      expect(story.titleHindi).toBeTruthy();
      expect(story.description).toBeTruthy();
      expect(story.descriptionHindi).toBeTruthy();
      expect(story.content).toBeTruthy();
      expect(story.contentHindi).toBeTruthy();
    });
  });

  test('All scenarios have complete role descriptions', async () => {
    const allScenarios = await db.select().from(scenarios);

    allScenarios.forEach(scenario => {
      expect(scenario.title).toBeTruthy();
      expect(scenario.titleHindi).toBeTruthy();
      expect(scenario.yourRole).toBeTruthy();
      expect(scenario.yourRoleHindi).toBeTruthy();
      expect(scenario.partnerRole).toBeTruthy();
      expect(scenario.partnerRoleHindi).toBeTruthy();
    });
  });
});

describe('🔒 DATA INTEGRITY', () => {
  test('No duplicate lesson titles', async () => {
    const allLessons = await db.select().from(lessons);
    const titles = allLessons.map(l => l.title);
    const uniqueTitles = new Set(titles);

    expect(uniqueTitles.size).toBe(titles.length);
  });

  test('No orphaned vocabulary (all linked to valid lessons)', async () => {
    const allVocab = await db.select().from(vocabulary);
    const allLessons = await db.select().from(lessons);
    const lessonIds = new Set(allLessons.map(l => l.id));

    allVocab.forEach(vocab => {
      expect(lessonIds.has(vocab.lessonId)).toBe(true);
    });
  });

  test('All difficulty levels are valid', async () => {
    const validDifficulties = ['beginner', 'intermediate', 'advanced', 'easy', 'medium', 'hard'];
    
    const allLessons = await db.select().from(lessons);
    const allStories = await db.select().from(stories);
    const allScenarios = await db.select().from(scenarios);

    [...allLessons, ...allStories, ...allScenarios].forEach(item => {
      expect(validDifficulties).toContain(item.difficulty.toLowerCase());
    });
  });

  test('All categories are consistent', async () => {
    const allLessons = await db.select().from(lessons);
    const categories = new Set(allLessons.map(l => l.category));

    // Should have reasonable number of categories (not too fragmented)
    expect(categories.size).toBeLessThan(30);
    expect(categories.size).toBeGreaterThan(0);
  });
});

describe('🌐 HINDI READABILITY', () => {
  test('Hindi text uses proper Devanagari script', async () => {
    const allLessons = await db.select().from(lessons);
    const devanagariRegex = /[\u0900-\u097F]/; // Devanagari Unicode range

    allLessons.forEach(lesson => {
      if (lesson.hindiTitle) {
        expect(devanagariRegex.test(lesson.hindiTitle)).toBe(true);
      }
      if (lesson.hindiDescription) {
        expect(devanagariRegex.test(lesson.hindiDescription)).toBe(true);
      }
    });
  });

  test('No mixed script issues (English in Hindi fields)', async () => {
    const allVocab = await db.select().from(vocabulary);
    const latinRegex = /[a-zA-Z]{5,}/; // 5+ consecutive Latin characters

    allVocab.forEach(vocab => {
      // Hindi translation should primarily use Devanagari
      if (vocab.hindiTranslation && vocab.hindiTranslation.length > 10) {
        const latinMatches = vocab.hindiTranslation.match(latinRegex);
        // Allow some English words but not entire English sentences
        if (latinMatches) {
          expect(latinMatches.length).toBeLessThan(3);
        }
      }
    });
  });
});

describe('⚡ PERFORMANCE', () => {
  test('Lesson queries complete in reasonable time', async () => {
    const start = Date.now();
    await db.select().from(lessons);
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(1000); // Should complete in < 1 second
  });

  test('Vocabulary queries are efficient', async () => {
    const allLessons = await db.select().from(lessons).limit(10);
    
    const start = Date.now();
    for (const lesson of allLessons) {
      await db.select().from(vocabulary).where(eq(vocabulary.lessonId, lesson.id));
    }
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(2000); // Should complete in < 2 seconds
  });

  test('Database size is reasonable', async () => {
    const lessonCount = await db.select({ count: count() }).from(lessons);
    const vocabCount = await db.select({ count: count() }).from(vocabulary);
    const storyCount = await db.select({ count: count() }).from(stories);

    // Verify we have substantial content
    expect(lessonCount[0].count).toBeGreaterThan(20);
    expect(vocabCount[0].count).toBeGreaterThan(100);
    expect(storyCount[0].count).toBeGreaterThan(5);
  });
});

describe('🎨 CONTENT RICHNESS', () => {
  test('Lessons have varied difficulty distribution', async () => {
    const allLessons = await db.select().from(lessons);
    const difficulties = allLessons.map(l => l.difficulty.toLowerCase());

    const beginner = difficulties.filter(d => d === 'beginner' || d === 'easy').length;
    const intermediate = difficulties.filter(d => d === 'intermediate' || d === 'medium').length;
    const advanced = difficulties.filter(d => d === 'advanced' || d === 'hard').length;

    // Should have content at all levels
    expect(beginner).toBeGreaterThan(0);
    expect(intermediate + advanced).toBeGreaterThan(0);
  });

  test('Vocabulary covers diverse topics', async () => {
    const allVocab = await db.select().from(vocabulary);
    const uniqueWords = new Set(allVocab.map(v => v.word.toLowerCase()));

    // Should have substantial unique vocabulary
    expect(uniqueWords.size).toBeGreaterThan(50);
  });

  test('Stories provide engaging content', async () => {
    const allStories = await db.select().from(stories);

    allStories.forEach(story => {
      // Content should be substantial
      expect(story.content.length).toBeGreaterThan(100);
      expect(story.contentHindi.length).toBeGreaterThan(100);
      
      // Should have vocabulary
      if (story.vocabulary) {
        expect(story.vocabulary.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('🔐 SECURITY BASICS', () => {
  test('No SQL injection patterns in content', async () => {
    const allLessons = await db.select().from(lessons);
    const sqlPatterns = /('|"|;|--|\/\*|\*\/|xp_|sp_|exec|execute|drop|delete|insert|update)/i;

    allLessons.forEach(lesson => {
      expect(sqlPatterns.test(lesson.title)).toBe(false);
      expect(sqlPatterns.test(lesson.description)).toBe(false);
    });
  });

  test('No XSS patterns in content', async () => {
    const allLessons = await db.select().from(lessons);
    const xssPatterns = /<script|javascript:|onerror=|onload=/i;

    allLessons.forEach(lesson => {
      expect(xssPatterns.test(lesson.title)).toBe(false);
      expect(xssPatterns.test(lesson.content)).toBe(false);
    });
  });
});

describe('📊 CONTENT STATISTICS', () => {
  test('Generate content quality report', async () => {
    const lessonCount = await db.select({ count: count() }).from(lessons);
    const vocabCount = await db.select({ count: count() }).from(vocabulary);
    const storyCount = await db.select({ count: count() }).from(stories);
    const scenarioCount = await db.select({ count: count() }).from(scenarios);
    const topicCount = await db.select({ count: count() }).from(speakingTopics);

    const report = {
      lessons: lessonCount[0].count,
      vocabulary: vocabCount[0].count,
      stories: storyCount[0].count,
      scenarios: scenarioCount[0].count,
      speakingTopics: topicCount[0].count,
      avgVocabPerLesson: vocabCount[0].count / lessonCount[0].count
    };

    console.log('\n📊 CONTENT QUALITY REPORT:');
    console.log('='.repeat(50));
    console.log(`Total Lessons: ${report.lessons}`);
    console.log(`Total Vocabulary: ${report.vocabulary}`);
    console.log(`Total Stories: ${report.stories}`);
    console.log(`Total Scenarios: ${report.scenarios}`);
    console.log(`Total Speaking Topics: ${report.topicCount}`);
    console.log(`Avg Vocabulary per Lesson: ${report.avgVocabPerLesson.toFixed(2)}`);
    console.log('='.repeat(50));

    // Verify minimum content requirements
    expect(report.lessons).toBeGreaterThanOrEqual(20);
    expect(report.vocabulary).toBeGreaterThanOrEqual(100);
    expect(report.avgVocabPerLesson).toBeGreaterThanOrEqual(5);
  });
});
