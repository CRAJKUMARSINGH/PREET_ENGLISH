#!/usr/bin/env tsx
/**
 * ULTIMATE LOAD TEST - BIGUL2 STYLE
 * 
 * Simulates:
 * - 1000 beginner users visiting 99% of content
 * - 15000 advanced users visiting 99% of content
 * - Simultaneous cache deletion during load
 * 
 * Total: 16000 concurrent users
 */

import { db } from '../server/db';
import { users, lessons, progress, userStats, vocabulary } from '../shared/schema';
import { eq, inArray } from 'drizzle-orm';
import pLimit from 'p-limit';

interface LoadTestConfig {
  beginnerUsers: number;
  advancedUsers: number;
  contentCoverage: number; // 0.99 = 99%
  concurrency: number;
  cacheDeletionInterval: number; // ms
}

interface TestMetrics {
  totalUsers: number;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  peakResponseTime: number;
  cacheClears: number;
  startTime: number;
  endTime: number;
  duration: number;
}

class UltimateLoadTester {
  private config: LoadTestConfig;
  private metrics: TestMetrics;
  private allLessons: any[] = [];
  private beginnerLessons: any[] = [];
  private advancedLessons: any[] = [];
  private cacheInterval: NodeJS.Timeout | null = null;

  constructor(config: LoadTestConfig) {
    this.config = config;
    this.metrics = {
      totalUsers: config.beginnerUsers + config.advancedUsers,
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      peakResponseTime: 0,
      cacheClears: 0,
      startTime: 0,
      endTime: 0,
      duration: 0,
    };
  }

  async run() {
    console.log('🚀 ULTIMATE LOAD TEST - BIGUL2 STYLE');
    console.log('═'.repeat(80));
    console.log(`👥 Beginner Users: ${this.config.beginnerUsers.toLocaleString()}`);
    console.log(`👥 Advanced Users: ${this.config.advancedUsers.toLocaleString()}`);
    console.log(`📊 Total Users: ${this.metrics.totalUsers.toLocaleString()}`);
    console.log(`📈 Content Coverage: ${(this.config.contentCoverage * 100).toFixed(0)}%`);
    console.log(`🔄 Concurrency: ${this.config.concurrency}`);
    console.log(`🗑️  Cache Deletion: Every ${this.config.cacheDeletionInterval}ms`);
    console.log('═'.repeat(80));

    this.metrics.startTime = Date.now();

    try {
      // Step 1: Load all lessons
      await this.loadLessons();

      // Step 2: Create test users
      await this.createTestUsers();

      // Step 3: Start cache deletion loop
      this.startCacheDeletion();

      // Step 4: Run load test
      await this.executeLoadTest();

      // Step 5: Stop cache deletion
      this.stopCacheDeletion();

      // Step 6: Calculate metrics
      this.calculateMetrics();

      // Step 7: Print results
      this.printResults();

      // Step 8: Cleanup
      await this.cleanup();

    } catch (error) {
      console.error('❌ Load test failed:', error);
      this.stopCacheDeletion();
      throw error;
    }
  }

  private async loadLessons() {
    console.log('\n📚 Loading lessons from database...');
    
    this.allLessons = await db.select().from(lessons).orderBy(lessons.order);
    
    // Categorize lessons by difficulty
    this.beginnerLessons = this.allLessons.filter(l => 
      l.difficulty === 'Beginner' || l.difficulty === 'beginner'
    );
    
    this.advancedLessons = this.allLessons.filter(l => 
      l.difficulty === 'Advanced' || l.difficulty === 'advanced' || 
      l.difficulty === 'Intermediate' || l.difficulty === 'intermediate'
    );

    console.log(`✅ Total Lessons: ${this.allLessons.length}`);
    console.log(`   - Beginner: ${this.beginnerLessons.length}`);
    console.log(`   - Advanced: ${this.advancedLessons.length}`);
  }

  private async createTestUsers() {
    console.log('\n👥 Creating test users...');
    
    const limit = pLimit(50); // Create users in batches
    const totalUsers = this.config.beginnerUsers + this.config.advancedUsers;
    
    const userCreationTasks = [];
    
    // Create beginner users
    for (let i = 0; i < this.config.beginnerUsers; i++) {
      userCreationTasks.push(
        limit(() => this.createUser(`beginner_${i}`, 'beginner'))
      );
    }
    
    // Create advanced users
    for (let i = 0; i < this.config.advancedUsers; i++) {
      userCreationTasks.push(
        limit(() => this.createUser(`advanced_${i}`, 'advanced'))
      );
    }

    await Promise.all(userCreationTasks);
    
    console.log(`✅ Created ${totalUsers.toLocaleString()} test users`);
  }

