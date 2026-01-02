import '@testing-library/jest-dom';

// Polyfill TextEncoder/TextDecoder for libraries that expect them in the global scope
// (e.g. supertest -> formidable -> cuid2 -> @noble/hashes)
import { TextEncoder, TextDecoder } from 'util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).TextEncoder = TextEncoder;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).TextDecoder = TextDecoder;

// Mock window.matchMedia
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
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock speechSynthesis for audio tests
Object.defineProperty(window, 'speechSynthesis', {
  writable: true,
  value: {
    speak: jest.fn(),
    cancel: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    getVoices: jest.fn(() => []),
    speaking: false,
    paused: false,
    pending: false,
  },
});

// jsdom doesn't implement scrollTo; mock it to avoid errors in components that call it
// Casting to any to satisfy TypeScript in test environment only
(window as any).scrollTo = jest.fn();

// Minimal mock for SpeechSynthesisUtterance used by AudioService
class MockSpeechSynthesisUtterance {
  text: string;
  lang = 'en-US';
  rate = 1;
  pitch = 1;
  volume = 1;

  constructor(text: string) {
    this.text = text;
  }
}

// Attach to global so `new SpeechSynthesisUtterance()` works in tests
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;
