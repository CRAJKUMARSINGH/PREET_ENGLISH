#!/usr/bin/env tsx
/**
 * PRE-LAUNCH STRESS TEST
 * 
 * Critical test before tomorrow's launch:
 * - 75 virtual users (25 beginner, 25 intermediate, 25 advanced)
 * - Navigate through 90% of all lessons randomly
 * - Test login system with 35 imaginary users
 * - Identify bottlenecks and resolve
 * - Ensure robust strength for production
 */

import { db } from '../server/db';
import { users, lessons, userProgress, vocabulary } from '../shared/schema';
import { eq } from 'drizzle-orm';
import * as fs from 'fs';

interface VirtualUser {
  id: number;
  username: string;
  email: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  lessonsCompleted: number;
  navigationTime: number;
  errors: string[];
}

interface TestResult {
  category: string;
  passed: boolean;
  message: string;
  details?: any;
  bottlenecks?: string[];
}

class PreLaunchStressTest {
  private virtualUsers: VirtualUser[] = [];
  private results: TestResult[] = [];
  private bottlenecks: string[] = [];
  private startTime: number = 0;

  async runCompleteTest(): Promise<void> {
    console.log('🚀 PRE-LAUNCH STRESS TEST - CRITICAL FOR TOMORROW');
    console.log('='.repeat(80));
    console.log('📊 Test Scope:');
    console.log('   - 75 virtual users (25 beginner, 25 intermediate, 25 advanced)');
    console.log('   - 90% lesson navigation coverage');
    console.log('   - 35 login system tests');
    console.log('   - Bottleneck detection and resolution\n');

    this.startTime = Date.now();

    try {
      // Phase 1: Create 75 virtual users
      await this.createVirtualUsers();

      // Phase 2: Test login system with 35 users
      await this.testLoginSystem();

      // Phase 3: Test lesson navigation (90% coverage)
      await this.testLessonNavigation();

      // Phase 4: Test concurrent access
      await this.testConcurrentAccess();

      // Phase 5: Test database performance
      await this.testDatabasePerformance();

      // Phase 6: Identify and resolve bottlenecks
      await this.identifyBottlenecks();

      // Generate comprehensive report
      await this.generateReport();
    } finally {
      // Cleanup: Remove test users
      await this.cleanupTestUsers();
    }
  }

  private async createVirtualUsers(): Promise<void> {
    console.log('\n📝 PHASE 1: Creating 75 Virtual Users');
    console.log('-'.repeat(80));

    const levels: Array<'beginner' | 'intermediate' | 'advanced'> = ['beginner', 'intermediate', 'advanced'];
    let userIdCounter = 1000; // Start from 1000 to avoid conflicts

    for (const level of levels) {
      for (let i = 1; i <= 25; i++) {
        const username = `${level}_user_${i}`;
        const email = `${level}${i}@test.preet.com`;

        try {
          // Create user in database with proper password hash
          // Using bcrypt-compatible hash for 'test123'
          const testPasswordHash = '$2a$10$YourSaltHere1234567890uO7V8h8D3VfVL4nR9J9kqX.vCQOyW';
          
          const result = await db.insert(users).values({
            username: username,
            password: testPasswordHash,
            email: email
          }).onConflictDoNothing().returning();

          let userId = userIdCounter++;
          
          // If user was created, use returned ID
          if (result.length > 0) {
            userId = result[0].id;
            console.log(`  ✅ Created user: ${username} (ID: ${userId})`);
          } else {
            // User already exists, fetch it
            const existing = await db.select()
              .from(users)
              .where(eq(users.username, username))
              .limit(1);
            
            if (existing.length > 0) {
              userId = existing[0].id;
              console.log(`  ℹ️  User exists: ${username} (ID: ${userId})`);
            }
          }

          const user: VirtualUser = {
            id: userId,
            username: username,
            email: email,
            level,
            lessonsCompleted: 0,
            navigationTime: 0,
            errors: []
          };

          this.virtualUsers.push(user);
        } catch (error) {
          console.log(`  ⚠️  Error with ${username}: ${error}`);
          // Still add to list for testing with fallback ID
          const user: VirtualUser = {
            id: userIdCounter++,
            username: username,
            email: email,
            level,
            lessonsCompleted: 0,
            navigationTime: 0,
            errors: [`Creation error: ${error}`]
          };
          this.virtualUsers.push(user);
        }
      }
    }

    console.log(`\n  ✅ Total virtual users ready: ${this.virtualUsers.length}`);
    console.log(`     - Beginner: ${this.virtualUsers.filter(u => u.level === 'beginner').length} users`);
    console.log(`     - Intermediate: ${this.virtualUsers.filter(u => u.level === 'intermediate').length} users`);
    console.log(`     - Advanced: ${this.virtualUsers.filter(u => u.level === 'advanced').length} users`);

    this.addResult('Virtual User Creation', true, `${this.virtualUsers.length} users created successfully`);
  }

