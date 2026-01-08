#!/usr/bin/env node
/**
 * COMPREHENSIVE LESSON TEST SUITE
 * 
 * This script programmatically tests:
 * - Every lesson individually
 * - All API endpoints
 * - All routes and navigation
 * - Component integration
 * - Data integrity
 * - Link connectivity
 */

const http = require('http');
const https = require('https');
const { spawn } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:5000';
const TIMEOUT = 30000;
const RETRY_ATTEMPTS = 3;

// Test results tracking
const results = {
  total: 0,
  passed: 0,
  failed: 0,
  warnings: 0,
  errors: [],
  warnings_list: [],
  lessons_tested: [],
  endpoints_tested: [],
  routes_tested: [],
  components_verified: []
};

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(80));
  log(title, 'bright');
  console.log('='.repeat(80) + '\n');
}

// HTTP request helper
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;
    
    const req = client.request(url, {
      timeout: TIMEOUT,
      ...options
    }, (res) => {
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
            text: data
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: data,
            text: data
          });
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
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
async function retry(fn, attempts = RETRY_ATTEMPTS) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === attempts - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

// Test runner
async function test(name, testFn) {
  results.total++;
  try {
    log(`\n[TEST ${results.total}] ${name}`, 'cyan');
    await testFn();
    results.passed++;
    log(`✓ PASSED: ${name}`, 'green');
    return true;
  } catch (error) {
    results.failed++;
    results.errors.push({ test: name, error: error.message, stack: error.stack });
    log(`✗ FAILED: ${name}`, 'red');
    log(`  Error: ${error.message}`, 'red');
    return false;
  }
}

async function warn(message) {
  results.warnings++;
  results.warnings_list.push(message);
  log(`⚠ WARNING: ${message}`, 'yellow');
}

// ============================================================================
// LESSON TESTS
// ============================================================================

async function testAllLessons() {
  logSection('TESTING ALL LESSONS');

  // Fetch all lessons
  const lessonsResponse = await retry(() => makeRequest(`${BASE_URL}/api/lessons`));
  
  if (lessonsResponse.status !== 200) {
    throw new Error(`Failed to fetch lessons: ${lessonsResponse.status}`);
  }

  const lessons = lessonsResponse.body;
  if (!Array.isArray(lessons)) {
    throw new Error('Lessons endpoint did not return an array');
  }

  log(`Found ${lessons.length} lessons to test`, 'blue');

  // Test each lesson individually
  for (const lesson of lessons) {
    await test(`Lesson ${lesson.id}: ${lesson.title}`, async () => {
      // Test individual lesson fetch
      const lessonResponse = await retry(() => 
        makeRequest(`${BASE_URL}/api/lessons/${lesson.id}`)
      );

      if (lessonResponse.status !== 200) {
        throw new Error(`Failed to fetch lesson ${lesson.id}: ${lessonResponse.status}`);
      }

      const lessonData = lessonResponse.body;

      // Validate lesson structure
      if (!lessonData.id || lessonData.id !== lesson.id) {
        throw new Error(`Lesson ID mismatch: expected ${lesson.id}, got ${lessonData.id}`);
      }

      if (!lessonData.title || typeof lessonData.title !== 'string') {
        throw new Error(`Lesson ${lesson.id} has invalid title`);
      }

      if (!lessonData.content || typeof lessonData.content !== 'string') {
        throw new Error(`Lesson ${lesson.id} has invalid content`);
      }

      if (!lessonData.description || typeof lessonData.description !== 'string') {
        throw new Error(`Lesson ${lesson.id} has invalid description`);
      }

      if (!Array.isArray(lessonData.vocabulary)) {
        throw new Error(`Lesson ${lesson.id} vocabulary is not an array`);
      }

      if (!Array.isArray(lessonData.conversationLines)) {
        throw new Error(`Lesson ${lesson.id} conversationLines is not an array`);
      }

      // Test vocabulary endpoint
      const vocabResponse = await retry(() =>
        makeRequest(`${BASE_URL}/api/lessons/${lesson.id}/vocabulary`)
      );

      if (vocabResponse.status !== 200) {
        warn(`Failed to fetch vocabulary for lesson ${lesson.id}: ${vocabResponse.status}`);
      } else {
        const vocab = vocabResponse.body;
        if (!Array.isArray(vocab)) {
          warn(`Vocabulary for lesson ${lesson.id} is not an array`);
        }
      }

      // Test quiz endpoint (if available)
      const quizResponse = await retry(() =>
        makeRequest(`${BASE_URL}/api/lessons/${lesson.id}/quiz`)
      ).catch(() => null);

      if (quizResponse && quizResponse.status === 200) {
        log(`  ✓ Quiz available for lesson ${lesson.id}`, 'green');
      }

      results.lessons_tested.push({
        id: lesson.id,
        title: lesson.title,
        slug: lesson.slug,
        difficulty: lesson.difficulty,
        vocabulary_count: lessonData.vocabulary?.length || 0,
        conversation_lines: lessonData.conversationLines?.length || 0,
        has_quiz: quizResponse?.status === 200
      });

      results.endpoints_tested.push(`GET /api/lessons/${lesson.id}`);
      results.endpoints_tested.push(`GET /api/lessons/${lesson.id}/vocabulary`);
    });
  }

  // Test lesson ordering
  await test('Lesson ordering is consistent', async () => {
    const orders = lessons.map(l => l.order).sort((a, b) => a - b);
    const uniqueOrders = new Set(orders);
    
    if (uniqueOrders.size !== orders.length) {
      throw new Error('Duplicate lesson orders found');
    }

    for (let i = 0; i < orders.length - 1; i++) {
      if (orders[i] >= orders[i + 1]) {
        throw new Error(`Lesson order is not strictly increasing: ${orders[i]} >= ${orders[i + 1]}`);
      }
    }
  });
}

