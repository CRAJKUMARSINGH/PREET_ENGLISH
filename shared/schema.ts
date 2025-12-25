import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: integer("is_admin", { mode: "boolean" }).default(false),
});

export const lessons = sqliteTable("lessons", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  content: text("content").notNull(), // Markdown content
  difficulty: text("difficulty").notNull(), // Beginner, Intermediate, Advanced
  order: integer("order").notNull(),
  imageUrl: text("image_url"),
  // Enhanced fields for Hindi support
  hindiTitle: text("hindi_title"),
  hindiDescription: text("hindi_description"),
  category: text("category").notNull().default("General"),
});

export const vocabulary = sqliteTable("vocabulary", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  lessonId: integer("lesson_id").references(() => lessons.id).notNull(),
  word: text("word").notNull(),
  pronunciation: text("pronunciation"),
  definition: text("definition").notNull(),
  example: text("example").notNull(),
  // Enhanced fields for Hindi support
  hindiTranslation: text("hindi_translation"),
  hindiPronunciation: text("hindi_pronunciation"),
  audioUrl: text("audio_url"),
});

export const progress = sqliteTable("progress", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id).notNull(),
  lessonId: integer("lesson_id").references(() => lessons.id).notNull(),
  completed: integer("completed", { mode: "boolean" }).default(false),
  completedAt: text("completed_at").default("CURRENT_TIMESTAMP"),
});

// Relations
export const lessonsRelations = relations(lessons, ({ many }) => ({
  vocabulary: many(vocabulary),
}));

export const vocabularyRelations = relations(vocabulary, ({ one }) => ({
  lesson: one(lessons, {
    fields: [vocabulary.lessonId],
    references: [lessons.id],
  }),
}));

export const progressRelations = relations(progress, ({ one }) => ({
  user: one(users, {
    fields: [progress.userId],
    references: [users.id],
  }),
  lesson: one(lessons, {
    fields: [progress.lessonId],
    references: [lessons.id],
  }),
}));

// Schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertLessonSchema = createInsertSchema(lessons).omit({ id: true });
export const insertVocabularySchema = createInsertSchema(vocabulary).omit({ id: true });
export const insertProgressSchema = createInsertSchema(progress).omit({ id: true, completedAt: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type Vocabulary = typeof vocabulary.$inferSelect;
export type InsertVocabulary = z.infer<typeof insertVocabularySchema>;
export type Progress = typeof progress.$inferSelect;
