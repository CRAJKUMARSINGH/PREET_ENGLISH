// Mock logger for tests
const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  verbose: jest.fn(),
  silly: jest.fn(),
  http: jest.fn(),
};

// Export as both default and named export
export default mockLogger;
export const logger = mockLogger;
