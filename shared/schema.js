import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
// Core Tables - Minimal working schema for immediate deployment
export var users = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
    isAdmin: integer("is_admin", { mode: "boolean" }).default(false),
});
export var lessons = sqliteTable("lessons", {
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
export var conversations = sqliteTable("conversations", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: integer("user_id").references(function () { return users.id; }).notNull(),
    title: text("title").notNull(),
    createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});
export var messages = sqliteTable("messages", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    conversationId: integer("conversation_id").references(function () { return conversations.id; }).notNull(),
    role: text("role").notNull(),
    content: text("content").notNull(),
    createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});
export var vocabulary = sqliteTable("vocabulary", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    lessonId: integer("lesson_id").references(function () { return lessons.id; }).notNull(),
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
export var conversationLines = sqliteTable("conversation_lines", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    lessonId: integer("lesson_id").references(function () { return lessons.id; }).notNull(),
    speaker: text("speaker").notNull(),
    englishText: text("english_text").notNull(),
    hindiText: text("hindi_text").notNull(),
    emoji: text("emoji"),
    lineOrder: integer("line_order").notNull(),
});
export var progress = sqliteTable("progress", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: integer("user_id").references(function () { return users.id; }).notNull(),
    lessonId: integer("lesson_id").references(function () { return lessons.id; }).notNull(),
    completed: integer("completed", { mode: "boolean" }).default(false),
    completedAt: text("completed_at").default("CURRENT_TIMESTAMP"),
});
// Gamification Tables
export var userStats = sqliteTable("user_stats", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: integer("user_id").references(function () { return users.id; }).notNull().unique(),
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
export var quizzes = sqliteTable("quizzes", {
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
    lessonId: integer("lesson_id").references(function () { return lessons.id; }),
    xpReward: integer("xp_reward").default(50),
    hintsAllowed: integer("hints_allowed", { mode: "boolean" }).default(true),
});
export var quizQuestions = sqliteTable("quiz_questions", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    quizId: integer("quiz_id").references(function () { return quizzes.id; }, { onDelete: "cascade" }).notNull(),
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
export var quizAttempts = sqliteTable("quiz_attempts", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: integer("user_id").references(function () { return users.id; }).notNull(),
    quizId: integer("quiz_id").references(function () { return quizzes.id; }).notNull(),
    score: integer("score").notNull(),
    totalQuestions: integer("total_questions").notNull(),
    answers: text("answers"), // JSON string of user answers
    timeSpent: integer("time_spent"), // seconds
    passed: integer("passed", { mode: "boolean" }).default(false),
    completedAt: text("completed_at").default("CURRENT_TIMESTAMP"),
});
export var scenarios = sqliteTable("scenarios", {
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
export var stories = sqliteTable("stories", {
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
export var listenings = sqliteTable("listenings", {
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
export var speakingTopics = sqliteTable("speaking_topics", {
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
export var activityFeed = sqliteTable("activity_feed", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: integer("user_id").references(function () { return users.id; }).notNull(),
    type: text("type").notNull(),
    referenceId: integer("reference_id"),
    content: text("content"),
    createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});
export var contentRatings = sqliteTable("content_ratings", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: integer("user_id").references(function () { return users.id; }).notNull(),
    contentType: text("content_type").notNull(),
    contentId: integer("content_id").notNull(),
    rating: integer("rating").notNull(),
    review: text("review"),
    createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});
export var speakingSessions = sqliteTable("speaking_sessions", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: integer("user_id").references(function () { return users.id; }).notNull(),
    lessonId: integer("lesson_id").references(function () { return lessons.id; }),
    scenarioId: integer("scenario_id").references(function () { return scenarios.id; }),
    sessionType: text("session_type").notNull(),
    durationSeconds: integer("duration_seconds").notNull(),
    overallScore: integer("overall_score"),
    pronunciationScore: integer("pronunciation_score"),
    fluencyScore: integer("fluency_score"),
    confidenceScore: integer("confidence_score"),
    createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
    completedAt: text("completed_at"),
});
export var speakingAttempts = sqliteTable("speaking_attempts", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    sessionId: integer("session_id").references(function () { return speakingSessions.id; }).notNull(),
    expectedText: text("expected_text"),
    spokenText: text("spoken_text").notNull(),
    accuracyScore: integer("accuracy_score").notNull(),
    pronunciationIssues: text("pronunciation_issues"),
    feedbackData: text("feedback_data"),
    audioDurationMs: integer("audio_duration_ms"),
    attemptNumber: integer("attempt_number").notNull(),
    createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});
export var userSpeakingProfiles = sqliteTable("user_speaking_profiles", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: integer("user_id").references(function () { return users.id; }).notNull().unique(),
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
export var pronunciationProgress = sqliteTable("pronunciation_progress", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: integer("user_id").references(function () { return users.id; }).notNull(),
    phoneme: text("phoneme").notNull(),
    accuracyHistory: text("accuracy_history"),
    practiceCount: integer("practice_count").default(0),
    lastPracticed: text("last_practiced"),
    masteryLevel: text("mastery_level").default("learning"),
    createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});
export var culturalScenarioProgress = sqliteTable("cultural_scenario_progress", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: integer("user_id").references(function () { return users.id; }).notNull(),
    scenarioType: text("scenario_type").notNull(),
    completionCount: integer("completion_count").default(0),
    bestScore: integer("best_score").default(0),
    confidenceLevel: integer("confidence_level").default(50),
    lastPracticed: text("last_practiced"),
    notes: text("notes"),
});
// Relations
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
export var conversationsRelations = relations(conversations, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        user: one(users, {
            fields: [conversations.userId],
            references: [users.id],
        }),
        messages: many(messages),
    });
});
export var messagesRelations = relations(messages, function (_a) {
    var one = _a.one;
    return ({
        conversation: one(conversations, {
            fields: [messages.conversationId],
            references: [conversations.id],
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
export var speakingSessionsRelations = relations(speakingSessions, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
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
    });
});
export var speakingAttemptsRelations = relations(speakingAttempts, function (_a) {
    var one = _a.one;
    return ({
        session: one(speakingSessions, {
            fields: [speakingAttempts.sessionId],
            references: [speakingSessions.id],
        }),
    });
});
export var userSpeakingProfilesRelations = relations(userSpeakingProfiles, function (_a) {
    var one = _a.one;
    return ({
        user: one(users, {
            fields: [userSpeakingProfiles.userId],
            references: [users.id],
        }),
    });
});
export var pronunciationProgressRelations = relations(pronunciationProgress, function (_a) {
    var one = _a.one;
    return ({
        user: one(users, {
            fields: [pronunciationProgress.userId],
            references: [users.id],
        }),
    });
});
export var culturalScenarioProgressRelations = relations(culturalScenarioProgress, function (_a) {
    var one = _a.one;
    return ({
        user: one(users, {
            fields: [culturalScenarioProgress.userId],
            references: [users.id],
        }),
    });
});
// Schemas
export var insertUserSchema = createInsertSchema(users, {
    id: undefined,
});
export var insertLessonSchema = createInsertSchema(lessons, {
    id: undefined,
});
export var insertVocabularySchema = createInsertSchema(vocabulary, {
    id: undefined,
});
export var insertConversationLineSchema = createInsertSchema(conversationLines, {
    id: undefined,
});
export var insertProgressSchema = createInsertSchema(progress, {
    id: undefined,
    completedAt: undefined,
});
export var insertConversationSchema = createInsertSchema(conversations, {
    id: undefined,
    createdAt: undefined,
});
export var insertMessageSchema = createInsertSchema(messages, {
    id: undefined,
    createdAt: undefined,
});
export var insertSpeakingSessionSchema = createInsertSchema(speakingSessions, {
    id: undefined,
    createdAt: undefined,
});
export var insertSpeakingAttemptSchema = createInsertSchema(speakingAttempts, {
    id: undefined,
    createdAt: undefined,
});
export var insertUserSpeakingProfileSchema = createInsertSchema(userSpeakingProfiles, {
    id: undefined,
    createdAt: undefined,
    updatedAt: undefined,
});
export var insertPronunciationProgressSchema = createInsertSchema(pronunciationProgress, {
    id: undefined,
    createdAt: undefined,
});
export var insertCulturalScenarioProgressSchema = createInsertSchema(culturalScenarioProgress, {
    id: undefined,
});
export var insertActivityFeedSchema = createInsertSchema(activityFeed, {
    id: undefined,
    createdAt: undefined,
});
export var insertContentRatingSchema = createInsertSchema(contentRatings, {
    id: undefined,
    createdAt: undefined,
});
export var insertQuizSchema = createInsertSchema(quizzes, {
    id: undefined,
});
export var insertQuizQuestionSchema = createInsertSchema(quizQuestions, {
    id: undefined,
});
export var insertQuizAttemptSchema = createInsertSchema(quizAttempts, {
    id: undefined,
    completedAt: undefined,
});
// --- Last One Year Revision Engine ---
export var revisionTasks = sqliteTable("revision_tasks", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    dayNumber: integer("day_number").notNull(), // 1 to 365
    title: text("title").notNull(),
    taskType: text("task_type").notNull(), // 'lesson', 'quiz', 'story', 'speaking'
    referenceId: integer("reference_id"), // ID of the lesson/story/etc.
    description: text("description"),
    isCompleted: integer("is_completed", { mode: "boolean" }).default(false),
    dateScheduled: text("date_scheduled"), // ISO date string
});
export var insertRevisionTaskSchema = createInsertSchema(revisionTasks, {
    id: undefined,
});
