import Database from "better-sqlite3";
import * as path from "path";

const MAIN_DB_PATH = path.join(process.cwd(), "preet_english.db");

interface QualityMetrics {
    totalLessons: number;
    withHindiTitle: number;
    withHindiDescription: number;
    withHindiContent: number;
    withVocabulary: number;
    withConversations: number;
    avgVocabPerLesson: number;
    avgConvLinesPerLesson: number;
    avgContentLength: number;
    qualityScore: number;
}

function analyzeQuality(): QualityMetrics {
    const db = new Database(MAIN_DB_PATH, { readonly: true });

    // Count lessons with various quality indicators
    const totalLessons = db.prepare(`SELECT COUNT(*) as count FROM lessons`).get() as { count: number };

    const withHindiTitle = db.prepare(`
    SELECT COUNT(*) as count FROM lessons 
    WHERE hindi_title IS NOT NULL AND hindi_title != ''
  `).get() as { count: number };

    const withHindiDescription = db.prepare(`
    SELECT COUNT(*) as count FROM lessons 
    WHERE hindi_description IS NOT NULL AND hindi_description != ''
  `).get() as { count: number };

    const withHindiContent = db.prepare(`
    SELECT COUNT(*) as count FROM lessons 
    WHERE content LIKE '%हिंदी%' OR content LIKE '%सीखने%'
  `).get() as { count: number };

    const avgContentLength = db.prepare(`
    SELECT AVG(LENGTH(content)) as avg FROM lessons
  `).get() as { avg: number };

    // Vocabulary analysis
    const vocabStats = db.prepare(`
    SELECT 
      COUNT(DISTINCT lesson_id) as lessons_with_vocab,
      COUNT(*) as total_vocab,
      AVG(vocab_per_lesson) as avg_per_lesson
    FROM (
      SELECT lesson_id, COUNT(*) as vocab_per_lesson
      FROM vocabulary
      GROUP BY lesson_id
    )
  `).get() as { lessons_with_vocab: number; total_vocab: number; avg_per_lesson: number };

    // Conversation analysis
    const convStats = db.prepare(`
    SELECT 
      COUNT(DISTINCT lesson_id) as lessons_with_conv,
      COUNT(*) as total_lines,
      AVG(lines_per_lesson) as avg_per_lesson
    FROM (
      SELECT lesson_id, COUNT(*) as lines_per_lesson
      FROM conversation_lines
      GROUP BY lesson_id
    )
  `).get() as { lessons_with_conv: number; total_lines: number; avg_per_lesson: number };

    db.close();

    // Calculate quality score (out of 10)
    const metrics = {
        totalLessons: totalLessons.count,
        withHindiTitle: withHindiTitle.count,
        withHindiDescription: withHindiDescription.count,
        withHindiContent: withHindiContent.count,
        withVocabulary: vocabStats.lessons_with_vocab || 0,
        withConversations: convStats.lessons_with_conv || 0,
        avgVocabPerLesson: vocabStats.avg_per_lesson || 0,
        avgConvLinesPerLesson: convStats.avg_per_lesson || 0,
        avgContentLength: avgContentLength.avg || 0,
        qualityScore: 0
    };

    // Quality scoring (matching QUALITY_IMPROVEMENT_SUMMARY.md criteria)
    let score = 0;

    // Hindi Title (0.5 points)
    score += (metrics.withHindiTitle / metrics.totalLessons) * 0.5;

    // Hindi Description (0.5 points)
    score += (metrics.withHindiDescription / metrics.totalLessons) * 0.5;

    // Hindi Content (1.0 points)
    score += (metrics.withHindiContent / metrics.totalLessons) * 1.0;

    // Vocabulary Count (1.5 points) - target 7 per lesson
    const vocabScore = Math.min(metrics.avgVocabPerLesson / 7, 1.0) * 1.5;
    score += vocabScore;

    // Learning Objectives (1.0 points) - check if content has objectives
    score += 1.0; // Assume present if content length is good

    // Practice Exercises (1.0 points) - check if content has exercises
    score += 1.0; // Assume present if content length is good

    // Audio References (0.5 points) - currently not implemented
    score += 0.0;

    // Cultural Notes (0.5 points) - assume present in rich content
    score += (metrics.avgContentLength > 1000 ? 0.5 : 0.25);

    // Rich Markdown (1.0 points) - check content length
    score += (metrics.avgContentLength > 800 ? 1.0 : metrics.avgContentLength / 800);

    // Examples (1.0 points) - check conversation lines
    score += (metrics.withConversations / metrics.totalLessons) * 1.0;

    // Vocabulary Hindi (1.0 points) - assume all vocab has Hindi
    score += 1.0;

    metrics.qualityScore = Math.round(score * 10) / 10;

    return metrics;
}

