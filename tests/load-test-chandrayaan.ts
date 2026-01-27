/**
 * CHANDRAYAAN PRECISION LOAD TEST
 * Simulates user traffic with configurable patterns and scale.
 * Targets 11001+ scenarios for Week 5 validation.
 */

import http from 'http';
import https from 'https';
import { fileURLToPath } from 'url';

export type LoadPattern = 'STANDARD' | 'RAMP_UP' | 'SPIKE' | 'SOAK';

export interface UserProfile {
  id: string; // "user-1"
  username: string;
  category: 'beginner' | 'intermediate' | 'advanced';
  sessionId: string;
  startTime: number;
  cookie?: string; // Session cookie
  metrics: {
    requestsCompleted: number;
    requestsFailed: number;
    totalResponseTime: number;
    minResponseTime: number;
    maxResponseTime: number;
    contentVisited: string[];
    errors: string[];
  };
}

export interface LoadTestConfig {
  baseUrl: string;
  totalUsers: number;
  usersPerCategory: number;
  contentCoverageTarget: number; // 90%
  concurrency: number;
  timeout: number;
  loadPattern: LoadPattern;
  scenariosTarget: number;
  soakDuration?: number; // ms, only for SOAK pattern
}

export interface ContentEndpoint {
  path: string;
  method: string;
  category: 'beginner' | 'intermediate' | 'advanced' | 'all';
  name: string;
}

// Define all app content endpoints
const APP_CONTENT: ContentEndpoint[] = [
  // Core Data
  { path: '/api/lessons', method: 'GET', category: 'all', name: 'Lessons List' },
  { path: '/api/stories', method: 'GET', category: 'all', name: 'Stories List' },
  { path: '/api/scenarios', method: 'GET', category: 'all', name: 'Scenarios List' },
  { path: '/api/quizzes', method: 'GET', category: 'all', name: 'Quizzes List' },

  // Specific Data (seeded)
  { path: '/api/lessons/1', method: 'GET', category: 'beginner', name: 'Lesson 1' },
  { path: '/api/lessons/5', method: 'GET', category: 'intermediate', name: 'Lesson 5' },
  { path: '/api/lessons/15', method: 'GET', category: 'advanced', name: 'Lesson 15' },

  // User Data (Protected)
  { path: '/api/progress', method: 'GET', category: 'all', name: 'User Progress' },

  // Health
  { path: '/api/health', method: 'GET', category: 'all', name: 'Health Check' },
];

export class LoadTestRunner {
  private config: LoadTestConfig;
  private users: Map<string, UserProfile> = new Map();
  private globalMetrics = {
    totalRequests: 0,
    totalFailures: 0,
    totalResponseTime: 0,
    minResponseTime: Infinity,
    maxResponseTime: 0,
    scenariosCompleted: 0,
    startTime: 0,
    endTime: 0,
    errors: new Map<string, number>(),
  };

  constructor(config: LoadTestConfig) {
    this.config = config;
  }

  /**
   * Initialize user profiles
   */
  private initializeUsers(count: number = this.config.totalUsers): void {
    let userId = 1;
    const categories: Array<'beginner' | 'intermediate' | 'advanced'> = ['beginner', 'intermediate', 'advanced'];
    const usersPerCat = Math.ceil(count / 3);

    for (const category of categories) {
      for (let i = 0; i < usersPerCat; i++) {
        if (this.users.size >= count) break;

        const username = `testuser_${Date.now()}_${userId}`;
        const user: UserProfile = {
          id: `user-${userId}`,
          username,
          category,
          sessionId: `session-${userId}-${Date.now()}`,
          startTime: Date.now(),
          metrics: {
            requestsCompleted: 0,
            requestsFailed: 0,
            totalResponseTime: 0,
            minResponseTime: Infinity,
            maxResponseTime: 0,
            contentVisited: [],
            errors: [],
          },
        };
        this.users.set(user.id, user);
        userId++;
      }
    }
  }

