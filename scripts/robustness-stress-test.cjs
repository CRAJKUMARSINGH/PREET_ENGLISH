#!/usr/bin/env node
/**
 * COMPREHENSIVE ROBUSTNESS STRESS TEST
 * 
 * Simulates 1500 virtual users:
 * - 500 Beginner users
 * - 500 Intermediate users
 * - 500 Advanced users
 * 
 * Each user:
 * - Randomly visits 90% of lessons
 * - Tests all routes and API endpoints
 * - Simulates realistic user behavior
 * - Generates comprehensive performance metrics
 */

const http = require('http');
const https = require('https');
const { performance } = require('perf_hooks');
const path = require('path');

// Configuration
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:5000';
const CONFIG = {
  users: {
    beginner: 500,
    intermediate: 500,
    advanced: 500
  },
  lessonCoverage: 0.90, // 90% of lessons per user
  concurrency: 50, // Concurrent users
  requestTimeout: 30000,
  retryAttempts: 3,
  delayBetweenActions: 100, // ms
  delayBetweenUsers: 50 // ms
};

// Test results
const results = {
  startTime: null,
  endTime: null,
  totalUsers: 0,
  successfulUsers: 0,
  failedUsers: 0,
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  errorTypes: {},
  performance: {
    avgResponseTime: 0,
    minResponseTime: Infinity,
    maxResponseTime: 0,
    p50: 0,
    p95: 0,
    p99: 0
  },
  endpoints: {},
  routes: {},
  lessons: {},
  bottlenecks: [],
  warnings: [],
  userJourneys: []
};

// Color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(80));
  log(title, 'bright');
  console.log('='.repeat(80) + '\n');
}

// HTTP request helper with timing
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const startTime = performance.now();
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;
    
    const req = client.request(url, {
      timeout: CONFIG.requestTimeout,
      ...options
    }, (res) => {
      const duration = performance.now() - startTime;
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = res.headers['content-type']?.includes('application/json') 
            ? JSON.parse(data) 
            : data;
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: json,
            text: data,
            duration: duration
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: data,
            text: data,
            duration: duration
          });
        }
      });
    });

    req.on('error', (error) => {
      const duration = performance.now() - startTime;
      reject({ error, duration });
    });

    req.on('timeout', () => {
      const duration = performance.now() - startTime;
      req.destroy();
      reject({ error: new Error('Request timeout'), duration });
    });

    if (options.body) {
      if (typeof options.body === 'object') {
        req.write(JSON.stringify(options.body));
        req.setHeader('Content-Type', 'application/json');
      } else {
        req.write(options.body);
      }
    }

    req.end();
  });
}

// Retry wrapper
async function retry(fn, attempts = CONFIG.retryAttempts) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === attempts - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

// Track request
function trackRequest(endpoint, duration, success, statusCode = null, error = null) {
  results.totalRequests++;
  
  if (success) {
    results.successfulRequests++;
  } else {
    results.failedRequests++;
    const errorKey = error?.message || `Status ${statusCode}` || 'Unknown';
    results.errorTypes[errorKey] = (results.errorTypes[errorKey] || 0) + 1;
  }

  // Track endpoint performance
  if (!results.endpoints[endpoint]) {
    results.endpoints[endpoint] = {
      count: 0,
      success: 0,
      fail: 0,
      durations: []
    };
  }
  results.endpoints[endpoint].count++;
  if (success) {
    results.endpoints[endpoint].success++;
  } else {
    results.endpoints[endpoint].fail++;
  }
  results.endpoints[endpoint].durations.push(duration);

  // Update performance metrics
  if (duration < results.performance.minResponseTime) {
    results.performance.minResponseTime = duration;
  }
  if (duration > results.performance.maxResponseTime) {
    results.performance.maxResponseTime = duration;
  }
}

// Virtual User Class
class VirtualUser {
  constructor(userId, skillLevel) {
    this.userId = userId;
    this.skillLevel = skillLevel;
    this.sessionId = `user-${userId}-${Date.now()}`;
    this.visitedLessons = new Set();
    this.visitedRoutes = new Set();
    this.testEndpoints = new Set();
    this.errors = [];
    this.success = true;
    this.startTime = performance.now();
    this.actions = [];
  }

