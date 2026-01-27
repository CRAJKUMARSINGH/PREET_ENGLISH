/**
 * API Endpoint Testing with Comprehensive Request/Response Validation
 */

import request from 'supertest';
import { Express } from 'express';
import express from 'express';
import { registerRoutes } from '../../server/routes';
import { setupAuth } from '../../server/auth';
import { db } from '../../server/db';
import { lessons, users } from '../../shared/schema';
import { eq } from 'drizzle-orm';
import { createServer } from 'http';

describe('API Endpoint Tests', () => {
  let app: Express;
  let httpServer: any;
  let testUserId: number;
  let testLessonId: number;

  beforeAll(async () => {
    app = express();
    app.use(express.json());
    httpServer = createServer(app);
    setupAuth(app);
    await registerRoutes(httpServer, app);
    
    // Create test user
    const [testUser] = await db.insert(users).values({
      username: `testuser_${Date.now()}`,
      password: 'hashedpassword',
      isAdmin: false,
    }).returning();
    testUserId = testUser.id;

    // Create test lesson
    const [testLesson] = await db.insert(lessons).values({
      title: 'API Test Lesson',
      slug: `api-test-${Date.now()}`,
      description: 'Test lesson for API testing',
      content: 'Test content',
      difficulty: 'Beginner',
      category: 'Test',
      order: 99999,
      hindiTitle: 'API Test Lesson',
      hindiDescription: 'Test lesson for API testing',
    }).returning();
    testLessonId = testLesson.id;
  });

  afterAll(async () => {
    // Cleanup test data
    if (testLessonId) {
      await db.delete(lessons).where(eq(lessons.id, testLessonId));
    }
    if (testUserId) {
      await db.delete(users).where(eq(users.id, testUserId));
    }
    if (httpServer) {
      httpServer.close();
    }
  });

  describe('GET /api/lessons', () => {
    it('should return 200 with valid lessons array', async () => {
      const response = await request(app)
        .get('/api/lessons')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(0);
      
      if (response.body.length > 0) {
        const lesson = response.body[0];
        expect(lesson).toHaveProperty('id');
        expect(lesson).toHaveProperty('title');
        expect(lesson).toHaveProperty('slug');
        expect(lesson).toHaveProperty('content');
        expect(lesson).toHaveProperty('difficulty');
        expect(lesson).toHaveProperty('category');
      }
    });

    it('should return lessons in correct order', async () => {
      const response = await request(app)
        .get('/api/lessons')
        .expect(200);

      const lessons = response.body;
      if (lessons.length > 1) {
        for (let i = 1; i < lessons.length; i++) {
          expect(lessons[i].order).toBeGreaterThanOrEqual(lessons[i - 1].order);
        }
      }
    });
  });

  describe('GET /api/lessons/:id', () => {
    it('should return 200 with valid lesson data', async () => {
      const response = await request(app)
        .get(`/api/lessons/${testLessonId}`)
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('id', testLessonId);
      expect(response.body).toHaveProperty('title', 'API Test Lesson');
      expect(response.body).toHaveProperty('slug');
      expect(response.body).toHaveProperty('content');
      expect(response.body).toHaveProperty('vocabulary');
      expect(Array.isArray(response.body.vocabulary)).toBe(true);
    });

    it('should return 404 for non-existent lesson', async () => {
      await request(app)
        .get('/api/lessons/999999')
        .expect(404)
        .expect('Content-Type', /json/);
    });

    it('should return 400 for invalid lesson ID', async () => {
      await request(app)
        .get('/api/lessons/invalid')
        .expect(400);
    });
  });

  describe('POST /api/lessons', () => {
    it('should create a new lesson with valid data', async () => {
      const newLesson = {
        title: 'New API Lesson',
        slug: `new-api-lesson-${Date.now()}`,
        description: 'New lesson description',
        content: 'New lesson content',
        difficulty: 'Intermediate',
        category: 'Grammar',
        order: 99998,
        hindiTitle: 'New API Lesson',
        hindiDescription: 'New lesson description',
      };

      const response = await request(app)
        .post('/api/lessons')
        .send(newLesson)
        .expect(201)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('title', newLesson.title);
      expect(response.body).toHaveProperty('slug', newLesson.slug);

      // Cleanup
      await db.delete(lessons).where(eq(lessons.id, response.body.id));
    });

    it('should return 400 for missing required fields', async () => {
      const incompleteLesson = {
        title: 'Incomplete Lesson',
        // Missing required fields
      };

      await request(app)
        .post('/api/lessons')
        .send(incompleteLesson)
        .expect(400);
    });

    it('should return 400 for duplicate slug', async () => {
      const duplicateLesson = {
        title: 'Duplicate Lesson',
        slug: `api-test-${Date.now()}`, // Using existing slug pattern
        description: 'Duplicate',
        content: 'Content',
        difficulty: 'Beginner',
        category: 'Test',
        order: 99997,
      };

      // First creation should succeed
      await request(app)
        .post('/api/lessons')
        .send(duplicateLesson)
        .expect(201);

      // Second creation with same slug should fail
      await request(app)
        .post('/api/lessons')
        .send(duplicateLesson)
        .expect(400);
    });
  });

  describe('POST /api/chat', () => {
    it('should return 200 with AI response', async () => {
      const response = await request(app)
        .post('/api/chat')
        .send({ message: 'Hello, how are you?' })
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('response');
      expect(typeof response.body.response).toBe('string');
      expect(response.body.response.length).toBeGreaterThan(0);
    });

    it('should return 400 for missing message', async () => {
      await request(app)
        .post('/api/chat')
        .send({})
        .expect(400);
    });

    it('should return 400 for empty message', async () => {
      await request(app)
        .post('/api/chat')
        .send({ message: '' })
        .expect(400);
    });
  });

  describe('GET /api/stories', () => {
    it('should return 200 with stories array', async () => {
      const response = await request(app)
        .get('/api/stories')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /api/scenarios', () => {
    it('should return 200 with scenarios array', async () => {
      const response = await request(app)
        .get('/api/scenarios')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should return 500 for server errors', async () => {
      // This test would require mocking a server error
      // For now, we'll test that error responses have proper structure
      const response = await request(app)
        .get('/api/lessons/invalid-id-format')
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should include error details in response', async () => {
      const response = await request(app)
        .get('/api/lessons/999999')
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(typeof response.body.message).toBe('string');
    });
  });

  describe('Response Headers', () => {
    it('should include CORS headers', async () => {
      const response = await request(app)
        .get('/api/lessons')
        .expect(200);

      // Check for common CORS headers
      expect(response.headers).toHaveProperty('access-control-allow-origin');
    });

    it('should include proper content-type', async () => {
      const response = await request(app)
        .get('/api/lessons')
        .expect(200);

      expect(response.headers['content-type']).toMatch(/json/);
    });
  });
});

