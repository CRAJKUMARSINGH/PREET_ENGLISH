import { config } from "dotenv";
import logger from "../lib/logger";

// Load environment variables
config({ path: '.env.local' });

interface EnvironmentConfig {
  DATABASE_URL: string;
  SESSION_SECRET: string;
  OPENAI_API_KEY: string;
  NODE_ENV: string;
  PORT: number;
}

class EnvironmentValidator {
  private config: Partial<EnvironmentConfig> = {};
  private errors: string[] = [];
  private warnings: string[] = [];

  validate(): EnvironmentConfig {
    this.validateNodeEnv();
    this.validateDatabase();
    this.validateSessionSecret();
    this.validateOpenAI();
    this.validatePort();

    if (this.errors.length > 0) {
      logger.error('Environment validation failed:');
      this.errors.forEach(error => logger.error(`  - ${error}`));
      
      if (process.env.NODE_ENV === 'production') {
        throw new Error('Critical environment variables missing in production');
      }
    }

    if (this.warnings.length > 0) {
      logger.warn('Environment warnings:');
      this.warnings.forEach(warning => logger.warn(`  - ${warning}`));
    }

    return this.config as EnvironmentConfig;
  }

  private validateNodeEnv(): void {
    const nodeEnv = process.env.NODE_ENV || 'development';
    this.config.NODE_ENV = nodeEnv;
    
    if (!['development', 'production', 'test'].includes(nodeEnv)) {
      this.warnings.push(`Unknown NODE_ENV: ${nodeEnv}, defaulting to development`);
      this.config.NODE_ENV = 'development';
    }
  }

  private validateDatabase(): void {
    const dbUrl = process.env.DATABASE_URL;
    
    if (!dbUrl) {
      if (this.config.NODE_ENV === 'production') {
        this.errors.push('DATABASE_URL is required in production');
      } else {
        this.warnings.push('DATABASE_URL not set, using default SQLite (file:sqlite.db)');
        this.config.DATABASE_URL = 'file:sqlite.db';
      }
    } else {
      this.config.DATABASE_URL = dbUrl;
      
      // Validate database URL format
      if (dbUrl.startsWith('postgres')) {
        logger.info('Using PostgreSQL database');
      } else if (dbUrl.startsWith('file:')) {
        logger.info('Using SQLite database');
      } else {
        this.warnings.push('Unknown database URL format');
      }
    }
  }

  private validateSessionSecret(): void {
    const secret = process.env.SESSION_SECRET;
    
    if (!secret) {
      if (this.config.NODE_ENV === 'production') {
        this.errors.push('SESSION_SECRET is required in production');
      } else {
        this.warnings.push('SESSION_SECRET not set, using development default');
        this.config.SESSION_SECRET = 'dev_secret_only_for_local_testing_min_32_chars';
      }
    } else if (secret.length < 32) {
      this.warnings.push('SESSION_SECRET should be at least 32 characters for security');
      this.config.SESSION_SECRET = secret;
    } else {
      this.config.SESSION_SECRET = secret;
    }
  }

  private validateOpenAI(): void {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey || apiKey === 'fallback-mode' || apiKey.length < 10) {
      this.warnings.push('OPENAI_API_KEY not configured, AI features will use fallback mode');
      this.config.OPENAI_API_KEY = 'fallback-mode';
    } else {
      this.config.OPENAI_API_KEY = apiKey;
      logger.info('OpenAI API configured');
    }
  }

  private validatePort(): void {
    const port = parseInt(process.env.PORT || '5000', 10);
    
    if (isNaN(port) || port < 1 || port > 65535) {
      this.warnings.push(`Invalid PORT: ${process.env.PORT}, using default 5000`);
      this.config.PORT = 5000;
    } else {
      this.config.PORT = port;
    }
  }

  getConfig(): Partial<EnvironmentConfig> {
    return this.config;
  }
}

// Singleton instance
const validator = new EnvironmentValidator();
export const env = validator.validate();

export default env;
