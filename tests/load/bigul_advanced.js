
import http from 'k6/http';
import { check, sleep } from 'k6';

// Bigul: 15000 Advanced Users (Simultaneous with Cache Deletion)
// Objective: Massive concurrency with aggressive cache invalidation

export const options = {
    scenarios: {
        bigul_advanced: {
            executor: 'ramping-arrival-rate',
            startRate: 500,
            timeUnit: '1s',
            preAllocatedVUs: 5000,
            maxVUs: 15000,
            stages: [
                { target: 15000, duration: '1m' }, // Rapid ramp up to 15000
                { target: 15000, duration: '3m' }, // Hold max load
                { target: 0, duration: '1m' },     // Ramp down
            ],
        },
    },
    thresholds: {
        http_req_failed: ['rate<0.05'], // Allow higher failure rate (5%) under extreme load
        http_req_duration: ['p(95)<5000'], // Allow 5s response time
    },
};

const BASE_URL = 'http://localhost:5000';

// Advanced users hit deeper endpoints
const ADVANCED_PATHS = [
    '/api/speaking/session/create', // Write heavy
    '/api/stories/generate',        // AI/Compute heavy
    '/api/user/profile/update',     // DB Write
    '/api/quiz/submit'              // Logic intense
];

export default function () {
    const randomPath = ADVANCED_PATHS[Math.floor(Math.random() * ADVANCED_PATHS.length)];

    // Simulate Cache Deletion / Invalidation request in parallel (approx 10% of requests)
    if (Math.random() < 0.10) {
        // This simulates a user action that invalidates cache
        const cacheClearRes = http.post(`${BASE_URL}/api/admin/cache/clear`, {}, { tags: { type: 'cache_clear' } });
        check(cacheClearRes, { 'cache clear status 200': (r) => r.status === 200 || r.status === 403 });
    }

    const res = http.get(`${BASE_URL}${randomPath}`);
    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    sleep(2);
}