  async execute() {
    try {
      // Step 1: Visit landing page
      await this.visitRoute('/', 'Landing Page');

      // Step 2: Visit auth page (don't actually login, just check it works)
      await this.visitRoute('/auth', 'Auth Page');

      // Step 3: Get all lessons
      const lessons = await this.getLessons();
      if (!lessons || lessons.length === 0) {
        throw new Error('No lessons available');
      }

      // Step 4: Visit random 90% of lessons
      const lessonsToVisit = Math.ceil(lessons.length * CONFIG.lessonCoverage);
      const shuffledLessons = this.shuffleArray([...lessons]);
      const selectedLessons = shuffledLessons.slice(0, lessonsToVisit);

      log(`  User ${this.userId} (${this.skillLevel}): Visiting ${selectedLessons.length}/${lessons.length} lessons`, 'cyan');

      for (const lesson of selectedLessons) {
        await this.visitLesson(lesson);
        await this.delay(CONFIG.delayBetweenActions);
      }

      // Step 5: Visit other routes
      await this.visitOtherRoutes();

      // Step 6: Test API endpoints
      await this.testEndpoints(lessons);

      this.success = true;
    } catch (error) {
      this.success = false;
      this.errors.push({
        action: this.actions[this.actions.length - 1] || 'Unknown',
        error: error.message,
        stack: error.stack
      });
      throw error;
    } finally {
      this.endTime = performance.now();
      this.duration = this.endTime - this.startTime;
    }
  }

  async visitRoute(path, name) {
    try {
      const url = `${BASE_URL}${path}`;
      const response = await retry(() => makeRequest(url));
      
      trackRequest(path, response.duration, response.status < 400, response.status);
      this.visitedRoutes.add(path);
      this.actions.push({ type: 'route', path, name, success: response.status < 400 });

      if (response.status >= 400 && response.status !== 404) {
        throw new Error(`Route ${path} returned ${response.status}`);
      }
    } catch (error) {
      trackRequest(path, error.duration || 0, false, null, error.error || error);
      this.actions.push({ type: 'route', path, name, success: false, error: error.message });
      throw error;
    }
  }

  async getLessons() {
    try {
      const url = `${BASE_URL}/api/lessons`;
      const response = await retry(() => makeRequest(url));
      
      trackRequest('/api/lessons', response.duration, response.status === 200, response.status);
      this.testEndpoints.add('/api/lessons');
      this.actions.push({ type: 'api', endpoint: '/api/lessons', success: response.status === 200 });

      if (response.status === 200 && Array.isArray(response.body)) {
        return response.body;
      }
      throw new Error(`Failed to get lessons: ${response.status}`);
    } catch (error) {
      trackRequest('/api/lessons', error.duration || 0, false, null, error.error || error);
      throw error;
    }
  }

  async visitLesson(lesson) {
    try {
      // Visit lesson detail
      const lessonUrl = `/api/lessons/${lesson.id}`;
      const response = await retry(() => makeRequest(`${BASE_URL}${lessonUrl}`));
      
      trackRequest(lessonUrl, response.duration, response.status === 200, response.status);
      this.testEndpoints.add(lessonUrl);
      this.visitedLessons.add(lesson.id);

      if (response.status === 200) {
        // Track lesson metrics
        if (!results.lessons[lesson.id]) {
          results.lessons[lesson.id] = {
            id: lesson.id,
            title: lesson.title,
            visits: 0,
            success: 0,
            fail: 0,
            avgResponseTime: 0,
            durations: []
          };
        }
        results.lessons[lesson.id].visits++;
        results.lessons[lesson.id].success++;
        results.lessons[lesson.id].durations.push(response.duration);

        // Visit lesson vocabulary
        await this.visitVocabulary(lesson.id);

        // Visit lesson quiz if available
        await this.visitQuiz(lesson.id);
      } else {
        results.lessons[lesson.id] = results.lessons[lesson.id] || {
          id: lesson.id,
          title: lesson.title,
          visits: 0,
          success: 0,
          fail: 0
        };
        results.lessons[lesson.id].visits++;
        results.lessons[lesson.id].fail++;
        throw new Error(`Lesson ${lesson.id} returned ${response.status}`);
      }
    } catch (error) {
      trackRequest(`/api/lessons/${lesson.id}`, error.duration || 0, false, null, error.error || error);
      if (results.lessons[lesson.id]) {
        results.lessons[lesson.id].fail++;
      }
    }
  }

