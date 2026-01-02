/**
 * Hindi Dialogues Data Validation Tests
 * Tests all dialogues have required fields and valid values
 * 
 * Requirements: 9.7
 */

import { dialogues, Dialogue } from '@/data/hindiDialoguesData';
import {
  validateRequiredFields,
  validateDifficulty,
  validateCategories,
  validateUniqueIds,
  extractCategories,
  extractDifficultyLevels
} from '../utils/dataValidator';
import { validDifficultyLevels } from '../config/testConfig';

describe('hindiDialoguesData Validation', () => {
  const requiredFields = [
    'id',
    'title',
    'titleHindi',
    'scenario',
    'scenarioHindi',
    'difficulty',
    'category',
    'lines'
  ];

  describe('Data Count', () => {
    it('should have at least 1 dialogue', () => {
      expect(dialogues.length).toBeGreaterThanOrEqual(1);
    });

    it('should have dialogues array defined', () => {
      expect(dialogues).toBeDefined();
      expect(Array.isArray(dialogues)).toBe(true);
    });
  });

  describe('Required Fields', () => {
    it('all dialogues should have all required fields', () => {
      const errors: string[] = [];

      dialogues.forEach((dialogue, index) => {
        const dialogueErrors = validateRequiredFields(
          dialogue as unknown as Record<string, unknown>,
          requiredFields,
          'hindiDialoguesData',
          dialogue.id || index
        );
        
        if (dialogueErrors.length > 0) {
          errors.push(...dialogueErrors.map(e => `Dialogue ${e.recordId}: ${e.message}`));
        }
      });

      if (errors.length > 0) {
        console.error('Validation errors:', errors);
      }
      expect(errors).toHaveLength(0);
    });

    it('each dialogue should have a numeric id', () => {
      dialogues.forEach((dialogue) => {
        expect(typeof dialogue.id).toBe('number');
        expect(dialogue.id).toBeGreaterThan(0);
      });
    });

    it('each dialogue should have non-empty title', () => {
      dialogues.forEach((dialogue) => {
        expect(typeof dialogue.title).toBe('string');
        expect(dialogue.title.trim().length).toBeGreaterThan(0);
      });
    });

    it('each dialogue should have non-empty scenario', () => {
      dialogues.forEach((dialogue) => {
        expect(typeof dialogue.scenario).toBe('string');
        expect(dialogue.scenario.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe('Dialogue Lines', () => {
    it('all dialogues should have at least one line', () => {
      dialogues.forEach((dialogue) => {
        expect(Array.isArray(dialogue.lines)).toBe(true);
        expect(dialogue.lines.length).toBeGreaterThanOrEqual(1);
      });
    });

    it('each line should have required fields', () => {
      const lineRequiredFields = ['speaker', 'speakerHindi', 'english', 'hindi', 'pronunciation'];
      const errors: string[] = [];

      dialogues.forEach((dialogue) => {
        dialogue.lines.forEach((line, lIndex) => {
          const lErrors = validateRequiredFields(
            line as unknown as Record<string, unknown>,
            lineRequiredFields,
            'hindiDialoguesData',
            `${dialogue.id}-L${lIndex + 1}`
          );
          
          if (lErrors.length > 0) {
            errors.push(...lErrors.map(e => `Dialogue ${dialogue.id}, Line ${lIndex + 1}: ${e.message}`));
          }
        });
      });

      if (errors.length > 0) {
        console.error('Line validation errors:', errors);
      }
      expect(errors).toHaveLength(0);
    });

    it('each line should have non-empty speaker', () => {
      dialogues.forEach((dialogue) => {
        dialogue.lines.forEach((line) => {
          expect(line.speaker.trim().length).toBeGreaterThan(0);
          expect(line.speakerHindi.trim().length).toBeGreaterThan(0);
        });
      });
    });

    it('each line should have non-empty english and hindi text', () => {
      dialogues.forEach((dialogue) => {
        dialogue.lines.forEach((line) => {
          expect(line.english.trim().length).toBeGreaterThan(0);
          expect(line.hindi.trim().length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('Difficulty Values', () => {
    it('all difficulty values should be valid enum values', () => {
      const errors: string[] = [];

      dialogues.forEach((dialogue) => {
        const difficultyErrors = validateDifficulty(
          dialogue as unknown as Record<string, unknown>,
          'hindiDialoguesData',
          dialogue.id
        );
        
        if (difficultyErrors.length > 0) {
          errors.push(...difficultyErrors.map(e => `Dialogue ${e.recordId}: ${e.message}`));
        }
      });

      expect(errors).toHaveLength(0);
    });

    it('should only contain beginner, intermediate, or advanced difficulty', () => {
      const difficulties = extractDifficultyLevels(
        dialogues as unknown as Record<string, unknown>[]
      );
      
      difficulties.forEach((diff) => {
        expect(validDifficultyLevels).toContain(diff);
      });
    });
  });

  describe('Category Values', () => {
    it('all category values should be non-empty strings', () => {
      const errors = validateCategories(
        dialogues as unknown as Record<string, unknown>[],
        'hindiDialoguesData'
      );

      if (errors.length > 0) {
        console.error('Category errors:', errors);
      }
      expect(errors).toHaveLength(0);
    });

    it('should have at least one category', () => {
      const categories = extractCategories(
        dialogues as unknown as Record<string, unknown>[]
      );
      
      expect(categories.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Unique IDs', () => {
    it('all dialogue IDs should be unique', () => {
      const errors = validateUniqueIds(
        dialogues as unknown as Record<string, unknown>[],
        'hindiDialoguesData'
      );

      if (errors.length > 0) {
        console.error('Duplicate ID errors:', errors);
      }
      expect(errors).toHaveLength(0);
    });
  });
});
