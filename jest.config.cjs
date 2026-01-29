/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  verbose: true,
  roots: ['<rootDir>/tests'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/client/src/$1',
    '^@shared/(.*)$': '<rootDir>/shared/$1',
    '^@server/(.*)$': '<rootDir>/server/$1',
    '^@lib/(.*)$': '<rootDir>/client/src/lib/$1',
    '^@components/(.*)$': '<rootDir>/client/src/components/$1',
    '^@hooks/(.*)$': '<rootDir>/client/src/hooks/$1',
    '^@utils/(.*)$': '<rootDir>/client/src/utils/$1',
    '^@data/(.*)$': '<rootDir>/client/src/data/$1',
    '^@pages/(.*)$': '<rootDir>/client/src/pages/$1',
    '^@assets/(.*)$': '<rootDir>/client/src/assets/$1',
    '^@types/(.*)$': '<rootDir>/types/$1',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(wouter|@tanstack|regexparam)/)',
  ],
  testMatch: [
    '**/*.test.(ts|tsx|js|jsx)',
    '**/__tests__/**/*.(ts|tsx|js|jsx)',
    '**/?(*.)+(spec|test).(ts|tsx|js|jsx)',
  ],
  collectCoverageFrom: [
    'client/src/**/*.{ts,tsx}',
    'server/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/dist/**',
    '!**/build/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testTimeout: 30000,
};

module.exports = config;