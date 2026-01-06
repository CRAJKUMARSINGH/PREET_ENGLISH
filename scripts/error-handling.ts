import { Logger } from "./progress-ux";

export interface RetryOptions {
  maxRetries: number;
  baseDelay: number; // in milliseconds
  maxDelay: number; // in milliseconds
  backoffMultiplier: number;
  jitter: boolean; // add randomization to avoid thundering herd
  retryableErrors?: (error: any) => boolean;
}

export interface ErrorHandlerOptions {
  logger?: Logger;
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
  jitter?: boolean;
  onRetry?: (attempt: number, error: any) => void;
  onMaxRetries?: (error: any) => void;
}

export interface GuardrailConfig {
  rateLimiting: {
    enabled: boolean;
    requestsPerMinute: number;
    windowMs: number;
  };
  contentFiltering: {
    enabled: boolean;
    blockedTerms: string[];
    minLength: number;
    maxLength: number;
  };
  qualityThreshold: {
    enabled: boolean;
    minScore: number;
  };
  culturalSensitivity: {
    enabled: boolean;
    allowedCategories: string[];
    blockedTopics: string[];
  };
  technicalConstraints: {
    enabled: boolean;
    maxFileSize: number; // in bytes
    allowedFileTypes: string[];
    timeout: number; // in milliseconds
  };
}

export class ErrorHandler {
  private logger: Logger;
  private defaultRetryOptions: RetryOptions;

  constructor(options?: ErrorHandlerOptions) {
    this.logger = options?.logger || new Logger();
    this.defaultRetryOptions = {
      maxRetries: options?.maxRetries || 3,
      baseDelay: options?.baseDelay || 1000,
      maxDelay: options?.maxDelay || 30000,
      backoffMultiplier: options?.backoffMultiplier || 2,
      jitter: options?.jitter ?? true,
      retryableErrors: (error) => {
        // Default retryable errors
        const retryable = [
          'ECONNREFUSED',
          'ECONNRESET',
          'ETIMEDOUT',
          'ENOTFOUND',
          'EAI_AGAIN',
          '5xx',
          '429'
        ];
        
        const errorStr = error?.code || error?.status || error?.toString();
        return retryable.some(code => errorStr.includes(code));
      }
    };
  }

  /**
   * Execute an operation with retry logic
   */
  async executeWithRetry<T>(
    operation: () => Promise<T>,
    options?: Partial<RetryOptions>
  ): Promise<T> {
    const opts = { ...this.defaultRetryOptions, ...options };
    let lastError: any;

    for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
      try {
        const result = await operation();
        if (attempt > 0) {
          this.logger.info(`Operation succeeded on attempt ${attempt + 1}`);
        }
        return result;
      } catch (error) {
        lastError = error;
        
        // Check if error is retryable
        if (attempt === opts.maxRetries || 
            (opts.retryableErrors && !opts.retryableErrors(error))) {
          break;
        }

        this.logger.warn(`Attempt ${attempt + 1} failed: ${error.message || error}`);
        
        if (attempt < opts.maxRetries) {
          const delay = this.calculateDelay(attempt, opts);
          this.logger.info(`Retrying in ${delay}ms...`);
          await this.sleep(delay);
        }
      }
    }

    this.logger.error(`Operation failed after ${opts.maxRetries + 1} attempts`, lastError);
    throw lastError;
  }

  /**
   * Calculate delay with exponential backoff
   */
  private calculateDelay(attempt: number, options: RetryOptions): number {
    let delay = options.baseDelay * Math.pow(options.backoffMultiplier, attempt);
    
    // Cap the delay
    delay = Math.min(delay, options.maxDelay);
    
    // Add jitter to prevent thundering herd
    if (options.jitter) {
      delay = delay * (0.5 + Math.random() * 0.5);
    }
    
    return Math.round(delay);
  }

  /**
   * Sleep for a specified number of milliseconds
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Handle a specific error with appropriate logging and response
   */
  handleError(error: any, context?: string): void {
    const errorInfo = {
      message: error.message || error,
      stack: error.stack,
      context: context || 'unknown',
      timestamp: new Date().toISOString()
    };

    // Log the error
    this.logger.error(`Error in ${errorInfo.context}: ${errorInfo.message}`, {
      stack: errorInfo.stack,
      timestamp: errorInfo.timestamp
    });

    // Additional error handling based on error type could go here
  }

  /**
   * Wrap an async function with error handling
   */
  wrapAsync<T extends any[], R>(
    fn: (...args: T) => Promise<R>,
    context?: string
  ): (...args: T) => Promise<R | null> {
    return async (...args: T): Promise<R | null> => {
      try {
        return await fn(...args);
      } catch (error) {
        this.handleError(error, context);
        return null;
      }
    };
  }
}

