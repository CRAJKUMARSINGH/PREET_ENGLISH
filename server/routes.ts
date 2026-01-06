import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { calculateSRS } from "./lib/SRS";
import { User, insertActivityFeedSchema, insertContentRatingSchema } from "@shared/schema";

import { setupAuth } from "./auth";

export async function registerRoutes(
  httpServer: Server | null,
  app: Express
): Promise<Server | null> {
  setupAuth(app);

  // Health check endpoint for Render
  app.get('/api/health', (req, res) => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: 'connected'
    });
  });

  // Lessons
  app.get(api.lessons.list.path, async (req, res) => {
    const lessons = await storage.getLessons();
    res.json(lessons);
  });

  app.get(api.lessons.get.path, async (req, res) => {
    const lesson = await storage.getLesson(Number(req.params.id));
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.json(lesson);
  });

  app.post(api.lessons.create.path, async (req, res) => {
    try {
      const input = api.lessons.create.input.parse(req.body);
      const lesson = await storage.createLesson(input);
      res.status(201).json(lesson);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  // Vocabulary
  app.get(api.vocabulary.list.path, async (req, res) => {
    const vocab = await storage.getVocabularyForLesson(Number(req.params.id));
    res.json(vocab);
  });

  app.get("/api/vocabulary/category/:category", async (req, res) => {
    const vocab = await storage.getVocabularyByCategory(req.params.category);
    res.json(vocab);
  });

  app.get(api.vocabulary.due.path, async (req, res) => {
    // Mock user ID 1
    const userId = 1;
    const date = new Date().toISOString();
    const dueVocab = await storage.getVocabularyDueForReview(userId, date);

    // Map to response format
    const response = dueVocab.map(item => ({
      ...item.vocabulary,
      nextReviewDate: item.nextReviewDate,
      interval: item.interval || 0
    }));

    res.json(response);
  });

  app.post(api.vocabulary.review.path, async (req, res) => {
    try {
      const { vocabularyId, quality } = api.vocabulary.review.input.parse(req.body);
      const userId = 1; // Mock user ID

      // Get existing progress or defaults
      const existing = await storage.getVocabularyProgress(userId, vocabularyId);

      // Calculate new SRS parameters
      const srsResult = calculateSRS(quality, {
        interval: existing?.interval || 0,
        repetition: existing?.repetition || 0,
        easeFactor: existing?.easeFactor || 250
      });

      // Update DB
      const updated = await storage.updateVocabularyProgress(userId, vocabularyId, {
        interval: srsResult.stats.interval,
        repetition: srsResult.stats.repetition,
        easeFactor: srsResult.stats.easeFactor,
        nextReviewDate: srsResult.nextReviewDate.toISOString(),
        lastReviewedAt: new Date().toISOString()
      });

      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  // Progress
  app.get(api.progress.list.path, async (req, res) => {
    // Mock user ID 1 for now until auth is added
    const userId = 1;
    const prog = await storage.getUserProgress(userId);
    res.json(prog);
  });

  app.post(api.progress.markComplete.path, async (req, res) => {
    const userId = 1; // Mock user
    const lessonId = Number(req.params.id);
    const { completed } = req.body;

    const updated = await storage.updateProgress(userId, lessonId, completed);
    res.json(updated);
  });

  // Search endpoint
  app.get('/api/search', async (req, res) => {
    const query = req.query.q as string;

    if (!query || query.length < 3) {
      return res.json([]);
    }

    const results = await storage.search(query);
    res.json(results);
  });

  // Quizzes
  app.get(api.quizzes.list.path, async (req, res) => {
    const quizzes = await storage.getQuizzes();
    res.json(quizzes);
  });

  app.get(api.quizzes.get.path, async (req, res) => {
    const quiz = await storage.getQuiz(Number(req.params.id));
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  });

  app.post(api.quizzes.create.path, async (req, res) => {
    try {
      const input = api.quizzes.create.input.parse(req.body);
      const quiz = await storage.createQuiz(input);
      res.status(201).json(quiz);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.get(api.quizzes.questions.list.path, async (req, res) => {
    const questions = await storage.getQuizQuestions(Number(req.params.id));
    res.json(questions);
  });

  app.post(api.quizzes.questions.create.path, async (req, res) => {
    try {
      const input = { ...api.quizzes.questions.create.input.parse(req.body), quizId: Number(req.params.id) };
      const question = await storage.createQuizQuestion(input);
      res.status(201).json(question);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.post(api.quizzes.attempts.submit.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const userId = (req.user as User).id;
      const input = { ...api.quizzes.attempts.submit.input.parse(req.body), userId, quizId: Number(req.params.id) };
      const attempt = await storage.submitQuizAttempt(input);
      res.status(201).json(attempt);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.get(api.quizzes.attempts.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const userId = (req.user as User).id;
    const attempts = await storage.getUserQuizAttempts(userId, Number(req.params.id));
    res.json(attempts);
  });

  app.get(api.quizzes.attempts.userAttempts.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const userId = (req.user as User).id;
    const attempts = await storage.getUserQuizAttempts(userId);
    res.json(attempts);
  });

  app.get("/api/lessons/:id/quiz", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const quiz = await storage.getQuizByLessonId(Number(req.params.id));
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  });


  // Gamification routes
  app.get(api.gamification.userStats.get.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const userId = (req.user as User).id;
    const stats = await storage.getUserStats(userId);
    if (!stats) {
      return res.status(404).json({ message: 'User stats not found' });
    }
    res.json(stats);
  });

  app.put(api.gamification.userStats.update.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const userId = (req.user as User).id;
      const input = api.gamification.userStats.update.input.parse(req.body);
      const stats = await storage.updateUserStats(userId, input);
      res.json(stats);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.get(api.gamification.achievements.list.path, async (req, res) => {
    const achievements = await storage.getAchievements();
    res.json(achievements);
  });

  app.get(api.gamification.achievements.userAchievements.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const userId = (req.user as User).id;
    const userAchievements = await storage.getUserAchievements(userId);
    res.json(userAchievements);
  });

  app.post(api.gamification.achievements.unlock.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const userId = (req.user as User).id;
      const achievementId = Number(req.params.id);
      const userAchievement = await storage.unlockAchievement(userId, achievementId);
      res.status(201).json(userAchievement);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.get(api.gamification.dailyGoals.get.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const userId = (req.user as User).id;
    const date = req.params.date;
    const goal = await storage.getDailyGoal(userId, date);
    if (!goal) {
      // Create default if missing or return 404
      return res.status(404).json({ message: 'Daily goal not found' });
    }
    res.json(goal);
  });

  app.put(api.gamification.dailyGoals.update.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const userId = (req.user as User).id;
      const date = req.params.date;
      const input = api.gamification.dailyGoals.update.input.parse(req.body);
      const goal = await storage.updateDailyGoal(userId, date, input);
      res.json(goal);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.get(api.gamification.leaderboard.get.path, async (req, res) => {
    const weekStart = req.query.weekStart as string;
    const leaderboard = await storage.getLeaderboard(weekStart);
    res.json(leaderboard);
  });

  // Scenario routes
  app.get(api.scenarios.list.path, async (req, res) => {
    const scenarios = await storage.getScenarios();
    res.json(scenarios);
  });

  app.get(api.scenarios.get.path, async (req, res) => {
    const scenario = await storage.getScenario(Number(req.params.id));
    if (!scenario) {
      return res.status(404).json({ message: 'Scenario not found' });
    }
    res.json(scenario);
  });

  app.post(api.scenarios.create.path, async (req, res) => {
    try {
      const input = api.scenarios.create.input.parse(req.body);
      const scenario = await storage.createScenario(input);
      res.status(201).json(scenario);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.get(api.scenarios.progress.get.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const userId = (req.user as User).id;
    const scenarioId = Number(req.params.id);
    const progress = await storage.getScenarioProgress(userId, scenarioId);
    if (!progress) {
      return res.status(404).json({ message: 'Scenario progress not found' });
    }
    res.json(progress);
  });

  app.put(api.scenarios.progress.update.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const userId = (req.user as User).id;
      const scenarioId = Number(req.params.id);
      const input = req.body; // Use partial update
      const progress = await storage.updateScenarioProgress(userId, scenarioId, input);
      res.json(progress);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.get(api.scenarios.progress.userProgress.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const userId = (req.user as User).id;
    const progress = await storage.getUserScenarioProgress(userId);
    res.json(progress);
  });

  // Certification routes
  app.get(api.certifications.userCertifications.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const userId = (req.user as User).id;
    const userCertifications = await storage.getUserCertifications(userId);
    res.json(userCertifications);
  });

  app.post(api.certifications.create.path, async (req, res) => {
    try {
      const input = api.certifications.create.input.parse(req.body);
      const certification = await storage.createCertification(input);
      res.status(201).json(certification);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  // Seeding
  // SRS & Stories (Phase 3)
  app.get("/api/stories", async (req, res) => {
    const stories = await storage.getStories();
    res.json(stories);
  });

  app.get("/api/stories/:id", async (req, res) => {
    const story = await storage.getStory(Number(req.params.id));
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.json(story);
  });

  app.get("/api/vocabulary/review", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const userId = (req.user as User).id;
    const today = new Date().toISOString();
    const due = await storage.getVocabularyDueForReview(userId, today);
    res.json(due);
  });

  // Listenings
  app.get("/api/listenings", async (req, res) => {
    const data = await storage.getListenings();
    res.json(data);
  });

  app.get("/api/listenings/:id", async (req, res) => {
    const data = await storage.getListening(Number(req.params.id));
    if (!data) return res.status(404).json({ message: "Listening lesson not found" });
    res.json(data);
  });

  // Speaking Topics
  app.get("/api/speaking-topics", async (req, res) => {
    const data = await storage.getSpeakingTopics();
    res.json(data);
  });

  app.get("/api/speaking-topics/:id", async (req, res) => {
    const data = await storage.getSpeakingTopic(Number(req.params.id));
    if (!data) return res.status(404).json({ message: "Speaking topic not found" });
    res.json(data);
  });


  // Activity Feed (Phase 4)
  app.get('/api/activity-feed', async (req, res) => {
    const feed = await storage.getActivityFeed();
    res.json(feed);
  });

  app.post('/api/activity-feed', async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const input = insertActivityFeedSchema.parse({
        ...req.body,
        userId: (req.user as User).id
      });
      const entry = await storage.createActivityEntry(input);
      res.status(201).json(entry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  // Content Ratings (Phase 4)
  app.get('/api/content-ratings/:type/:id', async (req, res) => {
    const ratings = await storage.getContentRatings(req.params.type, Number(req.params.id));
    res.json(ratings);
  });

  app.post('/api/content-ratings', async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const input = insertContentRatingSchema.parse({
        ...req.body,
        userId: (req.user as User).id
      });
      const rating = await storage.createContentRating(input);

      // Also create an activity feed entry for this rating
      await storage.createActivityEntry({
        userId: (req.user as User).id,
        type: 'RATING',
        referenceId: rating.contentId,
        content: `Rated a ${input.contentType.toLowerCase()} ${input.rating} stars!`
      });
      res.status(201).json(rating);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.get('/api/community/buddies', async (req, res) => {
    const users = await storage.getPublicUsers();
    res.json(users);
  });

  // Seeding
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existing = await storage.getLessons();
  if (existing.length === 0) {
    // Create mock user
    await storage.createUser({
      username: "student",
      password: "password123", // In real app, hash this!
      isAdmin: false
    });

    // Lesson 1
    const l1 = await storage.createLesson({
      title: "Introduction to Greetings",
      slug: "intro-greetings",
      description: "Learn how to say hello and introduce yourself.",
      content: "# Greetings\n\nIn this lesson, we will learn basic greetings.\n\n- **Hello**: A formal greeting.\n- **Hi**: An informal greeting.\n",
      difficulty: "Beginner",
      order: 1,
      imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80"
    });

    await storage.createVocabulary({
      lessonId: l1.id,
      word: "Hello",
      definition: "Used as a greeting or to begin a telephone conversation.",
      pronunciation: "/həˈləʊ/",
      example: "Hello, how are you?"
    });

    await storage.createVocabulary({
      lessonId: l1.id,
      word: "Morning",
      definition: "The period of time between midnight and noon, especially from sunrise to noon.",
      pronunciation: "/ˈmɔːnɪŋ/",
      example: "Good morning!"
    });

    // Lesson 2
    const l2 = await storage.createLesson({
      title: "Common Verbs",
      slug: "common-verbs",
      description: "Essential verbs for daily communication.",
      content: "# Verbs\n\nVerbs are action words.\n\n- **To be**: I am, you are, he is.\n- **To have**: I have, you have.",
      difficulty: "Beginner",
      order: 2,
      imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80"
    });

    await storage.createVocabulary({
      lessonId: l2.id,
      word: "Run",
      definition: "Move at a speed faster than a walk.",
      pronunciation: "/rʌn/",
      example: "I run every morning."
    });

    // Create sample quiz
    const quiz1 = await storage.createQuiz({
      title: "Basic Greetings Quiz",
      titleHindi: "बुनियादी अभिवादन प्रश्नोत्तरी",
      description: "Test your knowledge of basic English greetings",
      difficulty: "Beginner",
      category: "Greetings",
      passingScore: 70,
      timeLimit: 10,
      order: 1
    });

    await storage.createQuizQuestion({
      quizId: quiz1.id,
      questionText: "What is the most common formal greeting?",
      questionTextHindi: "सबसे आम औपचारिक अभिवादन क्या है?",
      questionType: "multiple_choice",
      options: JSON.stringify(["Hello", "Hi", "Hey", "Yo"]),
      correctAnswer: "Hello",
      explanation: "Hello is the most common formal greeting in English",
      points: 10,
      order: 1
    });

    await storage.createQuizQuestion({
      quizId: quiz1.id,
      questionText: "Fill in the blank: Good _____!",
      questionTextHindi: "रिक्त स्थान भरें: गुड _____!",
      questionType: "fill_blank",
      options: JSON.stringify(["morning", "evening", "night", "day"]),
      correctAnswer: "morning",
      explanation: "The common greeting is Good morning!",
      points: 10,
      order: 2
    });

    // Create sample achievements
    await storage.createAchievement({
      name: "First Steps",
      nameHindi: "पहले कदम",
      description: "Complete your first lesson",
      descriptionHindi: "अपना पहला पाठ पूरा करें",
      icon: "🎯",
      xpReward: 50,
      requirement: JSON.stringify({ type: 'lessons_completed', value: 1 }),
      category: "lessons"
    });

    await storage.createAchievement({
      name: "Quiz Master",
      nameHindi: "प्रश्नोत्तरी मास्टर",
      description: "Score 100% on any quiz",
      descriptionHindi: "किसी भी प्रश्नोत्तरी में 100% स्कोर करें",
      icon: "🏆",
      xpReward: 100,
      requirement: JSON.stringify({ type: 'quiz_perfect', value: 1 }),
      category: "quiz"
    });

    await storage.createAchievement({
      name: "Week Warrior",
      nameHindi: "सप्ताह योद्धा",
      description: "Maintain a 7-day streak",
      descriptionHindi: "7 दिन की स्ट्रीक बनाए रखें",
      icon: "🔥",
      xpReward: 200,
      requirement: JSON.stringify({ type: 'streak', value: 7 }),
      category: "streak"
    });

    // Initialize user stats
    await storage.updateUserStats(1, {
      xpPoints: 0,
      level: 1,
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: new Date().toISOString().split('T')[0]
    });

    // Phase 3: Add sample stories
    await storage.createStory({
      title: "The Golden Bird",
      titleHindi: "सुनहरी चिड़िया",
      description: "A classic folk tale about kindness and greed.",
      descriptionHindi: "दयालुता और लालच के बारे में एक लोक कथा।",
      content: "Once upon a time, there lived a golden bird in a deep forest. She sang beautiful songs every morning. One day, a hunter came and tried to catch her.\n\nThe bird flew high into the sky and said, 'If you let me go, I will give you a golden feather.' The hunter agreed, and the bird kept her word.",
      contentHindi: "एक समय की बात है, एक गहरे जंगल में एक सुनहरी चिड़िया रहती थी। वह हर सुबह सुंदर गीत गाती थी। एक दिन, एक शिकारी आया और उसने उसे पकड़ने की कोशिश की।\n\nचिड़िया आसमान में ऊँची उड़ी और बोली, 'अगर तुम मुझे जाने दोगे, तो मैं तुम्हें एक सुनहरा पंख दूँगी।' शिकारी मान गया, और चिड़िया ने अपनी बात रखी।",
      imageUrl: "https://images.unsplash.com/photo-1552084117-56a987666449?auto=format&fit=crop&q=80&w=800",
      difficulty: "Beginner",
      category: "Folk Tale",
      order: 1
    });

    await storage.createStory({
      title: "The Busy Market",
      titleHindi: "व्यस्त बाजार",
      description: "Learn essential vocabulary for shopping in a crowded Indian market.",
      descriptionHindi: "भारतीय बाजार में खरीदारी के लिए आवश्यक शब्दावली सीखें।",
      content: "Walking through the market, Ravi saw many colorful stalls. He wanted to buy some fresh mangoes. 'How much for a kilo?' he asked the vendor.\n\nThe vendor replied, 'Eighty rupees, sir. They are very sweet today.' Ravi bought two kilos and went home happy.",
      contentHindi: "बाजार में चलते हुए रवि ने कई रंगीन स्टाल देखे। वह कुछ ताजे आम खरीदना चाहता था। 'एक किलो कितने का है?' उसने विक्रेता से पूछा।\n\nविक्रेता ने उत्तर दिया, 'अस्सी रुपये, सर। वे आज बहुत मीठे हैं।' रवि ने दो किलो खरीदे और खुशी-खुशी घर चला गया।",
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
      difficulty: "Intermediate",
      category: "Daily Life",
      order: 2
    });

    // Add some sample vocabulary for SRS testing
    // Link them to lesson 1
    await storage.createVocabulary({
      lessonId: 1,
      word: "Flawless",
      hindiTranslation: "बेदाग / त्रुटिहीन",
      pronunciation: "flaw-less",
      definition: "Without any blemishes or imperfections; perfect.",
      example: "Her performance was flawless."
    });

    // Initialize today's daily goal
    const today = new Date().toISOString().split('T')[0];
    await storage.updateDailyGoal(1, today, {
      lessonsTarget: 3,
      lessonsCompleted: 0,
      xpTarget: 50,
      xpEarned: 0,
      minutesTarget: 15,
      minutesSpent: 0,
      completed: false
    });

    // Create sample scenarios
    await storage.createScenario({
      title: "Restaurant Order",
      titleHindi: "रेस्टोरेंट ऑर्डर",
      description: "Practice ordering food at a restaurant",
      descriptionHindi: "रेस्टोरेंट में खाना ऑर्डर करने का अभ्यास करें",
      category: "restaurant",
      difficulty: "Beginner",
      dialogues: JSON.stringify([
        { speaker: "Waiter", english: "Good evening! Welcome to our restaurant.", hindi: "शुभ शाम! हमारे रेस्टोरेंट में आपका स्वागत है।" },
        { speaker: "Customer", english: "Good evening. I'd like to see the menu, please.", hindi: "शुभ शाम। कृपया मुझे मेनू देखना चाहिए।" },
        { speaker: "Waiter", english: "Here you go. What would you like to order?", hindi: "ये लीजिए। आप क्या ऑर्डर करना चाहेंगे?" },
        { speaker: "Customer", english: "I'll have the chicken curry and rice, please.", hindi: "मुझे चिकन करी और चावल चाहिए, कृपया।" }
      ]),
      tips: JSON.stringify([
        "Always say 'please' when ordering",
        "You can ask for recommendations",
        "Don't be afraid to ask questions about the menu"
      ]),
      xpReward: 30
    });

    await storage.createScenario({
      title: "Job Interview",
      titleHindi: "नौकरी का साक्षात्कार",
      description: "Practice common job interview questions",
      descriptionHindi: "आम नौकरी साक्षात्कार प्रश्नों का अभ्यास करें",
      category: "job_interview",
      difficulty: "Intermediate",
      dialogues: JSON.stringify([
        { speaker: "Interviewer", english: "Tell me about yourself.", hindi: "अपने बारे में बताएं।" },
        { speaker: "Candidate", english: "I have 3 years of experience in marketing.", hindi: "मेरे पास मार्केटिंग में 3 साल का अनुभव है।" },
        { speaker: "Interviewer", english: "Why do you want to work here?", hindi: "आप यहां क्यों काम करना चाहते हैं?" },
        { speaker: "Candidate", english: "I admire your company's values and growth.", hindi: "मैं आपकी कंपनी के मूल्यों और विकास की प्रशंसा करता हूं।" }
      ]),
      tips: JSON.stringify([
        "Research the company before the interview",
        "Prepare answers to common questions",
        "Dress professionally and be on time"
      ]),
      xpReward: 50
    });
  }
}
