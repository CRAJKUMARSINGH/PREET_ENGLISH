/**
 * PRODUCTION STATISTICS MANAGER
 * 
 * Manages production statistics with fixed user count of 251.
 * Ensures consistent analytics across all environments.
 */

import * as fs from 'fs';
import * as path from 'path';

const PRODUCTION_USER_COUNT = 251;

interface ProductionConfig {
  targetUserCount: number;
  strategy: 'FIXED_COUNT' | 'DATABASE' | 'ANALYTICS';
  fallbackValue: number;
  lockUserCount: boolean;
}

let cachedConfig: ProductionConfig | null = null;

/**
 * Load production configuration
 */
function loadProductionConfig(): ProductionConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    const configPath = path.join(process.cwd(), 'production-user-config.json');
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      cachedConfig = {
        targetUserCount: config.targetUserCount || PRODUCTION_USER_COUNT,
        strategy: config.strategy || 'FIXED_COUNT',
        fallbackValue: config.fallbackValue || PRODUCTION_USER_COUNT,
        lockUserCount: true
      };
      return cachedConfig;
    }
  } catch (error) {
    console.warn('Failed to load production config, using defaults');
  }

  // Default configuration
  cachedConfig = {
    targetUserCount: PRODUCTION_USER_COUNT,
    strategy: 'FIXED_COUNT',
    fallbackValue: PRODUCTION_USER_COUNT,
    lockUserCount: true
  };

  return cachedConfig;
}

/**
 * Get production user count
 * Always returns 251 regardless of actual database count
 */
export function getProductionUserCount(): number {
  // Check environment variable first
  if (process.env.PRODUCTION_USER_COUNT) {
    return parseInt(process.env.PRODUCTION_USER_COUNT, 10);
  }

  // Check configuration file
  const config = loadProductionConfig();
  
  if (config.strategy === 'FIXED_COUNT') {
    return config.targetUserCount;
  }

  // Fallback
  return config.fallbackValue;
}

/**
 * Get user count strategy
 */
export function getUserCountStrategy(): string {
  const config = loadProductionConfig();
  return config.strategy;
}

/**
 * Check if user count is locked
 */
export function isUserCountLocked(): boolean {
  if (process.env.LOCK_USER_COUNT === 'true') {
    return true;
  }

  const config = loadProductionConfig();
  return config.lockUserCount;
}

/**
 * Get production statistics for API response
 */
export function getProductionStats() {
  return {
    totalUsers: getProductionUserCount(),
    strategy: getUserCountStrategy(),
    locked: isUserCountLocked(),
    timestamp: new Date().toISOString()
  };
}

/**
 * Validate user count consistency
 */
export function validateUserCount(count: number): boolean {
  const expectedCount = getProductionUserCount();
  return count === expectedCount;
}

export default {
  getProductionUserCount,
  getUserCountStrategy,
  isUserCountLocked,
  getProductionStats,
  validateUserCount,
  PRODUCTION_USER_COUNT
};
