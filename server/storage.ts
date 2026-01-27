import { db } from "./db";
import { eq, desc, asc, and, or, sql, count } from "drizzle-orm";
import {
  users, lessons, vocabulary, progress, conversations, messages,
  userStats, scenarios, stories, listenings, speakingTopics,
  speakingSessions, speakingAttempts, userSpeakingProfiles,
  pronunciationProgress, culturalScenarioProgress, activityFeed, contentRatings,
  conversationLines, quizzes, quizQuestions, quizAttempts,
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
  type QuizAttempt, type InsertQuizAttempt
} from "@shared/schema";

export class Storage {
  // User management
  async getUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

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

  // Lesson management
  async getLessons(): Promise<Lesson[]> {
    return await db.select().from(lessons).orderBy(lessons.order);
  }

  async getLesson(id: number): Promise<(Lesson & { vocabulary: Vocabulary[] }) | undefined> {
    const [lesson] = await db.select().from(lessons).where(eq(lessons.id, id));
    if (!lesson) return undefined;

    const lessonVocabulary = await db.select().from(vocabulary).where(eq(vocabulary.lessonId, id));
    return { ...lesson, vocabulary: lessonVocabulary };
  }

  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    const [lesson] = await db.insert(lessons).values(insertLesson).returning();
    return lesson;
  }

  // Vocabulary management
  async getVocabulary(lessonId: number): Promise<Vocabulary[]> {
    return await db.select().from(vocabulary).where(eq(vocabulary.lessonId, lessonId));
  }

  async createVocabulary(insertVocabulary: InsertVocabulary): Promise<Vocabulary> {
    const [vocab] = await db.insert(vocabulary).values(insertVocabulary).returning();
    return vocab;
  }

  // Progress tracking
  async getProgress(userId: number): Promise<(Progress & { lesson: Lesson })[]> {
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

  async markLessonComplete(userId: number, lessonId: number, completed: boolean): Promise<Progress> {
    const existing = await db
      .select()
      .from(progress)
      .where(and(eq(progress.userId, userId), eq(progress.lessonId, lessonId)));

    if (existing.length > 0) {
      const [updated] = await db
        .update(progress)
        .set({ completed, completedAt: completed ? new Date().toISOString() : null })
        .where(eq(progress.id, existing[0].id))
        .returning();
      return updated;
    } else {
      const [newProgress] = await db
        .insert(progress)
        .values({
          userId,
          lessonId,
          completed,
          completedAt: completed ? new Date().toISOString() : null,
        })
        .returning();
      return newProgress;
    }
  }

  // Conversations
  async getConversations(userId: number): Promise<Conversation[]> {
    return await db.select().from(conversations).where(eq(conversations.userId, userId));
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
    const [conversation] = await db.insert(conversations).values(insertConversation).returning();
    return conversation;
  }

  async addMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }

  async deleteConversation(id: number): Promise<void> {
    await db.delete(messages).where(eq(messages.conversationId, id));
    await db.delete(conversations).where(eq(conversations.id, id));
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
  async getScenarios(): Promise<any[]> {
    return await db.select().from(scenarios);
  }

  async getScenario(id: number): Promise<any | undefined> {
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

    return results.map((r: any) => ({ ...r.feed, user: r.user }));
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
    return await this.getUsers();
  }

  async updateLesson(id: number, data: any): Promise<Lesson | undefined> {
    // Stub implementation
    return await this.getLesson(id);
  }

  async deleteLesson(id: number): Promise<void> {
    // Stub implementation - would delete lesson
  }

  async updateUserAdminStatus(userId: number, isAdmin: boolean): Promise<User | undefined> {
    // Stub implementation
    return await this.getUser(userId);
  }

  async getUserStats(userId: number): Promise<any> {
    const [stats] = await db.select().from(userStats).where(eq(userStats.userId, userId));
    return stats || null;
  }

  async createUserStats(userId: number): Promise<any> {
    const [stats] = await db.insert(userStats).values({
      userId,
      xpPoints: 0,
      level: 1,
      currentStreak: 0,
      longestStreak: 0,
      totalLessonsCompleted: 0,
      totalQuizzesPassed: 0,
      totalMinutesLearned: 0,
      speakingMinutes: 0,
      pronunciationAccuracyAvg: 0,
    }).returning();
    return stats;
  }

  async updateUserStats(userId: number, data: any): Promise<any> {
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

  async getDailyGoal(userId: number): Promise<any> {
    // For now, return calculated goal based on progress
    const userProgress = await this.getProgress(userId);
    const completedToday = userProgress.filter(p => {
      if (!p.completedAt) return false;
      const today = new Date().toISOString().split('T')[0];
      return p.completedAt.startsWith(today);
    }).length;
    
    return {
      lessonsTarget: 3,
      lessonsCompleted: completedToday,
      xpTarget: 50,
      xpEarned: completedToday * 10,
      minutesTarget: 15,
      minutesSpent: completedToday * 5,
    };
  }

  async updateDailyGoal(userId: number, data: any): Promise<any> {
    // For now, just return the data as-is (would need dailyGoals table for persistence)
    return data;
  }

  async getLeaderboard(weekStart?: string): Promise<any[]> {
    // Get top users by XP
    const results = await db
      .select({
        stats: userStats,
        user: users,
      })
      .from(userStats)
      .innerJoin(users, eq(userStats.userId, users.id))
      .orderBy(desc(userStats.xpPoints))
      .limit(10);
    
    return results.map((r: any, index: number) => ({
      rank: index + 1,
      user: { id: r.user.id, username: r.user.username },
      xpEarned: r.stats.xpPoints,
      lessonsCompleted: r.stats.totalLessonsCompleted,
    }));
  }

  async getVocabularyForLesson(lessonId: number): Promise<Vocabulary[]> {
    return await this.getVocabulary(lessonId);
  }

  // Quiz management
  async getQuizzes(): Promise<(Quiz & { questions: QuizQuestion[] })[]> {
    const allQuizzes = await db.select().from(quizzes).orderBy(quizzes.order);
    
    const quizzesWithQuestions = await Promise.all(
      allQuizzes.map(async (quiz) => {
        const questions = await db
          .select()
          .from(quizQuestions)
          .where(eq(quizQuestions.quizId, quiz.id))
          .orderBy(quizQuestions.order);
        return { ...quiz, questions };
      })
    );
    
    return quizzesWithQuestions;
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
            totalQuizzesPassed: stats.totalQuizzesPassed + 1,
            xpPoints: stats.xpPoints + (quiz.xpReward || 50),
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