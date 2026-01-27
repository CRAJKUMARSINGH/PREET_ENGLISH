import Database from 'better-sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = (process.env.DATABASE_URL || '').replace('file:', '');
const sqlite = new Database(dbPath);

async function checkVocabDistribution() {
  console.log('=== VOCABULARY DISTRIBUTION ANALYSIS ===\n');

  // Lessons with 0 vocab
  const noVocab = sqlite.prepare(`
    SELECT COUNT(*) as cnt FROM (
      SELECT l.id 
      FROM lessons l 
      LEFT JOIN vocabulary v ON l.id = v.lesson_id 
      GROUP BY l.id 
      HAVING COUNT(v.id) = 0
    )
  `).get() as any;
  console.log('Lessons with 0 vocab words:', noVocab.cnt);

  // Distribution buckets
  const distribution = sqlite.prepare(`
    SELECT 
      CASE 
        WHEN vocab_count = 0 THEN '0 words'
        WHEN vocab_count BETWEEN 1 AND 2 THEN '1-2 words'
        WHEN vocab_count BETWEEN 3 AND 5 THEN '3-5 words'
        WHEN vocab_count BETWEEN 6 AND 7 THEN '6-7 words'
        WHEN vocab_count BETWEEN 8 AND 15 THEN '8-15 words (TARGET)'
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
  
  console.log('\n📊 Vocab per lesson distribution:');
  for (const row of distribution) {
    console.log(`  ${row.bucket}: ${row.lesson_count} lessons`);
  }

  // Non-business category breakdown
  const nonBusiness = sqlite.prepare(`
    SELECT category, COUNT(*) as cnt 
    FROM lessons 
    WHERE category != 'Business'
    GROUP BY category
    ORDER BY cnt DESC
    LIMIT 15
  `).all() as any[];
  
  console.log('\n📂 Non-Business Categories (top 15):');
  for (const row of nonBusiness) {
    console.log(`  ${row.category}: ${row.cnt}`);
  }

  // Check speaking exercises in lessons
  const withSpeaking = sqlite.prepare(`
    SELECT COUNT(*) as cnt FROM lessons WHERE speaking_exercises IS NOT NULL AND speaking_exercises != ''
  `).get() as any;
  console.log('\n🎤 Lessons with speaking exercises:', withSpeaking.cnt);

  sqlite.close();
  process.exit(0);
}

checkVocabDistribution().catch(console.error);
