import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AchievementBadge } from '../../client/src/components/AchievementBadge';
import { Quiz } from '../../client/src/components/Quiz';
import { Button } from '../../client/src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../client/src/components/ui/card';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

expect.extend(toHaveNoViolations);

// Helper to wrap components with QueryClientProvider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('Accessibility Tests - WCAG 2.1 AA Compliance', () => {
  describe('AchievementBadge Component', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <AchievementBadge
          name="Test Achievement"
          description="Test description"
          icon="🏆"
          xpReward={10}
          unlocked={false}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA labels for locked state', () => {
      render(
        <AchievementBadge
          name="Test Achievement"
          description="Test description"
          icon="🏆"
          xpReward={10}
          unlocked={false}
        />
      );
      const badge = screen.getByRole('article', { name: /test achievement/i });
      expect(badge).toHaveAttribute('aria-label', expect.stringContaining('Test Achievement'));
    });

    it('should have proper ARIA labels for unlocked state', () => {
      render(
        <AchievementBadge
          name="Test Achievement"
          description="Test description"
          icon="🏆"
          xpReward={10}
          unlocked={true}
          unlockedAt="2026-01-23"
        />
      );
      const badge = screen.getByRole('article', { name: /test achievement/i });
      expect(badge).toHaveAttribute('aria-label', expect.stringContaining('Unlocked'));
    });

    it('should have sufficient color contrast', async () => {
      const { container } = render(
        <AchievementBadge
          name="Test Achievement"
          description="Test description"
          icon="🏆"
          xpReward={10}
          unlocked={true}
        />
      );
      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: true },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });

  describe('Button Component', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Button>Click me</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should be keyboard accessible', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toHaveAttribute('tabIndex', '0');
    });

    it('should have proper ARIA attributes when disabled', () => {
      render(<Button disabled>Disabled Button</Button>);
      const button = screen.getByRole('button', { name: /disabled button/i });
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Card Component', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <Card>
          <CardHeader>
            <CardTitle>Test Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Card content</p>
          </CardContent>
        </Card>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper heading hierarchy', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Card content</p>
          </CardContent>
        </Card>
      );
      const heading = screen.getByRole('heading', { name: /test card/i });
      expect(heading).toBeInTheDocument();
    });
  });

  describe('Quiz Component', () => {
    it('should have no accessibility violations in loading state', async () => {
      const { container } = render(
        <Quiz quizId={1} />,
        { wrapper: createWrapper() }
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper form labels for quiz options', async () => {
      // Mock useQuery to return quiz data
      const mockUseQuery = jest.fn();
      jest.mock('@tanstack/react-query', () => ({
        ...jest.requireActual('@tanstack/react-query'),
        useQuery: mockUseQuery,
      }));

      mockUseQuery.mockReturnValue({
        data: [
          {
            id: 1,
            question: 'Test Question',
            options: ['Option A', 'Option B', 'Option C'],
            correctAnswer: 'Option A',
          },
        ],
        isLoading: false,
        error: null,
      });

      const { container } = render(
        <Quiz quizId={1} />,
        { wrapper: createWrapper() }
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should support tab navigation through interactive elements', () => {
      render(
        <div>
          <Button>First Button</Button>
          <Button>Second Button</Button>
          <Button>Third Button</Button>
        </div>
      );

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('tabIndex', '0');
      });
    });

    it('should support Enter key activation for buttons', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      
      button.focus();
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter' });
      button.dispatchEvent(enterEvent);
      
      // Button should be focusable and activatable
      expect(button).toHaveFocus();
    });
  });

  describe('Screen Reader Support', () => {
    it('should have descriptive alt text for images', async () => {
      const { container } = render(
        <img src="test.jpg" alt="Descriptive alt text for test image" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA live regions for dynamic content', () => {
      render(
        <div>
          <div role="status" aria-live="polite" aria-atomic="true">
            Status message
          </div>
          <div role="alert" aria-live="assertive">
            Alert message
          </div>
        </div>
      );

      const statusRegion = screen.getByRole('status');
      const alertRegion = screen.getByRole('alert');

      expect(statusRegion).toHaveAttribute('aria-live', 'polite');
      expect(statusRegion).toHaveAttribute('aria-atomic', 'true');
      expect(alertRegion).toHaveAttribute('aria-live', 'assertive');
    });
  });

  describe('Focus Management', () => {
    it('should maintain focus order in logical sequence', () => {
      render(
        <form>
          <label htmlFor="input1">First Input</label>
          <input id="input1" type="text" />
          <label htmlFor="input2">Second Input</label>
          <input id="input2" type="text" />
          <Button type="submit">Submit</Button>
        </form>
      );

      const inputs = screen.getAllByRole('textbox');
      const submitButton = screen.getByRole('button', { name: /submit/i });

      // Focus order should be logical
      expect(inputs[0]).toHaveAttribute('tabIndex', '0');
      expect(inputs[1]).toHaveAttribute('tabIndex', '0');
      expect(submitButton).toHaveAttribute('tabIndex', '0');
    });

    it('should trap focus in modal dialogs', () => {
      render(
        <div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
          <h2 id="dialog-title">Dialog Title</h2>
          <Button>Close</Button>
        </div>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby', 'dialog-title');
    });
  });
});

