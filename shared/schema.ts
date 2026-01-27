import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Core Tables - Minimal working schema for immediate deployment
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
  content: text("content").notNull(),
  difficulty: text("difficulty").notNull(),
  order: integer("order").notNull(),
  imageUrl: text("image_url"),
  emojiTheme: text("emoji_theme"),
  hindiTitle: text("hindi_title"),
  hindiDescription: text("hindi_description"),
  category: text("category").notNull().default("General"),
  speakingExercises: text("speaking_exercises"),
});

export const conversations = sqliteTable("conversations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  conversationId: integer("conversation_id").references(() => conversations.id).notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

export const vocabulary = sqliteTable("vocabulary", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  lessonId: integer("lesson_id").references(() => lessons.id).notNull(),
  word: text("word").notNull(),
  pronunciation: text("pronunciation"),
  definition: text("definition").notNull(),
  example: text("example").notNull(),
  hindiTranslation: text("hindi_translation"),
  hindiPronunciation: text("hindi_pronunciation"),
  exampleHindi: text("example_hindi"),
  usageHindi: text("usage_hindi"),
  audioUrl: text("audio_url"),
  pronunciationDifficulty: integer("pronunciation_difficulty").default(1),
  commonMispronunciation: text("common_mispronunciation"),
});

export const conversationLines = sqliteTable("conversation_lines", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  lessonId: integer("lesson_id").references(() => lessons.id).notNull(),
  speaker: text("speaker").notNull(),
  englishText: text("english_text").notNull(),
  hindiText: text("hindi_text").notNull(),
  emoji: text("emoji"),
  lineOrder: integer("line_order").notNull(),
});

export const progress = sqliteTable("progress", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id).notNull(),
  lessonId: integer("lesson_id").references(() => lessons.id).notNull(),
  completed: integer("completed", { mode: "boolean" }).default(false),
  completedAt: text("completed_at").default("CURRENT_TIMESTAMP"),
});

// Gamification Tables
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
  speakingMinutes: integer("speaking_minutes").default(0),
  pronunciationAccuracyAvg: integer("pronunciation_accuracy_avg").default(0),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

export const quizzes = sqliteTable("quizzes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  titleHindi: text("title_hindi"),
  description: text("description"),
  descriptionHindi: text("description_hindi"),
  difficulty: text("difficulty").notNull(),
  category: text("category").notNull(),
  passingScore: integer("passing_score").default(70),
  timeLimit: integer("time_limit"),
  order: integer("order").notNull().default(0),
  lessonId: integer("lesson_id").references(() => lessons.id),
  xpReward: integer("xp_reward").default(50),
  hintsAllowed: integer("hints_allowed", { mode: "boolean" }).default(true),
});

export const quizQuestions = sqliteTable("quiz_questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  quizId: integer("quiz_id").references(() => quizzes.id, { onDelete: "cascade" }).notNull(),
  questionText: text("question_text").notNull(),
  questionTextHindi: text("question_text_hindi"),
  questionType: text("question_type").notNull(), // 'mcq', 'fill_blank', 'rearrange', 'true_false', 'match'
  options: text("options"), // JSON string
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation"),
  explanationHindi: text("explanation_hindi"),
  points: integer("points").default(10),
  order: integer("order").notNull().default(0),
});

export const quizAttempts = sqliteTable("quiz_attempts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id).notNull(),
  quizId: integer("quiz_id").references(() => quizzes.id).notNull(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  answers: text("answers"), // JSON string of user answers
  timeSpent: integer("time_spent"), // seconds
  passed: integer("passed", { mode: "boolean" }).default(false),
  completedAt: text("completed_at").default("CURRENT_TIMESTAMP"),
});

export const scenarios = sqliteTable("scenarios", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  titleHindi: text("title_hindi"),
  description: text("description"),
  descriptionHindi: text("description_hindi"),
  yourRole: text("your_role"),
  yourRoleHindi: text("your_role_hindi"),
  partnerRole: text("partner_role"),
  partnerRoleHindi: text("partner_role_hindi"),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  dialogues: text("dialogues").notNull(),
  tips: text("tips"),
  xpReward: integer("xp_reward").default(30),
});

export const stories = sqliteTable("stories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  titleHindi: text("title_hindi"),
  description: text("description").notNull(),
  descriptionHindi: text("description_hindi"),
  content: text("content").notNull(),
  contentHindi: text("content_hindi"),
  imageUrl: text("image_url"),
  difficulty: text("difficulty").notNull(),
  category: text("category").notNull(),
  order: integer("order").notNull().default(0),
  vocabulary: text("vocabulary"),
  xpReward: integer("xp_reward").default(50),
});

export const listenings = sqliteTable("listenings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  titleHindi: text("title_hindi"),
  description: text("description").notNull(),
  descriptionHindi: text("description_hindi"),
  difficulty: text("difficulty").notNull(),
  category: text("category").notNull(),
  audioText: text("audio_text").notNull(),
  audioTextHindi: text("audio_text_hindi"),
  duration: text("duration"),
  questions: text("questions").notNull(),
  vocabulary: text("vocabulary"),
  order: integer("order").notNull().default(0),
});