  async visitVocabulary(lessonId) {
    try {
      const url = `${BASE_URL}/api/lessons/${lessonId}/vocabulary`;
      const response = await retry(() => makeRequest(url));
      
      trackRequest(url, response.duration, response.status === 200, response.status);
      this.testEndpoints.add(url);
    } catch (error) {
      trackRequest(url, error.duration || 0, false, null, error.error || error);
      // Non-critical, continue
    }
  }

  async visitQuiz(lessonId) {
    try {
      const url = `${BASE_URL}/api/lessons/${lessonId}/quiz`;
      const response = await retry(() => makeRequest(url));
      
      trackRequest(url, response.duration, response.status < 500, response.status);
      this.testEndpoints.add(url);
    } catch (error) {
      trackRequest(url, error.duration || 0, false, null, error.error || error);
      // Non-critical (quiz might not exist), continue
    }
  }

  async visitOtherRoutes() {
    const routes = [
      { path: '/dashboard', name: 'Dashboard' },
      { path: '/lessons', name: 'All Lessons' },
      { path: '/vocabulary', name: 'Vocabulary' },
      { path: '/speaking', name: 'Speaking' },
      { path: '/listening', name: 'Listening' },
      { path: '/stories', name: 'Stories' },
      { path: '/chat', name: 'Chat' },
      { path: '/progress', name: 'Progress' }
    ];

    for (const route of routes) {
      try {
        await this.visitRoute(route.path, route.name);
        await this.delay(CONFIG.delayBetweenActions);
      } catch (error) {
        // Continue with other routes
      }
    }
  }

