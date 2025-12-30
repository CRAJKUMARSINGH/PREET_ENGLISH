import { db } from "./db";
import {
  users, lessons, vocabulary, progress, conversationLines,
  type User, type InsertUser,
  type Lesson, type InsertLesson,
  type Vocabulary, type InsertVocabulary,
  type Progress, type ConversationLine, type InsertConversationLine
} from "@shared/schema";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Lessons
  getLessons(): Promise<Lesson[]>;
  getLesson(id: number): Promise<(Lesson & { vocabulary: Vocabulary[] }) | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;

  // Vocabulary
  getVocabularyForLesson(lessonId: number): Promise<Vocabulary[]>;
  createVocabulary(vocab: InsertVocabulary): Promise<Vocabulary>;

  // Progress
  getUserProgress(userId: number): Promise<(Progress & { lesson: Lesson })[]>;
  updateProgress(userId: number, lessonId: number, completed: boolean): Promise<Progress>;

  // Search
  search(query: string): Promise<any[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getLessons(): Promise<Lesson[]> {
    return await db.select().from(lessons).orderBy(lessons.order);
  }

  async getLesson(id: number): Promise<(Lesson & { vocabulary: Vocabulary[] }) | undefined> {
    const [lesson] = await db.select().from(lessons).where(eq(lessons.id, id));
    if (!lesson) return undefined;

    const vocab = await db.select().from(vocabulary).where(eq(vocabulary.lessonId, id));
    return { ...lesson, vocabulary: vocab };
  }

  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    const [lesson] = await db.insert(lessons).values(insertLesson).returning();
    return lesson;
  }

  async getVocabularyForLesson(lessonId: number): Promise<Vocabulary[]> {
    return await db.select().from(vocabulary).where(eq(vocabulary.lessonId, lessonId));
  }

  async createVocabulary(vocab: InsertVocabulary): Promise<Vocabulary> {
    const [item] = await db.insert(vocabulary).values(vocab).returning();
    return item;
  }

  async getUserProgress(userId: number): Promise<(Progress & { lesson: Lesson })[]> {
    const results = await db
      .select({
        progress: progress,
        lesson: lessons,
      })
      .from(progress)
      .innerJoin(lessons, eq(progress.lessonId, lessons.id))
      .where(eq(progress.userId, userId));
    
    return results.map(r => ({ ...r.progress, lesson: r.lesson }));
  }

  async updateProgress(userId: number, lessonId: number, completed: boolean): Promise<Progress> {
    const [existing] = await db
      .select()
      .from(progress)
      .where(and(eq(progress.userId, userId), eq(progress.lessonId, lessonId)));

    if (existing) {
      const [updated] = await db
        .update(progress)
        .set({ completed, completedAt: new Date().toISOString() })
        .where(eq(progress.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(progress)
        .values({ userId, lessonId, completed, completedAt: new Date().toISOString() })
        .returning();
      return created;
    }
  }

  async search(query: string): Promise<any[]> {
    const lowerQuery = query.toLowerCase();
    const results: any[] = [];

    // Search lessons
    const allLessons = await db.select().from(lessons);
    const matchingLessons = allLessons.filter(lesson =>
      lesson.title.toLowerCase().includes(lowerQuery) ||
      lesson.description.toLowerCase().includes(lowerQuery) ||
      (lesson.hindiTitle && lesson.hindiTitle.includes(query)) ||
      (lesson.hindiDescription && lesson.hindiDescription.includes(query)) ||
      lesson.category.toLowerCase().includes(lowerQuery)
    );

    results.push(...matchingLessons.map(lesson => ({
      id: lesson.id,
      type: 'lesson',
      title: lesson.title,
      hindiTitle: lesson.hindiTitle,
      description: lesson.description,
      category: lesson.category,
      difficulty: lesson.difficulty
    })));

    // Search vocabulary
    const allVocab = await db.select().from(vocabulary);
    const matchingVocab = allVocab.filter(vocab =>
      vocab.word.toLowerCase().includes(lowerQuery) ||
      vocab.definition.toLowerCase().includes(lowerQuery) ||
      (vocab.hindiTranslation && vocab.hindiTranslation.includes(query))
    );

    results.push(...matchingVocab.slice(0, 10).map(vocab => ({
      id: vocab.id,
      type: 'vocabulary',
      title: vocab.word,
      hindiTitle: vocab.hindiTranslation,
      description: vocab.definition,
      category: 'Vocabulary'
    })));

    return results.slice(0, 20); // Limit to 20 results
  }
}

export const storage = new DatabaseStorage();
