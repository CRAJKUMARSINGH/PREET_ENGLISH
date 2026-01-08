import memoizee from 'memoizee';
import { storage } from '../storage';

// Cache lessons for 5 minutes
export const getCachedLessons = memoizee(
  async () => {
    console.log('[CACHE] Fetching lessons from database');
    return await storage.getLessons();
  },
  {
    maxAge: 5 * 60 * 1000, // 5 minutes
    promise: true,
    normalizer: () => 'lessons', // Single cache key for all lessons
  }
);

// Cache individual lesson for 10 minutes
export const getCachedLesson = memoizee(
  async (lessonId: number) => {
    console.log(`[CACHE] Fetching lesson ${lessonId} from database`);
    return await storage.getLesson(lessonId);
  },
  {
    maxAge: 10 * 60 * 1000, // 10 minutes
    promise: true,
    normalizer: (args: [number]) => `lesson-${args[0]}`,
  }
);

// Cache user stats for 1 minute
export const getCachedUserStats = memoizee(
  async (userId: number) => {
    console.log(`[CACHE] Fetching stats for user ${userId}`);
    return await storage.getUserStats(userId);
  },
  {
    maxAge: 1 * 60 * 1000, // 1 minute
    promise: true,
    normalizer: (args: [number]) => `stats-${args[0]}`,
  }
);

// Cache vocabulary for lesson for 10 minutes
export const getCachedVocabulary = memoizee(
  async (lessonId: number) => {
    console.log(`[CACHE] Fetching vocabulary for lesson ${lessonId}`);
    return await storage.getVocabularyForLesson(lessonId);
  },
  {
    maxAge: 10 * 60 * 1000, // 10 minutes
    promise: true,
    normalizer: (args: [number]) => `vocab-${args[0]}`,
  }
);

// Cache leaderboard for 30 minutes
export const getCachedLeaderboard = memoizee(
  async (weekStart?: string) => {
    console.log('[CACHE] Fetching leaderboard from database');
    return await storage.getLeaderboard(weekStart);
  },
  {
    maxAge: 30 * 60 * 1000, // 30 minutes
    promise: true,
    normalizer: (args: [string?]) => `leaderboard-${args[0] || 'current'}`,
  }
);

// Cache quizzes for 15 minutes
export const getCachedQuizzes = memoizee(
  async () => {
    console.log('[CACHE] Fetching quizzes from database');
    return await storage.getQuizzes();
  },
  {
    maxAge: 15 * 60 * 1000, // 15 minutes
    promise: true,
    normalizer: () => 'quizzes',
  }
);

// Cache individual quiz for 15 minutes
export const getCachedQuiz = memoizee(
  async (quizId: number) => {
    console.log(`[CACHE] Fetching quiz ${quizId} from database`);
    return await storage.getQuiz(quizId);
  },
  {
    maxAge: 15 * 60 * 1000, // 15 minutes
    promise: true,
    normalizer: (args: [number]) => `quiz-${args[0]}`,
  }
);

// Cache stories for 20 minutes
export const getCachedStories = memoizee(
  async () => {
    console.log('[CACHE] Fetching stories from database');
    return await storage.getStories();
  },
  {
    maxAge: 20 * 60 * 1000, // 20 minutes
    promise: true,
    normalizer: () => 'stories',
  }
);

// Cache individual story for 20 minutes
export const getCachedStory = memoizee(
  async (storyId: number) => {
    console.log(`[CACHE] Fetching story ${storyId} from database`);
    return await storage.getStory(storyId);
  },
  {
    maxAge: 20 * 60 * 1000, // 20 minutes
    promise: true,
    normalizer: (args: [number]) => `story-${args[0]}`,
  }
);

// Cache scenarios for 15 minutes
export const getCachedScenarios = memoizee(
  async () => {
    console.log('[CACHE] Fetching scenarios from database');
    return await storage.getScenarios();
  },
  {
    maxAge: 15 * 60 * 1000, // 15 minutes
    promise: true,
    normalizer: () => 'scenarios',
  }
);

// Cache achievements for 1 hour
export const getCachedAchievements = memoizee(
  async () => {
    console.log('[CACHE] Fetching achievements from database');
    return await storage.getAchievements();
  },
  {
    maxAge: 60 * 60 * 1000, // 1 hour
    promise: true,
    normalizer: () => 'achievements',
  }
);

// Cache search results for 5 minutes
export const getCachedSearchResults = memoizee(
  async (query: string) => {
    console.log(`[CACHE] Searching for: ${query}`);
    return await storage.search(query);
  },
  {
    maxAge: 5 * 60 * 1000, // 5 minutes
    promise: true,
    normalizer: (args: [string]) => `search-${args[0].toLowerCase()}`,
  }
);

// Utility to clear specific cache
export const clearCache = {
  lessons: () => getCachedLessons.clear(),
  lesson: (lessonId: number) => getCachedLesson.delete(lessonId),
  userStats: (userId: number) => getCachedUserStats.delete(userId),
  vocabulary: (lessonId: number) => getCachedVocabulary.delete(lessonId),
  leaderboard: () => getCachedLeaderboard.clear(),
  quizzes: () => getCachedQuizzes.clear(),
  quiz: (quizId: number) => getCachedQuiz.delete(quizId),
  stories: () => getCachedStories.clear(),
  story: (storyId: number) => getCachedStory.delete(storyId),
  scenarios: () => getCachedScenarios.clear(),
  achievements: () => getCachedAchievements.clear(),
  search: () => getCachedSearchResults.clear(),
  all: () => {
    getCachedLessons.clear();
    getCachedLesson.clear();
    getCachedUserStats.clear();
    getCachedVocabulary.clear();
    getCachedLeaderboard.clear();
    getCachedQuizzes.clear();
    getCachedQuiz.clear();
    getCachedStories.clear();
    getCachedStory.clear();
    getCachedScenarios.clear();
    getCachedAchievements.clear();
    getCachedSearchResults.clear();
  },
};

// Cache statistics
export const getCacheStats = () => {
  return {
    lessons: {
      size: (getCachedLessons as any).size || 0,
      hits: (getCachedLessons as any).hits || 0,
      misses: (getCachedLessons as any).misses || 0,
    },
    userStats: {
      size: (getCachedUserStats as any).size || 0,
      hits: (getCachedUserStats as any).hits || 0,
      misses: (getCachedUserStats as any).misses || 0,
    },
    vocabulary: {
      size: (getCachedVocabulary as any).size || 0,
      hits: (getCachedVocabulary as any).hits || 0,
      misses: (getCachedVocabulary as any).misses || 0,
    },
    leaderboard: {
      size: (getCachedLeaderboard as any).size || 0,
      hits: (getCachedLeaderboard as any).hits || 0,
      misses: (getCachedLeaderboard as any).misses || 0,
    },
  };
};