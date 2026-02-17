#!/usr/bin/env tsx
/**
 * PRODUCTION DEPLOYMENT SCRIPT
 * 
 * Comprehensive deployment automation for PREET_ENGLISH
 * Ensures user count is fixed at 251 and all systems are validated
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface DeploymentConfig {
  platform: 'vercel' | 'docker' | 'manual';
  userCount: number;
  validateBuild: boolean;
  runTests: boolean;
}

const config: DeploymentConfig = {
  platform: process.env.DEPLOY_PLATFORM as any || 'vercel',
  userCount: 251,
  validateBuild: true,
  runTests: false // Set to true if you want to run tests before deployment
};

console.log('🚀 PREET_ENGLISH Production Deployment');
console.log('=====================================\n');

// Step 1: Validate Configuration
console.log('📋 Step 1: Validating Configuration...');
try {
  const configPath = path.join(process.cwd(), 'production-user-config.json');
  if (!fs.existsSync(configPath)) {
    console.error('❌ production-user-config.json not found');
    process.exit(1);
  }
  
  const userConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  if (userConfig.targetUserCount !== config.userCount) {
    console.error(`❌ User count mismatch: expected ${config.userCount}, got ${userConfig.targetUserCount}`);
    process.exit(1);
  }
  
  console.log(`✅ User count configured: ${config.userCount}`);
  console.log(`✅ Strategy: ${userConfig.strategy}`);
  console.log(`✅ Locked: ${userConfig.lockUserCount !== false}\n`);
} catch (error: any) {
  console.error('❌ Configuration validation failed:', error.message);
  process.exit(1);
}

// Step 2: Run Pre-Deployment Checklist
console.log('📋 Step 2: Running Pre-Deployment Checklist...');
try {
  execSync('npx tsx scripts/production-deployment-checklist.ts', { stdio: 'inherit' });
  console.log('✅ Pre-deployment checklist passed\n');
} catch (error) {
  console.error('❌ Pre-deployment checklist failed');
  process.exit(1);
}

// Step 3: Clean Previous Build
console.log('🧹 Step 3: Cleaning Previous Build...');
try {
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
    console.log('✅ Previous build cleaned\n');
  } else {
    console.log('✅ No previous build to clean\n');
  }
} catch (error: any) {
  console.error('❌ Failed to clean build:', error.message);
  process.exit(1);
}

// Step 4: Build Application
console.log('🔨 Step 4: Building Application...');
try {
  console.log('Building client and server...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully\n');
} catch (error) {
  console.error('❌ Build failed');
  process.exit(1);
}

// Step 5: Validate Build Output
if (config.validateBuild) {
  console.log('🔍 Step 5: Validating Build Output...');
  try {
    const distPath = path.join(process.cwd(), 'dist');
    const serverPath = path.join(distPath, 'index.cjs');
    const publicPath = path.join(distPath, 'public');
    
    if (!fs.existsSync(distPath)) {
      throw new Error('dist/ directory not found');
    }
    if (!fs.existsSync(serverPath)) {
      throw new Error('dist/index.cjs not found');
    }
    if (!fs.existsSync(publicPath)) {
      throw new Error('dist/public/ directory not found');
    }
    
    console.log('✅ Server bundle: dist/index.cjs');
    console.log('✅ Client assets: dist/public/');
    console.log('✅ Build output validated\n');
  } catch (error: any) {
    console.error('❌ Build validation failed:', error.message);
    process.exit(1);
  }
}

// Step 6: Display Environment Variables
console.log('🔐 Step 6: Required Environment Variables');
console.log('=========================================');
console.log('Set these on your deployment platform:\n');
console.log('DATABASE_URL=<your_production_database_url>');
console.log('SESSION_SECRET=<your_production_secret>');
console.log('PRODUCTION_USER_COUNT=251');
console.log('USER_COUNT_STRATEGY=FIXED_COUNT');
console.log('LOCK_USER_COUNT=true');
console.log('NODE_ENV=production');
console.log('OPENAI_API_KEY=<your_openai_key> (optional)\n');

// Step 7: Platform-Specific Deployment
console.log(`🚀 Step 7: Deploying to ${config.platform}...`);
console.log('=========================================\n');

switch (config.platform) {
  case 'vercel':
    console.log('📦 Vercel Deployment Instructions:');
    console.log('1. Install Vercel CLI: npm i -g vercel');
    console.log('2. Login: vercel login');
    console.log('3. Deploy: vercel --prod');
    console.log('4. Set environment variables in Vercel dashboard');
    console.log('5. Verify deployment at your Vercel URL\n');
    
    console.log('Or run automatically:');
    console.log('  vercel --prod --env PRODUCTION_USER_COUNT=251 --env LOCK_USER_COUNT=true\n');
    break;
    
  case 'docker':
    console.log('🐳 Docker Deployment Instructions:');
    console.log('1. Build image: docker build -t preet-english:latest .');
    console.log('2. Run container:');
    console.log('   docker run -p 5000:5000 \\');
    console.log('     -e DATABASE_URL=<your_db_url> \\');
    console.log('     -e SESSION_SECRET=<your_secret> \\');
    console.log('     -e PRODUCTION_USER_COUNT=251 \\');
    console.log('     -e LOCK_USER_COUNT=true \\');
    console.log('     preet-english:latest\n');
    break;
    
  case 'manual':
    console.log('📋 Manual Deployment Instructions:');
    console.log('1. Copy dist/ directory to your server');
    console.log('2. Copy node_modules/ to your server');
    console.log('3. Copy package.json to your server');
    console.log('4. Set environment variables on server');
    console.log('5. Run: NODE_ENV=production node dist/index.cjs\n');
    break;
}

// Step 8: Post-Deployment Validation
console.log('✅ Step 8: Post-Deployment Validation');
console.log('=====================================');
console.log('After deployment, verify the following:\n');
console.log('1. Health Check:');
console.log('   curl https://your-app-url/api/health\n');
console.log('2. User Count:');
console.log('   curl https://your-app-url/api/users/count');
console.log('   Expected: {"count":251,"locked":true}\n');
console.log('3. Production Stats:');
console.log('   curl https://your-app-url/api/production/stats');
console.log('   Expected: {"success":true,"totalUsers":251,"strategy":"FIXED_COUNT","locked":true}\n');
console.log('4. Lessons:');
console.log('   curl https://your-app-url/api/lessons');
console.log('   Expected: Array of 1659 lessons\n');
console.log('5. UI Verification:');
console.log('   - Open app in browser');
console.log('   - Verify "Total Users" shows 251');
console.log('   - Reload page multiple times');
console.log('   - Confirm count remains 251\n');

// Step 9: Monitoring Setup
console.log('📊 Step 9: Monitoring Setup');
console.log('===========================');
console.log('Set up monitoring for:');
console.log('- User count consistency (should always be 251)');
console.log('- API response times (target < 100ms)');
console.log('- Error rates (target < 1%)');
console.log('- Lesson accessibility (target 100%)\n');

console.log('🎉 DEPLOYMENT PREPARATION COMPLETE!');
console.log('===================================');
console.log(`✅ Build ready in dist/`);
console.log(`✅ User count fixed at ${config.userCount}`);
console.log(`✅ Configuration validated`);
console.log(`✅ Ready for ${config.platform} deployment\n`);

console.log('📚 Documentation:');
console.log('- Full guide: PRODUCTION_DEPLOYMENT_GUIDE.md');
console.log('- Config: production-user-config.json');
console.log('- Validation: production-deployment-report.json\n');

console.log('🚀 Next: Deploy to your platform and run post-deployment validation!');