// ============================================================================
// API ENDPOINT TESTS
// ============================================================================

async function testAllEndpoints() {
  logSection('TESTING ALL API ENDPOINTS');

  const endpoints = [
    // Lessons
    { method: 'GET', path: '/api/lessons', requiresAuth: false },
    { method: 'GET', path: '/api/lessons/:id', requiresAuth: false, param: '1' },
    
    // Vocabulary
    { method: 'GET', path: '/api/vocabulary/due', requiresAuth: true },
    { method: 'GET', path: '/api/vocabulary/review', requiresAuth: true },
    { method: 'GET', path: '/api/vocabulary/category/:category', requiresAuth: false, param: 'daily' },
    
    // Stories
    { method: 'GET', path: '/api/stories', requiresAuth: false },
    { method: 'GET', path: '/api/stories/:id', requiresAuth: false, param: '1' },
    
    // Listenings
    { method: 'GET', path: '/api/listenings', requiresAuth: false },
    { method: 'GET', path: '/api/listenings/:id', requiresAuth: false, param: '1' },
    
    // Speaking Topics
    { method: 'GET', path: '/api/speaking-topics', requiresAuth: false },
    { method: 'GET', path: '/api/speaking-topics/:id', requiresAuth: false, param: '1' },
    
    // Scenarios
    { method: 'GET', path: '/api/scenarios', requiresAuth: false },
    { method: 'GET', path: '/api/scenarios/:id', requiresAuth: false, param: '1' },
    
    // Quizzes
    { method: 'GET', path: '/api/quizzes', requiresAuth: false },
    { method: 'GET', path: '/api/quizzes/:id', requiresAuth: false, param: '1' },
    
    // Progress
    { method: 'GET', path: '/api/progress', requiresAuth: true },
    
    // User Stats
    { method: 'GET', path: '/api/users/stats', requiresAuth: true },
    
    // Achievements
    { method: 'GET', path: '/api/achievements', requiresAuth: false },
    { method: 'GET', path: '/api/users/achievements', requiresAuth: true },
    
    // Leaderboard
    { method: 'GET', path: '/api/leaderboard', requiresAuth: false },
    
    // Activity Feed
    { method: 'GET', path: '/api/activity-feed', requiresAuth: false },
    
    // Search
    { method: 'GET', path: '/api/search?q=hello', requiresAuth: false },
    
    // Community
    { method: 'GET', path: '/api/community/buddies', requiresAuth: true },
  ];

  for (const endpoint of endpoints) {
    let path = endpoint.path;
    if (endpoint.param && path.includes(':id')) {
      path = path.replace(':id', endpoint.param);
    }
    if (endpoint.param && path.includes(':category')) {
      path = path.replace(':category', endpoint.param);
    }

    const testName = `${endpoint.method} ${path}`;
    
    await test(testName, async () => {
      const url = `${BASE_URL}${path}`;
      const response = await retry(() => 
        makeRequest(url, { method: endpoint.method })
      ).catch(error => {
        if (endpoint.requiresAuth && error.message.includes('401')) {
          // Expected for auth-required endpoints
          return { status: 401 };
        }
        throw error;
      });

      if (endpoint.requiresAuth && response.status === 401) {
        // This is expected, test passes
        return;
      }

      if (response.status >= 500) {
        throw new Error(`Server error: ${response.status}`);
      }

      if (response.status === 404 && endpoint.method === 'GET') {
        // Some endpoints might not have data, that's okay
        warn(`${testName} returned 404 - endpoint exists but no data`);
        return;
      }

      results.endpoints_tested.push(testName);
    });
  }
}

