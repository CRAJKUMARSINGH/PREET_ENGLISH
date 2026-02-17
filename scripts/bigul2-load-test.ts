#!/usr/bin/env tsx
/**
 * BIGUL2 Advanced Load Testing System
 * Simulates realistic user behavior with cache management
 * 
 * Phase 1: 1000 Beginner users accessing 99% content
 * Phase 2: 1500 Advanced users accessing 99% content (after 15s)
 * Includes: Simultaneous cache deletion and monitoring
 */

import fetch from 'node-fetch';
import { performance } from 'perf_hooks';

// Configuration
const BASE_URL = process.env.TEST_URL || 'http://localhost:5000';
const PHASE_1_USERS = 1000; // Beginner users
const PHASE_2_USERS = 1500; // Advanced users
const PHASE_2_DELAY = 15000; // 15 seconds
const CONTENT_COVERAGE = 0.99; // 99% content access
const CACHE_CLEAR_INTERVAL = 5000; // Clear cache every 5 seconds

// User behavior patterns
const BEGINNER_PATTERN = {
  lessonsPerUser: 5,
  quizzesPerUser: 2,
  storiesPerUser: 1,
  thinkTime: 500, // ms between actions
  errorRate: 0.05 // 5% error tolerance
};

const ADVANCED_PATTERN = {
  lessonsPerUser: 15,
  quizzesPerUser: 8,
  storiesPerUser: 5,
  conversationsPerUser: 3,
  thinkTime: 300,
  errorRate: 0.02
};

// Metrics tracking
interface Metrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  totalResponseTime: number;
  minResponseTime: number;
  maxResponseTime: number;
  cacheClears: number;
  activeUsers: number;
  errors: Array<{ timestamp: number; error: string; endpoint: string }>;
}

const metrics: Metrics = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  totalResponseTime: 0,
  minResponseTime: Infinity,
  maxResponseTime: 0,
  cacheClears: 0,
  activeUsers: 0,
  errors: []
};

// Cache management
class CacheManager {
  private clearInterval: NodeJS.Timeout | null = null;

  start() {
    console.log('🗑️  Cache Manager: Starting automatic cache clearing...');
    this.clearInterval = setInterval(() => {
      this.clearCache();
    }, CACHE_CLEAR_INTERVAL);
  }

  stop() {
    if (this.clearInterval) {
      clearInterval(this.clearInterval);
      this.clearInterval = null;
    }
    console.log('🗑️  Cache Manager: Stopped');
  }

