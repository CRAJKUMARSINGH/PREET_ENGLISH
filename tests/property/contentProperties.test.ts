import fc from 'fast-check';
import { commonPhrases } from '@/data/hindiCommonPhrasesData';
import { listeningLessons } from '@/data/hindiListeningData';
import { rolePlayScenarios } from '@/data/hindiRolePlayData';

// Property 1: Every randomly selected common phrase has non-empty english/hindi
// and difficulty is from the allowed enum.
describe('Content properties - HindiCommonPhrasesData', () => {
  it('all phrases have valid fields (property-based)', () => {
    const allowedDifficulties = ['beginner', 'intermediate', 'advanced'] as const;

    fc.assert(
      fc.property(fc.integer({ min: 0, max: commonPhrases.length - 1 }), (idx) => {
        const p = commonPhrases[idx];
        expect(p.phrase.length).toBeGreaterThan(0);
        expect(p.phraseHindi.length).toBeGreaterThan(0);
        expect(allowedDifficulties).toContain(p.difficulty);
        expect(p.category.length).toBeGreaterThan(0);
      })
    );
  });
});

// Property 2: Every randomly selected listening lesson has at least one question and
// duration string looks like M:SS or MM:SS.
describe('Content properties - HindiListeningData', () => {
  it('listening lessons have questions and valid duration format', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: listeningLessons.length - 1 }), (idx) => {
        const lesson = listeningLessons[idx];
        expect(Array.isArray(lesson.questions)).toBe(true);
        expect(lesson.questions.length).toBeGreaterThan(0);

        const durationPattern = /^\d{1,2}:\d{2}$/;
        expect(durationPattern.test(lesson.duration)).toBe(true);
      })
    );
  });
});

// Property 3: Every randomly selected role-play scenario has at least one exchange
// and all exchanges include at least one expected response.
describe('Content properties - HindiRolePlayData', () => {
  it('role play scenarios have structured exchanges', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: rolePlayScenarios.length - 1 }), (idx) => {
        const scenario = rolePlayScenarios[idx];
        expect(Array.isArray(scenario.exchanges)).toBe(true);
        expect(scenario.exchanges.length).toBeGreaterThan(0);

        for (const ex of scenario.exchanges) {
          expect(Array.isArray(ex.expectedResponses)).toBe(true);
          expect(ex.expectedResponses.length).toBeGreaterThan(0);
        }
      })
    );
  });
});