// ============================================================================
// ROUTE TESTS
// ============================================================================

async function testAllRoutes() {
  logSection('TESTING ALL ROUTES');

  const routes = [
    { path: '/', name: 'Landing Page' },
    { path: '/auth', name: 'Auth Page' },
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/lessons', name: 'All Lessons' },
    { path: '/vocabulary', name: 'Vocabulary Page' },
    { path: '/speaking', name: 'Speaking Practice' },
    { path: '/listening', name: 'Listening Practice' },
    { path: '/stories', name: 'Stories Page' },
    { path: '/chat', name: 'Chat Page' },
    { path: '/progress', name: 'Progress Page' },
    { path: '/admin', name: 'Admin Page' },
  ];

  for (const route of routes) {
    await test(`Route: ${route.path} (${route.name})`, async () => {
      const response = await retry(() =>
        makeRequest(`${BASE_URL}${route.path}`)
      ).catch(() => ({ status: 500 }));

      // Routes should return HTML (status 200) or redirect (3xx)
      if (response.status >= 200 && response.status < 400) {
        if (response.status === 200) {
          // Should return HTML
          const contentType = response.headers['content-type'] || '';
          if (!contentType.includes('text/html')) {
            warn(`Route ${route.path} returned non-HTML content: ${contentType}`);
          }
        }
        results.routes_tested.push({
          path: route.path,
          name: route.name,
          status: response.status
        });
      } else if (response.status === 404) {
        throw new Error(`Route ${route.path} not found (404)`);
      } else {
        throw new Error(`Route ${route.path} returned status ${response.status}`);
      }
    });
  }
}

// ============================================================================
// DATA INTEGRITY TESTS
// ============================================================================

async function testDataIntegrity() {
  logSection('TESTING DATA INTEGRITY');

  // Test lessons data integrity
  await test('All lessons have required fields', async () => {
    const response = await retry(() => makeRequest(`${BASE_URL}/api/lessons`));
    const lessons = response.body;

    for (const lesson of lessons) {
      const required = ['id', 'title', 'slug', 'description', 'content', 'difficulty', 'order'];
      for (const field of required) {
        if (!(field in lesson)) {
          throw new Error(`Lesson ${lesson.id} missing required field: ${field}`);
        }
        if (lesson[field] === null || lesson[field] === undefined || lesson[field] === '') {
          throw new Error(`Lesson ${lesson.id} has empty required field: ${field}`);
        }
      }

      // Validate difficulty
      const validDifficulties = ['Beginner', 'Intermediate', 'Advanced'];
      if (!validDifficulties.includes(lesson.difficulty)) {
        warn(`Lesson ${lesson.id} has invalid difficulty: ${lesson.difficulty}`);
      }

      // Validate slug format
      if (!/^[a-z0-9-]+$/.test(lesson.slug)) {
        warn(`Lesson ${lesson.id} has invalid slug format: ${lesson.slug}`);
      }
    }
  });

  // Test vocabulary integrity
  await test('Vocabulary items have valid structure', async () => {
    const lessonsResponse = await retry(() => makeRequest(`${BASE_URL}/api/lessons`));
    const lessons = lessonsResponse.body.slice(0, 5); // Test first 5 lessons

    for (const lesson of lessons) {
      const vocabResponse = await retry(() =>
        makeRequest(`${BASE_URL}/api/lessons/${lesson.id}/vocabulary`)
      ).catch(() => null);

      if (vocabResponse && vocabResponse.status === 200) {
        const vocab = vocabResponse.body;
        for (const item of vocab) {
          if (!item.word || typeof item.word !== 'string') {
            throw new Error(`Vocabulary item in lesson ${lesson.id} has invalid word`);
          }
          if (!item.definition || typeof item.definition !== 'string') {
            throw new Error(`Vocabulary item in lesson ${lesson.id} has invalid definition`);
          }
          if (item.lessonId !== lesson.id) {
            throw new Error(`Vocabulary item has mismatched lessonId: ${item.lessonId} !== ${lesson.id}`);
          }
        }
      }
    }
  });
}

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

