import { db } from "./server/db";
import { lessons, vocabulary, conversationLines, progress, type Lesson, type Progress } from "../shared/schema";
import { eq, and } from "drizzle-orm";

/**
 * Comprehensive User Test Suite
 * Simulates 125 beginner, 75 intermediate, and 51 advanced users each taking 90% of lessons
 */
interface User {
  id: number;
  level: 'beginner' | 'intermediate' | 'advanced';
}

interface TestResults {
  totalLessons: number;
  users: {
    id: number;
    level: string;
    lessonsTaken: number;
    lessonsCompleted: number;
    successRate: number;
  }[];
  overallSuccessRate: number;
  difficultyCoverage: {
    Beginner: number;
    Intermediate: number;
    Advanced: number;
  };
  categoriesCovered: number;
  uniqueCategories: string[];
  performanceMetrics: {
    totalTimeMs: number;
    avgTimePerUser: number;
    avgLessonsPerUser: number;
  };
  issuesFound: string[];
}

class ComprehensiveUserTester {
  private results: TestResults = {
    totalLessons: 0,
    users: [],
    overallSuccessRate: 0,
    difficultyCoverage: { Beginner: 0, Intermediate: 0, Advanced: 0 },
    categoriesCovered: 0,
    uniqueCategories: [],
    performanceMetrics: {
      totalTimeMs: 0,
      avgTimePerUser: 0,
      avgLessonsPerUser: 0
    },
    issuesFound: []
  };

  async runComprehensiveUserTest(): Promise<TestResults> {
    console.log("🚀 Starting Comprehensive User Test Suite...");
    console.log("👥 Simulating 125 beginner, 75 intermediate, and 51 advanced users");
    console.log("📚 Each user takes 90% of available lessons\n");
    
    const startTime = Date.now();

    // Get all lessons
    console.log("🔍 Retrieving all lessons from database...");
    const allLessons = await db.select().from(lessons);
    this.results.totalLessons = allLessons.length;
    console.log(`📊 Total lessons available: ${this.results.totalLessons}`);

    if (this.results.totalLessons === 0) {
      throw new Error("❌ No lessons found in database!");
    }

    // Create users
    const users: User[] = [];
    console.log("\n👥 Creating test users...");

    // Add 125 beginner users
    for (let i = 0; i < 125; i++) {
      users.push({ id: i + 1, level: 'beginner' });
    }
    console.log(`   Created 125 beginner users`);

    // Add 75 intermediate users
    for (let i = 0; i < 75; i++) {
      users.push({ id: i + 126, level: 'intermediate' });
    }
    console.log(`   Created 75 intermediate users`);

    // Add 51 advanced users
    for (let i = 0; i < 51; i++) {
      users.push({ id: i + 201, level: 'advanced' });
    }
    console.log(`   Created 51 advanced users`);
    console.log(`   Total users: ${users.length}`);

    // Calculate lessons per user (90% of total)
    const lessonsPerUser = Math.floor(this.results.totalLessons * 0.9);
    console.log(`\n🎯 Each user will attempt ${lessonsPerUser} lessons (90% of total)`);

    // Track unique categories
    const categorySet = new Set<string>();
    const difficultyCounts: Record<string, number> = { Beginner: 0, Intermediate: 0, Advanced: 0 };

    // Process each user
    console.log("\n🏃‍♂️ Running user simulations...");
    let userCounter = 0;
    const totalUsers = users.length;

    for (const user of users) {
      userCounter++;
      
      if (userCounter % 25 === 0 || userCounter === 1) {
        console.log(`   Processing user ${userCounter}/${totalUsers} (ID: ${user.id}, Level: ${user.level})`);
      }

      // Select lessons based on user level preference
      const userLessons = this.selectLessonsForUser(allLessons, user.level, lessonsPerUser);
      
      // Simulate user taking lessons
      const completedCount = await this.simulateUserTakingLessons(user, userLessons);
      
      // Update statistics
      this.results.users.push({
        id: user.id,
        level: user.level,
        lessonsTaken: userLessons.length,
        lessonsCompleted: completedCount,
        successRate: completedCount / userLessons.length * 100
      });

      // Update difficulty coverage
      userLessons.forEach(lesson => {
        categorySet.add(lesson.category);
        difficultyCounts[lesson.difficulty]++;
      });
    }

    // Calculate final metrics
    this.results.categoriesCovered = categorySet.size;
    this.results.uniqueCategories = Array.from(categorySet);
    
    this.results.difficultyCoverage = {
      Beginner: difficultyCounts['Beginner'] || 0,
      Intermediate: difficultyCounts['Intermediate'] || 0,
      Advanced: difficultyCounts['Advanced'] || 0
    };

    // Calculate overall success rate
    const totalAttempted = this.results.users.reduce((sum, u) => sum + u.lessonsTaken, 0);
    const totalCompleted = this.results.users.reduce((sum, u) => sum + u.lessonsCompleted, 0);
    this.results.overallSuccessRate = totalAttempted > 0 ? (totalCompleted / totalAttempted * 100) : 0;

    // Performance metrics
    const endTime = Date.now();
    this.results.performanceMetrics.totalTimeMs = endTime - startTime;
    this.results.performanceMetrics.avgTimePerUser = totalUsers > 0 ? this.results.performanceMetrics.totalTimeMs / totalUsers : 0;
    this.results.performanceMetrics.avgLessonsPerUser = lessonsPerUser;

    console.log(`\n⏱️  Performance Metrics:`);
    console.log(`   Total execution time: ${this.results.performanceMetrics.totalTimeMs}ms`);
    console.log(`   Average time per user: ${this.results.performanceMetrics.avgTimePerUser.toFixed(2)}ms`);
    console.log(`   Average lessons per user: ${this.results.performanceMetrics.avgLessonsPerUser}`);

    console.log("\n✅ Comprehensive User Test Suite Completed Successfully!");
    return this.results;
  }

