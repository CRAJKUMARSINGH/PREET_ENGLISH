import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';

export function initSentry() {
  if (!process.env.SENTRY_DSN) {
    console.warn('⚠️  Sentry DSN not configured - error tracking disabled');
    return;
  }

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    
    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    // Profiling
    profilesSampleRate: 0.1,
    integrations: [
      new ProfilingIntegration(),
      new Sentry.Integrations.Http({ tracing: true }),
    ],
    
    // Release tracking
    release: process.env.VERCEL_GIT_COMMIT_SHA || process.env.npm_package_version || 'dev',
    
    // Error filtering
    beforeSend(event, hint) {
      // Filter out expected errors
      const error = hint.originalException;
      if (error instanceof Error) {
        // Don't send connection errors
        if (error.message.includes('ECONNREFUSED') || 
            error.message.includes('ENOTFOUND')) {
          return null;
        }
        // Don't send rate limit errors
        if (error.message.includes('rate limit')) {
          return null;
        }
      }
      return event;
    },
    
    // Additional context
    initialScope: {
      tags: {
        deployment: process.env.VERCEL_ENV || 'local',
        version: process.env.npm_package_version || 'unknown',
      },
    },
  });

  console.log('✅ Sentry initialized successfully');
}

// Express middleware
export const sentryRequestHandler = Sentry.Handlers.requestHandler();
export const sentryTracingHandler = Sentry.Handlers.tracingHandler();
export const sentryErrorHandler = Sentry.Handlers.errorHandler();

// Custom error capture with context
export function captureError(error: Error, context?: Record<string, any>) {
  Sentry.withScope((scope) => {
    if (context) {
      scope.setContext('additional', context);
    }
    Sentry.captureException(error);
  });
}

// Capture message
export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
  Sentry.captureMessage(message, level);
}

// Set user context
export function setUser(user: { id: string; username?: string; email?: string }) {
  Sentry.setUser(user);
}

// Clear user context
export function clearUser() {
  Sentry.setUser(null);
}

// Add breadcrumb
export function addBreadcrumb(breadcrumb: Sentry.Breadcrumb) {
  Sentry.addBreadcrumb(breadcrumb);
}

// Transaction tracking
export function startTransaction(name: string, op: string) {
  return Sentry.startTransaction({ name, op });
}