export class Guardrails {
  private config: GuardrailConfig;
  private logger: Logger;
  private rateLimitStore: Map<string, Array<number>>; // IP -> timestamps

  constructor(config?: Partial<GuardrailConfig>, logger?: Logger) {
    this.config = {
      rateLimiting: {
        enabled: true,
        requestsPerMinute: 100,
        windowMs: 60000,
        ...config?.rateLimiting
      },
      contentFiltering: {
        enabled: true,
        blockedTerms: [],
        minLength: 1,
        maxLength: 10000,
        ...config?.contentFiltering
      },
      qualityThreshold: {
        enabled: true,
        minScore: 7.0,
        ...config?.qualityThreshold
      },
      culturalSensitivity: {
        enabled: true,
        allowedCategories: ['daily_life', 'social', 'professional', 'travel', 'food', 'health', 'education', 'technology'],
        blockedTopics: ['violence', 'hate', 'discrimination'],
        ...config?.culturalSensitivity
      },
      technicalConstraints: {
        enabled: true,
        maxFileSize: 10 * 1024 * 1024, // 10MB
        allowedFileTypes: ['json', 'txt', 'csv', 'md'],
        timeout: 30000, // 30 seconds
        ...config?.technicalConstraints
      }
    };

    this.logger = logger || new Logger();
    this.rateLimitStore = new Map();
  }

  /**
   * Check if a request is allowed based on rate limiting
   */
  isRequestAllowed(identifier: string): boolean {
    if (!this.config.rateLimiting.enabled) {
      return true;
    }

    const now = Date.now();
    const windowStart = now - this.config.rateLimiting.windowMs;
    
    // Clean old entries
    if (this.rateLimitStore.has(identifier)) {
      const timestamps = this.rateLimitStore.get(identifier)!.filter(ts => ts > windowStart);
      this.rateLimitStore.set(identifier, timestamps);
    } else {
      this.rateLimitStore.set(identifier, []);
    }

    const requestCount = this.rateLimitStore.get(identifier)!.length;
    
    if (requestCount >= this.config.rateLimiting.requestsPerMinute) {
      this.logger.warn(`Rate limit exceeded for ${identifier}`);
      return false;
    }

    // Add current request timestamp
    this.rateLimitStore.get(identifier)!.push(now);
    return true;
  }

  /**
   * Validate content against content filtering rules
   */
  validateContent(content: string, context?: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.config.contentFiltering.enabled) {
      return { isValid: true, errors: [] };
    }

    // Check length
    if (content.length < this.config.contentFiltering.minLength) {
      errors.push(`Content too short (min ${this.config.contentFiltering.minLength} chars)`);
    }

    if (content.length > this.config.contentFiltering.maxLength) {
      errors.push(`Content too long (max ${this.config.contentFiltering.maxLength} chars)`);
    }

