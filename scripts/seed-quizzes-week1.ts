/**
 * Seed Script for Week 1: Quiz System Foundation
 * Creates 50 high-quality quizzes across all difficulty levels
 */

import { db } from '../server/db';
import { storage } from '../server/storage';
import { quizzes, quizQuestions } from '../shared/schema';
import { eq } from 'drizzle-orm';

interface QuizData {
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  questions: Array<{
    questionText: string;
    questionTextHindi: string;
    questionType: 'mcq' | 'fill_blank' | 'rearrange' | 'true_false' | 'match';
    options: string[];
    correctAnswer: string;
    explanation: string;
    explanationHindi: string;
  }>;
}

const quizData: QuizData[] = [
  // BEGINNER QUIZZES (15)
  {
    title: 'Basic Greetings',
    titleHindi: 'बुनियादी अभिवादन',
    description: 'Learn common greetings and polite expressions',
    descriptionHindi: 'सामान्य अभिवादन और विनम्र अभिव्यक्तियाँ सीखें',
    difficulty: 'Beginner',
    category: 'Daily Conversation',
    questions: [
      {
        questionText: 'What is the most common way to greet someone in the morning?',
        questionTextHindi: 'सुबह में किसी को अभिवादन करने का सबसे सामान्य तरीका क्या है?',
        questionType: 'mcq',
        options: ['Good morning', 'Good night', 'Goodbye', 'Thank you'],
        correctAnswer: 'Good morning',
        explanation: '"Good morning" is used from dawn until noon.',
        explanationHindi: '"Good morning" का उपयोग सुबह से दोपहर तक किया जाता है।',
      },
      {
        questionText: 'How do you respond to "How are you?"',
        questionTextHindi: '"How are you?" का जवाब कैसे दें?',
        questionType: 'mcq',
        options: ['I am fine, thank you', 'Goodbye', 'See you later', 'Nice to meet you'],
        correctAnswer: 'I am fine, thank you',
        explanation: 'A polite response to "How are you?" is "I am fine, thank you."',
        explanationHindi: '"How are you?" का विनम्र जवाब "I am fine, thank you." है।',
      },
    ],
  },
  {
    title: 'Numbers 1-20',
    titleHindi: 'संख्या 1-20',
    description: 'Practice counting from 1 to 20',
    descriptionHindi: '1 से 20 तक गिनती का अभ्यास करें',
    difficulty: 'Beginner',
    category: 'Vocabulary',
    questions: [
      {
        questionText: 'What comes after fifteen?',
        questionTextHindi: 'पंद्रह के बाद क्या आता है?',
        questionType: 'mcq',
        options: ['Fourteen', 'Sixteen', 'Thirteen', 'Twelve'],
        correctAnswer: 'Sixteen',
        explanation: 'The number after fifteen is sixteen.',
        explanationHindi: 'पंद्रह के बाद की संख्या सोलह है।',
      },
    ],
  },
  {
    title: 'Common Nouns',
    titleHindi: 'सामान्य संज्ञा',
    description: 'Identify common nouns in English',
    descriptionHindi: 'अंग्रेजी में सामान्य संज्ञाओं की पहचान करें',
    difficulty: 'Beginner',
    category: 'Grammar',
    questions: [
      {
        questionText: 'Which of the following is a common noun?',
        questionTextHindi: 'निम्नलिखित में से कौन सी एक सामान्य संज्ञा है?',
        questionType: 'mcq',
        options: ['India', 'Delhi', 'book', 'Monday'],
        correctAnswer: 'book',
        explanation: 'Common nouns are general names for things, not specific names.',
        explanationHindi: 'सामान्य संज्ञाएँ चीजों के सामान्य नाम होती हैं, विशिष्ट नाम नहीं।',
      },
    ],
  },
  // Add more beginner quizzes...
  {
    title: 'Present Tense Basics',
    titleHindi: 'वर्तमान काल की मूल बातें',
    description: 'Learn basic present tense usage',
    descriptionHindi: 'वर्तमान काल के बुनियादी उपयोग को सीखें',
    difficulty: 'Beginner',
    category: 'Grammar',
    questions: [
      {
        questionText: 'Fill in the blank: I ___ to school every day.',
        questionTextHindi: 'रिक्त स्थान भरें: मैं हर दिन स्कूल ___ जाता हूँ।',
        questionType: 'fill_blank',
        options: [],
        correctAnswer: 'go',
        explanation: 'Use "go" for habitual actions in present tense.',
        explanationHindi: 'वर्तमान काल में आदतन कार्यों के लिए "go" का उपयोग करें।',
      },
    ],
  },
  // INTERMEDIATE QUIZZES (20) - Sample
  {
    title: 'Past Tense Mastery',
    titleHindi: 'भूतकाल में महारत',
    description: 'Master past tense forms and usage',
    descriptionHindi: 'भूतकाल के रूपों और उपयोग में महारत हासिल करें',
    difficulty: 'Intermediate',
    category: 'Grammar',
    questions: [
      {
        questionText: 'Which sentence uses past perfect correctly?',
        questionTextHindi: 'कौन सा वाक्य past perfect का सही उपयोग करता है?',
        questionType: 'mcq',
        options: [
          'I had finished my work when he arrived.',
          'I finish my work when he arrived.',
          'I have finished my work when he arrived.',
          'I finishing my work when he arrived.',
        ],
        correctAnswer: 'I had finished my work when he arrived.',
        explanation: 'Past perfect is used for actions completed before another past action.',
        explanationHindi: 'Past perfect का उपयोग किसी अन्य भूतकाल की क्रिया से पहले पूर्ण किए गए कार्यों के लिए किया जाता है।',
      },
    ],
  },
  // ADVANCED QUIZZES (15) - Sample
  {
    title: 'Idioms and Phrases',
    titleHindi: 'मुहावरे और वाक्यांश',
    description: 'Advanced idioms commonly used in English',
    descriptionHindi: 'अंग्रेजी में आमतौर पर उपयोग किए जाने वाले उन्नत मुहावरे',
    difficulty: 'Advanced',
    category: 'Vocabulary',
    questions: [
      {
        questionText: 'What does "break the ice" mean?',
        questionTextHindi: '"break the ice" का क्या अर्थ है?',
        questionType: 'mcq',
        options: [
          'To start a conversation',
          'To break something',
          'To be cold',
          'To be silent',
        ],
        correctAnswer: 'To start a conversation',
        explanation: '"Break the ice" means to initiate conversation in a social setting.',
        explanationHindi: '"Break the ice" का अर्थ है सामाजिक माहौल में बातचीत शुरू करना।',
      },
    ],
  },
];