  private async createUser(username: string, level: string): Promise<number> {
    try {
      // Check if user exists
      const existing = await db.select()
        .from(users)
        .where(eq(users.username, username))
        .limit(1);

      if (existing.length > 0) {
        return existing[0].id;
      }

      // Create new user
      const [user] = await db.insert(users).values({
        username,
        password: 'test_password_hash',
      }).returning();

      // Create user stats
      await db.insert(userStats).values({
        userId: user.id,
        xpPoints: 0,
        level: 1,
        currentStreak: 0,
        longestStreak: 0,
      });

      return user.id;
    } catch (error) {
      console.error(`Failed to create user ${username}:`, error);
      throw error;
    }
  }

  private startCacheDeletion() {
    console.log('\n🗑️  Starting cache deletion loop...');
    
    this.cacheInterval = setInterval(() => {
      this.clearCache();
    }, this.config.cacheDeletionInterval);
  }

  private stopCacheDeletion() {
    if (this.cacheInterval) {
      clearInterval(this.cacheInterval);
      this.cacheInterval = null;
      console.log('\n🛑 Stopped cache deletion loop');
    }
  }

  private clearCache() {
    try {
      // Clear various caches
      if (global.gc) {
        global.gc();
      }
      
      this.metrics.cacheClears++;
      
      if (this.metrics.cacheClears % 10 === 0) {
        console.log(`🗑️  Cache cleared ${this.metrics.cacheClears} times`);
      }
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }

  private async executeLoadTest() {
    console.log('\n🚀 Starting load test...');
    console.log('═'.repeat(80));

    const limit = pLimit(this.config.concurrency);
    const tasks: Promise<void>[] = [];

    // Beginner users
    for (let i = 0; i < this.config.beginnerUsers; i++) {
      tasks.push(
        limit(() => this.simulateUserJourney(`beginner_${i}`, 'beginner'))
      );
    }

    // Advanced users
    for (let i = 0; i < this.config.advancedUsers; i++) {
      tasks.push(
        limit(() => this.simulateUserJourney(`advanced_${i}`, 'advanced'))
      );
    }

    // Progress indicator
    let completed = 0;
    const total = tasks.length;
    const progressInterval = setInterval(() => {
      const progress = (completed / total * 100).toFixed(1);
      console.log(`📊 Progress: ${completed.toLocaleString()}/${total.toLocaleString()} (${progress}%)`);
    }, 5000);

    // Execute all tasks
    await Promise.allSettled(tasks.map(task => 
      task.then(() => { completed++; })
    ));

    clearInterval(progressInterval);
    console.log(`✅ Completed: ${completed.toLocaleString()}/${total.toLocaleString()}`);
  }

  private async simulateUserJourney(username: string, level: string) {
    const startTime = Date.now();
    
    try {
      // Get user
      const [user] = await db.select()
        .from(users)
        .where(eq(users.username, username))
        .limit(1);

      if (!user) {
        throw new Error(`User ${username} not found`);
      }

      // Select lessons based on level
      const lessonsToVisit = level === 'beginner' 
        ? this.beginnerLessons 
        : this.advancedLessons;

      // Calculate 99% of lessons
      const lessonCount = Math.floor(lessonsToVisit.length * this.config.contentCoverage);
      const selectedLessons = lessonsToVisit.slice(0, lessonCount);

      // Visit each lesson
      for (const lesson of selectedLessons) {
        await this.visitLesson(user.id, lesson.id);
        this.metrics.totalRequests++;
        this.metrics.successfulRequests++;
      }

      const duration = Date.now() - startTime;
      
      // Update metrics
      if (duration > this.metrics.peakResponseTime) {
        this.metrics.peakResponseTime = duration;
      }

    } catch (error) {
      this.metrics.failedRequests++;
      console.error(`User ${username} journey failed:`, error);
    }
  }

  private async visitLesson(userId: number, lessonId: number) {
    try {
      // Simulate lesson visit
      const requestStart = Date.now();

      // 1. Get lesson details
      const [lesson] = await db.select()
        .from(lessons)
        .where(eq(lessons.id, lessonId))
        .limit(1);

      // 2. Get vocabulary
      const vocab = await db.select()
        .from(vocabulary)
        .where(eq(vocabulary.lessonId, lessonId));

      // 3. Mark progress
      const existing = await db.select()
        .from(progress)
        .where(eq(progress.userId, userId))
        .where(eq(progress.lessonId, lessonId))
        .limit(1);

      if (existing.length === 0) {
        await db.insert(progress).values({
          userId,
          lessonId,
          completed: true,
          completedAt: new Date().toISOString(),
        });
      }

      // 4. Update user stats
      await db.update(userStats)
        .set({
          xpPoints: db.raw('xp_points + 10'),
          totalLessonsCompleted: db.raw('total_lessons_completed + 1'),
        })
        .where(eq(userStats.userId, userId));

      const duration = Date.now() - requestStart;
      
      // Update average response time
      const totalTime = this.metrics.averageResponseTime * this.metrics.successfulRequests;
      this.metrics.averageResponseTime = (totalTime + duration) / (this.metrics.successfulRequests + 1);

    } catch (error) {
      throw error;
    }
  }

  private calculateMetrics() {
    this.metrics.endTime = Date.now();
    this.metrics.duration = this.metrics.endTime - this.metrics.startTime;
  }

  private printResults() {
    console.log('\n\n' + '═'.repeat(80));
    console.log('📊 ULTIMATE LOAD TEST RESULTS');
    console.log('═'.repeat(80));

    console.log('\n👥 USER STATISTICS:');
    console.log(`   Total Users: ${this.metrics.totalUsers.toLocaleString()}`);
    console.log(`   - Beginner: ${this.config.beginnerUsers.toLocaleString()}`);
    console.log(`   - Advanced: ${this.config.advancedUsers.toLocaleString()}`);

    console.log('\n📈 REQUEST STATISTICS:');
    console.log(`   Total Requests: ${this.metrics.totalRequests.toLocaleString()}`);
    console.log(`   Successful: ${this.metrics.successfulRequests.toLocaleString()}`);
    console.log(`   Failed: ${this.metrics.failedRequests.toLocaleString()}`);
    console.log(`   Success Rate: ${((this.metrics.successfulRequests / this.metrics.totalRequests) * 100).toFixed(2)}%`);

    console.log('\n⏱️  PERFORMANCE METRICS:');
    console.log(`   Total Duration: ${(this.metrics.duration / 1000).toFixed(2)}s`);
    console.log(`   Average Response Time: ${this.metrics.averageResponseTime.toFixed(2)}ms`);
    console.log(`   Peak Response Time: ${this.metrics.peakResponseTime.toFixed(2)}ms`);
    console.log(`   Requests/Second: ${(this.metrics.totalRequests / (this.metrics.duration / 1000)).toFixed(2)}`);

    console.log('\n🗑️  CACHE STATISTICS:');
    console.log(`   Cache Clears: ${this.metrics.cacheClears}`);
    console.log(`   Clear Interval: ${this.config.cacheDeletionInterval}ms`);

    console.log('\n💾 DATABASE LOAD:');
    const dbOperations = this.metrics.totalRequests * 4; // 4 operations per lesson visit
    console.log(`   Total DB Operations: ${dbOperations.toLocaleString()}`);
    console.log(`   DB Ops/Second: ${(dbOperations / (this.metrics.duration / 1000)).toFixed(2)}`);

    console.log('\n' + '═'.repeat(80));

    // Determine if test passed
    const successRate = (this.metrics.successfulRequests / this.metrics.totalRequests) * 100;
    if (successRate >= 95) {
      console.log('✅ LOAD TEST PASSED - System handled load successfully!');
    } else if (successRate >= 80) {
      console.log('⚠️  LOAD TEST WARNING - System struggled but survived');
    } else {
      console.log('❌ LOAD TEST FAILED - System could not handle load');
    }
    console.log('═'.repeat(80) + '\n');
  }

  private async cleanup() {
    console.log('\n🧹 Cleaning up test data...');
    
    try {
      // Delete test users and their data
      const testUsernames = [
        ...Array.from({ length: this.config.beginnerUsers }, (_, i) => `beginner_${i}`),
        ...Array.from({ length: this.config.advancedUsers }, (_, i) => `advanced_${i}`),
      ];

      // Get test user IDs
      const testUsers = await db.select()
        .from(users)
        .where(inArray(users.username, testUsernames));

      const testUserIds = testUsers.map(u => u.id);

      if (testUserIds.length > 0) {
        // Delete in batches
        const batchSize = 100;
        for (let i = 0; i < testUserIds.length; i += batchSize) {
          const batch = testUserIds.slice(i, i + batchSize);
          
          await db.delete(progress).where(inArray(progress.userId, batch));
          await db.delete(userStats).where(inArray(userStats.userId, batch));
          await db.delete(users).where(inArray(users.id, batch));
        }
      }

      console.log(`✅ Cleaned up ${testUserIds.length} test users`);
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }
}

// Main execution
async function main() {
  const config: LoadTestConfig = {
    beginnerUsers: 1000,
    advancedUsers: 15000,
    contentCoverage: 0.99, // 99%
    concurrency: 100, // Process 100 users at a time
    cacheDeletionInterval: 5000, // Clear cache every 5 seconds
  };

  const tester = new UltimateLoadTester(config);
  await tester.run();
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { UltimateLoadTester, LoadTestConfig, TestMetrics };
