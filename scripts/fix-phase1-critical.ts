#!/usr/bin/env tsx
/**
 * Phase 1: Critical Fixes Automation Script
 * Fixes: Jest config, TypeScript checking, Console statements, Sentry integration
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

interface FixResult {
  success: boolean;
  message: string;
  details?: string;
}

class Phase1Fixer {
  private results: FixResult[] = [];

  async run() {
    console.log('🚀 Starting Phase 1: Critical Fixes\n');
    console.log('═'.repeat(60));

    await this.fixJestConfig();
    await this.enableTypeScriptChecking();
    await this.createProductionLogger();
    await this.removeConsoleStatements();
    await this.setupSentry();

    this.printSummary();
  }

  private async fixJestConfig() {
    console.log('\n📝 Fix 1: Jest Configuration');
    console.log('─'.repeat(60));

    try {
      const jestConfigPath = path.join(rootDir, 'jest.config.cjs');
      const newConfig = `module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests', '<rootDir>/client/src'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        jsx: 'react',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        resolveJsonModule: true,
      }
    }]
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/client/src/$1',
    '^@shared/(.*)$': '<rootDir>/shared/$1',
    '^@server/(.*)$': '<rootDir>/server/$1',
    '\\\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/tests/mocks/fileMock.js',
  },

  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  
  transformIgnorePatterns: [
    'node_modules/(?!(wouter|@tanstack|@radix-ui)/)'
  ],

  collectCoverageFrom: [
    'client/src/**/*.{ts,tsx}',
    'server/**/*.ts',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/*.test.{ts,tsx}',
  ],

  coverageThresholds: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },

  testTimeout: 15000,
  maxWorkers: 1,
  forceExit: true,
  detectOpenHandles: false,
  
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
`;

      await fs.writeFile(jestConfigPath, newConfig, 'utf-8');
      
      this.results.push({
        success: true,
        message: 'Jest configuration updated successfully',
        details: 'Fixed JSX/TSX transformation and module resolution'
      });
      
      console.log('✅ Jest config updated');
    } catch (error) {
      this.results.push({
        success: false,
        message: 'Failed to update Jest configuration',
        details: error instanceof Error ? error.message : String(error)
      });
      console.error('❌ Failed:', error);
    }
  }

  private async enableTypeScriptChecking() {
    console.log('\n📝 Fix 2: Enable TypeScript Checking');
    console.log('─'.repeat(60));

    try {
      const packageJsonPath = path.join(rootDir, 'package.json');
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));

      // Update scripts
      packageJson.scripts.check = 'tsc --noEmit --skipLibCheck';
      packageJson.scripts['check:full'] = 'tsc --project tsconfig.build.json';
      packageJson.scripts.pretest = 'npm run check';
      packageJson.scripts.prebuild = 'npm run check';

      await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8');

      this.results.push({
        success: true,
        message: 'TypeScript checking enabled',
        details: 'Added check scripts to package.json'
      });

      console.log('✅ TypeScript checking enabled');
    } catch (error) {
      this.results.push({
        success: false,
        message: 'Failed to enable TypeScript checking',
        details: error instanceof Error ? error.message : String(error)
      });
      console.error('❌ Failed:', error);
    }
  }

  private async createProductionLogger() {
    console.log('\n📝 Fix 3: Create Production Logger');
    console.log('─'.repeat(60));

    try {
      const loggerPath = path.join(rootDir, 'client/src/lib/productionLogger.ts');
      const loggerContent = `/**
 * Production-Safe Logger
 * Replaces console statements with proper logging
 */

import * as Sentry from '@sentry/react';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: any;
}

