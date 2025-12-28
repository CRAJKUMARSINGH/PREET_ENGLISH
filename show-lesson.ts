// Show lesson by order number
import { db } from "./server/db.js";
import { lessons } from "./shared/schema.js";
import { eq } from "drizzle-orm";

async function showLesson(orderNum: number) {
  const lesson = await db.select().from(lessons).where(eq(lessons.order, orderNum)).limit(1);
  
  if (lesson.length === 0) {
    console.log(`❌ Lesson ${orderNum} not found!`);
    return;
  }
  
  const l = lesson[0];
  console.log('\n' + '='.repeat(70));
  console.log(`📚 LESSON ${l.order}`);
  console.log('='.repeat(70));
  console.log(`\n🆔 ID: ${l.id}`);
  console.log(`📝 Title: ${l.title}`);
  console.log(`🇮🇳 Hindi: ${l.hindiTitle || 'N/A'}`);
  console.log(`📊 Difficulty: ${l.difficulty}`);
  console.log(`📁 Category: ${l.category}`);
  console.log(`🔗 Slug: ${l.slug}`);
  console.log('\n📖 CONTENT:');
  console.log('-'.repeat(70));
  console.log(l.content);
  console.log('-'.repeat(70));
  console.log('\n');
}

const lessonNum = parseInt(process.argv[2]) || 256;
showLesson(lessonNum)
  .then(() => process.exit(0))
  .catch(err => { console.error(err); process.exit(1); });
