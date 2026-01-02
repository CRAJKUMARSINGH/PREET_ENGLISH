import express from 'express';
import request from 'supertest';
import { registerRoutes } from '../../server/routes';

jest.setTimeout(300_000); // allow up to 5 minutes for full DB sweep

/**
 * DB-wide lesson integrity test
 *
 * This test uses the real storage + SQLite database (no mocks) and ensures that:
 * - GET /api/lessons returns the full lesson list from the DB
 * - Every lesson id returned from that list can be fetched individually via
 *   GET /api/lessons/:id and parsed without error
 */
describe('DB-wide lesson integrity via API', () => {
  let app: express.Express;
  let lessons: Array<{
    id: number;
    title: string;
    slug: string;
    description: string;
    content: string;
    difficulty: string;
    order: number;
    category?: string;
  }> = [];

  beforeAll(async () => {
    app = express();
    app.use(express.json());
    
    // Register routes without creating HTTP server - supertest will handle this
    await registerRoutes(null, app);

    const listRes = await request(app).get('/api/lessons');
    expect(listRes.status).toBe(200);
    expect(Array.isArray(listRes.body)).toBe(true);

    lessons = listRes.body as typeof lessons;
    expect(lessons.length).toBeGreaterThan(0);
  });

  it('can fetch and parse every lesson via GET /api/lessons/:id', async () => {
    for (const lesson of lessons) {
      const res = await request(app).get(`/api/lessons/${lesson.id}`);
      expect(res.status).toBe(200);

      const body = res.body as {
        id: number;
        title: string;
        content: string;
        description: string;
        vocabulary: any[];
      };

      // Basic shape checks to ensure data is well-formed and usable by the app
      expect(body.id).toBe(lesson.id);
      expect(typeof body.title).toBe('string');
      expect(body.title.length).toBeGreaterThan(0);
      expect(typeof body.description).toBe('string');
      expect(typeof body.content).toBe('string');
      expect(Array.isArray(body.vocabulary)).toBe(true);
    }
  });

  it('has strictly increasing and unique lesson.order values', () => {
    const orders = lessons.map((l) => l.order).sort((a, b) => a - b);
    // No duplicates
    const uniqueOrders = new Set(orders);
    expect(uniqueOrders.size).toBe(orders.length);
    // Strictly increasing sequence
    for (let i = 0; i < orders.length - 1; i++) {
      expect(orders[i]).toBeLessThan(orders[i + 1]);
    }
  });

  it('can fetch vocabulary for every lesson id', async () => {
    for (const lesson of lessons) {
      const res = await request(app).get(`/api/lessons/${lesson.id}/vocabulary`);
      expect(res.status).toBe(200);

      const vocab = res.body as Array<{
        id: number;
        lessonId: number;
        word: string;
        definition: string;
        example: string;
      }>;

      expect(Array.isArray(vocab)).toBe(true);

      for (const item of vocab) {
        expect(item.lessonId).toBe(lesson.id);
        expect(typeof item.word).toBe('string');
        expect(item.word.length).toBeGreaterThan(0);
        expect(typeof item.definition).toBe('string');
        expect(typeof item.example).toBe('string');
      }
    }
  });

  it('can fetch and parse all scenarios', async () => {
    const listRes = await request(app).get('/api/scenarios');
    expect(listRes.status).toBe(200);
    expect(Array.isArray(listRes.body)).toBe(true);

    const scenarios = listRes.body as Array<{
      id: number;
      title: string;
      titleHindi?: string;
      description?: string;
      descriptionHindi?: string;
      category: string;
      difficulty: string;
      dialogues: string;
      tips?: string;
    }>;

    // It is fine if there are zero scenarios in some deployments, but if present,
    // they must all be individually retrievable and structurally sound.
    for (const scenario of scenarios) {
      const res = await request(app).get(`/api/scenarios/${scenario.id}`);
      expect(res.status).toBe(200);

      const body = res.body as typeof scenario;
      expect(body.id).toBe(scenario.id);
      expect(typeof body.title).toBe('string');
      expect(body.title.length).toBeGreaterThan(0);
      expect(typeof body.category).toBe('string');
      expect(body.category.length).toBeGreaterThan(0);
      expect(typeof body.difficulty).toBe('string');

      // Dialogues and tips are JSON strings; ensure they are parsable
      expect(() => JSON.parse(body.dialogues)).not.toThrow();
      if (body.tips) {
        expect(() => JSON.parse(body.tips!)).not.toThrow();
      }
    }
  });
});
