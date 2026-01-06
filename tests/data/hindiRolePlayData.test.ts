/**
 * Hindi Role Play Data Validation Tests
 * Tests all 40+ role play scenarios have required fields and valid values
 * 
 * Requirements: 1.3
 */

import { rolePlayScenarios, RolePlayScenario } from '@/data/hindiRolePlayData';
import {
  validateRequiredFields,
  validateDifficulty,
  validateCategories,
  validateUniqueIds,
  extractCategories,
  extractDifficultyLevels
} from '../utils/dataValidator';
import { validDifficultyLevels } from '../config/testConfig';

describe('hindiRolePlayData Validation', () => {
  const requiredFields = [
    'id',
    'title',
    'titleHindi',
    'yourRole',
    'yourRoleHindi',
    'partnerRole',
    'partnerRoleHindi',
    'situation',
    'situationHindi',
    'difficulty',
    'category',
    'exchanges'
  ];

  describe('Data Count', () => {
    it('should have at least 40 role play scenarios', () => {
      expect(rolePlayScenarios.length).toBeGreaterThanOrEqual(40);
    });

    it('should have scenarios array defined', () => {
      expect(rolePlayScenarios).toBeDefined();
      expect(Array.isArray(rolePlayScenarios)).toBe(true);
    });
  });

  describe('Required Fields', () => {
    it('all scenarios should have all required fields', () => {
      const errors: string[] = [];

      rolePlayScenarios.forEach((scenario, index) => {
        const scenarioErrors = validateRequiredFields(
          scenario as unknown as Record<string, unknown>,
          requiredFields,
          'hindiRolePlayData',
          scenario.id || index
        );
        
        if (scenarioErrors.length > 0) {
          errors.push(...scenarioErrors.map(e => `Scenario ${e.recordId}: ${e.message}`));
        }
      });

      if (errors.length > 0) {
        console.error('Validation errors:', errors);
      }
      expect(errors).toHaveLength(0);
    });

    it('each scenario should have a numeric id', () => {
      rolePlayScenarios.forEach((scenario) => {
        expect(typeof scenario.id).toBe('number');
        expect(scenario.id).toBeGreaterThan(0);
      });
    });

    it('each scenario should have non-empty title', () => {
      rolePlayScenarios.forEach((scenario) => {
        expect(typeof scenario.title).toBe('string');
        expect(scenario.title.trim().length).toBeGreaterThan(0);
      });
    });

    it('each scenario should have non-empty situation', () => {
      rolePlayScenarios.forEach((scenario) => {
        expect(typeof scenario.situation).toBe('string');
        expect(scenario.situation.trim().length).toBeGreaterThan(0);
      });
    });

    it('each scenario should have role definitions', () => {
      rolePlayScenarios.forEach((scenario) => {
        expect(scenario.yourRole.trim().length).toBeGreaterThan(0);
        expect(scenario.partnerRole.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe('Exchanges Array', () => {
    it('all scenarios should have at least one exchange/dialogue', () => {
      rolePlayScenarios.forEach((scenario) => {
        expect(Array.isArray(scenario.exchanges)).toBe(true);
        expect(scenario.exchanges.length).toBeGreaterThanOrEqual(1);
      });
    });

    it('each exchange should have required fields', () => {
      const exchangeRequiredFields = ['prompt', 'promptHindi', 'expectedResponses', 'hints', 'hintsHindi'];
      const errors: string[] = [];

      rolePlayScenarios.forEach((scenario) => {
        scenario.exchanges.forEach((exchange, eIndex) => {
          const eErrors = validateRequiredFields(
            exchange as unknown as Record<string, unknown>,
            exchangeRequiredFields,
            'hindiRolePlayData',
            `${scenario.id}-E${eIndex + 1}`
          );
          
          if (eErrors.length > 0) {
            errors.push(...eErrors.map(e => `Scenario ${scenario.id}, Exchange ${eIndex + 1}: ${e.message}`));
          }
        });
      });

      if (errors.length > 0) {
        console.error('Exchange validation errors:', errors);
      }
      expect(errors).toHaveLength(0);
    });

    it('each exchange should have at least one expected response', () => {
      rolePlayScenarios.forEach((scenario) => {
        scenario.exchanges.forEach((exchange, eIndex) => {
          expect(Array.isArray(exchange.expectedResponses)).toBe(true);
          expect(exchange.expectedResponses.length).toBeGreaterThanOrEqual(1);
        });
      });
    });

    it('each exchange should have at least one hint', () => {
      rolePlayScenarios.forEach((scenario) => {
        scenario.exchanges.forEach((exchange, eIndex) => {
          expect(Array.isArray(exchange.hints)).toBe(true);
          expect(exchange.hints.length).toBeGreaterThanOrEqual(1);
        });
      });
    });
  });

  describe('Difficulty Values', () => {
    it('all difficulty values should be valid enum values', () => {
      const errors: string[] = [];

      rolePlayScenarios.forEach((scenario) => {
        const difficultyErrors = validateDifficulty(
          scenario as unknown as Record<string, unknown>,
          'hindiRolePlayData',
          scenario.id
        );
        
        if (difficultyErrors.length > 0) {
          errors.push(...difficultyErrors.map(e => `Scenario ${e.recordId}: ${e.message}`));
        }
      });

      expect(errors).toHaveLength(0);
    });

    it('should only contain beginner, intermediate, or advanced difficulty', () => {
      const difficulties = extractDifficultyLevels(
        rolePlayScenarios as unknown as Record<string, unknown>[]
      );
      
      difficulties.forEach((diff) => {
        expect(validDifficultyLevels).toContain(diff);
      });
    });

    it('should have scenarios at multiple difficulty levels', () => {
      const difficulties = extractDifficultyLevels(
        rolePlayScenarios as unknown as Record<string, unknown>[]
      );
      
      expect(difficulties.length).toBeGreaterThan(1);
    });
  });

  describe('Category Values', () => {
    it('all category values should be non-empty strings', () => {
      const errors = validateCategories(
        rolePlayScenarios as unknown as Record<string, unknown>[],
        'hindiRolePlayData'
      );

      if (errors.length > 0) {
        console.error('Category errors:', errors);
      }
      expect(errors).toHaveLength(0);
    });

    it('should have multiple categories', () => {
      const categories = extractCategories(
        rolePlayScenarios as unknown as Record<string, unknown>[]
      );
      
      expect(categories.length).toBeGreaterThan(1);
    });
  });

  describe('Unique IDs', () => {
    it('all scenario IDs should be unique', () => {
      const errors = validateUniqueIds(
        rolePlayScenarios as unknown as Record<string, unknown>[],
        'hindiRolePlayData'
      );

      if (errors.length > 0) {
        console.error('Duplicate ID errors:', errors);
      }
      expect(errors).toHaveLength(0);
    });
  });

  describe('Content Quality', () => {
    it('prompts should be meaningful sentences', () => {
      rolePlayScenarios.forEach((scenario) => {
        scenario.exchanges.forEach((exchange) => {
          expect(exchange.prompt.length).toBeGreaterThan(5);
          expect(exchange.promptHindi.length).toBeGreaterThan(3);
        });
      });
    });

    it('expected responses should be non-empty strings', () => {
      rolePlayScenarios.forEach((scenario) => {
        scenario.exchanges.forEach((exchange) => {
          exchange.expectedResponses.forEach((response) => {
            expect(typeof response).toBe('string');
            expect(response.trim().length).toBeGreaterThan(0);
          });
        });
      });
    });
  });
});
