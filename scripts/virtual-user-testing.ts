/**
 * VIRTUAL USER TESTING SYSTEM
 * 
 * Programmatically tests the app with 500 beginner, 500 intermediate, and 500 advanced users.
 * Each user randomly visits 90% of lessons and subjects.
 */

import { storage } from '../server/storage';
import { db } from '../server/db';
import { lessons, progress, userStats, users } from '../shared/schema';
import { eq, and } from 'drizzle-orm';

interface VirtualUser {
  id: number;
  username: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  visitedLessons: Set<number>;
  completedLessons: Set<number>;
  errors: string[];
  successCount: number;
  failureCount: number;
}

interface TestResult {
  userId: number;
  lessonId: number;
  success: boolean;
  error?: string;
  timestamp: Date;
}

interface TestReport {
  totalUsers: number;
  beginnerUsers: number;
  intermediateUsers: number;
  advancedUsers: number;
  totalTests: number;
  successfulTests: number;
  failedTests: number;
  successRate: number;
  averageLessonsPerUser: number;
  errors: string[];
  userResults: VirtualUser[];
}

class VirtualUserTester {
  private users: VirtualUser[] = [];
  private testResults: TestResult[] = [];
  private report: TestReport;

  constructor() {
    this.report = {
      totalUsers: 0,
      beginnerUsers: 0,
      intermediateUsers: 0,
      advancedUsers: 0,
      totalTests: 0,
      successfulTests: 0,
      failedTests: 0,
      successRate: 0,
      averageLessonsPerUser: 0,
      errors: [],
      userResults: []
    };
  }

  /**
   * Create virtual users
   */
  async createVirtualUsers(count: number, level: 'beginner' | 'intermediate' | 'advanced'): Promise<VirtualUser[]> {
    const virtualUsers: VirtualUser[] = [];

    for (let i = 0; i < count; i++) {
      const username = `test_${level}_${Date.now()}_${i}`;
      
      try {
        // Create user in database
        const user = await storage.createUser({
          username,
          password: 'test123',
          isAdmin: false
        });

        // Initialize user stats
        await storage.updateUserStats(user.id, {
          xpPoints: 0,
          level: level === 'beginner' ? 1 : level === 'intermediate' ? 5 : 10,
          currentStreak: 0,
          longestStreak: 0,
          lastActiveDate: new Date().toISOString().split('T')[0]
        });

        virtualUsers.push({
          id: user.id,
          username: user.username,
          level,
          visitedLessons: new Set(),
          completedLessons: new Set(),
          errors: [],
          successCount: 0,
          failureCount: 0
        });
      } catch (error) {
        console.error(`Failed to create virtual user ${username}:`, error);
      }
    }

    return virtualUsers;
  }

  /**
   * Get lessons appropriate for user level
   */
  async getLessonsForLevel(level: 'beginner' | 'intermediate' | 'advanced'): Promise<typeof lessons.$inferSelect[]> {
    const allLessons = await storage.getLessons();
    
    const difficultyMap: Record<string, string> = {
      'beginner': 'Beginner',
      'intermediate': 'Intermediate',
      'advanced': 'Advanced'
    };

    return allLessons.filter(lesson => 
      lesson.difficulty === difficultyMap[level]
    );
  }

  /**
   * Test lesson access for a user
   */
  async testLessonAccess(user: VirtualUser, lessonId: number): Promise<TestResult> {
    const result: TestResult = {
      userId: user.id,
      lessonId,
      success: false,
      timestamp: new Date()
    };

    try {
      // Test 1: Get lesson
      const lesson = await storage.getLesson(lessonId);
      if (!lesson) {
        result.error = `Lesson ${lessonId} not found`;
        user.failureCount++;
        return result;
      }

      // Test 2: Get vocabulary
      const vocab = await storage.getVocabularyForLesson(lessonId);
      if (vocab.length === 0 && lesson.difficulty === 'Beginner') {
        // Warning but not failure for beginners
        user.errors.push(`Lesson ${lessonId} has no vocabulary`);
      }

      // Test 3: Update progress
      await storage.updateProgress(user.id, lessonId, false);
      
      // Test 4: Mark as visited
      user.visitedLessons.add(lessonId);
      user.successCount++;
      result.success = true;

      this.report.successfulTests++;
    } catch (error) {
      result.error = error instanceof Error ? error.message : String(error);
      user.errors.push(`Lesson ${lessonId}: ${result.error}`);
      user.failureCount++;
      this.report.failedTests++;
      this.report.errors.push(`User ${user.username}, Lesson ${lessonId}: ${result.error}`);
    }

    this.report.totalTests++;
    this.testResults.push(result);
    return result;
  }

