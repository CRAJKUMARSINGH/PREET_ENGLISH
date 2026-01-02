import { z } from "zod";
import { 
  insertUserSchema, insertLessonSchema, insertVocabularySchema, insertProgressSchema, 
  insertQuizSchema, insertQuizQuestionSchema, insertQuizAttemptSchema,
  insertUserStatsSchema, insertAchievementSchema, insertUserAchievementSchema,
  insertDailyGoalSchema, insertLeaderboardSchema, insertScenarioSchema, insertCertificationSchema,
  lessons, vocabulary, progress, quizzes, quizQuestions, quizAttempts,
  userStats, achievements, userAchievements, dailyGoals, leaderboard, users, scenarios, scenarioProgress, certifications
} from "./schema";

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  lessons: {
    list: {
      method: 'GET' as const,
      path: '/api/lessons',
      responses: {
        200: z.array(z.custom<typeof lessons.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/lessons/:id',
      responses: {
        200: z.custom<typeof lessons.$inferSelect & { vocabulary: typeof vocabulary.$inferSelect[] }>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/lessons',
      input: insertLessonSchema,
      responses: {
        201: z.custom<typeof lessons.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  vocabulary: {
    list: {
      method: 'GET' as const,
      path: '/api/lessons/:id/vocabulary',
      responses: {
        200: z.array(z.custom<typeof vocabulary.$inferSelect>()),
      },
    },
  },
  progress: {
    list: {
      method: 'GET' as const,
      path: '/api/progress',
      responses: {
        200: z.array(z.custom<typeof progress.$inferSelect & { lesson: typeof lessons.$inferSelect }>()),
      },
    },
    markComplete: {
      method: 'POST' as const,
      path: '/api/lessons/:id/complete',
      input: z.object({ completed: z.boolean() }),
      responses: {
        200: z.custom<typeof progress.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  quizzes: {
    list: {
      method: 'GET' as const,
      path: '/api/quizzes',
      responses: {
        200: z.array(z.custom<typeof quizzes.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/quizzes/:id',
      responses: {
        200: z.custom<typeof quizzes.$inferSelect & { questions: typeof quizQuestions.$inferSelect[] }>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/quizzes',
      input: insertQuizSchema,
      responses: {
        201: z.custom<typeof quizzes.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    questions: {
      list: {
        method: 'GET' as const,
        path: '/api/quizzes/:id/questions',
        responses: {
          200: z.array(z.custom<typeof quizQuestions.$inferSelect>()),
        },
      },
      create: {
        method: 'POST' as const,
        path: '/api/quizzes/:id/questions',
        input: insertQuizQuestionSchema,
        responses: {
          201: z.custom<typeof quizQuestions.$inferSelect>(),
          400: errorSchemas.validation,
        },
      },
    },
    attempts: {
      submit: {
        method: 'POST' as const,
        path: '/api/quizzes/:id/attempts',
        input: insertQuizAttemptSchema,
        responses: {
          201: z.custom<typeof quizAttempts.$inferSelect>(),
          400: errorSchemas.validation,
        },
      },
      list: {
        method: 'GET' as const,
        path: '/api/quizzes/:id/attempts',
        responses: {
          200: z.array(z.custom<typeof quizAttempts.$inferSelect>()),
        },
      },
      userAttempts: {
        method: 'GET' as const,
        path: '/api/users/attempts',
        responses: {
          200: z.array(z.custom<typeof quizAttempts.$inferSelect>()),
        },
      },
    },
  },
  gamification: {
    userStats: {
      get: {
        method: 'GET' as const,
        path: '/api/users/stats',
        responses: {
          200: z.custom<typeof userStats.$inferSelect>(),
          404: errorSchemas.notFound,
        },
      },
      update: {
        method: 'PUT' as const,
        path: '/api/users/stats',
        input: insertUserStatsSchema.partial(),
        responses: {
          200: z.custom<typeof userStats.$inferSelect>(),
          400: errorSchemas.validation,
        },
      },
    },
    achievements: {
      list: {
        method: 'GET' as const,
        path: '/api/achievements',
        responses: {
          200: z.array(z.custom<typeof achievements.$inferSelect>()),
        },
      },
      userAchievements: {
        method: 'GET' as const,
        path: '/api/users/achievements',
        responses: {
          200: z.array(z.custom<typeof userAchievements.$inferSelect & { achievement: typeof achievements.$inferSelect }>()),
        },
      },
      unlock: {
        method: 'POST' as const,
        path: '/api/users/achievements/:id/unlock',
        responses: {
          201: z.custom<typeof userAchievements.$inferSelect>(),
          404: errorSchemas.notFound,
        },
      },
    },
    dailyGoals: {
      get: {
        method: 'GET' as const,
        path: '/api/users/daily-goals/:date',
        responses: {
          200: z.custom<typeof dailyGoals.$inferSelect>(),
          404: errorSchemas.notFound,
        },
      },
      update: {
        method: 'PUT' as const,
        path: '/api/users/daily-goals/:date',
        input: insertDailyGoalSchema.partial(),
        responses: {
          200: z.custom<typeof dailyGoals.$inferSelect>(),
          400: errorSchemas.validation,
        },
      },
    },
    leaderboard: {
      get: {
        method: 'GET' as const,
        path: '/api/leaderboard',
        responses: {
          200: z.array(z.custom<typeof leaderboard.$inferSelect & { user: typeof users.$inferSelect }>()),
        },
      },
    },
  },
  scenarios: {
    list: {
      method: 'GET' as const,
      path: '/api/scenarios',
      responses: {
        200: z.array(z.custom<typeof scenarios.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/scenarios/:id',
      responses: {
        200: z.custom<typeof scenarios.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/scenarios',
      input: insertScenarioSchema,
      responses: {
        201: z.custom<typeof scenarios.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    progress: {
      get: {
        method: 'GET' as const,
        path: '/api/scenarios/:id/progress',
        responses: {
          200: z.custom<typeof scenarioProgress.$inferSelect>(),
          404: errorSchemas.notFound,
        },
      },
      update: {
        method: 'PUT' as const,
        path: '/api/scenarios/:id/progress',
        input: insertScenarioSchema.partial(),
        responses: {
          200: z.custom<typeof scenarioProgress.$inferSelect>(),
          400: errorSchemas.validation,
        },
      },
      userProgress: {
        method: 'GET' as const,
        path: '/api/users/scenario-progress',
        responses: {
          200: z.array(z.custom<typeof scenarioProgress.$inferSelect & { scenario: typeof scenarios.$inferSelect }>()),
        },
      },
    },
  },
  certifications: {
    userCertifications: {
      method: 'GET' as const,
      path: '/api/users/certifications',
      responses: {
        200: z.array(z.custom<typeof certifications.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/certifications',
      input: insertCertificationSchema,
      responses: {
        201: z.custom<typeof certifications.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
