import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@tests/test-setup/test-utils'
import { DailyGoalCard } from '@client/components/gamification/DailyGoalCard'

describe('DailyGoalCard Component', () => {
  const mockGoal = {
    id: 1,
    type: 'lessons',
    target: 5,
    current: 3,
    title: 'Complete 5 Lessons',
    titleHindi: '5 पाठ पूरे करें',
    reward: 100,
    icon: '📚'
  }

  describe('Rendering', () => {
    it('should render goal card', () => {
      render(<DailyGoalCard goal={mockGoal} />)
      expect(screen.getByText('Complete 5 Lessons')).toBeInTheDocument()
    })

    it('should display progress', () => {
      render(<DailyGoalCard goal={mockGoal} />)
      expect(screen.getByText('3/5')).toBeInTheDocument()
    })

    it('should display reward XP', () => {
      render(<DailyGoalCard goal={mockGoal} />)
      expect(screen.getByText(/100.*XP/i)).toBeInTheDocument()
    })

    it('should show icon', () => {
      render(<DailyGoalCard goal={mockGoal} />)
      expect(screen.getByText('📚')).toBeInTheDocument()
    })

    it('should display Hindi title', () => {
      render(<DailyGoalCard goal={mockGoal} />)
      expect(screen.getByText('5 पाठ पूरे करें')).toBeInTheDocument()
    })
  })

  describe('Progress Bar', () => {
    it('should show correct progress percentage', () => {
      render(<DailyGoalCard goal={mockGoal} />)
      const progressBar = screen.getByRole('progressbar')
      expect(progressBar).toHaveAttribute('aria-valuenow', '60')
    })

    it('should show 0% for no progress', () => {
      const goalNoProgress = { ...mockGoal, current: 0 }
      render(<DailyGoalCard goal={goalNoProgress} />)
      const progressBar = screen.getByRole('progressbar')
      expect(progressBar).toHaveAttribute('aria-valuenow', '0')
    })

    it('should show 100% for completed goal', () => {
      const completedGoal = { ...mockGoal, current: 5 }
      render(<DailyGoalCard goal={completedGoal} />)
      const progressBar = screen.getByRole('progressbar')
      expect(progressBar).toHaveAttribute('aria-valuenow', '100')
    })

    it('should cap at 100% for over-achievement', () => {
      const overAchievedGoal = { ...mockGoal, current: 7 }
      render(<DailyGoalCard goal={overAchievedGoal} />)
      const progressBar = screen.getByRole('progressbar')
      expect(progressBar).toHaveAttribute('aria-valuenow', '100')
    })
  })

  describe('Completion State', () => {
    it('should show completed badge when goal is met', () => {
      const completedGoal = { ...mockGoal, current: 5 }
      render(<DailyGoalCard goal={completedGoal} />)
      expect(screen.getByText(/completed/i)).toBeInTheDocument()
    })

    it('should show checkmark for completed goal', () => {
      const completedGoal = { ...mockGoal, current: 5 }
      render(<DailyGoalCard goal={completedGoal} />)
      expect(screen.getByText('✓')).toBeInTheDocument()
    })

    it('should apply completed styling', () => {
      const completedGoal = { ...mockGoal, current: 5 }
      render(<DailyGoalCard goal={completedGoal} />)
      const card = screen.getByRole('article')
      expect(card).toHaveClass(/completed/)
    })

    it('should not show completed badge for incomplete goal', () => {
      render(<DailyGoalCard goal={mockGoal} />)
      expect(screen.queryByText(/completed/i)).not.toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('should call onClick when clicked', () => {
      const onClick = vi.fn()
      render(<DailyGoalCard goal={mockGoal} onClick={onClick} />)
      
      fireEvent.click(screen.getByRole('article'))
      
      expect(onClick).toHaveBeenCalledWith(mockGoal)
    })

    it('should be keyboard accessible', () => {
      const onClick = vi.fn()
      render(<DailyGoalCard goal={mockGoal} onClick={onClick} />)
      
      const card = screen.getByRole('article')
      fireEvent.keyDown(card, { key: 'Enter' })
      
      expect(onClick).toHaveBeenCalled()
    })
  })

  describe('Goal Types', () => {
    it('should handle lessons goal type', () => {
      render(<DailyGoalCard goal={mockGoal} />)
      expect(screen.getByText('📚')).toBeInTheDocument()
    })

    it('should handle vocabulary goal type', () => {
      const vocabGoal = { ...mockGoal, type: 'vocabulary', icon: '📝' }
      render(<DailyGoalCard goal={vocabGoal} />)
      expect(screen.getByText('📝')).toBeInTheDocument()
    })

    it('should handle speaking goal type', () => {
      const speakingGoal = { ...mockGoal, type: 'speaking', icon: '🎤' }
      render(<DailyGoalCard goal={speakingGoal} />)
      expect(screen.getByText('🎤')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<DailyGoalCard goal={mockGoal} />)
      const card = screen.getByRole('article')
      expect(card).toHaveAttribute('aria-label')
    })

    it('should have accessible progress bar', () => {
      render(<DailyGoalCard goal={mockGoal} />)
      const progressBar = screen.getByRole('progressbar')
      expect(progressBar).toHaveAttribute('aria-valuemin', '0')
      expect(progressBar).toHaveAttribute('aria-valuemax', '100')
    })
  })
})
