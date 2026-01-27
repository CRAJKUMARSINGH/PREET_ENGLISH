#!/usr/bin/env tsx
import { db } from '../server/db';
import { lessons } from '../shared/schema';

async function debugHindiTest() {
  const allLessons = await db.select().from(lessons);
  
  console.log('\n🔍 Debugging Hindi Support Test\n');
  
  let passCount = 0;
  let failCount = 0;
  
  allLessons.forEach(l => {
    const hasTitle = l.hindiTitle && l.hindiTitle.trim() !== '';
    const hasDevanagari = hasTitle && /[\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F]/.test(l.hindiTitle);
    const hasRomanized = hasTitle && l.hindiTitle.length > 3 && /^[a-zA-Z0-9\s]+$/.test(l.hindiTitle);
    const passes = hasDevanagari || hasRomanized;
    
    if (passes) {
      passCount++;
    } else {
      failCount++;
      console.log(`❌ Lesson ${l.id}: "${l.title}"`);
      console.log(`   Hindi: "${l.hindiTitle || 'MISSING'}"`);
      console.log(`   Has title: ${hasTitle}`);
      console.log(`   Has Devanagari: ${hasDevanagari}`);
      console.log(`   Has Romanized: ${hasRomanized}`);
      console.log(`   Length: ${l.hindiTitle?.length || 0}`);
      console.log();
    }
  });
  
  console.log(`\n📊 Results: ${passCount} pass, ${failCount} fail (${(passCount/allLessons.length*100).toFixed(1)}%)\n`);
}

debugHindiTest().catch(console.error);
