import "./types";
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import logger from "./logger";
import { setChaos } from "./auth";
import { checkAIServiceHealth } from "./services/openai";
import {
  chatRequestSchema,
  videoChatRequestSchema,
  chaosControlSchema,
  quizSubmissionSchema,
  insertLessonSchema,
  insertDailyGoalSchema,
  insertUserStatsSchema
} from "../shared/schema";

import { chatService } from "./chat-service";

export async function registerRoutes(_httpServer: Server, app: Express): Promise<void> {
  // Health Check Endpoints
  app.get("/api/health", (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      database: process.env.DATABASE_URL ? 'configured' : 'missing',
      openai: process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'fallback-mode' ? 'configured' : 'fallback-mode',
      session: process.env.SESSION_SECRET ? 'configured' : 'missing'
    });
  });

  app.get("/api/ai/health", async (req, res) => {
    try {
      const health = await checkAIServiceHealth();
      res.json(health);
    } catch (error: any) {
      res.status(500).json({
        status: 'error',
        message: error.message || 'Unknown error',
        fallbackMode: true
      });
    }
  });

  // System Status Endpoint (for monitoring)
  app.get("/api/status", async (req, res) => {
    try {
      // Test database connection
      const dbTest = await storage.getUser(1).catch(() => null);

      // Get AI service status
      const aiHealth = await checkAIServiceHealth();

      res.json({
        status: 'operational',
        services: {
          database: dbTest !== undefined ? 'healthy' : 'error',
          ai: aiHealth.status,
          server: 'healthy'
        },
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        environment: {
          node: process.version,
          platform: process.platform,
          env: process.env.NODE_ENV
        }
      });
    } catch (error: any) {
      res.status(500).json({
        status: 'degraded',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  });
  // AI Chat API
  app.post("/api/chat", async (req, res) => {
    try {
      const result = chatRequestSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid request", errors: result.error.errors });
      }
      const { message } = result.data;

      const response = await chatService.generateResponse(message);
      res.json({ response });
    } catch (error) {
      logger.error("Error in chat endpoint:", error);
      res.status(500).json({ message: "Failed to process message" });
    }
  });

  // Chaos Control Endpoint (Test Mode Only)
  app.post("/api/test/chaos", (req, res) => {
    const result = chaosControlSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid request", errors: result.error.errors });
    }
    const { enabled } = result.data;
    setChaos(!!enabled);
    res.json({ message: `Chaos enabled: ${enabled}` });
  });

  // AI Video Call API (Innovation Lab)
  app.post("/api/ai/video-chat", async (req, res) => {
    try {
      const result = videoChatRequestSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid request", errors: result.error.errors });
      }
      const { message, scenario } = result.data;

      // Use the same chat service but wrap the response
      const textResponse = await chatService.generateResponse(
        `[Scenario: ${scenario || 'General Chat'}] User says: ${message}`
      );

      // In a full implementation, we would ask the AI to return JSON.
      // For now, we wrap the text response to satisfy the frontend contract.
      res.json({
        text: textResponse,
        hindiMeaning: "अनुवाद जल्द ही आ रहा है...", // Placeholder for stable demo
        emotion: "happy" // Default emotion
      });
    } catch (error) {
      logger.error("Error in video chat endpoint:", error);
      res.status(500).json({ message: "Failed to process video chat" });
    }
  });

  // Lessons API
  app.get("/api/lessons", async (_req, res) => {
    try {
      const lessons = await storage.getLessons();
      res.json(lessons);
    } catch (error) {
      logger.error("Error fetching lessons:", error);
      res.status(500).json({ message: "Failed to fetch lessons" });
    }
  });

  app.get("/api/lessons/:id", async (req, res) => {
    try {
      const lesson = await storage.getLesson(Number(req.params.id));
      if (!lesson) return res.status(404).json({ message: "Lesson not found" });
      res.json(lesson);
    } catch (error) {
      logger.error(`Error fetching lesson ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to fetch lesson" });
    }
  });

  // Stories
  app.get("/api/stories", async (_req, res) => {
    try {
      const stories = await storage.getStories();
      res.json(stories);
    } catch (error) {
      logger.error("Error fetching stories:", error);
      res.status(500).json({ message: "Failed to fetch stories" });
    }
  });

  // Scenarios
  app.get("/api/scenarios", async (_req, res) => {
    try {
      const scenarios = await storage.getScenarios();
      res.json(scenarios);
    } catch (error) {
      logger.error("Error fetching scenarios:", error);
      res.status(500).json({ message: "Failed to fetch scenarios" });
    }
  });

  // User Progress (Protected)
  app.get("/api/progress", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const user = req.user!;
    try {
      const progress = await storage.getProgress(user.id);
      res.json(progress);
    } catch (error) {
      logger.error(`Error fetching progress for user ${user?.id}:`, error);
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  app.post("/api/progress/:lessonId", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const user = req.user!;
    try {
      const progress = await storage.markLessonComplete(
        user.id,
        Number(req.params.lessonId),
        req.body.completed ?? true
      );
      res.json(progress);
    } catch (error) {
      logger.error(`Error updating progress for user ${user?.id}, lesson ${req.params.lessonId}:`, error);
      res.status(500).json({ message: "Failed to update progress" });
    }
  });
  // Create Lesson (Admin)
  app.post("/api/lessons", async (req, res) => {
    if (!req.isAuthenticated() || !req.user!.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }
    try {
      const result = insertLessonSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid lesson data", errors: result.error.errors });
      }
      const lesson = await storage.createLesson(result.data);
      res.status(201).json(lesson);
    } catch (error) {
      logger.error("Error creating lesson:", error);
      res.status(500).json({ message: "Failed to create lesson" });
    }
  });

  app.post("/api/lessons/:id/complete", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const user = req.user!;
    try {
      const progress = await storage.markLessonComplete(
        user.id,
        Number(req.params.id),
        req.body.completed ?? true
      );
      res.json(progress);
    } catch (error) {
      logger.error(`Error completing lesson ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to complete lesson" });
    }
  });


  // Quizzes
  app.get("/api/quizzes", async (_req, res) => {
    try {
      const quizzes = await storage.getQuizzes();
      res.json(quizzes);
    } catch (error) {
      logger.error("Error fetching quizzes:", error);
      res.status(500).json({ message: "Failed to fetch quizzes" });
    }
  });

  app.get("/api/quizzes/:id", async (req, res) => {
    try {
      const quiz = await storage.getQuiz(Number(req.params.id));
      if (!quiz) return res.status(404).json({ message: "Quiz not found" });
      res.json(quiz);
    } catch (error) {
      logger.error(`Error fetching quiz ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to fetch quiz" });
    }
  });

  app.post("/api/quizzes", async (req, res) => {
    try {
      const quiz = await storage.createQuiz(req.body);
      res.status(201).json(quiz);
    } catch (error) {
      logger.error("Error creating quiz:", error);
      res.status(500).json({ message: "Failed to create quiz" });
    }
  });

  app.post("/api/quizzes/:id/questions", async (req, res) => {
    try {
      const question = await storage.createQuizQuestion({
        ...req.body,
        quizId: Number(req.params.id),
      });
      res.status(201).json(question);
    } catch (error) {
      logger.error("Error creating quiz question:", error);
      res.status(500).json({ message: "Failed to create quiz question" });
    }
  });

  app.post("/api/quizzes/:id/submit", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const user = req.user!;

    try {
      const result = quizSubmissionSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid request", errors: result.error.errors });
      }
      const { answers, timeSpent } = result.data;

      const quiz = await storage.getQuiz(Number(req.params.id));
      if (!quiz) return res.status(404).json({ message: "Quiz not found" });

      // Validate quiz has questions
      const totalQuestions = quiz.questions.length;
      if (totalQuestions === 0) {
        return res.status(400).json({ message: "Quiz has no questions" });
      }

      // Validate answers array length matches questions
      if (!Array.isArray(answers) || answers.length !== totalQuestions) {
        return res.status(400).json({ 
          message: `Invalid answers: expected ${totalQuestions} answers, got ${answers?.length || 0}` 
        });
      }

      // Calculate total points and validate
      const totalPoints = quiz.questions.reduce((sum, q) => sum + (q.points || 10), 0);
      if (totalPoints === 0) {
        return res.status(400).json({ message: "Quiz has no points configured" });
      }

      // Calculate score
      let score = 0;
      quiz.questions.forEach((question, index) => {
        const userAnswer = answers[index];
        const correctAnswer = question.correctAnswer;

        // Handle different question types
        if (question.questionType === 'mcq' || question.questionType === 'true_false') {
          if (userAnswer === correctAnswer) score += question.points || 10;
        } else if (question.questionType === 'fill_blank') {
          if (userAnswer?.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) {
            score += question.points || 10;
          }
        } else if (question.questionType === 'match') {
          // For match questions, compare arrays with error handling
          try {
            const parsedCorrectAnswer = JSON.parse(correctAnswer);
            if (JSON.stringify(userAnswer) === JSON.stringify(parsedCorrectAnswer)) {
              score += question.points || 10;
            }
          } catch (error) {
            logger.warn(`Invalid JSON in correctAnswer for question ${index + 1}:`, error);
            // Skip this question if JSON is invalid
          }
        }
      });

      // Calculate percentage safely
      const percentage = Math.round((score / totalPoints) * 100);
      const passed = percentage >= (quiz.passingScore || 70);

      const attempt = await storage.submitQuizAttempt({
        userId: user.id,
        quizId: Number(req.params.id),
        score,
        totalQuestions,
        answers: JSON.stringify(answers),
        timeSpent: timeSpent || 0,
        passed,
      });

      res.json({
        attempt,
        score,
        percentage,
        passed,
        totalQuestions,
      });
    } catch (error) {
      logger.error(`Error submitting quiz ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to submit quiz" });
    }
  });

  app.get("/api/quizzes/attempts", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const user = req.user!;

    try {
      const attempts = await storage.getQuizAttempts(user.id);
      res.json(attempts);
    } catch (error) {
      logger.error(`Error fetching quiz attempts for user ${user?.id}:`, error);
      res.status(500).json({ message: "Failed to fetch quiz attempts" });
    }
  });

  // User Stats
  app.get("/api/users/stats", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const user = req.user!;
    try {
      const stats = await storage.getUserStats(user.id);
      if (!stats) return res.status(404).json({ message: "Stats not found" });
      res.json(stats);
    } catch (error) {
      logger.error(`Error fetching stats for user ${user?.id}:`, error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  app.put("/api/users/stats", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const user = req.user!;
    try {
      const result = insertUserStatsSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid request", errors: result.error.errors });
      }
      const stats = await storage.updateUserStats(user.id, result.data);
      res.json(stats);
    } catch (error) {
      logger.error(`Error updating stats for user ${user?.id}:`, error);
      res.status(500).json({ message: "Failed to update stats" });
    }
  });

  // Gamification Aggregated Endpoints (matching use-gamification.ts)
  app.get("/api/gamification/stats", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const user = req.user!;
    try {
      const stats = await storage.getUserStats(user.id);
      if (!stats) return res.status(404).json({ message: "Stats not found" });
      res.json(stats);
    } catch (error) {
      logger.error(`Error fetching gamification stats:`, error);
      res.status(500).json({ message: "Server error" });
    }
  });

  app.put("/api/gamification/stats", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const user = req.user!;
    try {
      const result = insertUserStatsSchema.partial().safeParse(req.body);
      if (!result.success) return res.status(400).json({ errors: result.error.errors });
      const stats = await storage.updateUserStats(user.id, result.data);
      res.json(stats);
    } catch (error) {
      logger.error(`Error updating gamification stats:`, error);
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get("/api/gamification/daily-goal", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const user = req.user!;
    try {
      const goal = await storage.getDailyGoal(user.id);
      res.json(goal);
    } catch (error) {
      logger.error(`Error fetching daily goal:`, error);
      res.status(500).json({ message: "Server error" });
    }
  });

  app.put("/api/gamification/daily-goal", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const user = req.user!;
    try {
      const result = insertDailyGoalSchema.partial().safeParse(req.body);
      if (!result.success) return res.status(400).json({ errors: result.error.errors });
      const goal = await storage.updateDailyGoal(user.id, result.data);
      res.json(goal);
    } catch (error) {
      logger.error(`Error updating daily goal:`, error);
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get("/api/gamification/leaderboard", async (req, res) => {
    // Leaderboard is public for viewing, but we mark current user if authenticated
    try {
      const leaderboard = await storage.getLeaderboard();
      
      // If user is authenticated, mark their entry
      if (req.isAuthenticated() && req.user) {
        const userId = req.user!.id;
        const enrichedLeaderboard = leaderboard.map((entry) => ({
          ...entry,
          isCurrentUser: entry.user?.id === userId
        }));
        return res.json(enrichedLeaderboard);
      }
      
      res.json(leaderboard);
    } catch (error) {
      logger.error(`Error fetching leaderboard:`, error);
      res.status(500).json({ message: "Server error" });
    }
  });
}

  // ============================================
  // CACHE MANAGEMENT ENDPOINTS
  // ============================================
  
  /**
   * Clear cache manually
   * POST /api/cache/clear
   */
  app.post("/api/cache/clear", async (req, res) => {
    try {
      const { cacheManager } = await import("./middleware/cacheManager");
      const stats = cacheManager.clearCache();
      res.json({
        success: true,
        message: 'Cache cleared successfully',
        stats,
        memory: cacheManager.getMemoryUsage(),
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to clear cache',
        error: error.message,
      });
    }
  });

  /**
   * Get cache statistics
   * GET /api/cache/stats
   */
  app.get("/api/cache/stats", async (req, res) => {
    try {
      const { cacheManager } = await import("./middleware/cacheManager");
      res.json({
        stats: cacheManager.getStats(),
        memory: cacheManager.getMemoryUsage(),
        autoClearEnabled: cacheManager.isAutoClearEnabled(),
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * Start automatic cache clearing
   * POST /api/cache/auto-clear/start
   * Body: { interval: 30000 } // milliseconds
   */
  app.post("/api/cache/auto-clear/start", async (req, res) => {
    try {
      const { cacheManager } = await import("./middleware/cacheManager");
      const intervalMs = parseInt(req.body.interval) || 30000;
      cacheManager.startAutoClear(intervalMs);
      res.json({
        success: true,
        message: `Auto-clear started with ${intervalMs}ms interval`,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to start auto-clear',
        error: error.message,
      });
    }
  });

  /**
   * Stop automatic cache clearing
   * POST /api/cache/auto-clear/stop
   */
  app.post("/api/cache/auto-clear/stop", async (req, res) => {
    try {
      const { cacheManager } = await import("./middleware/cacheManager");
      cacheManager.stopAutoClear();
      res.json({
        success: true,
        message: 'Auto-clear stopped',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to stop auto-clear',
        error: error.message,
      });
    }
  });

  logger.info("✅ All routes registered successfully (including cache management)");
}
