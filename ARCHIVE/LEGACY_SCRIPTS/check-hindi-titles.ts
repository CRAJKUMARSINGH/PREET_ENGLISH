#!/usr/bin/env tsx
import { db } from '../server/db';
import { lessons } from '../shared/schema';

async function checkHindiTitles() {
  const allLessons = await db.select().from(lessons);
  
  console.log('📊 Hindi Title Analysis\n');
  console.log(`Total lessons: ${allLessons.length}\n`);
  
  let withHindi = 0;
  let withDevanagari = 0;
  let withoutHindi = 0;
  
  allLessons.forEach((lesson, idx) => {
    if (lesson.hindiTitle && lesson.hindiTitle.trim() !== '') {
      withHindi++;
      const hasDevanagari = /[\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F]/.test(lesson.hindiTitle);
      if (hasDevanagari) {
        withDevanagari++;
      }
      
      if (idx < 5) {
        console.log(`Lesson ${lesson.id}: "${lesson.title}"`);
        console.log(`  Hindi: "${lesson.hindiTitle}"`);
        console.log(`  Has Devanagari: ${hasDevanagari ? '✅' : '❌'}`);
        console.log(`  Char codes: ${lesson.hindiTitle.split('').map(c => c.charCodeAt(0).toString(16)).join(' ')}\n`);
      }
    } else {
      withoutHindi++;
    }
  });
  
  console.log('\n📈 Summary:');
  console.log(`  Lessons with Hindi title: ${withHindi}/${allLessons.length} (${(withHindi/allLessons.length*100).toFixed(1)}%)`);
  console.log(`  Lessons with Devanagari: ${withDevanagari}/${allLessons.length} (${(withDevanagari/allLessons.length*100).toFixed(1)}%)`);
  console.log(`  Lessons without Hindi: ${withoutHindi}/${allLessons.length} (${(withoutHindi/allLessons.length*100).toFixed(1)}%)`);
}

checkHindiTitles().catch(console.error);
