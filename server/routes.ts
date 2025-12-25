import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Lessons
  app.get(api.lessons.list.path, async (req, res) => {
    const lessons = await storage.getLessons();
    res.json(lessons);
  });

  app.get(api.lessons.get.path, async (req, res) => {
    const lesson = await storage.getLesson(Number(req.params.id));
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.json(lesson);
  });

  app.post(api.lessons.create.path, async (req, res) => {
    try {
      const input = api.lessons.create.input.parse(req.body);
      const lesson = await storage.createLesson(input);
      res.status(201).json(lesson);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  // Vocabulary
  app.get(api.vocabulary.list.path, async (req, res) => {
    const vocab = await storage.getVocabularyForLesson(Number(req.params.id));
    res.json(vocab);
  });

  // Progress
  app.get(api.progress.list.path, async (req, res) => {
    // Mock user ID 1 for now until auth is added
    const userId = 1; 
    const prog = await storage.getUserProgress(userId);
    res.json(prog);
  });

  app.post(api.progress.markComplete.path, async (req, res) => {
    const userId = 1; // Mock user
    const lessonId = Number(req.params.id);
    const { completed } = req.body;
    
    const updated = await storage.updateProgress(userId, lessonId, completed);
    res.json(updated);
  });

  // Seeding
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existing = await storage.getLessons();
  if (existing.length === 0) {
    // Create mock user
    await storage.createUser({
      username: "student",
      password: "password123", // In real app, hash this!
      isAdmin: false
    });

    // Lesson 1
    const l1 = await storage.createLesson({
      title: "Introduction to Greetings",
      slug: "intro-greetings",
      description: "Learn how to say hello and introduce yourself.",
      content: "# Greetings\n\nIn this lesson, we will learn basic greetings.\n\n- **Hello**: A formal greeting.\n- **Hi**: An informal greeting.\n",
      difficulty: "Beginner",
      order: 1,
      imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80"
    });

    await storage.createVocabulary({
      lessonId: l1.id,
      word: "Hello",
      definition: "Used as a greeting or to begin a telephone conversation.",
      pronunciation: "/həˈləʊ/",
      example: "Hello, how are you?"
    });

    await storage.createVocabulary({
      lessonId: l1.id,
      word: "Morning",
      definition: "The period of time between midnight and noon, especially from sunrise to noon.",
      pronunciation: "/ˈmɔːnɪŋ/",
      example: "Good morning!"
    });

    // Lesson 2
    const l2 = await storage.createLesson({
      title: "Common Verbs",
      slug: "common-verbs",
      description: "Essential verbs for daily communication.",
      content: "# Verbs\n\nVerbs are action words.\n\n- **To be**: I am, you are, he is.\n- **To have**: I have, you have.",
      difficulty: "Beginner",
      order: 2,
      imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80"
    });
    
    await storage.createVocabulary({
      lessonId: l2.id,
      word: "Run",
      definition: "Move at a speed faster than a walk.",
      pronunciation: "/rʌn/",
      example: "I run every morning."
    });
  }
}
