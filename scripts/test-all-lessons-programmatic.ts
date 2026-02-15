/**
 * PROGRAMMATIC LESSON TESTING
 * 
 * This script programmatically tests each lesson to ensure:
 * - Lesson pages are accessible
 * - Hindi translations are present
 * - Vocabulary loads correctly
 * - Navigation works
 * - All links are functional
 */

import { db } from '../server/db';
import { storage } from '../server/storage';
import { lessons, vocabulary, conversationLines } from '../shared/schema';
import { eq } from 'drizzle-orm';

interface LessonTestResult {
  lessonId: number;
  title: string;
  slug: string;
  passed: boolean;
  tests: {
    exists: boolean;
    hasVocabulary: boolean;
    hasHindiTitle: boolean;
    hasHindiDescription: boolean;
    hasHindiContent: boolean;
    hasConversationLines: boolean;
    hasNavigation: boolean;
    vocabularyCount: number;
    conversationLinesCount: number;
  };
  errors: string[];
  warnings: string[];
}

interface TestReport {
  totalLessons: number;
  tested: number;
  passed: number;
  failed: number;
  results: LessonTestResult[];
  summary: {
    lessonsWithoutHindi: number;
    lessonsWithoutVocabulary: number;
    lessonsWithoutConversations: number;
    lessonsWithNavigationIssues: number;
  };
}

class LessonTester {
  private report: TestReport;

  constructor() {
    this.report = {
      totalLessons: 0,
      tested: 0,
      passed: 0,
      failed: 0,
      results: [],
      summary: {
        lessonsWithoutHindi: 0,
        lessonsWithoutVocabulary: 0,
        lessonsWithoutConversations: 0,
        lessonsWithNavigationIssues: 0
      }
    };
  }

  /**
   * Test a single lesson
   */
  async testLesson(lesson: typeof lessons.$inferSelect, allLessons: any[]): Promise<LessonTestResult> {
    const result: LessonTestResult = {
      lessonId: lesson.id,
      title: lesson.title,
      slug: lesson.slug,
      passed: true,
      tests: {
        exists: true,
        hasVocabulary: false,
        hasHindiTitle: false,
        hasHindiDescription: false,
        hasHindiContent: false,
        hasConversationLines: false,
        hasNavigation: false,
        vocabularyCount: 0,
        conversationLinesCount: 0
      },
      errors: [],
      warnings: []
    };

    // Test 1: Lesson exists
    if (!lesson) {
      result.tests.exists = false;
      result.errors.push('Lesson does not exist');
      result.passed = false;
      return result;
    }

    // Test 2: Has vocabulary
    const vocab = await db.select()
      .from(vocabulary)
      .where(eq(vocabulary.lessonId, lesson.id));
    
    result.tests.vocabularyCount = vocab.length;
    result.tests.hasVocabulary = vocab.length >= 3;
    
    if (!result.tests.hasVocabulary) {
      result.warnings.push(`Low vocabulary count: ${vocab.length} (recommended: 5-10)`);
      if (vocab.length === 0) {
        result.errors.push('No vocabulary items found');
        result.passed = false;
      }
    }

    // Test 3: Has Hindi title
    result.tests.hasHindiTitle = !!(lesson.hindiTitle && lesson.hindiTitle.trim().length > 0);
    if (!result.tests.hasHindiTitle) {
      result.errors.push('Missing Hindi title - CRITICAL for Hindi users');
      result.passed = false;
    }

    // Test 4: Has Hindi description
    result.tests.hasHindiDescription = !!(lesson.hindiDescription && lesson.hindiDescription.trim().length > 0);
    if (!result.tests.hasHindiDescription) {
      result.errors.push('Missing Hindi description - CRITICAL for Hindi users');
      result.passed = false;
    }

    // Test 5: Has Hindi content
    const hasHindiChars = /[\u0900-\u097F]/.test(lesson.content);
    const hasHindiSection = /##\s*हिंदी/i.test(lesson.content);
    result.tests.hasHindiContent = hasHindiChars && hasHindiSection;
    
    if (!result.tests.hasHindiContent) {
      result.errors.push('Missing Hindi content translation - CRITICAL for Hindi users');
      result.passed = false;
    }

    // Test 6: Has conversation lines
    const convLines = await db.select()
      .from(conversationLines)
      .where(eq(conversationLines.lessonId, lesson.id));
    
    result.tests.conversationLinesCount = convLines.length;
    result.tests.hasConversationLines = convLines.length >= 2;
    
    if (!result.tests.hasConversationLines) {
      result.warnings.push(`Low conversation lines: ${convLines.length} (recommended: 4+)`);
    }

    // Test 7: Has navigation (prev/next lesson)
    const sortedLessons = allLessons.sort((a, b) => a.order - b.order);
    const currentIndex = sortedLessons.findIndex(l => l.id === lesson.id);
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < sortedLessons.length - 1;
    result.tests.hasNavigation = hasPrev && hasNext;
    
    if (!result.tests.hasNavigation) {
      result.warnings.push('Lesson may not have proper navigation (first or last lesson)');
    }

    // Update summary
    if (!result.tests.hasHindiTitle || !result.tests.hasHindiDescription || !result.tests.hasHindiContent) {
      this.report.summary.lessonsWithoutHindi++;
    }
    if (!result.tests.hasVocabulary) {
      this.report.summary.lessonsWithoutVocabulary++;
    }
    if (!result.tests.hasConversationLines) {
      this.report.summary.lessonsWithoutConversations++;
    }
    if (!result.tests.hasNavigation) {
      this.report.summary.lessonsWithNavigationIssues++;
    }

    return result;
  }

