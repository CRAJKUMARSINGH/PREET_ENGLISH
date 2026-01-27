import { Express } from 'express';
import { requireAdmin } from '../middleware/sessionSecurity';
import { getAllAIUsage } from '../services/openai';

export function registerAdminRoutes(app: Express) {
  // Admin-only endpoint to monitor AI costs and usage
  app.get('/api/admin/ai-usage', requireAdmin, (req, res) => {
    try {
      const allStats = getAllAIUsage();
      const totalCost = allStats.reduce((sum, s) => sum + s.estimatedCost, 0);
      const totalTokens = allStats.reduce((sum, s) => sum + s.totalTokens, 0);
      const totalRequests = allStats.reduce((sum, s) => sum + s.requestCount, 0);
      
      res.json({
        summary: {
          totalCost: `$${totalCost.toFixed(2)}`,
          totalTokens,
          totalRequests,
          activeUsers: allStats.length,
        },
        users: allStats,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error fetching AI usage stats:', error);
      res.status(500).json({ message: 'Failed to fetch AI usage statistics' });
    }
  });

  // Admin endpoint to get system health
  app.get('/api/admin/system-health', requireAdmin, (req, res) => {
    try {
      const memoryUsage = process.memoryUsage();
      const uptime = process.uptime();
      
      res.json({
        status: 'healthy',
        uptime: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m`,
        memory: {
          used: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
          total: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
        },
        environment: process.env.NODE_ENV || 'development',
        nodeVersion: process.version,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error fetching system health:', error);
      res.status(500).json({ message: 'Failed to fetch system health' });
    }
  });

  // Admin endpoint to get user statistics
  app.get('/api/admin/user-stats', requireAdmin, async (req, res) => {
    try {
      // This would integrate with your existing storage system
      // For now, return placeholder data
      res.json({
        totalUsers: 0,
        activeUsers: 0,
        newUsersToday: 0,
        lessonsCompleted: 0,
        averageSessionTime: '0 minutes',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
      res.status(500).json({ message: 'Failed to fetch user statistics' });
    }
  });

  // Admin endpoint to manage feature flags
  app.get('/api/admin/feature-flags', requireAdmin, (req, res) => {
    try {
      const featureFlags = {
        aiVideoCall: true,
        pronunciationFeedback: true,
        storyGenerator: true,
        gamification: true,
        hindiTranslations: true,
        voicerooms: false, // Experimental
        bilingualReader: true,
      };
      
      res.json({
        flags: featureFlags,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error fetching feature flags:', error);
      res.status(500).json({ message: 'Failed to fetch feature flags' });
    }
  });

  // Admin endpoint to update feature flags
  app.post('/api/admin/feature-flags', requireAdmin, (req, res) => {
    try {
      const { flagName, enabled } = req.body;
      
      if (!flagName || typeof enabled !== 'boolean') {
        return res.status(400).json({ message: 'Invalid flag name or enabled value' });
      }
      
      // This would update feature flags in your database/config
      // For now, return success response
      res.json({
        message: `Feature flag '${flagName}' ${enabled ? 'enabled' : 'disabled'}`,
        flagName,
        enabled,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error updating feature flag:', error);
      res.status(500).json({ message: 'Failed to update feature flag' });
    }
  });
}