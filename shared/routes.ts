import { z } from "zod";
import { insertUserSchema, insertLessonSchema, insertVocabularySchema, insertProgressSchema, lessons, vocabulary, progress } from "./schema";

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
