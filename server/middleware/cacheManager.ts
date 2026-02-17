/**
 * Cache Manager Middleware
 * Handles cache deletion and management during high load
 */

import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

interface CacheStats {
  totalClears: number;
  lastClearTime: number;
  memoryBefore: number;
  memoryAfter: number;
  clearDuration: number;
}

class CacheManager {
  private stats: CacheStats = {
    totalClears: 0,
    lastClearTime: 0,
    memoryBefore: 0,
    memoryAfter: 0,
    clearDuration: 0,
  };

  private clearInterval: NodeJS.Timeout | null = null;
  private isEnabled: boolean = false;

  /**
   * Start automatic cache clearing
   */
  startAutoClear(intervalMs: number = 30000) {
    if (this.clearInterval) {
      logger.warn('Cache auto-clear already running');
      return;
    }

    this.isEnabled = true;
    logger.info(`Starting cache auto-clear every ${intervalMs}ms`);

    this.clearInterval = setInterval(() => {
      this.clearCache();
    }, intervalMs);
  }

  /**
   * Stop automatic cache clearing
   */
  stopAutoClear() {
    if (this.clearInterval) {
      clearInterval(this.clearInterval);
      this.clearInterval = null;
      this.isEnabled = false;
      logger.info('Stopped cache auto-clear');
    }
  }

  /**
   * Manually clear cache
   */
  clearCache(): CacheStats {
    const startTime = Date.now();
    const memoryBefore = process.memoryUsage();

    try {
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      // Clear Node.js module cache (be careful with this in production)
      // Only clear specific cached data, not core modules
      this.clearDataCache();

      const memoryAfter = process.memoryUsage();
      const duration = Date.now() - startTime;

      this.stats = {
        totalClears: this.stats.totalClears + 1,
        lastClearTime: Date.now(),
        memoryBefore: memoryBefore.heapUsed,
        memoryAfter: memoryAfter.heapUsed,
        clearDuration: duration,
      };

      const memoryFreed = memoryBefore.heapUsed - memoryAfter.heapUsed;
      const memoryFreedMB = (memoryFreed / 1024 / 1024).toFixed(2);

      logger.info(`Cache cleared #${this.stats.totalClears}: Freed ${memoryFreedMB}MB in ${duration}ms`);

      return this.stats;
    } catch (error) {
      logger.error('Cache clear error:', error);
      throw error;
    }
  }

  /**
   * Clear application-specific data cache
   */
  private clearDataCache() {
    // Clear any in-memory caches your app uses
    // Example: Clear lesson cache, user cache, etc.
    
    // If you're using a cache library like node-cache:
    // cache.flushAll();
    
    // If you have custom caches:
    // lessonCache.clear();
    // userCache.clear();
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    return { ...this.stats };
  }

  /**
   * Check if auto-clear is enabled
   */
  isAutoClearEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Get current memory usage
   */
  getMemoryUsage() {
    const usage = process.memoryUsage();
    return {
      heapUsed: (usage.heapUsed / 1024 / 1024).toFixed(2) + ' MB',
      heapTotal: (usage.heapTotal / 1024 / 1024).toFixed(2) + ' MB',
      rss: (usage.rss / 1024 / 1024).toFixed(2) + ' MB',
      external: (usage.external / 1024 / 1024).toFixed(2) + ' MB',
    };
  }
}

// Singleton instance
export const cacheManager = new CacheManager();

/**
 * Express middleware to clear cache on demand
 */
export function cacheMiddleware(req: Request, res: Response, next: NextFunction) {
  // Add cache manager to request object
  (req as any).cacheManager = cacheManager;
  next();
}

/**
 * Express route handler to manually trigger cache clear
 */
export function clearCacheHandler(req: Request, res: Response) {
  try {
    const stats = cacheManager.clearCache();
    res.json({
      success: true,
      message: 'Cache cleared successfully',
      stats,
      memory: cacheManager.getMemoryUsage(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to clear cache',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * Express route handler to get cache stats
 */
export function getCacheStatsHandler(req: Request, res: Response) {
  res.json({
    stats: cacheManager.getStats(),
    memory: cacheManager.getMemoryUsage(),
    autoClearEnabled: cacheManager.isAutoClearEnabled(),
  });
}

/**
 * Express route handler to start auto-clear
 */
export function startAutoClearHandler(req: Request, res: Response) {
  const intervalMs = parseInt(req.body.interval) || 30000;
  
  try {
    cacheManager.startAutoClear(intervalMs);
    res.json({
      success: true,
      message: `Auto-clear started with ${intervalMs}ms interval`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to start auto-clear',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * Express route handler to stop auto-clear
 */
export function stopAutoClearHandler(req: Request, res: Response) {
  try {
    cacheManager.stopAutoClear();
    res.json({
      success: true,
      message: 'Auto-clear stopped',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to stop auto-clear',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

export default cacheManager;
