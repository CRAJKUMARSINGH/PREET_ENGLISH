import pLimit from 'p-limit';
import pRetry from 'p-retry';

// Limit concurrent operations to prevent overwhelming the system
const dbLimit = pLimit(10); // Database operations
const apiLimit = pLimit(5);  // External API calls (like OpenAI)
const generalLimit = pLimit(20); // General operations

export interface ConcurrencyOptions {
  retries?: number;
  timeout?: number;
  minTimeout?: number;
  maxTimeout?: number;
  onFailedAttempt?: (error: any) => void;
}

export async function withDatabaseConcurrency<T>(
  fn: () => Promise<T>,
  options: ConcurrencyOptions = {}
): Promise<T> {
  return dbLimit(() =>
    pRetry(fn, {
      retries: options.retries ?? 3,
      minTimeout: options.minTimeout ?? 500,
      maxTimeout: options.maxTimeout ?? 3000,
      onFailedAttempt: options.onFailedAttempt || ((error: any) => {
        console.warn(
          `[DB RETRY] Attempt ${error.attemptNumber} failed. ` +
          `${error.retriesLeft} retries left. Error: ${error.message || 'Unknown error'}`
        );
      }),
    })
  );
}

export async function withAPIConcurrency<T>(
  fn: () => Promise<T>,
  options: ConcurrencyOptions = {}
): Promise<T> {
  return apiLimit(() =>
    pRetry(fn, {
      retries: options.retries ?? 5,
      minTimeout: options.minTimeout ?? 1000,
      maxTimeout: options.maxTimeout ?? 10000,
      onFailedAttempt: options.onFailedAttempt || ((error: any) => {
        console.warn(
          `[API RETRY] Attempt ${error.attemptNumber} failed. ` +
          `${error.retriesLeft} retries left. Error: ${error.message || 'Unknown error'}`
        );
      }),
    })
  );
}

export async function withGeneralConcurrency<T>(
  fn: () => Promise<T>,
  options: ConcurrencyOptions = {}
): Promise<T> {
  return generalLimit(() =>
    pRetry(fn, {
      retries: options.retries ?? 2,
      minTimeout: options.minTimeout ?? 200,
      maxTimeout: options.maxTimeout ?? 2000,
      onFailedAttempt: options.onFailedAttempt || ((error: any) => {
        console.warn(
          `[GENERAL RETRY] Attempt ${error.attemptNumber} failed. ` +
          `${error.retriesLeft} retries left. Error: ${error.message || 'Unknown error'}`
        );
      }),
    })
  );
}

// Specialized wrappers for common operations
export async function callExternalAPI<T>(
  fn: () => Promise<T>,
  serviceName: string = 'External API'
): Promise<T> {
  return withAPIConcurrency(fn, {
    retries: 3,
    timeout: 15000,
    onFailedAttempt: (error) => {
      console.warn(
        `[${serviceName}] Attempt ${error.attemptNumber} failed. ` +
        `${error.retriesLeft} retries left. Error: ${error.message}`
      );
    },
  });
}

export async function performDatabaseOperation<T>(
  fn: () => Promise<T>,
  operationName: string = 'Database Operation'
): Promise<T> {
  return withDatabaseConcurrency(fn, {
    retries: 3,
    onFailedAttempt: (error) => {
      console.warn(
        `[${operationName}] Attempt ${error.attemptNumber} failed. ` +
        `${error.retriesLeft} retries left. Error: ${error.message}`
      );
    },
  });
}

// Batch processing with concurrency control
export async function processBatch<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  batchSize: number = 5
): Promise<R[]> {
  const limit = pLimit(batchSize);
  
  return Promise.all(
    items.map(item =>
      limit(() => processor(item))
    )
  );
}

// Rate limiting for user requests
const userRequestLimits = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  userId: string,
  maxRequests: number = 100,
  windowMs: number = 60000 // 1 minute
): boolean {
  const now = Date.now();
  const userLimit = userRequestLimits.get(userId);

  if (!userLimit || now > userLimit.resetTime) {
    userRequestLimits.set(userId, {
      count: 1,
      resetTime: now + windowMs,
    });
    return true;
  }

  if (userLimit.count >= maxRequests) {
    return false;
  }

  userLimit.count++;
  return true;
}

// Get concurrency statistics
export const getConcurrencyStats = () => {
  return {
    database: {
      activeCount: dbLimit.activeCount,
      pendingCount: dbLimit.pendingCount,
    },
    api: {
      activeCount: apiLimit.activeCount,
      pendingCount: apiLimit.pendingCount,
    },
    general: {
      activeCount: generalLimit.activeCount,
      pendingCount: generalLimit.pendingCount,
    },
    rateLimits: {
      activeUsers: userRequestLimits.size,
    },
  };
};

// Cleanup old rate limit entries
setInterval(() => {
  const now = Date.now();
  const entries = Array.from(userRequestLimits.entries());
  for (const [userId, limit] of entries) {
    if (now > limit.resetTime) {
      userRequestLimits.delete(userId);
    }
  }
}, 60000); // Clean up every minute