class ProductionLogger {
  private isDevelopment = process.env.NODE_ENV === 'development';

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
      console.log(\`[PERF] \${metric}: \${value}ms\`, context);
    }
    // Could send to analytics service
  }
}

export const logger = new ProductionLogger();
export default logger;
`;

      await fs.writeFile(loggerPath, loggerContent, 'utf-8');

      this.results.push({
        success: true,
        message: 'Production logger created',
        details: 'Created client/src/lib/productionLogger.ts'
      });

      console.log('✅ Production logger created');
    } catch (error) {
      this.results.push({
        success: false,
        message: 'Failed to create production logger',
        details: error instanceof Error ? error.message : String(error)
      });
      console.error('❌ Failed:', error);
    }
  }

  private async removeConsoleStatements() {
    console.log('\n📝 Fix 4: Remove Console Statements');
    console.log('─'.repeat(60));

    try {
      const filesToFix = [
        'client/src/App.tsx',
        'client/src/lib/logger.ts',
        'client/src/components/ErrorBoundary.tsx',
      ];

      let totalFixed = 0;

      for (const file of filesToFix) {
        const filePath = path.join(rootDir, file);
        try {
          let content = await fs.readFile(filePath, 'utf-8');
          const originalContent = content;

          // Replace console.log with logger.debug
          content = content.replace(/console\.log\(/g, 'logger.debug(');
          
          // Replace console.warn with logger.warn
          content = content.replace(/console\.warn\(/g, 'logger.warn(');
          
          // Replace console.error with logger.error
          content = content.replace(/console\.error\(/g, 'logger.error(');

          // Add import if logger is used
          if (content !== originalContent && !content.includes('import logger') && !content.includes('from "./lib/productionLogger"')) {
            const importStatement = file.includes('client/src/App.tsx')
              ? 'import logger from "@/lib/productionLogger";\n'
              : 'import logger from "./productionLogger";\n';
            
            content = importStatement + content;
          }

          if (content !== originalContent) {
            await fs.writeFile(filePath, content, 'utf-8');
            totalFixed++;
            console.log(`  ✓ Fixed ${file}`);
          }
        } catch (err) {
          console.log(`  ⚠ Skipped ${file} (not found or error)`);
        }
      }

      this.results.push({
        success: true,
        message: `Removed console statements from ${totalFixed} files`,
        details: 'Replaced with production logger'
      });

      console.log(`✅ Fixed ${totalFixed} files`);
    } catch (error) {
      this.results.push({
        success: false,
        message: 'Failed to remove console statements',
        details: error instanceof Error ? error.message : String(error)
      });
      console.error('❌ Failed:', error);
    }
  }

  private async setupSentry() {
    console.log('\n📝 Fix 5: Setup Sentry Integration');
    console.log('─'.repeat(60));

    try {
      // Create Sentry config file
      const sentryConfigPath = path.join(rootDir, 'client/src/lib/sentry.ts');
      const sentryConfig = `/**
 * Sentry Error Tracking Configuration
 */

import * as Sentry from '@sentry/react';

export function initSentry() {
  if (process.env.NODE_ENV === 'production' && import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: process.env.NODE_ENV,
      integrations: [
        new Sentry.BrowserTracing(),
        new Sentry.Replay({
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],
      
      // Performance Monitoring
      tracesSampleRate: 0.1, // 10% of transactions
      
      // Session Replay
      replaysSessionSampleRate: 0.1, // 10% of sessions
      replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors
      
      // Filter out sensitive data
      beforeSend(event) {
        // Remove sensitive data from event
        if (event.request) {
          delete event.request.cookies;
          delete event.request.headers;
        }
        return event;
      },
      
      // Ignore certain errors
      ignoreErrors: [
        'ResizeObserver loop limit exceeded',
        'Non-Error promise rejection captured',
      ],
    });
  }
}

export { Sentry };
`;

      await fs.writeFile(sentryConfigPath, sentryConfig, 'utf-8');

      // Create .env.example entry
      const envExamplePath = path.join(rootDir, '.env.example');
      let envExample = await fs.readFile(envExamplePath, 'utf-8');
      
      if (!envExample.includes('VITE_SENTRY_DSN')) {
        envExample += '\n# Sentry Error Tracking\nVITE_SENTRY_DSN=your_sentry_dsn_here\n';
        await fs.writeFile(envExamplePath, envExample, 'utf-8');
      }

      this.results.push({
        success: true,
        message: 'Sentry integration configured',
        details: 'Created sentry.ts config file and updated .env.example'
      });

      console.log('✅ Sentry configured');
      console.log('⚠️  Remember to add VITE_SENTRY_DSN to your environment variables');
    } catch (error) {
      this.results.push({
        success: false,
        message: 'Failed to setup Sentry',
        details: error instanceof Error ? error.message : String(error)
      });
      console.error('❌ Failed:', error);
    }
  }

  private printSummary() {
    console.log('\n\n' + '═'.repeat(60));
    console.log('📊 PHASE 1 FIX SUMMARY');
    console.log('═'.repeat(60));

    const successful = this.results.filter(r => r.success).length;
    const failed = this.results.filter(r => !r.success).length;

    console.log(`\n✅ Successful: ${successful}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📝 Total: ${this.results.length}\n`);

    this.results.forEach((result, index) => {
      const icon = result.success ? '✅' : '❌';
      console.log(`${icon} ${index + 1}. ${result.message}`);
      if (result.details) {
        console.log(`   ${result.details}`);
      }
    });

    console.log('\n' + '═'.repeat(60));
    console.log('🎯 NEXT STEPS:');
    console.log('═'.repeat(60));
    console.log('1. Run: npm install (if needed)');
    console.log('2. Run: npm run check (verify TypeScript)');
    console.log('3. Run: npm test (verify tests pass)');
    console.log('4. Add VITE_SENTRY_DSN to .env.local');
    console.log('5. Test in development mode');
    console.log('6. Deploy to staging');
    console.log('\n');
  }
}

// Run the fixer
const fixer = new Phase1Fixer();
fixer.run().catch(console.error);
