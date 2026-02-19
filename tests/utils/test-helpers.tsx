import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * Create a new QueryClient for testing with sensible defaults
 */
export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {}, // Suppress errors in tests
    },
  });
}

/**
 * Render component with QueryClientProvider wrapper
 */
export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { queryClient?: QueryClient }
) {
  const { queryClient = createTestQueryClient(), ...renderOptions } = options || {};

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    queryClient,
  };
}

/**
 * Mock user data for testing
 */
export const mockUser = {
  id: 1,
  username: 'testuser',
  email: 'test@example.com',
  nativeLanguage: 'Hindi',
  targetLanguage: 'English',
  level: 'Beginner',
  createdAt: new Date('2024-01-01'),
};

/**
 * Mock lesson data for testing
 */
export const mockLesson = {
  id: 1,
  title: 'Introduction to English',
  slug: 'introduction-to-english',
  description: 'Learn basic English concepts',
  content: '# Welcome to English Learning\n\nThis is a test lesson.',
  difficulty: 'Beginner' as const,
  order: 1,
  imageUrl: null,
  emojiTheme: '📚',
  hindiTitle: 'अंग्रेजी सीखने का परिचय',
  hindiDescription: 'मूल अंग्रेजी अवधारणाएँ सीखें',
  category: 'Grammar',
  estimatedTime: 15,
  xpReward: 50,
};

/**
 * Mock vocabulary data for testing
 */
export const mockVocabulary = {
  id: 1,
  word: 'hello',
  translation: 'नमस्ते',
  pronunciation: 'huh-loh',
  example: 'Hello, how are you?',
  exampleTranslation: 'नमस्ते, आप कैसे हैं?',
  difficulty: 'Beginner' as const,
  category: 'Greetings',
  audioUrl: null,
};

/**
 * Wait for async operations to complete
 */
export const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0));

/**
 * Mock fetch response helper
 */
export function mockFetchResponse(data: any, ok = true, status = 200) {
  return Promise.resolve({
    ok,
    status,
    json: async () => data,
    text: async () => JSON.stringify(data),
    headers: new Headers(),
    redirected: false,
    statusText: ok ? 'OK' : 'Error',
    type: 'basic' as ResponseType,
    url: '',
    clone: function() { return this; },
    body: null,
    bodyUsed: false,
    arrayBuffer: async () => new ArrayBuffer(0),
    blob: async () => new Blob(),
    formData: async () => new FormData(),
  } as Response);
}

/**
 * Setup mock fetch for tests
 */
export function setupMockFetch(responses: Record<string, any>) {
  (global.fetch as jest.Mock).mockImplementation((url: string) => {
    const urlString = url.toString();
    for (const [pattern, response] of Object.entries(responses)) {
      if (urlString.includes(pattern)) {
        return mockFetchResponse(response);
      }
    }
    return mockFetchResponse({ error: 'Not found' }, false, 404);
  });
}

/**
 * Clean up after tests
 */
export function cleanupTest() {
  jest.clearAllMocks();
  if (global.fetch && (global.fetch as jest.Mock).mockClear) {
    (global.fetch as jest.Mock).mockClear();
  }
}
