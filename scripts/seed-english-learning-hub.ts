import { db } from "../server/db";
import { lessons, vocabulary } from "../shared/schema";
import { eq } from "drizzle-orm";

/**
 * Seed script to migrate lessons and data from English-Learning-Hub to root app
 * This extracts the seed data from English-Learning-Hub and adapts it to the root app's schema
 */

interface HubLesson {
  title: string;
  slug: string;
  content: string;
  difficulty: string;
  order: number;
  category: string;
  quizzes?: Array<{
    question: string;
    options: string[];
    correctAnswer: string;
    explanation?: string;
  }>;
}

interface HubTopic {
  name: string;
  slug: string;
  description: string;
  lessons: HubLesson[];
  flashcards?: Array<{
    front: string;
    back: string;
    example?: string;
  }>;
}

// Data extracted from English-Learning-Hub/server/routes.ts
const hubData: HubTopic[] = [
  {
    name: "English Grammar",
    slug: "english-grammar",
    description: "Master the foundations of English sentences.",
    lessons: [
      {
        title: "Mastering Nouns: From Basic to Advanced",
        slug: "intro-to-nouns",
        content: `# Mastering Nouns in English

Nouns are the building blocks of sentences. They represent people, places, things, ideas, and more.

## 1. Classification of Nouns

### Common vs. Proper Nouns
- **Common Nouns**: General names for things. They are not capitalized unless they start a sentence.
  - *Examples*: teacher, city, mountain, book.
- **Proper Nouns**: Specific names for people, places, or organizations. They always start with a capital letter.
  - *Examples*: Mr. Smith, Paris, Mount Everest, Microsoft.

### Concrete vs. Abstract Nouns
- **Concrete Nouns**: Things you can perceive with your five senses (see, smell, hear, taste, or touch).
  - *Examples*: apple, rain, music, velvet.
- **Abstract Nouns**: Ideas, qualities, or conditions—things that cannot be seen or touched.
  - *Examples*: freedom, love, courage, time, happiness.

### Countable vs. Uncountable Nouns
- **Countable**: Can be singular or plural (one car, two cars).
- **Uncountable**: Cannot be counted individually and usually do not have a plural form.
  - *Examples*: water, rice, information, furniture.

## 2. Collective Nouns
These refer to groups of people or things as a single unit.
- A **flock** of birds.
- A **team** of players.
- A **jury** of peers.

## 3. Pluralization Rules
- Most nouns: Add **-s** (cat -> cats).
- Ending in s, x, z, ch, sh: Add **-es** (bus -> buses).
- Ending in y (consonant + y): Change y to i and add **-es** (city -> cities).
- Irregular: (man -> men, child -> children, mouse -> mice).`,
        difficulty: "beginner",
        order: 1,
        category: "Grammar",
        quizzes: [
          {
            question: "Which of the following is an Abstract Noun?",
            options: ["Table", "Honesty", "River", "Keyboard"],
            correctAnswer: "Honesty",
            explanation: "Honesty is an abstract noun because it represents a quality/concept that cannot be physically touched.",
          },
        ],
      },
      {
        title: "The Power of Verbs: Actions, States, and Tenses",
        slug: "understanding-verbs",
        content: `# The Power of Verbs

Verbs are the most important part of any sentence because they express action or state of being.

## 1. Action Verbs (Dynamic Verbs)
Action verbs tell us what the subject is doing.
- **Physical Action**: run, jump, eat, write.
- **Mental Action**: think, guess, wonder, believe.

## 2. Stative Verbs (State of Being)
Stative verbs describe a state rather than an action. They are rarely used in continuous (-ing) forms.
- **Emotions**: love, hate, want, need.
- **Senses**: see, hear, seem, appear.
- **Possession**: have, own, belong, possess.

## 3. Helping Verbs (Auxiliary Verbs)
These combine with a main verb to express tense, mood, or voice.
- **Primary Auxiliaries**: be, do, have. (e.g., I *am* walking.)
- **Modal Auxiliaries**: can, could, shall, should, will, would, may, might, must. (e.g., You *must* study.)

## 4. Transitive vs. Intransitive
- **Transitive**: Requires a direct object to complete its meaning. (e.g., She *kicked* the ball.)
- **Intransitive**: Does not require an object. (e.g., He *arrived*.)

## 5. Subject-Verb Agreement
A singular subject needs a singular verb, and a plural subject needs a plural verb.
- The dog **barks**.
- The dogs **bark**.`,
        difficulty: "beginner",
        order: 2,
        category: "Grammar",
        quizzes: [
          {
            question: "Identify the Stative Verb in this list:",
            options: ["Dance", "Know", "Build", "Sing"],
            correctAnswer: "Know",
            explanation: "'Know' is a stative verb because it represents a mental state, not a physical action.",
          },
        ],
      },
    ],
  },
  {
    name: "Essential Vocabulary & Expressions",
    slug: "daily-vocabulary",
    description: "Expand your word bank for professional and social success.",
    lessons: [
      {
        title: "Social English: Greetings & Polite Inquiries",
        slug: "greetings",
        content: `# Social English: Beyond 'Hello'

Mastering greetings is about more than just words; it's about setting the tone for a conversation.

## 1. Formal Greetings
Used in business settings or with people you don't know well.
- "Good morning/afternoon/evening."
- "It's a pleasure to meet you."
- "How do you do?" (Very formal, often answered with the same phrase).

## 2. Informal Greetings
Used with friends, family, and colleagues you have a close relationship with.
- "Hey there!"
- "What's up?" (Casual, often answered with "Not much").
- "How's it going?"
- "Long time no see!"

## 3. Responding to "How are you?"
- **Formal**: "I'm very well, thank you. And you?"
- **Standard**: "I'm fine, thanks. How about you?"
- **Casual**: "Can't complain," "Doing great," or "Pretty good."

## 4. Closing a Conversation
- "It was great catching up with you."
- "I look forward to our next meeting."
- "Have a wonderful day!"
- "Catch you later!"`,
        difficulty: "beginner",
        order: 1,
        category: "Vocabulary",
        quizzes: [
          {
            question: "Which of these is an informal greeting?",
            options: ["How do you do?", "Good morning", "What's up?", "Pleased to meet you"],
            correctAnswer: "What's up?",
            explanation: "'What's up?' is a casual way to greet friends.",
          },
        ],
      },
    ],
    flashcards: [
      {
        front: "Eloquence",
        back: "Fluent or persuasive speaking or writing.",
        example: "His eloquence moved the entire audience to tears.",
      },
      {
        front: "Meticulous",
        back: "Showing great attention to detail; very careful and precise.",
        example: "The researcher was meticulous in her data collection.",
      },
      {
        front: "Ambiguous",
        back: "Open to more than one interpretation; not having one obvious meaning.",
        example: "The ending of the movie was deliberately ambiguous.",
      },
    ],
  },
];