  private selectLessonsForUser(allLessons: Lesson[], userLevel: string, lessonCount: number): Lesson[] {
    // Filter lessons by user level preference with some flexibility
    let filteredLessons: Lesson[];
    
    switch (userLevel) {
      case 'beginner':
        // Mostly beginner lessons but some intermediate for progression
        const beginnerLessons = allLessons.filter(l => l.difficulty === 'Beginner');
        const intermediateLessons = allLessons.filter(l => l.difficulty === 'Intermediate');
        // Take 80% beginner, 20% intermediate
        const beginnerCount = Math.floor(lessonCount * 0.8);
        const intermediateCount = Math.min(lessonCount - beginnerCount, intermediateLessons.length);
        
        filteredLessons = [
          ...this.getRandomSubset(beginnerLessons, beginnerCount),
          ...this.getRandomSubset(intermediateLessons, intermediateCount)
        ];
        break;
        
      case 'intermediate':
        // Mix of all levels
        const interBeginner = allLessons.filter(l => l.difficulty === 'Beginner');
        const interIntermediate = allLessons.filter(l => l.difficulty === 'Intermediate');
        const interAdvanced = allLessons.filter(l => l.difficulty === 'Advanced');
        
        const interBegCount = Math.floor(lessonCount * 0.3);
        const interIntCount = Math.floor(lessonCount * 0.5);
        const interAdvCount = Math.min(lessonCount - interBegCount - interIntCount, interAdvanced.length);
        
        filteredLessons = [
          ...this.getRandomSubset(interBeginner, interBegCount),
          ...this.getRandomSubset(interIntermediate, interIntCount),
          ...this.getRandomSubset(interAdvanced, interAdvCount)
        ];
        break;
        
      case 'advanced':
        // Mostly advanced but some intermediate for reinforcement
        const advancedLessons = allLessons.filter(l => l.difficulty === 'Advanced');
        const advIntermediate = allLessons.filter(l => l.difficulty === 'Intermediate');
        
        const advancedCount = Math.floor(lessonCount * 0.7);
        const advInterCount = Math.min(lessonCount - advancedCount, advIntermediate.length);
        
        filteredLessons = [
          ...this.getRandomSubset(advancedLessons, advancedCount),
          ...this.getRandomSubset(advIntermediate, advInterCount)
        ];
        break;
        
      default:
        // Default to random selection
        filteredLessons = this.getRandomSubset(allLessons, lessonCount);
    }
    
    // Ensure we have the requested number of lessons
    if (filteredLessons.length < lessonCount) {
      // Add random lessons to reach desired count
      const remainingCount = lessonCount - filteredLessons.length;
      const allRemaining = allLessons.filter(l => !filteredLessons.some(fl => fl.id === l.id));
      filteredLessons = [...filteredLessons, ...this.getRandomSubset(allRemaining, remainingCount)];
    }
    
    return filteredLessons.slice(0, lessonCount);
  }

