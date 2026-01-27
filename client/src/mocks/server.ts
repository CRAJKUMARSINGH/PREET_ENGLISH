import { setupServer } from 'msw/node';
import { rest } from 'msw';

const handlers = [
  // Default success handler for fetching quiz questions
  rest.get('/api/quizzes/:quizId/questions', (req, res, ctx) => {
    return res(ctx.json([
      {
        id: 1,
        question: 'What is 1 + 1?',
        options: JSON.stringify(['1', '2', '3', '4']),
        correctAnswer: '2',
        explanation: '1 + 1 equals 2.',
      },
    ]));
  }),
];

export const server = setupServer(...handlers);