async function seedEnglishLearningHub() {
  console.log("🌱 Starting English-Learning-Hub data migration...");

  try {
    // Get current max order to append new lessons
    const existingLessons = await db.select().from(lessons);
    const existingSlugs = new Set(existingLessons.map((l) => l.slug));
    let maxOrder = existingLessons.length > 0 ? Math.max(...existingLessons.map((l) => l.order)) : 0;

    let lessonCount = 0;
    let vocabCount = 0;

    for (const topic of hubData) {
      console.log(`\n📚 Processing topic: ${topic.name}`);

      for (const lessonData of topic.lessons) {
        // Skip if lesson already exists
        if (existingSlugs.has(lessonData.slug)) {
          console.log(`  ⏭️  Skipping existing lesson: ${lessonData.title}`);
          continue;
        }

        // Create lesson adapted to root app schema
        const [lesson] = await db
          .insert(lessons)
          .values({
            title: lessonData.title,
            slug: lessonData.slug,
            description: `${topic.description} - ${lessonData.title}`,
            hindiDescription: `${topic.name} - ${lessonData.title}`,
            content: lessonData.content,
            difficulty: lessonData.difficulty.charAt(0).toUpperCase() + lessonData.difficulty.slice(1), // Capitalize
            category: lessonData.category,
            order: maxOrder + lessonData.order,
            hindiTitle: lessonData.title, // Default to English title if no Hindi translation
            emojiTheme: topic.slug === "english-grammar" ? "📖" : "💬",
            imageUrl: null,
          })
          .returning();

        console.log(`  ✅ Created lesson: ${lesson.title} (ID: ${lesson.id})`);
        lessonCount++;

        // Add vocabulary from flashcards if available
        if (topic.flashcards && topic.flashcards.length > 0) {
          for (const flashcard of topic.flashcards) {
            await db.insert(vocabulary).values({
              lessonId: lesson.id,
              word: flashcard.front,
              definition: flashcard.back,
              example: flashcard.example || "",
              pronunciation: null,
              hindiTranslation: null,
              hindiPronunciation: null,
              exampleHindi: null,
              usageHindi: null,
              audioUrl: null,
              pronunciationDifficulty: 1,
              commonMispronunciation: null,
            });
            vocabCount++;
          }
        }

        // Note: Quizzes from English-Learning-Hub use a different structure
        // The root app has quizzes but they're stored differently
        // For now, we'll skip quiz migration as it requires schema changes
        if (lessonData.quizzes && lessonData.quizzes.length > 0) {
          console.log(`  📝 Note: ${lessonData.quizzes.length} quiz(es) found but not migrated (different schema structure)`);
        }
      }
    }

    console.log(`\n✅ Migration complete!`);
    console.log(`   - Lessons created: ${lessonCount}`);
    console.log(`   - Vocabulary items created: ${vocabCount}`);
    console.log(`\n💡 Note: Quizzes from English-Learning-Hub use a different schema structure.`);
    console.log(`   They need to be manually adapted to the root app's quiz system.`);
  } catch (error) {
    console.error("❌ Error during migration:", error);
    throw error;
  }
}

// Run if executed directly
seedEnglishLearningHub()
  .then(() => {
    console.log("\n🎉 Seed script completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Seed script failed:", error);
    process.exit(1);
  });

export { seedEnglishLearningHub };

