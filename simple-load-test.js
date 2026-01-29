// Simple Load Test - Simulates K6 behavior for RAJKUMAR.MD compliance
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000';
const CONCURRENT_USERS = 100;
const TEST_DURATION_MS = 180000; // 3 minutes
const RAMP_UP_TIME_MS = 120000; // 2 minutes

class LoadTestRunner {
  constructor() {
    this.results = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      responseTimes: [],
      errors: [],
      startTime: Date.now()
    };
    this.activeUsers = 0;
    this.testUsers = [];
    
    // Generate test user credentials
    for (let i = 0; i < 500; i++) {
      this.testUsers.push({
        username: `k6_user_${i}`,
        password: 'TestPass123!'
      });
    }
  }

  async makeRequest(endpoint, options = {}) {
    const startTime = Date.now();
    this.results.totalRequests++;
    
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        timeout: 10000,
        ...options
      });
      
      const responseTime = Date.now() - startTime;
      this.results.responseTimes.push(responseTime);
      
      if (response.ok) {
        this.results.successfulRequests++;
        return { success: true, response, responseTime };
      } else {
        this.results.failedRequests++;
        this.results.errors.push(`HTTP ${response.status}: ${endpoint}`);
        return { success: false, response, responseTime };
      }
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.results.responseTimes.push(responseTime);
      this.results.failedRequests++;
      this.results.errors.push(`${error.message}: ${endpoint}`);
      return { success: false, error, responseTime };
    }
  }

  async authenticateUser(userIndex) {
    const user = this.testUsers[userIndex % this.testUsers.length];
    
    const loginResult = await this.makeRequest('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });

    if (loginResult.success) {
      // Extract session cookie
      const cookies = loginResult.response.headers.get('set-cookie');
      return cookies;
    }
    
    return null;
  }

  async simulateUserSession(userIndex) {
    const sessionCookie = await this.authenticateUser(userIndex);
    
    if (!sessionCookie) {
      console.log(`❌ User ${userIndex} failed to authenticate`);
      return;
    }

    const headers = {
      'Cookie': sessionCookie,
      'Content-Type': 'application/json'
    };

    // Simulate user actions
    const endpoints = [
      '/api/user',
      '/api/lessons',
      '/api/user-stats',
      '/api/progress',
      '/api/vocabulary',
      '/api/daily-goals'
    ];

    for (const endpoint of endpoints) {
      await this.makeRequest(endpoint, { headers });
      
      // Think time between requests
      await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));
    }
  }

  async rampUpUsers() {
    const rampUpInterval = RAMP_UP_TIME_MS / CONCURRENT_USERS;
    
    console.log(`🚀 Starting ramp-up: ${CONCURRENT_USERS} users over ${RAMP_UP_TIME_MS/1000}s`);
    
    for (let i = 0; i < CONCURRENT_USERS; i++) {
      setTimeout(() => {
        this.activeUsers++;
        this.simulateUserSession(i);
        console.log(`👤 User ${i + 1}/${CONCURRENT_USERS} started (Active: ${this.activeUsers})`);
      }, i * rampUpInterval);
    }
  }

  calculateMetrics() {
    const duration = (Date.now() - this.results.startTime) / 1000;
    const responseTimes = this.results.responseTimes.sort((a, b) => a - b);
    
    const metrics = {
      duration: duration,
      totalRequests: this.results.totalRequests,
      successfulRequests: this.results.successfulRequests,
      failedRequests: this.results.failedRequests,
      successRate: ((this.results.successfulRequests / this.results.totalRequests) * 100).toFixed(2),
      requestsPerSecond: (this.results.totalRequests / duration).toFixed(2),
      avgResponseTime: (responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length).toFixed(2),
      minResponseTime: responseTimes[0] || 0,
      maxResponseTime: responseTimes[responseTimes.length - 1] || 0,
      p95ResponseTime: responseTimes[Math.floor(responseTimes.length * 0.95)] || 0,
      p99ResponseTime: responseTimes[Math.floor(responseTimes.length * 0.99)] || 0
    };

    return metrics;
  }

  printResults() {
    const metrics = this.calculateMetrics();
    
    console.log('\n🎯 K6-STYLE LOAD TEST RESULTS');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log(`📊 GLOBAL METRICS:`);
    console.log(`   Total Requests: ${metrics.totalRequests}`);
    console.log(`   Successful: ${metrics.successfulRequests}`);
    console.log(`   Failed: ${metrics.failedRequests}`);
    console.log(`   Success Rate: ${metrics.successRate}%`);
    console.log(`   Duration: ${metrics.duration.toFixed(2)}s`);
    console.log(`   Requests/sec: ${metrics.requestsPerSecond}`);
    
    console.log(`\n⏱️  RESPONSE TIME METRICS:`);
    console.log(`   Average: ${metrics.avgResponseTime}ms`);
    console.log(`   Min: ${metrics.minResponseTime}ms`);
    console.log(`   Max: ${metrics.maxResponseTime}ms`);
    console.log(`   P95: ${metrics.p95ResponseTime}ms`);
    console.log(`   P99: ${metrics.p99ResponseTime}ms`);

    console.log(`\n✅ THRESHOLD RESULTS:`);
    console.log(`   ${metrics.p95ResponseTime < 500 ? '✅ PASS' : '❌ FAIL'} - P95 Response Time < 500ms (${metrics.p95ResponseTime}ms)`);
    console.log(`   ${parseFloat(metrics.successRate) > 90 ? '✅ PASS' : '❌ FAIL'} - Success Rate > 90% (${metrics.successRate}%)`);
    
    if (this.results.errors.length > 0) {
      console.log(`\n❌ TOP ERRORS:`);
      const errorCounts = {};
      this.results.errors.forEach(error => {
        errorCounts[error] = (errorCounts[error] || 0) + 1;
      });
      
      Object.entries(errorCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .forEach(([error, count]) => {
          console.log(`   ${count}x ${error}`);
        });
    }
    
    console.log('════════════════════════════════════════════════════════════════════════════════');
    
    return metrics;
  }

  async runTest() {
    console.log('🎯 STARTING REAL-WORLD LOAD TEST');
    console.log(`📊 Configuration:`);
    console.log(`   • Concurrent Users: ${CONCURRENT_USERS}`);
    console.log(`   • Test Duration: ${TEST_DURATION_MS/1000}s`);
    console.log(`   • Ramp-up Time: ${RAMP_UP_TIME_MS/1000}s`);
    console.log(`   • Base URL: ${BASE_URL}`);
    console.log(`   • Test Users Available: ${this.testUsers.length}`);
    
    // Health check
    const healthCheck = await this.makeRequest('/api/health');
    if (!healthCheck.success) {
      console.error('❌ Health check failed - server not ready');
      return;
    }
    console.log('✅ Server health check passed');
    
    // Start ramp-up
    await this.rampUpUsers();
    
    // Wait for test completion
    await new Promise(resolve => setTimeout(resolve, TEST_DURATION_MS));
    
    // Print final results
    return this.printResults();
  }
}

// Run the test
const loadTest = new LoadTestRunner();
loadTest.runTest().catch(console.error);