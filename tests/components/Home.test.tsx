import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from '@/pages/ModernHome';

const queryClient = new QueryClient();

const renderWithClient = (ui: React.ReactElement) =>
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);

// Mock hooks used by Home so we can focus on rendering and basic flow
jest.mock('@/hooks/use-lessons', () => ({
  useLessons: () => ({
    data: [
      { id: 1, title: 'Intro', slug: 'intro', description: 'Test lesson', content: '# Heading', difficulty: 'Beginner', order: 1, imageUrl: null, emojiTheme: null, hindiTitle: 'परिचय', hindiDescription: 'टेस्ट', category: 'General' }
    ],
    isLoading: false,
  }),
}));

jest.mock('@/hooks/use-progress', () => ({
  useProgress: () => ({
    data: [
      { id: 1, userId: 1, lessonId: 1, completed: true, completedAt: new Date().toISOString(), lesson: { id: 1, title: 'Intro', slug: 'intro', description: 'Test lesson', content: '# Heading', difficulty: 'Beginner', order: 1, imageUrl: null, emojiTheme: null, hindiTitle: 'परिचय', hindiDescription: 'टेस्ट', category: 'General' } }
    ],
    isLoading: false,
  }),
}));

describe('Home page', () => {
  it('renders welcome header and quick access sections', () => {
    renderWithClient(<Home />);

    // Core hero content (may appear in multiple places; just ensure present)
    expect(screen.getAllByText(/PREET ENGLISH/i).length).toBeGreaterThan(0);

    // Check for any main content indicators (using getAllByText since it appears multiple times)
    expect(screen.getAllByText(/Premium Learning/i).length).toBeGreaterThan(0);
  });

  it('shows at least one lesson card from useLessons', () => {
    renderWithClient(<Home />);

    expect(screen.getByText(/Intro/)).toBeInTheDocument();
  });
});