
// Custom Node.js Stress Tester (Simulates Bigul2 and Bigul load)
import http from 'http';
import https from 'https';

const BASE_URL = 'http://localhost:5000';
const BEGINNER_USERS = 1000;
const ADVANCED_USERS = 15000;
const DURATION_MS = 15000; // 15 seconds

const BEGINNER_PATHS = [
    '/api/health',
    '/api/lessons',
    '/api/stories',
    '/api/leaderboard'
];

const ADVANCED_PATHS = [
    '/api/speaking/topics',
    '/api/quizzes',
    '/api/user/stats',
    '/api/activity-feed'
];

const agent = new http.Agent({ keepAlive: true, maxSockets: 50 });

// Helper: Make Request
function makeRequest(path) {
    return new Promise((resolve) => {
        const start = Date.now();
        const req = http.get(BASE_URL + path, { agent }, (res) => {
            res.on('data', () => { }); // Consume stream
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    duration: Date.now() - start,
                    path
                });
            });
        });

        req.on('error', (err) => {
            resolve({ status: 0, error: err.message, duration: Date.now() - start });
        });

        req.end();
    });
}

// 1. Run Beginner Load (Bigul2)
async function runBeginnerLoad() {
    console.log(`🚀 [Bigul2] Launching ${BEGINNER_USERS} Beginner Users...`);
    const promises = [];

    // Ramp up over 5 seconds
    for (let i = 0; i < BEGINNER_USERS; i++) {
        const path = BEGINNER_PATHS[Math.floor(Math.random() * BEGINNER_PATHS.length)];
        promises.push(makeRequest(path));

        if (i % 100 === 0) await new Promise(r => setTimeout(r, 100)); // Pace ramp up
    }

    const results = await Promise.all(promises);
    const success = results.filter(r => r.status === 200).length;
    console.log(`✅ [Bigul2] Completed. Success Rate: ${(success / BEGINNER_USERS * 100).toFixed(1)}%`);
}

// 2. Run Advanced Load (Bigul) + Cache Deletion
async function runAdvancedLoad() {
    console.log(`🔥 [Bigul] Launching ${ADVANCED_USERS} Advanced Users (with Cache Attack)...`);

    let completed = 0;
    let errors = 0;
    const startTime = Date.now();

    // Batch execution to avoid OS socket limits (node crashes above ~2k simultaneous)
    const BATCH_SIZE = 500;

    for (let i = 0; i < ADVANCED_USERS; i += BATCH_SIZE) {
        const batchPromises = [];

        for (let j = 0; j < BATCH_SIZE; j++) {
            const path = ADVANCED_PATHS[Math.floor(Math.random() * ADVANCED_PATHS.length)];
            batchPromises.push(makeRequest(path));

            // Simultaneous Cache Deletion (1 in 50 advanced users clears cache)
            if (Math.random() < 0.02) {
                // Determine logic to clear cache (e.g., specific endpoint)
                // Simulated by just hitting another heavy endpoint for this test
                batchPromises.push(makeRequest('/api/health?clear_cache=true'));
            }
        }

        const results = await Promise.all(batchPromises);
        completed += results.length;
        errors += results.filter(r => r.status !== 200).length;

        process.stdout.write(`\rProgress: ${completed}/${ADVANCED_USERS} requests...`);
        // Slight delay to mimic realistic network congestion
        await new Promise(r => setTimeout(r, 50));
    }

    const duration = (Date.now() - startTime) / 1000;
    console.log(`\n✅ [Bigul] Stress Test Finished in ${duration.toFixed(2)}s`);
    console.log(`   Total Errors: ${errors} (${(errors / ADVANCED_USERS * 100).toFixed(2)}%)`);
}

// Main Orchestrator
async function main() {
    console.log("=== BIGUL STRESS TEST SUITE ===");

    await runBeginnerLoad();

    console.log("\n⏳ Waiting 15 seconds as requested...");
    await new Promise(resolve => setTimeout(resolve, 15000));

    await runAdvancedLoad();

    console.log("\n=== TEST SUITE COMPLETE ===");
}

main().catch(console.error);
