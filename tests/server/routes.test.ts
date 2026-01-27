import express from 'express';
import { createServer } from 'http';
import request from 'supertest';

// Mock storage so we can test routing behavior without touching the DB.
jest.mock('../../server/storage', () => {
  const storage = {
    // Lessons
    getLessons: jest.fn(async () => [{
      id: 1,
      title: 'Intro',
      slug: 'intro',
      description: 'Desc',
      content: '# Content',
      difficulty: 'Beginner',
      order: 1,
      imageUrl: null,
      emojiTheme: null,
      hindiTitle: 'परिचय',
      hindiDescription: 'विवरण',
      category: 'General',
    }]),
    getLesson: jest.fn(async (id: number) => id === 1 ? ({
      id: 1,
      title: 'Intro',
      slug: 'intro',
      description: 'Desc',
      content: '# Content',
      difficulty: 'Beginner',
      order: 1,
      imageUrl: null,
      emojiTheme: null,
      hindiTitle: 'परिचय',
      hindiDescription: 'विवरण',
      category: 'General',
      vocabulary: [],
    }) : undefined),
    createLesson: jest.fn(async (data: any) => ({ id: 99, ...data })),

    // Vocabulary
    getVocabularyForLesson: jest.fn(async () => []),

    // Progress
    getUserProgress: jest.fn(async () => []),
    updateProgress: jest.fn(async (_userId: number, lessonId: number, completed: boolean) => ({
      id: 1,
      userId: 1,
      lessonId,
      completed,
      completedAt: new Date().toISOString(),
    })),
    markLessonComplete: jest.fn(async (userId: number, lessonId: number, completed: boolean) => ({
      id: 1,
      userId,
      lessonId,
      completed,
      completedAt: new Date().toISOString(),
    })),

    // Search
    search: jest.fn(async () => []),

    // Quizzes
    getQuizzes: jest.fn(async () => []),
    getQuiz: jest.fn(async () => undefined),
    createQuiz: jest.fn(async (data: any) => ({ id: 1, ...data })),
    getQuizQuestions: jest.fn(async () => []),
    createQuizQuestion: jest.fn(async (data: any) => ({ id: 1, ...data })),
    submitQuizAttempt: jest.fn(async (data: any) => ({ id: 1, ...data })),
    getUserQuizAttempts: jest.fn(async () => []),

    // Gamification
    getUserStats: jest.fn(async () => undefined),
    updateUserStats: jest.fn(async (_userId: number, data: any) => ({ id: 1, userId: 1, ...data })),
    getAchievements: jest.fn(async () => []),
    createAchievement: jest.fn(async (data: any) => ({ id: 1, ...data })),
    getUserAchievements: jest.fn(async () => []),
    unlockAchievement: jest.fn(async (userId: number, achievementId: number) => ({
      id: 1,
      userId,
      achievementId,
      unlockedAt: new Date().toISOString(),
    })),
    getDailyGoal: jest.fn(async () => undefined),
    updateDailyGoal: jest.fn(async (_userId: number, date: string, data: any) => ({ id: 1, userId: 1, date, ...data })),
    getLeaderboard: jest.fn(async () => []),
  };

  return { storage };
});

import { registerRoutes } from '../../server/routes';

describe('server/routes API', () => {
  const setup = async () => {
    const app = express();
    app.use(express.json());
    const httpServer = createServer(app);
    await registerRoutes(httpServer, app);
    return app;
  };

  it('GET /api/lessons returns lessons', async () => {
    const app = await setup();
    const res = await request(app).get('/api/lessons');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].title).toBe('Intro');
  });

  it('GET /api/lessons/:id returns 404 when not found', async () => {
    const app = await setup();
    const res = await request(app).get('/api/lessons/999');
    expect(res.status).toBe(404);
  });

  it('POST /api/lessons creates lesson', async () => {
    const app = await setup();
    const payload = {
      title: 'New',
      slug: 'new',
      description: 'D',
      content: '# C',
      difficulty: 'Beginner',
      order: 10,
      category: 'General',
    };

    const res = await request(app).post('/api/lessons').send(payload);
    expect(res.status).toBe(201);
    expect(res.body.slug).toBe('new');
  });

  it('POST /api/lessons/:id/complete marks progress', async () => {
    const app = await setup();
    const res = await request(app).post('/api/lessons/1/complete').send({ completed: true });
    expect(res.status).toBe(200);
    expect(res.body.lessonId).toBe(1);
    expect(res.body.completed).toBe(true);
  });

  it('GET /api/quizzes returns quizzes', async () => {
    const app = await setup();
    const res = await request(app).get('/api/quizzes');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/users/stats returns 404 when stats missing', async () => {
    const app = await setup();
    const res = await request(app).get('/api/users/stats');
    expect(res.status).toBe(404);
  });

  it('PUT /api/users/stats updates stats', async () => {
    const app = await setup();
    const res = await request(app).put('/api/users/stats').send({ xpPoints: 10 });
    expect(res.status).toBe(200);
    expect(res.body.xpPoints).toBe(10);
  });
});