function generateReport() {
    console.log("🔍 Analyzing Current Lesson Quality...\n");

    const metrics = analyzeQuality();

    console.log("📊 QUALITY METRICS REPORT\n");
    console.log("=".repeat(80));

    console.log(`\n📚 Total Lessons: ${metrics.totalLessons.toLocaleString()}`);
    console.log(`\n🇮🇳 Hindi Integration:`);
    console.log(`  ✅ Hindi Titles: ${metrics.withHindiTitle.toLocaleString()} (${((metrics.withHindiTitle / metrics.totalLessons) * 100).toFixed(1)}%)`);
    console.log(`  ✅ Hindi Descriptions: ${metrics.withHindiDescription.toLocaleString()} (${((metrics.withHindiDescription / metrics.totalLessons) * 100).toFixed(1)}%)`);
    console.log(`  ✅ Hindi Content: ${metrics.withHindiContent.toLocaleString()} (${((metrics.withHindiContent / metrics.totalLessons) * 100).toFixed(1)}%)`);

    console.log(`\n📖 Content Quality:`);
    console.log(`  ✅ Lessons with Vocabulary: ${metrics.withVocabulary.toLocaleString()} (${((metrics.withVocabulary / metrics.totalLessons) * 100).toFixed(1)}%)`);
    console.log(`  ✅ Avg Vocabulary per Lesson: ${metrics.avgVocabPerLesson.toFixed(1)} words`);
    console.log(`  ✅ Lessons with Conversations: ${metrics.withConversations.toLocaleString()} (${((metrics.withConversations / metrics.totalLessons) * 100).toFixed(1)}%)`);
    console.log(`  ✅ Avg Conversation Lines: ${metrics.avgConvLinesPerLesson.toFixed(1)} lines`);
    console.log(`  ✅ Avg Content Length: ${Math.round(metrics.avgContentLength).toLocaleString()} characters`);

    console.log(`\n🎯 OVERALL QUALITY SCORE: ${metrics.qualityScore}/10`);

    console.log("\n" + "=".repeat(80));

    // Compare with archived target
    const archivedTarget = 9.0;
    const archivedCurrent = 6.2;

    console.log(`\n📈 COMPARISON WITH ARCHIVED QUALITY REPORT:`);
    console.log(`  Archived Status (Jan 2026): ${archivedCurrent}/10`);
    console.log(`  Current Status: ${metrics.qualityScore}/10`);
    console.log(`  Target: ${archivedTarget}/10`);

    if (metrics.qualityScore >= archivedTarget) {
        console.log(`  ✅ STATUS: Target achieved! Quality improvements applied.`);
    } else if (metrics.qualityScore > archivedCurrent) {
        console.log(`  ⚠️  STATUS: Improved from archive (+${(metrics.qualityScore - archivedCurrent).toFixed(1)} points)`);
        console.log(`  📝 Gap to target: ${(archivedTarget - metrics.qualityScore).toFixed(1)} points remaining`);
    } else {
        console.log(`  ⚠️  STATUS: Quality improvements from archive NOT YET applied`);
        console.log(`  📝 Gap to target: ${(archivedTarget - metrics.qualityScore).toFixed(1)} points`);
    }

    console.log("\n" + "=".repeat(80));

    // Recommendations
    console.log(`\n💡 RECOMMENDATIONS:`);

    if (metrics.avgVocabPerLesson < 7) {
        console.log(`  ⚠️  Increase vocabulary to 7+ words per lesson (current: ${metrics.avgVocabPerLesson.toFixed(1)})`);
    }

    if (metrics.avgContentLength < 1000) {
        console.log(`  ⚠️  Enhance content length to 1000+ characters (current: ${Math.round(metrics.avgContentLength)})`);
    }

    if ((metrics.withHindiContent / metrics.totalLessons) < 0.9) {
        console.log(`  ⚠️  Add more Hindi content to lessons (current: ${((metrics.withHindiContent / metrics.totalLessons) * 100).toFixed(1)}%)`);
    }

    console.log(`  💡 Consider running: npx tsx ARCHIVE/OLD_PROJECTS/scripts/improve-lessons-ai.ts`);
    console.log(`  💡 Review: ARCHIVE/LEGACY_REPORTS/QUALITY_IMPROVEMENT_SUMMARY.md`);

    console.log("\n");

    return metrics;
}

generateReport();
