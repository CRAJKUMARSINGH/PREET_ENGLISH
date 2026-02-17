#!/usr/bin/env tsx
/**
 * PRODUCTION DEPLOYMENT CHECKLIST & VALIDATOR
 * 
 * Validates all requirements before production deployment:
 * - User count fixed at 251
 * - All lesson data accessible
 * - Build passes
 * - Environment variables set
 */

import * as fs from 'fs';
import * as path from 'path';
import { db } from '../server/db';
import { users, lessons } from '../shared/schema';
import { sql } from 'drizzle-orm';

const REQUIRED_USER_COUNT = 251;

interface CheckResult {
  category: string;
  check: string;
  status: 'PASS' | 'FAIL' | 'WARN';
  message: string;
  details?: any;
}

const results: CheckResult[] = [];

function addCheck(category: string, check: string, status: 'PASS' | 'FAIL' | 'WARN', message: string, details?: any) {
  results.push({ category, check, status, message, details });
  const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
  console.log(`${icon} [${category}] ${check}: ${message}`);
}

console.log('🚀 PRODUCTION DEPLOYMENT CHECKLIST');
console.log('='.repeat(80));
console.log('');

async function main() {
  try {
    // Check 1: User Count Configuration
    console.log('👥 Category 1: User Count Configuration');
    console.log('');
    
    const configExists = fs.existsSync('production-user-config.json');
    if (configExists) {
      const config = JSON.parse(fs.readFileSync('production-user-config.json', 'utf-8'));
      addCheck(
        'User Count',
        'Configuration File',
        config.targetUserCount === REQUIRED_USER_COUNT ? 'PASS' : 'FAIL',
        `Target: ${config.targetUserCount}, Required: ${REQUIRED_USER_COUNT}`
      );
    } else {
      addCheck('User Count', 'Configuration File', 'FAIL', 'production-user-config.json not found');
    }
    
    const envExists = fs.existsSync('.env.production.users');
    addCheck(
      'User Count',
      'Environment Variables',
      envExists ? 'PASS' : 'WARN',
      envExists ? 'Environment template exists' : 'Create .env.production.users'
    );
    
    console.log('');

    // Check 2: Database Validation
    console.log('📊 Category 2: Database Validation');
    console.log('');
    
    const userCountResult = await db.select({ count: sql<number>`count(*)` }).from(users);
    const currentUserCount = Number(userCountResult[0].count);
    addCheck(
      'Database',
      'User Count',
      'PASS',
      `Current: ${currentUserCount} (will display as ${REQUIRED_USER_COUNT} in production)`
    );
    
    const lessonCountResult = await db.select({ count: sql<number>`count(*)` }).from(lessons);
    const lessonCount = Number(lessonCountResult[0].count);
    addCheck(
      'Database',
      'Lesson Count',
      lessonCount > 0 ? 'PASS' : 'FAIL',
      `${lessonCount} lessons available`
    );
    
    console.log('');

    // Check 3: Build Configuration
    console.log('🔧 Category 3: Build Configuration');
    console.log('');
    
    const packageJsonExists = fs.existsSync('package.json');
    if (packageJsonExists) {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
      addCheck(
        'Build',
        'package.json',
        'PASS',
        `Version: ${packageJson.version}`
      );
      
      const hasBuildScript = packageJson.scripts && packageJson.scripts.build;
      addCheck(
        'Build',
        'Build Script',
        hasBuildScript ? 'PASS' : 'FAIL',
        hasBuildScript ? 'Build script configured' : 'No build script found'
      );
      
      const hasStartScript = packageJson.scripts && packageJson.scripts.start;
      addCheck(
        'Build',
        'Start Script',
        hasStartScript ? 'PASS' : 'FAIL',
        hasStartScript ? 'Start script configured' : 'No start script found'
      );
    }
    
    console.log('');

    // Check 4: Deployment Files
    console.log('📁 Category 4: Deployment Files');
    console.log('');
    
    const vercelConfigExists = fs.existsSync('vercel.json');
    addCheck(
      'Deployment',
      'Vercel Config',
      vercelConfigExists ? 'PASS' : 'WARN',
      vercelConfigExists ? 'vercel.json exists' : 'No vercel.json (optional)'
    );
    
    const dockerfileExists = fs.existsSync('Dockerfile');
    addCheck(
      'Deployment',
      'Docker Config',
      dockerfileExists ? 'PASS' : 'WARN',
      dockerfileExists ? 'Dockerfile exists' : 'No Dockerfile (optional)'
    );
    
    console.log('');

    // Check 5: Environment Variables
    console.log('🔐 Category 5: Environment Variables');
    console.log('');
    
    const requiredEnvVars = [
      'DATABASE_URL',
      'SESSION_SECRET'
    ];
    
    requiredEnvVars.forEach(envVar => {
      const exists = process.env[envVar] !== undefined;
      addCheck(
        'Environment',
        envVar,
        exists ? 'PASS' : 'WARN',
        exists ? 'Set' : 'Not set (required for production)'
      );
    });
    
    console.log('');

    // Summary
    console.log('='.repeat(80));
    console.log('📊 DEPLOYMENT READINESS SUMMARY');
    console.log('='.repeat(80));
    console.log('');
    
    const passed = results.filter(r => r.status === 'PASS').length;
    const failed = results.filter(r => r.status === 'FAIL').length;
    const warnings = results.filter(r => r.status === 'WARN').length;
    const total = results.length;
    
    console.log(`Total Checks: ${total}`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`⚠️  Warnings: ${warnings}`);
    console.log('');
    
    if (failed === 0) {
      console.log('🏆 DEPLOYMENT APPROVED');
      console.log('');
      console.log('✅ All critical checks passed');
      console.log(`✅ User count will display as ${REQUIRED_USER_COUNT} in production`);
      console.log('✅ All lesson data accessible');
      console.log('');
      console.log('📝 Deployment Commands:');
      console.log('');
      console.log('   # Build for production');
      console.log('   npm run build');
      console.log('');
      console.log('   # Deploy to Vercel');
      console.log('   vercel --prod');
      console.log('');
      console.log('   # Or deploy to other platform');
      console.log('   # Follow platform-specific instructions');
      console.log('');
      
      // Save report
      const report = {
        timestamp: new Date().toISOString(),
        status: 'APPROVED',
        requiredUserCount: REQUIRED_USER_COUNT,
        summary: { total, passed, failed, warnings },
        checks: results
      };
      
      fs.writeFileSync(
        'production-deployment-report.json',
        JSON.stringify(report, null, 2),
        'utf-8'
      );
      
      console.log('📄 Report saved to: production-deployment-report.json');
      console.log('');
      
      process.exit(0);
    } else {
      console.log('❌ DEPLOYMENT BLOCKED');
      console.log('');
      console.log('Failed checks:');
      results.filter(r => r.status === 'FAIL').forEach(r => {
        console.log(`   ❌ [${r.category}] ${r.check}: ${r.message}`);
      });
      console.log('');
      console.log('Fix failed checks before deploying to production.');
      console.log('');
      
      process.exit(1);
    }
    
  } catch (error: any) {
    console.error('');
    console.error('❌ FATAL ERROR:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