async function testIntegration() {
  logSection('TESTING INTEGRATION FLOWS');

  // Test lesson -> vocabulary flow
  await test('Lesson to Vocabulary integration', async () => {
    const lessonsResponse = await retry(() => makeRequest(`${BASE_URL}/api/lessons`));
    const lessons = lessonsResponse.body;

    for (const lesson of lessons.slice(0, 3)) {
      const lessonResponse = await retry(() =>
        makeRequest(`${BASE_URL}/api/lessons/${lesson.id}`)
      );

      const lessonData = lessonResponse.body;
      const vocabFromLesson = lessonData.vocabulary || [];

      const vocabResponse = await retry(() =>
        makeRequest(`${BASE_URL}/api/lessons/${lesson.id}/vocabulary`)
      ).catch(() => null);

      if (vocabResponse && vocabResponse.status === 200) {
        const vocabFromEndpoint = vocabResponse.body;
        
        // Both should have same length
        if (vocabFromLesson.length !== vocabFromEndpoint.length) {
          warn(`Lesson ${lesson.id}: vocabulary count mismatch (lesson: ${vocabFromLesson.length}, endpoint: ${vocabFromEndpoint.length})`);
        }
      }
    }
  });

  // Test search integration
  await test('Search endpoint integration', async () => {
    const response = await retry(() =>
      makeRequest(`${BASE_URL}/api/search?q=hello`)
    ).catch(() => ({ status: 500 }));

    if (response.status === 200) {
      if (!Array.isArray(response.body)) {
        throw new Error('Search endpoint did not return an array');
      }
    } else if (response.status !== 404) {
      warn(`Search endpoint returned unexpected status: ${response.status}`);
    }
  });
}

// ============================================================================
// LINK AND NAVIGATION TESTS
// ============================================================================

