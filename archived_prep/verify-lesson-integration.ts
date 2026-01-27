import { db } from "./server/db";
import { lessons, vocabulary, conversationLines, quizzes, quizQuestions, type Lesson } from "../shared/schema";
import { eq, and } from "drizzle-orm";

/**
 * Verification script to ensure all lessons are properly integrated
 * and accessible through the main app flow
 */

interface IntegrationCheckResult {
  totalLessons: number;
  lessonsWithoutVocabulary: number[];
  lessonsWithoutConversations: number[];
  lessonsWithoutQuizzes: number[];
  lessonsWithCompleteIntegration: number;
  integrationRate: number;
  orphanedVocabulary: number;
  orphanedConversations: number;
  orphanedQuizzes: number;
  missingSlugs: number[];
  duplicateSlugs: string[];
  issuesSummary: string[];
}

async function verifyLessonIntegration() {
  console.log("🔍 Starting Lesson Integration Verification...");
  
  try {
    // Get all lessons
    const allLessons = await db.select().from(lessons);
    console.log(`📊 Total lessons found: ${allLessons.length}`);
    
    if (allLessons.length === 0) {
      console.log("❌ No lessons found in database!");
      return;
    }

    // Check for integration completeness
    const result: IntegrationCheckResult = {
      totalLessons: allLessons.length,
      lessonsWithoutVocabulary: [],
      lessonsWithoutConversations: [],
      lessonsWithoutQuizzes: [],
      lessonsWithCompleteIntegration: 0,
      integrationRate: 0,
      orphanedVocabulary: 0,
      orphanedConversations: 0,
      orphanedQuizzes: 0,
      missingSlugs: [],
      duplicateSlugs: [],
      issuesSummary: []
    };

    // Check for slug issues
    const slugMap = new Map<string, number[]>();
    for (const lesson of allLessons) {
      if (!lesson.slug || lesson.slug.trim() === '') {
        result.missingSlugs.push(lesson.id);
        result.issuesSummary.push(`Lesson ${lesson.id} is missing a slug`);
      } else {
        if (!slugMap.has(lesson.slug)) {
          slugMap.set(lesson.slug, []);
        }
        slugMap.get(lesson.slug)?.push(lesson.id);
      }
    }

    // Identify duplicate slugs
    for (const [slug, ids] of slugMap.entries()) {
      if (ids.length > 1) {
        result.duplicateSlugs.push(slug);
        result.issuesSummary.push(`Duplicate slug '${slug}' found for lessons: ${ids.join(', ')}`);
      }
    }

    // Check each lesson for proper integration
    console.log("\n🔍 Checking individual lesson integrations...");
    let completeIntegrationCount = 0;
    
    for (const lesson of allLessons) {
      // Check vocabulary
      const vocabCount = await db.select().from(vocabulary).where(eq(vocabulary.lessonId, lesson.id));
      if (vocabCount.length === 0) {
        result.lessonsWithoutVocabulary.push(lesson.id);
      }
      
      // Check conversations
      const convCount = await db.select().from(conversationLines).where(eq(conversationLines.lessonId, lesson.id));
      if (convCount.length === 0) {
        result.lessonsWithoutConversations.push(lesson.id);
      }
      
      // Check quizzes (not all lessons need quizzes, but check for completeness)
      const quizCount = await db.select().from(quizzes).where(eq(quizzes.lessonId, lesson.id));
      if (quizCount.length === 0) {
        result.lessonsWithoutQuizzes.push(lesson.id);
      }
      
      // A lesson with both vocabulary and conversations is considered well-integrated
      if (vocabCount.length > 0 && convCount.length > 0) {
        completeIntegrationCount++;
      }
    }
    
    result.lessonsWithCompleteIntegration = completeIntegrationCount;
    result.integrationRate = (completeIntegrationCount / allLessons.length) * 100;
    
    // Check for orphaned records
    console.log("\n🔍 Checking for orphaned records...");
    
    // Find vocabulary without valid lessons
    const allVocab = await db.select().from(vocabulary);
    for (const vocab of allVocab) {
      const lessonExists = await db.select().from(lessons).where(eq(lessons.id, vocab.lessonId));
      if (lessonExists.length === 0) {
        result.orphanedVocabulary++;
      }
    }
    
    // Find conversation lines without valid lessons
    const allConv = await db.select().from(conversationLines);
    for (const conv of allConv) {
      const lessonExists = await db.select().from(lessons).where(eq(lessons.id, conv.lessonId));
      if (lessonExists.length === 0) {
        result.orphanedConversations++;
      }
    }
    
    // Find quizzes without valid lessons
    const allQuizzes = await db.select().from(quizzes);
    for (const quiz of allQuizzes) {
      if (quiz.lessonId) { // Only check if lessonId is set
        const lessonExists = await db.select().from(lessons).where(eq(lessons.id, quiz.lessonId));
        if (lessonExists.length === 0) {
          result.orphanedQuizzes++;
        }
      }
    }

    // Generate summary
    console.log("\n✅ INTEGRATION VERIFICATION RESULTS:");
    console.log(`   Total Lessons: ${result.totalLessons}`);
    console.log(`   Lessons with Complete Integration (vocab + conversations): ${result.lessonsWithCompleteIntegration} (${result.integrationRate.toFixed(2)}%)`);
    console.log(`   Lessons without Vocabulary: ${result.lessonsWithoutVocabulary.length}`);
    console.log(`   Lessons without Conversations: ${result.lessonsWithoutConversations.length}`);
    console.log(`   Lessons without Quizzes: ${result.lessonsWithoutQuizzes.length}`);
    console.log(`   Orphaned Vocabulary Items: ${result.orphanedVocabulary}`);
    console.log(`   Orphaned Conversation Lines: ${result.orphanedConversations}`);
    console.log(`   Orphaned Quizzes: ${result.orphanedQuizzes}`);
    console.log(`   Missing Slugs: ${result.missingSlugs.length}`);
    console.log(`   Duplicate Slugs: ${result.duplicateSlugs.length}`);

    // Add summary issues
    if (result.lessonsWithoutVocabulary.length > 0) {
      result.issuesSummary.push(`${result.lessonsWithoutVocabulary.length} lessons lack vocabulary integration`);
    }
    
    if (result.lessonsWithoutConversations.length > 0) {
      result.issuesSummary.push(`${result.lessonsWithoutConversations.length} lessons lack conversation integration`);
    }
    
    if (result.orphanedVocabulary > 0) {
      result.issuesSummary.push(`${result.orphanedVocabulary} orphaned vocabulary items found`);
    }
    
    if (result.orphanedConversations > 0) {
      result.issuesSummary.push(`${result.orphanedConversations} orphaned conversation lines found`);
    }
    
    if (result.missingSlugs.length > 0) {
      result.issuesSummary.push(`${result.missingSlugs.length} lessons missing slugs`);
    }
    
    if (result.duplicateSlugs.length > 0) {
      result.issuesSummary.push(`${result.duplicateSlugs.length} duplicate slugs found`);
    }

    // Generate detailed report
    const report = `
# 🔍 LESSON INTEGRATION VERIFICATION REPORT

## 📊 EXECUTION SUMMARY
- **Total Lessons**: ${result.totalLessons}
- **Lessons with Complete Integration**: ${result.lessonsWithCompleteIntegration} (${result.integrationRate.toFixed(2)}%)
- **Lessons without Vocabulary**: ${result.lessonsWithoutVocabulary.length}
- **Lessons without Conversations**: ${result.lessonsWithoutConversations.length}
- **Orphaned Records**: ${result.orphanedVocabulary + result.orphanedConversations + result.orphanedQuizzes}

## 🎯 INTEGRATION ANALYSIS
### Complete Integration Rate
- **Well-Integrated Lessons**: ${result.lessonsWithCompleteIntegration} (${result.integrationRate.toFixed(2)}%)
- **Minimum Recommended**: 80%

### Content Distribution
- **Lessons with Vocabulary**: ${result.totalLessons - result.lessonsWithoutVocabulary.length} (${((result.totalLessons - result.lessonsWithoutVocabulary.length) / result.totalLessons * 100).toFixed(2)}%)
- **Lessons with Conversations**: ${result.totalLessons - result.lessonsWithoutConversations.length} (${((result.totalLessons - result.lessonsWithoutConversations.length) / result.totalLessons * 100).toFixed(2)}%)
- **Lessons with Quizzes**: ${result.totalLessons - result.lessonsWithoutQuizzes.length} (${((result.totalLessons - result.lessonsWithoutQuizzes.length) / result.totalLessons * 100).toFixed(2)}%)

## ⚠️ ISSUES IDENTIFIED
${result.issuesSummary.length > 0 
  ? result.issuesSummary.map(issue => `- ${issue}`).join('\n')
  : 'No issues identified - all lessons are properly integrated!'}

## 🎯 RECOMMENDATIONS
${result.lessonsWithoutVocabulary.length > 0 
  ? `- Add vocabulary to ${result.lessonsWithoutVocabulary.length} lessons` 
  : ''}
${result.lessonsWithoutConversations.length > 0 
  ? `- Add conversation content to ${result.lessonsWithoutConversations.length} lessons` 
  : ''}
${result.missingSlugs.length > 0 
  ? `- Generate slugs for ${result.missingSlugs.length} lessons` 
  : ''}
${result.orphanedVocabulary > 0 
  ? `- Clean up ${result.orphanedVocabulary} orphaned vocabulary items` 
  : ''}
${result.orphanedConversations > 0 
  ? `- Clean up ${result.orphanedConversations} orphaned conversation lines` 
  : ''}

## 🔧 INTEGRATION STATUS
### ${
  result.integrationRate >= 80 
    ? '✅ EXCELLENT!' 
    : result.integrationRate >= 60 
      ? '⚠️ NEEDS IMPROVEMENT' 
      : '❌ CRITICAL'
} 
${result.integrationRate.toFixed(2)}% of lessons have complete integration (vocabulary + conversations).

## 🏆 CONCLUSION
The REFERENCE_APP00 has ${
  result.integrationRate >= 80 
    ? 'strong lesson integration' 
    : result.integrationRate >= 60 
      ? 'moderate lesson integration that needs enhancement' 
      : 'poor lesson integration that requires immediate attention'
}. ${
  result.integrationRate >= 80 
    ? 'Users will have rich learning experiences with vocabulary and conversations.' 
    : 'Consider enhancing lessons with vocabulary and conversation content.'
}
    `;

    console.log(report);

    // Save report to file
    await import('fs').then(fs => {
      fs.writeFileSync('./LESSON_INTEGRATION_REPORT.md', report);
      console.log('\n💾 Integration report saved to LESSON_INTEGRATION_REPORT.md');
    });

    // Return result for potential further processing
    return result;

  } catch (error) {
    console.error("❌ Error during lesson integration verification:", error);
    throw error;
  }
}

// Run the verification
verifyLessonIntegration().catch(error => {
  console.error('❌ Error during lesson integration verification:', error);
  process.exit(1);
});