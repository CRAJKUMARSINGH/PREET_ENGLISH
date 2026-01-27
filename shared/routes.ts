import { z } from "zod";
import {
  insertUserSchema, insertLessonSchema, insertVocabularySchema, insertProgressSchema,
  insertSpeakingSessionSchema, insertSpeakingAttemptSchema, insertUserSpeakingProfileSchema,
  insertPronunciationProgressSchema, insertCulturalScenarioProgressSchema,
  insertConversationSchema, insertMessageSchema, insertActivityFeedSchema, insertContentRatingSchema,
  lessons, vocabulary, progress, userStats, scenarios, stories, listenings, speakingTopics,
  conversations, messages, speakingSessions, speakingAttempts, userSpeakingProfiles,
  pronunciationProgress, culturalScenarioProgress, activityFeed, contentRatings, users
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
  },
  stories: {
    list: {
      method: 'GET' as const,
      path: '/api/stories',
      responses: {
        200: z.array(z.custom<typeof stories.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/stories/:id',
      responses: {
        200: z.custom<typeof stories.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  speakingPractice: {
    sessions: {
      list: {
        method: 'GET' as const,
        path: '/api/speaking/sessions',
        responses: {
          200: z.array(z.custom<typeof speakingSessions.$inferSelect & { 
            lesson?: typeof lessons.$inferSelect,
            scenario?: typeof scenarios.$inferSelect,
            attempts: typeof speakingAttempts.$inferSelect[]
          }>()),
        },
      },
      get: {
        method: 'GET' as const,
        path: '/api/speaking/sessions/:id',
        responses: {
          200: z.custom<typeof speakingSessions.$inferSelect & { 
            attempts: typeof speakingAttempts.$inferSelect[]
          }>(),
          404: errorSchemas.notFound,
        },
      },
      create: {
        method: 'POST' as const,
        path: '/api/speaking/sessions',
        input: insertSpeakingSessionSchema,
        responses: {
          201: z.custom<typeof speakingSessions.$inferSelect>(),
          400: errorSchemas.validation,
        },
      },
    },
    attempts: {
      create: {
        method: 'POST' as const,
        path: '/api/speaking/sessions/:sessionId/attempts',
        input: insertSpeakingAttemptSchema,
        responses: {
          201: z.custom<typeof speakingAttempts.$inferSelect>(),
          400: errorSchemas.validation,
        },
      },
    },
    profiles: {
      get: {
        method: 'GET' as const,
        path: '/api/speaking/profile',
        responses: {
          200: z.custom<typeof userSpeakingProfiles.$inferSelect>(),
          404: errorSchemas.notFound,
        },
      },
      create: {
        method: 'POST' as const,
        path: '/api/speaking/profile',
        input: insertUserSpeakingProfileSchema,
        responses: {
          201: z.custom<typeof userSpeakingProfiles.$inferSelect>(),
          400: errorSchemas.validation,
        },
      },
    },
  },
  chat: {
    conversations: {
      list: {
        method: 'GET' as const,
        path: '/api/conversations',
        responses: {
          200: z.array(z.custom<typeof conversations.$inferSelect>()),
        },
      },
      get: {
        method: 'GET' as const,
        path: '/api/conversations/:id',
        responses: {
          200: z.custom<typeof conversations.$inferSelect & { messages: typeof messages.$inferSelect[] }>(),
          404: errorSchemas.notFound,
        },
      },
      create: {
        method: 'POST' as const,
        path: '/api/conversations',
        responses: {
          201: z.custom<typeof conversations.$inferSelect>(),
        },
      },
      sendMessage: {
        method: 'POST' as const,
        path: '/api/conversations/:id/messages',
        input: z.object({ content: z.string() }),
        responses: {
          200: z.any(), // Streaming response
        },
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
