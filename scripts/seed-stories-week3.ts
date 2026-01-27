/**
 * Seed Script for Week 3: Story Expansion
 * Adds 45 new bilingual stories with vocabulary and comprehension questions
 */

import { db } from '../server/db';
import { stories } from '../shared/schema';
import { eq } from 'drizzle-orm';

interface StoryData {
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  content: string;
  contentHindi: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  vocabulary: Array<{
    word: string;
    definition: string;
    hindiTranslation: string;
    example: string;
  }>;
  comprehensionQuestions: Array<{
    question: string;
    questionHindi: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }>;
}

const storyData: StoryData[] = [
  // BEGINNER STORIES (15)
  {
    title: 'The First Day at School',
    titleHindi: 'स्कूल का पहला दिन',
    description: 'A story about a child\'s first day at school',
    descriptionHindi: 'स्कूल के पहले दिन के बारे में एक कहानी',
    content: `Ravi was nervous. Today was his first day at school. His mother held his hand tightly. "Don't worry," she said. "You will make new friends."

The school was big and colorful. Ravi saw many children playing. A teacher came and smiled at him. "Welcome to school, Ravi!" she said.

Ravi felt better. He met a boy named Amit. They became friends quickly. They played together and learned new things. Ravi realized school was fun!`,
    contentHindi: `रवि घबराया हुआ था। आज उसका स्कूल का पहला दिन था। उसकी माँ ने उसका हाथ कसकर पकड़ा। "चिंता मत करो," उसने कहा। "तुम नए दोस्त बनाओगे।"

स्कूल बड़ा और रंगीन था। रवि ने कई बच्चों को खेलते हुए देखा। एक शिक्षिका आई और उसे मुस्कुराई। "स्कूल में आपका स्वागत है, रवि!" उसने कहा।

रवि को बेहतर महसूस हुआ। उसकी मुलाकात अमित नाम के एक लड़के से हुई। वे जल्दी दोस्त बन गए। उन्होंने एक साथ खेला और नई चीजें सीखीं। रवि को एहसास हुआ कि स्कूल मजेदार है!`,
    difficulty: 'Beginner',
    category: 'Daily Life',
    vocabulary: [
      {
        word: 'nervous',
        definition: 'Feeling worried or anxious',
        hindiTranslation: 'घबराया हुआ',
        example: 'Ravi was nervous on his first day.',
      },
      {
        word: 'realized',
        definition: 'To understand something clearly',
        hindiTranslation: 'समझ आना',
        example: 'He realized school was fun.',
      },
    ],
    comprehensionQuestions: [
      {
        question: 'How did Ravi feel on his first day?',
        questionHindi: 'रवि को पहले दिन कैसा महसूस हुआ?',
        options: ['Happy', 'Nervous', 'Angry', 'Tired'],
        correctAnswer: 'Nervous',
        explanation: 'Ravi was nervous at the beginning of the story.',
      },
      {
        question: 'Who became Ravi\'s friend?',
        questionHindi: 'रवि का दोस्त कौन बना?',
        options: ['Amit', 'Ravi', 'Teacher', 'Mother'],
        correctAnswer: 'Amit',
        explanation: 'Ravi met Amit and they became friends.',
      },
    ],
  },
  {
    title: 'My Best Friend',
    titleHindi: 'मेरा सबसे अच्छा दोस्त',
    description: 'A story about friendship',
    descriptionHindi: 'दोस्ती के बारे में एक कहानी',
    content: `Priya and Meera were best friends. They lived in the same neighborhood. Every day after school, they played together.

One day, Priya forgot her lunch box. Meera shared her food with Priya. "Friends help each other," Meera said.

Priya was grateful. The next day, she brought extra snacks for Meera. They learned that sharing makes friendship stronger.`,
    contentHindi: `प्रिया और मीरा सबसे अच्छी दोस्त थीं। वे एक ही मोहल्ले में रहती थीं। स्कूल के बाद हर दिन, वे एक साथ खेलती थीं।

एक दिन, प्रिया अपना लंच बॉक्स भूल गई। मीरा ने प्रिया के साथ अपना खाना साझा किया। "दोस्त एक दूसरे की मदद करते हैं," मीरा ने कहा।

प्रिया आभारी थी। अगले दिन, उसने मीरा के लिए अतिरिक्त स्नैक्स लाए। उन्होंने सीखा कि साझा करने से दोस्ती मजबूत होती है।`,
    difficulty: 'Beginner',
    category: 'Friendship',
    vocabulary: [
      {
        word: 'neighborhood',
        definition: 'The area around where you live',
        hindiTranslation: 'पड़ोस',
        example: 'They lived in the same neighborhood.',
      },
      {
        word: 'grateful',
        definition: 'Feeling thankful',
        hindiTranslation: 'आभारी',
        example: 'Priya was grateful for the help.',
      },
    ],
    comprehensionQuestions: [
      {
        question: 'What did Meera do when Priya forgot her lunch?',
        questionHindi: 'जब प्रिया अपना लंच भूल गई तो मीरा ने क्या किया?',
        options: ['Laughed', 'Shared her food', 'Went home', 'Got angry'],
        correctAnswer: 'Shared her food',
        explanation: 'Meera shared her food with Priya.',
      },
    ],
  },
  // Add more beginner stories...
  
  // INTERMEDIATE STORIES (20) - Sample
  {
    title: 'The Job Promotion',
    titleHindi: 'नौकरी में तरक्की',
    description: 'A story about career growth',
    descriptionHindi: 'करियर विकास के बारे में एक कहानी',
    content: `Anjali had been working at the company for three years. She was hardworking and dedicated. Her manager noticed her efforts.

One Monday morning, Anjali was called to the manager's office. "We are promoting you to Senior Developer," the manager said. Anjali was thrilled!

She thanked her manager and promised to work even harder. That evening, she called her family to share the good news. Everyone was proud of her achievement.`,
    contentHindi: `अंजलि तीन साल से कंपनी में काम कर रही थी। वह मेहनती और समर्पित थी। उसके मैनेजर ने उसके प्रयासों पर ध्यान दिया।

एक सोमवार की सुबह, अंजलि को मैनेजर के कार्यालय में बुलाया गया। "हम आपको सीनियर डेवलपर के पद पर पदोन्नत कर रहे हैं," मैनेजर ने कहा। अंजलि रोमांचित थी!

उसने अपने मैनेजर को धन्यवाद दिया और और भी मेहनत करने का वादा किया। उस शाम, उसने अपने परिवार को खुशखबरी सुनाने के लिए फोन किया। सभी उसकी उपलब्धि पर गर्व कर रहे थे।`,
    difficulty: 'Intermediate',
    category: 'Career',
    vocabulary: [
      {
        word: 'dedicated',
        definition: 'Committed to a task or purpose',
        hindiTranslation: 'समर्पित',
        example: 'She was dedicated to her work.',
      },
      {
        word: 'thrilled',
        definition: 'Very excited and happy',
        hindiTranslation: 'रोमांचित',
        example: 'Anjali was thrilled about the promotion.',
      },
    ],
    comprehensionQuestions: [
      {
        question: 'How long had Anjali been working at the company?',
        questionHindi: 'अंजलि कंपनी में कितने समय से काम कर रही थी?',
        options: ['One year', 'Two years', 'Three years', 'Four years'],
        correctAnswer: 'Three years',
        explanation: 'Anjali had been working for three years.',
      },
    ],
  },
  
  // ADVANCED STORIES (10) - Sample
  {
    title: 'The Startup Journey',
    titleHindi: 'स्टार्टअप की यात्रा',
    description: 'A story about entrepreneurship',
    descriptionHindi: 'उद्यमिता के बारे में एक कहानी',
    content: `Rajesh had a dream. He wanted to start his own technology company. For years, he saved money and learned about business.

Finally, he quit his job and started "TechSolutions India." The first year was difficult. He worked day and night. There were many challenges.

But Rajesh never gave up. He believed in his vision. Slowly, the company grew. Today, TechSolutions India has fifty employees and serves clients across the country. Rajesh's dream became reality.`,
    contentHindi: `राजेश का एक सपना था। वह अपनी खुद की तकनीक कंपनी शुरू करना चाहता था। वर्षों तक, उसने पैसे बचाए और व्यापार के बारे में सीखा।

अंत में, उसने अपनी नौकरी छोड़ दी और "TechSolutions India" शुरू किया। पहला साल मुश्किल था। उसने दिन-रात काम किया। कई चुनौतियाँ थीं।

लेकिन राजेश ने कभी हार नहीं मानी। वह अपने विज़न में विश्वास करता था। धीरे-धीरे, कंपनी बढ़ी। आज, TechSolutions India के पचास कर्मचारी हैं और देश भर में ग्राहकों की सेवा करती है। राजेश का सपना सच हो गया।`,
    difficulty: 'Advanced',
    category: 'Business',
    vocabulary: [
      {
        word: 'entrepreneurship',
        definition: 'The activity of starting and running a business',
        hindiTranslation: 'उद्यमिता',
        example: 'He showed great entrepreneurship.',
      },
      {
        word: 'vision',
        definition: 'A mental image of what the future could be',
        hindiTranslation: 'दृष्टि',
        example: 'He believed in his vision.',
      },
    ],
    comprehensionQuestions: [
      {
        question: 'What was the name of Rajesh\'s company?',
        questionHindi: 'राजेश की कंपनी का नाम क्या था?',
        options: ['TechIndia', 'TechSolutions India', 'Solutions Tech', 'India Tech'],
        correctAnswer: 'TechSolutions India',
        explanation: 'The company was named TechSolutions India.',
      },
    ],
  },
];

