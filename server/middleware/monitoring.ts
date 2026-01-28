import { Request, Response, NextFunction } from 'express';
import logger from '../logger.js';

interface CircuitBreakerOptions {
  failureThreshold: number;
  resetTimeout: number;
  monitoringPeriod: number;
}

enum CircuitState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  HALF_OPEN = 'HALF_OPEN'
}

class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failureCount = 0;
  private lastFailureTime = 0;
  private successCount = 0;
  private options: CircuitBreakerOptions;

  constructor(options: CircuitBreakerOptions) {
    this.options = options;
  }

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === CircuitState.OPEN) {
      if (Date.now() - this.lastFailureTime > this.options.resetTimeout) {
        this.state = CircuitState.HALF_OPEN;
        this.successCount = 0;
        logger.info('Circuit breaker moved to HALF_OPEN state');
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() {
    this.failureCount = 0;
    
    if (this.state === CircuitState.HALF_OPEN) {
      this.successCount++;
      if (this.successCount >= 3) {
        this.state = CircuitState.CLOSED;
        logger.info('Circuit breaker moved to CLOSED state');
      }
    }
  }

  private onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.options.failureThreshold) {
      this.state = CircuitState.OPEN;
      logger.warn('Circuit breaker moved to OPEN state');
    }
  }

  getState(): CircuitState {
    return this.state;
  }

  getMetrics() {
    return {
      state: this.state,
      failureCount: this.failureCount,
      successCount: this.successCount,
      lastFailureTime: this.lastFailureTime
    };
  }
}

// Health check system
class HealthMonitor {
  private checks: Map<string, () => Promise<boolean>> = new Map();
  private lastResults: Map<string, { status: boolean; timestamp: number; error?: string }> = new Map();

  addCheck(name: string, checkFn: () => Promise<boolean>) {
    this.checks.set(name, checkFn);
  }

  async runCheck(name: string): Promise<{ status: boolean; error?: string }> {
    const checkFn = this.checks.get(name);
    if (!checkFn) {
      return { status: false, error: 'Check not found' };
    }

    try {
      const status = await checkFn();
      this.lastResults.set(name, { status, timestamp: Date.now() });
      return { status };
    } catch (error: any) {
      const result = { status: false, timestamp: Date.now(), error: error.message };
      this.lastResults.set(name, result);
      return { status: false, error: error.message };
    }
  }

  async runAllChecks(): Promise<{ [key: string]: { status: boolean; error?: string } }> {
    const results: { [key: string]: { status: boolean; error?: string } } = {};
    
    for (const [name] of this.checks) {
      results[name] = await this.runCheck(name);
    }
    
    return results;
  }

  getLastResults() {
    const results: { [key: string]: any } = {};
    for (const [name, result] of this.lastResults) {
      results[name] = result;
    }
    return results;
  }
}

// Performance monitoring middleware
export const performanceMonitor = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const startMemory = process.memoryUsage();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const endMemory = process.memoryUsage();
    
    const metrics = {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration,
      memoryDelta: {
        rss: endMemory.rss - startMemory.rss,
        heapUsed: endMemory.heapUsed - startMemory.heapUsed
      }
    };

    // Log slow requests
    if (duration > 1000) {
      logger.warn('Slow request detected:', metrics);
    }

    // Log high memory usage
    if (metrics.memoryDelta.heapUsed > 10 * 1024 * 1024) { // 10MB
      logger.warn('High memory usage detected:', metrics);
    }
  });

  next();
};

export { CircuitBreaker, HealthMonitor };