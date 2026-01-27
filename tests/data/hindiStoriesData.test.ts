/**
 * Hindi Stories Data Validation Tests
 * Tests all stories have required fields and valid values
 * 
 * Requirements: 1.4
 */

import { stories, Story } from '@/data/hindiStoriesData';
import {
  validateRequiredFields,
  validateCategories,
  validateUniqueIds,
  extractCategories
} from '../utils/dataValidator';
import { validDifficultyLevels } from '../config/testConfig';

describe('hindiStoriesData Validation', () => {
  const requiredFields = [
    'id',
    'title',
    'titleHindi',
    'level',
    'category',
    'paragraphs',
    'moral',
    'moralHindi'
  ];

  describe('Data Count', () => {
    it('should have at least 1 story', () => {
      expect(stories.length).toBeGreaterThanOrEqual(1);
    });

    it('should have stories array defined', () => {
      expect(stories).toBeDefined();
      expect(Array.isArray(stories)).toBe(true);
    });
  });

  describe('Required Fields', () => {
    it('all stories should have all required fields', () => {
      const errors: string[] = [];

      stories.forEach((story, index) => {
        const storyErrors = validateRequiredFields(
          story as unknown as Record<string, unknown>,
          requiredFields,
          'hindiStoriesData',
          story.id || index
        );
        
        if (storyErrors.length > 0) {
          errors.push(...storyErrors.map(e => `Story ${e.recordId}: ${e.message}`));
        }
      });

      if (errors.length > 0) {
        console.error('Validation errors:', errors);
      }
      expect(errors).toHaveLength(0);
    });

    it('each story should have a numeric id', () => {
      stories.forEach((story) => {
        expect(typeof story.id).toBe('number');
        expect(story.id).toBeGreaterThan(0);
      });
    });

    it('each story should have non-empty title', () => {
      stories.forEach((story) => {
        expect(typeof story.title).toBe('string');
        expect(story.title.trim().length).toBeGreaterThan(0);
      });
    });

    it('each story should have a moral', () => {
      stories.forEach((story) => {
        expect(typeof story.moral).toBe('string');
        expect(story.moral.trim().length).toBeGreaterThan(0);
        expect(story.moralHindi.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe('Paragraphs Array', () => {
    it('all stories should have at least one paragraph', () => {
      stories.forEach((story) => {
        expect(Array.isArray(story.paragraphs)).toBe(true);
        expect(story.paragraphs.length).toBeGreaterThanOrEqual(1);
      });
    });

    it('each paragraph should have english and hindi text', () => {
      stories.forEach((story) => {
        story.paragraphs.forEach((para, pIndex) => {
          expect(typeof para.english).toBe('string');
          expect(para.english.trim().length).toBeGreaterThan(0);
          expect(typeof para.hindi).toBe('string');
          expect(para.hindi.trim().length).toBeGreaterThan(0);
        });
      });
    });

    it('each paragraph should have vocabulary array', () => {
      stories.forEach((story) => {
        story.paragraphs.forEach((para) => {
          expect(Array.isArray(para.vocabulary)).toBe(true);
        });
      });
    });
  });

  describe('Vocabulary', () => {
    it('vocabulary items should have required fields', () => {
      const vocabRequiredFields = ['word', 'meaning', 'hindiMeaning'];
      const errors: string[] = [];

      stories.forEach((story) => {
        story.paragraphs.forEach((para, pIndex) => {
          para.vocabulary.forEach((vocab, vIndex) => {
            const vErrors = validateRequiredFields(
              vocab as unknown as Record<string, unknown>,
              vocabRequiredFields,
              'hindiStoriesData',
              `${story.id}-P${pIndex + 1}-V${vIndex + 1}`
            );
            
            if (vErrors.length > 0) {
              errors.push(...vErrors.map(e => `Story ${story.id}, Para ${pIndex + 1}, Vocab ${vIndex + 1}: ${e.message}`));
            }
          });
        });
      });

      if (errors.length > 0) {
        console.error('Vocabulary validation errors:', errors);
      }
      expect(errors).toHaveLength(0);
    });
  });

  describe('Level Values', () => {
    it('all level values should be valid', () => {
      stories.forEach((story) => {
        expect(validDifficultyLevels).toContain(story.level);
      });
    });
  });

  describe('Category Values', () => {
    it('all category values should be non-empty strings', () => {
      const errors = validateCategories(
        stories as unknown as Record<string, unknown>[],
        'hindiStoriesData'
      );

      if (errors.length > 0) {
        console.error('Category errors:', errors);
      }
      expect(errors).toHaveLength(0);
    });
  });

  describe('Unique IDs', () => {
    it('all story IDs should be unique', () => {
      const errors = validateUniqueIds(
        stories as unknown as Record<string, unknown>[],
        'hindiStoriesData'
      );

      if (errors.length > 0) {
        console.error('Duplicate ID errors:', errors);
      }
      expect(errors).toHaveLength(0);
    });
  });
});
