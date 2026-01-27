#!/usr/bin/env node
/**
 * LAUNCH READINESS TEST RUNNER
 * 
 * Runs comprehensive robustness test with proper server check
 * and optimized execution
 */

const { spawn } = require('child_process');
const http = require('http');

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:5000';

// Check if server is running
async function checkServer(url) {
  return new Promise((resolve) => {
    const req = http.get(url, { timeout: 2000 }, (res) => {
      resolve(res.statusCode === 200 || res.statusCode === 404 || res.statusCode === 401);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function main() {
  console.log('\n🚀 LAUNCH READINESS TEST - COMPREHENSIVE ROBUSTNESS TEST\n');
  console.log('='.repeat(80));
  console.log('This test will simulate 1500 virtual users:');
  console.log('  - 500 Beginner users');
  console.log('  - 500 Intermediate users');
  console.log('  - 500 Advanced users');
  console.log('Each user will randomly visit 90% of lessons and test all routes');
  console.log('='.repeat(80) + '\n');

  // Check server
  console.log('🔍 Checking if server is running...');
  const serverRunning = await checkServer(`${BASE_URL}/api/test`);

  if (!serverRunning) {
    // Try lessons endpoint
    const lessonsCheck = await checkServer(`${BASE_URL}/api/lessons`);
    if (!lessonsCheck) {
      console.error('\n❌ Server is not running!');
      console.error(`   Please start the server first: npm run dev`);
      console.error(`   Or set TEST_BASE_URL environment variable`);
      process.exit(1);
    }
  }

  console.log('✅ Server is accessible\n');

  // Run the robustness test
  console.log('Starting robustness test...\n');
  const { runRobustnessTest } = require('./robustness-stress-test.cjs');
  
  try {
    await runRobustnessTest();
  } catch (error) {
    console.error('\n❌ Test execution failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
