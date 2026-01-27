#!/usr/bin/env tsx
import { db } from '../server/db';
import { lessons } from '../shared/schema';
import { eq } from 'drizzle-orm';

async function fixLesson24() {
  console.log('🔧 Fixing Lesson 24 Hindi title...\n');
  
  await db.update(lessons)
    .set({
      hindiTitle: 'Unnata Samvaad Pradarshani',
      hindiDescription: 'Aapki angrezi bolne ki kshamata ko badhane ke liye ek vishesh pradarshani'
    })
    .where(eq(lessons.id, 24));
  
  console.log('✅ Lesson 24 updated with Hindi title!');
  console.log('   Hindi Title: "Unnata Samvaad Pradarshani"');
  console.log('   (Advanced Interaction Lab)\n');
  
  // Verify
  const lesson = await db.select().from(lessons).where(eq(lessons.id, 24));
  console.log('📊 Verification:');
  console.log(`   Title: ${lesson[0].title}`);
  console.log(`   Hindi Title: ${lesson[0].hindiTitle}`);
  console.log(`   Hindi Description: ${lesson[0].hindiDescription}\n`);
}

fixLesson24().catch(console.error);