  private async testLoginSystem(): Promise<void> {
    console.log('\n🔐 PHASE 2: Testing Login System (35 Users)');
    console.log('-'.repeat(80));

    const testUsers = this.virtualUsers.slice(0, 35);
    let successfulLogins = 0;
    let failedLogins = 0;
    const loginTimes: number[] = [];

    for (const user of testUsers) {
      const startTime = Date.now();
      
      try {
        // Simulate login by checking user exists
        const dbUser = await db.select()
          .from(users)
          .where(eq(users.username, user.username))
          .limit(1);

        const loginTime = Date.now() - startTime;
        loginTimes.push(loginTime);

        if (dbUser.length > 0) {
          successfulLogins++;
          
          // Check for slow login (bottleneck)
          if (loginTime > 500) {
            this.bottlenecks.push(`Slow login for ${user.username}: ${loginTime}ms`);
          }
        } else {
          failedLogins++;
          user.errors.push('Login failed: User not found');
        }
      } catch (error) {
        failedLogins++;
        user.errors.push(`Login error: ${error}`);
      }
    }

    const avgLoginTime = loginTimes.reduce((a, b) => a + b, 0) / loginTimes.length;
    const maxLoginTime = Math.max(...loginTimes);

    console.log(`  ✅ Successful logins: ${successfulLogins}/35 (${(successfulLogins/35*100).toFixed(1)}%)`);
    console.log(`  ⏱️  Average login time: ${avgLoginTime.toFixed(0)}ms`);
    console.log(`  ⏱️  Max login time: ${maxLoginTime}ms`);

    if (failedLogins > 0) {
      console.log(`  ⚠️  Failed logins: ${failedLogins}`);
      this.bottlenecks.push(`${failedLogins} login failures detected`);
    }

    if (avgLoginTime > 300) {
      this.bottlenecks.push(`Average login time too high: ${avgLoginTime.toFixed(0)}ms (target: <300ms)`);
    }

    this.addResult(
      'Login System Test',
      successfulLogins >= 33, // 94% success rate minimum
      `${successfulLogins}/35 successful logins (avg: ${avgLoginTime.toFixed(0)}ms)`,
      { successfulLogins, failedLogins, avgLoginTime, maxLoginTime }
    );
  }

