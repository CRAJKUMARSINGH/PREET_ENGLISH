import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LessonView from '@/pages/LessonView';

const queryClient = new QueryClient();

const renderWithClient = (ui: React.ReactElement) =>
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);

// Mock hooks
jest.mock('@/hooks/use-lessons', () => ({
  useLessons: () => ({
    data: [
      { id: 1, title: 'Intro', slug: 'intro', description: 'Desc', content: '# Title', difficulty: 'Beginner', order: 1, imageUrl: null, emojiTheme: null, hindiTitle: 'परिचय', hindiDescription: 'टेस्ट', category: 'General' }
    ],
    isLoading: false,
  }),
  useLesson: () => ({
    data: {
      id: 1,
      title: 'Intro',
      slug: 'intro',
      description: 'Desc',
      content: '# English\n\nContent\n\n## हिंदी\n\nहिंदी सामग्री',
      difficulty: 'Beginner',
      order: 1,
      imageUrl: null,
      emojiTheme: null,
      hindiTitle: 'परिचय',
      hindiDescription: 'टेस्ट',
      category: 'General',
      vocabulary: [],
    },
    isLoading: false,
  }),
}));

jest.mock('@/hooks/use-progress', () => ({
  useProgress: () => ({ data: [], isLoading: false }),
  useMarkComplete: () => ({ mutate: jest.fn(), isPending: false }),
}));

jest.mock('@/hooks/use-gamification', () => ({
  useUserStats: () => ({ data: null, isLoading: false }),
  useDailyGoal: () => ({ data: null, isLoading: false }),
  useAchievements: () => ({ data: [], isLoading: false }),
  useUpdateUserStats: () => ({ mutate: jest.fn(), isPending: false }),
  useUpdateDailyGoal: () => ({ mutate: jest.fn(), isPending: false }),
  useUnlockAchievement: () => ({ mutate: jest.fn(), isPending: false }),
}));

jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: jest.fn() }),
}));

describe('LessonView page', () => {
  it('renders split English and Hindi content', () => {
    renderWithClient(<LessonView />);

    // Allow multiple matches for section headers; just ensure they exist somewhere
    expect(screen.getAllByText(/English Content/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/हिंदी व्याख्या/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/हिंदी सामग्री/)).toBeInTheDocument();
  });

  it('shows complete button', () => {
    renderWithClient(<LessonView />);

    expect(screen.getByText(/पाठ पूर्ण करें/i)).toBeInTheDocument();
  });
});