async function testNavigationAndLinks() {
  logSection('TESTING NAVIGATION AND LINKS');

  // Test that lessons link to their detail pages
  await test('Lessons link to detail pages', async () => {
    const lessonsResponse = await retry(() => makeRequest(`${BASE_URL}/api/lessons`));
    const lessons = lessonsResponse.body;

    // Check if lesson detail routes would work
    for (const lesson of lessons.slice(0, 5)) {
      const lessonResponse = await retry(() =>
        makeRequest(`${BASE_URL}/api/lessons/${lesson.id}`)
      );

      if (lessonResponse.status !== 200) {
        throw new Error(`Lesson ${lesson.id} detail page is not accessible`);
      }

      // Verify lesson has required data for rendering
      const lessonData = lessonResponse.body;
      if (!lessonData.title || !lessonData.content) {
        throw new Error(`Lesson ${lesson.id} missing required rendering data`);
      }
    }
  });

  // Test cross-page navigation
  await test('All main navigation routes are accessible', async () => {
    const mainRoutes = [
      { path: '/lessons', name: 'Lessons Page' },
      { path: '/vocabulary', name: 'Vocabulary Page' },
      { path: '/speaking', name: 'Speaking Page' },
      { path: '/stories', name: 'Stories Page' },
      { path: '/chat', name: 'Chat Page' },
    ];

    for (const route of mainRoutes) {
      const response = await retry(() =>
        makeRequest(`${BASE_URL}${route.path}`)
      ).catch(() => ({ status: 500 }));

      if (response.status >= 500) {
        throw new Error(`Route ${route.path} returned server error`);
      }

      // Accept 200 (success) or 401 (auth required) or 302 (redirect)
      if (response.status >= 400 && response.status !== 401 && response.status !== 302) {
        warn(`Route ${route.path} may not be properly configured: ${response.status}`);
      }
    }
  });

  // Test API endpoint connectivity
  await test('All lesson-related endpoints are connected', async () => {
    const lessonsResponse = await retry(() => makeRequest(`${BASE_URL}/api/lessons`));
    const lessons = lessonsResponse.body;

    if (lessons.length === 0) {
      throw new Error('No lessons found - cannot test connectivity');
    }

    // Test first lesson's complete flow
    const testLesson = lessons[0];

    // Lesson detail
    const detailResponse = await retry(() =>
      makeRequest(`${BASE_URL}/api/lessons/${testLesson.id}`)
    );
    if (detailResponse.status !== 200) {
      throw new Error(`Lesson detail endpoint not working for lesson ${testLesson.id}`);
    }

    // Vocabulary
    const vocabResponse = await retry(() =>
      makeRequest(`${BASE_URL}/api/lessons/${testLesson.id}/vocabulary`)
    ).catch(() => ({ status: 500 }));
    if (vocabResponse.status >= 500) {
      warn(`Vocabulary endpoint error for lesson ${testLesson.id}`);
    }

    // Quiz (if available)
    const quizResponse = await retry(() =>
      makeRequest(`${BASE_URL}/api/lessons/${testLesson.id}/quiz`)
    ).catch(() => ({ status: 404 }));
    // 404 is acceptable if quiz doesn't exist

    results.components_verified.push({
      lesson_id: testLesson.id,
      lesson_detail: detailResponse.status === 200,
      vocabulary: vocabResponse.status === 200,
      quiz: quizResponse.status === 200
    });
  });
}

// ============================================================================
// COMPREHENSIVE FLOW TESTS
// ============================================================================

async function testCompleteUserFlows() {
  logSection('TESTING COMPLETE USER FLOWS');

  // Flow 1: Browse lessons -> View lesson -> View vocabulary
  await test('Complete lesson browsing flow', async () => {
    // Step 1: Get all lessons
    const lessonsResponse = await retry(() => makeRequest(`${BASE_URL}/api/lessons`));
    const lessons = lessonsResponse.body;

    if (lessons.length === 0) {
      throw new Error('No lessons available for browsing flow');
    }

    // Step 2: View first lesson
    const firstLesson = lessons[0];
    const lessonResponse = await retry(() =>
      makeRequest(`${BASE_URL}/api/lessons/${firstLesson.id}`)
    );

    if (lessonResponse.status !== 200) {
      throw new Error(`Cannot view lesson ${firstLesson.id} in browsing flow`);
    }

    // Step 3: Get vocabulary for lesson
    const vocabResponse = await retry(() =>
      makeRequest(`${BASE_URL}/api/lessons/${firstLesson.id}/vocabulary`)
    ).catch(() => ({ status: 500 }));

    if (vocabResponse.status >= 500) {
      warn(`Vocabulary not accessible in browsing flow for lesson ${firstLesson.id}`);
    }

    log(`  ✓ Successfully completed browsing flow for lesson ${firstLesson.id}`, 'green');
  });

  // Flow 2: Search -> View results -> Access content
  await test('Search and access flow', async () => {
    const searchResponse = await retry(() =>
      makeRequest(`${BASE_URL}/api/search?q=hello`)
    ).catch(() => ({ status: 500 }));

    if (searchResponse.status === 200) {
      if (!Array.isArray(searchResponse.body)) {
        warn('Search endpoint returned non-array result');
      }
      log(`  ✓ Search flow working`, 'green');
    } else if (searchResponse.status === 404) {
      warn('Search endpoint not implemented');
    } else {
      warn(`Search endpoint returned status ${searchResponse.status}`);
    }
  });
}

// ============================================================================
// MAIN TEST RUNNER
// ============================================================================