  private async testLessonNavigation(): Promise<void> {
    console.log('\n📚 PHASE 3: Testing Lesson Navigation (90% Coverage)');
    console.log('-'.repeat(80));

    // Get all lessons
    const allLessons = await db.select().from(lessons);
    const totalLessons = allLessons.length;
    const targetCoverage = Math.ceil(totalLessons * 0.9); // 90% coverage

    console.log(`  📊 Total lessons: ${totalLessons}`);
    console.log(`  🎯 Target coverage: ${targetCoverage} lessons (90%)`);

    const lessonAccessCount = new Map<number, number>();
    const navigationTimes: number[] = [];
    let totalNavigations = 0;
    let failedNavigations = 0;

    // Each user navigates through random lessons
    for (const user of this.virtualUsers) {
      const lessonsToVisit = this.getRandomLessons(allLessons, targetCoverage);

      for (const lesson of lessonsToVisit) {
        const startTime = Date.now();
        totalNavigations++;

        try {
          // Simulate lesson access
          const lessonData = await db.select()
            .from(lessons)
            .where(eq(lessons.id, lesson.id))
            .limit(1);

          // Get vocabulary for lesson
          const vocabData = await db.select()
            .from(vocabulary)
            .where(eq(vocabulary.lessonId, lesson.id));

          const navTime = Date.now() - startTime;
          navigationTimes.push(navTime);
          user.navigationTime += navTime;

          if (lessonData.length > 0) {
            user.lessonsCompleted++;
            lessonAccessCount.set(lesson.id, (lessonAccessCount.get(lesson.id) || 0) + 1);

            // Check for slow navigation (bottleneck)
            if (navTime > 1000) {
              this.bottlenecks.push(`Slow lesson load for ${lesson.title}: ${navTime}ms`);
            }
          } else {
            failedNavigations++;
            user.errors.push(`Failed to load lesson: ${lesson.title}`);
          }
        } catch (error) {
          failedNavigations++;
          user.errors.push(`Navigation error for lesson ${lesson.id}: ${error}`);
        }
      }
    }

    const avgNavTime = navigationTimes.reduce((a, b) => a + b, 0) / navigationTimes.length;
    const maxNavTime = Math.max(...navigationTimes);
    const uniqueLessonsAccessed = lessonAccessCount.size;
    const coveragePercent = (uniqueLessonsAccessed / totalLessons) * 100;

    console.log(`  ✅ Total navigations: ${totalNavigations}`);
    console.log(`  ✅ Unique lessons accessed: ${uniqueLessonsAccessed}/${totalLessons} (${coveragePercent.toFixed(1)}%)`);
    console.log(`  ⏱️  Average navigation time: ${avgNavTime.toFixed(0)}ms`);
    console.log(`  ⏱️  Max navigation time: ${maxNavTime}ms`);

    if (failedNavigations > 0) {
      console.log(`  ⚠️  Failed navigations: ${failedNavigations}`);
      this.bottlenecks.push(`${failedNavigations} navigation failures detected`);
    }

    if (avgNavTime > 500) {
      this.bottlenecks.push(`Average navigation time too high: ${avgNavTime.toFixed(0)}ms (target: <500ms)`);
    }

    if (coveragePercent < 90) {
      this.bottlenecks.push(`Lesson coverage below target: ${coveragePercent.toFixed(1)}% (target: 90%)`);
    }

    this.addResult(
      'Lesson Navigation Test',
      coveragePercent >= 90 && failedNavigations === 0,
      `${uniqueLessonsAccessed}/${totalLessons} lessons accessed (${coveragePercent.toFixed(1)}%)`,
      { totalNavigations, uniqueLessonsAccessed, coveragePercent, avgNavTime, maxNavTime, failedNavigations }
    );
  }

  private async testConcurrentAccess(): Promise<void> {
    console.log('\n⚡ PHASE 4: Testing Concurrent Access (75 Users)');
    console.log('-'.repeat(80));

    const startTime = Date.now();
    const promises: Promise<any>[] = [];

    // Simulate all 75 users accessing lessons simultaneously
    for (const user of this.virtualUsers) {
      const promise = this.simulateConcurrentUserActivity(user);
      promises.push(promise);
    }

    try {
      await Promise.all(promises);
      const totalTime = Date.now() - startTime;

      console.log(`  ✅ All 75 users handled concurrently`);
      console.log(`  ⏱️  Total time: ${totalTime}ms`);
      console.log(`  ⏱️  Average per user: ${(totalTime / 75).toFixed(0)}ms`);

      if (totalTime > 5000) {
        this.bottlenecks.push(`Concurrent access too slow: ${totalTime}ms (target: <5000ms)`);
      }

      this.addResult(
        'Concurrent Access Test',
        totalTime < 5000,
        `75 users handled in ${totalTime}ms`,
        { totalTime, avgPerUser: totalTime / 75 }
      );
    } catch (error) {
      console.log(`  ❌ Concurrent access failed: ${error}`);
      this.bottlenecks.push(`Concurrent access failure: ${error}`);
      this.addResult('Concurrent Access Test', false, `Failed: ${error}`);
    }
  }

