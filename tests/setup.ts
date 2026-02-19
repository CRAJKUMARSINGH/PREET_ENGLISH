import '@testing-library/jest-dom';

// Polyfill setImmediate for Winston logging
if (typeof global.setImmediate === 'undefined') {
  // @ts-ignore
  global.setImmediate = (callback: (...args: any[]) => void, ...args: any[]) => {
    return setTimeout(callback, 0, ...args);
  };
  // @ts-ignore
  global.clearImmediate = (handle: any) => {
    clearTimeout(handle);
  };
}

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

// Mock window.speechSynthesis - Simple approach that works
const mockVoices = [
  { name: 'Google US English', lang: 'en-US' },
  { name: 'Google हिन्दी', lang: 'hi-IN' },
  { name: 'Microsoft David Desktop', lang: 'en-US' },
  { name: 'Microsoft Heera Desktop', lang: 'hi-IN' }
];

// Create a proper array with all methods
const createMockVoicesArray = (): Array<{name: string, lang: string}> => {
  const arr: Array<{name: string, lang: string}> = [];
  mockVoices.forEach(voice => arr.push(voice));
  return arr;
};

Object.defineProperty(window, 'speechSynthesis', {
  writable: true,
  value: {
    speak: jest.fn().mockImplementation(() => {
      // Mock successful speech synthesis
      console.log('Mock speech synthesis called');
    }),
    cancel: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    getVoices: jest.fn(() => createMockVoicesArray()),
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

// Mock matchMedia with proper handling for different query types
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => {
    if (query.includes('prefers-reduced-motion')) {
      return {
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
    }
    if (query.includes('prefers-color-scheme: dark')) {
      return {
        matches: false, // Default to light theme
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
    }
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
  }),
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

// Mock Framer Motion to avoid animation-related issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    button: 'button',
    span: 'span',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    p: 'p',
    ul: 'ul',
    li: 'li',
    section: 'section',
    article: 'article',
    header: 'header',
    footer: 'footer',
    main: 'main',
    nav: 'nav',
    aside: 'aside',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children as JSX.Element,
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn(),
  }),
  useInView: () => [null, false],
  useReducedMotion: () => true,
}));

// Mock fetch API
global.fetch = jest.fn() as jest.Mock;

// Mock WebSocket
global.WebSocket = jest.fn().mockImplementation(() => ({
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
  readyState: 0,
  onopen: null,
  onerror: null,
  onclose: null,
  onmessage: null,
  send: jest.fn(),
  close: jest.fn()
})) as unknown as typeof WebSocket;

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
  if (global.fetch && (global.fetch as jest.Mock).mockClear) {
    (global.fetch as jest.Mock).mockClear();
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