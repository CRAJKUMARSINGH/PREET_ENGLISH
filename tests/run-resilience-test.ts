/**
 * RESILIENCE TEST ORCHESTRATOR 🛡️
 * Combines Load Testing + Chaos Engineering to validate system resilience.
 */

import { spawn, ChildProcess } from 'child_process';
import { ChaosMonkey } from './chaos/chaos-monkey';
import path from 'path';

class ResilienceTestRunner {
    private serverProcess: ChildProcess | null = null;
    private loadTestProcess: ChildProcess | null = null;
    private chaosMonkey: ChaosMonkey;
    private isShuttingDown: boolean = false;

    constructor() {
        this.chaosMonkey = new ChaosMonkey(
            {
                enableRestarts: true,
                restartIntervalMin: 15000, // Restart every 15-45 seconds
                restartIntervalMax: 45000,
            },
            this.restartServer.bind(this)
        );
    }

    /**
     * Start the application server
     */
    private async startServer(): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log('📡 Starting application server...');

            // Use npm run dev or similar command
            this.serverProcess = spawn('npm', ['run', 'dev'], {
                cwd: process.cwd(),
                stdio: 'pipe', // We process output
                shell: true,
            });

            let serverReady = false;

            this.serverProcess.stdout?.on('data', (data) => {
                // Keep output clean, maybe filter
                const output = data.toString();
                if (output.includes('running on') && !serverReady) {
                    serverReady = true;
                    console.log('✅ Server is ready and listening');
                    resolve();
                }
            });

            this.serverProcess.stderr?.on('data', (data) => {
                // console.error(`[SERVER ERR] ${data}`); 
            });

            this.serverProcess.on('close', (code) => {
                if (!this.isShuttingDown) {
                    console.log(`[SERVER] Process exited unexpectedly with code ${code}`);
                }
            });

            // Timeout
            setTimeout(() => {
                if (!serverReady) {
                    // It might be ready but output didn't match, or it failed.
                    // For resilience test, we assume if it takes too long, it's a fail or just proceed.
                    // But getting the port ready is crucial.
                    // Let's check a health endpoint instead if we could, but logs are faster for now.
                    console.log('⚠️  Server startup timed out (or logs missed). Proceeding anyway...');
                    resolve();
                }
            }, 30000);
        });
    }

    /**
     * Stop the server
     */
    private async stopServer(): Promise<void> {
        if (this.serverProcess) {
            this.serverProcess.kill();
            // On Windows, tree kill might be needed, but .kill() usually works for the shell wrapper
            // Actually spawn with shell: true creates a shell process.
            // We might need strict killing.
            if (process.platform === 'win32') {
                spawn('taskkill', ['/pid', this.serverProcess.pid!.toString(), '/f', '/t']);
            }
            this.serverProcess = null;
            // Wait a bit for port to release
            await new Promise(r => setTimeout(r, 2000));
        }
    }

    /**
     * Restart server (for Chaos Monkey)
     */
    private async restartServer(): Promise<void> {
        console.log('🔄 Restarting server...');
        await this.stopServer();
        await this.startServer();
    }

    /**
     * Run the load test
     */
    private async runLoadTest(): Promise<number> {
        return new Promise((resolve) => {
            console.log('\n🚀 Launching Load Test Driver...');

            const env = {
                ...process.env,
                TEST_TOTAL_USERS: process.env.TEST_TOTAL_USERS || '2000',
                TEST_CONCURRENCY: process.env.TEST_CONCURRENCY || '100',
                TEST_LOAD_PATTERN: process.env.TEST_LOAD_PATTERN || 'SOAK',
                TEST_SCENARIOS_TARGET: process.env.TEST_SCENARIOS_TARGET || '11001',
                TEST_SOAK_DURATION: process.env.TEST_SOAK_DURATION || '120000',
                TEST_BASE_URL: process.env.TEST_BASE_URL || 'http://localhost:5000'
            };

            this.loadTestProcess = spawn('npx', ['tsx', 'tests/load-test-chandrayaan.ts'], {
                env,
                stdio: 'inherit', // Pipe output directly to console
                shell: true
            });

            this.loadTestProcess.on('close', (code) => {
                console.log(`\n🏁 Load Test finished with code ${code}`);
                resolve(code || 0);
            });
        });
    }

    /**
     * Main execution flow
     */
    async run() {
        console.log('🛡️  RESILIENCE TEST SUITE STARTING');
        console.log('==================================');

        try {
            // 1. Start Server
            await this.startServer();

            // 2. Start Chaos Monkey
            this.chaosMonkey.start();

            // 3. Run Load Test
            const exitCode = await this.runLoadTest();

            // 4. Cleanup
            this.isShuttingDown = true;
            this.chaosMonkey.stop();
            await this.stopServer();

            if (exitCode === 0) {
                console.log('\n✅ RESILIENCE TEST PASSED: System survived the chaos!');
                process.exit(0);
            } else {
                console.error('\n❌ RESILIENCE TEST FAILED: Load test reported failure.');
                process.exit(1);
            }

        } catch (error) {
            console.error('❌ Critical Error in Resilience Runner:', error);
            this.isShuttingDown = true;
            await this.stopServer();
            process.exit(1);
        }
    }
}

// Run
const runner = new ResilienceTestRunner();
runner.run();
