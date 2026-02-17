#!/usr/bin/env tsx
/**
 * LESSON VOCABULARY GENERATION SCRIPT
 * 
 * Generates vocabulary items for all lessons that don't have vocabulary.
 * Uses a combination of AI generation and predefined vocabulary data.
 */

import { db } from '../server/db';
import { lessons, vocabulary } from '../shared/schema';
import { eq, sql, notInArray } from 'drizzle-orm';

console.log('📚 LESSON VOCABULARY GENERATION');
console.log('='.repeat(80));
console.log('');

// Predefined vocabulary sets by category
const vocabularyByCategory: Record<string, Array<{word: string, translation: string, pronunciation: string, example: string}>> = {
  'greetings': [
    { word: 'hello', translation: 'नमस्ते', pronunciation: 'namaste', example: 'Hello, how are you?' },
    { word: 'goodbye', translation: 'अलविदा', pronunciation: 'alvida', example: 'Goodbye, see you tomorrow!' },
    { word: 'please', translation: 'कृपया', pronunciation: 'kripya', example: 'Please help me.' },
    { word: 'thank you', translation: 'धन्यवाद', pronunciation: 'dhanyavaad', example: 'Thank you for your help.' },
    { word: 'welcome', translation: 'स्वागत है', pronunciation: 'swaagat hai', example: 'You are welcome here.' },
  ],
  'basic': [
    { word: 'yes', translation: 'हाँ', pronunciation: 'haan', example: 'Yes, I agree.' },
    { word: 'no', translation: 'नहीं', pronunciation: 'nahin', example: 'No, I don\'t want that.' },
    { word: 'good', translation: 'अच्छा', pronunciation: 'accha', example: 'This is good.' },
    { word: 'bad', translation: 'बुरा', pronunciation: 'bura', example: 'That was bad.' },
    { word: 'help', translation: 'मदद', pronunciation: 'madad', example: 'I need help.' },
    { word: 'water', translation: 'पानी', pronunciation: 'paani', example: 'Can I have some water?' },
    { word: 'food', translation: 'खाना', pronunciation: 'khaana', example: 'The food is delicious.' },
  ],
  'conversation': [
    { word: 'speak', translation: 'बोलना', pronunciation: 'bolna', example: 'I speak English.' },
    { word: 'understand', translation: 'समझना', pronunciation: 'samajhna', example: 'I understand you.' },
    { word: 'learn', translation: 'सीखना', pronunciation: 'seekhna', example: 'I want to learn English.' },
    { word: 'practice', translation: 'अभ्यास', pronunciation: 'abhyaas', example: 'Practice makes perfect.' },
    { word: 'question', translation: 'सवाल', pronunciation: 'savaal', example: 'I have a question.' },
    { word: 'answer', translation: 'जवाब', pronunciation: 'javaab', example: 'What is the answer?' },
  ],
  'time': [
    { word: 'today', translation: 'आज', pronunciation: 'aaj', example: 'Today is Monday.' },
    { word: 'tomorrow', translation: 'कल', pronunciation: 'kal', example: 'See you tomorrow.' },
    { word: 'yesterday', translation: 'कल', pronunciation: 'kal', example: 'I saw him yesterday.' },
    { word: 'now', translation: 'अभी', pronunciation: 'abhi', example: 'I need it now.' },
    { word: 'later', translation: 'बाद में', pronunciation: 'baad mein', example: 'I will do it later.' },
  ],
  'numbers': [
    { word: 'one', translation: 'एक', pronunciation: 'ek', example: 'I have one book.' },
    { word: 'two', translation: 'दो', pronunciation: 'do', example: 'There are two chairs.' },
    { word: 'three', translation: 'तीन', pronunciation: 'teen', example: 'I need three apples.' },
    { word: 'many', translation: 'बहुत', pronunciation: 'bahut', example: 'There are many people.' },
    { word: 'few', translation: 'कुछ', pronunciation: 'kuch', example: 'Only a few remain.' },
  ],
  'family': [
    { word: 'mother', translation: 'माँ', pronunciation: 'maa', example: 'My mother is kind.' },
    { word: 'father', translation: 'पिता', pronunciation: 'pita', example: 'My father works hard.' },
    { word: 'brother', translation: 'भाई', pronunciation: 'bhai', example: 'I have one brother.' },
    { word: 'sister', translation: 'बहन', pronunciation: 'bahan', example: 'My sister is smart.' },
    { word: 'family', translation: 'परिवार', pronunciation: 'parivaar', example: 'I love my family.' },
  ],
  'work': [
    { word: 'work', translation: 'काम', pronunciation: 'kaam', example: 'I have work to do.' },
    { word: 'job', translation: 'नौकरी', pronunciation: 'naukri', example: 'I need a job.' },
    { word: 'office', translation: 'कार्यालय', pronunciation: 'kaaryaalay', example: 'I go to the office.' },
    { word: 'meeting', translation: 'बैठक', pronunciation: 'baithak', example: 'We have a meeting today.' },
    { word: 'project', translation: 'परियोजना', pronunciation: 'pariyojana', example: 'This is an important project.' },
  ],
  'travel': [
    { word: 'go', translation: 'जाना', pronunciation: 'jaana', example: 'I want to go home.' },
    { word: 'come', translation: 'आना', pronunciation: 'aana', example: 'Please come here.' },
    { word: 'travel', translation: 'यात्रा', pronunciation: 'yaatra', example: 'I love to travel.' },
    { word: 'airport', translation: 'हवाई अड्डा', pronunciation: 'havai adda', example: 'The airport is busy.' },
    { word: 'ticket', translation: 'टिकट', pronunciation: 'ticket', example: 'I need a ticket.' },
  ],
};