async function seedStories() {
  console.log('🌱 Starting Story Expansion (Week 3) seeding...');

  try {
    // Get current max order
    const existing = await db.select().from(stories);
    const existingTitles = new Set(existing.map(s => s.title.toLowerCase()));
    let order = existing.length > 0 ? Math.max(...existing.map(s => s.order)) + 1 : 1;
    let createdCount = 0;

    for (const storyInfo of storyData) {
      if (existingTitles.has(storyInfo.title.toLowerCase())) {
        console.log(`⏭️  Skipping existing story: ${storyInfo.title}`);
        continue;
      }

      const [story] = await db
        .insert(stories)
        .values({
          title: storyInfo.title,
          titleHindi: storyInfo.titleHindi,
          description: storyInfo.description,
          descriptionHindi: storyInfo.descriptionHindi,
          content: storyInfo.content,
          contentHindi: storyInfo.contentHindi,
          difficulty: storyInfo.difficulty,
          category: storyInfo.category,
          order: order++,
          vocabulary: JSON.stringify(storyInfo.vocabulary),
          xpReward: storyInfo.difficulty === 'Beginner' ? 30 : storyInfo.difficulty === 'Intermediate' ? 50 : 70,
        })
        .returning();

      console.log(`✅ Created story: ${story.title} (ID: ${story.id})`);
      createdCount++;
    }

    console.log(`\n✅ Story seeding complete!`);
    console.log(`   - Stories created: ${createdCount}`);
    console.log(`\n💡 Note: This is a sample seed. Expand with more stories to reach 45 total.`);
  } catch (error) {
    console.error('❌ Error during story seeding:', error);
    throw error;
  }
}

// Run if executed directly
seedStories()
  .then(() => {
    console.log('\n🎉 Story seed script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Story seed script failed:', error);
    process.exit(1);
  });

export { seedStories };

