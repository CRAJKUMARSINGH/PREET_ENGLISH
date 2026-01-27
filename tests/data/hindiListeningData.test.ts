/**
 * Hindi Listening Data Validation Tests
 * Tests all 30+ listening lessons have required fields and valid values
 * 
 * Requirements: 1.2
 */

import { listeningLessons, ListeningLesson } from '@/data/hindiListeningData';
import {
  validateRequiredFields,
  validateDifficulty,
  validateCategories,
  validateUniqueIds,
  validateArrayFields,
  extractCategories,
  extractDifficultyLevels
} from '../utils/dataValidator';
import { validDifficultyLevels } from '../config/testConfig';

describe('hindiListeningData Validation', () => {
  const requiredFields = [
    'id',
    'title',
    'titleHindi',
    'description',
    'descriptionHindi',
    'difficulty',
    'category',
    'audioText',
    'audioTextHindi',
    'duration',
    'questions',
    'vocabulary'
  ];

  describe('Data Count', () => {
    it('should have at least 30 listening lessons', () => {
      expect(listeningLessons.length).toBeGreaterThanOrEqual(30);
    });

    it('should have lessons array defined', () => {
      expect(listeningLessons).toBeDefined();
      expect(Array.isArray(listeningLessons)).toBe(true);
    });
  });

  describe('Required Fields', () => {
    it('all lessons should have all required fields', () => {
      const errors: string[] = [];

      listeningLessons.forEach((lesson, index) => {
        const lessonErrors = validateRequiredFields(
          lesson as unknown as Record<string, unknown>,
          requiredFields,
          'hindiListeningData',
          lesson.id || index
        );
        
        if (lessonErrors.length > 0) {
          errors.push(...lessonErrors.map(e => `Lesson ${e.recordId}: ${e.message}`));
        }
      });

      if (errors.length > 0) {
        console.error('Validation errors:', errors);
      }
      expect(errors).toHaveLength(0);
    });

    it('each lesson should have a numeric id', () => {
      listeningLessons.forEach((lesson) => {
        expect(typeof lesson.id).toBe('number');
        expect(lesson.id).toBeGreaterThan(0);
      });
    });

    it('each lesson should have non-empty title', () => {
      listeningLessons.forEach((lesson) => {
        expect(typeof lesson.title).toBe('string');
        expect(lesson.title.trim().length).toBeGreaterThan(0);
      });
    });

    it('each lesson should have non-empty audioText', () => {
      listeningLessons.forEach((lesson) => {
        expect(typeof lesson.audioText).toBe('string');
        expect(lesson.audioText.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe('Questions Array', () => {
    it('all lessons should have at least one question', () => {
      listeningLessons.forEach((lesson) => {
        expect(Array.isArray(lesson.questions)).toBe(true);
        expect(lesson.questions.length).toBeGreaterThanOrEqual(1);
      });
    });

    it('each question should have required fields', () => {
      const questionRequiredFields = ['question', 'questionHindi', 'options', 'correctAnswer', 'explanation', 'explanationHindi'];
      const errors: string[] = [];

      listeningLessons.forEach((lesson) => {
        lesson.questions.forEach((question, qIndex) => {
          const qErrors = validateRequiredFields(
            question as unknown as Record<string, unknown>,
            questionRequiredFields,
            'hindiListeningData',
            `${lesson.id}-Q${qIndex + 1}`
          );
          
          if (qErrors.length > 0) {
            errors.push(...qErrors.map(e => `Lesson ${lesson.id}, Question ${qIndex + 1}: ${e.message}`));
          }
        });
      });

      if (errors.length > 0) {
        console.error('Question validation errors:', errors);
      }
      expect(errors).toHaveLength(0);
    });

    it('each question should have at least 2 options', () => {
      listeningLessons.forEach((lesson) => {
        lesson.questions.forEach((question, qIndex) => {
          expect(Array.isArray(question.options)).toBe(true);
          expect(question.options.length).toBeGreaterThanOrEqual(2);
        });
      });
    });

    it('correctAnswer should be a valid index', () => {
      listeningLessons.forEach((lesson) => {
        lesson.questions.forEach((question) => {
          expect(typeof question.correctAnswer).toBe('number');
          expect(question.correctAnswer).toBeGreaterThanOrEqual(0);
          expect(question.correctAnswer).toBeLessThan(question.options.length);
        });
      });
    });
  });

  describe('Duration Format', () => {
    it('all lessons should have valid duration format (M:SS or MM:SS)', () => {
      const durationRegex = /^\d{1,2}:\d{2}$/;
      
      listeningLessons.forEach((lesson) => {
        expect(lesson.duration).toMatch(durationRegex);
      });
    });

    it('duration should represent reasonable lesson length (under 10 minutes)', () => {
      listeningLessons.forEach((lesson) => {
        const [minutes] = lesson.duration.split(':').map(Number);
        expect(minutes).toBeLessThan(10);
      });
    });
  });

  describe('Difficulty Values', () => {
    it('all difficulty values should be valid enum values', () => {
      const errors: string[] = [];

      listeningLessons.forEach((lesson) => {
        const difficultyErrors = validateDifficulty(
          lesson as unknown as Record<string, unknown>,
          'hindiListeningData',
          lesson.id
        );
        
        if (difficultyErrors.length > 0) {
          errors.push(...difficultyErrors.map(e => `Lesson ${e.recordId}: ${e.message}`));
        }
      });

      expect(errors).toHaveLength(0);
    });

    it('should only contain beginner, intermediate, or advanced difficulty', () => {
      const difficulties = extractDifficultyLevels(
        listeningLessons as unknown as Record<string, unknown>[]
      );
      
      difficulties.forEach((diff) => {
        expect(validDifficultyLevels).toContain(diff);
      });
    });
  });

  describe('Category Values', () => {
    it('all category values should be non-empty strings', () => {
      const errors = validateCategories(
        listeningLessons as unknown as Record<string, unknown>[],
        'hindiListeningData'
      );

      if (errors.length > 0) {
        console.error('Category errors:', errors);
      }
      expect(errors).toHaveLength(0);
    });

    it('should have multiple categories', () => {
      const categories = extractCategories(
        listeningLessons as unknown as Record<string, unknown>[]
      );
      
      expect(categories.length).toBeGreaterThan(1);
    });
  });

  describe('Unique IDs', () => {
    it('all lesson IDs should be unique', () => {
      const errors = validateUniqueIds(
        listeningLessons as unknown as Record<string, unknown>[],
        'hindiListeningData'
      );

      if (errors.length > 0) {
        console.error('Duplicate ID errors:', errors);
      }
      expect(errors).toHaveLength(0);
    });
  });

  describe('Vocabulary', () => {
    it('all lessons should have vocabulary array', () => {
      listeningLessons.forEach((lesson) => {
        expect(Array.isArray(lesson.vocabulary)).toBe(true);
      });
    });

    it('vocabulary items should have required fields', () => {
      const vocabRequiredFields = ['word', 'meaning', 'meaningHindi'];
      const errors: string[] = [];

      listeningLessons.forEach((lesson) => {
        lesson.vocabulary.forEach((vocab, vIndex) => {
          const vErrors = validateRequiredFields(
            vocab as unknown as Record<string, unknown>,
            vocabRequiredFields,
            'hindiListeningData',
            `${lesson.id}-V${vIndex + 1}`
          );
          
          if (vErrors.length > 0) {
            errors.push(...vErrors.map(e => `Lesson ${lesson.id}, Vocab ${vIndex + 1}: ${e.message}`));
          }
        });
      });

      if (errors.length > 0) {
        console.error('Vocabulary validation errors:', errors);
      }
      expect(errors).toHaveLength(0);
    });
  });
});
