// Verify lesson counts by level and category
import { db } from "./server/db.js";
import { lessons } from "./shared/schema.js";
import { eq, sql } from "drizzle-orm";

async function verifyLessons() {
  console.log('📊 VERIFYING LESSON DATABASE...\n');
  
  // Count by difficulty
  const beginnerCount = await db.select({ count: sql<number>`count(*)` }).from(lessons).where(eq(lessons.difficulty, 'Beginner'));
  const intermediateCount = await db.select({ count: sql<number>`count(*)` }).from(lessons).where(eq(lessons.difficulty, 'Intermediate'));
  const advancedCount = await db.select({ count: sql<number>`count(*)` }).from(lessons).where(eq(lessons.difficulty, 'Advanced'));
  
  console.log('='.repeat(60));
  console.log('LESSON COUNT BY LEVEL:');
  console.log('='.repeat(60));
  console.log(`📗 Beginner:     ${beginnerCount[0].count} lessons`);
  console.log(`📘 Intermediate: ${intermediateCount[0].count} lessons`);
  console.log(`📕 Advanced:     ${advancedCount[0].count} lessons`);
  console.log(`📚 TOTAL:        ${Number(beginnerCount[0].count) + Number(intermediateCount[0].count) + Number(advancedCount[0].count)} lessons`);
  
  // Count by category for each level
  console.log('\n' + '='.repeat(60));
  console.log('BEGINNER CATEGORIES:');
  console.log('='.repeat(60));
  const beginnerCats = await db.select({ 
    category: lessons.category, 
    count: sql<number>`count(*)` 
  }).from(lessons).where(eq(lessons.difficulty, 'Beginner')).groupBy(lessons.category);
  beginnerCats.forEach(c => console.log(`   ${c.category}: ${c.count}`));
  
  console.log('\n' + '='.repeat(60));
  console.log('INTERMEDIATE CATEGORIES:');
  console.log('='.repeat(60));
  const intermediateCats = await db.select({ 
    category: lessons.category, 
    count: sql<number>`count(*)` 
  }).from(lessons).where(eq(lessons.difficulty, 'Intermediate')).groupBy(lessons.category);
  intermediateCats.forEach(c => console.log(`   ${c.category}: ${c.count}`));
  
  console.log('\n' + '='.repeat(60));
  console.log('ADVANCED CATEGORIES:');
  console.log('='.repeat(60));
  const advancedCats = await db.select({ 
    category: lessons.category, 
    count: sql<number>`count(*)` 
  }).from(lessons).where(eq(lessons.difficulty, 'Advanced')).groupBy(lessons.category);
  advancedCats.forEach(c => console.log(`   ${c.category}: ${c.count}`));
  
  console.log('\n' + '='.repeat(60));
}

verifyLessons();
