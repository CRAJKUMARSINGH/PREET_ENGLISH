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

// Quiz/Assessment Tables
export const quizzes = sqliteTable("quizzes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  titleHindi: text("title_hindi"),
  description: text("description"),
  difficulty: text("difficulty").notNull(), // Beginner, Intermediate, Advanced
  category: text("category").notNull(),
  passingScore: integer("passing_score").default(70), // percentage
  timeLimit: integer("time_limit"), // in minutes, null = no limit
  order: integer("order").notNull(),
});

export const quizQuestions = sqliteTable("quiz_questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  quizId: integer("quiz_id").references(() => quizzes.id).notNull(),
  questionText: text("question_text").notNull(),
  questionTextHindi: text("question_text_hindi"),
  questionType: text("question_type").notNull(), // multiple_choice, fill_blank, true_false, translate
  options: text("options"), // JSON array for multiple choice
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation"), // Hindi explanation
  points: integer("points").default(10),
  order: integer("order").notNull(),
});

export const quizAttempts = sqliteTable("quiz_attempts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id).notNull(),
  quizId: integer("quiz_id").references(() => quizzes.id).notNull(),
  score: integer("score").notNull(),
  totalPoints: integer("total_points").notNull(),
  percentage: integer("percentage").notNull(),
  passed: integer("passed", { mode: "boolean" }).default(false),
  answers: text("answers"), // JSON of user answers
  startedAt: text("started_at").default("CURRENT_TIMESTAMP"),
  completedAt: text("completed_at"),
});

// Certification Levels
export const certifications = sqliteTable("certifications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id).notNull(),
  level: text("level").notNull(), // Basic Proficiency, Independent User, Proficient User
  earnedAt: text("earned_at").default("CURRENT_TIMESTAMP"),
  lessonsCompleted: integer("lessons_completed").notNull(),
  quizzesPassed: integer("quizzes_passed").notNull(),
  averageScore: integer("average_score").notNull(),
});

// ============ SIVI-INSPIRED GAMIFICATION FEATURES ============

// User Stats & Streaks
export const userStats = sqliteTable("user_stats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id).notNull().unique(),
  xpPoints: integer("xp_points").default(0),
  level: integer("level").default(1),
  currentStreak: integer("current_streak").default(0),
  longestStreak: integer("longest_streak").default(0),
  lastActiveDate: text("last_active_date"),
  totalLessonsCompleted: integer("total_lessons_completed").default(0),
  totalQuizzesPassed: integer("total_quizzes_passed").default(0),
  totalMinutesLearned: integer("total_minutes_learned").default(0),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

// Achievements/Badges
export const achievements = sqliteTable("achievements", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  nameHindi: text("name_hindi"),
  description: text("description").notNull(),
  descriptionHindi: text("description_hindi"),
  icon: text("icon").notNull(), // emoji or icon name
  xpReward: integer("xp_reward").default(50),
  requirement: text("requirement").notNull(), // JSON: { type: 'lessons_completed', value: 10 }
  category: text("category").notNull(), // streak, lessons, quiz, social
});

// User Achievements (unlocked)
export const userAchievements = sqliteTable("user_achievements", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id).notNull(),
  achievementId: integer("achievement_id").references(() => achievements.id).notNull(),
  unlockedAt: text("unlocked_at").default("CURRENT_TIMESTAMP"),
});

// Daily Goals
export const dailyGoals = sqliteTable("daily_goals", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id).notNull(),
  date: text("date").notNull(),
  lessonsTarget: integer("lessons_target").default(3),
  lessonsCompleted: integer("lessons_completed").default(0),
  xpTarget: integer("xp_target").default(50),
  xpEarned: integer("xp_earned").default(0),
  minutesTarget: integer("minutes_target").default(15),
  minutesSpent: integer("minutes_spent").default(0),
  completed: integer("completed", { mode: "boolean" }).default(false),
});

// Leaderboard (weekly reset)
export const leaderboard = sqliteTable("leaderboard", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id).notNull(),
  weekStart: text("week_start").notNull(),
  xpEarned: integer("xp_earned").default(0),
  lessonsCompleted: integer("lessons_completed").default(0),
  rank: integer("rank"),
});

// Conversation Scenarios (for roleplay practice)
export const scenarios = sqliteTable("scenarios", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  titleHindi: text("title_hindi"),
  description: text("description"),
  descriptionHindi: text("description_hindi"),
  category: text("category").notNull(), // job_interview, doctor_visit, restaurant, etc.
  difficulty: text("difficulty").notNull(),
  dialogues: text("dialogues").notNull(), // JSON array of dialogue exchanges
  tips: text("tips"), // JSON array of tips in Hindi
  xpReward: integer("xp_reward").default(30),
});

// User Scenario Progress
export const scenarioProgress = sqliteTable("scenario_progress", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id).notNull(),
  scenarioId: integer("scenario_id").references(() => scenarios.id).notNull(),
  completed: integer("completed", { mode: "boolean" }).default(false),
  score: integer("score"),
  completedAt: text("completed_at"),
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

// Quiz Relations
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

// Gamification Relations
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

// Schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertLessonSchema = createInsertSchema(lessons).omit({ id: true });
export const insertVocabularySchema = createInsertSchema(vocabulary).omit({ id: true });
export const insertProgressSchema = createInsertSchema(progress).omit({ id: true, completedAt: true });
export const insertQuizSchema = createInsertSchema(quizzes).omit({ id: true });
export const insertQuizQuestionSchema = createInsertSchema(quizQuestions).omit({ id: true });
export const insertQuizAttemptSchema = createInsertSchema(quizAttempts).omit({ id: true, startedAt: true });
export const insertCertificationSchema = createInsertSchema(certifications).omit({ id: true, earnedAt: true });
export const insertUserStatsSchema = createInsertSchema(userStats).omit({ id: true, createdAt: true });
export const insertAchievementSchema = createInsertSchema(achievements).omit({ id: true });
export const insertUserAchievementSchema = createInsertSchema(userAchievements).omit({ id: true, unlockedAt: true });
export const insertDailyGoalSchema = createInsertSchema(dailyGoals).omit({ id: true });
export const insertLeaderboardSchema = createInsertSchema(leaderboard).omit({ id: true });
export const insertScenarioSchema = createInsertSchema(scenarios).omit({ id: true });
export const insertScenarioProgressSchema = createInsertSchema(scenarioProgress).omit({ id: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type Vocabulary = typeof vocabulary.$inferSelect;
export type InsertVocabulary = z.infer<typeof insertVocabularySchema>;
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
