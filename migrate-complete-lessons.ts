// Complete migration script with all 1100+ lessons
import { db } from "./server/db";
import { lessons, vocabulary, users } from "./shared/schema";
import { allLessons } from './lessonData.js';
import { additionalLessons } from './lessonData2.js';

// Function to convert category to difficulty
function getDifficulty(category: string): string {
  const beginnerCategories = ['Greetings', 'Daily', 'Food', 'Shopping', 'Family', 'Hobbies'];
  const intermediateCategories = ['Business', 'Travel', 'Health', 'Education', 'Weather', 'Numbers', 'Emotions'];
  const advancedCategories = ['Technology', 'Grammar', 'Idioms', 'Advanced'];
  
  if (beginnerCategories.includes(category)) return 'Beginner';
  if (intermediateCategories.includes(category)) return 'Intermediate';
  return 'Advanced';
}

// Function to create lesson content in Markdown
function createLessonContent(lesson: any): string {
  return `# ${lesson.english}

## Hindi Translation
**${lesson.hindi}**

## Pronunciation Guide
*${lesson.pronunciation}*

## Usage Context
This phrase is commonly used in **${lesson.category.toLowerCase()}** situations and conversations.

## Practice Examples

### Formal Usage
- In professional settings
- During business meetings
- When speaking with elders or authorities

### Informal Usage
- With friends and family
- In casual conversations
- During social gatherings

## Key Vocabulary

Let's break down the important words in this phrase:

${lesson.english.split(' ').slice(0, 3).map((word: string) => {
  const cleanWord = word.replace(/[^\w]/g, '');
  return `- **${cleanWord}**: A key word in this expression`;
}).join('\n')}

## Cultural Notes

Understanding the cultural context helps in proper usage:
- This expression reflects the polite nature of English communication
- Pay attention to the tone and formality level
- Practice the pronunciation to sound more natural

## Related Phrases

Similar expressions you might find useful:
- Variations of this phrase
- Common responses
- Related vocabulary

## Practice Exercise

Try using this phrase in different scenarios:
1. Role-play with a friend
2. Practice the pronunciation
3. Use it in your daily conversations

Remember: **Practice makes perfect!** 🎯
`;
}

// Function to get category image
function getCategoryImage(category: string): string {
  const images = {
    'Greetings': 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800',
    'Daily': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
    'Business': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    'Travel': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800',
    'Shopping': 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800',
    'Food': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
    'Health': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=800',
    'Education': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
    'Technology': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80&w=800',
    'Family': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800',
    'Hobbies': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    'Weather': 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80&w=800',
    'Numbers': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
    'Emotions': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    'Grammar': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800',
    'Idioms': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    'Advanced': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800'
  };
  return images[category as keyof typeof images] || images['Daily'];
}

// Migration function
export async function migrateCompleteLessons() {
  console.log('🚀 Starting COMPLETE lesson migration with all 1100+ lessons...');
  
  try {
    // Load all lesson data files dynamically
    const [lessonData3, lessonData4, lessonData5] = await Promise.all([
      import('./lessonData3.js').catch(() => ({ default: [] })),
      import('./lessonData4.js').catch(() => ({ default: [] })),
      import('./lessonData5.js').catch(() => ({ default: [] }))
    ]);
    
    const part3 = lessonData3.default || lessonData3.lessonsPart3 || [];
    const part4 = lessonData4.default || lessonData4.lessonsPart4 || [];
    const part5 = lessonData5.default || lessonData5.lessonsPart5 || [];
    
    // Combine all lesson data
    const allCompleteLessons = [
      ...allLessons,
      ...additionalLessons,
      ...part3,
      ...part4,
      ...part5
    ];
    
    console.log(`📚 Total lessons to migrate: ${allCompleteLessons.length}`);
    
    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await db.delete(vocabulary);
    await db.delete(lessons);
    
    // Create default user if not exists
    console.log('👤 Creating default user...');
    try {
      await db.insert(users).values({
        username: "student",
        password: "password123", // In production, this should be hashed
        isAdmin: false
      });
    } catch (error) {
      console.log('User already exists, continuing...');
    }
    
    let order = 1;
    
    console.log(`📚 Migrating ${allCompleteLessons.length} lessons...`);
    
    for (const oldLesson of allCompleteLessons) {
      // Create lesson
      const [newLesson] = await db.insert(lessons).values({
        title: oldLesson.english,
        slug: `lesson-${oldLesson.id}`,
        description: `Learn: "${oldLesson.english}" - ${oldLesson.hindi}`,
        content: createLessonContent(oldLesson),
        difficulty: getDifficulty(oldLesson.category),
        order: order++,
        imageUrl: getCategoryImage(oldLesson.category),
        hindiTitle: oldLesson.hindi,
        hindiDescription: `सीखें: "${oldLesson.english}" का हिंदी अनुवाद`,
        category: oldLesson.category
      }).returning();
      
      // Extract key words for vocabulary (first 3 meaningful words)
      const words = oldLesson.english
        .toLowerCase()
        .split(' ')
        .filter(word => {
          const cleanWord = word.replace(/[^\w]/g, '');
          return cleanWord.length > 2 && 
                 !['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'who', 'boy', 'did', 'she', 'use', 'way', 'what', 'with', 'this', 'that', 'they', 'have', 'from', 'know', 'want', 'been', 'good', 'much', 'some', 'time', 'very', 'when', 'come', 'here', 'just', 'like', 'long', 'make', 'many', 'over', 'such', 'take', 'than', 'them', 'well', 'were', 'will', 'your'].includes(cleanWord);
        })
        .slice(0, 3);
      
      // Add vocabulary entries
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const cleanWord = word.replace(/[^\w]/g, '');
        
        if (cleanWord.length > 2) {
          await db.insert(vocabulary).values({
            lessonId: newLesson.id,
            word: cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1),
            pronunciation: `/${cleanWord}/`,
            definition: `A key word from the phrase: "${oldLesson.english}"`,
            example: oldLesson.english,
            hindiTranslation: `${oldLesson.hindi} में प्रयुक्त शब्द`,
            hindiPronunciation: oldLesson.pronunciation,
            audioUrl: null // Will be added later when we implement audio
          });
        }
      }
      
      if (order % 100 === 0) {
        console.log(`✅ Migrated ${order - 1} lessons...`);
      }
    }
    
    console.log(`🎉 Successfully migrated ${allCompleteLessons.length} lessons!`);
    console.log('📊 Migration Summary:');
    console.log(`   - Total Lessons: ${allCompleteLessons.length}`);
    console.log(`   - Categories: ${[...new Set(allCompleteLessons.map(l => l.category))].join(', ')}`);
    console.log(`   - Difficulty Levels: Beginner, Intermediate, Advanced`);
    console.log(`   - Vocabulary Entries: ~${allCompleteLessons.length * 2} words`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateCompleteLessons()
    .then(() => {
      console.log('🚀 Complete migration finished successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Complete migration failed:', error);
      process.exit(1);
    });
}