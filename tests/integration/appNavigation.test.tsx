import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '@/App';
// @ts-expect-error - __setLocation is provided by Jest wouter mock at tests/mocks/wouter.tsx
import { __setLocation } from 'wouter';

const mockFetch = (url: string) => {
  // lessons list
  if (url === '/api/lessons') {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: async () => ([
        {
          id: 1,
          title: 'Intro',
          slug: 'intro',
          description: 'Desc',
          content: '# English\n\nContent\n\n## हिंदी\n\nहिंदी सामग्री',
          difficulty: 'Beginner',
          order: 1,
          imageUrl: null,
          emojiTheme: null,
          hindiTitle: 'परिचय',
          hindiDescription: 'विवरण',
          category: 'General',
        },
      ]),
    } as any);
  }

  // lesson get
  if (url === '/api/lessons/1') {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: async () => ({
        id: 1,
        title: 'Intro',
        slug: 'intro',
        description: 'Desc',
        content: '# English\n\nContent\n\n## हिंदी\n\nहिंदी सामग्री',
        difficulty: 'Beginner',
        order: 1,
        imageUrl: null,
        emojiTheme: null,
        hindiTitle: 'परिचय',
        hindiDescription: 'विवरण',
        category: 'General',
        vocabulary: [],
      }),
    } as any);
  }

  // progress
  if (url === '/api/progress') {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: async () => ([]),
    } as any);
  }

  // search (react-query enabled only after 3 chars, but return empty anyway)
  if (url === '/api/search') {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: async () => ([]),
    } as any);
  }

  return Promise.resolve({ ok: false, status: 404, json: async () => ({ message: 'not found' }) } as any);
};

describe('App navigation (integration)', () => {
  beforeEach(() => {
    __setLocation('/');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).fetch = jest.fn((input: any) => mockFetch(String(input)));
  });

  it('renders Home at /', async () => {
    render(<App />);

    // Home shows quick access section
    expect(screen.getAllByText(/Quick Access/i).length).toBeGreaterThan(0);
  });

  it('navigates to HindiLearning via sidebar link', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Pick the actual sidebar <a href="/hindi-learning"> link (avoid clicking random "Hindi" text)
    const allLinks = await screen.findAllByRole('link');
    const hindiLink =
      (allLinks.find((el) => (el as HTMLAnchorElement).getAttribute('href') === '/hindi-learning') as HTMLElement | undefined) ||
      (allLinks.find((el) => /Hindi/i.test(el.textContent || '')) as HTMLElement | undefined);

    expect(hindiLink).toBeTruthy();
    await user.click(hindiLink!);

    expect(await screen.findByText(/Hindi Speakers के लिए English Learning/i)).toBeInTheDocument();
  });

  it('renders LessonView at /lesson/1', async () => {
    __setLocation('/lesson/1');
    render(<App />);

    // Wait for lesson content to load and render
    expect((await screen.findAllByText(/English Content/i)).length).toBeGreaterThan(0);
    expect(await screen.findByText(/हिंदी सामग्री/)).toBeInTheDocument();
  });
});