  async testEndpoints(lessons) {
    const endpoints = [
      { method: 'GET', path: '/api/stories' },
      { method: 'GET', path: '/api/listenings' },
      { method: 'GET', path: '/api/speaking-topics' },
      { method: 'GET', path: '/api/quizzes' },
      { method: 'GET', path: '/api/scenarios' },
      { method: 'GET', path: '/api/achievements' },
      { method: 'GET', path: '/api/leaderboard' },
      { method: 'GET', path: '/api/search?q=hello' }
    ];

    for (const endpoint of endpoints) {
      try {
        const url = `${BASE_URL}${endpoint.path}`;
        const response = await retry(() => makeRequest(url, { method: endpoint.method }));
        
        trackRequest(endpoint.path, response.duration, response.status < 500, response.status);
        this.testEndpoints.add(endpoint.path);
      } catch (error) {
        trackRequest(endpoint.path, error.duration || 0, false, null, error.error || error);
        // Continue testing other endpoints
      }
      await this.delay(CONFIG.delayBetweenActions);
    }

    // Test a few lesson endpoints
    if (lessons.length > 0) {
      const sampleLessons = this.shuffleArray([...lessons]).slice(0, Math.min(5, lessons.length));
      for (const lesson of sampleLessons) {
        await this.visitVocabulary(lesson.id);
        await this.visitQuiz(lesson.id);
        await this.delay(CONFIG.delayBetweenActions);
      }
    }
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getSummary() {
    return {
      userId: this.userId,
      skillLevel: this.skillLevel,
      success: this.success,
      duration: this.duration,
      visitedLessons: this.visitedLessons.size,
      visitedRoutes: this.visitedRoutes.size,
      testEndpoints: this.testEndpoints.size,
      errors: this.errors.length,
      errorDetails: this.errors
    };
  }
}

// Run test for user pool
async function runUserPool(skillLevel, count) {
  logSection(`Testing ${count} ${skillLevel} Users`);
  
  const users = [];
  const results_pool = {
    total: count,
    successful: 0,
    failed: 0,
    avgDuration: 0,
    totalLessons: 0,
    totalRoutes: 0,
    totalEndpoints: 0
  };

  // Process users in batches for concurrency control
  const batchSize = CONFIG.concurrency;
  
  for (let batch = 0; batch < Math.ceil(count / batchSize); batch++) {
    const batchStart = batch * batchSize;
    const batchEnd = Math.min(batchStart + batchSize, count);
    const batchUsers = [];

    // Create users for this batch
    for (let i = batchStart; i < batchEnd; i++) {
      const userId = `${skillLevel}-${i + 1}`;
      const user = new VirtualUser(userId, skillLevel);
      batchUsers.push(user);
      users.push(user);
    }

    // Execute batch concurrently
    const batchPromises = batchUsers.map(user => 
      user.execute().catch(error => {
        log(`  ❌ User ${user.userId} failed: ${error.message}`, 'red');
        return user;
      })
    );

    await Promise.all(batchPromises);

    // Progress update
    const progress = ((batchEnd / count) * 100).toFixed(1);
    log(`  Progress: ${batchEnd}/${count} users (${progress}%)`, 'blue');

    // Small delay between batches to avoid overwhelming server
    if (batch < Math.ceil(count / batchSize) - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Collect results
  for (const user of users) {
    const summary = user.getSummary();
    results.userJourneys.push(summary);
    
    if (summary.success) {
      results_pool.successful++;
      results.successfulUsers++;
    } else {
      results_pool.failed++;
      results.failedUsers++;
    }
    
    results_pool.totalLessons += summary.visitedLessons;
    results_pool.totalRoutes += summary.visitedRoutes;
    results_pool.totalEndpoints += summary.testEndpoints;
    results_pool.avgDuration += summary.duration;
  }

  results_pool.avgDuration = results_pool.avgDuration / users.length;

  log(`\n  ✅ Completed: ${results_pool.successful}/${results_pool.total} successful`, 'green');
  log(`  ❌ Failed: ${results_pool.failed}/${results_pool.total}`, results_pool.failed > 0 ? 'red' : 'green');
  log(`  📊 Avg Duration: ${(results_pool.avgDuration / 1000).toFixed(2)}s`, 'blue');
  log(`  📚 Total Lessons Visited: ${results_pool.totalLessons}`, 'blue');
  log(`  🛣️  Total Routes Tested: ${results_pool.totalRoutes}`, 'blue');
  log(`  🔌 Total Endpoints Tested: ${results_pool.totalEndpoints}`, 'blue');

  return results_pool;
}

// Calculate performance percentiles
function calculatePercentiles() {
  const allDurations = [];
  
  // Collect all response durations
  Object.values(results.endpoints).forEach(endpoint => {
    allDurations.push(...endpoint.durations);
  });

  if (allDurations.length === 0) return;

  allDurations.sort((a, b) => a - b);

  results.performance.p50 = allDurations[Math.floor(allDurations.length * 0.50)];
  results.performance.p95 = allDurations[Math.floor(allDurations.length * 0.95)];
  results.performance.p99 = allDurations[Math.floor(allDurations.length * 0.99)];
  
  const sum = allDurations.reduce((a, b) => a + b, 0);
  results.performance.avgResponseTime = sum / allDurations.length;
}

// Detect bottlenecks
function detectBottlenecks() {
  // Check slow endpoints (p95 > 2000ms)
  Object.entries(results.endpoints).forEach(([endpoint, data]) => {
    if (data.durations.length > 0) {
      const sorted = [...data.durations].sort((a, b) => a - b);
      const p95 = sorted[Math.floor(sorted.length * 0.95)];
      
      if (p95 > 2000) {
        results.bottlenecks.push({
          type: 'slow_endpoint',
          endpoint,
          p95: p95,
          avg: data.durations.reduce((a, b) => a + b, 0) / data.durations.length,
          requests: data.count,
          severity: p95 > 5000 ? 'critical' : 'warning'
        });
      }
    }

    // Check high error rate (>5%)
    const errorRate = data.fail / data.count;
    if (errorRate > 0.05 && data.count > 10) {
      results.bottlenecks.push({
        type: 'high_error_rate',
        endpoint,
        errorRate: (errorRate * 100).toFixed(2) + '%',
        errors: data.fail,
        total: data.count,
        severity: errorRate > 0.10 ? 'critical' : 'warning'
      });
    }
  });

  // Check lessons with issues
  Object.entries(results.lessons).forEach(([lessonId, data]) => {
    const failRate = data.fail / data.visits;
    if (failRate > 0.05 && data.visits > 10) {
      results.bottlenecks.push({
        type: 'lesson_issues',
        lessonId,
        title: data.title,
        failRate: (failRate * 100).toFixed(2) + '%',
        errors: data.fail,
        visits: data.visits,
        severity: failRate > 0.10 ? 'critical' : 'warning'
      });
    }
  });
}

// Generate comprehensive report
async function generateReport() {
  logSection('COMPREHENSIVE ROBUSTNESS TEST REPORT');

  // Overall summary
  const duration = (results.endTime - results.startTime) / 1000;
  results.totalUsers = CONFIG.users.beginner + CONFIG.users.intermediate + CONFIG.users.advanced;

  log(`\n📊 TEST SUMMARY`, 'bright');
  log(`Total Users Simulated: ${results.totalUsers}`, 'blue');
  log(`  - Beginner: ${CONFIG.users.beginner}`, 'blue');
  log(`  - Intermediate: ${CONFIG.users.intermediate}`, 'blue');
  log(`  - Advanced: ${CONFIG.users.advanced}`, 'blue');
  log(`\nSuccess Rate: ${((results.successfulUsers / results.totalUsers) * 100).toFixed(2)}%`, 
      results.successfulUsers / results.totalUsers >= 0.95 ? 'green' : 'yellow');
  log(`Successful Users: ${results.successfulUsers}`, 'green');
  log(`Failed Users: ${results.failedUsers}`, results.failedUsers > 0 ? 'red' : 'green');
  log(`\nTotal Test Duration: ${(duration / 60).toFixed(2)} minutes (${duration.toFixed(0)}s)`, 'blue');

  // Request statistics
  log(`\n📡 REQUEST STATISTICS`, 'bright');
  log(`Total Requests: ${results.totalRequests}`, 'blue');
  log(`Successful: ${results.successfulRequests} (${((results.successfulRequests / results.totalRequests) * 100).toFixed(2)}%)`, 'green');
  log(`Failed: ${results.failedRequests} (${((results.failedRequests / results.totalRequests) * 100).toFixed(2)}%)`, 
      results.failedRequests / results.totalRequests > 0.05 ? 'red' : 'green');

  // Performance metrics
  calculatePercentiles();
  log(`\n⚡ PERFORMANCE METRICS`, 'bright');
  log(`Average Response Time: ${results.performance.avgResponseTime.toFixed(2)}ms`, 'blue');
  log(`Min Response Time: ${results.performance.minResponseTime.toFixed(2)}ms`, 'blue');
  log(`Max Response Time: ${results.performance.maxResponseTime.toFixed(2)}ms`, 'blue');
  log(`P50 (Median): ${results.performance.p50.toFixed(2)}ms`, 'blue');
  log(`P95: ${results.performance.p95.toFixed(2)}ms`, 'blue');
  log(`P99: ${results.performance.p99.toFixed(2)}ms`, 'blue');

  // Error analysis
  if (Object.keys(results.errorTypes).length > 0) {
    log(`\n❌ ERROR ANALYSIS`, 'bright');
    const sortedErrors = Object.entries(results.errorTypes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    sortedErrors.forEach(([error, count]) => {
      log(`  ${error}: ${count} occurrences`, 'red');
    });
  }

  // Bottlenecks
  detectBottlenecks();
  if (results.bottlenecks.length > 0) {
    log(`\n⚠️  BOTTLENECKS DETECTED (${results.bottlenecks.length})`, 'bright');
    const critical = results.bottlenecks.filter(b => b.severity === 'critical');
    const warnings = results.bottlenecks.filter(b => b.severity === 'warning');
    
    if (critical.length > 0) {
      log(`\n  🔴 CRITICAL ISSUES (${critical.length}):`, 'red');
      critical.forEach(bottleneck => {
        if (bottleneck.type === 'slow_endpoint') {
          log(`    Slow Endpoint: ${bottleneck.endpoint}`, 'red');
          log(`      P95: ${bottleneck.p95.toFixed(2)}ms, Avg: ${bottleneck.avg.toFixed(2)}ms`, 'red');
        } else if (bottleneck.type === 'high_error_rate') {
          log(`    High Error Rate: ${bottleneck.endpoint}`, 'red');
          log(`      Error Rate: ${bottleneck.errorRate}, Errors: ${bottleneck.errors}/${bottleneck.total}`, 'red');
        } else if (bottleneck.type === 'lesson_issues') {
          log(`    Lesson Issues: ${bottleneck.title} (ID: ${bottleneck.lessonId})`, 'red');
          log(`      Fail Rate: ${bottleneck.failRate}, Errors: ${bottleneck.errors}/${bottleneck.visits}`, 'red');
        }
      });
    }

    if (warnings.length > 0) {
      log(`\n  🟡 WARNINGS (${warnings.length}):`, 'yellow');
      warnings.slice(0, 10).forEach(bottleneck => {
        if (bottleneck.type === 'slow_endpoint') {
          log(`    Slow Endpoint: ${bottleneck.endpoint} (P95: ${bottleneck.p95.toFixed(2)}ms)`, 'yellow');
        } else if (bottleneck.type === 'high_error_rate') {
          log(`    High Error Rate: ${bottleneck.endpoint} (${bottleneck.errorRate})`, 'yellow');
        }
      });
    }
  } else {
    log(`\n✅ No bottlenecks detected!`, 'green');
  }

  // Lesson coverage
  const totalLessons = Object.keys(results.lessons).length;
  if (totalLessons > 0) {
    log(`\n📚 LESSON COVERAGE`, 'bright');
    log(`Total Lessons Tested: ${totalLessons}`, 'blue');
    const totalVisits = Object.values(results.lessons).reduce((sum, l) => sum + l.visits, 0);
    log(`Total Lesson Visits: ${totalVisits}`, 'blue');
    log(`Average Visits per Lesson: ${(totalVisits / totalLessons).toFixed(1)}`, 'blue');
    
    // Top visited lessons
    const topLessons = Object.values(results.lessons)
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 5);
    log(`\n  Top 5 Most Visited Lessons:`, 'blue');
    topLessons.forEach((lesson, idx) => {
      const successRate = ((lesson.success / lesson.visits) * 100).toFixed(1);
      log(`    ${idx + 1}. ${lesson.title} (ID: ${lesson.id})`, 'blue');
      log(`       Visits: ${lesson.visits}, Success Rate: ${successRate}%`, 'blue');
    });
  }

  // Endpoint statistics
  const totalEndpoints = Object.keys(results.endpoints).length;
  if (totalEndpoints > 0) {
    log(`\n🔌 ENDPOINT STATISTICS`, 'bright');
    log(`Total Endpoints Tested: ${totalEndpoints}`, 'blue');
    
    // Slowest endpoints
    const slowest = Object.entries(results.endpoints)
      .map(([path, data]) => ({
        path,
        avgDuration: data.durations.reduce((a, b) => a + b, 0) / data.durations.length,
        count: data.count
      }))
      .sort((a, b) => b.avgDuration - a.avgDuration)
      .slice(0, 5);
    
    log(`\n  Slowest Endpoints:`, 'yellow');
    slowest.forEach((endpoint, idx) => {
      log(`    ${idx + 1}. ${endpoint.path}`, 'yellow');
      log(`       Avg: ${endpoint.avgDuration.toFixed(2)}ms, Requests: ${endpoint.count}`, 'yellow');
    });
  }

  // Launch readiness assessment
  log(`\n🚀 LAUNCH READINESS ASSESSMENT`, 'bright');
  const successRate = results.successfulUsers / results.totalUsers;
  const requestSuccessRate = results.successfulRequests / results.totalRequests;
  const hasCriticalBottlenecks = results.bottlenecks.filter(b => b.severity === 'critical').length > 0;
  const p95Acceptable = results.performance.p95 < 3000;

  const criteria = [
    { name: 'User Success Rate ≥95%', passed: successRate >= 0.95, value: `${(successRate * 100).toFixed(2)}%` },
    { name: 'Request Success Rate ≥95%', passed: requestSuccessRate >= 0.95, value: `${(requestSuccessRate * 100).toFixed(2)}%` },
    { name: 'No Critical Bottlenecks', passed: !hasCriticalBottlenecks, value: hasCriticalBottlenecks ? `${results.bottlenecks.filter(b => b.severity === 'critical').length} critical issues` : 'None' },
    { name: 'P95 Response Time <3s', passed: p95Acceptable, value: `${(results.performance.p95 / 1000).toFixed(2)}s` }
  ];

  const allPassed = criteria.every(c => c.passed);
  
  criteria.forEach(criterion => {
    const status = criterion.passed ? '✅' : '❌';
    const color = criterion.passed ? 'green' : 'red';
    log(`  ${status} ${criterion.name}: ${criterion.value}`, color);
  });

  log(`\n${allPassed ? '✅ LAUNCH READY!' : '❌ NOT READY - Issues need to be fixed'}`, 
      allPassed ? 'green' : 'red');

  // Save detailed report
  const fs = require('fs').promises;
  
  // Calculate lesson coverage statistics
  const lessonStats = {};
  Object.entries(results.lessons).forEach(([id, data]) => {
    lessonStats[id] = {
      ...data,
      successRate: ((data.success / data.visits) * 100).toFixed(2) + '%',
      avgResponseTime: data.durations.length > 0 
        ? (data.durations.reduce((a, b) => a + b, 0) / data.durations.length).toFixed(2)
        : 0
    };
  });

  // Calculate endpoint statistics with percentiles
  const endpointStats = {};
  Object.entries(results.endpoints).forEach(([path, data]) => {
    const sorted = [...data.durations].sort((a, b) => a - b);
    endpointStats[path] = {
      ...data,
      successRate: ((data.success / data.count) * 100).toFixed(2) + '%',
      avgDuration: data.durations.length > 0
        ? (data.durations.reduce((a, b) => a + b, 0) / data.durations.length).toFixed(2)
        : 0,
      p50: sorted[Math.floor(sorted.length * 0.50)].toFixed(2),
      p95: sorted[Math.floor(sorted.length * 0.95)].toFixed(2),
      p99: sorted[Math.floor(sorted.length * 0.99)].toFixed(2)
    };
  });

  const reportData = {
    timestamp: new Date().toISOString(),
    config: CONFIG,
    summary: {
      totalUsers: results.totalUsers,
      successfulUsers: results.successfulUsers,
      failedUsers: results.failedUsers,
      successRate: (successRate * 100).toFixed(2) + '%',
      totalRequests: results.totalRequests,
      successfulRequests: results.successfulRequests,
      failedRequests: results.failedRequests,
      requestSuccessRate: (requestSuccessRate * 100).toFixed(2) + '%',
      duration: duration,
      durationMinutes: (duration / 60).toFixed(2)
    },
    performance: {
      ...results.performance,
      avgResponseTime: results.performance.avgResponseTime.toFixed(2),
      minResponseTime: results.performance.minResponseTime.toFixed(2),
      maxResponseTime: results.performance.maxResponseTime.toFixed(2),
      p50: results.performance.p50.toFixed(2),
      p95: results.performance.p95.toFixed(2),
      p99: results.performance.p99.toFixed(2)
    },
    endpoints: endpointStats,
    lessons: lessonStats,
    bottlenecks: results.bottlenecks,
    errorTypes: results.errorTypes,
    launchReadiness: {
      allCriteriaPassed: allPassed,
      criteria: criteria,
      recommendation: allPassed 
        ? 'SYSTEM IS READY FOR LAUNCH' 
        : 'FIX CRITICAL ISSUES BEFORE LAUNCH'
    },
    userJourneys: results.userJourneys.slice(0, 100) // Sample of user journeys
  };

  const reportPath = path.join(process.cwd(), 'ROBUSTNESS_TEST_REPORT.json');
  await fs.writeFile(reportPath, JSON.stringify(reportData, null, 2));
  log(`\n✅ Detailed report saved to: ${reportPath}`, 'green');
}

// Main test execution
async function runRobustnessTest() {
  results.startTime = performance.now();
  
  logSection('🚀 COMPREHENSIVE ROBUSTNESS STRESS TEST');
  log(`Testing ${CONFIG.users.beginner + CONFIG.users.intermediate + CONFIG.users.advanced} virtual users`, 'bright');
  log(`Target: ${BASE_URL}`, 'blue');
  log(`Start Time: ${new Date().toISOString()}`, 'blue');
  log(`Concurrency: ${CONFIG.concurrency} users`, 'blue');

  try {
    // Test each user pool
    await runUserPool('Beginner', CONFIG.users.beginner);
    await runUserPool('Intermediate', CONFIG.users.intermediate);
    await runUserPool('Advanced', CONFIG.users.advanced);

    results.endTime = performance.now();
    
    // Generate report
    await generateReport();

    log(`\n✅ Robustness test complete!`, 'green');
    process.exit(0);
  } catch (error) {
    results.endTime = performance.now();
    log(`\n❌ Test failed: ${error.message}`, 'red');
    console.error(error.stack);
    await generateReport();
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  runRobustnessTest();
}

module.exports = { runRobustnessTest, VirtualUser, CONFIG };
