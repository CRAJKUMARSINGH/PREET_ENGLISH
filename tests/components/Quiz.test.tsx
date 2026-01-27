import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Quiz } from '../../client/src/components/Quiz';
import '@testing-library/jest-dom';
import { ReactNode } from 'react';

const mockUseQuery = jest.fn();
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: (...args: any[]) => mockUseQuery(...args),
  useMutation: () => ({ mutate: jest.fn() }), // Mock useMutation as it's used in Quiz
  useQueryClient: jest.fn(() => ({ invalidateQueries: jest.fn() })), // Mock useQueryClient
}));

// A custom wrapper for rendering components with QueryClientProvider
const createWrapper = () => {
  const queryClient = new QueryClient({ 
    defaultOptions: {
      queries: {
        retry: false,
      }
    }
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('Quiz Component Async Error Handling', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    // Reset mock before each test
    mockUseQuery.mockReset();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('displays an error message when quiz questions fail to load and allows retry', async () => {
    // Mock initial state: loading
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    const { rerender } = render(
      <Quiz quizId={1} />,
      { wrapper: createWrapper() }
    );

    // Expect the loading state initially
    expect(screen.getByText('Loading quiz...')).toBeInTheDocument();

    // Mock error state after loading
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed to load quiz'),
    });

    // Rerender the component to apply the new mock value
    rerender(
      <Quiz quizId={1} />,
      { wrapper: createWrapper() }
    );

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Error Loading Quiz')).toBeInTheDocument();
      expect(screen.getByText('Failed to load quiz')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Retry/i })).toBeInTheDocument();
    });

    // Mock successful state after retry
    mockUseQuery.mockReturnValue({
      data: [{ id: 1, question: "Test Question", options: ["A", "B"], correctAnswer: "A" }],
      isLoading: false,
      error: null,
    });
    
    fireEvent.click(screen.getByRole('button', { name: /Retry/i }));

    // Rerender the component to apply the new mock value after retry
    rerender(
      <Quiz quizId={1} />,
      { wrapper: createWrapper() }
    );

    // Expect the quiz content to be rendered after successful retry
    await waitFor(() => {
      expect(screen.getByText('Question 1 of 1')).toBeInTheDocument();
      expect(screen.getByText('Test Question')).toBeInTheDocument();
    });
    expect(screen.queryByText('Error Loading Quiz')).not.toBeInTheDocument();
  });
});
