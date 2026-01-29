
import { spawn } from 'child_process';
import fetch from 'node-fetch';

// Configuration
const BASE_URL = 'http://localhost:5000';
const TOTAL_USERS = 50;
const DURATION_SEC = 20;

// Metrics
const stats = {
    requests: 0,
    success: 0,
    failures: 0,
    errors: 0,
    latencies: [] as number[],
    breakerTripped: false
};

async function runWorker(id: number) {
    const username = `k6_user_${id % 50}`;
    const password = "TestPass123!";

    const start = Date.now();
    while (Date.now() - start < DURATION_SEC * 1000) {
        const reqStart = Date.now();
        try {
            const res = await fetch(`${BASE_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            stats.requests++;
            stats.latencies.push(Date.now() - reqStart);

            if (res.status === 200) {
                if (Math.random() < 0.05) process.stdout.write('.'); // progress dot
                stats.success++;
            } else if (res.status === 503) {
                process.stdout.write('T'); // Tripped
                stats.breakerTripped = true;
                stats.failures++;
            } else {
                process.stdout.write('F'); // Fail
                stats.failures++;
            }
        } catch (e) {
            process.stdout.write('E'); // Error
            stats.errors++;
        }

        // Think time (100-500ms)
        await new Promise(r => setTimeout(r, 100 + Math.random() * 400));
    }
}

async function startServer() {
    console.log("🚀 Starting Server in TEST mode (SQLite)...");
    // Ensure we use a test db file
    const server = spawn('npx', ['tsx', 'server/index.ts'], {
        env: { ...process.env, NODE_ENV: 'test', PORT: '5000', DATABASE_URL: 'file:sqlite.db' },
        stdio: 'pipe', // Capture logs
        shell: true
    });

    if (server.stdout) {
        server.stdout.on('data', (d) => {
            const s = d.toString();
            if (s.includes('Server running') || s.includes('Chaos')) console.log(`[SERVER] ${s.trim()}`);
        });
    }

    // Wait for health
    console.log("Waiting for health check...");
    for (let i = 0; i < 30; i++) {
        try {
            await fetch(`${BASE_URL}/api/health`);
            console.log("✅ Server is UP");
            return server;
        } catch (e) {
            await new Promise(r => setTimeout(r, 1000));
        }
    }
    throw new Error("Server failed to start");
}

async function main() {
    console.log("🧪 Starting Native Load & Chaos Test Simulator...");
    console.log("NOTE: Using In-Process Chaos (since Docker is unavailable)\n");

    let server;
    try {
        server = await startServer();

        // 1. Warmup
        console.log(`🔥 ramping up ${TOTAL_USERS} users...`);
        const workers = Array.from({ length: TOTAL_USERS }, (_, i) => runWorker(i));

        // 2. Inject Chaos
        setTimeout(async () => {
            console.log("\n\n⚡ INJECTING LATENCY (5000ms)...");
            await fetch(`${BASE_URL}/api/test/chaos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ enabled: true })
            });
        }, 5000);

        // 3. Remove Chaos
        setTimeout(async () => {
            console.log("\n\n🧹 REMOVING TOXIC...");
            await fetch(`${BASE_URL}/api/test/chaos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ enabled: false })
            });
        }, 15000);

        await Promise.all(workers);

        console.log("\n\n📊 Test Complete.");
        console.log(`Total Requests: ${stats.requests}`);
        console.log(`Success Rate: ${((stats.success / stats.requests) * 100).toFixed(2)}%`);

        const avgLat = stats.latencies.reduce((a, b) => a + b, 0) / stats.latencies.length;
        console.log(`Avg Latency: ${avgLat.toFixed(2)}ms`);

        console.log(`Circuit Breaker Tripped? ${stats.breakerTripped ? '✅ YES' : '❌ NO'}`);

    } catch (e) {
        console.error(e);
    } finally {
        if (server) {
            console.log("🛑 Stopping server...");
            // server.kill() might not kill the tree in windows shell: true
            spawn("taskkill", ["/pid", server.pid.toString(), "/f", "/t"]);
        }
        process.exit(0);
    }
}

main();
