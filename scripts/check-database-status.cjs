#!/usr/bin/env node
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'preet_english.db');
const db = new Database(dbPath);

console.log('\n📊 DETAILED DATABASE STATUS\n');
console.log('='.repeat(80));

// Lesson statistics
const lessonStats = db.prepare(`
  SELECT 
    COUNT(*) as total,
    SUM(CASE WHEN hindi_title IS NOT NULL AND hindi_title != '' THEN 1 ELSE 0 END) as with_hindi_title,
    SUM(CASE WHEN hindi_description IS NOT NULL AND hindi_description != '' THEN 1 ELSE 0 END) as with_hindi_desc,
    SUM(CASE WHEN content LIKE '%Learning Objectives%' OR content LIKE '%🎯%' THEN 1 ELSE 0 END) as with_objectives,
    SUM(CASE WHEN content LIKE '%Practice%' OR content LIKE '%Exercise%' THEN 1 ELSE 0 END) as with_exercises,
    SUM(CASE WHEN content LIKE '%audio%' OR content LIKE '%pronunciation%' THEN 1 ELSE 0 END) as with_audio
  FROM lessons
`).get();

console.log('\n📚 LESSON STATISTICS:');
console.log(`  Total Lessons: ${lessonStats.total}`);
console.log(`  Lessons with Hindi Title: ${lessonStats.with_hindi_title} (${((lessonStats.with_hindi_title/lessonStats.total)*100).toFixed(1)}%)`);
console.log(`  Lessons with Hindi Description: ${lessonStats.with_hindi_desc} (${((lessonStats.with_hindi_desc/lessonStats.total)*100).toFixed(1)}%)`);
console.log(`  Lessons with Learning Objectives: ${lessonStats.with_objectives} (${((lessonStats.with_objectives/lessonStats.total)*100).toFixed(1)}%)`);
console.log(`  Lessons with Practice Exercises: ${lessonStats.with_exercises} (${((lessonStats.with_exercises/lessonStats.total)*100).toFixed(1)}%)`);
console.log(`  Lessons with Audio References: ${lessonStats.with_audio} (${((lessonStats.with_audio/lessonStats.total)*100).toFixed(1)}%)`);

// Vocabulary statistics
const vocabStats = db.prepare(`
  SELECT 
    COUNT(*) as total,
    SUM(CASE WHEN hindi_translation IS NOT NULL AND hindi_translation != '' THEN 1 ELSE 0 END) as with_hindi,
    AVG(CASE WHEN lesson_id IN (SELECT id FROM lessons) THEN 1 ELSE 0 END) as valid
  FROM vocabulary
`).get();

const vocabByLesson = db.prepare(`
  SELECT lesson_id, COUNT(*) as count
  FROM vocabulary
  GROUP BY lesson_id
`).all();

console.log('\n📖 VOCABULARY STATISTICS:');
console.log(`  Total Vocabulary Items: ${vocabStats.total}`);
console.log(`  Vocabulary with Hindi Translation: ${vocabStats.with_hindi} (${vocabStats.total > 0 ? ((vocabStats.with_hindi/vocabStats.total)*100).toFixed(1) : 0}%)`);
console.log(`  Vocabulary per Lesson:`);
vocabByLesson.forEach(v => {
  const lesson = db.prepare('SELECT title FROM lessons WHERE id = ?').get(v.lesson_id);
  console.log(`    Lesson ${v.lesson_id} (${lesson?.title || 'Unknown'}): ${v.count} items`);
});

// Individual lesson details
const lessons = db.prepare('SELECT * FROM lessons ORDER BY "order"').all();
console.log('\n📝 INDIVIDUAL LESSON DETAILS:');
lessons.forEach(lesson => {
  const vocabCount = db.prepare('SELECT COUNT(*) as count FROM vocabulary WHERE lesson_id = ?').get(lesson.id).count;
  const vocabWithHindi = db.prepare(`
    SELECT COUNT(*) as count 
    FROM vocabulary 
    WHERE lesson_id = ? AND hindi_translation IS NOT NULL AND hindi_translation != ''
  `).get(lesson.id).count;
  
  console.log(`\n  Lesson ${lesson.id}: ${lesson.title}`);
  console.log(`    Hindi Title: ${lesson.hindi_title || '❌ MISSING'}`);
  console.log(`    Hindi Description: ${lesson.hindi_description ? '✅ Present' : '❌ MISSING'}`);
  console.log(`    Vocabulary: ${vocabCount} items (${vocabWithHindi} with Hindi: ${vocabCount > 0 ? ((vocabWithHindi/vocabCount)*100).toFixed(0) : 0}%)`);
  console.log(`    Content Length: ${lesson.content?.length || 0} characters`);
  console.log(`    Has Objectives: ${lesson.content?.includes('Learning Objectives') || lesson.content?.includes('🎯') ? '✅' : '❌'}`);
  console.log(`    Has Exercises: ${lesson.content?.includes('Practice') || lesson.content?.includes('Exercise') ? '✅' : '❌'}`);
  console.log(`    Has Audio: ${lesson.content?.includes('audio') || lesson.content?.includes('pronunciation') ? '✅' : '❌'}`);
});

// API endpoints check
console.log('\n🔌 AVAILABLE API ENDPOINTS:');
const endpointCounts = {
  lessons: lessons.length,
  vocabulary: vocabStats.total,
  stories: db.prepare('SELECT COUNT(*) as count FROM stories').get().count,
  listenings: db.prepare('SELECT COUNT(*) as count FROM listenings').get().count,
  speakingTopics: db.prepare('SELECT COUNT(*) as count FROM speaking_topics').get().count,
  quizzes: db.prepare('SELECT COUNT(*) as count FROM quizzes').get().count,
  scenarios: db.prepare('SELECT COUNT(*) as count FROM scenarios').get().count,
};

Object.entries(endpointCounts).forEach(([name, count]) => {
  console.log(`  /api/${name}: ${count} items`);
});

db.close();
console.log('\n' + '='.repeat(80) + '\n');
