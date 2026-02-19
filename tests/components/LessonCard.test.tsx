import React from 'react';
import { screen } from '@testing-library/react';
import { LessonCard } from '@/components/LessonCard';
import { renderWithProviders, mockLesson } from '../utils/test-helpers';

// Mock wouter
jest.mock('wouter', () => ({
  Link: ({ children, href }: any) => <a href={href}>{children}</a>,
  useLocation: () => ['/', jest.fn()],
}));

// Mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}));

describe('LessonCard Component', () => {
  it('renders lesson title', () => {
    renderWithProviders(<LessonCard lesson={mockLesson} />);
    expect(screen.getByText('Introduction to English')).toBeInTheDocument();
  });

  it('renders Hindi title', () => {
    renderWithProviders(<LessonCard lesson={mockLesson} />);
    expect(screen.getByText('अंग्रेजी सीखने का परिचय')).toBeInTheDocument();
  });

  it('displays difficulty badge', () => {
    renderWithProviders(<LessonCard lesson={mockLesson} />);
    expect(screen.getByText('Beginner')).toBeInTheDocument();
  });

  it('displays lesson description', () => {
    renderWithProviders(<LessonCard lesson={mockLesson} />);
    expect(screen.getByText('मूल अंग्रेजी अवधारणाएँ सीखें')).toBeInTheDocument();
  });

  it('has clickable card element', () => {
    renderWithProviders(<LessonCard lesson={mockLesson} />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/lesson/1');
  });

  it('shows lesson order number', () => {
    renderWithProviders(<LessonCard lesson={mockLesson} />);
    expect(screen.getByText(/LESSON 1/i)).toBeInTheDocument();
  });

  it('shows start button for incomplete lessons', () => {
    renderWithProviders(<LessonCard lesson={mockLesson} />);
    expect(screen.getByText('start')).toBeInTheDocument();
  });

  it('shows review button for completed lessons', () => {
    const progress = { lessonId: 1, userId: 1, completed: true, score: 100 };
    renderWithProviders(<LessonCard lesson={mockLesson} progress={progress} />);
    expect(screen.getByText('review')).toBeInTheDocument();
  });

  it('displays completion checkmark for completed lessons', () => {
    const progress = { lessonId: 1, userId: 1, completed: true, score: 100 };
    const { container } = renderWithProviders(<LessonCard lesson={mockLesson} progress={progress} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies correct CSS classes based on difficulty', () => {
    renderWithProviders(<LessonCard lesson={mockLesson} />);
    const badge = screen.getByText('Beginner');
    expect(badge).toHaveClass('text-emerald-600');
  });

  it('handles intermediate difficulty styling', () => {
    const intermediateLesson = { ...mockLesson, difficulty: 'Intermediate' as const };
    renderWithProviders(<LessonCard lesson={intermediateLesson} />);
    const badge = screen.getByText('Intermediate');
    expect(badge).toHaveClass('text-blue-600');
  });

  it('handles advanced difficulty styling', () => {
    const advancedLesson = { ...mockLesson, difficulty: 'Advanced' as const };
    renderWithProviders(<LessonCard lesson={advancedLesson} />);
    const badge = screen.getByText('Advanced');
    expect(badge).toHaveClass('text-purple-600');
  });

  it('displays estimated time', () => {
    renderWithProviders(<LessonCard lesson={mockLesson} />);
    expect(screen.getByText('5m')).toBeInTheDocument();
  });

  it('uses custom index when provided', () => {
    renderWithProviders(<LessonCard lesson={mockLesson} index={5} />);
    // Index 5 means lesson 6 (index + 1), but lesson.order is 1, so it uses order
    expect(screen.getByText(/LESSON 1/i)).toBeInTheDocument();
  });

  it('uses lesson order when available', () => {
    const lessonWithOrder = { ...mockLesson, order: 10 };
    renderWithProviders(<LessonCard lesson={lessonWithOrder} />);
    expect(screen.getByText(/LESSON 10/i)).toBeInTheDocument();
  });

  it('renders without progress prop', () => {
    renderWithProviders(<LessonCard lesson={mockLesson} />);
    expect(screen.getByText('Introduction to English')).toBeInTheDocument();
  });

  it('handles missing Hindi title gracefully', () => {
    const lessonWithoutHindi = { ...mockLesson, hindiTitle: '' };
    renderWithProviders(<LessonCard lesson={lessonWithoutHindi} />);
    expect(screen.getByText('Introduction to English')).toBeInTheDocument();
  });

  it('handles missing Hindi description gracefully', () => {
    const lessonWithoutHindiDesc = { ...mockLesson, hindiDescription: '' };
    renderWithProviders(<LessonCard lesson={lessonWithoutHindiDesc} />);
    expect(screen.getByText('Learn basic English concepts')).toBeInTheDocument();
  });

  it('renders link with correct href', () => {
    renderWithProviders(<LessonCard lesson={mockLesson} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/lesson/1');
  });
});