export const speakingTopics = sqliteTable("speaking_topics", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  hindiTitle: text("hindi_title"),
  difficulty: text("difficulty").notNull(),
  emoji: text("emoji"),
  category: text("category").notNull(),
  hindiThoughts: text("hindi_thoughts"),
  sentenceFrames: text("sentence_frames"),
  modelAnswer: text("model_answer"),
  freePrompt: text("free_prompt"),
  confidenceTip: text("confidence_tip"),
  order: integer("order").notNull().default(0),
});

export const activityFeed = sqliteTable("activity_feed", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id).notNull(),
  type: text("type").notNull(),
  referenceId: integer("reference_id"),
  content: text("content"),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

export const contentRatings = sqliteTable("content_ratings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id).notNull(),
  contentType: text("content_type").notNull(),
  contentId: integer("content_id").notNull(),
  rating: integer("rating").notNull(),
  review: text("review"),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

// Type exports for components
export type Scenario = typeof scenarios.$inferSelect;
// QuizQuestion and QuizAttempt types are now defined above from schema tables

export type VocabularyWord = typeof vocabulary.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type User = typeof users.$inferSelect;
export type Progress = typeof progress.$inferSelect;
export type UserStats = typeof userStats.$inferSelect;
export type Conversation = typeof conversations.$inferSelect;

export const speakingSessions = sqliteTable("speaking_sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id).notNull(),
  lessonId: integer("lesson_id").references(() => lessons.id),
  scenarioId: integer("scenario_id").references(() => scenarios.id),
  sessionType: text("session_type").notNull(),
  durationSeconds: integer("duration_seconds").notNull(),
  overallScore: integer("overall_score"),
  pronunciationScore: integer("pronunciation_score"),
  fluencyScore: integer("fluency_score"),
  confidenceScore: integer("confidence_score"),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
  completedAt: text("completed_at"),
});

export const speakingAttempts = sqliteTable("speaking_attempts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: integer("session_id").references(() => speakingSessions.id).notNull(),
  expectedText: text("expected_text"),
  spokenText: text("spoken_text").notNull(),
  accuracyScore: integer("accuracy_score").notNull(),
  pronunciationIssues: text("pronunciation_issues"),
  feedbackData: text("feedback_data"),
  audioDurationMs: integer("audio_duration_ms"),
  attemptNumber: integer("attempt_number").notNull(),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

export const userSpeakingProfiles = sqliteTable("user_speaking_profiles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id).notNull().unique(),
  currentLevel: text("current_level").notNull().default("beginner"),
  weakPhonemes: text("weak_phonemes"),
  strongAreas: text("strong_areas"),
  preferredPracticeType: text("preferred_practice_type").default("mixed"),
  culturalContextPreference: text("cultural_context_preference").default("indian_english"),
  totalPracticeMinutes: integer("total_practice_minutes").default(0),
  lastAssessmentDate: text("last_assessment_date"),
  improvementRate: integer("improvement_rate").default(0),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").default("CURRENT_TIMESTAMP"),
});

export const pronunciationProgress = sqliteTable("pronunciation_progress", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id).notNull(),
  phoneme: text("phoneme").notNull(),
  accuracyHistory: text("accuracy_history"),
  practiceCount: integer("practice_count").default(0),
  lastPracticed: text("last_practiced"),
  masteryLevel: text("mastery_level").default("learning"),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

export const culturalScenarioProgress = sqliteTable("cultural_scenario_progress", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id).notNull(),
  scenarioType: text("scenario_type").notNull(),
  completionCount: integer("completion_count").default(0),
  bestScore: integer("best_score").default(0),
  confidenceLevel: integer("confidence_level").default(50),
  lastPracticed: text("last_practiced"),
  notes: text("notes"),
});

// Relations
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

export const conversationsRelations = relations(conversations, ({ one, many }) => ({
  user: one(users, {
    fields: [conversations.userId],
    references: [users.id],
  }),
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
}));

export const activityFeedRelations = relations(activityFeed, ({ one }) => ({
  user: one(users, { fields: [activityFeed.userId], references: [users.id] }),
}));

export const contentRatingsRelations = relations(contentRatings, ({ one }) => ({
  user: one(users, { fields: [contentRatings.userId], references: [users.id] }),
}));

export const speakingSessionsRelations = relations(speakingSessions, ({ one, many }) => ({
  user: one(users, {
    fields: [speakingSessions.userId],
    references: [users.id],
  }),
  lesson: one(lessons, {
    fields: [speakingSessions.lessonId],
    references: [lessons.id],
  }),
  scenario: one(scenarios, {
    fields: [speakingSessions.scenarioId],
    references: [scenarios.id],
  }),
  attempts: many(speakingAttempts),
}));

export const speakingAttemptsRelations = relations(speakingAttempts, ({ one }) => ({
  session: one(speakingSessions, {
    fields: [speakingAttempts.sessionId],
    references: [speakingSessions.id],
  }),
}));

export const userSpeakingProfilesRelations = relations(userSpeakingProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userSpeakingProfiles.userId],
    references: [users.id],
  }),
}));

