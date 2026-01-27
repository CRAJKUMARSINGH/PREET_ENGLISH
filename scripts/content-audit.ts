import { db } from '../server/db';
import { lessons, vocabulary, stories, scenarios, speakingTopics, listenings } from '../shared/schema';
import { count, isNull, sql } from 'drizzle-orm';

async function audit() {
  console.log('=== PREET_ENGLISH CONTENT AUDIT ===\n');

  // Basic counts
  const lessonCount = await db.select({ count: count() }).from(lessons);
  const vocabCount = await db.select({ count: count() }).from(vocabulary);
  const storyCount = await db.select({ count: count() }).from(stories);
  const scenarioCount = await db.select({ count: count() }).from(scenarios);
  const topicCount = await db.select({ count: count() }).from(speakingTopics);
  const listeningCount = await db.select({ count: count() }).from(listenings);

  console.log('📊 CONTENT COUNTS:');
  console.log(`  Lessons: ${lessonCount[0].count}`);
  console.log(`  Vocabulary: ${vocabCount[0].count}`);
  console.log(`  Stories: ${storyCount[0].count}`);
  console.log(`  Scenarios: ${scenarioCount[0].count}`);
  console.log(`  Speaking Topics: ${topicCount[0].count}`);
  console.log(`  Listenings: ${listeningCount[0].count}`);

  // Hindi translation coverage
  const lessonsNoHindiTitle = await db.select({ count: count() }).from(lessons).where(isNull(lessons.hindiTitle));
  const lessonsNoHindiDesc = await db.select({ count: count() }).from(lessons).where(isNull(lessons.hindiDescription));
  const vocabNoHindi = await db.select({ count: count() }).from(vocabulary).where(isNull(vocabulary.hindiTranslation));
  const storiesNoHindi = await db.select({ count: count() }).from(stories).where(isNull(stories.titleHindi));
  const scenariosNoHindi = await db.select({ count: count() }).from(scenarios).where(isNull(scenarios.titleHindi));
  const topicsNoHindi = await db.select({ count: count() }).from(speakingTopics).where(isNull(speakingTopics.hindiTitle));

  console.log('\n🇮🇳 HINDI TRANSLATION COVERAGE:');
  console.log(`  Lessons missing Hindi title: ${lessonsNoHindiTitle[0].count}/${lessonCount[0].count}`);
  console.log(`  Lessons missing Hindi desc: ${lessonsNoHindiDesc[0].count}/${lessonCount[0].count}`);
  console.log(`  Vocab missing Hindi: ${vocabNoHindi[0].count}/${vocabCount[0].count}`);
  console.log(`  Stories missing Hindi: ${storiesNoHindi[0].count}/${storyCount[0].count}`);
  console.log(`  Scenarios missing Hindi: ${scenariosNoHindi[0].count}/${scenarioCount[0].count}`);
  console.log(`  Topics missing Hindi: ${topicsNoHindi[0].count}/${topicCount[0].count}`);

  // Vocabulary per lesson analysis
  const totalLessons = Number(lessonCount[0].count);
  const totalVocab = Number(vocabCount[0].count);
  const avgVocab = totalLessons > 0 ? (totalVocab / totalLessons).toFixed(2) : 0;

  console.log('\n📚 VOCABULARY ANALYSIS:');
  console.log(`  Average vocab per lesson: ${avgVocab}`);
  console.log(`  Target: 8-15 words per lesson`);

  // Sample a few lessons to check quality
  const sampleLessons = await db.select().from(lessons).limit(3);
  console.log('\n📝 SAMPLE LESSONS:');
  for (const lesson of sampleLessons) {
    const lessonVocab = await db.select({ count: count() }).from(vocabulary).where(sql`${vocabulary.lessonId} = ${lesson.id}`);
    console.log(`  [${lesson.id}] ${lesson.title}`);
    console.log(`      Hindi: ${lesson.hindiTitle || 'MISSING'}`);
    console.log(`      Vocab count: ${lessonVocab[0].count}`);
    console.log(`      Category: ${lesson.category}`);
    console.log(`      Difficulty: ${lesson.difficulty}`);
  }

  // Categories breakdown
  const categories = await db.select({ 
    category: lessons.category, 
    count: count() 
  }).from(lessons).groupBy(lessons.category);
  
  console.log('\n📂 CATEGORIES:');
  for (const cat of categories) {
    console.log(`  ${cat.category}: ${cat.count} lessons`);
  }

  // Quality score calculation
  const hindiCoverage = ((totalLessons - Number(lessonsNoHindiTitle[0].count)) / totalLessons * 100).toFixed(1);
  const vocabCoverage = totalVocab > 0 ? ((totalVocab - Number(vocabNoHindi[0].count)) / totalVocab * 100).toFixed(1) : 0;
  
  console.log('\n⭐ QUALITY SCORES:');
  console.log(`  Hindi lesson coverage: ${hindiCoverage}%`);
  console.log(`  Hindi vocab coverage: ${vocabCoverage}%`);
  console.log(`  Content richness: ${Number(avgVocab) >= 8 ? '✅ Good' : '⚠️ Needs more vocab'}`);

  process.exit(0);
}

audit().catch(console.error);
