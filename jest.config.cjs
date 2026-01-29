/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  verbose: true,
  roots: ['<rootDir>/tests'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  
  // Fix worker hanging issues
  maxWorkers: 1, // Force single worker to prevent hanging
  forceExit: true, // Force exit after tests complete
  detectOpenHandles: false, // Disable for now to prevent hanging
  
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
    '^react-markdown$': '<rootDir>/tests/mocks/react-markdown.tsx',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^.*\\.lib\\.analytics$': '<rootDir>/tests/mocks/analytics.ts',
    '^.*\\/lib\\/analytics$': '<rootDir>/tests/mocks/analytics.ts',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(wouter|@tanstack|regexparam|react-markdown|remark-.*|unified|bail|is-plain-obj|trough|vfile|unist-.*|mdast-.*|micromark)/)',
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
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
  testTimeout: 15000, // Reduced timeout
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      useESM: false,
      tsconfig: {
        module: 'commonjs',
      },
    },
  },
  
  // Additional cleanup configuration
  clearMocks: true,
  restoreMocks: true,
  resetMocks: true,
  
  // Environment cleanup
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },
};

module.exports = config;