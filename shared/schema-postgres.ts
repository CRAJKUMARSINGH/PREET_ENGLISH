/**
 * PostgreSQL Schema for PREET_ENGLISH
 * 
 * This schema is compatible with PostgreSQL and designed for Vercel deployment.
 * It converts SQLite-specific types to PostgreSQL equivalents.
 */

import { pgTable, text, integer, boolean, timestamp, serial, jsonb, date, varchar, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Lessons table
export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  difficulty: varchar("difficulty", { length: 50 }).notNull(),
  order: integer("order").notNull(),
  imageUrl: varchar("image_url", { length: 500 }),
  emojiTheme: varchar("emoji_theme", { length: 10 }),
  hindiTitle: varchar("hindi_title", { length: 255 }),
  hindiDescription: text("hindi_description"),
  category: varchar("category", { length: 100 }).notNull().default("General"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Vocabulary table
export const vocabulary = pgTable("vocabulary", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").notNull().references(() => lessons.id, { onDelete: "cascade" }),
  word: varchar("word", { length: 255 }).notNull(),
  pronunciation: varchar("pronunciation", { length: 255 }),
  definition: text("definition").notNull(),
  example: text("example").notNull(),
  hindiTranslation: varchar("hindi_translation", { length: 255 }),
  hindiPronunciation: varchar("hindi_pronunciation", { length: 255 }),
  exampleHindi: text("example_hindi"),
  usageHindi: text("usage_hindi"),
  audioUrl: varchar("audio_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Conversation Lines table
export const conversationLines = pgTable("conversation_lines", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").notNull().references(() => lessons.id, { onDelete: "cascade" }),
  speaker: varchar("speaker", { length: 100 }).notNull(),
  englishText: text("english_text").notNull(),
  hindiText: text("hindi_text").notNull(),
  emoji: varchar("emoji", { length: 10 }),
  lineOrder: integer("line_order").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Progress table
export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  lessonId: integer("lesson_id").notNull().references(() => lessons.id, { onDelete: "cascade" }),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at").defaultNow(),
}, (table) => ({
  userLessonUnique: unique().on(table.userId, table.lessonId),
}));

// Quizzes table
export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  titleHindi: varchar("title_hindi", { length: 255 }),
  description: text("description"),
  difficulty: varchar("difficulty", { length: 50 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  passingScore: integer("passing_score").default(70),
  timeLimit: integer("time_limit"),
  order: integer("order").notNull(),
  lessonId: integer("lesson_id").references(() => lessons.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Quiz Questions table
export const quizQuestions = pgTable("quiz_questions", {
  id: serial("id").primaryKey(),
  quizId: integer("quiz_id").notNull().references(() => quizzes.id, { onDelete: "cascade" }),
  questionText: text("question_text").notNull(),
  questionTextHindi: text("question_text_hindi"),
  questionType: varchar("question_type", { length: 50 }).notNull(),
  options: jsonb("options"),
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation"),
  points: integer("points").default(10),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Quiz Attempts table
export const quizAttempts = pgTable("quiz_attempts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  quizId: integer("quiz_id").notNull().references(() => quizzes.id, { onDelete: "cascade" }),
  score: integer("score").notNull(),
  totalPoints: integer("total_points").notNull(),
  percentage: integer("percentage").notNull(),
  passed: boolean("passed").default(false),
  answers: jsonb("answers"),
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// User Stats table (Gamification)
export const userStats = pgTable("user_stats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
  xpPoints: integer("xp_points").default(0),
  level: integer("level").default(1),
  currentStreak: integer("current_streak").default(0),
  longestStreak: integer("longest_streak").default(0),
  lastActiveDate: date("last_active_date"),
  totalLessonsCompleted: integer("total_lessons_completed").default(0),
  totalQuizzesPassed: integer("total_quizzes_passed").default(0),
  totalMinutesLearned: integer("total_minutes_learned").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Achievements table
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  nameHindi: varchar("name_hindi", { length: 255 }),
  description: text("description").notNull(),
  descriptionHindi: text("description_hindi"),
  icon: varchar("icon", { length: 50 }).notNull(),
  xpReward: integer("xp_reward").default(50),
  requirement: jsonb("requirement").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// User Achievements table
export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  achievementId: integer("achievement_id").notNull().references(() => achievements.id, { onDelete: "cascade" }),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
}, (table) => ({
  userAchievementUnique: unique().on(table.userId, table.achievementId),
}));

// Daily Goals table
export const dailyGoals = pgTable("daily_goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  date: date("date").notNull(),
  lessonsTarget: integer("lessons_target").default(3),
  lessonsCompleted: integer("lessons_completed").default(0),
  xpTarget: integer("xp_target").default(50),
  xpEarned: integer("xp_earned").default(0),
  minutesTarget: integer("minutes_target").default(15),
  minutesSpent: integer("minutes_spent").default(0),
  completed: boolean("completed").default(false),
}, (table) => ({
  userDateUnique: unique().on(table.userId, table.date),
}));

// Leaderboard table
export const leaderboard = pgTable("leaderboard", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  weekStart: date("week_start").notNull(),
  xpEarned: integer("xp_earned").default(0),
  lessonsCompleted: integer("lessons_completed").default(0),
  rank: integer("rank"),
}, (table) => ({
  userWeekUnique: unique().on(table.userId, table.weekStart),
}));

// Scenarios table
export const scenarios = pgTable("scenarios", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  titleHindi: varchar("title_hindi", { length: 255 }),
  description: text("description").notNull(),
  descriptionHindi: text("description_hindi"),
  yourRole: varchar("your_role", { length: 255 }),
  yourRoleHindi: varchar("your_role_hindi", { length: 255 }),
  partnerRole: varchar("partner_role", { length: 255 }),
  partnerRoleHindi: varchar("partner_role_hindi", { length: 255 }),
  category: varchar("category", { length: 100 }).notNull(),
  difficulty: varchar("difficulty", { length: 50 }).notNull(),
  dialogues: jsonb("dialogues").notNull(),
  tips: jsonb("tips"),
  xpReward: integer("xp_reward").default(30),
  createdAt: timestamp("created_at").defaultNow(),
});

// Scenario Progress table
export const scenarioProgress = pgTable("scenario_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  scenarioId: integer("scenario_id").notNull().references(() => scenarios.id, { onDelete: "cascade" }),
  completed: boolean("completed").default(false),
  score: integer("score"),
  completedAt: timestamp("completed_at"),
}, (table) => ({
  userScenarioUnique: unique().on(table.userId, table.scenarioId),
}));

// Vocabulary Progress table (SRS)
export const vocabularyProgress = pgTable("vocabulary_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  vocabularyId: integer("vocabulary_id").notNull().references(() => vocabulary.id, { onDelete: "cascade" }),
  interval: integer("interval").default(0),
  easeFactor: integer("ease_factor").default(250),
  repetition: integer("repetition").default(0),
  nextReviewDate: timestamp("next_review_date").notNull(),
  lastReviewedAt: timestamp("last_reviewed_at").defaultNow(),
}, (table) => ({
  userVocabUnique: unique().on(table.userId, table.vocabularyId),
}));

// Stories table
export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  titleHindi: varchar("title_hindi", { length: 255 }),
  description: text("description").notNull(),
  descriptionHindi: text("description_hindi"),
  content: text("content").notNull(),
  contentHindi: text("content_hindi"),
  imageUrl: varchar("image_url", { length: 500 }),
  difficulty: varchar("difficulty", { length: 50 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  order: integer("order").notNull().default(0),
  vocabulary: jsonb("vocabulary"),
  xpReward: integer("xp_reward").default(50),
  createdAt: timestamp("created_at").defaultNow(),
});

// Listening Lessons table
export const listenings = pgTable("listenings", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  titleHindi: varchar("title_hindi", { length: 255 }),
  description: text("description").notNull(),
  descriptionHindi: text("description_hindi"),
  difficulty: varchar("difficulty", { length: 50 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  audioText: text("audio_text").notNull(),
  audioTextHindi: text("audio_text_hindi"),
  duration: varchar("duration", { length: 20 }),
  questions: jsonb("questions").notNull(),
  vocabulary: jsonb("vocabulary"),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Speaking Topics table
export const speakingTopics = pgTable("speaking_topics", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  hindiTitle: varchar("hindi_title", { length: 255 }),
  difficulty: varchar("difficulty", { length: 50 }).notNull(),
  emoji: varchar("emoji", { length: 10 }),
  category: varchar("category", { length: 100 }).notNull(),
  hindiThoughts: jsonb("hindi_thoughts"),
  sentenceFrames: jsonb("sentence_frames"),
  modelAnswer: text("model_answer"),
  freePrompt: text("free_prompt"),
  confidenceTip: text("confidence_tip"),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Activity Feed table
export const activityFeed = pgTable("activity_feed", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 50 }).notNull(),
  referenceId: integer("reference_id"),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Content Ratings table
export const contentRatings = pgTable("content_ratings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  contentType: varchar("content_type", { length: 50 }).notNull(),
  contentId: integer("content_id").notNull(),
  rating: integer("rating").notNull(),
  review: text("review"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  userContentUnique: unique().on(table.userId, table.contentType, table.contentId),
}));

// Certifications table
export const certifications = pgTable("certifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  level: varchar("level", { length: 100 }).notNull(),
  earnedAt: timestamp("earned_at").defaultNow(),
  lessonsCompleted: integer("lessons_completed").notNull(),
  quizzesPassed: integer("quizzes_passed").notNull(),
  averageScore: integer("average_score").notNull(),
});

// Session storage table (for production session management)
export const userSessions = pgTable("user_sessions", {
  sid: varchar("sid").primaryKey(),
  sess: jsonb("sess").notNull(),
  expire: timestamp("expire", { precision: 6 }).notNull(),
});

// Relations (same as SQLite version)
export const lessonsRelations = relations(lessons, ({ many }) => ({
  vocabulary: many(vocabulary),
  conversationLines: many(conversationLines),
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

export const quizzesRelations = relations(quizzes, ({ many }) => ({
  questions: many(quizQuestions),
  attempts: many(quizAttempts),
}));

export const quizQuestionsRelations = relations(quizQuestions, ({ one }) => ({
  quiz: one(quizzes, {
    fields: [quizQuestions.quizId],
    references: [quizzes.id],
  }),
}));

export const quizAttemptsRelations = relations(quizAttempts, ({ one }) => ({
  user: one(users, {
    fields: [quizAttempts.userId],
    references: [users.id],
  }),
  quiz: one(quizzes, {
    fields: [quizAttempts.quizId],
    references: [quizzes.id],
  }),
}));

export const certificationsRelations = relations(certifications, ({ one }) => ({
  user: one(users, {
    fields: [certifications.userId],
    references: [users.id],
  }),
}));

export const userStatsRelations = relations(userStats, ({ one }) => ({
  user: one(users, {
    fields: [userStats.userId],
    references: [users.id],
  }),
}));

export const userAchievementsRelations = relations(userAchievements, ({ one }) => ({
  user: one(users, {
    fields: [userAchievements.userId],
    references: [users.id],
  }),
  achievement: one(achievements, {
    fields: [userAchievements.achievementId],
    references: [achievements.id],
  }),
}));

export const dailyGoalsRelations = relations(dailyGoals, ({ one }) => ({
  user: one(users, {
    fields: [dailyGoals.userId],
    references: [users.id],
  }),
}));

export const leaderboardRelations = relations(leaderboard, ({ one }) => ({
  user: one(users, {
    fields: [leaderboard.userId],
    references: [users.id],
  }),
}));

export const scenarioProgressRelations = relations(scenarioProgress, ({ one }) => ({
  user: one(users, {
    fields: [scenarioProgress.userId],
    references: [users.id],
  }),
  scenario: one(scenarios, {
    fields: [scenarioProgress.scenarioId],
    references: [scenarios.id],
  }),
}));

export const vocabularyProgressRelations = relations(vocabularyProgress, ({ one }) => ({
  user: one(users, {
    fields: [vocabularyProgress.userId],
    references: [users.id],
  }),
  word: one(vocabulary, {
    fields: [vocabularyProgress.vocabularyId],
    references: [vocabulary.id],
  }),
}));

export const activityFeedRelations = relations(activityFeed, ({ one }) => ({
  user: one(users, { fields: [activityFeed.userId], references: [users.id] }),
}));

export const contentRatingsRelations = relations(contentRatings, ({ one }) => ({
  user: one(users, { fields: [contentRatings.userId], references: [users.id] }),
}));

// Insert schemas (Zod validation)
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertLessonSchema = createInsertSchema(lessons).omit({ id: true, createdAt: true });
export const insertVocabularySchema = createInsertSchema(vocabulary).omit({ id: true, createdAt: true });
export const insertConversationLineSchema = createInsertSchema(conversationLines).omit({ id: true, createdAt: true });
export const insertProgressSchema = createInsertSchema(progress).omit({ id: true, completedAt: true });
export const insertQuizSchema = createInsertSchema(quizzes).omit({ id: true, createdAt: true });
export const insertQuizQuestionSchema = createInsertSchema(quizQuestions).omit({ id: true, createdAt: true });
export const insertQuizAttemptSchema = createInsertSchema(quizAttempts).omit({ id: true, startedAt: true });
export const insertCertificationSchema = createInsertSchema(certifications).omit({ id: true, earnedAt: true });
export const insertUserStatsSchema = createInsertSchema(userStats).omit({ id: true, createdAt: true });
export const insertAchievementSchema = createInsertSchema(achievements).omit({ id: true, createdAt: true });
export const insertUserAchievementSchema = createInsertSchema(userAchievements).omit({ id: true });
export const insertDailyGoalSchema = createInsertSchema(dailyGoals).omit({ id: true });
export const insertLeaderboardSchema = createInsertSchema(leaderboard).omit({ id: true });
export const insertScenarioSchema = createInsertSchema(scenarios).omit({ id: true, createdAt: true });
export const insertScenarioProgressSchema = createInsertSchema(scenarioProgress).omit({ id: true });
export const insertVocabularyProgressSchema = createInsertSchema(vocabularyProgress).omit({ id: true, lastReviewedAt: true });
export const insertStorySchema = createInsertSchema(stories).omit({ id: true, createdAt: true });
export const insertListeningSchema = createInsertSchema(listenings).omit({ id: true, createdAt: true });
export const insertSpeakingTopicSchema = createInsertSchema(speakingTopics).omit({ id: true, createdAt: true });
export const insertActivityFeedSchema = createInsertSchema(activityFeed).omit({ id: true, createdAt: true });
export const insertContentRatingSchema = createInsertSchema(contentRatings).omit({ id: true, createdAt: true });

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type Vocabulary = typeof vocabulary.$inferSelect;
export type InsertVocabulary = z.infer<typeof insertVocabularySchema>;
export type ConversationLine = typeof conversationLines.$inferSelect;
export type InsertConversationLine = z.infer<typeof insertConversationLineSchema>;
export type Progress = typeof progress.$inferSelect;
export type Quiz = typeof quizzes.$inferSelect;
export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type InsertQuizQuestion = z.infer<typeof insertQuizQuestionSchema>;
export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type InsertQuizAttempt = z.infer<typeof insertQuizAttemptSchema>;
export type Certification = typeof certifications.$inferSelect;
export type InsertCertification = z.infer<typeof insertCertificationSchema>;
export type UserStats = typeof userStats.$inferSelect;
export type InsertUserStats = z.infer<typeof insertUserStatsSchema>;
export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type UserAchievement = typeof userAchievements.$inferSelect;
export type DailyGoal = typeof dailyGoals.$inferSelect;
export type Leaderboard = typeof leaderboard.$inferSelect;
export type Scenario = typeof scenarios.$inferSelect;
export type InsertScenario = z.infer<typeof insertScenarioSchema>;
export type ScenarioProgress = typeof scenarioProgress.$inferSelect;
export type VocabularyProgress = typeof vocabularyProgress.$inferSelect;
export type InsertVocabularyProgress = z.infer<typeof insertVocabularyProgressSchema>;
export type Story = typeof stories.$inferSelect;
export type InsertStory = z.infer<typeof insertStorySchema>;
export type Listening = typeof listenings.$inferSelect;
export type InsertListening = z.infer<typeof insertListeningSchema>;
export type SpeakingTopic = typeof speakingTopics.$inferSelect;
export type InsertSpeakingTopic = z.infer<typeof insertSpeakingTopicSchema>;
export type ActivityFeed = typeof activityFeed.$inferSelect;
export type InsertActivityFeed = z.infer<typeof insertActivityFeedSchema>;
export type ContentRating = typeof contentRatings.$inferSelect;
export type InsertContentRating = z.infer<typeof insertContentRatingSchema>;