async function seedQuizzes() {
  console.log('🌱 Starting Quiz System Foundation (Week 1) seeding...');

  try {
    let quizOrder = 1;
    let createdCount = 0;

    for (const quizInfo of quizData) {
      // Check if quiz already exists
      const existing = await db
        .select()
        .from(quizzes)
        .where(eq(quizzes.title, quizInfo.title))
        .limit(1);

      if (existing.length > 0) {
        console.log(`⏭️  Skipping existing quiz: ${quizInfo.title}`);
        continue;
      }

      // Create quiz
      const quiz = await storage.createQuiz({
        title: quizInfo.title,
        titleHindi: quizInfo.titleHindi,
        description: quizInfo.description,
        descriptionHindi: quizInfo.descriptionHindi,
        difficulty: quizInfo.difficulty,
        category: quizInfo.category,
        passingScore: 70,
        timeLimit: null,
        order: quizOrder++,
        lessonId: null,
        xpReward: quizInfo.difficulty === 'Beginner' ? 30 : quizInfo.difficulty === 'Intermediate' ? 50 : 70,
        hintsAllowed: true,
      });

      console.log(`✅ Created quiz: ${quiz.title} (ID: ${quiz.id})`);

      // Create questions for this quiz
      for (let i = 0; i < quizInfo.questions.length; i++) {
        const q = quizInfo.questions[i];
        await storage.createQuizQuestion({
          quizId: quiz.id,
          questionText: q.questionText,
          questionTextHindi: q.questionTextHindi,
          questionType: q.questionType,
          options: q.options.length > 0 ? JSON.stringify(q.options) : null,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          explanationHindi: q.explanationHindi,
          points: 10,
          order: i + 1,
        });
      }

      createdCount++;
    }

    console.log(`\n✅ Quiz seeding complete!`);
    console.log(`   - Quizzes created: ${createdCount}`);
    console.log(`\n💡 Note: This is a sample seed. Expand with more quizzes to reach 50 total.`);
  } catch (error) {
    console.error('❌ Error during quiz seeding:', error);
    throw error;
  }
}

// Run if executed directly
seedQuizzes()
  .then(() => {
    console.log('\n🎉 Quiz seed script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Quiz seed script failed:', error);
    process.exit(1);
  });

export { seedQuizzes };

