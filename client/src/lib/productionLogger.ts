/**
 * Production-Safe Logger
 * Replaces console statements with proper logging
 */

import * as Sentry from '@sentry/react';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: any;
}

class ProductionLogger {
  private isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';

  debug(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      console.debug('[DEBUG]', message, context);
    }
  }

  info(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      console.info('[INFO]', message, context);
    }
    // In production, could send to analytics
  }

  warn(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      console.warn('[WARN]', message, context);
    }
    Sentry.captureMessage(message, {
      level: 'warning',
      extra: context,
    });
  }

  error(message: string, error?: Error, context?: LogContext) {
    if (this.isDevelopment) {
      console.error('[ERROR]', message, error, context);
    }
    
    if (error) {
      Sentry.captureException(error, {
        extra: { message, ...context },
      });
    } else {
      Sentry.captureMessage(message, {
        level: 'error',
        extra: context,
      });
    }
  }

  // Performance logging
  performance(metric: string, value: number, context?: LogContext) {
    if (this.isDevelopment) {
      console.log(`[PERF] ${metric}: ${value}ms`, context);
    }
    // Could send to analytics service
  }
}

export const logger = new ProductionLogger();
export default logger;
