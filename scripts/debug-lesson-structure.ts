#!/usr/bin/env tsx

import { db } from '../server/db';
import { lessons, vocabulary } from '../shared/schema';
import { eq } from 'drizzle-orm';

async function debugLessonStructure() {
  console.log('🔍 Debugging lesson structure...');
  
  try {
    // Get first lesson
    const lesson = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id, 1))
      .limit(1);

    if (!lesson.length) {
      console.log('❌ No lesson found with ID 1');
      return;
    }

    const lessonData = lesson[0];
    console.log('\n📚 Lesson Data:');
    console.log('ID:', lessonData.id);
    console.log('Title:', lessonData.title);
    console.log('Slug:', lessonData.slug);
    console.log('Difficulty:', lessonData.difficulty);
    console.log('Content type:', typeof lessonData.content);
    console.log('Content length:', lessonData.content?.length || 0);
    
    if (lessonData.content) {
      try {
        const parsedContent = JSON.parse(lessonData.content);
        console.log('Parsed content type:', typeof parsedContent);
        console.log('Is array:', Array.isArray(parsedContent));
        console.log('Content items:', parsedContent.length);
        console.log('First item:', parsedContent[0]);
      } catch (e) {
        console.log('❌ Content parsing error:', e.message);
      }
    }

    // Get vocabulary
    const vocab = await db
      .select()
      .from(vocabulary)
      .where(eq(vocabulary.lessonId, 1));

    console.log('\n📝 Vocabulary:');
    console.log('Vocabulary count:', vocab.length);
    
    if (vocab.length > 0) {
      console.log('First vocab item:');
      console.log('  English:', vocab[0].english);
      console.log('  Hindi:', vocab[0].hindi);
      console.log('  Pronunciation:', vocab[0].pronunciation);
    }

    // Check validation logic
    console.log('\n✅ Validation Results:');
    console.log('Has title:', !!lessonData.title);
    console.log('Has slug:', !!lessonData.slug);
    console.log('Has difficulty:', !!lessonData.difficulty);
    
    let contentValid = true;
    if (lessonData.content) {
      try {
        const parsedContent = JSON.parse(lessonData.content);
        contentValid = Array.isArray(parsedContent);
        console.log('Content is valid array:', contentValid);
      } catch (e) {
        contentValid = false;
        console.log('Content parsing failed:', false);
      }
    } else {
      console.log('No content to validate');
    }

    let vocabValid = true;
    for (const vocabItem of vocab) {
      if (!vocabItem.english || !vocabItem.hindi) {
        vocabValid = false;
        break;
      }
    }
    console.log('All vocabulary items valid:', vocabValid);

    const overallValid = !!lessonData.title && !!lessonData.slug && !!lessonData.difficulty && contentValid && vocabValid;
    console.log('Overall validation:', overallValid);

  } catch (error) {
    console.error('❌ Debug failed:', error);
  }
}

debugLessonStructure().catch(console.error);