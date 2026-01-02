import { render, screen, fireEvent } from '@testing-library/react';
import { QuizComponent } from '@/components/QuizComponent';

const mockQuestions = [
  {
    id: 1,
    question: 'What is the capital of India?',
    questionHindi: 'भारत की राजधानी क्या है?',
    options: ['Mumbai', 'Delhi', 'Kolkata', 'Chennai'],
    correctAnswer: 'Delhi',
    explanation: 'Delhi is the capital of India.',
    type: 'multiple_choice' as const,
  },
  {
    id: 2,
    question: 'Is English important?',
    questionHindi: 'क्या अंग्रेजी महत्वपूर्ण है?',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'Yes, English is important for communication.',
    type: 'true_false' as const,
  },
];

describe('QuizComponent', () => {
  it('renders quiz questions', () => {
    render(
      <QuizComponent
        lessonId={1}
        lessonTitle="Test Lesson"
        questions={mockQuestions}
      />
    );
    
    expect(screen.getByText(/भारत की राजधानी क्या है?/)).toBeInTheDocument();
  });

  it('allows selecting an answer', () => {
    render(
      <QuizComponent
        lessonId={1}
        lessonTitle="Test Lesson"
        questions={mockQuestions}
      />
    );
    
    const option = screen.getByText('Delhi');
    fireEvent.click(option);
    
    expect(option.closest('button')).toHaveClass('border-primary');
  });

  it('shows feedback after submitting', () => {
    render(
      <QuizComponent
        lessonId={1}
        lessonTitle="Test Lesson"
        questions={mockQuestions}
      />
    );
    
    fireEvent.click(screen.getByText('Delhi'));
    fireEvent.click(screen.getByText('Submit Answer'));
    
    expect(screen.getByText(/सही!/)).toBeInTheDocument();
  });

  it('tracks score correctly', () => {
    render(
      <QuizComponent
        lessonId={1}
        lessonTitle="Test Lesson"
        questions={mockQuestions}
      />
    );
    
    // Answer first question correctly
    fireEvent.click(screen.getByText('Delhi'));
    fireEvent.click(screen.getByText('Submit Answer'));
    
    expect(screen.getByText(/Score: 1\/2/)).toBeInTheDocument();
  });

  it('shows completion screen after all questions', async () => {
    render(
      <QuizComponent
        lessonId={1}
        lessonTitle="Test Lesson"
        questions={mockQuestions}
      />
    );
    
    // Answer first question
    fireEvent.click(screen.getByText('Delhi'));
    fireEvent.click(screen.getByText('Submit Answer'));
    fireEvent.click(screen.getByText(/अगला प्रश्न/));
    
    // Answer second question (wait for next question to render)
    const trueOption = await screen.findByText('True');
    fireEvent.click(trueOption);
    fireEvent.click(screen.getByText('Submit Answer'));
    fireEvent.click(screen.getByText(/देखें परिणाम/));
    
    expect(screen.getByText(/बधाई हो!/)).toBeInTheDocument();
  });
});
