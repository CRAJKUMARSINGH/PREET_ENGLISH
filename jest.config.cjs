module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/client/src/$1',
    '^@shared/(.*)$': '<rootDir>/shared/$1',
    '^wouter$': '<rootDir>/tests/mocks/wouter.tsx',
    '^react-markdown$': '<rootDir>/tests/mocks/react-markdown.tsx',
    '^react-i18next$': '<rootDir>/tests/mocks/react-i18next.ts',
    '^@/components/ErrorBoundary$': '<rootDir>/tests/mocks/ErrorBoundary.tsx',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  collectCoverageFrom: [
    'client/src/**/*.{ts,tsx}',
    'server/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      // Keep thresholds realistic for the current test suite; raise these over time as coverage improves.
      branches: 13,
      functions: 12,
      lines: 34,
      statements: 33,
    },
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tests/tsconfig.json'
    }]
  }
};
