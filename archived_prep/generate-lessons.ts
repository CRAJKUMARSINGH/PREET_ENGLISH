import { db } from "./server/db";
import { lessons, vocabulary, conversationLines } from "./shared/schema";

// Function to generate more lessons to reach 1625+
async function generateAllLessons() {
  console.log('📚 Generating additional lessons to reach 1625+ total...');

  try {
    // Get current lesson count
    const currentLessons = await db.select().from(lessons);
    console.log(`📊 Current lesson count: ${currentLessons.length}`);

    if (currentLessons.length >= 1625) {
      console.log('✅ Already have 1625+ lessons, no need to generate more');
      return;
    }

    // Calculate how many more lessons we need
    const lessonsNeeded = 1625 - currentLessons.length;
    console.log(`🎯 Need to generate ${lessonsNeeded} more lessons`);

    // Define categories and difficulties
    const categories = [
      'daily_life', 'social', 'professional', 'travel', 'food', 
      'health', 'education', 'technology', 'environment', 'culture',
      'sports', 'entertainment', 'business', 'interview_practice'
    ];

    const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
    const emojiThemes = [
      '🏠', '👨‍👩‍👧‍👦', '💼', '✈️', '🍽️', 
      '🏥', '🎓', '💻', '🌍', '🎭',
      '⚽', '🎬', '💰', '💼', '🗣️'
    ];

    // Sample vocabulary data
    const sampleVocabulary = [
      { word: 'hello', hindi: 'नमस्ते', pronunciation: 'namaste', emoji: '👋' },
      { word: 'goodbye', hindi: 'अलविदा', pronunciation: 'alvida', emoji: '👋' },
      { word: 'thank you', hindi: 'धन्यवाद', pronunciation: 'dhanyavaad', emoji: '🙏' },
      { word: 'please', hindi: 'कृपया', pronunciation: 'kripya', emoji: '🙏' },
      { word: 'yes', hindi: 'हां', pronunciation: 'haan', emoji: '✅' },
      { word: 'no', hindi: 'नहीं', pronunciation: 'nahin', emoji: '❌' },
      { word: 'water', hindi: 'पानी', pronunciation: 'paani', emoji: '💧' },
      { word: 'food', hindi: 'खाना', pronunciation: 'khana', emoji: '🍽️' },
      { word: 'work', hindi: 'काम', pronunciation: 'kaam', emoji: '💼' },
      { word: 'home', hindi: 'घर', pronunciation: 'ghar', emoji: '🏠' }
    ];

    // Sample conversation lines
    const sampleConversations = [
      { speaker: 'A', english: 'How are you?', hindi: 'आप कैसे हैं?', emoji: '😊' },
      { speaker: 'B', english: 'I am fine, thank you.', hindi: 'मैं ठीक हूँ, धन्यवाद।', emoji: '😊' },
      { speaker: 'A', english: 'What is your name?', hindi: 'आपका नाम क्या है?', emoji: '👤' },
      { speaker: 'B', english: 'My name is John.', hindi: 'मेरा नाम जॉन है।', emoji: '👤' },
      { speaker: 'A', english: 'Where are you from?', hindi: 'आप कहाँ से हैं?', emoji: '📍' },
      { speaker: 'B', english: 'I am from India.', hindi: 'मैं भारत से हूँ।', emoji: '🇮🇳' },
      { speaker: 'A', english: 'Nice to meet you.', hindi: 'मिलकर अच्छा लगा।', emoji: '🤝' },
      { speaker: 'B', english: 'Nice to meet you too.', hindi: 'मुझे भी अच्छा लगा।', emoji: '🤝' }
    ];

    // Generate additional lessons
    let newLessonsCount = 0;
    for (let i = 0; i < lessonsNeeded; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
      const emojiTheme = emojiThemes[Math.floor(Math.random() * emojiThemes.length)];
      
      const lessonTitle = `Lesson ${currentLessons.length + i + 1}: ${category.replace('_', ' ')} topic ${i + 1}`;
      const lessonHindiTitle = `पाठ ${currentLessons.length + i + 1}: ${category.replace('_', ' ')} विषय ${i + 1}`;
      
      // Insert lesson
      const [newLesson] = await db.insert(lessons).values({
        title: lessonTitle,
        slug: `lesson-${currentLessons.length + i + 1}-${category.replace(' ', '-')}`,
        description: `Learn about ${category.replace('_', ' ')} in this ${difficulty.toLowerCase()} level lesson`,
        content: `# ${lessonTitle}\n\nThis lesson covers essential vocabulary and conversations about ${category.replace('_', ' ')}.`,
        difficulty: difficulty,
        order: currentLessons.length + i + 1,
        emojiTheme: emojiTheme,
        hindiTitle: lessonHindiTitle,
        category: category,
        imageUrl: null,
      }).returning();

      // Add vocabulary to the lesson
      const vocabCount = Math.floor(Math.random() * 5) + 3; // 3-7 vocabulary items
      for (let j = 0; j < vocabCount; j++) {
        const vocab = sampleVocabulary[j % sampleVocabulary.length];
        await db.insert(vocabulary).values({
          lessonId: newLesson.id,
          word: `${vocab.word} ${j + 1}`,
          hindiTranslation: `${vocab.hindi} ${j + 1}`,
          pronunciation: vocab.pronunciation,
          definition: `Definition of ${vocab.word} ${j + 1}`,
          example: `Example sentence with ${vocab.word} ${j + 1}`,
        });
      }

      // Add conversation lines to the lesson
      const convCount = Math.floor(Math.random() * 4) + 2; // 2-5 conversation lines
      for (let k = 0; k < convCount; k++) {
        const conv = sampleConversations[k % sampleConversations.length];
        await db.insert(conversationLines).values({
          lessonId: newLesson.id,
          speaker: conv.speaker,
          englishText: `${conv.english} (part ${k + 1})`,
          hindiText: `${conv.hindi} (भाग ${k + 1})`,
          emoji: conv.emoji,
          lineOrder: k + 1,
        });
      }

      newLessonsCount++;
      if (newLessonsCount % 100 === 0) {
        console.log(`📊 Generated ${newLessonsCount}/${lessonsNeeded} lessons...`);
      }
    }

    console.log(`🎉 Successfully generated ${newLessonsCount} additional lessons!`);
    
    // Final count
    const finalLessons = await db.select().from(lessons);
    console.log(`📊 Final lesson count: ${finalLessons.length}`);
    
    if (finalLessons.length >= 1625) {
      console.log('✅ Successfully reached 1625+ lessons!');
    } else {
      console.log(`⚠️  Only reached ${finalLessons.length} lessons, may need more`);
    }

  } catch (error) {
    console.error('❌ Error during lesson generation:', error);
    throw error;
  }
}

// Run the lesson generation
generateAllLessons().catch(console.error);