import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import ErrorBoundary from '../../client/src/components/ErrorBoundary';
import '@testing-library/jest-dom';
import React from 'react';

// A component that intentionally throws an error for testing the ErrorBoundary
function Bomb({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error("💥");
  }
  return <div>All good</div>;
}

// A harness component to manage the state for the Bomb and ErrorBoundary
function BoundaryHarness() {
  const [explode, setExplode] = React.useState(true);

  return (
    <>
      <button onClick={() => setExplode(false)}>Fix</button>
      <ErrorBoundary>
        <Bomb shouldThrow={explode} />
      </ErrorBoundary>
    </>
  );
}

describe('ErrorBoundary', () => {
  let consoleErrorSpy: jest.SpyInstance;
  let originalLocation: Location;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    originalLocation = window.location; // Store original window.location
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    Object.defineProperty(window, 'location', { value: originalLocation, writable: true }); // Restore original
  });

  it('renders default error message when a child component throws an error', () => {
    render(
      <ErrorBoundary>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('We encountered an unexpected error. Please try refreshing the page.')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
    expect(screen.getByText('Go to Home')).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it("resets error state when 'Try Again' is clicked and underlying issue is fixed", async () => {
    const { rerender } = render(<BoundaryHarness />);

    // Initial state: Error boundary should be displayed
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockClear();

    // Click 'Try Again' to reset the boundary's internal error state
    act(() => {
      fireEvent.click(screen.getByText('Try Again'));
    });

    // At this point, the ErrorBoundary's internal state is reset, but the Bomb is still set to explode.
    // We need to re-render BoundaryHarness with the underlying issue fixed.
    rerender(<BoundaryHarness />);

    // Fix the underlying error by clicking the 'Fix' button in BoundaryHarness
    fireEvent.click(screen.getByText('Fix'));

    // The ErrorBoundary should now recover and render the child's content
    await waitFor(() =>
      expect(screen.getByText("All good")).toBeInTheDocument()
    );
    expect(screen.queryByText('Oops! Something went wrong')).not.toBeInTheDocument();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('redirects to home when \'Go to Home\' is clicked', () => {
    // Create a mock for window.location
    const assignMock = jest.fn();
    const mockLocation = {
      ...window.location,
      assign: assignMock,
    };
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: mockLocation,
    });

    render(
      <ErrorBoundary>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>
    );

    // Click the 'Go to Home' button
    fireEvent.click(screen.getByText('Go to Home'));

    // Expect a redirect to the home page
    expect(assignMock).toHaveBeenCalledWith('/');
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <Bomb shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('All good')).toBeInTheDocument();
    expect(screen.queryByText('Oops! Something went wrong')).not.toBeInTheDocument();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });
});
