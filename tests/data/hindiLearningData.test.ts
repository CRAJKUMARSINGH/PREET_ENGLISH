/**
 * Hindi Learning Data Validation Tests
 * Tests all learning data structures are properly defined
 * 
 * Requirements: 1.5
 */

import {
  pronunciationChallenges,
  commonGrammarMistakes,
  culturalContextData,
  businessEnglishForIndians,
  dailyEnglishPhrases,
  hindiLearningData
} from '@/data/hindiLearningData';

describe('hindiLearningData Validation', () => {
  describe('Pronunciation Challenges', () => {
    it('should have pronunciation challenges defined', () => {
      expect(pronunciationChallenges).toBeDefined();
      expect(typeof pronunciationChallenges).toBe('object');
    });

    it('should have at least one pronunciation challenge category', () => {
      const categories = Object.keys(pronunciationChallenges);
      expect(categories.length).toBeGreaterThanOrEqual(1);
    });

    it('each challenge should have title, description, and words', () => {
      Object.entries(pronunciationChallenges).forEach(([key, challenge]) => {
        expect(challenge).toHaveProperty('title');
        expect(challenge).toHaveProperty('description');
        expect(challenge).toHaveProperty('words');
        expect(Array.isArray(challenge.words)).toBe(true);
        expect(challenge.words.length).toBeGreaterThan(0);
      });
    });

    it('each word in challenges should have word, hindi, and tip', () => {
      Object.entries(pronunciationChallenges).forEach(([key, challenge]) => {
        challenge.words.forEach((wordItem, index) => {
          expect(wordItem).toHaveProperty('word');
          expect(wordItem).toHaveProperty('hindi');
          expect(wordItem).toHaveProperty('tip');
          expect(wordItem.word.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('Common Grammar Mistakes', () => {
    it('should have grammar mistakes array defined', () => {
      expect(commonGrammarMistakes).toBeDefined();
      expect(Array.isArray(commonGrammarMistakes)).toBe(true);
    });

    it('should have at least one grammar mistake category', () => {
      expect(commonGrammarMistakes.length).toBeGreaterThanOrEqual(1);
    });

    it('each category should have category name and hindi explanation', () => {
      commonGrammarMistakes.forEach((category, index) => {
        expect(category).toHaveProperty('category');
        expect(category).toHaveProperty('hindiExplanation');
        expect(category.category.length).toBeGreaterThan(0);
        expect(category.hindiExplanation.length).toBeGreaterThan(0);
      });
    });

    it('each category should have mistakes array', () => {
      commonGrammarMistakes.forEach((category) => {
        expect(category).toHaveProperty('mistakes');
        expect(Array.isArray(category.mistakes)).toBe(true);
        expect(category.mistakes.length).toBeGreaterThan(0);
      });
    });

    it('each mistake should have wrong, correct, and explanation', () => {
      commonGrammarMistakes.forEach((category) => {
        category.mistakes.forEach((mistake, index) => {
          expect(mistake).toHaveProperty('wrong');
          expect(mistake).toHaveProperty('correct');
          expect(mistake).toHaveProperty('explanation');
          expect(mistake.wrong.length).toBeGreaterThan(0);
          expect(mistake.correct.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('Cultural Context Data', () => {
    it('should have cultural context array defined', () => {
      expect(culturalContextData).toBeDefined();
      expect(Array.isArray(culturalContextData)).toBe(true);
    });

    it('should have at least one cultural context item', () => {
      expect(culturalContextData.length).toBeGreaterThanOrEqual(1);
    });

    it('each item should have english phrase and hindi equivalent', () => {
      culturalContextData.forEach((item, index) => {
        expect(item).toHaveProperty('englishPhrase');
        expect(item).toHaveProperty('hindiEquivalent');
        expect(item.englishPhrase.length).toBeGreaterThan(0);
        expect(item.hindiEquivalent.length).toBeGreaterThan(0);
      });
    });

    it('each item should have cultural context explanation', () => {
      culturalContextData.forEach((item) => {
        expect(item).toHaveProperty('culturalContext');
        expect(item.culturalContext.length).toBeGreaterThan(0);
      });
    });

    it('each item should have dos and donts', () => {
      culturalContextData.forEach((item) => {
        expect(item).toHaveProperty('dosDonts');
        expect(item.dosDonts).toHaveProperty('dos');
        expect(item.dosDonts).toHaveProperty('donts');
        expect(Array.isArray(item.dosDonts.dos)).toBe(true);
        expect(Array.isArray(item.dosDonts.donts)).toBe(true);
      });
    });
  });

  describe('Business English for Indians', () => {
    it('should have business english array defined', () => {
      expect(businessEnglishForIndians).toBeDefined();
      expect(Array.isArray(businessEnglishForIndians)).toBe(true);
    });

    it('should have at least one business situation', () => {
      expect(businessEnglishForIndians.length).toBeGreaterThanOrEqual(1);
    });

    it('each situation should have required fields', () => {
      businessEnglishForIndians.forEach((item, index) => {
        expect(item).toHaveProperty('situation');
        expect(item).toHaveProperty('hindiContext');
        expect(item).toHaveProperty('commonMistakes');
        expect(item).toHaveProperty('correctFormat');
        expect(item).toHaveProperty('examples');
      });
    });

    it('common mistakes should be an array', () => {
      businessEnglishForIndians.forEach((item) => {
        expect(Array.isArray(item.commonMistakes)).toBe(true);
        expect(item.commonMistakes.length).toBeGreaterThan(0);
      });
    });

    it('examples should be an array', () => {
      businessEnglishForIndians.forEach((item) => {
        expect(Array.isArray(item.examples)).toBe(true);
        expect(item.examples.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Daily English Phrases', () => {
    it('should have daily phrases array defined', () => {
      expect(dailyEnglishPhrases).toBeDefined();
      expect(Array.isArray(dailyEnglishPhrases)).toBe(true);
    });

    it('should have at least one category', () => {
      expect(dailyEnglishPhrases.length).toBeGreaterThanOrEqual(1);
    });

    it('each category should have category name and phrases', () => {
      dailyEnglishPhrases.forEach((category, index) => {
        expect(category).toHaveProperty('category');
        expect(category).toHaveProperty('phrases');
        expect(category.category.length).toBeGreaterThan(0);
        expect(Array.isArray(category.phrases)).toBe(true);
      });
    });

    it('each phrase should have english, hindi, pronunciation, and usage', () => {
      dailyEnglishPhrases.forEach((category) => {
        category.phrases.forEach((phrase, index) => {
          expect(phrase).toHaveProperty('english');
          expect(phrase).toHaveProperty('hindi');
          expect(phrase).toHaveProperty('pronunciation');
          expect(phrase).toHaveProperty('usage');
          expect(phrase.english.length).toBeGreaterThan(0);
          expect(phrase.hindi.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('Combined Export', () => {
    it('should have hindiLearningData export with all data', () => {
      expect(hindiLearningData).toBeDefined();
      expect(hindiLearningData).toHaveProperty('pronunciationChallenges');
      expect(hindiLearningData).toHaveProperty('commonGrammarMistakes');
      expect(hindiLearningData).toHaveProperty('culturalContextData');
      expect(hindiLearningData).toHaveProperty('businessEnglishForIndians');
      expect(hindiLearningData).toHaveProperty('dailyEnglishPhrases');
    });
  });
});
