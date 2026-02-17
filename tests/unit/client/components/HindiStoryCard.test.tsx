import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@tests/test-setup/test-utils'
import { HindiStoryCard } from '@client/components/HindiStoryCard'

describe('HindiStoryCard Component', () => {
  const mockStory = {
    id: 1,
    title: 'Test Story',
    titleHindi: 'परीक्षण कहानी',
    content: 'This is a test story content.',
    contentHindi: 'यह एक परीक्षण कहानी सामग्री है।',
    difficulty: 'beginner' as const,
    category: 'daily-life',
    imageUrl: '/test-image.jpg'
  }

  describe('Rendering', () => {
    it('should render story card', () => {
      render(<HindiStoryCard story={mockStory} />)
      expect(screen.getByText('Test Story')).toBeInTheDocument()
    })

    it('should display story title', () => {
      render(<HindiStoryCard story={mockStory} />)
      expect(screen.getByText('Test Story')).toBeVisible()
    })

    it('should display Hindi title', () => {
      render(<HindiStoryCard story={mockStory} />)
      expect(screen.getByText('परीक्षण कहानी')).toBeInTheDocument()
    })

    it('should display difficulty badge', () => {
      render(<HindiStoryCard story={mockStory} />)
      expect(screen.getByText(/beginner/i)).toBeInTheDocument()
    })

    it('should display category', () => {
      render(<HindiStoryCard story={mockStory} />)
      expect(screen.getByText(/daily-life/i)).toBeInTheDocument()
    })

    it('should render image if provided', () => {
      render(<HindiStoryCard story={mockStory} />)
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('src', '/test-image.jpg')
    })

    it('should handle missing image gracefully', () => {
      const storyWithoutImage = { ...mockStory, imageUrl: undefined }
      render(<HindiStoryCard story={storyWithoutImage} />)
      expect(screen.queryByRole('img')).not.toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('should call onClick when clicked', () => {
      const onClick = vi.fn()
      render(<HindiStoryCard story={mockStory} onClick={onClick} />)
      
      fireEvent.click(screen.getByRole('article'))
      
      expect(onClick).toHaveBeenCalledTimes(1)
      expect(onClick).toHaveBeenCalledWith(mockStory)
    })

    it('should be keyboard accessible', () => {
      const onClick = vi.fn()
      render(<HindiStoryCard story={mockStory} onClick={onClick} />)
      
      const card = screen.getByRole('article')
      fireEvent.keyDown(card, { key: 'Enter' })
      
      expect(onClick).toHaveBeenCalled()
    })

    it('should support Space key', () => {
      const onClick = vi.fn()
      render(<HindiStoryCard story={mockStory} onClick={onClick} />)
      
      const card = screen.getByRole('article')
      fireEvent.keyDown(card, { key: ' ' })
      
      expect(onClick).toHaveBeenCalled()
    })

    it('should show hover state', () => {
      render(<HindiStoryCard story={mockStory} />)
      const card = screen.getByRole('article')
      
      fireEvent.mouseEnter(card)
      
      expect(card).toHaveClass(/hover/)
    })
  })

  describe('Props Validation', () => {
    it('should accept custom className', () => {
      render(<HindiStoryCard story={mockStory} className="custom-class" />)
      expect(screen.getByRole('article')).toHaveClass('custom-class')
    })

    it('should handle different difficulty levels', () => {
      const difficulties = ['beginner', 'intermediate', 'advanced'] as const
      
      difficulties.forEach(difficulty => {
        const story = { ...mockStory, difficulty }
        const { rerender } = render(<HindiStoryCard story={story} />)
        expect(screen.getByText(new RegExp(difficulty, 'i'))).toBeInTheDocument()
        rerender(<div />)
      })
    })

    it('should display read time if provided', () => {
      const storyWithReadTime = { ...mockStory, readTime: 5 }
      render(<HindiStoryCard story={storyWithReadTime} />)
      expect(screen.getByText(/5 min/i)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<HindiStoryCard story={mockStory} />)
      const card = screen.getByRole('article')
      expect(card).toHaveAttribute('aria-label')
    })

    it('should be focusable', () => {
      render(<HindiStoryCard story={mockStory} />)
      const card = screen.getByRole('article')
      card.focus()
      expect(card).toHaveFocus()
    })

    it('should have proper heading hierarchy', () => {
      render(<HindiStoryCard story={mockStory} />)
      const heading = screen.getByRole('heading')
      expect(heading).toBeInTheDocument()
    })
  })

  describe('Bilingual Support', () => {
    it('should display both English and Hindi titles', () => {
      render(<HindiStoryCard story={mockStory} />)
      expect(screen.getByText('Test Story')).toBeInTheDocument()
      expect(screen.getByText('परीक्षण कहानी')).toBeInTheDocument()
    })

    it('should use proper Hindi font', () => {
      render(<HindiStoryCard story={mockStory} />)
      const hindiText = screen.getByText('परीक्षण कहानी')
      expect(hindiText).toHaveStyle({ fontFamily: /Noto Sans Devanagari/i })
    })
  })
})
