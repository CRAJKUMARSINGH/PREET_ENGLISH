import { z } from 'zod';
// Schema definitions for PREET_ENGLISH
export var schemas = {
    // User registration
    register: z.object({
        username: z.string()
            .min(3, 'Username must be at least 3 characters')
            .max(20, 'Username must be at most 20 characters')
            .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
        email: z.string()
            .email('Invalid email address')
            .max(100, 'Email too long'),
        password: z.string()
            .min(8, 'Password must be at least 8 characters')
            .max(100, 'Password too long')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
            .regex(/[0-9]/, 'Password must contain at least one number'),
    }),
    // User login
    login: z.object({
        username: z.string().min(1, 'Username required'),
        password: z.string().min(1, 'Password required'),
    }),
    // Lesson completion
    lessonComplete: z.object({
        lessonId: z.number().int().positive(),
        score: z.number().min(0).max(100),
        timeSpent: z.number().int().positive().max(7200), // Max 2 hours
        answers: z.array(z.any()).optional(),
    }),
    // Pronunciation attempt
    pronunciationAttempt: z.object({
        lessonId: z.number().int().positive(),
        text: z.string().max(1000),
        audioData: z.string().optional(), // Base64 encoded audio
    }),
    // Story generation for AI features
    storyGeneration: z.object({
        difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
        topic: z.string().max(100).optional(),
        length: z.enum(['short', 'medium', 'long']).default('medium'),
        hindiContext: z.boolean().default(true),
    }),
    // Progress update
    progressUpdate: z.object({
        lessonId: z.number().int().positive(),
        xpGained: z.number().int().min(0).max(1000),
        streakDay: z.number().int().min(0),
    }),
    // Speaking session
    speakingSession: z.object({
        topicId: z.number().int().positive(),
        duration: z.number().int().positive().max(1800), // Max 30 minutes
        confidence: z.number().min(0).max(100).optional(),
    }),
};
// Validation middleware factory
export function validate(schema) {
    return function (req, res, next) {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    error: 'Validation failed',
                    details: error.errors.map(function (e) { return ({
                        field: e.path.join('.'),
                        message: e.message,
                    }); }),
                });
            }
            next(error);
        }
    };
}
// Sanitization helpers
export function sanitizeHtml(input) {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}
export function sanitizeFilename(filename) {
    return filename
        .replace(/[^a-zA-Z0-9._-]/g, '_')
        .substring(0, 255);
}
// Hindi text validation (allows Devanagari script)
export function validateHindiText(text) {
    // Allow English, Hindi (Devanagari), numbers, and common punctuation
    var hindiPattern = /^[\u0900-\u097F\u0020-\u007E\s.,!?;:'"()-]+$/;
    return hindiPattern.test(text);
}
// Validate lesson content structure
export var lessonContentSchema = z.object({
    title: z.string().min(1).max(200),
    titleHindi: z.string().min(1).max(200),
    description: z.string().min(1).max(500),
    descriptionHindi: z.string().min(1).max(500),
    vocabulary: z.array(z.object({
        word: z.string().min(1).max(50),
        hindi: z.string().min(1).max(100),
        example: z.string().min(1).max(200),
        exampleHindi: z.string().min(1).max(200),
    })).min(8).max(15),
    exercises: z.array(z.object({
        type: z.enum(['multiple-choice', 'fill-blank', 'rearrange', 'speaking']),
        question: z.string().min(1).max(300),
        questionHindi: z.string().min(1).max(300),
        options: z.array(z.string()).optional(),
        correctAnswer: z.string().min(1).max(200),
    })).min(3).max(5),
});
