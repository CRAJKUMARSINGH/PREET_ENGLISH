/**
 * CHANDRAYAAN PRECISION TEST RUNNER
 * Integrated load testing with real-time performance monitoring
 */

import { spawn } from 'child_process';
import { PerformanceMonitor } from './performance-monitor';

interface TestResult {
  success: boolean;
  duration: number;
  message: string;
  metrics?: any;
}

class ChandrayaanTestRunner {
  private performanceMonitor: PerformanceMonitor;
  private testStartTime: number = 0;

  constructor() {
    this.performanceMonitor = new PerformanceMonitor();
  }

  /**
   * Start the development server
   */
  private startDevServer(): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log('🚀 Starting development server...');

      const server = spawn('npm', ['run', 'dev'], {
        stdio: 'pipe',
        shell: true,
      });

      let serverReady = false;

      server.stdout?.on('data', (data) => {
        const output = data.toString();
        console.log(`[SERVER] ${output}`);

        if (output.includes('running on localhost') || output.includes('listening')) {
          serverReady = true;
          console.log('✓ Server is ready');
          resolve();
        }
      });

      server.stderr?.on('data', (data) => {
        console.error(`[SERVER ERROR] ${data}`);
      });

      server.on('error', (error) => {
        reject(new Error(`Failed to start server: ${error.message}`));
      });

      // Timeout if server doesn't start
      setTimeout(() => {
        if (!serverReady) {
          server.kill();
          reject(new Error('Server startup timeout'));
        }
      }, 30000);
    });
  }

  /**
   * Run the load test
   */
  private runLoadTest(): Promise<TestResult> {
    return new Promise((resolve) => {
      console.log('\n⏱️  Starting load test...');
      this.testStartTime = Date.now();

      const test = spawn('npx', ['tsx', 'tests/load-test-chandrayaan.ts'], {
        stdio: 'pipe',
        shell: true,
        env: {
          ...process.env,
          TEST_BASE_URL: 'http://localhost:5000',
        },
      });

      let output = '';
      let hasErrors = false;

      test.stdout?.on('data', (data) => {
        const chunk = data.toString();
        output += chunk;
        console.log(chunk);
      });

      test.stderr?.on('data', (data) => {
        const chunk = data.toString();
        console.error(`[TEST ERROR] ${chunk}`);
        hasErrors = true;
      });

      test.on('close', (code) => {
        const duration = (Date.now() - this.testStartTime) / 1000;

        resolve({
          success: code === 0 && !hasErrors,
          duration,
          message: code === 0 ? 'Load test completed successfully' : `Load test failed with code ${code}`,
          metrics: { output },
        });
      });
    });
  }

  /**
   * Run comprehensive test suite
   */
  async run(): Promise<void> {
    console.log('╔' + '═'.repeat(78) + '╗');
    console.log('║' + ' '.repeat(20) + '🎯 CHANDRAYAAN PRECISION TEST SUITE 🎯' + ' '.repeat(20) + '║');
    console.log('╚' + '═'.repeat(78) + '╝');

    try {
      // Start performance monitoring
      console.log('\n📊 Starting performance monitoring...');
      const monitoringInterval: NodeJS.Timeout = this.performanceMonitor.startMonitoring(2000);

      // Wait a moment for monitoring to initialize
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Start dev server
      await this.startDevServer();

      // Wait for server to fully initialize
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Run load test
      const testResult = await this.runLoadTest();

      // Stop monitoring
      this.performanceMonitor.stopMonitoring(monitoringInterval);

      // Generate reports
      console.log('\n\n' + '═'.repeat(80));
      this.performanceMonitor.generateReport();

      // Final summary
      console.log('\n\n╔' + '═'.repeat(78) + '╗');
      console.log('║' + ' '.repeat(25) + '📋 TEST SUMMARY' + ' '.repeat(39) + '║');
      console.log('╠' + '═'.repeat(78) + '╣');
      console.log(`║ Load Test Status: ${testResult.success ? '✓ PASSED' : '✗ FAILED'}` + ' '.repeat(56) + '║');
      console.log(`║ Total Duration: ${testResult.duration.toFixed(2)}s` + ' '.repeat(59) + '║');
      console.log(`║ Message: ${testResult.message}` + ' '.repeat(68 - testResult.message.length) + '║');
      console.log('╚' + '═'.repeat(78) + '╝');

      process.exit(testResult.success ? 0 : 1);
    } catch (error) {
      console.error('\n❌ Test suite failed:', error);
      process.exit(1);
    }
  }
}

// Main execution
const runner = new ChandrayaanTestRunner();
runner.run().catch(console.error);
