#!/usr/bin/env tsx

import { db } from '../server/db';
import { lessons, vocabulary } from '../shared/schema';
import { eq } from 'drizzle-orm';

async function debugFailedLessons() {
  console.log('🔍 Debugging failed lessons...');
  
  const testLessonIds = [21, 22, 23, 24, 1769595070011];
  
  for (const lessonId of testLessonIds) {
    console.log(`\n📚 Checking Lesson ${lessonId}:`);
    
    try {
      // Get lesson
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
      console.log('✅ Lesson found');
      console.log('  Title:', lessonData.title || 'MISSING');
      console.log('  Slug:', lessonData.slug || 'MISSING');
      console.log('  Difficulty:', lessonData.difficulty || 'MISSING');
      
      // Check content
      let contentValid = true;
      if (lessonData.content) {
        try {
          const parsedContent = JSON.parse(lessonData.content);
          contentValid = Array.isArray(parsedContent);
          console.log('  Content: Valid array with', parsedContent.length, 'items');
        } catch (e) {
          contentValid = false;
          console.log('  Content: ❌ Invalid JSON');
        }
      } else {
        console.log('  Content: ❌ Missing');
        contentValid = false;
      }

      // Get vocabulary
      const vocab = await db
        .select()
        .from(vocabulary)
        .where(eq(vocabulary.lessonId, lessonId));

      console.log('  Vocabulary count:', vocab.length);
      
      let vocabValid = true;
      let invalidVocabCount = 0;
      
      for (const vocabItem of vocab) {
        if (!vocabItem.word || !vocabItem.definition) {
          vocabValid = false;
          invalidVocabCount++;
        }
      }
      
      if (vocab.length > 0) {
        console.log('  Vocabulary valid:', vocabValid);
        if (!vocabValid) {
          console.log('  Invalid vocab items:', invalidVocabCount);
          console.log('  Sample invalid item:', vocab.find(v => !v.word || !v.definition));
        }
      }

      // Overall validation
      const overallValid = !!lessonData.title && !!lessonData.slug && !!lessonData.difficulty && contentValid && vocabValid;
      console.log('  Overall valid:', overallValid ? '✅' : '❌');
      
      if (!overallValid) {
        console.log('  Failure reasons:');
        if (!lessonData.title) console.log('    - Missing title');
        if (!lessonData.slug) console.log('    - Missing slug');
        if (!lessonData.difficulty) console.log('    - Missing difficulty');
        if (!contentValid) console.log('    - Invalid content');
        if (!vocabValid) console.log('    - Invalid vocabulary');
      }

    } catch (error) {
      console.error('❌ Error checking lesson:', error.message);
    }
  }
}

debugFailedLessons().catch(console.error);