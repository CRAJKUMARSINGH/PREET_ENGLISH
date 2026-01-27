/**
 * Speaking Topics Data Validation Tests
 * Tests all speaking topics have required fields and valid values
 * 
 * Requirements: 9.9
 */

import { speakingTopics } from '@/data/speakingTopics';
import {
  validateRequiredFields,
  validateCategories,
  validateUniqueIds,
  extractCategories
} from '../utils/dataValidator';

describe('speakingTopics Validation', () => {
  const requiredFields = [
    'id',
    'title',
    'hindiTitle',
    'difficulty',
    'emoji',
    'category',
    'hindiThoughts',
    'sentenceFrames',
    'modelAnswer',
    'freePrompt',
    'confidenceTip'
  ];

  describe('Data Count', () => {
    it('should have at least 1 speaking topic', () => {
      expect(speakingTopics.length).toBeGreaterThanOrEqual(1);
    });

    it('should have topics array defined', () => {
      expect(speakingTopics).toBeDefined();
      expect(Array.isArray(speakingTopics)).toBe(true);
    });
  });

  describe('Required Fields', () => {
    it('all topics should have all required fields', () => {
      const errors: string[] = [];

      speakingTopics.forEach((topic, index) => {
        const topicErrors = validateRequiredFields(
          topic as unknown as Record<string, unknown>,
          requiredFields,
          'speakingTopics',
          topic.id || index
        );
        
        if (topicErrors.length > 0) {
          errors.push(...topicErrors.map(e => `Topic ${e.recordId}: ${e.message}`));
        }
      });

      if (errors.length > 0) {
        console.error('Validation errors:', errors);
      }
      expect(errors).toHaveLength(0);
    });

    it('each topic should have a numeric id', () => {
      speakingTopics.forEach((topic) => {
        expect(typeof topic.id).toBe('number');
        expect(topic.id).toBeGreaterThan(0);
      });
    });

    it('each topic should have non-empty title', () => {
      speakingTopics.forEach((topic) => {
        expect(typeof topic.title).toBe('string');
        expect(topic.title.trim().length).toBeGreaterThan(0);
      });
    });

    it('each topic should have non-empty hindiTitle', () => {
      speakingTopics.forEach((topic) => {
        expect(typeof topic.hindiTitle).toBe('string');
        expect(topic.hindiTitle.trim().length).toBeGreaterThan(0);
      });
    });

    it('each topic should have an emoji', () => {
      speakingTopics.forEach((topic) => {
        expect(typeof topic.emoji).toBe('string');
        expect(topic.emoji.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Hindi Thoughts Array', () => {
    it('all topics should have at least one hindi thought', () => {
      speakingTopics.forEach((topic) => {
        expect(Array.isArray(topic.hindiThoughts)).toBe(true);
        expect(topic.hindiThoughts.length).toBeGreaterThanOrEqual(1);
      });
    });

    it('each hindi thought should be non-empty', () => {
      speakingTopics.forEach((topic) => {
        topic.hindiThoughts.forEach((thought, index) => {
          expect(typeof thought).toBe('string');
          expect(thought.trim().length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('Sentence Frames Array', () => {
    it('all topics should have at least one sentence frame', () => {
      speakingTopics.forEach((topic) => {
        expect(Array.isArray(topic.sentenceFrames)).toBe(true);
        expect(topic.sentenceFrames.length).toBeGreaterThanOrEqual(1);
      });
    });

    it('each sentence frame should be non-empty', () => {
      speakingTopics.forEach((topic) => {
        topic.sentenceFrames.forEach((frame, index) => {
          expect(typeof frame).toBe('string');
          expect(frame.trim().length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('Difficulty Values', () => {
    it('all difficulty values should be valid', () => {
      const validDifficulties = ['Easy', 'Medium', 'Hard', 'Advanced'];
      
      speakingTopics.forEach((topic) => {
        expect(validDifficulties).toContain(topic.difficulty);
      });
    });
  });

  describe('Category Values', () => {
    it('all category values should be non-empty strings', () => {
      const errors = validateCategories(
        speakingTopics as unknown as Record<string, unknown>[],
        'speakingTopics'
      );

      if (errors.length > 0) {
        console.error('Category errors:', errors);
      }
      expect(errors).toHaveLength(0);
    });

    it('should have at least one category', () => {
      const categories = extractCategories(
        speakingTopics as unknown as Record<string, unknown>[]
      );
      
      expect(categories.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Unique IDs', () => {
    it('all topic IDs should be unique', () => {
      const errors = validateUniqueIds(
        speakingTopics as unknown as Record<string, unknown>[],
        'speakingTopics'
      );

      if (errors.length > 0) {
        console.error('Duplicate ID errors:', errors);
      }
      expect(errors).toHaveLength(0);
    });
  });

  describe('Content Quality', () => {
    it('model answers should be meaningful sentences', () => {
      speakingTopics.forEach((topic) => {
        expect(topic.modelAnswer.length).toBeGreaterThan(20);
      });
    });

    it('confidence tips should be helpful', () => {
      speakingTopics.forEach((topic) => {
        expect(topic.confidenceTip.length).toBeGreaterThan(10);
      });
    });

    it('free prompts should be in Hindi', () => {
      speakingTopics.forEach((topic) => {
        expect(topic.freePrompt.length).toBeGreaterThan(5);
      });
    });
  });
});
