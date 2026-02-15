import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
  // Default success handler for fetching quiz questions
  http.get('/api/quizzes/:quizId/questions', () => {
    return HttpResponse.json([
      {
        id: 1,
        question: 'What is 1 + 1?',
        options: JSON.stringify(['1', '2', '3', '4']),
        correctAnswer: '2',
        explanation: '1 + 1 equals 2.',
      },
    ]);
  }),
];

export const server = setupServer(...handlers);