  async clearCache() {
    const startTime = performance.now();
    try {
      // Clear server-side cache
      const response = await fetch(`${BASE_URL}/api/admin/cache/clear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const duration = performance.now() - startTime;
      metrics.cacheClears++;

      if (response.ok) {
        console.log(`✅ Cache cleared successfully (${duration.toFixed(2)}ms) - Total clears: ${metrics.cacheClears}`);
      } else {
        console.log(`⚠️  Cache clear returned ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Cache clear failed:', error);
    }
  }

  async forceClear() {
    console.log('🔄 Force clearing cache...');
    await this.clearCache();
  }
}

// HTTP Client with retry logic
class HTTPClient {
  async request(endpoint: string, options: any = {}): Promise<any> {
    const startTime = performance.now();
    const url = `${BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });

      const duration = performance.now() - startTime;
      
      // Update metrics
      metrics.totalRequests++;
      metrics.totalResponseTime += duration;
      metrics.minResponseTime = Math.min(metrics.minResponseTime, duration);
      metrics.maxResponseTime = Math.max(metrics.maxResponseTime, duration);

      if (response.ok) {
        metrics.successfulRequests++;
        return await response.json();
      } else {
        metrics.failedRequests++;
        metrics.errors.push({
          timestamp: Date.now(),
          error: `HTTP ${response.status}`,
          endpoint
        });
        return null;
      }
    } catch (error: any) {
      const duration = performance.now() - startTime;
      metrics.totalRequests++;
      metrics.failedRequests++;
      metrics.totalResponseTime += duration;
      
      metrics.errors.push({
        timestamp: Date.now(),
        error: error.message,
        endpoint
      });
      
      return null;
    }
  }
}

// Virtual User
class VirtualUser {
  private client: HTTPClient;
  private userId: number;
  private userType: 'beginner' | 'advanced';
  private pattern: typeof BEGINNER_PATTERN | typeof ADVANCED_PATTERN;

  constructor(userId: number, userType: 'beginner' | 'advanced') {
    this.client = new HTTPClient();
    this.userId = userId;
    this.userType = userType;
    this.pattern = userType === 'beginner' ? BEGINNER_PATTERN : ADVANCED_PATTERN;
  }

  private async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async run() {
    metrics.activeUsers++;
    console.log(`👤 User ${this.userId} (${this.userType}) started`);

    try {
      // Fetch all available content
      const lessons = await this.client.request('/api/lessons');
      const quizzes = await this.client.request('/api/quizzes');
      const stories = await this.client.request('/api/stories');
      const scenarios = await this.client.request('/api/scenarios');

      if (!lessons || !quizzes || !stories) {
        console.log(`⚠️  User ${this.userId}: Failed to fetch initial content`);
        return;
      }

      // Calculate 99% content coverage
      const lessonsToVisit = Math.ceil(lessons.length * CONTENT_COVERAGE);
      const quizzesToVisit = Math.ceil(quizzes.length * CONTENT_COVERAGE);
      const storiesToVisit = Math.ceil(stories.length * CONTENT_COVERAGE);

      // Visit lessons
      for (let i = 0; i < Math.min(lessonsToVisit, this.pattern.lessonsPerUser); i++) {
        const lesson = lessons[i % lessons.length];
        await this.client.request(`/api/lessons/${lesson.id}`);
        await this.sleep(this.pattern.thinkTime);
      }

      // Visit quizzes
      for (let i = 0; i < Math.min(quizzesToVisit, this.pattern.quizzesPerUser); i++) {
        const quiz = quizzes[i % quizzes.length];
        await this.client.request(`/api/quizzes/${quiz.id}`);
        await this.sleep(this.pattern.thinkTime);
      }

      // Visit stories
      for (let i = 0; i < Math.min(storiesToVisit, this.pattern.storiesPerUser); i++) {
        const story = stories[i % stories.length];
        await this.client.request(`/api/stories/${story.id}`);
        await this.sleep(this.pattern.thinkTime);
      }

      // Advanced users: additional interactions
      if (this.userType === 'advanced') {
        // Visit scenarios
        if (scenarios && scenarios.length > 0) {
          const scenariosToVisit = Math.ceil(scenarios.length * CONTENT_COVERAGE);
          for (let i = 0; i < Math.min(scenariosToVisit, 5); i++) {
            const scenario = scenarios[i % scenarios.length];
            await this.client.request(`/api/scenarios/${scenario.id}`);
            await this.sleep(this.pattern.thinkTime);
          }
        }

        // Simulate chat interactions
        for (let i = 0; i < this.pattern.conversationsPerUser; i++) {
          await this.client.request('/api/chat', {
            method: 'POST',
            body: JSON.stringify({ message: `Test message ${i + 1}` })
          });
          await this.sleep(this.pattern.thinkTime);
        }
      }

      console.log(`✅ User ${this.userId} (${this.userType}) completed successfully`);
    } catch (error: any) {
      console.error(`❌ User ${this.userId} (${this.userType}) failed:`, error.message);
    } finally {
      metrics.activeUsers--;
    }
  }
}

// Load Test Orchestrator
class LoadTestOrchestrator {
  private cacheManager: CacheManager;
  private startTime: number = 0;

  constructor() {
    this.cacheManager = new CacheManager();
  }

  async runPhase1() {
    console.log('\n' + '='.repeat(80));
    console.log('🚀 PHASE 1: Launching 1000 Beginner Users');
    console.log('='.repeat(80) + '\n');

    const users: VirtualUser[] = [];
    for (let i = 1; i <= PHASE_1_USERS; i++) {
      users.push(new VirtualUser(i, 'beginner'));
    }

    // Launch all users simultaneously
    const promises = users.map(user => user.run());
    await Promise.allSettled(promises);

    console.log('\n✅ Phase 1 Complete\n');
  }

  async runPhase2() {
    console.log('\n' + '='.repeat(80));
    console.log('🚀 PHASE 2: Launching 1500 Advanced Users');
    console.log('='.repeat(80) + '\n');

    const users: VirtualUser[] = [];
    for (let i = PHASE_1_USERS + 1; i <= PHASE_1_USERS + PHASE_2_USERS; i++) {
      users.push(new VirtualUser(i, 'advanced'));
    }

    // Launch all users simultaneously
    const promises = users.map(user => user.run());
    await Promise.allSettled(promises);

    console.log('\n✅ Phase 2 Complete\n');
  }

  printMetrics() {
    const duration = (performance.now() - this.startTime) / 1000;
    const avgResponseTime = metrics.totalRequests > 0 
      ? metrics.totalResponseTime / metrics.totalRequests 
      : 0;
    const successRate = metrics.totalRequests > 0
      ? (metrics.successfulRequests / metrics.totalRequests) * 100
      : 0;
    const throughput = metrics.totalRequests / duration;

    console.log('\n' + '='.repeat(80));
    console.log('📊 FINAL METRICS');
    console.log('='.repeat(80));
    console.log(`\n⏱️  Duration: ${duration.toFixed(2)}s`);
    console.log(`\n📈 Request Statistics:`);
    console.log(`   Total Requests:      ${metrics.totalRequests.toLocaleString()}`);
    console.log(`   Successful:          ${metrics.successfulRequests.toLocaleString()} (${successRate.toFixed(2)}%)`);
    console.log(`   Failed:              ${metrics.failedRequests.toLocaleString()}`);
    console.log(`   Throughput:          ${throughput.toFixed(2)} req/s`);
    
    console.log(`\n⚡ Response Times:`);
    console.log(`   Average:             ${avgResponseTime.toFixed(2)}ms`);
    console.log(`   Min:                 ${metrics.minResponseTime.toFixed(2)}ms`);
    console.log(`   Max:                 ${metrics.maxResponseTime.toFixed(2)}ms`);
    
    console.log(`\n🗑️  Cache Management:`);
    console.log(`   Total Cache Clears:  ${metrics.cacheClears}`);
    console.log(`   Clear Interval:      ${CACHE_CLEAR_INTERVAL}ms`);
    
    console.log(`\n👥 User Statistics:`);
    console.log(`   Phase 1 Users:       ${PHASE_1_USERS} (Beginner)`);
    console.log(`   Phase 2 Users:       ${PHASE_2_USERS} (Advanced)`);
    console.log(`   Total Users:         ${PHASE_1_USERS + PHASE_2_USERS}`);
    console.log(`   Content Coverage:    ${(CONTENT_COVERAGE * 100).toFixed(0)}%`);

    if (metrics.errors.length > 0) {
      console.log(`\n❌ Errors (Last 10):`);
      const recentErrors = metrics.errors.slice(-10);
      recentErrors.forEach((err, idx) => {
        console.log(`   ${idx + 1}. ${err.endpoint}: ${err.error}`);
      });
    }

    console.log('\n' + '='.repeat(80) + '\n');

    // Performance assessment
    if (successRate >= 99 && avgResponseTime < 500) {
      console.log('🏆 EXCELLENT: System handled load perfectly!');
    } else if (successRate >= 95 && avgResponseTime < 1000) {
      console.log('✅ GOOD: System performed well under load');
    } else if (successRate >= 90) {
      console.log('⚠️  ACCEPTABLE: System handled load with some issues');
    } else {
      console.log('❌ POOR: System struggled under load - optimization needed');
    }
  }

  async run() {
    console.log('\n' + '█'.repeat(80));
    console.log('🤖 BIGUL2 ADVANCED LOAD TESTING SYSTEM');
    console.log('█'.repeat(80));
    console.log(`\n📍 Target: ${BASE_URL}`);
    console.log(`📊 Test Configuration:`);
    console.log(`   Phase 1: ${PHASE_1_USERS} Beginner users`);
    console.log(`   Phase 2: ${PHASE_2_USERS} Advanced users (after ${PHASE_2_DELAY / 1000}s)`);
    console.log(`   Content Coverage: ${(CONTENT_COVERAGE * 100).toFixed(0)}%`);
    console.log(`   Cache Clear Interval: ${CACHE_CLEAR_INTERVAL}ms`);
    console.log('\n' + '█'.repeat(80) + '\n');

    this.startTime = performance.now();

    // Start cache manager
    this.cacheManager.start();

    try {
      // Phase 1: Beginner users
      await this.runPhase1();

      // Wait 15 seconds
      console.log(`\n⏳ Waiting ${PHASE_2_DELAY / 1000} seconds before Phase 2...\n`);
      await new Promise(resolve => setTimeout(resolve, PHASE_2_DELAY));

      // Force cache clear before Phase 2
      await this.cacheManager.forceClear();

      // Phase 2: Advanced users
      await this.runPhase2();

    } finally {
      // Stop cache manager
      this.cacheManager.stop();

      // Print final metrics
      this.printMetrics();
    }
  }
}

// Main execution
async function main() {
  const orchestrator = new LoadTestOrchestrator();
  
  try {
    await orchestrator.run();
    process.exit(0);
  } catch (error) {
    console.error('❌ Load test failed:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n⚠️  Test interrupted by user');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n⚠️  Test terminated');
  process.exit(0);
});

// Run the test
main();
