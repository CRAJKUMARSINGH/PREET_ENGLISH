import { db } from '../server/db';
import { lessons } from '../shared/schema';
import { sql } from 'drizzle-orm';

async function checkCategories() {
  const cats = await db.select({ 
    category: lessons.category, 
    count: sql<number>`count(*)` 
  }).from(lessons).groupBy(lessons.category);
  
  console.log('=== LESSON CATEGORIES ===');
  cats.forEach(c => console.log(`${c.category}: ${c.count} lessons`));
  console.log(`\nTotal: ${cats.reduce((sum, c) => sum + Number(c.count), 0)} lessons`);
  
  // Check a sample lesson structure
  const [sample] = await db.select().from(lessons).limit(1);
  console.log('\n=== SAMPLE LESSON STRUCTURE ===');
  console.log(JSON.stringify(sample, null, 2));
}

checkCategories().catch(console.error);
