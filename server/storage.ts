import { db } from "./db";
import {
  users, lessons, vocabulary, progress, conversationLines,
  quizzes, quizQuestions, quizAttempts,
  userStats, achievements, userAchievements, dailyGoals, leaderboard,
  scenarios, scenarioProgress, certifications,
  vocabularyProgress, stories,
  listenings, speakingTopics,
  activityFeed, contentRatings,
  type User, type InsertUser,
  type Lesson, type InsertLesson,
  type Vocabulary, type InsertVocabulary,
  type Progress, type ConversationLine, type InsertConversationLine,
  type Quiz, type InsertQuiz,
  type QuizQuestion, type InsertQuizQuestion,
  type QuizAttempt, type InsertQuizAttempt,
  type UserStats, type InsertUserStats,
  type Achievement, type InsertAchievement,
  type UserAchievement,
  type DailyGoal,
  type Leaderboard,
  type Scenario, type InsertScenario,
  type ScenarioProgress,
  type Certification, type InsertCertification,
  type VocabularyProgress, type InsertVocabularyProgress,
  type Story, type InsertStory,
  type Listening, type InsertListening,
  type SpeakingTopic, type InsertSpeakingTopic,
  type ActivityFeed, type InsertActivityFeed,
  type ContentRating, type InsertContentRating
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import { eq, and } from "drizzle-orm";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserAdminStatus(userId: number, isAdmin: boolean): Promise<User>;
  getPublicUsers(): Promise<User[]>;

  // Lessons
  getLessons(): Promise<Lesson[]>;
  getLesson(id: number): Promise<(Lesson & { vocabulary: Vocabulary[] }) | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  updateLesson(id: number, lesson: Partial<InsertLesson>): Promise<Lesson>;
  deleteLesson(id: number): Promise<void>;

  // Vocabulary
  getVocabularyForLesson(lessonId: number): Promise<Vocabulary[]>;
  getVocabularyByCategory(category: string): Promise<Vocabulary[]>;
  createVocabulary(vocab: InsertVocabulary): Promise<Vocabulary>;

  // Progress
  getUserProgress(userId: number): Promise<(Progress & { lesson: Lesson })[]>;
  updateProgress(userId: number, lessonId: number, completed: boolean): Promise<Progress>;

  // Search
  search(query: string): Promise<any[]>;

  // Quizzes
  getQuizzes(): Promise<Quiz[]>;
  getQuiz(id: number): Promise<(Quiz & { questions: QuizQuestion[] }) | undefined>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  getQuizQuestions(quizId: number): Promise<QuizQuestion[]>;
  createQuizQuestion(question: InsertQuizQuestion): Promise<QuizQuestion>;
  submitQuizAttempt(attempt: InsertQuizAttempt): Promise<QuizAttempt>;
  getUserQuizAttempts(userId: number, quizId?: number): Promise<QuizAttempt[]>;
  getQuizByLessonId(lessonId: number): Promise<Quiz | undefined>;

  // Gamification
  getUserStats(userId: number): Promise<UserStats | undefined>;
  updateUserStats(userId: number, stats: Partial<UserStats>): Promise<UserStats>;
  getAchievements(): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  getUserAchievements(userId: number): Promise<(UserAchievement & { achievement: Achievement })[]>;
  unlockAchievement(userId: number, achievementId: number): Promise<UserAchievement>;
  getDailyGoal(userId: number, date: string): Promise<DailyGoal | undefined>;
  updateDailyGoal(userId: number, date: string, goal: Partial<DailyGoal>): Promise<DailyGoal>;
  getLeaderboard(weekStart?: string): Promise<(Leaderboard & { user: User })[]>;

  // Scenarios
  getScenarios(): Promise<Scenario[]>;
  getScenario(id: number): Promise<Scenario | undefined>;
  createScenario(scenario: InsertScenario): Promise<Scenario>;
  getScenarioProgress(userId: number, scenarioId: number): Promise<ScenarioProgress | undefined>;
  updateScenarioProgress(userId: number, scenarioId: number, progress: Partial<ScenarioProgress>): Promise<ScenarioProgress>;
  getUserScenarioProgress(userId: number): Promise<(ScenarioProgress & { scenario: Scenario })[]>;

  // Certifications
  getUserCertifications(userId: number): Promise<Certification[]>;
  createCertification(certification: InsertCertification): Promise<Certification>;

  // SRS & Stories (Phase 3)
  getVocabularyProgress(userId: number, vocabularyId: number): Promise<VocabularyProgress | undefined>;
  updateVocabularyProgress(userId: number, vocabularyId: number, progress: Partial<VocabularyProgress>): Promise<VocabularyProgress>;
  getVocabularyDueForReview(userId: number, date: string): Promise<(VocabularyProgress & { vocabulary: Vocabulary })[]>;
  getStories(): Promise<Story[]>;
  getStory(id: number): Promise<Story | undefined>;
  createStory(story: InsertStory): Promise<Story>;

  // Listenings
  getListenings(): Promise<Listening[]>;
  getListening(id: number): Promise<Listening | undefined>;
  createListening(listening: InsertListening): Promise<Listening>;

  // Speaking Topics
  getSpeakingTopics(): Promise<SpeakingTopic[]>;
  getSpeakingTopic(id: number): Promise<SpeakingTopic | undefined>;
  createSpeakingTopic(topic: InsertSpeakingTopic): Promise<SpeakingTopic>;

  // Activity Feed & Ratings (Phase 4)
  getActivityFeed(): Promise<(ActivityFeed & { user: User })[]>;
  createActivityEntry(entry: InsertActivityFeed): Promise<ActivityFeed>;
  getContentRatings(contentType: string, contentId: number): Promise<(ContentRating & { user: User })[]>;
  createContentRating(rating: InsertContentRating): Promise<ContentRating>;

  sessionStore: session.Store;
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

  async updateUserAdminStatus(userId: number, isAdmin: boolean): Promise<User> {
    const [user] = await db.update(users)
      .set({ isAdmin })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async getPublicUsers(): Promise<User[]> {
    return await db.select({
      id: users.id,
      username: users.username,
      isAdmin: users.isAdmin,
    }).from(users);
  }

  async getLessons(): Promise<Lesson[]> {
    return await db.select().from(lessons).orderBy(lessons.order);
  }

  async getLesson(id: number): Promise<(Lesson & { vocabulary: Vocabulary[]; conversationLines: ConversationLine[] }) | undefined> {
    const [lesson] = await db.select().from(lessons).where(eq(lessons.id, id));
    if (!lesson) return undefined;

    const vocab = await db.select().from(vocabulary).where(eq(vocabulary.lessonId, id));
    const lines = await db.select().from(conversationLines).where(eq(conversationLines.lessonId, id)).orderBy(conversationLines.lineOrder);

    return { ...lesson, vocabulary: vocab, conversationLines: lines };
  }

  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    const [lesson] = await db.insert(lessons).values(insertLesson).returning();
    return lesson;
  }

  async updateLesson(id: number, updateData: Partial<InsertLesson>): Promise<Lesson> {
    const [lesson] = await db.update(lessons)
      .set(updateData)
      .where(eq(lessons.id, id))
      .returning();
    return lesson;
  }

  async deleteLesson(id: number): Promise<void> {
    // Delete related vocabulary first
    await db.delete(vocabulary).where(eq(vocabulary.lessonId, id));
    // Delete related conversation lines
    await db.delete(conversationLines).where(eq(conversationLines.lessonId, id));
    // Delete the lesson
    await db.delete(lessons).where(eq(lessons.id, id));
  }

  async getVocabularyForLesson(lessonId: number): Promise<Vocabulary[]> {
    return await db.select().from(vocabulary).where(eq(vocabulary.lessonId, lessonId));
  }

  async getVocabularyByCategory(category: string): Promise<Vocabulary[]> {
    return await db.select({
      id: vocabulary.id,
      lessonId: vocabulary.lessonId,
      word: vocabulary.word,
      pronunciation: vocabulary.pronunciation,
      definition: vocabulary.definition,
      example: vocabulary.example,
      hindiTranslation: vocabulary.hindiTranslation,
      hindiPronunciation: vocabulary.hindiPronunciation,
      exampleHindi: vocabulary.exampleHindi,
      usageHindi: vocabulary.usageHindi,
      audioUrl: vocabulary.audioUrl,
    })
      .from(vocabulary)
      .innerJoin(lessons, eq(vocabulary.lessonId, lessons.id))
      .where(eq(lessons.category, category));
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

    return results.map((r: any) => ({ ...r.progress, lesson: r.lesson }));
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
    const matchingLessons = allLessons.filter((lesson: any) =>
      lesson.title.toLowerCase().includes(lowerQuery) ||
      lesson.description.toLowerCase().includes(lowerQuery) ||
      (lesson.hindiTitle && lesson.hindiTitle.includes(query)) ||
      (lesson.hindiDescription && lesson.hindiDescription.includes(query)) ||
      lesson.category.toLowerCase().includes(lowerQuery)
    );

    results.push(...matchingLessons.map((lesson: any) => ({
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
    const matchingVocab = allVocab.filter((vocab: any) =>
      vocab.word.toLowerCase().includes(lowerQuery) ||
      vocab.definition.toLowerCase().includes(lowerQuery) ||
      (vocab.hindiTranslation && vocab.hindiTranslation.includes(query))
    );

    results.push(...matchingVocab.slice(0, 10).map((vocab: any) => ({
      id: vocab.id,
      type: 'vocabulary',
      title: vocab.word,
      hindiTitle: vocab.hindiTranslation,
      description: vocab.definition,
      category: 'Vocabulary'
    })));

    return results.slice(0, 20); // Limit to 20 results
  }

  // Quiz methods
  async getQuizzes(): Promise<Quiz[]> {
    return await db.select().from(quizzes).orderBy(quizzes.order);
  }

  async getQuiz(id: number): Promise<(Quiz & { questions: QuizQuestion[] }) | undefined> {
    const [quiz] = await db.select().from(quizzes).where(eq(quizzes.id, id));
    if (!quiz) return undefined;

    const questions = await db
      .select()
      .from(quizQuestions)
      .where(eq(quizQuestions.quizId, id))
      .orderBy(quizQuestions.order);

    return { ...quiz, questions };
  }

  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const [quiz] = await db.insert(quizzes).values(insertQuiz).returning();
    return quiz;
  }

  async getQuizQuestions(quizId: number): Promise<QuizQuestion[]> {
    return await db
      .select()
      .from(quizQuestions)
      .where(eq(quizQuestions.quizId, quizId))
      .orderBy(quizQuestions.order);
  }

  async createQuizQuestion(question: InsertQuizQuestion): Promise<QuizQuestion> {
    const [quizQuestion] = await db.insert(quizQuestions).values(question).returning();
    return quizQuestion;
  }

  async submitQuizAttempt(attempt: InsertQuizAttempt): Promise<QuizAttempt> {
    const [quizAttempt] = await db
      .insert(quizAttempts)
      .values({
        ...attempt,
        completedAt: new Date().toISOString()
      })
      .returning();
    return quizAttempt;
  }

  async getUserQuizAttempts(userId: number, quizId?: number): Promise<QuizAttempt[]> {
    if (quizId) {
      return await db
        .select()
        .from(quizAttempts)
        .where(and(eq(quizAttempts.userId, userId), eq(quizAttempts.quizId, quizId)))
        .orderBy(quizAttempts.completedAt);
    }

    return await db
      .select()
      .from(quizAttempts)
      .where(eq(quizAttempts.userId, userId))
      .orderBy(quizAttempts.completedAt);
  }

  // Gamification methods
  async getUserStats(userId: number): Promise<UserStats | undefined> {
    const [stats] = await db.select().from(userStats).where(eq(userStats.userId, userId));
    return stats;
  }

  async updateUserStats(userId: number, statsUpdate: Partial<UserStats>): Promise<UserStats> {
    const [existing] = await db.select().from(userStats).where(eq(userStats.userId, userId));

    if (existing) {
      const [updated] = await db
        .update(userStats)
        .set(statsUpdate)
        .where(eq(userStats.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(userStats)
        .values({ userId, ...statsUpdate, createdAt: new Date().toISOString() })
        .returning();
      return created;
    }
  }

  async getAchievements(): Promise<Achievement[]> {
    return await db.select().from(achievements);
  }

  async createAchievement(achievement: InsertAchievement): Promise<Achievement> {
    const [newAchievement] = await db.insert(achievements).values(achievement).returning();
    return newAchievement;
  }

  async getUserAchievements(userId: number): Promise<(UserAchievement & { achievement: Achievement })[]> {
    const results = await db
      .select({
        userAchievement: userAchievements,
        achievement: achievements,
      })
      .from(userAchievements)
      .innerJoin(achievements, eq(userAchievements.achievementId, achievements.id))
      .where(eq(userAchievements.userId, userId));

    return results.map((r: any) => ({ ...r.userAchievement, achievement: r.achievement }));
  }

  async unlockAchievement(userId: number, achievementId: number): Promise<UserAchievement> {
    const [userAchievement] = await db
      .insert(userAchievements)
      .values({ userId, achievementId, unlockedAt: new Date().toISOString() })
      .returning();
    return userAchievement;
  }

  async getDailyGoal(userId: number, date: string): Promise<DailyGoal | undefined> {
    const [goal] = await db
      .select()
      .from(dailyGoals)
      .where(and(eq(dailyGoals.userId, userId), eq(dailyGoals.date, date)));
    return goal;
  }

  async updateDailyGoal(userId: number, date: string, goalUpdate: Partial<DailyGoal>): Promise<DailyGoal> {
    const [existing] = await db
      .select()
      .from(dailyGoals)
      .where(and(eq(dailyGoals.userId, userId), eq(dailyGoals.date, date)));

    if (existing) {
      const [updated] = await db
        .update(dailyGoals)
        .set(goalUpdate)
        .where(eq(dailyGoals.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(dailyGoals)
        .values({ userId, date, ...goalUpdate })
        .returning();
      return created;
    }
  }

  async getLeaderboard(weekStart?: string): Promise<(Leaderboard & { user: User })[]> {
    const baseQuery = db
      .select({
        leaderboard: leaderboard,
        user: users,
      })
      .from(leaderboard)
      .innerJoin(users, eq(leaderboard.userId, users.id));

    const results = weekStart
      ? await baseQuery.where(eq(leaderboard.weekStart, weekStart)).orderBy(leaderboard.xpEarned)
      : await baseQuery.orderBy(leaderboard.xpEarned);

    return results.map((r: any) => ({ ...r.leaderboard, user: r.user }));
  }

  // Scenario methods
  async getScenarios(): Promise<Scenario[]> {
    return await db.select().from(scenarios);
  }

  async getScenario(id: number): Promise<Scenario | undefined> {
    const [scenario] = await db.select().from(scenarios).where(eq(scenarios.id, id));
    return scenario;
  }

  async createScenario(scenario: InsertScenario): Promise<Scenario> {
    const [newScenario] = await db.insert(scenarios).values(scenario).returning();
    return newScenario;
  }

  async getScenarioProgress(userId: number, scenarioId: number): Promise<ScenarioProgress | undefined> {
    const [progress] = await db
      .select()
      .from(scenarioProgress)
      .where(and(eq(scenarioProgress.userId, userId), eq(scenarioProgress.scenarioId, scenarioId)));
    return progress;
  }

  async updateScenarioProgress(userId: number, scenarioId: number, progressUpdate: Partial<ScenarioProgress>): Promise<ScenarioProgress> {
    const [existing] = await db
      .select()
      .from(scenarioProgress)
      .where(and(eq(scenarioProgress.userId, userId), eq(scenarioProgress.scenarioId, scenarioId)));

    if (existing) {
      const [updated] = await db
        .update(scenarioProgress)
        .set({ ...progressUpdate, completedAt: progressUpdate.completed ? new Date().toISOString() : existing.completedAt })
        .where(eq(scenarioProgress.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(scenarioProgress)
        .values({
          userId,
          scenarioId,
          ...progressUpdate,
          completedAt: progressUpdate.completed ? new Date().toISOString() : null
        })
        .returning();
      return created;
    }
  }

  async getUserScenarioProgress(userId: number): Promise<(ScenarioProgress & { scenario: Scenario })[]> {
    const results = await db
      .select({
        progress: scenarioProgress,
        scenario: scenarios,
      })
      .from(scenarioProgress)
      .innerJoin(scenarios, eq(scenarioProgress.scenarioId, scenarios.id))
      .where(eq(scenarioProgress.userId, userId));

    return results.map((r: any) => ({ ...r.progress, scenario: r.scenario }));
  }

  // Certification methods
  async getUserCertifications(userId: number): Promise<Certification[]> {
    return await db.select().from(certifications).where(eq(certifications.userId, userId));
  }

  async createCertification(certification: InsertCertification): Promise<Certification> {
    const [newCertification] = await db
      .insert(certifications)
      .values({
        ...certification,
        earnedAt: new Date().toISOString()
      })
      .returning();
    return newCertification;
  }

  // SRS & Stories (Phase 3)
  async getVocabularyProgress(userId: number, vocabularyId: number): Promise<VocabularyProgress | undefined> {
    const [progress] = await db.select().from(vocabularyProgress).where(
      and(
        eq(vocabularyProgress.userId, userId),
        eq(vocabularyProgress.vocabularyId, vocabularyId)
      )
    );
    return progress;
  }

  async updateVocabularyProgress(userId: number, vocabularyId: number, update: Partial<VocabularyProgress>): Promise<VocabularyProgress> {
    const existing = await this.getVocabularyProgress(userId, vocabularyId);
    if (!existing) {
      const [inserted] = await db.insert(vocabularyProgress).values({
        userId,
        vocabularyId,
        nextReviewDate: update.nextReviewDate || new Date().toISOString(),
        ...update,
      } as any).returning();
      return inserted;
    }

    const [updated] = await db.update(vocabularyProgress)
      .set(update)
      .where(
        and(
          eq(vocabularyProgress.userId, userId),
          eq(vocabularyProgress.vocabularyId, vocabularyId)
        )
      )
      .returning();
    return updated;
  }

  async getVocabularyDueForReview(userId: number, date: string): Promise<(VocabularyProgress & { vocabulary: Vocabulary })[]> {
    const results = await db.select({
      progress: vocabularyProgress,
      vocabulary: vocabulary
    })
      .from(vocabularyProgress)
      .innerJoin(vocabulary, eq(vocabularyProgress.vocabularyId, vocabulary.id))
      .where(eq(vocabularyProgress.userId, userId));

    return results
      .filter((r: any) => r.progress.nextReviewDate <= date)
      .map((r: any) => ({ ...r.progress, vocabulary: r.vocabulary }));
  }

  async getStories(): Promise<Story[]> {
    return db.select().from(stories).orderBy(stories.order);
  }

  async getStory(id: number): Promise<Story | undefined> {
    const [story] = await db.select().from(stories).where(eq(stories.id, id));
    return story;
  }

  async createStory(insertStory: InsertStory): Promise<Story> {
    const [story] = await db.insert(stories).values(insertStory).returning();
    return story;
  }

  // Listenings
  async getListenings(): Promise<Listening[]> {
    return await db.select().from(listenings).orderBy(listenings.order);
  }

  async getListening(id: number): Promise<Listening | undefined> {
    const [lesson] = await db.select().from(listenings).where(eq(listenings.id, id));
    return lesson;
  }

  async createListening(insertListening: InsertListening): Promise<Listening> {
    const [lesson] = await db.insert(listenings).values(insertListening).returning();
    return lesson;
  }

  // Speaking Topics
  async getSpeakingTopics(): Promise<SpeakingTopic[]> {
    return await db.select().from(speakingTopics).orderBy(speakingTopics.order);
  }

  async getSpeakingTopic(id: number): Promise<SpeakingTopic | undefined> {
    const [topic] = await db.select().from(speakingTopics).where(eq(speakingTopics.id, id));
    return topic;
  }

  async createSpeakingTopic(insertSpeakingTopic: InsertSpeakingTopic): Promise<SpeakingTopic> {
    const [topic] = await db.insert(speakingTopics).values(insertSpeakingTopic).returning();
    return topic;
  }

  async getQuizByLessonId(lessonId: number): Promise<Quiz | undefined> {
    const [quiz] = await db.select().from(quizzes).where(eq(quizzes.lessonId, lessonId));
    return quiz;
  }

  // Activity Feed & Ratings (Phase 4)
  async getActivityFeed(): Promise<(ActivityFeed & { user: User })[]> {
    const results = await db.select({
      id: activityFeed.id,
      userId: activityFeed.userId,
      type: activityFeed.type,
      referenceId: activityFeed.referenceId,
      content: activityFeed.content,
      createdAt: activityFeed.createdAt,
      user: users
    })
      .from(activityFeed)
      .innerJoin(users, eq(activityFeed.userId, users.id))
      .orderBy(activityFeed.createdAt);

    return results;
  }

  async createActivityEntry(entry: InsertActivityFeed): Promise<ActivityFeed> {
    const [newEntry] = await db.insert(activityFeed).values(entry).returning();
    return newEntry;
  }

  async getContentRatings(contentType: string, contentId: number): Promise<(ContentRating & { user: User })[]> {
    const results = await db.select({
      id: contentRatings.id,
      userId: contentRatings.userId,
      contentType: contentRatings.contentType,
      contentId: contentRatings.contentId,
      rating: contentRatings.rating,
      review: contentRatings.review,
      createdAt: contentRatings.createdAt,
      user: users
    })
      .from(contentRatings)
      .innerJoin(users, eq(contentRatings.userId, users.id))
      .where(and(
        eq(contentRatings.contentType, contentType),
        eq(contentRatings.contentId, contentId)
      ));

    return results;
  }

  async createContentRating(rating: InsertContentRating): Promise<ContentRating> {
    const [newRating] = await db.insert(contentRatings).values(rating).returning();
    return newRating;
  }

  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }
}

export const storage = new DatabaseStorage();
