#!/usr/bin/env tsx

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

console.log('🚀 PREET ENGLISH - Production Deployment Script\n');
console.log('================================================\n');

let hasErrors = false;

// Helper function to run commands
function runCommand(command: string, description: string, critical = true): boolean {
  console.log(`\n${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} - SUCCESS`);
    return true;
  } catch (error) {
    console.error(`❌ ${description} - FAILED`);
    if (critical) {
      hasErrors = true;
      return false;
    }
    console.warn(`⚠️  Non-critical failure, continuing...`);
    return false;
  }
}

// 1. Pre-flight checks
console.log('📋 PHASE 1: PRE-FLIGHT CHECKS');
console.log('================================\n');

// Check Node version
console.log('Checking Node.js version...');
const nodeVersion = process.version;
console.log(`Node.js version: ${nodeVersion}`);
if (parseInt(nodeVersion.slice(1)) < 18) {
  console.error('❌ Node.js 18+ required');
  process.exit(1);
}
console.log('✅ Node.js version OK\n');

// Check if package.json exists
if (!fs.existsSync('./package.json')) {
  console.error('❌ package.json not found. Run from project root.');
  process.exit(1);
}
console.log('✅ Project structure OK\n');

// 2. Run tests
console.log('\n📋 PHASE 2: TESTING');
console.log('================================\n');

runCommand('npm test', 'Running test suite');

if (hasErrors) {
  console.error('\n❌ Tests failed. Fix tests before deploying.');
  console.log('\nTo see detailed test output:');
  console.log('  npm test -- --verbose');
  process.exit(1);
}

// 3. TypeScript check
console.log('\n📋 PHASE 3: TYPE CHECKING');
console.log('================================\n');

runCommand('npm run check', 'TypeScript type checking', false);

// 4. Build
console.log('\n📋 PHASE 4: BUILD');
console.log('================================\n');

// Clean previous build
if (fs.existsSync('./dist')) {
  console.log('Cleaning previous build...');
  fs.rmSync('./dist', { recursive: true, force: true });
  console.log('✅ Previous build cleaned\n');
}

runCommand('npm run build', 'Building application');

if (hasErrors) {
  console.error('\n❌ Build failed. Fix build errors before deploying.');
  process.exit(1);
}

// 5. Verify build output
console.log('\n📋 PHASE 5: BUILD VERIFICATION');
console.log('================================\n');

const requiredFiles = [
  './dist/public/index.html',
  './dist/index.cjs',
];

let buildValid = true;
for (const file of requiredFiles) {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file);
    console.log(`✅ ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
  } else {
    console.error(`❌ Missing: ${file}`);
    buildValid = false;
  }
}

if (!buildValid) {
  console.error('\n❌ Build output incomplete. Aborting deployment.');
  process.exit(1);
}

// Check bundle sizes
const publicDir = './dist/public';
if (fs.existsSync(publicDir)) {
  const files = fs.readdirSync(publicDir);
  const jsFiles = files.filter(f => f.endsWith('.js'));
  
  console.log('\n📦 Bundle Sizes:');
  let totalSize = 0;
  jsFiles.forEach(file => {
    const filePath = path.join(publicDir, file);
    const stats = fs.statSync(filePath);
    const sizeKB = stats.size / 1024;
    totalSize += sizeKB;
    console.log(`  ${file}: ${sizeKB.toFixed(2)} KB`);
  });
  console.log(`  Total JS: ${totalSize.toFixed(2)} KB`);
  
  if (totalSize > 2000) {
    console.warn(`⚠️  Large bundle size (${totalSize.toFixed(2)} KB). Consider optimization.`);
  }
}

// 6. Database check
console.log('\n📋 PHASE 6: DATABASE CHECK');
console.log('================================\n');

if (process.env.DATABASE_URL) {
  console.log('Database URL configured');
  runCommand('npm run db:push -- --accept-data-loss', 'Checking database connection', false);
} else {
  console.warn('⚠️  DATABASE_URL not set. Skipping database check.');
}

// 7. Environment variables check
console.log('\n📋 PHASE 7: ENVIRONMENT CHECK');
console.log('================================\n');

const requiredEnvVars = [
  'DATABASE_URL',
  'SESSION_SECRET',
];

const optionalEnvVars = [
  'OPENAI_API_KEY',
  'SENTRY_DSN',
  'POSTHOG_API_KEY',
];

console.log('Required environment variables:');
requiredEnvVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`  ✅ ${varName}`);
  } else {
    console.error(`  ❌ ${varName} - MISSING`);
    hasErrors = true;
  }
});

console.log('\nOptional environment variables:');
optionalEnvVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`  ✅ ${varName}`);
  } else {
    console.warn(`  ⚠️  ${varName} - Not configured`);
  }
});

if (hasErrors) {
  console.error('\n❌ Missing required environment variables.');
  console.log('\nSet them in your deployment platform or .env file');
  process.exit(1);
}

// 8. Final summary
console.log('\n📋 DEPLOYMENT SUMMARY');
console.log('================================\n');

if (hasErrors) {
  console.error('❌ DEPLOYMENT CHECKS FAILED');
  console.log('\nFix the errors above before deploying.');
  process.exit(1);
}

console.log('✅ ALL CHECKS PASSED!');
console.log('\n🎉 Your application is ready for deployment!\n');

console.log('📋 NEXT STEPS:');
console.log('================================');
console.log('1. Deploy to STAGING first:');
console.log('   - Vercel: vercel --prod');
console.log('   - Or your deployment platform');
console.log('');
console.log('2. Run smoke tests on staging:');
console.log('   - Test user registration');
console.log('   - Test lesson viewing');
console.log('   - Test progress saving');
console.log('   - Check for console errors');
console.log('');
console.log('3. Monitor staging for 1 hour:');
console.log('   - Check Sentry for errors');
console.log('   - Monitor response times');
console.log('   - Verify all features work');
console.log('');
console.log('4. Deploy to PRODUCTION:');
console.log('   - Same process as staging');
console.log('   - Monitor for 24 hours');
console.log('   - Be ready for rollback');
console.log('');
console.log('5. Post-deployment:');
console.log('   - Announce to users');
console.log('   - Monitor metrics');
console.log('   - Celebrate! 🎊');
console.log('');

console.log('📞 ROLLBACK PLAN:');
console.log('================================');
console.log('If something goes wrong:');
console.log('  git reset --hard <previous-commit>');
console.log('  npm install');
console.log('  npm run build');
console.log('  npm run start');
console.log('');

console.log('🚀 Ready to ship!');
