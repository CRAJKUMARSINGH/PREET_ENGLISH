import { db } from "./server/db";
import { lessons } from "./shared/schema";

/**
 * Rapid Lesson Accessibility Test
 * Tests random sample of lessons across all difficulty levels
 */

async function rapidLessonTest() {
  console.log("🚀 Starting Rapid Lesson Accessibility Test...\n");
  
  const startTime = Date.now();
  
  // Get all lessons
  console.log("📊 Fetching lessons from database...");
  const allLessons = db.select().from(lessons).all();
  console.log(`✅ Found ${allLessons.length} total lessons\n`);
  
  if (allLessons.length === 0) {
    console.error("❌ No lessons found in database!");
    process.exit(1);
  }
  
  // Group by difficulty
  const beginnerLessons = allLessons.filter(l => l.difficulty === "Beginner");
  const intermediateLessons = allLessons.filter(l => l.difficulty === "Intermediate");
  const advancedLessons = allLessons.filter(l => l.difficulty === "Advanced");
  
  console.log("📈 Difficulty Breakdown:");
  console.log(`   Beginner: ${beginnerLessons.length}`);
  console.log(`   Intermediate: ${intermediateLessons.length}`);
  console.log(`   Advanced: ${advancedLessons.length}\n`);
  
  // Test random samples
  const sampleSize = 100;
  console.log(`🔍 Testing ${sampleSize} random lessons from each difficulty level...\n`);
  
  let successCount = 0;
  let failCount = 0;
  const issues: string[] = [];
  
  // Helper to get random sample
  const getRandomSample = <T,>(array: T[], size: number): T[] => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(size, array.length));
  };
  
  // Helper to test lesson
  const testLesson = (lesson: any, difficulty: string) => {
    try {
      // Check required fields
      if (!lesson.id || !lesson.title || !lesson.content) {
        issues.push(`${difficulty} lesson ${lesson.id}: Missing required fields`);
        failCount++;
        return false;
      }
      
      // Check content is not empty
      if (lesson.content.trim().length < 10) {
        issues.push(`${difficulty} lesson ${lesson.id}: Content too short`);
        failCount++;
        return false;
      }
      
      successCount++;
      return true;
    } catch (error) {
      issues.push(`${difficulty} lesson ${lesson.id}: ${(error as Error).message}`);
      failCount++;
      return false;
    }
  };
  
  // Test Beginner samples
  console.log("Testing Beginner lessons...");
  const beginnerSamples = getRandomSample(beginnerLessons, sampleSize);
  beginnerSamples.forEach(lesson => testLesson(lesson, "Beginner"));
  
  // Test Intermediate samples
  console.log("Testing Intermediate lessons...");
  const intermediateSamples = getRandomSample(intermediateLessons, sampleSize);
  intermediateSamples.forEach(lesson => testLesson(lesson, "Intermediate"));
  
  // Test Advanced samples
  console.log("Testing Advanced lessons...");
  const advancedSamples = getRandomSample(advancedLessons, sampleSize);
  advancedSamples.forEach(lesson => testLesson(lesson, "Advanced"));
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  // Generate report
  console.log("\n" + "=".repeat(60));
  console.log("📋 RAPID LESSON ACCESSIBILITY TEST REPORT");
  console.log("=".repeat(60));
  console.log(`\n✅ Tests Passed: ${successCount}`);
  console.log(`❌ Tests Failed: ${failCount}`);
  console.log(`📊 Success Rate: ${((successCount / (successCount + failCount)) * 100).toFixed(2)}%`);
  console.log(`⏱️  Execution Time: ${duration}s`);
  
  if (issues.length > 0) {
    console.log(`\n⚠️  Issues Found (${issues.length}):`);
    issues.slice(0, 10).forEach((issue, idx) => {
      console.log(`   ${idx + 1}. ${issue}`);
    });
    if (issues.length > 10) {
      console.log(`   ... and ${issues.length - 10} more issues`);
    }
  } else {
    console.log("\n✅ No issues found!");
  }
  
  // Test categories
  const categories = new Set(allLessons.map(l => l.category));
  console.log(`\n🏷️  Total Categories: ${categories.size}`);
  console.log(`   Categories: ${Array.from(categories).slice(0, 10).join(", ")}${categories.size > 10 ? "..." : ""}`);
  
  console.log("\n" + "=".repeat(60));
  console.log("🎉 RAPID TEST COMPLETE!");
  console.log("=".repeat(60) + "\n");
  
  // Exit with appropriate code
  if (failCount > 0) {
    console.log("⚠️  Some tests failed. Please review the issues above.");
    process.exit(1);
  } else {
    console.log("✅ All tests passed successfully!");
    process.exit(0);
  }
}

rapidLessonTest().catch(error => {
  console.error("❌ Fatal error during testing:", error);
  process.exit(1);
});