  /**
   * Simulate user visiting lessons (90% coverage)
   */
  async simulateUserJourney(user: VirtualUser): Promise<void> {
    const availableLessons = await this.getLessonsForLevel(user.level);
    const targetCount = Math.floor(availableLessons.length * 0.9); // 90% coverage
    const lessonsToVisit = this.shuffleArray([...availableLessons]).slice(0, targetCount);

    console.log(`  User ${user.username} (${user.level}): Visiting ${lessonsToVisit.length} lessons...`);

    for (const lesson of lessonsToVisit) {
      await this.testLessonAccess(user, lesson.id);
      
      // Randomly complete some lessons (30% completion rate)
      if (Math.random() < 0.3) {
        try {
          await storage.updateProgress(user.id, lesson.id, true);
          user.completedLessons.add(lesson.id);
        } catch (error) {
          user.errors.push(`Failed to complete lesson ${lesson.id}: ${error}`);
        }
      }

      // Small delay to simulate real user behavior
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  }

  /**
   * Shuffle array (Fisher-Yates)
   */
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Run comprehensive test suite
   */
  async runTestSuite(): Promise<TestReport> {
    console.log('🧪 Starting Virtual User Testing System...\n');
    console.log('Creating virtual users...\n');

    // Create users
    const beginnerUsers = await this.createVirtualUsers(500, 'beginner');
    const intermediateUsers = await this.createVirtualUsers(500, 'intermediate');
    const advancedUsers = await this.createVirtualUsers(500, 'advanced');

    this.users = [...beginnerUsers, ...intermediateUsers, ...advancedUsers];
    this.report.totalUsers = this.users.length;
    this.report.beginnerUsers = beginnerUsers.length;
    this.report.intermediateUsers = intermediateUsers.length;
    this.report.advancedUsers = advancedUsers.length;

    console.log(`✅ Created ${this.report.totalUsers} virtual users`);
    console.log(`   - Beginner: ${beginnerUsers.length}`);
    console.log(`   - Intermediate: ${intermediateUsers.length}`);
    console.log(`   - Advanced: ${advancedUsers.length}\n`);

    console.log('Starting user journeys (90% lesson coverage)...\n');

    // Run tests for all users
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i];
      await this.simulateUserJourney(user);

      if ((i + 1) % 100 === 0) {
        console.log(`  Progress: ${i + 1}/${this.users.length} users tested...`);
      }
    }

    // Calculate statistics
    const totalLessonsVisited = this.users.reduce((sum, user) => sum + user.visitedLessons.size, 0);
    this.report.averageLessonsPerUser = totalLessonsVisited / this.users.length;
    this.report.successRate = (this.report.successfulTests / this.report.totalTests) * 100;
    this.report.userResults = this.users;

    console.log('\n✅ Testing complete!');
    console.log(`   Total tests: ${this.report.totalTests}`);
    console.log(`   Successful: ${this.report.successfulTests}`);
    console.log(`   Failed: ${this.report.failedTests}`);
    console.log(`   Success rate: ${this.report.successRate.toFixed(2)}%`);
    console.log(`   Average lessons per user: ${this.report.averageLessonsPerUser.toFixed(1)}`);

    return this.report;
  }

  /**
   * Clean up virtual users (optional)
   */
  async cleanup(): Promise<void> {
    console.log('\n🧹 Cleaning up virtual users...');
    // Note: In production, you might want to keep test users or mark them for deletion
    // For now, we'll just log the cleanup
    console.log(`   ${this.users.length} virtual users created (can be cleaned up manually if needed)`);
  }

  getReport(): TestReport {
    return this.report;
  }
}

// Main execution
async function main() {
  const tester = new VirtualUserTester();
  
  try {
    const report = await tester.runTestSuite();
    
    // Save report
    const fs = await import('fs/promises');
    await fs.writeFile(
      'virtual-user-test-report.json',
      JSON.stringify(report, null, 2)
    );
    console.log('\n📄 Test report saved to: virtual-user-test-report.json');

    // Check if we achieved 100% success
    if (report.successRate < 100) {
      console.log(`\n⚠️  Warning: Success rate is ${report.successRate.toFixed(2)}%, target is 100%`);
      console.log(`   Review errors in the report file`);
      process.exit(1);
    } else {
      console.log('\n✅ All tests passed with 100% success rate!');
    }

    await tester.cleanup();
  } catch (error) {
    console.error('❌ Testing failed:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.includes('virtual-user-testing.ts')) {
  main();
}

export { VirtualUserTester, type VirtualUser, type TestResult, type TestReport };
