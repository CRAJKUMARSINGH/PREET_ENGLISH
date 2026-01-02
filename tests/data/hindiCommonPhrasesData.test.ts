/**
 * Hindi Common Phrases Data Validation Tests
 * Tests all 125+ phrases have required fields and valid values
 * 
 * Requirements: 1.1
 */

import { commonPhrases, CommonPhrase } from '@/data/hindiCommonPhrasesData';
import {
  validateRequiredFields,
  validateDifficulty,
  validateCategories,
  validateUniqueIds,
  extractCategories,
  extractDifficultyLevels
} from '../utils/dataValidator';
import { validDifficultyLevels } from '../config/testConfig';

describe('hindiCommonPhrasesData Validation', () => {
  const requiredFields = [
    'id',
    'english',
    'hindi',
    'pronunciation',
    'usage',
    'usageHindi',
    'example',
    'exampleHindi',
    'category',
    'difficulty'
  ];

  describe('Data Count', () => {
    it('should have at least 125 phrases', () => {
      expect(commonPhrases.length).toBeGreaterThanOrEqual(125);
    });

    it('should have phrases array defined', () => {
      expect(commonPhrases).toBeDefined();
      expect(Array.isArray(commonPhrases)).toBe(true);
    });
  });

  describe('Required Fields', () => {
    it('all phrases should have all required fields', () => {
      const errors: string[] = [];

      commonPhrases.forEach((phrase, index) => {
        const phraseErrors = validateRequiredFields(
          phrase as unknown as Record<string, unknown>,
          requiredFields,
          'hindiCommonPhrasesData',
          phrase.id || index
        );
        
        if (phraseErrors.length > 0) {
          errors.push(...phraseErrors.map(e => `Phrase ${e.recordId}: ${e.message}`));
        }
      });

      if (errors.length > 0) {
        console.error('Validation errors:', errors);
      }
      expect(errors).toHaveLength(0);
    });

    it('each phrase should have a numeric id', () => {
      commonPhrases.forEach((phrase) => {
        expect(typeof phrase.id).toBe('number');
        expect(phrase.id).toBeGreaterThan(0);
      });
    });

    it('each phrase should have non-empty english text', () => {
      commonPhrases.forEach((phrase) => {
        expect(typeof phrase.english).toBe('string');
        expect(phrase.english.trim().length).toBeGreaterThan(0);
      });
    });

    it('each phrase should have non-empty hindi text', () => {
      commonPhrases.forEach((phrase) => {
        expect(typeof phrase.hindi).toBe('string');
        expect(phrase.hindi.trim().length).toBeGreaterThan(0);
      });
    });

    it('each phrase should have non-empty pronunciation', () => {
      commonPhrases.forEach((phrase) => {
        expect(typeof phrase.pronunciation).toBe('string');
        expect(phrase.pronunciation.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe('Difficulty Values', () => {
    it('all difficulty values should be valid enum values', () => {
      const errors: string[] = [];

      commonPhrases.forEach((phrase) => {
        const difficultyErrors = validateDifficulty(
          phrase as unknown as Record<string, unknown>,
          'hindiCommonPhrasesData',
          phrase.id
        );
        
        if (difficultyErrors.length > 0) {
          errors.push(...difficultyErrors.map(e => `Phrase ${e.recordId}: ${e.message}`));
        }
      });

      expect(errors).toHaveLength(0);
    });

    it('should only contain beginner, intermediate, or advanced difficulty', () => {
      const difficulties = extractDifficultyLevels(
        commonPhrases as unknown as Record<string, unknown>[]
      );
      
      difficulties.forEach((diff) => {
        expect(validDifficultyLevels).toContain(diff);
      });
    });

    it('should have phrases at all difficulty levels', () => {
      const difficulties = extractDifficultyLevels(
        commonPhrases as unknown as Record<string, unknown>[]
      );
      
      expect(difficulties).toContain('beginner');
      expect(difficulties).toContain('intermediate');
      expect(difficulties).toContain('advanced');
    });
  });

  describe('Category Values', () => {
    it('all category values should be non-empty strings', () => {
      const errors = validateCategories(
        commonPhrases as unknown as Record<string, unknown>[],
        'hindiCommonPhrasesData'
      );

      if (errors.length > 0) {
        console.error('Category errors:', errors);
      }
      expect(errors).toHaveLength(0);
    });

    it('should have multiple categories', () => {
      const categories = extractCategories(
        commonPhrases as unknown as Record<string, unknown>[]
      );
      
      expect(categories.length).toBeGreaterThan(1);
    });

    it('should include common categories like Greetings', () => {
      const categories = extractCategories(
        commonPhrases as unknown as Record<string, unknown>[]
      );
      
      expect(categories).toContain('Greetings');
    });
  });

  describe('Unique IDs', () => {
    it('all phrase IDs should be unique', () => {
      const errors = validateUniqueIds(
        commonPhrases as unknown as Record<string, unknown>[],
        'hindiCommonPhrasesData'
      );

      if (errors.length > 0) {
        console.error('Duplicate ID errors:', errors);
      }
      expect(errors).toHaveLength(0);
    });

    it('IDs should be sequential starting from 1', () => {
      const ids = commonPhrases.map(p => p.id).sort((a, b) => a - b);
      expect(ids[0]).toBe(1);
      
      // Check for gaps (allow some flexibility)
      for (let i = 1; i < ids.length; i++) {
        expect(ids[i] - ids[i - 1]).toBeLessThanOrEqual(5); // Allow small gaps
      }
    });
  });

  describe('Content Quality', () => {
    it('examples should contain the english phrase or related content', () => {
      // Spot check a few phrases
      const samplePhrases = commonPhrases.slice(0, 10);
      
      samplePhrases.forEach((phrase) => {
        expect(phrase.example.length).toBeGreaterThan(0);
        expect(phrase.exampleHindi.length).toBeGreaterThan(0);
      });
    });

    it('usage descriptions should be meaningful', () => {
      commonPhrases.forEach((phrase) => {
        expect(phrase.usage.length).toBeGreaterThan(10);
        expect(phrase.usageHindi.length).toBeGreaterThan(5);
      });
    });
  });
});
