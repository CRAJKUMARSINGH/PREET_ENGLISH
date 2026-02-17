import { db } from "./db";
import { eq, desc, asc, and, or, sql, count, inArray } from "drizzle-orm";
import { selectMany, selectOne, returning, returningOptional } from "./lib/db-helpers";

import {
  users, lessons, vocabulary, progress, conversations, messages,
  userStats, scenarios, stories, listenings, speakingTopics,
  speakingSessions, speakingAttempts, userSpeakingProfiles,
  pronunciationProgress, culturalScenarioProgress, activityFeed, contentRatings,
  conversationLines, quizzes, quizQuestions, quizAttempts,
  dailyGoals, quizResults,

  type User, type InsertUser,
  type Lesson, type InsertLesson,
  type Vocabulary, type InsertVocabulary,
  type Progress, type ConversationLine, type InsertConversationLine,
  type Conversation, type InsertConversation,
  type Message, type InsertMessage,
  type Story,
  type Listening,
  type SpeakingTopic,
  type ActivityFeed, type InsertActivityFeed,
  type ContentRating, type InsertContentRating,
  type SpeakingSession, type InsertSpeakingSession,
  type SpeakingAttempt, type InsertSpeakingAttempt,
  type UserSpeakingProfile, type InsertUserSpeakingProfile,
  type PronunciationProgress, type InsertPronunciationProgress,
  type CulturalScenarioProgress, type InsertCulturalScenarioProgress,
  type Quiz, type InsertQuiz,
  type QuizQuestion, type InsertQuizQuestion,
  type QuizAttempt, type InsertQuizAttempt,
  type QuizResult, type InsertQuizResult,
  type DailyGoal, type InsertDailyGoal,
  type UserStats, type InsertUserStats,
  type Scenario
} from "@shared/schema";


export class Storage {
  // User management
  async getUsers(): Promise<User[]> {
    return selectMany<User>(db.select().from(users));
  }


  async getUser(id: number): Promise<User | undefined> {
    return selectOne<User>(db.select().from(users).where(eq(users.id, id)));
  }


  async getUserByUsername(username: string): Promise<User | undefined> {
    return selectOne<User>(db.select().from(users).where(eq(users.username, username)));
  }


  async createUser(insertUser: InsertUser): Promise<User> {
    return returning<User>(db.insert(users).values(insertUser).returning());
  }


  async createUserStats(insertStats: InsertUserStats): Promise<UserStats> {
    return returning<UserStats>(db.insert(userStats).values(insertStats).returning());
  }


  // Lesson management
  async getLessons(): Promise<Lesson[]> {
    return selectMany<Lesson>(db.select().from(lessons).orderBy(lessons.order));
  }

  /**
   * Get all lessons with their vocabulary in a single optimized query
   * Prevents N+1 query problem
   */
  async getLessonsWithVocabulary(): Promise<(Lesson & { vocabulary: Vocabulary[] })[]> {
    const results = await db
      .select({
        lesson: lessons,
        vocabulary: vocabulary,
      })
      .from(lessons)
      .leftJoin(vocabulary, eq(vocabulary.lessonId, lessons.id))
      .orderBy(lessons.order);

    // Group vocabulary by lesson
    const lessonsMap = new Map<number, Lesson & { vocabulary: Vocabulary[] }>();
    
    for (const row of results) {
      if (!lessonsMap.has(row.lesson.id)) {
        lessonsMap.set(row.lesson.id, {
          ...row.lesson,
          vocabulary: []
        });
      }
      
      if (row.vocabulary) {
        lessonsMap.get(row.lesson.id)!.vocabulary.push(row.vocabulary);
      }
    }
    
    return Array.from(lessonsMap.values());
  }

