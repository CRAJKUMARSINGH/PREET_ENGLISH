#!/usr/bin/env tsx
/**
 * MASTER PRE-LAUNCH TEST RUNNER
 * 
 * Runs all critical tests before tomorrow's launch
 */

import { execSync } from 'child_process';
import * as fs from 'fs';

console.log('🚀 MASTER PRE-LAUNCH TEST SUITE');
console.log('='.repeat(80));
console.log('📅 Critical for tomorrow\'s launch');
console.log('🎯 Testing 75 users + login bottlenecks\n');

const tests = [
  {
    name: 'Login Bottleneck Test',
    script: 'npx tsx scripts/login-bottleneck-test.ts',
    critical: true
  },
  {
    name: 'Pre-Launch Stress Test',
    script: 'npx tsx scripts/pre-launch-stress-test.ts',
    critical: true
  }
];

async function runAllTests() {
  const results: any[] = [];
  let allPassed = true;

  for (const test of tests) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`🧪 Running: ${test.name}`);
    console.log('='.repeat(80));

    try {
      execSync(test.script, { stdio: 'inherit' });
      results.push({ name: test.name, passed: true });
      console.log(`\n✅ ${test.name} completed successfully\n`);
    } catch (error) {
      results.push({ name: test.name, passed: false, error });
      allPassed = false;
      console.log(`\n❌ ${test.name} failed\n`);
      
      if (test.critical) {
        console.log(`⚠️  CRITICAL TEST FAILED - Launch may be at risk!`);
      }
    }
  }

  // Generate master report
  console.log('\n' + '='.repeat(80));
  console.log('📊 MASTER PRE-LAUNCH TEST REPORT');
  console.log('='.repeat(80));

  console.log(`\n🎯 Test Summary:`);
  results.forEach(result => {
    console.log(`   ${result.passed ? '✅' : '❌'} ${result.name}`);
  });

  console.log(`\n🚦 Launch Readiness:`);
  if (allPassed) {
    console.log(`   Status: ✅ READY FOR LAUNCH`);
    console.log(`   All critical tests passed`);
    console.log(`   System is production-ready`);
  } else {
    console.log(`   Status: ⚠️  REVIEW REQUIRED`);
    console.log(`   Some tests failed - review reports`);
    console.log(`   Check individual test reports for details`);
  }

  console.log(`\n📄 Generated Reports:`);
  console.log(`   - LOGIN_BOTTLENECK_REPORT.json`);
  console.log(`   - PRE_LAUNCH_STRESS_TEST_REPORT.json`);

  console.log('\n' + '='.repeat(80));
  console.log('✨ All Pre-Launch Tests Complete!');
  console.log('='.repeat(80) + '\n');

  process.exit(allPassed ? 0 : 1);
}

runAllTests().catch(console.error);
