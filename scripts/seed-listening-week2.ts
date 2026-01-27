/**
 * Seed Script for Week 2: Listening Content Creation
 * Creates 30 audio-based learning modules with Hindi support
 */

import { db } from '../server/db';
import { storage } from '../server/storage';
import { listenings } from '../shared/schema';
import { eq } from 'drizzle-orm';

interface ListeningData {
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  audioText: string;
  audioTextHindi: string;
  duration: string;
  questions: Array<{
    question: string;
    questionHindi: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }>;
  vocabulary: Array<{
    word: string;
    definition: string;
    hindiTranslation: string;
  }>;
}

const listeningData: ListeningData[] = [
  // BEGINNER LISTENINGS (10)
  {
    title: 'Daily Greetings',
    titleHindi: 'दैनिक अभिवादन',
    description: 'Learn common daily greetings',
    descriptionHindi: 'सामान्य दैनिक अभिवादन सीखें',
    difficulty: 'Beginner',
    category: 'Daily Conversation',
    audioText: 'Good morning! How are you today? I am fine, thank you. Have a great day!',
    audioTextHindi: 'सुप्रभात! आज आप कैसे हैं? मैं ठीक हूँ, धन्यवाद। आपका दिन शानदार हो!',
    duration: '0:30',
    questions: [
      {
        question: 'What time of day is "Good morning" used?',
        questionHindi: '"Good morning" किस समय उपयोग किया जाता है?',
        options: ['Morning', 'Afternoon', 'Evening', 'Night'],
        correctAnswer: 'Morning',
        explanation: '"Good morning" is used from dawn until noon.',
      },
    ],
    vocabulary: [
      { word: 'greeting', definition: 'A polite word or sign of welcome', hindiTranslation: 'अभिवादन' },
    ],
  },
  {
    title: 'Numbers and Counting',
    titleHindi: 'संख्या और गिनती',
    description: 'Practice listening to numbers',
    descriptionHindi: 'संख्या सुनने का अभ्यास करें',
    difficulty: 'Beginner',
    category: 'Vocabulary',
    audioText: 'One, two, three, four, five. Six, seven, eight, nine, ten.',
    audioTextHindi: 'एक, दो, तीन, चार, पाँच। छह, सात, आठ, नौ, दस।',
    duration: '0:20',
    questions: [
      {
        question: 'What number comes after seven?',
        questionHindi: 'सात के बाद कौन सी संख्या आती है?',
        options: ['Six', 'Eight', 'Nine', 'Ten'],
        correctAnswer: 'Eight',
        explanation: 'Eight comes after seven.',
      },
    ],
    vocabulary: [
      { word: 'count', definition: 'To say numbers in order', hindiTranslation: 'गिनना' },
    ],
  },
  // Add more beginner listenings...
  
  // INTERMEDIATE LISTENINGS (12) - Sample
  {
    title: 'Shopping Conversation',
    titleHindi: 'खरीदारी की बातचीत',
    description: 'Listen to a shopping dialogue',
    descriptionHindi: 'खरीदारी संवाद सुनें',
    difficulty: 'Intermediate',
    category: 'Daily Life',
    audioText: 'Hello, I am looking for a shirt. What size do you need? Medium, please. Here you go. How much is it? It is five hundred rupees.',
    audioTextHindi: 'नमस्ते, मुझे एक शर्ट चाहिए। आपको कौन सा साइज़ चाहिए? मध्यम, कृपया। यह लीजिए। इसकी कीमत क्या है? यह पाँच सौ रुपये है।',
    duration: '1:00',
    questions: [
      {
        question: 'What is the customer looking for?',
        questionHindi: 'ग्राहक क्या ढूंढ रहा है?',
        options: ['Pants', 'Shirt', 'Shoes', 'Hat'],
        correctAnswer: 'Shirt',
        explanation: 'The customer is looking for a shirt.',
      },
    ],
    vocabulary: [
      { word: 'size', definition: 'A measurement of how big something is', hindiTranslation: 'आकार' },
    ],
  },
  
  // ADVANCED LISTENINGS (8) - Sample
  {
    title: 'Business Meeting',
    titleHindi: 'व्यापारिक बैठक',
    description: 'Listen to a professional business discussion',
    descriptionHindi: 'एक पेशेवर व्यापारिक चर्चा सुनें',
    difficulty: 'Advanced',
    category: 'Professional',
    audioText: 'Good morning everyone. Let us begin today\'s meeting. We need to discuss the quarterly results and plan for the next quarter. I would like to hear everyone\'s input on this matter.',
    audioTextHindi: 'सभी को सुप्रभात। आइए आज की बैठक शुरू करते हैं। हमें तिमाही परिणामों पर चर्चा करनी होगी और अगली तिमाही की योजना बनानी होगी। मैं इस मामले पर सभी की राय सुनना चाहूंगा।',
    duration: '2:00',
    questions: [
      {
        question: 'What is the main topic of the meeting?',
        questionHindi: 'बैठक का मुख्य विषय क्या है?',
        options: [
          'Holiday plans',
          'Quarterly results',
          'New employees',
          'Office renovation',
        ],
        correctAnswer: 'Quarterly results',
        explanation: 'The meeting is about quarterly results and planning.',
      },
    ],
    vocabulary: [
      { word: 'quarterly', definition: 'Happening every three months', hindiTranslation: 'तिमाही' },
    ],
  },
];

async function seedListenings() {
  console.log('🌱 Starting Listening Content Creation (Week 2) seeding...');

  try {
    let order = 1;
    let createdCount = 0;

    for (const listeningInfo of listeningData) {
      // Check if listening already exists
      const existing = await db
        .select()
        .from(listenings)
        .where(eq(listenings.title, listeningInfo.title))
        .limit(1);

      if (existing.length > 0) {
        console.log(`⏭️  Skipping existing listening: ${listeningInfo.title}`);
        continue;
      }

      // Create listening
      const [listening] = await db
        .insert(listenings)
        .values({
          title: listeningInfo.title,
          titleHindi: listeningInfo.titleHindi,
          description: listeningInfo.description,
          descriptionHindi: listeningInfo.descriptionHindi,
          difficulty: listeningInfo.difficulty,
          category: listeningInfo.category,
          audioText: listeningInfo.audioText,
          audioTextHindi: listeningInfo.audioTextHindi,
          duration: listeningInfo.duration,
          questions: JSON.stringify(listeningInfo.questions),
          vocabulary: JSON.stringify(listeningInfo.vocabulary),
          order: order++,
        })
        .returning();

      console.log(`✅ Created listening: ${listening.title} (ID: ${listening.id})`);
      createdCount++;
    }

    console.log(`\n✅ Listening seeding complete!`);
    console.log(`   - Listenings created: ${createdCount}`);
    console.log(`\n💡 Note: This is a sample seed. Expand with more listenings to reach 30 total.`);
  } catch (error) {
    console.error('❌ Error during listening seeding:', error);
    throw error;
  }
}

// Run if executed directly
seedListenings()
  .then(() => {
    console.log('\n🎉 Listening seed script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Listening seed script failed:', error);
    process.exit(1);
  });

export { seedListenings };

