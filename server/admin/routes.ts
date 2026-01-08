import type { Express } from 'express';
import { storage } from '../storage';
import { User } from '@shared/schema';
import { z } from 'zod';
import { clearCache } from '../lib/cache';
import { performDatabaseOperation } from '../lib/concurrency';

// Admin middleware
const requireAdmin = (req: any, res: any, next: any) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const user = req.user as User;
  if (!user.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }

  next();
};

// Validation schemas
const lessonValidationSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  content: z.string().min(100, 'Content must be at least 100 characters'),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  order: z.number().min(1),
  imageUrl: z.string().url().optional(),
});

const bulkImportSchema = z.object({
  lessons: z.array(lessonValidationSchema),
});

export function registerAdminRoutes(app: Express) {
  // Admin dashboard stats
  app.get('/api/admin/dashboard', requireAdmin, async (req, res) => {
    try {
      const stats = await performDatabaseOperation(async () => {
        const [
          totalLessons,
          totalUsers,
          totalQuizzes,
          totalStories,
          totalScenarios,
          recentActivity
        ] = await Promise.all([
          storage.getLessons().then(lessons => lessons.length),
          storage.getPublicUsers().then(users => users.length),
          storage.getQuizzes().then(quizzes => quizzes.length),
          storage.getStories().then(stories => stories.length),
          storage.getScenarios().then(scenarios => scenarios.length),
          storage.getActivityFeed().then(feed => feed.slice(0, 10))
        ]);

        return {
          totalLessons,
          totalUsers,
          totalQuizzes,
          totalStories,
          totalScenarios,
          recentActivity
        };
      }, 'Admin Dashboard Stats');

      res.json(stats);
    } catch (err) {
      console.error('Admin dashboard error:', err);
      res.status(500).json({ message: 'Error fetching dashboard stats' });
    }
  });

  // Lesson Management
  app.get('/api/admin/lessons', requireAdmin, async (req, res) => {
    try {
      const lessons = await performDatabaseOperation(
        () => storage.getLessons(),
        'Admin Get Lessons'
      );
      res.json(lessons);
    } catch (err) {
      console.error('Admin get lessons error:', err);
      res.status(500).json({ message: 'Error fetching lessons' });
    }
  });

  app.post('/api/admin/lessons', requireAdmin, async (req, res) => {
    try {
      const validatedData = lessonValidationSchema.parse(req.body);
      
      const lesson = await performDatabaseOperation(
        () => storage.createLesson(validatedData),
        'Admin Create Lesson'
      );

      // Clear lessons cache
      clearCache.lessons();
      
      res.status(201).json(lesson);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ 
          message: 'Validation error',
          errors: err.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
        });
      }
      console.error('Admin create lesson error:', err);
      res.status(500).json({ message: 'Error creating lesson' });
    }
  });

  app.put('/api/admin/lessons/:id', requireAdmin, async (req, res) => {
    try {
      const lessonId = Number(req.params.id);
      const validatedData = lessonValidationSchema.partial().parse(req.body);
      
      const lesson = await performDatabaseOperation(
        () => storage.updateLesson(lessonId, validatedData),
        'Admin Update Lesson'
      );

      // Clear related caches
      clearCache.lessons();
      clearCache.lesson(lessonId);
      
      res.json(lesson);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ 
          message: 'Validation error',
          errors: err.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
        });
      }
      console.error('Admin update lesson error:', err);
      res.status(500).json({ message: 'Error updating lesson' });
    }
  });

  app.delete('/api/admin/lessons/:id', requireAdmin, async (req, res) => {
    try {
      const lessonId = Number(req.params.id);
      
      await performDatabaseOperation(
        () => storage.deleteLesson(lessonId),
        'Admin Delete Lesson'
      );

      // Clear related caches
      clearCache.lessons();
      clearCache.lesson(lessonId);
      clearCache.vocabulary(lessonId);
      
      res.sendStatus(204);
    } catch (err) {
      console.error('Admin delete lesson error:', err);
      res.status(500).json({ message: 'Error deleting lesson' });
    }
  });

  // Content validation
  app.post('/api/admin/lessons/validate', requireAdmin, async (req, res) => {
    try {
      const { title, content, description, difficulty } = req.body;
      const errors: string[] = [];
      const warnings: string[] = [];

      // Title validation
      if (!title || title.length < 5) {
        errors.push('Title must be at least 5 characters');
      } else if (title.length > 100) {
        warnings.push('Title is quite long, consider shortening');
      }

      // Content validation
      if (!content || content.length < 100) {
        errors.push('Content must be at least 100 characters');
      } else if (content.length < 300) {
        warnings.push('Content seems short, consider adding more detail');
      }

      // Description validation
      if (!description || description.length < 10) {
        errors.push('Description must be at least 10 characters');
      }

      // Difficulty validation
      if (!['Beginner', 'Intermediate', 'Advanced'].includes(difficulty)) {
        errors.push('Difficulty must be Beginner, Intermediate, or Advanced');
      }

      // Check for common issues
      if (content && !content.includes('#')) {
        warnings.push('Consider adding markdown headers for better structure');
      }

      if (content && content.split('\n').length < 5) {
        warnings.push('Content might benefit from more paragraphs');
      }

      res.json({
        valid: errors.length === 0,
        errors,
        warnings,
        suggestions: [
          'Use markdown formatting for better readability',
          'Include examples and exercises',
          'Add relevant images or media',
          'Consider cultural context for Indian learners'
        ]
      });
    } catch (err) {
      console.error('Content validation error:', err);
      res.status(500).json({ message: 'Validation failed' });
    }
  });

  // Bulk operations
  app.post('/api/admin/lessons/bulk-import', requireAdmin, async (req, res) => {
    try {
      const { lessons } = bulkImportSchema.parse(req.body);
      
      const created = await performDatabaseOperation(async () => {
        const results = [];
        for (const lesson of lessons) {
          const created_lesson = await storage.createLesson(lesson);
          results.push(created_lesson);
        }
        return results;
      }, 'Admin Bulk Import');

      // Clear lessons cache
      clearCache.lessons();
      
      res.status(201).json({
        message: `Successfully imported ${created.length} lessons`,
        lessons: created,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ 
          message: 'Validation error in bulk import',
          errors: err.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
        });
      }
      console.error('Bulk import error:', err);
      res.status(500).json({ message: 'Bulk import failed' });
    }
  });

  app.get('/api/admin/lessons/export', requireAdmin, async (req, res) => {
    try {
      const lessons = await performDatabaseOperation(
        () => storage.getLessons(),
        'Admin Export Lessons'
      );
      
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', 'attachment; filename=lessons-export.json');
      res.json(lessons);
    } catch (err) {
      console.error('Export error:', err);
      res.status(500).json({ message: 'Export failed' });
    }
  });

  // User Management
  app.get('/api/admin/users', requireAdmin, async (req, res) => {
    try {
      const users = await performDatabaseOperation(
        () => storage.getPublicUsers(),
        'Admin Get Users'
      );
      res.json(users);
    } catch (err) {
      console.error('Admin get users error:', err);
      res.status(500).json({ message: 'Error fetching users' });
    }
  });

  app.put('/api/admin/users/:id/admin', requireAdmin, async (req, res) => {
    try {
      const userId = Number(req.params.id);
      const { isAdmin } = req.body;
      
      const user = await performDatabaseOperation(
        () => storage.updateUserAdminStatus(userId, isAdmin),
        'Admin Update User Status'
      );
      
      res.json(user);
    } catch (err) {
      console.error('Admin update user error:', err);
      res.status(500).json({ message: 'Error updating user' });
    }
  });

  // Content Analytics
  app.get('/api/admin/analytics/content', requireAdmin, async (req, res) => {
    try {
      const analytics = await performDatabaseOperation(async () => {
        const [lessons, quizzes, stories] = await Promise.all([
          storage.getLessons(),
          storage.getQuizzes(),
          storage.getStories()
        ]);

        return {
          lessonsByDifficulty: lessons.reduce((acc, lesson) => {
            acc[lesson.difficulty] = (acc[lesson.difficulty] || 0) + 1;
            return acc;
          }, {} as Record<string, number>),
          quizzesByCategory: quizzes.reduce((acc, quiz) => {
            acc[quiz.category] = (acc[quiz.category] || 0) + 1;
            return acc;
          }, {} as Record<string, number>),
          storiesByCategory: stories.reduce((acc, story) => {
            acc[story.category] = (acc[story.category] || 0) + 1;
            return acc;
          }, {} as Record<string, number>),
          totalContent: lessons.length + quizzes.length + stories.length
        };
      }, 'Admin Content Analytics');

      res.json(analytics);
    } catch (err) {
      console.error('Analytics error:', err);
      res.status(500).json({ message: 'Error fetching analytics' });
    }
  });

  // System Management
  app.post('/api/admin/cache/clear', requireAdmin, async (req, res) => {
    try {
      const { type } = req.body;
      
      if (type === 'all') {
        clearCache.all();
      } else if (clearCache[type as keyof typeof clearCache]) {
        (clearCache[type as keyof typeof clearCache] as Function)();
      } else {
        return res.status(400).json({ message: 'Invalid cache type' });
      }
      
      res.json({ message: `Cache ${type} cleared successfully` });
    } catch (err) {
      console.error('Cache clear error:', err);
      res.status(500).json({ message: 'Error clearing cache' });
    }
  });

  app.get('/api/admin/system/stats', requireAdmin, async (req, res) => {
    try {
      const { getCacheStats } = await import('../lib/cache');
      const { getConcurrencyStats } = await import('../lib/concurrency');
      
      const stats = {
        cache: getCacheStats(),
        concurrency: getConcurrencyStats(),
        memory: process.memoryUsage(),
        uptime: process.uptime(),
      };
      
      res.json(stats);
    } catch (err) {
      console.error('System stats error:', err);
      res.status(500).json({ message: 'Error fetching system stats' });
    }
  });
}