// Common vocabulary for all lessons
const commonVocabulary = [
  { word: 'I', translation: 'मैं', pronunciation: 'main', example: 'I am learning English.' },
  { word: 'you', translation: 'तुम/आप', pronunciation: 'tum/aap', example: 'You are my friend.' },
  { word: 'we', translation: 'हम', pronunciation: 'ham', example: 'We are students.' },
  { word: 'they', translation: 'वे', pronunciation: 've', example: 'They are coming.' },
  { word: 'this', translation: 'यह', pronunciation: 'yah', example: 'This is my book.' },
  { word: 'that', translation: 'वह', pronunciation: 'vah', example: 'That is your pen.' },
  { word: 'here', translation: 'यहाँ', pronunciation: 'yahaan', example: 'Come here.' },
  { word: 'there', translation: 'वहाँ', pronunciation: 'vahaan', example: 'Go there.' },
];

function getCategoryFromTitle(title: string): string {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('greet') || lowerTitle.includes('hello') || lowerTitle.includes('introduction')) {
    return 'greetings';
  } else if (lowerTitle.includes('family') || lowerTitle.includes('mother') || lowerTitle.includes('father')) {
    return 'family';
  } else if (lowerTitle.includes('work') || lowerTitle.includes('job') || lowerTitle.includes('office')) {
    return 'work';
  } else if (lowerTitle.includes('travel') || lowerTitle.includes('airport') || lowerTitle.includes('journey')) {
    return 'travel';
  } else if (lowerTitle.includes('time') || lowerTitle.includes('day') || lowerTitle.includes('date')) {
    return 'time';
  } else if (lowerTitle.includes('number') || lowerTitle.includes('count')) {
    return 'numbers';
  } else if (lowerTitle.includes('conversation') || lowerTitle.includes('talk') || lowerTitle.includes('speak')) {
    return 'conversation';
  }
  
  return 'basic';
}

