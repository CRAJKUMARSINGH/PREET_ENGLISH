/**
 * Production-safe logger utility
 * Automatically disables console logs in production builds
 */

const isDev = import.meta.env.DEV || import.meta.env.MODE === 'development';
const isTest = import.meta.env.MODE === 'test';

export const logger = {
  /**
   * Log general information (disabled in production)
   */
  log: (...args: any[]) => {
    if (isDev) {
      console.log(...args);
    }
  },

  /**
   * Log warnings (disabled in production)
   */
  warn: (...args: any[]) => {
    if (isDev) {
      console.warn(...args);
    }
  },

  /**
   * Log errors (always enabled for error tracking)
   */
  error: (...args: any[]) => {
    console.error(...args);
    // TODO: Send to error tracking service (Sentry, etc.)
  },

  /**
   * Log info messages (disabled in production)
   */
  info: (...args: any[]) => {
    if (isDev) {
      console.info(...args);
    }
  },

  /**
   * Log debug messages (disabled in production and test)
   */
  debug: (...args: any[]) => {
    if (isDev && !isTest) {
      console.debug(...args);
    }
  },

  /**
   * Group logs (disabled in production)
   */
  group: (label: string) => {
    if (isDev) {
      console.group(label);
    }
  },

  groupEnd: () => {
    if (isDev) {
      console.groupEnd();
    }
  },

  /**
   * Log with timestamp (disabled in production)
   */
  time: (label: string) => {
    if (isDev) {
      console.time(label);
    }
  },

  timeEnd: (label: string) => {
    if (isDev) {
      console.timeEnd(label);
    }
  },
};

export default logger;
