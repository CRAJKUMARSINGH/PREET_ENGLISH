#!/usr/bin/env node
/**
 * TEST EVERYTHING - COMPREHENSIVE APP TEST SUITE
 * 
 * Tests every nook and corner of the app:
 * - Every lesson individually
 * - All API endpoints
 * - All routes
 * - Component integration
 * - Navigation flows
 * - Data integrity
 * - Link connectivity
 */

const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs').promises;

// Check if server is running
async function checkServer(url) {
  const http = require('http');
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

// Start server if not running
async function ensureServerRunning() {
  const testUrl = process.env.TEST_BASE_URL || 'http://localhost:5000';
  const serverRunning = await checkServer(testUrl);
  
  if (!serverRunning) {
    console.log('🚀 Starting server for testing...');
    const server = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      shell: true,
      cwd: process.cwd()
    });

    // Wait for server to start
    let serverReady = false;
    for (let i = 0; i < 30; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (await checkServer(testUrl)) {
        serverReady = true;
        break;
      }
    }

    if (!serverReady) {
      console.error('❌ Server failed to start');
      server.kill();
      process.exit(1);
    }

    console.log('✅ Server is running');
    return { server, kill: () => server.kill() };
  } else {
    console.log('✅ Server is already running');
    return { server: null, kill: () => {} };
  }
}

async function main() {
  const serverInfo = await ensureServerRunning();
  
  try {
    // Import and run comprehensive tests
    const { runAllTests } = require('./comprehensive-lesson-test.cjs');
    
    console.log('\n' + '='.repeat(80));
    console.log('🧪 COMPREHENSIVE APPLICATION TEST SUITE');
    console.log('='.repeat(80) + '\n');
    
    await runAllTests();
  } catch (error) {
    console.error('❌ Test suite failed:', error);
    process.exit(1);
  } finally {
    if (serverInfo.kill) {
      serverInfo.kill();
    }
  }
}

if (require.main === module) {
  main();
}

module.exports = { main, ensureServerRunning };