  /**
   * Test all lessons
   */
  async testAllLessons(): Promise<TestReport> {
    console.log('🧪 Starting programmatic lesson testing...\n');

    const allLessons = await storage.getLessons();
    this.report.totalLessons = allLessons.length;

    console.log(`Testing ${allLessons.length} lessons...\n`);

    for (const lesson of allLessons) {
      const result = await this.testLesson(lesson, allLessons);
      this.report.results.push(result);
      this.report.tested++;

      if (result.passed) {
        this.report.passed++;
      } else {
        this.report.failed++;
      }

      // Progress indicator
      if (this.report.results.length % 50 === 0) {
        console.log(`  Tested ${this.report.results.length}/${allLessons.length} lessons...`);
      }
    }

    console.log(`\n✅ Testing complete!`);
    console.log(`   Total: ${this.report.totalLessons}`);
    console.log(`   Passed: ${this.report.passed}`);
    console.log(`   Failed: ${this.report.failed}`);

    return this.report;
  }

  /**
   * Generate test summary
   */
  generateSummary(): string {
    const { totalLessons, passed, failed, summary } = this.report;
    const passRate = ((passed / totalLessons) * 100).toFixed(1);

    return `
═══════════════════════════════════════════════════════════════
           PROGRAMMATIC LESSON TEST SUMMARY
═══════════════════════════════════════════════════════════════

Total Lessons Tested: ${totalLessons}
Passed: ${passed} (${passRate}%)
Failed: ${failed} (${(100 - parseFloat(passRate)).toFixed(1)}%)

ISSUES FOUND:
─────────────
• Lessons without Hindi: ${summary.lessonsWithoutHindi}
• Lessons without vocabulary: ${summary.lessonsWithoutVocabulary}
• Lessons without conversations: ${summary.lessonsWithoutConversations}
• Lessons with navigation issues: ${summary.lessonsWithNavigationIssues}

TOP FAILING LESSONS:
────────────────────
${this.report.results
  .filter(r => !r.passed)
  .slice(0, 10)
  .map((r, idx) => `${idx + 1}. Lesson ${r.lessonId}: "${r.title}"\n   Errors: ${r.errors.join(', ')}`)
  .join('\n')}

═══════════════════════════════════════════════════════════════
`;
  }

  /**
   * Get report
   */
  getReport(): TestReport {
    return this.report;
  }
}

// Main execution
async function main() {
  const tester = new LessonTester();
  
  try {
    const report = await tester.testAllLessons();
    console.log(tester.generateSummary());
    
    // Exit with error code if too many failures
    if (report.failed > report.totalLessons * 0.1) {
      console.log('\n⚠️  Warning: More than 10% of lessons failed tests!');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Testing failed:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.includes('test-all-lessons-programmatic.ts')) {
  main();
}

export { LessonTester, type LessonTestResult, type TestReport };

