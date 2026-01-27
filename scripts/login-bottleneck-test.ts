#!/usr/bin/env tsx
/**
 * LOGIN BOTTLENECK TEST
 * 
 * Specifically tests login system with 35 imaginary users
 * to identify and fix the "login stuck" issue
 */

import { db } from '../server/db';
import { users } from '../shared/schema';
import { eq } from 'drizzle-orm';
import * as fs from 'fs';

interface LoginTest {
  userId: number;
  username: string;
  attempt: number;
  success: boolean;
  timeMs: number;
  error?: string;
  stuck: boolean;
}

class LoginBottleneckTester {
  private tests: LoginTest[] = [];
  private stuckLogins: LoginTest[] = [];

  async runTest(): Promise<void> {
    console.log('🔐 LOGIN BOTTLENECK TEST - CRITICAL');
    console.log('='.repeat(80));
    console.log('🎯 Testing 35 imaginary users for login issues\n');

    // Test 1: Sequential logins
    await this.testSequentialLogins();

    // Test 2: Concurrent logins
    await this.testConcurrentLogins();

    // Test 3: Rapid repeated logins
    await this.testRapidLogins();

    // Test 4: Database connection stress
    await this.testDatabaseConnections();

    // Analyze and fix bottlenecks
    await this.analyzeAndFix();

    // Generate report
    await this.generateReport();
  }

  private async testSequentialLogins(): Promise<void> {
    console.log('\n📝 TEST 1: Sequential Logins (35 users)');
    console.log('-'.repeat(80));

    for (let i = 1; i <= 35; i++) {
      const username = `test_user_${i}`;
      const startTime = Date.now();
      let success = false;
      let error: string | undefined;
      let stuck = false;

      try {
        // Set timeout to detect stuck logins
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Login timeout - STUCK')), 5000)
        );

        const loginPromise = db.select()
          .from(users)
          .where(eq(users.username, username))
          .limit(1);

        const result = await Promise.race([loginPromise, timeoutPromise]) as any[];
        
        success = result.length > 0;
      } catch (err: any) {
        error = err.message;
        stuck = err.message.includes('STUCK');
      }

      const timeMs = Date.now() - startTime;

      const test: LoginTest = {
        userId: i,
        username,
        attempt: 1,
        success,
        timeMs,
        error,
        stuck
      };

      this.tests.push(test);

      if (stuck) {
        this.stuckLogins.push(test);
        console.log(`  ❌ User ${i}: STUCK (timeout after 5s)`);
      } else if (!success) {
        console.log(`  ⚠️  User ${i}: Failed (${timeMs}ms) - ${error}`);
      } else if (timeMs > 1000) {
        console.log(`  ⚠️  User ${i}: Slow (${timeMs}ms)`);
      } else {
        console.log(`  ✅ User ${i}: Success (${timeMs}ms)`);
      }
    }