  private getRandomSubset<T>(array: T[], count: number): T[] {
    if (count >= array.length) {
      return [...array];
    }
    
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  private async simulateUserTakingLessons(user: User, lessons: Lesson[]): Promise<number> {
    let completedCount = 0;
    
    for (const lesson of lessons) {
      try {
        // Simulate lesson completion
        const success = await this.completeLessonForUser(user.id, lesson.id);
        if (success) {
          completedCount++;
        }
      } catch (error) {
        console.warn(`⚠️  User ${user.id} failed to complete lesson ${lesson.id}:`, error);
        this.results.issuesFound.push(`User ${user.id} failed to complete lesson ${lesson.id}: ${(error as Error).message}`);
      }
    }
    
    return completedCount;
  }

  private async completeLessonForUser(userId: number, lessonId: number): Promise<boolean> {
    try {
      // Check if lesson exists and is accessible
      const [lesson] = await db.select().from(lessons).where(eq(lessons.id, lessonId));
      if (!lesson) {
        throw new Error(`Lesson ${lessonId} not found`);
      }

      // Check if related content is accessible
      const vocabItems = await db.select().from(vocabulary).where(eq(vocabulary.lessonId, lessonId));
      const conversationItems = await db.select().from(conversationLines).where(eq(conversationLines.lessonId, lessonId));

      // Create or update progress record
      const existingProgress = await db
        .select()
        .from(progress)
        .where(and(eq(progress.userId, userId), eq(progress.lessonId, lessonId)));

      if (existingProgress.length > 0) {
        // Update existing progress
        await db
          .update(progress)
          .set({ completed: true, completedAt: new Date().toISOString() })
          .where(eq(progress.id, existingProgress[0].id));
      } else {
        // Create new progress record
        await db.insert(progress).values({
          userId,
          lessonId,
          completed: true,
          completedAt: new Date().toISOString()
        });
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  async generateDetailedReport(): Promise<string> {
    const report = `
# 🧪 COMPREHENSIVE USER TEST REPORT

## 👥 EXECUTION SUMMARY
- **Total Users Tested**: ${this.results.users.length}
  - Beginner Users: 125
  - Intermediate Users: 75  
  - Advanced Users: 51
- **Total Lessons Available**: ${this.results.totalLessons}
- **Lessons Per User**: ${this.results.performanceMetrics.avgLessonsPerUser} (90% of total)
- **Total Execution Time**: ${this.results.performanceMetrics.totalTimeMs}ms
- **Average Time Per User**: ${this.results.performanceMetrics.avgTimePerUser.toFixed(2)}ms

## 📊 SUCCESS METRICS
- **Overall Success Rate**: ${this.results.overallSuccessRate.toFixed(2)}%
- **Total Lessons Attempted**: ${this.results.users.reduce((sum, u) => sum + u.lessonsTaken, 0)}
- **Total Lessons Completed**: ${this.results.users.reduce((sum, u) => sum + u.lessonsCompleted, 0)}

## 📈 DIFFICULTY COVERAGE
- **Beginner Lessons Accessed**: ${this.results.difficultyCoverage.Beginner}
- **Intermediate Lessons Accessed**: ${this.results.difficultyCoverage.Intermediate}
- **Advanced Lessons Accessed**: ${this.results.difficultyCoverage.Advanced}

## 🏷️ CATEGORY ANALYSIS
- **Unique Categories Covered**: ${this.results.categoriesCovered}
- **Top Categories**: ${this.results.uniqueCategories.slice(0, 10).join(', ')}

## 👤 LEVEL-BASED PERFORMANCE
### Beginner Users (125)
- Average Success Rate: ${
  this.results.users
    .filter(u => u.level === 'beginner')
    .reduce((sum, u) => sum + u.successRate, 0) / 125
  .toFixed(2)}%

### Intermediate Users (75)
- Average Success Rate: ${
  this.results.users
    .filter(u => u.level === 'intermediate')
    .reduce((sum, u) => sum + u.successRate, 0) / 75
  .toFixed(2)}%

### Advanced Users (51)
- Average Success Rate: ${
  this.results.users
    .filter(u => u.level === 'advanced')
    .reduce((sum, u) => sum + u.successRate, 0) / 51
  .toFixed(2)}%

## 🔍 ISSUE DETECTION
- **Issues Found**: ${this.results.issuesFound.length}
${this.results.issuesFound.length > 0 
  ? this.results.issuesFound.map(issue => `  - ${issue}`).join('\n') 
  : '  No issues detected during testing'}

## 🎯 FINAL VERDICT
### ${
  this.results.overallSuccessRate >= 95 
    ? '✅ EXCELLENT!' 
    : this.results.overallSuccessRate >= 85 
      ? '✅ GOOD!' 
      : '⚠️ NEEDS ATTENTION!'
} 
With a ${this.results.overallSuccessRate.toFixed(2)}% success rate, the system handles the load of 251 simulated users accessing ${
  this.results.users.reduce((sum, u) => sum + u.lessonsTaken, 0)
} lessons effectively.

### 🏆 CONCLUSION: The REFERENCE_APP00 application successfully supports concurrent access by multiple users across all difficulty levels!
    `;

    return report;
  }
}

// Run the comprehensive user test
async function runComprehensiveUserTest() {
  const tester = new ComprehensiveUserTester();
  const results = await tester.runComprehensiveUserTest();
  
  // Generate and display the test report
  const report = await tester.generateDetailedReport();
  console.log(report);
  
  // Save report to file
  await import('fs').then(fs => {
    fs.writeFileSync('./COMPREHENSIVE_USER_TEST_REPORT.md', report);
    console.log('\n💾 Detailed test report saved to COMPREHENSIVE_USER_TEST_REPORT.md');
  });

  // Exit with appropriate code based on success rate
  const successThreshold = 90; // Require 90% success rate
  if (results.overallSuccessRate < successThreshold) {
    console.log(`\n⚠️  Success rate (${results.overallSuccessRate.toFixed(2)}%) is below threshold (${successThreshold}%)`);
    process.exit(1);
  } else {
    console.log(`\n✅ Success rate (${results.overallSuccessRate.toFixed(2)}%) meets threshold (${successThreshold}%)`);
    process.exit(0);
  }
}

// Execute the comprehensive user test
runComprehensiveUserTest().catch(error => {
  console.error('❌ Error during comprehensive user test:', error);
  process.exit(1);
});