async function checkServerHealth() {
  logSection('CHECKING SERVER HEALTH');
  
  try {
    const response = await makeRequest(`${BASE_URL}/api/test`);
    if (response.status === 200) {
      log('✓ Server is running and responsive', 'green');
      return true;
    }
  } catch (error) {
    // Try lessons endpoint as fallback
    try {
      const response = await makeRequest(`${BASE_URL}/api/lessons`);
      if (response.status === 200 || response.status === 404) {
        log('✓ Server is running (lessons endpoint accessible)', 'green');
        return true;
      }
    } catch (e) {
      // Server not responding
    }
  }
  
  log('✗ Server is not running or not accessible', 'red');
  log(`\nPlease start the server first:`, 'yellow');
  log(`  npm run dev`, 'yellow');
  log(`\nOr set TEST_BASE_URL environment variable:`, 'yellow');
  log(`  TEST_BASE_URL=http://your-server:port npm run test:all-lessons`, 'yellow');
  return false;
}

async function runAllTests() {
  logSection('COMPREHENSIVE LESSON TEST SUITE');
  log(`Testing against: ${BASE_URL}`, 'blue');
  log(`Started at: ${new Date().toISOString()}`, 'blue');

  // Check server health first
  const serverHealthy = await checkServerHealth();
  if (!serverHealthy) {
    log('\n❌ Cannot proceed without a running server', 'red');
    process.exit(1);
  }

  try {
    // Run all test suites
    await testAllLessons();
    await testAllEndpoints();
    await testAllRoutes();
    await testDataIntegrity();
    await testIntegration();
    await testNavigationAndLinks();
    await testCompleteUserFlows();

    // Generate report
    generateReport();
    
    process.exit(results.failed > 0 ? 1 : 0);
  } catch (error) {
    log(`\nFATAL ERROR: ${error.message}`, 'red');
    console.error(error.stack);
    process.exit(1);
  }
}

function generateReport() {
  logSection('TEST RESULTS SUMMARY');

  log(`Total Tests: ${results.total}`, 'bright');
  log(`Passed: ${results.passed}`, 'green');
  log(`Failed: ${results.failed}`, results.failed > 0 ? 'red' : 'green');
  log(`Warnings: ${results.warnings}`, results.warnings > 0 ? 'yellow' : 'green');

  log(`\nLessons Tested: ${results.lessons_tested.length}`, 'blue');
  log(`Endpoints Tested: ${results.endpoints_tested.length}`, 'blue');
  log(`Routes Tested: ${results.routes_tested.length}`, 'blue');

  if (results.failed > 0) {
    log('\nFAILED TESTS:', 'red');
    results.errors.forEach((err, idx) => {
      log(`\n${idx + 1}. ${err.test}`, 'red');
      log(`   Error: ${err.error}`, 'red');
    });
  }

  if (results.warnings > 0) {
    log('\nWARNINGS:', 'yellow');
    results.warnings_list.forEach((warn, idx) => {
      log(`${idx + 1}. ${warn}`, 'yellow');
    });
  }

  // Save detailed report to file
  const report = {
    timestamp: new Date().toISOString(),
    base_url: BASE_URL,
    summary: {
      total: results.total,
      passed: results.passed,
      failed: results.failed,
      warnings: results.warnings,
      success_rate: ((results.passed / results.total) * 100).toFixed(2) + '%'
    },
    lessons_tested: results.lessons_tested,
    endpoints_tested: [...new Set(results.endpoints_tested)],
    routes_tested: results.routes_tested,
    errors: results.errors,
    warnings: results.warnings_list
  };

  const reportPath = path.join(process.cwd(), 'COMPREHENSIVE_TEST_REPORT.json');
  fs.writeFile(reportPath, JSON.stringify(report, null, 2))
    .then(() => {
      log(`\nDetailed report saved to: ${reportPath}`, 'green');
    })
    .catch(err => {
      log(`\nFailed to save report: ${err.message}`, 'yellow');
    });
}

// Run tests
if (require.main === module) {
  runAllTests();
}

module.exports = { runAllTests, test, testAllLessons, testAllEndpoints, testAllRoutes };
