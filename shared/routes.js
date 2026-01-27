import { z } from "zod";
import { insertLessonSchema, insertSpeakingSessionSchema, insertSpeakingAttemptSchema, insertUserSpeakingProfileSchema } from "./schema";
export var errorSchemas = {
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
export var api = {
    lessons: {
        list: {
            method: 'GET',
            path: '/api/lessons',
            responses: {
                200: z.array(z.custom()),
            },
        },
        get: {
            method: 'GET',
            path: '/api/lessons/:id',
            responses: {
                200: z.custom(),
                404: errorSchemas.notFound,
            },
        },
        create: {
            method: 'POST',
            path: '/api/lessons',
            input: insertLessonSchema,
            responses: {
                201: z.custom(),
                400: errorSchemas.validation,
            },
        },
    },
    vocabulary: {
        list: {
            method: 'GET',
            path: '/api/lessons/:id/vocabulary',
            responses: {
                200: z.array(z.custom()),
            },
        },
    },
    progress: {
        list: {
            method: 'GET',
            path: '/api/progress',
            responses: {
                200: z.array(z.custom()),
            },
        },
        markComplete: {
            method: 'POST',
            path: '/api/lessons/:id/complete',
            input: z.object({ completed: z.boolean() }),
            responses: {
                200: z.custom(),
                404: errorSchemas.notFound,
            },
        },
    },
    scenarios: {
        list: {
            method: 'GET',
            path: '/api/scenarios',
            responses: {
                200: z.array(z.custom()),
            },
        },
        get: {
            method: 'GET',
            path: '/api/scenarios/:id',
            responses: {
                200: z.custom(),
                404: errorSchemas.notFound,
            },
        },
    },
    stories: {
        list: {
            method: 'GET',
            path: '/api/stories',
            responses: {
                200: z.array(z.custom()),
            },
        },
        get: {
            method: 'GET',
            path: '/api/stories/:id',
            responses: {
                200: z.custom(),
                404: errorSchemas.notFound,
            },
        },
    },
    speakingPractice: {
        sessions: {
            list: {
                method: 'GET',
                path: '/api/speaking/sessions',
                responses: {
                    200: z.array(z.custom()),
                },
            },
            get: {
                method: 'GET',
                path: '/api/speaking/sessions/:id',
                responses: {
                    200: z.custom(),
                    404: errorSchemas.notFound,
                },
            },
            create: {
                method: 'POST',
                path: '/api/speaking/sessions',
                input: insertSpeakingSessionSchema,
                responses: {
                    201: z.custom(),
                    400: errorSchemas.validation,
                },
            },
        },
        attempts: {
            create: {
                method: 'POST',
                path: '/api/speaking/sessions/:sessionId/attempts',
                input: insertSpeakingAttemptSchema,
                responses: {
                    201: z.custom(),
                    400: errorSchemas.validation,
                },
            },
        },
        profiles: {
            get: {
                method: 'GET',
                path: '/api/speaking/profile',
                responses: {
                    200: z.custom(),
                    404: errorSchemas.notFound,
                },
            },
            create: {
                method: 'POST',
                path: '/api/speaking/profile',
                input: insertUserSpeakingProfileSchema,
                responses: {
                    201: z.custom(),
                    400: errorSchemas.validation,
                },
            },
        },
    },
    chat: {
        conversations: {
            list: {
                method: 'GET',
                path: '/api/conversations',
                responses: {
                    200: z.array(z.custom()),
                },
            },
            get: {
                method: 'GET',
                path: '/api/conversations/:id',
                responses: {
                    200: z.custom(),
                    404: errorSchemas.notFound,
                },
            },
            create: {
                method: 'POST',
                path: '/api/conversations',
                responses: {
                    201: z.custom(),
                },
            },
            sendMessage: {
                method: 'POST',
                path: '/api/conversations/:id/messages',
                input: z.object({ content: z.string() }),
                responses: {
                    200: z.any(), // Streaming response
                },
            },
        },
    },
};
export function buildUrl(path, params) {
    var url = path;
    if (params) {
        Object.entries(params).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (url.includes(":".concat(key))) {
                url = url.replace(":".concat(key), String(value));
            }
        });
    }
    return url;
}