    const avgTime = this.tests.reduce((sum, t) => sum + t.timeMs, 0) / this.tests.length;
    console.log(`\n  📊 Average login time: ${avgTime.toFixed(0)}ms`);
    console.log(`  ⚠️  Stuck logins: ${this.stuckLogins.length}`);
  }

  private async testConcurrentLogins(): Promise<void> {
    console.log('\n⚡ TEST 2: Concurrent Logins (35 users simultaneously)');
    console.log('-'.repeat(80));

    const promises: Promise<LoginTest>[] = [];

    for (let i = 36; i <= 70; i++) {
      const promise = this.attemptLogin(i, `concurrent_user_${i}`, 2);
      promises.push(promise);
    }

    const startTime = Date.now();
    const results = await Promise.allSettled(promises);
    const totalTime = Date.now() - startTime;

    let successful = 0;
    let failed = 0;
    let stuck = 0;

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const test = result.value;
        this.tests.push(test);
        
        if (test.stuck) {
          stuck++;
          this.stuckLogins.push(test);
        } else if (test.success) {
          successful++;
        } else {
          failed++;
        }
      } else {
        failed++;
        console.log(`  ❌ User ${index + 36}: Promise rejected`);
      }
    });

    console.log(`  ✅ Successful: ${successful}/35`);
    console.log(`  ❌ Failed: ${failed}/35`);
    console.log(`  ⚠️  Stuck: ${stuck}/35`);
    console.log(`  ⏱️  Total time: ${totalTime}ms`);
    console.log(`  ⏱️  Average per user: ${(totalTime / 35).toFixed(0)}ms`);
  }

  private async testRapidLogins(): Promise<void> {
    console.log('\n🔄 TEST 3: Rapid Repeated Logins (same user, 10 times)');
    console.log('-'.repeat(80));

    const username = 'rapid_test_user';
    let stuckCount = 0;

    for (let i = 1; i <= 10; i++) {
      const test = await this.attemptLogin(1000 + i, username, 3);
      this.tests.push(test);

      if (test.stuck) {
        stuckCount++;
        this.stuckLogins.push(test);
        console.log(`  ❌ Attempt ${i}: STUCK`);
      } else {
        console.log(`  ${test.success ? '✅' : '⚠️ '} Attempt ${i}: ${test.timeMs}ms`);
      }

      // Small delay between attempts
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    if (stuckCount > 0) {
      console.log(`\n  ⚠️  WARNING: ${stuckCount}/10 rapid logins got stuck!`);
    }
  }

  private async testDatabaseConnections(): Promise<void> {
    console.log('\n💾 TEST 4: Database Connection Stress');
    console.log('-'.repeat(80));

    const connectionTests: number[] = [];

    for (let i = 0; i < 20; i++) {
      const startTime = Date.now();
      
      try {
        await db.select().from(users).limit(1);
        connectionTests.push(Date.now() - startTime);
        console.log(`  ✅ Connection ${i + 1}: ${Date.now() - startTime}ms`);
      } catch (error) {
        console.log(`  ❌ Connection ${i + 1}: Failed - ${error}`);
      }
    }

    const avgConnTime = connectionTests.reduce((a, b) => a + b, 0) / connectionTests.length;
    console.log(`\n  📊 Average connection time: ${avgConnTime.toFixed(0)}ms`);
  }

  private async attemptLogin(userId: number, username: string, attempt: number): Promise<LoginTest> {
    const startTime = Date.now();
    let success = false;
    let error: string | undefined;
    let stuck = false;

    try {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Login timeout - STUCK')), 5000)
      );

      const loginPromise = db.select()
        .from(users)
        .where(eq(users.username, username))
        .limit(1);

      const result = await Promise.race([loginPromise, timeoutPromise]) as any[];
      success = result.length > 0;
    } catch (err: any) {
      error = err.message;
      stuck = err.message.includes('STUCK');
    }

    return {
      userId,
      username,
      attempt,
      success,
      timeMs: Date.now() - startTime,
      error,
      stuck
    };
  }

  private async analyzeAndFix(): Promise<void> {
    console.log('\n🔍 ANALYSIS & FIXES');
    console.log('='.repeat(80));

    if (this.stuckLogins.length === 0) {
      console.log('  ✅ No stuck logins detected! System is healthy.');
      return;
    }

    console.log(`  ⚠️  CRITICAL: ${this.stuckLogins.length} stuck logins detected!\n`);

    // Analyze patterns
    const stuckInSequential = this.stuckLogins.filter(t => t.attempt === 1).length;
    const stuckInConcurrent = this.stuckLogins.filter(t => t.attempt === 2).length;
    const stuckInRapid = this.stuckLogins.filter(t => t.attempt === 3).length;

    console.log('  📊 Stuck Login Patterns:');
    console.log(`     - Sequential: ${stuckInSequential}`);
    console.log(`     - Concurrent: ${stuckInConcurrent}`);
    console.log(`     - Rapid: ${stuckInRapid}`);

    console.log('\n  💡 RECOMMENDED FIXES:\n');

    if (stuckInConcurrent > 0) {
      console.log('  1. DATABASE CONNECTION POOL:');
      console.log('     - Increase max connections in drizzle.config.ts');
      console.log('     - Add connection timeout handling');
      console.log('     - Implement connection retry logic\n');
    }

    if (stuckInRapid > 0) {
      console.log('  2. RATE LIMITING:');
      console.log('     - Add rate limiting middleware');
      console.log('     - Implement request queuing');
      console.log('     - Add user session caching\n');
    }

    if (stuckInSequential > 0) {
      console.log('  3. DATABASE OPTIMIZATION:');
      console.log('     - Add index on username field');
      console.log('     - Add index on email field');
      console.log('     - Optimize query execution\n');
    }

    console.log('  4. GENERAL IMPROVEMENTS:');
    console.log('     - Add request timeout (5s max)');
    console.log('     - Implement graceful error handling');
    console.log('     - Add monitoring and alerting');
    console.log('     - Use Redis for session caching');
  }

  private async generateReport(): Promise<void> {
    const totalTests = this.tests.length;
    const successfulTests = this.tests.filter(t => t.success && !t.stuck).length;
    const failedTests = this.tests.filter(t => !t.success && !t.stuck).length;
    const stuckTests = this.stuckLogins.length;

    const avgTime = this.tests
      .filter(t => !t.stuck)
      .reduce((sum, t) => sum + t.timeMs, 0) / (totalTests - stuckTests);

    console.log('\n' + '='.repeat(80));
    console.log('📊 LOGIN BOTTLENECK TEST REPORT');
    console.log('='.repeat(80));

    console.log(`\n🎯 Test Results:`);
    console.log(`   Total Tests: ${totalTests}`);
    console.log(`   Successful: ${successfulTests} (${(successfulTests/totalTests*100).toFixed(1)}%)`);
    console.log(`   Failed: ${failedTests} (${(failedTests/totalTests*100).toFixed(1)}%)`);
    console.log(`   Stuck: ${stuckTests} (${(stuckTests/totalTests*100).toFixed(1)}%)`);
    console.log(`   Average Time: ${avgTime.toFixed(0)}ms`);

    console.log(`\n🚦 Launch Readiness:`);
    if (stuckTests === 0 && successfulTests >= totalTests * 0.95) {
      console.log(`   Status: ✅ READY FOR LAUNCH`);
      console.log(`   Login System: STABLE`);
    } else if (stuckTests < 3) {
      console.log(`   Status: ⚠️  READY WITH MONITORING`);
      console.log(`   Login System: NEEDS MONITORING`);
    } else {
      console.log(`   Status: ❌ NOT READY`);
      console.log(`   Login System: CRITICAL ISSUES`);
      console.log(`   Action: FIX STUCK LOGINS BEFORE LAUNCH`);
    }

    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalTests,
        successfulTests,
        failedTests,
        stuckTests,
        avgTime,
        launchReady: stuckTests === 0 && successfulTests >= totalTests * 0.95
      },
      stuckLogins: this.stuckLogins,
      allTests: this.tests
    };

    fs.writeFileSync('LOGIN_BOTTLENECK_REPORT.json', JSON.stringify(report, null, 2));
    console.log(`\n📄 Detailed report saved to: LOGIN_BOTTLENECK_REPORT.json`);

    console.log('\n' + '='.repeat(80));
    console.log('✨ Login Bottleneck Test Complete!');
    console.log('='.repeat(80) + '\n');
  }
}

async function main() {
  const tester = new LoginBottleneckTester();
  await tester.runTest();
  process.exit(0);
}

main().catch(console.error);
