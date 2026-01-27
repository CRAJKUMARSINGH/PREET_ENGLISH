import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LessonCard from '@/components/LessonCard'; // Assuming this component exists

const queryClient = new QueryClient();

const renderWithClient = (ui: React.ReactElement) =>
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);

// Mock the lesson data
const mockLesson = {
  id: 1,
  title: 'Introduction to English',
  slug: 'introduction-to-english',
  description: 'Learn basic English concepts',
  content: '# Welcome to English Learning',
  difficulty: 'Beginner',
  order: 1,
  imageUrl: null,
  emojiTheme: '📚',
  hindiTitle: 'अंग्रेजी सीखने का परिचय',
  hindiDescription: 'मूल अंग्रेजी अवधारणाएँ सीखें',
  category: 'Grammar'
};

describe('LessonCard Component', () => {
  it('renders lesson title', () => {
    renderWithClient(<LessonCard lesson={mockLesson} />);
    expect(screen.getByText('Introduction to English')).toBeInTheDocument();
  });

  it('renders Hindi title', () => {
    renderWithClient(<LessonCard lesson={mockLesson} />);
    expect(screen.getByText('अंग्रेजी सीखने का परिचय')).toBeInTheDocument();
  });

  it('displays difficulty badge', () => {
    renderWithClient(<LessonCard lesson={mockLesson} />);
    expect(screen.getByText('Beginner')).toBeInTheDocument();
  });

  it('shows category information', () => {
    renderWithClient(<LessonCard lesson={mockLesson} />);
    expect(screen.getByText('Grammar')).toBeInTheDocument();
  });

  it('renders emoji theme', () => {
    renderWithClient(<LessonCard lesson={mockLesson} />);
    expect(screen.getByText('📚')).toBeInTheDocument();
  });

  it('displays lesson description', () => {
    renderWithClient(<LessonCard lesson={mockLesson} />);
    expect(screen.getByText('Learn basic English concepts')).toBeInTheDocument();
  });

  it('renders Hindi description', () => {
    renderWithClient(<LessonCard lesson={mockLesson} />);
    expect(screen.getByText('मूल अंग्रेजी अवधारणाएँ सीखें')).toBeInTheDocument();
  });

  it('has clickable card element', () => {
    renderWithClient(<LessonCard lesson={mockLesson} />);
    const card = screen.getByRole('link'); // Assuming it's a link to the lesson
    expect(card).toBeInTheDocument();
    fireEvent.click(card);
    // Would test navigation if we had a router setup
  });

  it('shows lesson order number', () => {
    renderWithClient(<LessonCard lesson={mockLesson} />);
    expect(screen.getByText('#1')).toBeInTheDocument(); // Assuming order is displayed
  });

  it('has proper accessibility attributes', () => {
    renderWithClient(<LessonCard lesson={mockLesson} />);
    const card = screen.getByRole('link');
    expect(card).toHaveAttribute('aria-label', 'Introduction to English lesson');
  });

  it('applies correct CSS classes based on difficulty', () => {
    renderWithClient(<LessonCard lesson={mockLesson} />);
    const card = screen.getByRole('link');
    expect(card).toHaveClass('bg-blue-50'); // Assuming beginner gets blue class
  });

  it('formats title for display', () => {
    renderWithClient(<LessonCard lesson={{...mockLesson, title: 'Advanced Grammar Rules'}} />);
    expect(screen.getByText('Advanced Grammar Rules')).toBeInTheDocument();
  });

  it('handles long titles gracefully', () => {
    const longTitleLesson = {
      ...mockLesson,
      title: 'This is a very long lesson title that should be truncated properly'
    };
    renderWithClient(<LessonCard lesson={longTitleLesson} />);
    expect(screen.getByText('This is a very long lesson title that should be truncated properly')).toBeInTheDocument();
  });

  it('shows progress indicator when lesson is completed', () => {
    renderWithClient(<LessonCard lesson={{...mockLesson, completed: true}} />);
    expect(screen.getByText('✓ Completed')).toBeInTheDocument(); // Assuming this shows when completed
  });

  it('shows different UI when lesson is in progress', () => {
    renderWithClient(<LessonCard lesson={{...mockLesson, inProgress: true}} />);
    expect(screen.getByText('In Progress')).toBeInTheDocument(); // Assuming this shows when in progress
  });

  it('handles missing image gracefully', () => {
    renderWithClient(<LessonCard lesson={{...mockLesson, imageUrl: null}} />);
    // Should not break when no image is provided
    expect(screen.getByText('Introduction to English')).toBeInTheDocument();
  });

  it('applies different styles for different categories', () => {
    renderWithClient(<LessonCard lesson={{...mockLesson, category: 'Vocabulary'}} />);
    const card = screen.getByRole('link');
    expect(card).toHaveClass('border-purple-200'); // Assuming vocabulary gets purple border
  });

  it('displays estimated reading time', () => {
    renderWithClient(<LessonCard lesson={{...mockLesson, estimatedTime: '10 mins'}} />);
    expect(screen.getByText('10 mins')).toBeInTheDocument();
  });

  it('shows lesson rating if available', () => {
    renderWithClient(<LessonCard lesson={{...mockLesson, rating: 4.5}} />);
    expect(screen.getByText('4.5 ★')).toBeInTheDocument();
  });

  it('displays number of students who completed', () => {
    renderWithClient(<LessonCard lesson={{...mockLesson, studentsCompleted: 1234}} />);
    expect(screen.getByText('1234 students')).toBeInTheDocument();
  });

  it('shows lesson preview content', () => {
    renderWithClient(<LessonCard lesson={{...mockLesson, preview: 'This is a preview of the lesson'}} />);
    expect(screen.getByText('This is a preview of the lesson')).toBeInTheDocument();
  });
});