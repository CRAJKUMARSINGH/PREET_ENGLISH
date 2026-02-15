
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Bigul2: 1000 Beginner Users (Simultaneous)
// Objective: Visit 99% of content (simulated via random paths)

export const options = {
    scenarios: {
        bigul2_beginners: {
            executor: 'ramping-arrival-rate',
            startRate: 50,
            timeUnit: '1s',
            preAllocatedVUs: 1000,
            maxVUs: 1500,
            stages: [
                { target: 1000, duration: '30s' }, // Ramp up to 1000 users
                { target: 1000, duration: '2m' },  // Hold for 2 minutes
                { target: 0, duration: '30s' },    // Ramp down
            ],
        },
    },
    thresholds: {
        http_req_failed: ['rate<0.01'], // <1% errors
        http_req_duration: ['p(95)<2000'], // 95% of requests under 2s
    },
};

const BASE_URL = 'http://localhost:5000';

// Simulated Content Paths (representing 99% of app)
const PATHS = [
    '/api/lessons',
    '/api/user/progress',
    '/api/stories',
    '/api/scenarios',
    '/api/speaking/topics',
    '/api/user/stats',
    '/api/leaderboard',
    '/api/activity-feed'
];

export default function () {
    // 1. Simulate randomized content visit
    const randomPath = PATHS[Math.floor(Math.random() * PATHS.length)];
    const res = http.get(`${BASE_URL}${randomPath}`);

    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    sleep(1);
}
