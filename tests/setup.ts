import '@testing-library/jest-dom';

// Polyfill TextEncoder/TextDecoder for Node.js environment
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// Mock SpeechSynthesisUtterance
global.SpeechSynthesisUtterance = jest.fn().mockImplementation((text) => ({
  text,
  lang: 'en-US',
  rate: 1,
  pitch: 1,
  volume: 1,
  onstart: null,
  onend: null,
  onerror: null,
  onpause: null,
  onresume: null,
  onmark: null,
  onboundary: null,
}));

// Mock localStorage with proper cleanup
const createStorageMock = () => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index: number) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    }
  };
};

const localStorageMock = createStorageMock();
const sessionStorageMock = createStorageMock();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
});

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
  writable: true
});

// Also define on global for Node.js environment
Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true
});

Object.defineProperty(global, 'sessionStorage', {
  value: sessionStorageMock,
  writable: true
});

// Mock window.speechSynthesis
Object.defineProperty(window, 'speechSynthesis', {
  writable: true,
  value: {
    speak: jest.fn(),
    cancel: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    getVoices: jest.fn(() => []),
    onvoiceschanged: jest.fn(),
    pending: false,
    speaking: false,
    paused: false,
  }
});

// Mock navigator.mediaDevices
Object.defineProperty(navigator, 'mediaDevices', {
  writable: true,
  value: {
    getUserMedia: jest.fn().mockResolvedValue({
      getTracks: jest.fn().mockReturnValue([{
        stop: jest.fn()
      }])
    }),
    enumerateDevices: jest.fn().mockResolvedValue([])
  }
});

// Mock ResizeObserver
window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock Intersection Observer
window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  })),
});

// Mock crypto.getRandomValues for UUID generation
Object.defineProperty(global.crypto, 'getRandomValues', {
  writable: true,
  value: jest.fn().mockImplementation((array) => {
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
    return array;
  }),
});

// Mock fetch API
global.fetch = jest.fn();

// Mock WebSocket
global.WebSocket = jest.fn();

// Mock structuredClone (available in newer JS environments)
if (!global.structuredClone) {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

// Suppress console errors during tests for cleaner output
const originalError = console.error;
const originalWarn = console.warn;

console.error = jest.fn();
console.warn = jest.fn();

// Global cleanup after each test
afterEach(() => {
  // Clear all mocks
  jest.clearAllMocks();
  
  // Clear storage
  localStorageMock.clear();
  sessionStorageMock.clear();
  
  // Clear any timers
  jest.clearAllTimers();
  
  // Reset fetch mock
  if (global.fetch && typeof global.fetch.mockClear === 'function') {
    global.fetch.mockClear();
  }
});

// Global cleanup after all tests
afterAll(() => {
  // Restore console methods
  console.error = originalError;
  console.warn = originalWarn;
  
  // Clear all timers
  jest.clearAllTimers();
  
  // Force garbage collection if available
  if (global.gc) {
    global.gc();
  }
});

// Add custom matchers
expect.extend({
  toBeInTheDocument(received) {
    if (!(received instanceof HTMLElement)) {
      return {
        message: () => `Expected element to be an HTMLElement`,
        pass: false,
      };
    }
    
    const pass = document.body.contains(received);
    return {
      message: () => `Expected element ${pass ? 'not ' : ''}to be in the document`,
      pass,
    };
  },
});