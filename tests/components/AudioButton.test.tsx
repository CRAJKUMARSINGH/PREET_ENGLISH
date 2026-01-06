import { render, screen, fireEvent } from '@testing-library/react';
import { AudioButton } from '@/components/AudioButton';

describe('AudioButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders audio button', () => {
    render(<AudioButton text="Hello" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('plays audio when clicked', () => {
    render(<AudioButton text="Hello" language="en" />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    
    expect(window.speechSynthesis.speak).toHaveBeenCalled();
  });

  it('shows text when showText prop is true', () => {
    render(<AudioButton text="Hello" showText />);
    expect(screen.getByText('Listen')).toBeInTheDocument();
  });

  it('supports Hindi language', () => {
    render(<AudioButton text="नमस्ते" language="hi" />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    
    expect(window.speechSynthesis.speak).toHaveBeenCalled();
  });
});
