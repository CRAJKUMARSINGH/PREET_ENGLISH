import { render, screen } from '@testing-library/react';
import HindiLearning from '@/pages/HindiLearning';

// Minimal smoke test concentrating on structure and data usage.

describe('HindiLearning page', () => {
  it('renders main header and tabs', () => {
    render(<HindiLearning />);

    // Header
    expect(screen.getByText(/Hindi Speakers के लिए English Learning/i)).toBeInTheDocument();

    // Tabs (allow multiple matches for labels like "उच्चारण", "व्याकरण", etc.)
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getAllByText(/उच्चारण/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/व्याकरण/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/संस्कृति/).length).toBeGreaterThan(0);
  });
});