  async getLesson(id: number): Promise<(Lesson & { vocabulary: Vocabulary[] }) | undefined> {
    const lesson = await selectOne<Lesson>(db.select().from(lessons).where(eq(lessons.id, id)));
    if (!lesson) return undefined;

    const lessonVocabulary = await selectMany<Vocabulary>(
      db.select().from(vocabulary).where(eq(vocabulary.lessonId, id))
    );
    return { ...lesson, vocabulary: lessonVocabulary };
  }

  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    return returning<Lesson>(db.insert(lessons).values(insertLesson).returning());
  }

  async updateLesson(id: number, updates: Partial<InsertLesson>): Promise<Lesson> {
    return returning<Lesson>(
      db.update(lessons)
        .set(updates)
        .where(eq(lessons.id, id))
        .returning()
    );
  }

  async deleteLesson(id: number): Promise<void> {
    await db.delete(lessons).where(eq(lessons.id, id));
  }

  async updateUserAdminStatus(userId: number, isAdmin: boolean): Promise<User> {
    return returning<User>(
      db.update(users)
        .set({ isAdmin })
        .where(eq(users.id, userId))
        .returning()
    );
  }


  // Vocabulary management
  async getVocabulary(lessonId: number): Promise<Vocabulary[]> {
    return await db.select().from(vocabulary).where(eq(vocabulary.lessonId, lessonId));
  }


  async createVocabulary(insertVocabulary: InsertVocabulary): Promise<Vocabulary> {
    return returning<Vocabulary>(db.insert(vocabulary).values(insertVocabulary).returning());
  }

  // Progress tracking
  async getUserQuizResults(userId: number): Promise<(QuizResult & { quiz: Quiz })[]> {
    const results = await selectMany<any>(
      db.select({
        quizResult: quizResults,
        quiz: quizzes,
      })
        .from(quizResults)
        .innerJoin(quizzes, eq(quizResults.quizId, quizzes.id))
        .where(eq(quizResults.userId, userId))
    );
    return results.map((r: any) => ({ ...r.quizResult, quiz: r.quiz }));
  }




  async getProgress(userId: number): Promise<(Progress & { lesson: Lesson })[]> {
    const results = await selectMany<any>(
      db.select({
        progress: progress,
        lesson: lessons,
      })
        .from(progress)
        .innerJoin(lessons, eq(progress.lessonId, lessons.id))
        .where(eq(progress.userId, userId))
    );

    return results.map((r: any) => ({ ...r.progress, lesson: r.lesson }));
  }



  async markLessonComplete(userId: number, lessonId: number, completed: boolean): Promise<Progress> {
    const existing = await selectMany<Progress>(
      db.select()
        .from(progress)
        .where(and(eq(progress.userId, userId), eq(progress.lessonId, lessonId)))
    );

    if (existing.length > 0) {
      return returning<Progress>(
        db.update(progress)
          .set({ completed, completedAt: completed ? new Date().toISOString() : null })
          .where(eq(progress.id, existing[0].id))
          .returning()
      );
    } else {
      return returning<Progress>(
        db.insert(progress)
          .values({
            userId,
            lessonId,
            completed,
            completedAt: completed ? new Date().toISOString() : null,
          })
          .returning()
      );
    }
  }


  // Conversations
  async getConversations(userId: number): Promise<(Conversation & { messages: Message[] })[]> {
    const allConversations = await db.select().from(conversations).where(eq(conversations.userId, userId));
    if (allConversations.length === 0) return [];

    const convIds = allConversations.map((c: any) => c.id);
    const allMessages = await db.select().from(messages).where(inArray(messages.conversationId, convIds)).orderBy(asc(messages.createdAt));

    // Efficient hash map grouping
    const messagesByConvId = new Map<number, Message[]>();
    for (const msg of allMessages) {
      if (!messagesByConvId.has(msg.conversationId)) {
        messagesByConvId.set(msg.conversationId, []);
      }
      messagesByConvId.get(msg.conversationId)!.push(msg);
    }

    return allConversations.map((conv: any) => ({
      ...conv,
      messages: messagesByConvId.get(conv.id) || []
    }));
  }



  async getConversation(id: number): Promise<(Conversation & { messages: Message[] }) | undefined> {
    const [conversation] = await db.select().from(conversations).where(eq(conversations.id, id));
    if (!conversation) return undefined;
    const conversationMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, id))
      .orderBy(messages.createdAt);

    return { ...conversation, messages: conversationMessages };
  }

  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const [conv] = await db.insert(conversations).values(insertConversation).returning();
    return conv;
  }

  async addMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }

  async deleteConversation(id: number): Promise<void> {
    await db.delete(messages).where(eq(messages.conversationId, id));
    await db.delete(conversations).where(eq(conversations.id, id));
  }

  async clearConversations(userId: number): Promise<void> {
    await db.delete(messages).where(inArray(messages.conversationId, db.select({ id: conversations.id }).from(conversations).where(eq(conversations.userId, userId))));
    await db.delete(conversations).where(eq(conversations.userId, userId));
  }


  // Stories
  async getStories(): Promise<Story[]> {
    return await db.select().from(stories).orderBy(stories.order);
  }

  async getStory(id: number): Promise<Story | undefined> {
    const [story] = await db.select().from(stories).where(eq(stories.id, id));
    return story;
  }


  // Scenarios
  async getScenarios(): Promise<Scenario[]> {
    return await db.select().from(scenarios);
  }

  async getScenario(id: number): Promise<Scenario | undefined> {
    const [scenario] = await db.select().from(scenarios).where(eq(scenarios.id, id));
    return scenario;
  }

  // Speaking Topics
  async getSpeakingTopics(): Promise<SpeakingTopic[]> {
    return await db.select().from(speakingTopics).orderBy(speakingTopics.order);
  }

  async getSpeakingTopic(id: number): Promise<SpeakingTopic | undefined> {
    const [topic] = await db.select().from(speakingTopics).where(eq(speakingTopics.id, id));
    return topic;
  }

  // Activity Feed
  async getActivityFeed(userId?: number): Promise<(ActivityFeed & { user: User })[]> {
    const results = await db
      .select({
        feed: activityFeed,
        user: users,
      })
      .from(activityFeed)
      .innerJoin(users, eq(activityFeed.userId, users.id))
      .orderBy(desc(activityFeed.createdAt));

    return results.map((r) => ({ ...r.feed, user: r.user }));
  }

  async addActivityFeedItem(insertActivity: InsertActivityFeed): Promise<ActivityFeed> {
    const [activity] = await db
      .insert(activityFeed)
      .values(insertActivity)
      .returning();
    return activity;
  }

  // Minimal stubs for missing methods to prevent errors
  async getPublicUsers(): Promise<User[]> {
    return await db.select().from(users).where(eq(users.isAdmin, false));
  }

  async updateUserAdminStatus(userId: number, isAdmin: boolean): Promise<User | undefined> {
    const [updated] = await db.update(users).set({ isAdmin }).where(eq(users.id, userId)).returning();
    return updated;
  }


  async getUserStats(userId: number): Promise<UserStats | undefined> {
    const [stats] = await db.select().from(userStats).where(eq(userStats.userId, userId));
    return stats;
  }

  async updateUserStats(userId: number, data: Partial<UserStats>): Promise<UserStats> {
    const existing = await this.getUserStats(userId);
    if (!existing) {
      // Create new stats with provided data
      const [stats] = await db.insert(userStats).values({
        userId,
        ...data,
      }).returning();
      return stats;
    }
    const [updated] = await db.update(userStats)
      .set(data)
      .where(eq(userStats.userId, userId))
      .returning();
    return updated;
  }

  async getDailyGoal(userId: number): Promise<DailyGoal | null> {
    const [goal] = await db.select().from(dailyGoals).where(eq(dailyGoals.userId, userId));
    if (goal) return goal;

    // Fallback: Create a default goal if none exists
    const userProgress = await this.getProgress(userId);
    const completedToday = userProgress.filter(p => {
      if (!p.completedAt) return false;
      const today = new Date().toISOString().split('T')[0];
      return p.completedAt.startsWith(today);
    }).length;

    const defaultGoal = {
      userId,
      lessonsTarget: 3,
      lessonsCompleted: completedToday,
      xpTarget: 100,
      xpEarned: completedToday * 10,
      minutesTarget: 15,
      minutesSpent: completedToday * 5,
    };
    const [newGoal] = await db.insert(dailyGoals).values(defaultGoal).returning();
    return newGoal;
  }

  async updateDailyGoal(userId: number, update: Partial<DailyGoal>): Promise<DailyGoal> {
    // Check if goal exists, create if not (fixes race condition)
    const existing = await this.getDailyGoal(userId);
    if (!existing) {
      // Create goal with merged default and update values
      const defaultGoal = {
        userId,
        lessonsTarget: 3,
        lessonsCompleted: 0,
        xpTarget: 100,
        xpEarned: 0,
        minutesTarget: 15,
        minutesSpent: 0,
        ...update, // Merge update values into defaults
      };
      const [newGoal] = await db.insert(dailyGoals).values(defaultGoal).returning();
      if (!newGoal) {
        throw new Error(`Failed to create daily goal for user ${userId}`);
      }
      return newGoal;
    }
    
    // Update existing goal
    const [updated] = await db.update(dailyGoals)
      .set(update)
      .where(eq(dailyGoals.userId, userId))
      .returning();
    
    if (!updated) {
      throw new Error(`Failed to update daily goal for user ${userId}`);
    }
    
    return updated;
  }

  async getLeaderboard(limitValue: number = 10): Promise<Array<{ rank: number; user: { id: number; username: string }; xpEarned: number; lessonsCompleted: number }>> {
    const results = await db
      .select({
        stats: userStats,
        user: users,
      })
      .from(userStats)
      .innerJoin(users, eq(userStats.userId, users.id))
      .orderBy(desc(userStats.xpPoints))
      .limit(limitValue);

    return results.map((r, index: number) => ({
      rank: index + 1,
      user: { id: r.user.id, username: r.user.username },
      xpEarned: r.stats.xpPoints || 0,
      lessonsCompleted: r.stats.totalLessonsCompleted || 0,
    }));
  }

  async getVocabularyForLesson(lessonId: number): Promise<Vocabulary[]> {
    return await this.getVocabulary(lessonId);
  }

  // Quiz management
  async getQuizzes(): Promise<(Quiz & { questions: QuizQuestion[] })[]> {
    const allQuizzes = await db.select().from(quizzes).orderBy(quizzes.order);
    if (allQuizzes.length === 0) return [];

    const quizIds = allQuizzes.map(q => q.id);
    const allQuestions = await db
      .select()
      .from(quizQuestions)
      .where(inArray(quizQuestions.quizId, quizIds))
      .orderBy(quizQuestions.order);

    const questionsByQuizId = allQuestions.reduce((acc: Record<number, QuizQuestion[]>, q: QuizQuestion) => {
      const quizId = q.quizId as number;
      if (!acc[quizId]) acc[quizId] = [];
      acc[quizId].push(q);
      return acc;
    }, {} as Record<number, QuizQuestion[]>);

    return allQuizzes.map((quiz: Quiz) => ({
      ...quiz,
      questions: questionsByQuizId[quiz.id] || []
    }));
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

  async createQuizResult(insertQuizResult: InsertQuizResult): Promise<QuizResult> {
    const [result] = await db.insert(quizResults).values(insertQuizResult).returning();
    return result;
  }


  async createQuizQuestion(insertQuestion: InsertQuizQuestion): Promise<QuizQuestion> {
    const [question] = await db.insert(quizQuestions).values(insertQuestion).returning();
    return question;
  }


  async submitQuizAttempt(insertAttempt: InsertQuizAttempt): Promise<QuizAttempt> {
    const [attempt] = await db.insert(quizAttempts).values(insertAttempt).returning();

    // Update user stats if quiz passed
    if (attempt.passed) {
      const [stats] = await db
        .select()
        .from(userStats)
        .where(eq(userStats.userId, attempt.userId));

      // Get quiz to get XP reward
      const [quiz] = await db
        .select()
        .from(quizzes)
        .where(eq(quizzes.id, attempt.quizId));

      if (stats && quiz) {
        await db
          .update(userStats)
          .set({
            totalQuizzesPassed: (stats.totalQuizzesPassed || 0) + 1,
            xpPoints: (stats.xpPoints || 0) + (quiz.xpReward || 50),
          })
          .where(eq(userStats.id, stats.id));
      }
    }

    return attempt;
  }

  async getQuizAttempts(userId: number): Promise<QuizAttempt[]> {
    return await db
      .select()
      .from(quizAttempts)
      .where(eq(quizAttempts.userId, userId))
      .orderBy(desc(quizAttempts.completedAt));
  }


  async getAchievements(): Promise<any[]> {
    // Stub implementation
    return [];
  }

  async search(query: string): Promise<any[]> {
    // Stub implementation
    return [];
  }

  // ============ SPEAKING PRACTICE METHODS ============

  async getSpeakingSessions(userId: number): Promise<SpeakingSession[]> {
    return await db.select().from(speakingSessions)
      .where(eq(speakingSessions.userId, userId))
      .orderBy(desc(speakingSessions.createdAt));
  }


  async createSpeakingSession(userId: number, data: any): Promise<SpeakingSession> {
    const [session] = await db.insert(speakingSessions).values({
      userId,
      sessionType: data.sessionType || 'free_practice',
      lessonId: data.lessonId || null,
      scenarioId: data.scenarioId || null,
      durationSeconds: data.durationSeconds || 0,
    }).returning();
    return session;
  }


  async completeSpeakingSession(sessionId: number, scores: any): Promise<SpeakingSession> {
    const [updated] = await db.update(speakingSessions)
      .set({
        completedAt: new Date().toISOString(),
        overallScore: scores.overallScore,
        pronunciationScore: scores.pronunciationScore,
        fluencyScore: scores.fluencyScore,
        confidenceScore: scores.confidenceScore,
      })
      .where(eq(speakingSessions.id, sessionId))
      .returning();
    return updated;
  }


  async createSpeakingAttempt(sessionId: number, data: any): Promise<SpeakingAttempt> {
    const [attempt] = await db.insert(speakingAttempts).values({
      sessionId,
      expectedText: data.expectedText,
      spokenText: data.spokenText,
      accuracyScore: data.accuracyScore || 0,
      pronunciationIssues: data.pronunciationIssues,
      feedbackData: data.feedbackData,
      audioDurationMs: data.audioDurationMs,
      attemptNumber: data.attemptNumber || 1,
    }).returning();
    return attempt;
  }


  async getSpeakingProfile(userId: number): Promise<UserSpeakingProfile | null> {
    const [profile] = await db.select().from(userSpeakingProfiles)
      .where(eq(userSpeakingProfiles.userId, userId));
    return profile || null;
  }


  async createSpeakingProfile(userId: number, data: any): Promise<UserSpeakingProfile> {
    const [profile] = await db.insert(userSpeakingProfiles).values({
      userId,
      currentLevel: data.currentLevel || 'beginner',
      weakPhonemes: data.weakPhonemes,
      strongAreas: data.strongAreas,
      preferredPracticeType: data.preferredPracticeType || 'mixed',
      culturalContextPreference: data.culturalContextPreference || 'indian_english',
      totalPracticeMinutes: data.totalPracticeMinutes || 0,
    }).returning();
    return profile;
  }


  async updateSpeakingProfile(userId: number, data: any): Promise<UserSpeakingProfile> {
    const [updated] = await db.update(userSpeakingProfiles)
      .set({
        ...data,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(userSpeakingProfiles.userId, userId))
      .returning();
    return updated;
  }


  // ============ LISTENING METHODS ============

  async getListenings(): Promise<Listening[]> {
    return await db.select().from(listenings).orderBy(listenings.order);
  }

  async getListening(id: number): Promise<Listening | undefined> {
    const [listening] = await db.select().from(listenings).where(eq(listenings.id, id));
    return listening;
  }


  async getListeningsByDifficulty(level: string): Promise<Listening[]> {
    return await db.select().from(listenings).where(eq(listenings.difficulty, level));
  }

  async getListeningsByCategory(category: string): Promise<Listening[]> {
    return await db.select().from(listenings).where(eq(listenings.category, category));
  }


}

export const storage = new Storage();