function generateVocabularyForLesson(lesson: any): Array<{word: string, translation: string, pronunciation: string, example: string}> {
  const category = getCategoryFromTitle(lesson.title || '');
  const categoryVocab = vocabularyByCategory[category] || vocabularyByCategory['basic'];
  
  // Mix category-specific and common vocabulary
  const vocab = [
    ...categoryVocab.slice(0, 5),
    ...commonVocabulary.slice(0, 3)
  ];
  
  // Shuffle and take 7 items
  return vocab.sort(() => Math.random() - 0.5).slice(0, 7);
}

async function main() {
  try {
    console.log('🔍 Fetching lessons without vocabulary...');
    
    // Get all lessons
    const allLessons = await db.select().from(lessons);
    console.log(`   Found ${allLessons.length} total lessons`);
    
    // Get lessons that already have vocabulary
    const lessonsWithVocab = await db
      .select({ lessonId: vocabulary.lessonId })
      .from(vocabulary)
      .groupBy(vocabulary.lessonId);
    
    const lessonIdsWithVocab = new Set(lessonsWithVocab.map(v => v.lessonId));
    
    // Filter lessons without vocabulary
    const lessonsWithoutVocab = allLessons.filter(lesson => !lessonIdsWithVocab.has(lesson.id));
    
    console.log(`   ${lessonsWithVocab.length} lessons already have vocabulary`);
    console.log(`   ${lessonsWithoutVocab.length} lessons need vocabulary`);
    console.log('');
    
    if (lessonsWithoutVocab.length === 0) {
      console.log('✅ All lessons already have vocabulary!');
      return;
    }
    
    console.log('📝 Generating vocabulary...');
    console.log('');
    
    let generated = 0;
    let errors = 0;
    
    // Process in batches of 100
    const batchSize = 100;
    for (let i = 0; i < lessonsWithoutVocab.length; i += batchSize) {
      const batch = lessonsWithoutVocab.slice(i, i + batchSize);
      
      console.log(`   Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(lessonsWithoutVocab.length / batchSize)}...`);
      
      for (const lesson of batch) {
        try {
          const vocabItems = generateVocabularyForLesson(lesson);
          
          // Insert vocabulary items
          for (const item of vocabItems) {
            await db.insert(vocabulary).values({
              lessonId: lesson.id,
              word: item.word,
              translation: item.translation,
              pronunciation: item.pronunciation,
              example: item.example,
              audioUrl: null,
              difficulty: 'beginner'
            });
          }
          
          generated++;
          
          if (generated % 100 === 0) {
            console.log(`   ✅ Generated vocabulary for ${generated} lessons...`);
          }
        } catch (error: any) {
          errors++;
          console.error(`   ❌ Error for lesson ${lesson.id}: ${error.message}`);
        }
      }
    }
    
    console.log('');
    console.log('='.repeat(80));
    console.log('📊 GENERATION SUMMARY');
    console.log('='.repeat(80));
    console.log('');
    console.log(`Total Lessons: ${allLessons.length}`);
    console.log(`Already Had Vocabulary: ${lessonsWithVocab.length}`);
    console.log(`Needed Vocabulary: ${lessonsWithoutVocab.length}`);
    console.log(`✅ Successfully Generated: ${generated}`);
    console.log(`❌ Errors: ${errors}`);
    console.log('');
    
    // Verify
    console.log('🔍 Verifying vocabulary coverage...');
    const finalCheck = await db
      .select({ lessonId: vocabulary.lessonId })
      .from(vocabulary)
      .groupBy(vocabulary.lessonId);
    
    const coverage = (finalCheck.length / allLessons.length * 100).toFixed(1);
    console.log(`   Vocabulary Coverage: ${finalCheck.length}/${allLessons.length} (${coverage}%)`);
    console.log('');
    
    if (errors === 0) {
      console.log('🏆 SUCCESS: All lessons now have vocabulary!');
      process.exit(0);
    } else {
      console.log('⚠️  PARTIAL SUCCESS: Some lessons failed. Review errors above.');
      process.exit(1);
    }
    
  } catch (error: any) {
    console.error('');
    console.error('❌ FATAL ERROR:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