    // Check for blocked terms
    for (const blockedTerm of this.config.contentFiltering.blockedTerms) {
      if (content.toLowerCase().includes(blockedTerm.toLowerCase())) {
        errors.push(`Content contains blocked term: ${blockedTerm}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate quality score
   */
  validateQualityScore(score: number): { isValid: boolean; errors: string[] } {
    if (!this.config.qualityThreshold.enabled) {
      return { isValid: true, errors: [] };
    }

    if (score < this.config.qualityThreshold.minScore) {
      return {
        isValid: false,
        errors: [`Quality score ${score} is below minimum threshold ${this.config.qualityThreshold.minScore}`]
      };
    }

    return { isValid: true, errors: [] };
  }

  /**
   * Validate cultural sensitivity
   */
  validateCulturalSensitivity(category: string, topic: string): { isValid: boolean; errors: string[] } {
    if (!this.config.culturalSensitivity.enabled) {
      return { isValid: true, errors: [] };
    }

    const errors: string[] = [];

    // Check category
    if (!this.config.culturalSensitivity.allowedCategories.includes(category)) {
      errors.push(`Category '${category}' is not allowed`);
    }

    // Check topic
    for (const blockedTopic of this.config.culturalSensitivity.blockedTopics) {
      if (topic.toLowerCase().includes(blockedTopic.toLowerCase())) {
        errors.push(`Topic contains blocked content: ${blockedTopic}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate technical constraints
   */
  validateTechnicalConstraints(data: any, type: 'file' | 'data' | 'api' = 'data'): { isValid: boolean; errors: string[] } {
    if (!this.config.technicalConstraints.enabled) {
      return { isValid: true, errors: [] };
    }

    const errors: string[] = [];

    if (type === 'file') {
      // For file validation, we'd check size and type
      // This is a simplified version
      if (typeof data === 'object' && data.size) {
        if (data.size > this.config.technicalConstraints.maxFileSize) {
          errors.push(`File size ${data.size} exceeds maximum ${this.config.technicalConstraints.maxFileSize}`);
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Apply all guardrails to content
   */
  applyAllGuardrails(content: {
    text?: string;
    category?: string;
    topic?: string;
    qualityScore?: number;
    context?: string;
    identifier?: string;
  }): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Rate limiting
    if (content.identifier && !this.isRequestAllowed(content.identifier)) {
      errors.push('Rate limit exceeded');
    }

    // Content filtering
    if (content.text) {
      const contentValidation = this.validateContent(content.text, content.context);
      if (!contentValidation.isValid) {
        errors.push(...contentValidation.errors);
      }
    }

    // Quality threshold
    if (content.qualityScore !== undefined) {
      const qualityValidation = this.validateQualityScore(content.qualityScore);
      if (!qualityValidation.isValid) {
        errors.push(...qualityValidation.errors);
      }
    }

    // Cultural sensitivity
    if (content.category && content.topic) {
      const culturalValidation = this.validateCulturalSensitivity(content.category, content.topic);
      if (!culturalValidation.isValid) {
        errors.push(...culturalValidation.errors);
      }
    }

    // Technical constraints
    const technicalValidation = this.validateTechnicalConstraints({});
    if (!technicalValidation.isValid) {
      errors.push(...technicalValidation.errors);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Reset rate limiting for an identifier
   */
  resetRateLimit(identifier: string): void {
    this.rateLimitStore.delete(identifier);
  }
}

export interface ResilienceOptions {
  errorHandler: ErrorHandler;
  guardrails: Guardrails;
  circuitBreaker?: CircuitBreaker;
}

export class CircuitBreaker {
  private state: 'CLOSE' | 'OPEN' | 'HALF_OPEN' = 'CLOSE';
  private failureCount: number = 0;
  private lastFailureTime: number | null = null;
  private nextAttemptTime: number | null = null;
  
  private readonly failureThreshold: number;
  private readonly timeout: number; // in milliseconds
  private readonly resetTimeout: number; // in milliseconds

  constructor(options?: { failureThreshold?: number; timeout?: number; resetTimeout?: number }) {
    this.failureThreshold = options?.failureThreshold || 5;
    this.timeout = options?.timeout || 60000; // 1 minute
    this.resetTimeout = options?.resetTimeout || 60000; // 1 minute
  }

  /**
   * Execute an operation with circuit breaker protection
   */
  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (this.nextAttemptTime && Date.now() < this.nextAttemptTime) {
        throw new Error('Circuit breaker is OPEN');
      } else {
        // Transition to half-open state
        this.state = 'HALF_OPEN';
      }
    }

    try {
      const result = await operation();
      
      if (this.state === 'HALF_OPEN') {
        // Success in half-open state means we can close the circuit
        this.onSuccess();
      }
      
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  /**
   * Called when operation succeeds
   */
  private onSuccess(): void {
    this.state = 'CLOSE';
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.nextAttemptTime = null;
  }

  /**
   * Called when operation fails
   */
  private onFailure(): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      this.nextAttemptTime = Date.now() + this.resetTimeout;
    }
  }

  /**
   * Get current circuit breaker state
   */
  getState(): { state: 'CLOSE' | 'OPEN' | 'HALF_OPEN'; failureCount: number } {
    return {
      state: this.state,
      failureCount: this.failureCount
    };
  }

  /**
   * Reset the circuit breaker
   */
  reset(): void {
    this.state = 'CLOSE';
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.nextAttemptTime = null;
  }
}

// Example usage
export function createErrorHandler(options?: ErrorHandlerOptions): ErrorHandler {
  return new ErrorHandler(options);
}

export function createGuardrails(config?: Partial<GuardrailConfig>, logger?: Logger): Guardrails {
  return new Guardrails(config, logger);
}

export function createCircuitBreaker(options?: { failureThreshold?: number; timeout?: number; resetTimeout?: number }): CircuitBreaker {
  return new CircuitBreaker(options);
}

// Example of how to use error handling and guardrails
if (require.main === module) {
  (async () => {
    console.log('Error Handling and Guardrails Example:');
    
    // Create error handler
    const errorHandler = new ErrorHandler({
      maxRetries: 3,
      baseDelay: 500,
      jitter: true
    });
    
    // Create guardrails
    const guardrails = new Guardrails({
      rateLimiting: { enabled: true, requestsPerMinute: 10, windowMs: 60000 },
      contentFiltering: { 
        enabled: true, 
        blockedTerms: ['badword'], 
        minLength: 5, 
        maxLength: 1000 
      },
      qualityThreshold: { enabled: true, minScore: 5.0 },
      culturalSensitivity: { 
        enabled: true, 
        allowedCategories: ['education', 'technology'],
        blockedTopics: ['violence'] 
      }
    });
    
    // Test content validation
    console.log('\n1. Content Validation:');
    const contentCheck = guardrails.validateContent("This is a valid content example", "test");
    console.log('Content validation result:', contentCheck);
    
    // Test quality validation
    console.log('\n2. Quality Validation:');
    const qualityCheck = guardrails.validateQualityScore(8.5);
    console.log('Quality validation result:', qualityCheck);
    
    // Test cultural sensitivity
    console.log('\n3. Cultural Sensitivity:');
    const culturalCheck = guardrails.validateCulturalSensitivity('education', 'learning');
    console.log('Cultural validation result:', culturalCheck);
    
    // Test all guardrails
    console.log('\n4. All Guardrails:');
    const allGuardrails = guardrails.applyAllGuardrails({
      text: "This is a test content",
      category: "education",
      topic: "learning",
      qualityScore: 8.0,
      identifier: "test-user"
    });
    console.log('All guardrails result:', allGuardrails);
    
    // Test retry mechanism with a function that fails initially
    console.log('\n5. Retry Mechanism:');
    let attemptCount = 0;
    const flakyOperation = async () => {
      attemptCount++;
      if (attemptCount < 3) {
        throw new Error(`Simulated failure on attempt ${attemptCount}`);
      }
      return "Success after retries!";
    };
    
    try {
      const result = await errorHandler.executeWithRetry(flakyOperation, { maxRetries: 5 });
      console.log('Retry result:', result);
    } catch (error) {
      console.error('Retry failed:', error.message);
    }
    
    // Test circuit breaker
    console.log('\n6. Circuit Breaker:');
    const circuitBreaker = new CircuitBreaker({ failureThreshold: 2, resetTimeout: 2000 });
    
    // Fail twice to trip the circuit
    for (let i = 0; i < 2; i++) {
      try {
        await circuitBreaker.execute(async () => {
          throw new Error('Simulated failure');
        });
      } catch (error) {
        console.log(`Attempt ${i + 1} failed as expected`);
      }
    }
    
    console.log('Circuit breaker state after failures:', circuitBreaker.getState());
    
    // Try once more - should be rejected immediately
    try {
      await circuitBreaker.execute(async () => "This should not run");
    } catch (error) {
      console.log('Circuit breaker correctly rejected operation:', error.message);
    }
    
    console.log('All error handling and guardrails examples completed!');
  })();
}