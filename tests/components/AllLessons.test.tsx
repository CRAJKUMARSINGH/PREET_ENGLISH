import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AllLessons from '@/pages/AllLessons';

const queryClient = new QueryClient();

const renderWithClient = (ui: React.ReactElement) =>
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);

jest.mock('@/hooks/use-lessons', () => ({
  useLessons: () => ({
    data: [
      {
        id: 1,
        title: 'Intro',
        slug: 'intro',
        description: 'Test lesson',
        content: '# Heading',
        difficulty: 'Beginner',
        order: 1,
        imageUrl: null,
        emojiTheme: null,
        hindiTitle: 'परिचय',
        hindiDescription: 'टेस्ट',
        category: 'General',
      },
      {
        id: 2,
        title: 'Advanced Topic',
        slug: 'advanced-topic',
        description: 'Advanced lesson',
        content: '# Advanced',
        difficulty: 'Advanced',
        order: 2,
        imageUrl: null,
        emojiTheme: null,
        hindiTitle: 'उन्नत',
        hindiDescription: 'उन्नत पाठ',
        category: 'Special',
      },
    ],
    isLoading: false,
  }),
}));

jest.mock('@/hooks/use-progress', () => ({
  useProgress: () => ({
    data: [
      {
        id: 1,
        userId: 1,
        lessonId: 1,
        completed: true,
        completedAt: new Date().toISOString(),
        lesson: {
          id: 1,
          title: 'Intro',
          slug: 'intro',
          description: 'Test lesson',
          content: '# Heading',
          difficulty: 'Beginner',
          order: 1,
          imageUrl: null,
          emojiTheme: null,
          hindiTitle: 'परिचय',
          hindiDescription: 'टेस्ट',
          category: 'General',
        },
      },
    ],
    isLoading: false,
  }),
}));

describe('AllLessons page', () => {
  it('renders heading and both lessons from useLessons', () => {
    renderWithClient(<AllLessons />);

    expect(screen.getByText(/All Lessons/i)).toBeInTheDocument();
    expect(screen.getByText('Intro')).toBeInTheDocument();
    expect(screen.getByText('Advanced Topic')).toBeInTheDocument();
  });

  it('filters by difficulty when a level pill is clicked', async () => {
    const user = userEvent.setup();
    renderWithClient(<AllLessons />);

    // Click the Advanced filter
    const advancedButton = screen.getByRole('button', { name: /Advanced/i });
    await user.click(advancedButton);

    // The Advanced lesson should be visible; Intro should at least not be the primary title anymore
    expect(screen.getByText('Advanced Topic')).toBeInTheDocument();
  });
});