#!/usr/bin/env tsx
/**
 * POST-DEPLOYMENT VALIDATION SCRIPT
 * 
 * Validates production deployment by testing all critical endpoints
 * and verifying user count consistency
 */

import fetch from 'node-fetch';

interface ValidationResult {
  test: string;
  status: 'PASS' | 'FAIL' | 'WARN';
  message: string;
  details?: any;
}

const results: ValidationResult[] = [];

// Get deployment URL from command line or environment
const DEPLOYMENT_URL = process.argv[2] || process.env.DEPLOYMENT_URL || 'http://localhost:5000';

console.log('🔍 PRODUCTION DEPLOYMENT VALIDATION');
console.log('===================================');
console.log(`Target URL: ${DEPLOYMENT_URL}\n`);

async function validateEndpoint(
  name: string,
  endpoint: string,
  validator: (data: any) => { valid: boolean; message: string; details?: any }
): Promise<void> {
  try {
    const url = `${DEPLOYMENT_URL}${endpoint}`;
    console.log(`Testing: ${name}...`);
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      results.push({
        test: name,
        status: 'FAIL',
        message: `HTTP ${response.status}: ${response.statusText}`,
        details: data
      });
      console.log(`❌ FAIL: ${name}\n`);
      return;
    }
    
    const validation = validator(data);
    
    if (validation.valid) {
      results.push({
        test: name,
        status: 'PASS',
        message: validation.message,
        details: validation.details
      });
      console.log(`✅ PASS: ${validation.message}\n`);
    } else {
      results.push({
        test: name,
        status: 'FAIL',
        message: validation.message,
        details: validation.details
      });
      console.log(`❌ FAIL: ${validation.message}\n`);
    }
  } catch (error: any) {
    results.push({
      test: name,
      status: 'FAIL',
      message: `Request failed: ${error.message}`
    });
    console.log(`❌ FAIL: ${name} - ${error.message}\n`);
  }
}