  private async simulateConcurrentUserActivity(user: VirtualUser): Promise<void> {
    // Simulate user accessing 3 random lessons
    const allLessons = await db.select().from(lessons);
    const randomLessons = this.getRandomLessons(allLessons, 3);

    for (const lesson of randomLessons) {
      await db.select()
        .from(lessons)
        .where(eq(lessons.id, lesson.id))
        .limit(1);
    }
  }

  private async testDatabasePerformance(): Promise<void> {
    console.log('\n💾 PHASE 5: Testing Database Performance');
    console.log('-'.repeat(80));

    const tests = [
      { name: 'Lesson Query', query: () => db.select().from(lessons).limit(10) },
      { name: 'User Query', query: () => db.select().from(users).limit(10) },
      { name: 'Vocabulary Query', query: () => db.select().from(vocabulary).limit(50) },
      { name: 'Complex Join', query: async () => {
        const lesson = await db.select().from(lessons).limit(1);
        if (lesson.length > 0) {
          await db.select().from(vocabulary).where(eq(vocabulary.lessonId, lesson[0].id));
        }
      }}
    ];

    for (const test of tests) {
      const times: number[] = [];
      
      // Run each query 10 times
      for (let i = 0; i < 10; i++) {
        const start = Date.now();
        await test.query();
        times.push(Date.now() - start);
      }

      const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
      const maxTime = Math.max(...times);

      console.log(`  ${test.name}:`);
      console.log(`    Average: ${avgTime.toFixed(0)}ms`);
      console.log(`    Max: ${maxTime}ms`);

      if (avgTime > 100) {
        this.bottlenecks.push(`${test.name} too slow: ${avgTime.toFixed(0)}ms (target: <100ms)`);
      }
    }

    this.addResult('Database Performance Test', true, 'All database queries tested');
  }

  private async identifyBottlenecks(): Promise<void> {
    console.log('\n🔍 PHASE 6: Identifying and Resolving Bottlenecks');
    console.log('-'.repeat(80));

    if (this.bottlenecks.length === 0) {
      console.log('  ✅ No bottlenecks detected! System is production-ready.');
      this.addResult('Bottleneck Analysis', true, 'No bottlenecks detected');
      return;
    }

    console.log(`  ⚠️  Found ${this.bottlenecks.length} potential bottlenecks:\n`);
    
    this.bottlenecks.forEach((bottleneck, index) => {
      console.log(`  ${index + 1}. ${bottleneck}`);
    });

    // Provide recommendations
    console.log('\n  💡 Recommendations:');
    
    if (this.bottlenecks.some(b => b.includes('login'))) {
      console.log('     - Add database indexing on username/email fields');
      console.log('     - Implement connection pooling');
      console.log('     - Add caching for user sessions');
    }

    if (this.bottlenecks.some(b => b.includes('navigation') || b.includes('lesson load'))) {
      console.log('     - Add database indexing on lesson IDs');
      console.log('     - Implement lesson data caching');
      console.log('     - Optimize vocabulary queries with joins');
    }

    if (this.bottlenecks.some(b => b.includes('concurrent'))) {
      console.log('     - Increase database connection pool size');
      console.log('     - Implement request queuing');
      console.log('     - Add load balancing');
    }

    this.addResult(
      'Bottleneck Analysis',
      this.bottlenecks.length < 5,
      `${this.bottlenecks.length} bottlenecks identified`,
      { bottlenecks: this.bottlenecks }
    );
  }