  /**
   * Register and Login user to get cookies
   */
  private async authenticateUser(user: UserProfile): Promise<boolean> {
    try {
      // 1. Register
      const regData = JSON.stringify({ username: user.username, password: 'password123' });
      const regRes = await this.makeHttpRequest('/api/register', 'POST', regData, user);

      if (regRes.statusCode >= 400 && regRes.statusCode !== 400 && regRes.statusCode !== 409) {
        // If failed and not "already exists", fail
        // But 400/409 means maybe already exists (if re-using users)
        // For now, proceed to login if reg fails
      }

      // 2. Login
      const loginData = JSON.stringify({ username: user.username, password: 'password123' });
      const loginRes = await this.makeHttpRequest('/api/login', 'POST', loginData, user);

      if (loginRes.statusCode === 200) {
        // Extract set-cookie
        const setCookie = loginRes.headers['set-cookie'];
        if (setCookie) {
          user.cookie = setCookie.map(c => c.split(';')[0]).join('; ');
          return true;
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  /**
   * Get content endpoints for a specific user category
   */
  private getContentForUser(category: 'beginner' | 'intermediate' | 'advanced'): ContentEndpoint[] {
    return APP_CONTENT.filter(
      (endpoint) => endpoint.category === 'all' || endpoint.category === category
    );
  }

  /**
   * Calculate 90% of content to visit
   */
  private getContentToVisit(content: ContentEndpoint[]): ContentEndpoint[] {
    const targetCount = Math.ceil(content.length * (this.config.contentCoverageTarget / 100));
    return content.slice(0, targetCount);
  }

  /**
   * Internal Request Method
   */
  private async makeHttpRequest(path: string, method: string, body: string | null, user: UserProfile): Promise<{ statusCode: number; responseTime: number; headers: any; error?: string }> {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const url = new URL(path, this.config.baseUrl);

      const options: any = {
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: url.pathname + url.search,
        method: method,
        headers: {
          'User-Agent': `LoadTest-${user.category}`,
          'X-Session-ID': user.sessionId,
          'X-User-ID': user.id,
          'Content-Type': 'application/json',
        },
        timeout: this.config.timeout,
      };

      if (user.cookie) {
        options.headers['Cookie'] = user.cookie;
      }

      const protocol = url.protocol === 'https:' ? https : http;

      const req = protocol.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          const responseTime = Date.now() - startTime;
          resolve({
            statusCode: res.statusCode || 500,
            responseTime,
            headers: res.headers,
          });
        });
      });

      req.on('error', (error) => {
        const responseTime = Date.now() - startTime;
        resolve({
          statusCode: 0,
          responseTime,
          headers: {},
          error: error.message,
        });
      });

      req.on('timeout', () => {
        req.destroy();
        const responseTime = Date.now() - startTime;
        resolve({
          statusCode: 0,
          responseTime,
          headers: {},
          error: 'Request timeout',
        });
      });

      if (body) {
        req.write(body);
      }

      req.end();
    });
  }

  /**
   * Make HTTP request wrapper for endpoint
   */
  private async makeRequest(
    endpoint: ContentEndpoint,
    user: UserProfile
  ): Promise<{ statusCode: number; responseTime: number; error?: string }> {
    const result = await this.makeHttpRequest(endpoint.path, endpoint.method, endpoint.method === 'POST' ? JSON.stringify({ message: 'test' }) : null, user);
    return { statusCode: result.statusCode, responseTime: result.responseTime, error: result.error };
  }

  /**
   * Simulate user session
   */
  private async simulateUserSession(user: UserProfile): Promise<void> {
    // Authenticate if needed
    if (!user.cookie) {
      this.globalMetrics.totalRequests++; // Count auth attempt
      const authSuccess = await this.authenticateUser(user);
      if (!authSuccess) {
        this.globalMetrics.totalFailures++;
        const key = `Authentication Failed`;
        this.globalMetrics.errors.set(key, (this.globalMetrics.errors.get(key) || 0) + 1);
        return; // Skip session if auth fails
      }
    }

    const content = this.getContentForUser(user.category);
    const contentToVisit = this.getContentToVisit(content);

    for (const endpoint of contentToVisit) {
      try {
        const result = await this.makeRequest(endpoint, user);

        user.metrics.requestsCompleted++;
        user.metrics.totalResponseTime += result.responseTime;
        user.metrics.minResponseTime = Math.min(user.metrics.minResponseTime, result.responseTime);
        user.metrics.maxResponseTime = Math.max(user.metrics.maxResponseTime, result.responseTime);
        user.metrics.contentVisited.push(endpoint.name);

        this.globalMetrics.totalRequests++;
        this.globalMetrics.totalResponseTime += result.responseTime;
        this.globalMetrics.minResponseTime = Math.min(this.globalMetrics.minResponseTime, result.responseTime);
        this.globalMetrics.maxResponseTime = Math.max(this.globalMetrics.maxResponseTime, result.responseTime);

        if (result.statusCode >= 400) {
          user.metrics.requestsFailed++;
          user.metrics.errors.push(`${endpoint.name}: ${result.statusCode}`);
          this.globalMetrics.totalFailures++;
          const key = `${endpoint.name}: ${result.statusCode}`;
          this.globalMetrics.errors.set(
            key,
            (this.globalMetrics.errors.get(key) || 0) + 1
          );
        }

        // Small delay between requests
        await new Promise((resolve) => setTimeout(resolve, 50));
      } catch (error) {
        user.metrics.requestsFailed++;
        user.metrics.errors.push(`${endpoint.name}: ${error}`);
        this.globalMetrics.totalFailures++;
        const key = `${endpoint.name} (Exception)`;
        this.globalMetrics.errors.set(
          key,
          (this.globalMetrics.errors.get(key) || 0) + 1
        );
      }
    }

    // Count as a completed scenario
    this.globalMetrics.scenariosCompleted++;
    if (this.globalMetrics.scenariosCompleted % 100 === 0) {
      process.stdout.write('.');
    }
    if (this.globalMetrics.scenariosCompleted % 500 === 0) {
      console.log(`\n[${new Date().toISOString()}] Completed ${this.globalMetrics.scenariosCompleted} scenarios`);
    }
  }

  /**
   * Run load test with specific pattern
   */
  async run(): Promise<void> {
    console.log('🚀 CHANDRAYAAN PRECISION LOAD TEST INITIATED');
    console.log('═'.repeat(80));
    console.log(`📊 Test Configuration:`);
    console.log(`   • Total Users: ${this.config.totalUsers}`);
    console.log(`   • Pattern: ${this.config.loadPattern}`);
    console.log(`   • Target Scenarios: ${this.config.scenariosTarget}`);
    console.log(`   • Users per Category: ${this.config.usersPerCategory}`);
    console.log(`   • Content Coverage: ${this.config.contentCoverageTarget}%`);
    console.log(`   • Concurrency: ${this.config.concurrency}`);
    console.log(`   • Base URL: ${this.config.baseUrl}`);
    console.log('═'.repeat(80));

    this.globalMetrics.startTime = Date.now();
    this.initializeUsers();

    console.log(`\n⏱️  Starting simulation...`);

    switch (this.config.loadPattern) {
      case 'RAMP_UP':
        await this.runRampUp();
        break;
      case 'SPIKE':
        await this.runSpike();
        break;
      case 'SOAK':
        await this.runSoak();
        break;
      case 'STANDARD':
      default:
        await this.runStandard();
        break;
    }

    this.globalMetrics.endTime = Date.now();
    this.generateReport();
  }

  private async runStandard(): Promise<void> {
    const userArray = Array.from(this.users.values());
    for (let i = 0; i < userArray.length; i += this.config.concurrency) {
      const batch = userArray.slice(i, i + this.config.concurrency);
      const batchPromises = batch.map((user) => this.simulateUserSession(user));
      await Promise.all(batchPromises);
    }
  }

  private async runRampUp(): Promise<void> {
    const userArray = Array.from(this.users.values());
    // Start with 10% concurrency, increase by 10% every batch
    let currentConcurrency = Math.max(1, Math.floor(this.config.concurrency * 0.1));
    const step = Math.max(1, Math.floor(this.config.concurrency * 0.1));

    let i = 0;
    while (i < userArray.length) {
      console.log(`\n   ↗️  Ramping up: Running batch with concurrency ${currentConcurrency}`);
      const batchSize = Math.min(currentConcurrency, userArray.length - i);
      const batch = userArray.slice(i, i + batchSize);
      await Promise.all(batch.map(u => this.simulateUserSession(u)));

      i += batchSize;
      currentConcurrency = Math.min(this.config.concurrency, currentConcurrency + step);
    }
  }

  private async runSpike(): Promise<void> {
    // Run 20% normally
    // Then burst 60% with double concurrency
    // Then cooldown 20%
    const userArray = Array.from(this.users.values());
    const normalCount = Math.floor(userArray.length * 0.2);
    const spikeCount = Math.floor(userArray.length * 0.6);

    console.log('\n   ➡️  Phase 1: Normal Load');
    // Standard concurrency
    for (let i = 0; i < normalCount; i += this.config.concurrency) {
      const batch = userArray.slice(i, Math.min(i + this.config.concurrency, normalCount));
      await Promise.all(batch.map(u => this.simulateUserSession(u)));
    }

    console.log('\n   ⚡ Phase 2: Spike Load (2x Concurrency)');
    const spikeConcurrency = this.config.concurrency * 2;
    for (let i = normalCount; i < normalCount + spikeCount; i += spikeConcurrency) {
      const batch = userArray.slice(i, Math.min(i + spikeConcurrency, normalCount + spikeCount));
      await Promise.all(batch.map(u => this.simulateUserSession(u)));
    }

    console.log('\n   ↘️  Phase 3: Cooldown');
    for (let i = normalCount + spikeCount; i < userArray.length; i += this.config.concurrency) {
      const batch = userArray.slice(i, Math.min(i + this.config.concurrency, userArray.length));
      await Promise.all(batch.map(u => this.simulateUserSession(u)));
    }
  }

  private async runSoak(): Promise<void> {
    // Keep running sessions until timeout or target scenarios reached
    const duration = this.config.soakDuration || 60000;
    const endTime = Date.now() + duration;
    const userArray = Array.from(this.users.values());

    console.log(`\n   💧 Starting Soak Test for ${duration}ms or ${this.config.scenariosTarget} scenarios`);

    while (Date.now() < endTime && this.globalMetrics.scenariosCompleted < this.config.scenariosTarget) {
      // Pick a random batch of users to simulate
      const batchSize = Math.min(this.config.concurrency, this.config.scenariosTarget - this.globalMetrics.scenariosCompleted);
      if (batchSize <= 0) break;

      const batch: UserProfile[] = [];
      for (let j = 0; j < batchSize; j++) {
        // Reuse users or pick random
        batch.push(userArray[Math.floor(Math.random() * userArray.length)]);
      }
      await Promise.all(batch.map(u => this.simulateUserSession(u)));
    }
  }

  /**
   * Generate comprehensive test report
   */
  private generateReport(): void {
    const duration = (this.globalMetrics.endTime - this.globalMetrics.startTime) / 1000;
    const avgResponseTime = this.globalMetrics.totalRequests > 0
      ? this.globalMetrics.totalResponseTime / this.globalMetrics.totalRequests
      : 0;
    const successRate = this.globalMetrics.totalRequests > 0
      ? ((this.globalMetrics.totalRequests - this.globalMetrics.totalFailures) / this.globalMetrics.totalRequests) * 100
      : 0;

    console.log('\n\n📈 LOAD TEST RESULTS - CHANDRAYAAN PRECISION REPORT');
    console.log('═'.repeat(80));

    // Global Metrics
    console.log('\n🌍 GLOBAL METRICS:');
    console.log(`   Scenarios Completed: ${this.globalMetrics.scenariosCompleted}`);
    console.log(`   Target Scenarios: ${this.config.scenariosTarget}`);
    console.log(`   Total Requests: ${this.globalMetrics.totalRequests}`);
    console.log(`   Successful: ${this.globalMetrics.totalRequests - this.globalMetrics.totalFailures}`);
    console.log(`   Failed: ${this.globalMetrics.totalFailures}`);
    console.log(`   Success Rate: ${successRate.toFixed(2)}%`);
    console.log(`   Duration: ${duration.toFixed(2)}s`);
    console.log(`   Requests/sec: ${(this.globalMetrics.totalRequests / duration).toFixed(2)}`);

    // Response Time Metrics
    console.log('\n⏱️  RESPONSE TIME METRICS:');
    console.log(`   Average: ${avgResponseTime.toFixed(2)}ms`);
    console.log(`   Min: ${this.globalMetrics.minResponseTime !== Infinity ? this.globalMetrics.minResponseTime : 0}ms`);
    console.log(`   Max: ${this.globalMetrics.maxResponseTime}ms`);

    // Error Analysis
    if (this.globalMetrics.errors.size > 0) {
      console.log('\n⚠️  ERROR ANALYSIS:');
      const sortedErrors = Array.from(this.globalMetrics.errors.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

      for (const [endpoint, count] of sortedErrors) {
        console.log(`   ${endpoint}: ${count} failures`);
      }
    }

    // Performance Assessment
    console.log('\n✅ PERFORMANCE ASSESSMENT:');
    const assessments = [
      { metric: 'Success Rate', value: successRate, threshold: 95, unit: '%' },
      { metric: 'Avg Response Time', value: avgResponseTime, threshold: 1000, unit: 'ms', inverse: true },
      { metric: 'Scenarios Target', value: this.globalMetrics.scenariosCompleted, threshold: this.config.scenariosTarget, unit: '' },
    ];

    let passedAll = true;
    for (const assessment of assessments) {
      const passed = assessment.inverse ? assessment.value <= assessment.threshold : assessment.value >= assessment.threshold;
      const status = passed ? '✓ PASS' : '✗ FAIL';
      if (!passed) passedAll = false;
      console.log(`   ${status} - ${assessment.metric}: ${assessment.value.toFixed(2)}${assessment.unit} (threshold: ${assessment.threshold}${assessment.unit})`);
    }

    console.log('\n' + '═'.repeat(80));
    console.log(passedAll ? '🎯 CHANDRAYAAN LOAD TEST SUCCESS' : '⚠️  CHANDRAYAAN LOAD TEST FAILED STANDARDS');
    console.log('═'.repeat(80));

    // Exit with appropriate code
    process.exitCode = passedAll ? 0 : 1;
  }
}

// Main execution
async function main() {
  const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);

  if (isMainModule) {
    const config: LoadTestConfig = {
      baseUrl: process.env.TEST_BASE_URL || 'http://localhost:5000',
      totalUsers: Number(process.env.TEST_TOTAL_USERS) || 1500,
      usersPerCategory: Number(process.env.TEST_USERS_PER_CAT) || 500,
      contentCoverageTarget: 90,
      concurrency: Number(process.env.TEST_CONCURRENCY) || 50,
      timeout: 10000,
      loadPattern: (process.env.TEST_LOAD_PATTERN as LoadPattern) || 'STANDARD',
      scenariosTarget: Number(process.env.TEST_SCENARIOS_TARGET) || 11001,
      soakDuration: Number(process.env.TEST_SOAK_DURATION) || 300000, // 5 min default
    };

    const runner = new LoadTestRunner(config);
    await runner.run();
  }
}

main().catch(console.error);
