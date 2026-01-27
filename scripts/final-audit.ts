/**
 * FINAL COMPREHENSIVE AUDIT
 * Complete content quality assessment for PREET_ENGLISH
 */

import Database from 'better-sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = (process.env.DATABASE_URL || '').replace('file:', '');
const db = new Database(dbPath);

async function finalAudit() {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║        PREET_ENGLISH - FINAL CONTENT AUDIT REPORT           ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  // 1. Content Counts
  const lessons = db.prepare('SELECT COUNT(*) as cnt FROM lessons').get() as any;
  const vocab = db.prepare('SELECT COUNT(*) as cnt FROM vocabulary').get() as any;
  const stories = db.prepare('SELECT COUNT(*) as cnt FROM stories').get() as any;
  const scenarios = db.prepare('SELECT COUNT(*) as cnt FROM scenarios').get() as any;
  const topics = db.prepare('SELECT COUNT(*) as cnt FROM speaking_topics').get() as any;
  const listenings = db.prepare('SELECT COUNT(*) as cnt FROM listenings').get() as any;

  console.log('📊 CONTENT INVENTORY');
  console.log('─'.repeat(50));
  console.log(`  Lessons:          ${lessons.cnt.toLocaleString()}`);
  console.log(`  Vocabulary:       ${vocab.cnt.toLocaleString()}`);
  console.log(`  Stories:          ${stories.cnt}`);
  console.log(`  Scenarios:        ${scenarios.cnt}`);
  console.log(`  Speaking Topics:  ${topics.cnt}`);
  console.log(`  Listenings:       ${listenings.cnt}`);

  // 2. Hindi Coverage
  const lessonsNoHindiTitle = db.prepare('SELECT COUNT(*) as cnt FROM lessons WHERE hindi_title IS NULL').get() as any;
  const lessonsNoHindiDesc = db.prepare('SELECT COUNT(*) as cnt FROM lessons WHERE hindi_description IS NULL').get() as any;
  const vocabNoHindi = db.prepare('SELECT COUNT(*) as cnt FROM vocabulary WHERE hindi_translation IS NULL').get() as any;
  const storiesNoHindi = db.prepare('SELECT COUNT(*) as cnt FROM stories WHERE title_hindi IS NULL').get() as any;

  const hindiLessonPct = ((lessons.cnt - lessonsNoHindiTitle.cnt) / lessons.cnt * 100).toFixed(1);
  const hindiVocabPct = ((vocab.cnt - vocabNoHindi.cnt) / vocab.cnt * 100).toFixed(1);

  console.log('\n🇮🇳 HINDI TRANSLATION COVERAGE');
  console.log('─'.repeat(50));
  console.log(`  Lessons with Hindi title:    ${hindiLessonPct}%`);
  console.log(`  Vocabulary with Hindi:       ${hindiVocabPct}%`);
  console.log(`  Stories with Hindi:          ${stories.cnt - storiesNoHindi.cnt}/${stories.cnt}`);

  // 3. Vocabulary Distribution
  const vocabDist = db.prepare(`
    SELECT 
      CASE 
        WHEN vocab_count = 0 THEN '0 words'
        WHEN vocab_count BETWEEN 1 AND 4 THEN '1-4 words'
        WHEN vocab_count BETWEEN 5 AND 7 THEN '5-7 words'
        WHEN vocab_count BETWEEN 8 AND 15 THEN '8-15 words ✓'
        ELSE '16+ words'
      END as bucket,
      COUNT(*) as lesson_count
    FROM (
      SELECT l.id, COUNT(v.id) as vocab_count
      FROM lessons l
      LEFT JOIN vocabulary v ON l.id = v.lesson_id
      GROUP BY l.id
    )
    GROUP BY bucket
  `).all() as any[];

  console.log('\n📚 VOCABULARY PER LESSON');
  console.log('─'.repeat(50));
  for (const row of vocabDist) {
    const pct = (row.lesson_count / lessons.cnt * 100).toFixed(1);
    console.log(`  ${row.bucket.padEnd(20)} ${row.lesson_count.toLocaleString().padStart(6)} (${pct}%)`);
  }

  // 4. Speaking Exercises
  const withSpeaking = db.prepare(`SELECT COUNT(*) as cnt FROM lessons WHERE speaking_exercises IS NOT NULL AND speaking_exercises != ''`).get() as any;
  const speakingPct = (withSpeaking.cnt / lessons.cnt * 100).toFixed(1);

  console.log('\n🎤 SPEAKING EXERCISES');
  console.log('─'.repeat(50));
  console.log(`  Lessons with exercises:      ${withSpeaking.cnt.toLocaleString()} (${speakingPct}%)`);

  // 5. Category Distribution (top 10)
  const categories = db.prepare(`
    SELECT category, COUNT(*) as cnt 
    FROM lessons 
    GROUP BY category 
    ORDER BY cnt DESC 
    LIMIT 10
  `).all() as any[];

  console.log('\n📂 TOP 10 CATEGORIES');
  console.log('─'.repeat(50));
  for (const cat of categories) {
    const pct = (cat.cnt / lessons.cnt * 100).toFixed(1);
    console.log(`  ${cat.category.padEnd(25)} ${cat.cnt.toLocaleString().padStart(6)} (${pct}%)`);
  }

  // 6. Difficulty Distribution
  const difficulties = db.prepare(`
    SELECT difficulty, COUNT(*) as cnt 
    FROM lessons 
    GROUP BY difficulty
  `).all() as any[];

  console.log('\n📈 DIFFICULTY LEVELS');
  console.log('─'.repeat(50));
  for (const diff of difficulties) {
    const pct = (diff.cnt / lessons.cnt * 100).toFixed(1);
    console.log(`  ${(diff.difficulty || 'Unknown').padEnd(15)} ${diff.cnt.toLocaleString().padStart(6)} (${pct}%)`);
  }

  // 7. Quality Score
  const avgVocab = vocab.cnt / lessons.cnt;
  const qualityScore = (
    (parseFloat(hindiLessonPct) * 0.3) +
    (parseFloat(hindiVocabPct) * 0.2) +
    (Math.min(avgVocab / 8, 1) * 100 * 0.2) +
    (parseFloat(speakingPct) * 0.2) +
    (Math.min(stories.cnt / 20, 1) * 100 * 0.1)
  ).toFixed(1);

  console.log('\n⭐ OVERALL QUALITY SCORE');
  console.log('─'.repeat(50));
  console.log(`  Score: ${qualityScore}/100`);
  console.log(`  Grade: ${parseFloat(qualityScore) >= 80 ? 'A - Launch Ready' : parseFloat(qualityScore) >= 60 ? 'B - Good' : 'C - Needs Work'}`);

  // 8. Summary
  console.log('\n' + '═'.repeat(60));
  console.log('📋 EXECUTIVE SUMMARY');
  console.log('═'.repeat(60));
  console.log(`  ✅ ${lessons.cnt.toLocaleString()} lessons with ${hindiLessonPct}% Hindi coverage`);
  console.log(`  ✅ ${vocab.cnt.toLocaleString()} vocabulary words (avg ${avgVocab.toFixed(1)}/lesson)`);
  console.log(`  ✅ ${withSpeaking.cnt.toLocaleString()} lessons with speaking exercises`);
  console.log(`  ✅ ${stories.cnt} bilingual stories`);
  console.log(`  ✅ ${listenings.cnt} listening exercises`);
  console.log(`  ✅ ${scenarios.cnt} roleplay scenarios`);
  console.log(`  ✅ ${topics.cnt} speaking topics`);

  db.close();
  process.exit(0);
}

finalAudit().catch(console.error);
