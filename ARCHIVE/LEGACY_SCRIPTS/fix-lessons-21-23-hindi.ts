#!/usr/bin/env tsx
import { db } from '../server/db';
import { lessons } from '../shared/schema';
import { eq } from 'drizzle-orm';

async function fixLessons() {
  console.log('🔧 Fixing Lessons 21-23 Hindi titles...\n');
  
  // Lesson 21: Mastering Nouns
  await db.update(lessons)
    .set({
      hindiTitle: 'Sangya Mein Maharat: Mool se Unnata Tak',
      hindiDescription: 'Sangya ke sabhi prakar aur unka upyog sikhiye'
    })
    .where(eq(lessons.id, 21));
  console.log('✅ Lesson 21: Sangya Mein Maharat');
  
  // Lesson 22: The Power of Verbs
  await db.update(lessons)
    .set({
      hindiTitle: 'Kriya Ki Shakti: Kaarya, Avastha aur Kaal',
      hindiDescription: 'Kriya ke vibhinn roop aur samay ke anusaar prayog'
    })
    .where(eq(lessons.id, 22));
  console.log('✅ Lesson 22: Kriya Ki Shakti');
  
  // Lesson 23: Social English
  await db.update(lessons)
    .set({
      hindiTitle: 'Saamaajik Angrezi: Abhivaadan aur Shishta Prashna',
      hindiDescription: 'Rojmarra ki shishta baatcheet ke tarike'
    })
    .where(eq(lessons.id, 23));
  console.log('✅ Lesson 23: Saamaajik Angrezi');
  
  console.log('\n✨ All lessons updated successfully!\n');
  
  // Verify
  const updated = await db.select().from(lessons).where(eq(lessons.id, 21));
  console.log('📊 Sample verification (Lesson 21):');
  console.log(`   English: ${updated[0].title}`);
  console.log(`   Hindi: ${updated[0].hindiTitle}\n`);
}

fixLessons().catch(console.error);
