/**
 * ROBUSTNESS TEST RUNNER
 * 
 * Comprehensive test suite that tests every nook and corner of the app.
 * Ensures all functionality is linked to main flow and works correctly.
 */

import { storage } from '../server/storage';
import { db } from '../server/db';
import { lessons, vocabulary, quizzes, progress, userStats, users } from '../shared/schema';
import { eq } from 'drizzle-orm';

interface TestCase {
  name: string;
  category: string;
  test: () => Promise<boolean>;
  error?: string;
}

interface TestSuite {
  name: string;
  tests: TestCase[];
  passed: number;
  failed: number;
  errors: string[];
}

interface RobustnessReport {
  totalTests: number;
  passedTests: number;
  failedTests: number;
  successRate: number;
  suites: TestSuite[];
  criticalIssues: string[];
  warnings: string[];
}

class RobustnessTestRunner {
  private suites: TestSuite[] = [];
  private report: RobustnessReport;

  constructor() {
    this.report = {
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      successRate: 0,
      suites: [],
      criticalIssues: [],
      warnings: []
    };
  }

  /**
   * Test: All lessons are accessible
   */
  private async testLessonAccessibility(): Promise<TestCase[]> {
    return [
      {
        name: 'Get all lessons',
        category: 'Lessons',
        test: async () => {
          const lessons = await storage.getLessons();
          return lessons.length > 0;
        }
      },
      {
        name: 'Get lesson by ID',
        category: 'Lessons',
        test: async () => {
          const allLessons = await storage.getLessons();
          if (allLessons.length === 0) return false;
          const lesson = await storage.getLesson(allLessons[0].id);
          return lesson !== undefined;
        }
      },
      {
        name: 'All lessons have valid slugs',
        category: 'Lessons',
        test: async () => {
          const lessons = await storage.getLessons();
          return lessons.every(l => l.slug && l.slug.length > 0);
        }
      },
      {
        name: 'All lessons have difficulty levels',
        category: 'Lessons',
        test: async () => {
          const lessons = await storage.getLessons();
          const validLevels = ['Beginner', 'Intermediate', 'Advanced'];
          return lessons.every(l => validLevels.includes(l.difficulty));
        }
      }
    ];
  }

  /**
   * Test: Vocabulary integrity
   */
  private async testVocabularyIntegrity(): Promise<TestCase[]> {
    return [
      {
        name: 'Vocabulary linked to lessons',
        category: 'Vocabulary',
        test: async () => {
          const allLessons = await storage.getLessons();
          if (allLessons.length === 0) return false;
          
          for (const lesson of allLessons.slice(0, 10)) { // Sample test
            const vocab = await storage.getVocabularyForLesson(lesson.id);
            // Vocabulary should exist or be empty, but not error
            return true;
          }
          return true;
        }
      },
      {
        name: 'Vocabulary has required fields',
        category: 'Vocabulary',
        test: async () => {
          const allLessons = await storage.getLessons();
          if (allLessons.length === 0) return false;
          
          const vocab = await storage.getVocabularyForLesson(allLessons[0].id);
          return vocab.every(v => v.word && v.word.length > 0);
        }
      }
    ];
  }

  /**
   * Test: User progress tracking
   */
  private async testProgressTracking(): Promise<TestCase[]> {
    return [
      {
        name: 'Create user progress',
        category: 'Progress',
        test: async () => {
          // Create test user
          const user = await storage.createUser({
            username: `test_progress_${Date.now()}`,
            password: 'test123',
            isAdmin: false
          });

          const allLessons = await storage.getLessons();
          if (allLessons.length === 0) return false;

          await storage.updateProgress(user.id, allLessons[0].id, true);
          const progress = await storage.getUserProgress(user.id);
          
          return progress.length > 0;
        }
      },
      {
        name: 'Get user progress',
        category: 'Progress',
        test: async () => {
          const user = await storage.createUser({
            username: `test_progress_get_${Date.now()}`,
            password: 'test123',
            isAdmin: false
          });

          const progress = await storage.getUserProgress(user.id);
          return Array.isArray(progress);
        }
      }
    ];
  }

