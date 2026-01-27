
import { db } from "../server/db";
import {
    lessons, vocabulary, conversationLines, progress,
    quizzes, quizQuestions, quizAttempts, vocabularyProgress
} from "../shared/schema";
import { dialogues } from "../client/src/data/hindiDialoguesData";
import { commonPhrases } from "../client/src/data/hindiCommonPhrasesData";
import { hindiLearningData } from "../client/src/data/hindiLearningData";

async function seedRealData() {
    console.log('🌱 Starting Real Data Seeding...');

    try {
        // 1. Clear existing data (in dependency order)
        console.log('🧹 Clearing existing data and dependencies...');

        // Level 3 (Depends on Level 2 or Root)
        await db.delete(quizQuestions);
        await db.delete(quizAttempts);
        await db.delete(vocabularyProgress);

        // Level 2 (Depends on Level 1)
        await db.delete(quizzes);
        await db.delete(conversationLines);
        await db.delete(vocabulary);
        await db.delete(progress);

        // Level 1 (Root)
        await db.delete(lessons);

        console.log('✅ Data cleared.');

        let lessonCount = 0;

        // 2. Import Dialogues as Lessons
        console.log(`🗣️ Importing ${dialogues.length} dialogues...`);
        for (const dialogue of dialogues) {
            // Create Lesson
            const [lesson] = await db.insert(lessons).values({
                title: dialogue.title,
                hindiTitle: dialogue.titleHindi,
                slug: `dialogue-${dialogue.id}-${dialogue.title.toLowerCase().replace(/\s+/g, '-')}`,
                description: dialogue.scenario,
                content: `# ${dialogue.title}\n\n**Scenario**: ${dialogue.scenario}\n\n**Category**: ${dialogue.category}`,
                difficulty: dialogue.difficulty, // "beginner" | "intermediate" | "advanced"
                category: dialogue.category,
                order: lessonCount + 1,
                emojiTheme: '🗣️', // Default emoji for dialogues
                imageUrl: null,
            }).returning();

            // unique order for lines
            let lineOrder = 1;
            for (const line of dialogue.lines) {
                await db.insert(conversationLines).values({
                    lessonId: lesson.id,
                    speaker: line.speaker,
                    englishText: line.english,
                    hindiText: line.hindi,
                    emoji: '👤', // Default
                    lineOrder: lineOrder++,
                });
            }
            lessonCount++;
        }

        // 3. Import Common Phrases as Lessons (Grouped by Category)
        console.log('📚 Importing Common Phrases...');

        // Group phrases by category
        const phrasesByCategory: Record<string, typeof commonPhrases> = {};
        for (const phrase of commonPhrases) {
            if (!phrasesByCategory[phrase.category]) {
                phrasesByCategory[phrase.category] = [];
            }
            phrasesByCategory[phrase.category].push(phrase);
        }

        for (const [category, phrases] of Object.entries(phrasesByCategory)) {
            const difficulty = phrases[0].difficulty || 'beginner';

            const [lesson] = await db.insert(lessons).values({
                title: `Essential Phrases: ${category}`,
                hindiTitle: `महत्वपूर्ण वाक्यांश: ${category}`,
                slug: `phrases-${category.toLowerCase().replace(/\s+/g, '-')}`,
                description: `Learn essential English phrases for ${category}.`,
                content: `# ${category} Phrases\n\nMaster these common expressions used in ${category}.`,
                difficulty: difficulty,
                category: "Common Phrases",
                order: lessonCount + 1,
                emojiTheme: '💬',
                imageUrl: null,
            }).returning();

            for (const phrase of phrases) {
                await db.insert(vocabulary).values({
                    lessonId: lesson.id,
                    word: phrase.english,
                    hindiTranslation: phrase.hindi,
                    pronunciation: phrase.pronunciation,
                    definition: phrase.usage,
                    example: phrase.example,
                });
            }
            lessonCount++;
        }

        // 4. Import Deep Learning Modules (Pronunciation Challenges)
        console.log('🧠 Importing Learning Modules...');
        const pronunciation = hindiLearningData.pronunciationChallenges;

        for (const [key, module] of Object.entries(pronunciation)) {
            const [lesson] = await db.insert(lessons).values({
                title: `Pronunciation: ${module.title}`,
                hindiTitle: `उच्चारण: ${module.title}`,
                slug: `pronunciation-${key}`,
                description: module.description,
                content: `# ${module.title}\n\n${module.description}`,
                difficulty: "beginner",
                category: "Pronunciation",
                order: lessonCount + 1,
                emojiTheme: '👄',
                imageUrl: null,
            }).returning();

            // Add words as vocab
            for (const word of module.words) {
                await db.insert(vocabulary).values({
                    lessonId: lesson.id,
                    word: word.word,
                    hindiTranslation: word.hindi,
                    pronunciation: word.word, // It puts the word itself? The data has tips.
                    definition: word.tip, // Using 'tip' as definition
                    example: `Practice saying: ${word.word}`,
                });
            }
            lessonCount++;
        }

        console.log(`🎉 Seeding Complete! Created ${lessonCount} high-quality lessons from real data.`);

    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
}

seedRealData();
