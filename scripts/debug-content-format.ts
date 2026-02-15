#!/usr/bin/env tsx

import { db } from '../server/db';
import { lessons } from '../shared/schema';
import { eq } from 'drizzle-orm';

async function debugContentFormat() {
  console.log('🔍 Debugging content format...');
  
  const testLessonIds = [21, 22, 23];
  
  for (const lessonId of testLessonIds) {
    console.log(`\n📚 Lesson ${lessonId} Content:`);
    
    try {
      const lesson = await db
        .select()
        .from(lessons)
        .where(eq(lessons.id, lessonId))
        .limit(1);

      if (!lesson.length) {
        console.log('❌ Lesson not found');
        continue;
      }

      const lessonData = lesson[0];
      console.log('Content type:', typeof lessonData.content);
      console.log('Content length:', lessonData.content?.length || 0);
      console.log('First 200 chars:', lessonData.content?.substring(0, 200));
      
      if (lessonData.content) {
        try {
          const parsed = JSON.parse(lessonData.content);
          console.log('✅ Valid JSON');
          console.log('Parsed type:', typeof parsed);
          console.log('Is array:', Array.isArray(parsed));
        } catch (e) {
          console.log('❌ JSON Error:', e.message);
          
          // Try to identify the issue
          const content = lessonData.content;
          if (content.includes('\\n')) {
            console.log('🔍 Contains escaped newlines');
          }
          if (content.includes('\n')) {
            console.log('🔍 Contains actual newlines');
          }
          if (content.includes('\\"')) {
            console.log('🔍 Contains escaped quotes');
          }
          if (!content.startsWith('[') && !content.startsWith('{')) {
            console.log('🔍 Does not start with [ or {');
          }
        }
      }

    } catch (error) {
      console.error('❌ Error:', error.message);
    }
  }
}

debugContentFormat().catch(console.error);