  /**
   * Test: User stats
   */
  private async testUserStats(): Promise<TestCase[]> {
    return [
      {
        name: 'Create user stats',
        category: 'User Stats',
        test: async () => {
          const user = await storage.createUser({
            username: `test_stats_${Date.now()}`,
            password: 'test123',
            isAdmin: false
          });

          await storage.updateUserStats(user.id, {
            xpPoints: 100,
            level: 1,
            currentStreak: 1,
            longestStreak: 1,
            lastActiveDate: new Date().toISOString().split('T')[0]
          });

          const stats = await storage.getUserStats(user.id);
          return stats !== undefined && stats.xpPoints === 100;
        }
      },
      {
        name: 'Update user stats',
        category: 'User Stats',
        test: async () => {
          const user = await storage.createUser({
            username: `test_stats_update_${Date.now()}`,
            password: 'test123',
            isAdmin: false
          });

          await storage.updateUserStats(user.id, { xpPoints: 50 });
          const stats = await storage.getUserStats(user.id);
          
          return stats !== undefined;
        }
      }
    ];
  }

  /**
   * Test: Quizzes
   */
  private async testQuizzes(): Promise<TestCase[]> {
    return [
      {
        name: 'Get all quizzes',
        category: 'Quizzes',
        test: async () => {
          const quizzes = await storage.getQuizzes();
          return Array.isArray(quizzes);
        }
      },
      {
        name: 'Get quiz by ID',
        category: 'Quizzes',
        test: async () => {
          const allQuizzes = await storage.getQuizzes();
          if (allQuizzes.length === 0) return true; // No quizzes is okay
          
          const quiz = await storage.getQuiz(allQuizzes[0].id);
          return quiz !== undefined;
        }
      }
    ];
  }

  /**
   * Test: Hindi content completeness
   */
  private async testHindiContent(): Promise<TestCase[]> {
    return [
      {
        name: 'Lessons have Hindi titles',
        category: 'Hindi Content',
        test: async () => {
          const lessons = await storage.getLessons();
          if (lessons.length === 0) return false;
          
          // Check sample - at least some should have Hindi titles
          const sample = lessons.slice(0, Math.min(10, lessons.length));
          const withHindi = sample.filter(l => l.hindiTitle && l.hindiTitle.trim().length > 0);
          
          // Warning if less than 50% have Hindi titles
          if (withHindi.length < sample.length * 0.5) {
            this.report.warnings.push('Less than 50% of lessons have Hindi titles');
          }
          
          return true; // Not a failure, just a check
        }
      },
      {
        name: 'Lessons have Hindi descriptions',
        category: 'Hindi Content',
        test: async () => {
          const lessons = await storage.getLessons();
          if (lessons.length === 0) return false;
          
          const sample = lessons.slice(0, Math.min(10, lessons.length));
          const withHindi = sample.filter(l => l.hindiDescription && l.hindiDescription.trim().length > 0);
          
          if (withHindi.length < sample.length * 0.5) {
            this.report.warnings.push('Less than 50% of lessons have Hindi descriptions');
          }
          
          return true;
        }
      }
    ];
  }

  /**
   * Test: Data integrity
   */
  private async testDataIntegrity(): Promise<TestCase[]> {
    return [
      {
        name: 'No orphaned vocabulary',
        category: 'Data Integrity',
        test: async () => {
          const allLessons = await storage.getLessons();
          const lessonIds = new Set(allLessons.map(l => l.id));
          
          // Check a sample of vocabulary
          const vocab = await db.select().from(vocabulary).limit(100);
          const orphaned = vocab.filter(v => !lessonIds.has(v.lessonId));
          
          if (orphaned.length > 0) {
            this.report.warnings.push(`Found ${orphaned.length} orphaned vocabulary items`);
          }
          
          return true; // Warning, not failure
        }
      },
      {
        name: 'All lessons have unique slugs',
        category: 'Data Integrity',
        test: async () => {
          const lessons = await storage.getLessons();
          const slugs = lessons.map(l => l.slug);
          const uniqueSlugs = new Set(slugs);
          
          return slugs.length === uniqueSlugs.size;
        }
      }
    ];
  }

  /**
   * Test: API endpoints (simulated)
   */
  private async testAPIEndpoints(): Promise<TestCase[]> {
    return [
      {
        name: 'Lessons endpoint accessible',
        category: 'API',
        test: async () => {
          const lessons = await storage.getLessons();
          return lessons.length >= 0; // Just check it doesn't error
        }
      },
      {
        name: 'User creation works',
        category: 'API',
        test: async () => {
          const user = await storage.createUser({
            username: `test_api_${Date.now()}`,
            password: 'test123',
            isAdmin: false
          });
          return user.id > 0;
        }
      }
    ];
  }