export const pronunciationProgressRelations = relations(pronunciationProgress, ({ one }) => ({
  user: one(users, {
    fields: [pronunciationProgress.userId],
    references: [users.id],
  }),
}));

export const culturalScenarioProgressRelations = relations(culturalScenarioProgress, ({ one }) => ({
  user: one(users, {
    fields: [culturalScenarioProgress.userId],
    references: [users.id],
  }),
}));

// Schemas
export const insertUserSchema = createInsertSchema(users, {
  id: undefined,
});
export const insertLessonSchema = createInsertSchema(lessons, {
  id: undefined,
});
export const insertVocabularySchema = createInsertSchema(vocabulary, {
  id: undefined,
});
export const insertConversationLineSchema = createInsertSchema(conversationLines, {
  id: undefined,
});
export const insertProgressSchema = createInsertSchema(progress, {
  id: undefined,
  completedAt: undefined,
});
export const insertConversationSchema = createInsertSchema(conversations, {
  id: undefined,
  createdAt: undefined,
});
export const insertMessageSchema = createInsertSchema(messages, {
  id: undefined,
  createdAt: undefined,
});
export const insertSpeakingSessionSchema = createInsertSchema(speakingSessions, {
  id: undefined,
  createdAt: undefined,
});
export const insertSpeakingAttemptSchema = createInsertSchema(speakingAttempts, {
  id: undefined,
  createdAt: undefined,
});
export const insertUserSpeakingProfileSchema = createInsertSchema(userSpeakingProfiles, {
  id: undefined,
  createdAt: undefined,
  updatedAt: undefined,
});
export const insertPronunciationProgressSchema = createInsertSchema(pronunciationProgress, {
  id: undefined,
  createdAt: undefined,
});
export const insertCulturalScenarioProgressSchema = createInsertSchema(culturalScenarioProgress, {
  id: undefined,
});
export const insertActivityFeedSchema = createInsertSchema(activityFeed, {
  id: undefined,
  createdAt: undefined,
});
export const insertContentRatingSchema = createInsertSchema(contentRatings, {
  id: undefined,
  createdAt: undefined,
});
export const insertQuizSchema = createInsertSchema(quizzes, {
  id: undefined,
});
export const insertQuizQuestionSchema = createInsertSchema(quizQuestions, {
  id: undefined,
});
export const insertQuizAttemptSchema = createInsertSchema(quizAttempts, {
  id: undefined,
  completedAt: undefined,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type Vocabulary = typeof vocabulary.$inferSelect;
export type InsertVocabulary = z.infer<typeof insertVocabularySchema>;
export type ConversationLine = typeof conversationLines.$inferSelect;
export type InsertConversationLine = z.infer<typeof insertConversationLineSchema>;
export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Story = typeof stories.$inferSelect;
export type Listening = typeof listenings.$inferSelect;
export type SpeakingTopic = typeof speakingTopics.$inferSelect;
export type SpeakingSession = typeof speakingSessions.$inferSelect;
export type InsertSpeakingSession = z.infer<typeof insertSpeakingSessionSchema>;
export type SpeakingAttempt = typeof speakingAttempts.$inferSelect;
export type InsertSpeakingAttempt = z.infer<typeof insertSpeakingAttemptSchema>;
export type UserSpeakingProfile = typeof userSpeakingProfiles.$inferSelect;
export type InsertUserSpeakingProfile = z.infer<typeof insertUserSpeakingProfileSchema>;
export type PronunciationProgress = typeof pronunciationProgress.$inferSelect;
export type InsertPronunciationProgress = z.infer<typeof insertPronunciationProgressSchema>;
export type CulturalScenarioProgress = typeof culturalScenarioProgress.$inferSelect;
export type InsertCulturalScenarioProgress = z.infer<typeof insertCulturalScenarioProgressSchema>;
export type ActivityFeed = typeof activityFeed.$inferSelect;
export type InsertActivityFeed = z.infer<typeof insertActivityFeedSchema>;
export type ContentRating = typeof contentRatings.$inferSelect;
export type InsertContentRating = z.infer<typeof insertContentRatingSchema>;
export type Quiz = typeof quizzes.$inferSelect;
export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type InsertQuizQuestion = z.infer<typeof insertQuizQuestionSchema>;
export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type InsertQuizAttempt = z.infer<typeof insertQuizAttemptSchema>;

// --- Last One Year Revision Engine ---

export const revisionTasks = sqliteTable("revision_tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  dayNumber: integer("day_number").notNull(), // 1 to 365
  title: text("title").notNull(),
  taskType: text("task_type").notNull(), // 'lesson', 'quiz', 'story', 'speaking'
  referenceId: integer("reference_id"), // ID of the lesson/story/etc.
  description: text("description"),
  isCompleted: integer("is_completed", { mode: "boolean" }).default(false),
  dateScheduled: text("date_scheduled"), // ISO date string
});

export const insertRevisionTaskSchema = createInsertSchema(revisionTasks, {
  id: undefined,
});

export type RevisionTask = typeof revisionTasks.$inferSelect;
export type InsertRevisionTask = z.infer<typeof insertRevisionTaskSchema>;
