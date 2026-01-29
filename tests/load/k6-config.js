
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metric to track error rate specifically
const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '30s', target: 20 },  // Ramp up to 20 users
    { duration: '1m', target: 100 },  // Ramp to 100 users over 1 minute
    { duration: '30s', target: 0 },   // Ramp down
  ],
  thresholds: {
    // 95% of requests must complete below 500ms
    http_req_duration: ['p(95)<500'],
    // Error rate should be below 10% (Clean Exit constraint)
    errors: ['rate<0.1'],
  },
};

export default function () {
  // 1. Pick a random user from the seeded pool
  // Usernames are k6_user_0 to k6_user_499
  const userId = Math.floor(Math.random() * 500);
  const username = `k6_user_${userId}`;
  const password = "TestPass123!";

  // 2. Login Request
  const loginRes = http.post(`${__ENV.BASE_URL}/api/login`, JSON.stringify({
    username: username,
    password: password,
  }), {
    headers: { 'Content-Type': 'application/json' },
  });

  const loginSuccess = check(loginRes, {
    'login successful': (r) => r.status === 200,
  });

  if (!loginSuccess) {
    errorRate.add(1);
    // If login fails, we can't proceed to profile
    return;
  }

  // 3. User Profile Request (Protected)
  // K6 automatically handles cookies from the previous response
  const profileRes = http.get(`${__ENV.BASE_URL}/api/user`);

  const profileSuccess = check(profileRes, {
    'profile retrieved': (r) => r.status === 200 && r.body.includes(username),
  });

  if (!profileSuccess) {
    errorRate.add(1);
  }

  // 4. Think Time
  sleep(1 + Math.random() * 2); // Random 1-3 seconds
}