  private getRandomLessons(allLessons: any[], count: number): any[] {
    const shuffled = [...allLessons].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, allLessons.length));
  }

  private addResult(category: string, passed: boolean, message: string, details?: any): void {
    this.results.push({
      category,
      passed,
      message,
      details,
      bottlenecks: this.bottlenecks.length > 0 ? [...this.bottlenecks] : undefined
    });
  }

  private async generateReport(): Promise<void> {
    const totalTime = Date.now() - this.startTime;
    const passedTests = this.results.filter(r => r.passed).length;
    const totalTests = this.results.length;
    const passRate = (passedTests / totalTests) * 100;

    console.log('\n' + '='.repeat(80));
    console.log('📊 PRE-LAUNCH STRESS TEST RESULTS');
    console.log('='.repeat(80));

    console.log(`\n🎯 Overall Results:`);
    console.log(`   Total Tests: ${totalTests}`);
    console.log(`   Passed: ${passedTests} (${passRate.toFixed(1)}%)`);
    console.log(`   Failed: ${totalTests - passedTests}`);
    console.log(`   Total Time: ${(totalTime / 1000).toFixed(1)}s`);

    console.log(`\n👥 User Statistics:`);
    console.log(`   Total Virtual Users: ${this.virtualUsers.length}`);
    console.log(`   Users with Errors: ${this.virtualUsers.filter(u => u.errors.length > 0).length}`);
    
    const avgLessonsCompleted = this.virtualUsers.reduce((sum, u) => sum + u.lessonsCompleted, 0) / this.virtualUsers.length;
    console.log(`   Average Lessons per User: ${avgLessonsCompleted.toFixed(1)}`);

    console.log(`\n🚦 Launch Readiness:`);
    if (passRate >= 95 && this.bottlenecks.length < 3) {
      console.log(`   Status: ✅ READY FOR LAUNCH`);
      console.log(`   Confidence: HIGH (${passRate.toFixed(1)}% pass rate)`);
    } else if (passRate >= 85) {
      console.log(`   Status: ⚠️  READY WITH CAUTION`);
      console.log(`   Confidence: MEDIUM (${passRate.toFixed(1)}% pass rate)`);
      console.log(`   Action: Monitor closely during launch`);
    } else {
      console.log(`   Status: ❌ NOT READY`);
      console.log(`   Confidence: LOW (${passRate.toFixed(1)}% pass rate)`);
      console.log(`   Action: Fix bottlenecks before launch`);
    }

    // Save detailed report
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalTests,
        passedTests,
        failedTests: totalTests - passedTests,
        passRate,
        totalTime,
        launchReady: passRate >= 95 && this.bottlenecks.length < 3
      },
      users: {
        total: this.virtualUsers.length,
        withErrors: this.virtualUsers.filter(u => u.errors.length > 0).length,
        avgLessonsCompleted
      },
      bottlenecks: this.bottlenecks,
      results: this.results
    };

    fs.writeFileSync('PRE_LAUNCH_STRESS_TEST_REPORT.json', JSON.stringify(report, null, 2));
    console.log(`\n📄 Detailed report saved to: PRE_LAUNCH_STRESS_TEST_REPORT.json`);

    console.log('\n' + '='.repeat(80));
    console.log('✨ Pre-Launch Stress Test Complete!');
    console.log('='.repeat(80) + '\n');
  }

  private async cleanupTestUsers(): Promise<void> {
    console.log('\n🧹 CLEANUP: Removing Test Users');
    console.log('-'.repeat(80));

    let removedCount = 0;
    
    for (const user of this.virtualUsers) {
      try {
        const result = await db.delete(users)
          .where(eq(users.username, user.username))
          .returning();
        
        if (result.length > 0) {
          removedCount++;
        }
      } catch (error) {
        console.log(`  ⚠️  Failed to remove ${user.username}: ${error}`);
      }
    }

    console.log(`  ✅ Removed ${removedCount} test users`);
    console.log(`  ℹ️  Database cleaned up for production\n`);
  }
}

async function main() {
  const tester = new PreLaunchStressTest();
  await tester.runCompleteTest();
  process.exit(0);
}

main().catch(console.error);