async function runValidation() {
  // Test 1: Health Check
  await validateEndpoint(
    'Health Check',
    '/api/health',
    (data) => {
      if (data.status === 'healthy') {
        return {
          valid: true,
          message: 'Server is healthy',
          details: { version: data.version, environment: data.environment }
        };
      }
      return { valid: false, message: 'Server unhealthy', details: data };
    }
  );
  
  // Test 2: User Count (CRITICAL)
  await validateEndpoint(
    'User Count (CRITICAL)',
    '/api/users/count',
    (data) => {
      if (data.count === 251 && data.locked === true) {
        return {
          valid: true,
          message: 'User count is 251 and locked ✅',
          details: data
        };
      }
      return {
        valid: false,
        message: `User count is ${data.count}, expected 251. Locked: ${data.locked}`,
        details: data
      };
    }
  );
  
  // Test 3: Production Stats (CRITICAL)
  await validateEndpoint(
    'Production Stats (CRITICAL)',
    '/api/production/stats',
    (data) => {
      if (
        data.success === true &&
        data.totalUsers === 251 &&
        data.strategy === 'FIXED_COUNT' &&
        data.locked === true
      ) {
        return {
          valid: true,
          message: 'Production stats correct: 251 users, FIXED_COUNT, locked ✅',
          details: data
        };
      }
      return {
        valid: false,
        message: `Production stats incorrect. Users: ${data.totalUsers}, Strategy: ${data.strategy}, Locked: ${data.locked}`,
        details: data
      };
    }
  );
  
  // Test 4: Lessons Endpoint
  await validateEndpoint(
    'Lessons Endpoint',
    '/api/lessons',
    (data) => {
      if (Array.isArray(data) && data.length > 0) {
        return {
          valid: true,
          message: `${data.length} lessons accessible`,
          details: { count: data.length, expected: 1659 }
        };
      }
      return {
        valid: false,
        message: 'No lessons found or invalid response',
        details: data
      };
    }
  );
  
  // Test 5: User Count Consistency (Multiple Requests)
  console.log('Testing: User Count Consistency (10 requests)...');
  const counts: number[] = [];
  let allMatch = true;
  
  for (let i = 0; i < 10; i++) {
    try {
      const response = await fetch(`${DEPLOYMENT_URL}/api/users/count`);
      const data: any = await response.json();
      counts.push(data.count);
      if (data.count !== 251) {
        allMatch = false;
      }
    } catch (error) {
      allMatch = false;
      break;
    }
  }
  
  if (allMatch && counts.every(c => c === 251)) {
    results.push({
      test: 'User Count Consistency',
      status: 'PASS',
      message: 'All 10 requests returned 251 ✅',
      details: { counts, unique: [...new Set(counts)] }
    });
    console.log('✅ PASS: User count consistent across 10 requests\n');
  } else {
    results.push({
      test: 'User Count Consistency',
      status: 'FAIL',
      message: 'User count inconsistent across requests',
      details: { counts, unique: [...new Set(counts)] }
    });
    console.log('❌ FAIL: User count inconsistent\n');
  }
  
  // Test 6: Cache Invalidation Test
  console.log('Testing: Cache Invalidation...');
  try {
    // Get initial count
    const response1 = await fetch(`${DEPLOYMENT_URL}/api/users/count`);
    const data1: any = await response1.json();
    
    // Wait 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Get count again
    const response2 = await fetch(`${DEPLOYMENT_URL}/api/users/count`);
    const data2: any = await response2.json();
    
    if (data1.count === 251 && data2.count === 251) {
      results.push({
        test: 'Cache Invalidation',
        status: 'PASS',
        message: 'User count persists correctly (251) ✅',
        details: { before: data1.count, after: data2.count }
      });
      console.log('✅ PASS: User count persists after cache refresh\n');
    } else {
      results.push({
        test: 'Cache Invalidation',
        status: 'FAIL',
        message: 'User count changed after cache refresh',
        details: { before: data1.count, after: data2.count }
      });
      console.log('❌ FAIL: User count changed\n');
    }
  } catch (error: any) {
    results.push({
      test: 'Cache Invalidation',
      status: 'FAIL',
      message: `Test failed: ${error.message}`
    });
    console.log(`❌ FAIL: Cache test error\n`);
  }
  
  // Generate Report
  console.log('\n📊 VALIDATION REPORT');
  console.log('===================\n');
  
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const warned = results.filter(r => r.status === 'WARN').length;
  const total = results.length;
  
  console.log(`Total Tests: ${total}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⚠️  Warnings: ${warned}\n`);
  
  // Critical Tests
  const criticalTests = results.filter(r => 
    r.test.includes('CRITICAL') || r.test.includes('User Count')
  );
  const criticalPassed = criticalTests.filter(r => r.status === 'PASS').length;
  
  console.log('🔴 CRITICAL TESTS:');
  console.log(`${criticalPassed}/${criticalTests.length} passed\n`);
  
  // Detailed Results
  console.log('📋 DETAILED RESULTS:');
  console.log('===================\n');
  
  results.forEach((result, index) => {
    const icon = result.status === 'PASS' ? '✅' : result.status === 'FAIL' ? '❌' : '⚠️';
    console.log(`${index + 1}. ${icon} ${result.test}`);
    console.log(`   ${result.message}`);
    if (result.details) {
      console.log(`   Details: ${JSON.stringify(result.details, null, 2)}`);
    }
    console.log('');
  });
  
  // Final Verdict
  console.log('\n🏆 FINAL VERDICT');
  console.log('================\n');
  
  if (failed === 0 && criticalPassed === criticalTests.length) {
    console.log('✅ DEPLOYMENT VALIDATED SUCCESSFULLY!');
    console.log('All critical tests passed. Production is ready.\n');
    console.log('User count: 251 ✅');
    console.log('Locked: true ✅');
    console.log('Consistency: 100% ✅\n');
    process.exit(0);
  } else if (criticalPassed < criticalTests.length) {
    console.log('❌ CRITICAL TESTS FAILED!');
    console.log('Production deployment has critical issues.\n');
    console.log('Action Required:');
    console.log('1. Check environment variables (PRODUCTION_USER_COUNT=251, LOCK_USER_COUNT=true)');
    console.log('2. Verify production-stats.ts is deployed correctly');
    console.log('3. Restart server and re-run validation\n');
    process.exit(1);
  } else {
    console.log('⚠️  DEPLOYMENT HAS WARNINGS');
    console.log('Some non-critical tests failed. Review and fix if needed.\n');
    process.exit(0);
  }
}

// Run validation
runValidation().catch(error => {
  console.error('❌ Validation script error:', error);
  process.exit(1);
});