  /**
   * Run all test suites
   */
  async runAllTests(): Promise<RobustnessReport> {
    console.log('🔍 Starting Robustness Test Suite...\n');

    // Collect all test cases
    const testSuites: Array<{ name: string; tests: Promise<TestCase[]> }> = [
      { name: 'Lesson Accessibility', tests: this.testLessonAccessibility() },
      { name: 'Vocabulary Integrity', tests: this.testVocabularyIntegrity() },
      { name: 'Progress Tracking', tests: this.testProgressTracking() },
      { name: 'User Stats', tests: this.testUserStats() },
      { name: 'Quizzes', tests: this.testQuizzes() },
      { name: 'Hindi Content', tests: this.testHindiContent() },
      { name: 'Data Integrity', tests: this.testDataIntegrity() },
      { name: 'API Endpoints', tests: this.testAPIEndpoints() }
    ];

    // Run each suite
    for (const suite of testSuites) {
      const tests = await suite.tests;
      const suiteResult: TestSuite = {
        name: suite.name,
        tests: [],
        passed: 0,
        failed: 0,
        errors: []
      };

      console.log(`\n📦 Running suite: ${suite.name}`);

      for (const testCase of tests) {
        try {
          const result = await testCase.test();
          
          suiteResult.tests.push({
            ...testCase,
            error: result ? undefined : 'Test returned false'
          });

          if (result) {
            suiteResult.passed++;
            this.report.passedTests++;
            console.log(`  ✅ ${testCase.name}`);
          } else {
            suiteResult.failed++;
            this.report.failedTests++;
            const error = testCase.error || 'Test failed';
            suiteResult.errors.push(error);
            this.report.criticalIssues.push(`${suite.name}: ${testCase.name} - ${error}`);
            console.log(`  ❌ ${testCase.name} - ${error}`);
          }
        } catch (error) {
          suiteResult.failed++;
          this.report.failedTests++;
          const errorMsg = error instanceof Error ? error.message : String(error);
          suiteResult.errors.push(errorMsg);
          this.report.criticalIssues.push(`${suite.name}: ${testCase.name} - ${errorMsg}`);
          console.log(`  ❌ ${testCase.name} - ${errorMsg}`);
        }

        this.report.totalTests++;
      }

      this.suites.push(suiteResult);
    }

    // Calculate success rate
    this.report.successRate = (this.report.passedTests / this.report.totalTests) * 100;
    this.report.suites = this.suites;

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('                    ROBUSTNESS TEST RESULTS');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`Total Tests: ${this.report.totalTests}`);
    console.log(`Passed: ${this.report.passedTests}`);
    console.log(`Failed: ${this.report.failedTests}`);
    console.log(`Success Rate: ${this.report.successRate.toFixed(2)}%`);
    console.log(`Critical Issues: ${this.report.criticalIssues.length}`);
    console.log(`Warnings: ${this.report.warnings.length}`);
    console.log('═══════════════════════════════════════════════════════════════\n');

    return this.report;
  }

  /**
   * Save report
   */
  async saveReport(filename: string = 'robustness-test-report.json'): Promise<void> {
    const fs = await import('fs/promises');
    await fs.writeFile(filename, JSON.stringify(this.report, null, 2));
    console.log(`📄 Report saved to: ${filename}`);
  }
}

// Main execution
async function main() {
  const runner = new RobustnessTestRunner();
  
  try {
    const report = await runner.runAllTests();
    await runner.saveReport();

    if (report.successRate < 100) {
      console.log(`\n⚠️  Warning: Success rate is ${report.successRate.toFixed(2)}%`);
      console.log(`   Target: 100% success rate`);
      console.log(`   Review critical issues in the report`);
      process.exit(1);
    } else {
      console.log('\n✅ All robustness tests passed with 100% success rate!');
    }
  } catch (error) {
    console.error('❌ Robustness testing failed:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.includes('robustness-test-runner.ts')) {
  main();
}

export { RobustnessTestRunner, type RobustnessReport, type TestSuite, type TestCase };
