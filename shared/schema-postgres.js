/**
 * PostgreSQL Schema for PREET_ENGLISH
 *
 * This schema is compatible with PostgreSQL and designed for Vercel deployment.
 * It converts SQLite-specific types to PostgreSQL equivalents.
 */
import { pgTable, text, integer, boolean, timestamp, serial, jsonb, date, varchar, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
// Users table
export var users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    isAdmin: boolean("is_admin").default(false),
    createdAt: timestamp("created_at").defaultNow(),
});
// Lessons table
export var lessons = pgTable("lessons", {
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
export var vocabulary = pgTable("vocabulary", {
    id: serial("id").primaryKey(),
    lessonId: integer("lesson_id").notNull().references(function () { return lessons.id; }, { onDelete: "cascade" }),
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
export var conversationLines = pgTable("conversation_lines", {
    id: serial("id").primaryKey(),
    lessonId: integer("lesson_id").notNull().references(function () { return lessons.id; }, { onDelete: "cascade" }),
    speaker: varchar("speaker", { length: 100 }).notNull(),
    englishText: text("english_text").notNull(),
    hindiText: text("hindi_text").notNull(),
    emoji: varchar("emoji", { length: 10 }),
    lineOrder: integer("line_order").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});
// Progress table
export var progress = pgTable("progress", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(function () { return users.id; }, { onDelete: "cascade" }),
    lessonId: integer("lesson_id").notNull().references(function () { return lessons.id; }, { onDelete: "cascade" }),
    completed: boolean("completed").default(false),
    completedAt: timestamp("completed_at").defaultNow(),
}, function (table) { return ({
    userLessonUnique: unique().on(table.userId, table.lessonId),
}); });
// Quizzes table
export var quizzes = pgTable("quizzes", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    titleHindi: varchar("title_hindi", { length: 255 }),
    description: text("description"),
    difficulty: varchar("difficulty", { length: 50 }).notNull(),
    category: varchar("category", { length: 100 }).notNull(),
    passingScore: integer("passing_score").default(70),
    timeLimit: integer("time_limit"),
    order: integer("order").notNull(),
    lessonId: integer("lesson_id").references(function () { return lessons.id; }, { onDelete: "set null" }),
    createdAt: timestamp("created_at").defaultNow(),
});
// Quiz Questions table
export var quizQuestions = pgTable("quiz_questions", {
    id: serial("id").primaryKey(),
    quizId: integer("quiz_id").notNull().references(function () { return quizzes.id; }, { onDelete: "cascade" }),
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
export var quizAttempts = pgTable("quiz_attempts", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(function () { return users.id; }, { onDelete: "cascade" }),
    quizId: integer("quiz_id").notNull().references(function () { return quizzes.id; }, { onDelete: "cascade" }),
    score: integer("score").notNull(),
    totalPoints: integer("total_points").notNull(),
    percentage: integer("percentage").notNull(),
    passed: boolean("passed").default(false),
    answers: jsonb("answers"),
    startedAt: timestamp("started_at").defaultNow(),
    completedAt: timestamp("completed_at"),
});
// User Stats table (Gamification)
export var userStats = pgTable("user_stats", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(function () { return users.id; }, { onDelete: "cascade" }).unique(),
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
export var achievements = pgTable("achievements", {
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
export var userAchievements = pgTable("user_achievements", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(function () { return users.id; }, { onDelete: "cascade" }),
    achievementId: integer("achievement_id").notNull().references(function () { return achievements.id; }, { onDelete: "cascade" }),
    unlockedAt: timestamp("unlocked_at").defaultNow(),
}, function (table) { return ({
    userAchievementUnique: unique().on(table.userId, table.achievementId),
}); });
// Daily Goals table
export var dailyGoals = pgTable("daily_goals", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(function () { return users.id; }, { onDelete: "cascade" }),
    date: date("date").notNull(),
    lessonsTarget: integer("lessons_target").default(3),
    lessonsCompleted: integer("lessons_completed").default(0),
    xpTarget: integer("xp_target").default(50),
    xpEarned: integer("xp_earned").default(0),
    minutesTarget: integer("minutes_target").default(15),
    minutesSpent: integer("minutes_spent").default(0),
    completed: boolean("completed").default(false),
}, function (table) { return ({
    userDateUnique: unique().on(table.userId, table.date),
}); });
// Leaderboard table
export var leaderboard = pgTable("leaderboard", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(function () { return users.id; }, { onDelete: "cascade" }),
    weekStart: date("week_start").notNull(),
    xpEarned: integer("xp_earned").default(0),
    lessonsCompleted: integer("lessons_completed").default(0),
    rank: integer("rank"),
}, function (table) { return ({
    userWeekUnique: unique().on(table.userId, table.weekStart),
}); });
// Scenarios table
export var scenarios = pgTable("scenarios", {
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
export var scenarioProgress = pgTable("scenario_progress", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(function () { return users.id; }, { onDelete: "cascade" }),
    scenarioId: integer("scenario_id").notNull().references(function () { return scenarios.id; }, { onDelete: "cascade" }),
    completed: boolean("completed").default(false),
    score: integer("score"),
    completedAt: timestamp("completed_at"),
}, function (table) { return ({
    userScenarioUnique: unique().on(table.userId, table.scenarioId),
}); });
// Vocabulary Progress table (SRS)
export var vocabularyProgress = pgTable("vocabulary_progress", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(function () { return users.id; }, { onDelete: "cascade" }),
    vocabularyId: integer("vocabulary_id").notNull().references(function () { return vocabulary.id; }, { onDelete: "cascade" }),
    interval: integer("interval").default(0),
    easeFactor: integer("ease_factor").default(250),
    repetition: integer("repetition").default(0),
    nextReviewDate: timestamp("next_review_date").notNull(),
    lastReviewedAt: timestamp("last_reviewed_at").defaultNow(),
}, function (table) { return ({
    userVocabUnique: unique().on(table.userId, table.vocabularyId),
}); });
// Stories table
export var stories = pgTable("stories", {
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
export var listenings = pgTable("listenings", {
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
export var speakingTopics = pgTable("speaking_topics", {
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
export var activityFeed = pgTable("activity_feed", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(function () { return users.id; }, { onDelete: "cascade" }),
    type: varchar("type", { length: 50 }).notNull(),
    referenceId: integer("reference_id"),
    content: text("content"),
    createdAt: timestamp("created_at").defaultNow(),
});
// Content Ratings table
export var contentRatings = pgTable("content_ratings", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(function () { return users.id; }, { onDelete: "cascade" }),
    contentType: varchar("content_type", { length: 50 }).notNull(),
    contentId: integer("content_id").notNull(),
    rating: integer("rating").notNull(),
    review: text("review"),
    createdAt: timestamp("created_at").defaultNow(),
}, function (table) { return ({
    userContentUnique: unique().on(table.userId, table.contentType, table.contentId),
}); });
// Certifications table
export var certifications = pgTable("certifications", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(function () { return users.id; }, { onDelete: "cascade" }),
    level: varchar("level", { length: 100 }).notNull(),
    earnedAt: timestamp("earned_at").defaultNow(),
    lessonsCompleted: integer("lessons_completed").notNull(),
    quizzesPassed: integer("quizzes_passed").notNull(),
    averageScore: integer("average_score").notNull(),
});
// Session storage table (for production session management)
export var userSessions = pgTable("user_sessions", {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire", { precision: 6 }).notNull(),
});
// Relations (same as SQLite version)
export var lessonsRelations = relations(lessons, function (_a) {
    var many = _a.many;
    return ({
        vocabulary: many(vocabulary),
        conversationLines: many(conversationLines),
    });
});
export var vocabularyRelations = relations(vocabulary, function (_a) {
    var one = _a.one;
    return ({
        lesson: one(lessons, {
            fields: [vocabulary.lessonId],
            references: [lessons.id],
        }),
    });
});
export var progressRelations = relations(progress, function (_a) {
    var one = _a.one;
    return ({
        user: one(users, {
            fields: [progress.userId],
            references: [users.id],
        }),
        lesson: one(lessons, {
            fields: [progress.lessonId],
            references: [lessons.id],
        }),
    });
});
export var quizzesRelations = relations(quizzes, function (_a) {
    var many = _a.many;
    return ({
        questions: many(quizQuestions),
        attempts: many(quizAttempts),
    });
});
export var quizQuestionsRelations = relations(quizQuestions, function (_a) {
    var one = _a.one;
    return ({
        quiz: one(quizzes, {
            fields: [quizQuestions.quizId],
            references: [quizzes.id],
        }),
    });
});
export var quizAttemptsRelations = relations(quizAttempts, function (_a) {
    var one = _a.one;
    return ({
        user: one(users, {
            fields: [quizAttempts.userId],
            references: [users.id],
        }),
        quiz: one(quizzes, {
            fields: [quizAttempts.quizId],
            references: [quizzes.id],
        }),
    });
});
export var certificationsRelations = relations(certifications, function (_a) {
    var one = _a.one;
    return ({
        user: one(users, {
            fields: [certifications.userId],
            references: [users.id],
        }),
    });
});
export var userStatsRelations = relations(userStats, function (_a) {
    var one = _a.one;
    return ({
        user: one(users, {
            fields: [userStats.userId],
            references: [users.id],
        }),
    });
});
export var userAchievementsRelations = relations(userAchievements, function (_a) {
    var one = _a.one;
    return ({
        user: one(users, {
            fields: [userAchievements.userId],
            references: [users.id],
        }),
        achievement: one(achievements, {
            fields: [userAchievements.achievementId],
            references: [achievements.id],
        }),
    });
});
export var dailyGoalsRelations = relations(dailyGoals, function (_a) {
    var one = _a.one;
    return ({
        user: one(users, {
            fields: [dailyGoals.userId],
            references: [users.id],
        }),
    });
});
export var leaderboardRelations = relations(leaderboard, function (_a) {
    var one = _a.one;
    return ({
        user: one(users, {
            fields: [leaderboard.userId],
            references: [users.id],
        }),
    });
});
export var scenarioProgressRelations = relations(scenarioProgress, function (_a) {
    var one = _a.one;
    return ({
        user: one(users, {
            fields: [scenarioProgress.userId],
            references: [users.id],
        }),
        scenario: one(scenarios, {
            fields: [scenarioProgress.scenarioId],
            references: [scenarios.id],
        }),
    });
});
export var vocabularyProgressRelations = relations(vocabularyProgress, function (_a) {
    var one = _a.one;
    return ({
        user: one(users, {
            fields: [vocabularyProgress.userId],
            references: [users.id],
        }),
        word: one(vocabulary, {
            fields: [vocabularyProgress.vocabularyId],
            references: [vocabulary.id],
        }),
    });
});
export var activityFeedRelations = relations(activityFeed, function (_a) {
    var one = _a.one;
    return ({
        user: one(users, { fields: [activityFeed.userId], references: [users.id] }),
    });
});
export var contentRatingsRelations = relations(contentRatings, function (_a) {
    var one = _a.one;
    return ({
        user: one(users, { fields: [contentRatings.userId], references: [users.id] }),
    });
});
// Insert schemas (Zod validation)
export var insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export var insertLessonSchema = createInsertSchema(lessons).omit({ id: true, createdAt: true });
export var insertVocabularySchema = createInsertSchema(vocabulary).omit({ id: true, createdAt: true });
export var insertConversationLineSchema = createInsertSchema(conversationLines).omit({ id: true, createdAt: true });
export var insertProgressSchema = createInsertSchema(progress).omit({ id: true, completedAt: true });
export var insertQuizSchema = createInsertSchema(quizzes).omit({ id: true, createdAt: true });
export var insertQuizQuestionSchema = createInsertSchema(quizQuestions).omit({ id: true, createdAt: true });
export var insertQuizAttemptSchema = createInsertSchema(quizAttempts).omit({ id: true, startedAt: true });
export var insertCertificationSchema = createInsertSchema(certifications).omit({ id: true, earnedAt: true });
export var insertUserStatsSchema = createInsertSchema(userStats).omit({ id: true, createdAt: true });
export var insertAchievementSchema = createInsertSchema(achievements).omit({ id: true, createdAt: true });
export var insertUserAchievementSchema = createInsertSchema(userAchievements).omit({ id: true });
export var insertDailyGoalSchema = createInsertSchema(dailyGoals).omit({ id: true });
export var insertLeaderboardSchema = createInsertSchema(leaderboard).omit({ id: true });
export var insertScenarioSchema = createInsertSchema(scenarios).omit({ id: true, createdAt: true });
export var insertScenarioProgressSchema = createInsertSchema(scenarioProgress).omit({ id: true });
export var insertVocabularyProgressSchema = createInsertSchema(vocabularyProgress).omit({ id: true, lastReviewedAt: true });
export var insertStorySchema = createInsertSchema(stories).omit({ id: true, createdAt: true });
export var insertListeningSchema = createInsertSchema(listenings).omit({ id: true, createdAt: true });
export var insertSpeakingTopicSchema = createInsertSchema(speakingTopics).omit({ id: true, createdAt: true });
export var insertActivityFeedSchema = createInsertSchema(activityFeed).omit({ id: true, createdAt: true });
export var insertContentRatingSchema = createInsertSchema(contentRatings).omit({ id: true, createdAt: true });
