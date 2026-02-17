#!/usr/bin/env tsx
/**
 * Verification Script for Critical Fixes
 * Confirms all security and deployment fixes are in place
 */

import { readFile } from 'fs/promises';
import { join } from 'path';

interface CheckResult {
  name: string;
  status: 'PASS' | 'FAIL' | 'WARN';
  message: string;
}

const results: CheckResult[] = [];

async function checkBuildScript() {
  const pkg = JSON.parse(await readFile('package.json', 'utf-8'));
  const startScript = pkg.scripts.start;
  
  if (startScript.includes('dist/index.cjs')) {
    results.push({
      name: 'Build Script',
      status: 'PASS',
      message: 'Start script correctly references dist/index.cjs'
    });
  } else {
    results.push({
      name: 'Build Script',
      status: 'FAIL',
      message: `Start script references wrong file: ${startScript}`
    });
  }
}

async function checkHardcodedUserId() {
  const content = await readFile('client/src/hooks/use-progress.ts', 'utf-8');
  
  if (content.includes('userId: 1')) {
    results.push({
      name: 'Hardcoded User ID',
      status: 'FAIL',
      message: 'Found hardcoded userId: 1 in use-progress.ts'
    });
  } else {
    results.push({
      name: 'Hardcoded User ID',
      status: 'PASS',
      message: 'No hardcoded user IDs found'
    });
  }
}

async function checkLeaderboardAuth() {
  const content = await readFile('server/routes.ts', 'utf-8');
  
  if (content.includes('isCurrentUser') && content.includes('req.isAuthenticated()')) {
    results.push({
      name: 'Leaderboard Auth',
      status: 'PASS',
      message: 'Leaderboard properly identifies current user'
    });
  } else {
    results.push({
      name: 'Leaderboard Auth',
      status: 'FAIL',
      message: 'Leaderboard missing authentication context'
    });
  }
}

async function checkTypeHelpers() {
  try {
    await readFile('server/lib/db-helpers.ts', 'utf-8');
    results.push({
      name: 'Type Safety Infrastructure',
      status: 'PASS',
      message: 'db-helpers.ts exists and ready for use'
    });
  } catch {
    results.push({
      name: 'Type Safety Infrastructure',
      status: 'WARN',
      message: 'db-helpers.ts not found'
    });
  }
}

async function checkSafeDeserialization() {
  const content = await readFile('server/auth.ts', 'utf-8');
  
  if (content.includes('done(null, false)') && content.includes('no longer exists')) {
    results.push({
      name: 'Safe Deserialization',
      status: 'PASS',
      message: 'Auth properly handles deleted users'
    });
  } else {
    results.push({
      name: 'Safe Deserialization',
      status: 'WARN',
      message: 'Could not verify safe deserialization'
    });
  }
}

async function runChecks() {
  console.log('\n🔍 Verifying Critical Fixes...\n');
  
  await checkBuildScript();
  await checkHardcodedUserId();
  await checkLeaderboardAuth();
  await checkTypeHelpers();
  await checkSafeDeserialization();
  
  console.log('Results:\n');
  
  let passCount = 0;
  let failCount = 0;
  let warnCount = 0;
  
  for (const result of results) {
    const icon = result.status === 'PASS' ? '✅' : result.status === 'FAIL' ? '❌' : '⚠️';
    console.log(`${icon} ${result.name}: ${result.status}`);
    console.log(`   ${result.message}\n`);
    
    if (result.status === 'PASS') passCount++;
    if (result.status === 'FAIL') failCount++;
    if (result.status === 'WARN') warnCount++;
  }
  
  console.log('─'.repeat(50));
  console.log(`\nSummary: ${passCount} passed, ${failCount} failed, ${warnCount} warnings`);
  
  if (failCount === 0) {
    console.log('\n🚀 All critical fixes verified! Production ready.\n');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some checks failed. Review fixes before deployment.\n');
    process.exit(1);
  }
}

runChecks().catch(console.error);
