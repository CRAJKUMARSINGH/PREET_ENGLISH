
import { db } from "../server/db";
import {
    lessons, vocabulary, conversationLines, progress,
    quizzes, quizQuestions, quizAttempts, vocabularyProgress,
    stories as storiesTable, scenarios as scenariosTable,
    listenings as listeningsTable, speakingTopics as speakingTopicsTable
} from "../shared/schema";

// Import Data
import { dialogues } from "../client/src/data/hindiDialoguesData";
import { commonPhrases } from "../client/src/data/hindiCommonPhrasesData";
import { hindiLearningData } from "../client/src/data/hindiLearningData";
import { stories } from "../client/src/data/hindiStoriesData";
import { rolePlayScenarios } from "../client/src/data/hindiRolePlayData";
import { speakingTopics } from "../client/src/data/speakingTopics";
import { listeningLessons } from "../client/src/data/hindiListeningData";

async function seedComprehensive() {
    console.log('🌱 Starting Comprehensive Data Seeding...');

    try {
        // 1. Clear existing data
        console.log('🧹 Clearing all interactive content tables...');
        await db.delete(quizQuestions);
        await db.delete(quizAttempts);
        await db.delete(vocabularyProgress);
        await db.delete(quizzes);
        await db.delete(conversationLines);
        await db.delete(vocabulary);
        await db.delete(progress);
        await db.delete(lessons);
        await db.delete(storiesTable);
        await db.delete(scenariosTable);
        await db.delete(listeningsTable);
        await db.delete(speakingTopicsTable);
        console.log('✅ Data cleared.');

        let counts = {
            lessons: 0,
            stories: 0,
            scenarios: 0,
            speaking: 0,
            listenings: 0
        };

        // 2. Import Dialogues as Lessons
        console.log(`🗣️ Importing ${dialogues.length} dialogues...`);
        for (const dialogue of dialogues) {
            const [lesson] = await db.insert(lessons).values({
                title: dialogue.title,
                hindiTitle: dialogue.titleHindi,
                slug: `dialogue-${dialogue.id}-${dialogue.title.toLowerCase().replace(/\s+/g, '-')}`,
                description: dialogue.scenario,
                content: `# ${dialogue.title}\n\n**Scenario**: ${dialogue.scenario}\n\n**Category**: ${dialogue.category}`,
                difficulty: dialogue.difficulty,
                category: dialogue.category,
                order: counts.lessons + 1,
                emojiTheme: '🗣️',
            }).returning();

            let lineOrder = 1;
            for (const line of dialogue.lines) {
                await db.insert(conversationLines).values({
                    lessonId: lesson.id,
                    speaker: line.speaker,
                    englishText: line.english,
                    hindiText: line.hindi,
                    emoji: '👤',
                    lineOrder: lineOrder++,
                });
            }
            counts.lessons++;
        }

        // 3. Import Common Phrases
        console.log('📚 Importing Common Phrases...');
        const phrasesByCategory: Record<string, typeof commonPhrases> = {};
        for (const phrase of commonPhrases) {
            if (!phrasesByCategory[phrase.category]) phrasesByCategory[phrase.category] = [];
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
                order: counts.lessons + 1,
                emojiTheme: '💬',
            }).returning();

            for (const phrase of phrases) {
                await db.insert(vocabulary).values({
                    lessonId: lesson.id,
                    word: phrase.english,
                    hindiTranslation: phrase.hindi,
                    pronunciation: phrase.pronunciation,
                    definition: phrase.usage,
                    usageHindi: phrase.usageHindi,
                    example: phrase.example,
                    exampleHindi: phrase.exampleHindi,
                });
            }
            counts.lessons++;
        }

        // 4. Import Stories
        console.log(`📖 Importing ${stories.length} stories...`);
        for (const story of stories) {
            const content = story.paragraphs.map(p => p.english).join('\n\n');
            const contentHindi = story.paragraphs.map(p => p.hindi).join('\n\n');
            const allVocab = story.paragraphs.flatMap(p => p.vocabulary);

            await db.insert(storiesTable).values({
                title: story.title,
                titleHindi: story.titleHindi,
                description: `A ${story.category.toLowerCase()} story.`,
                descriptionHindi: story.moralHindi || "",
                content: content,
                contentHindi: contentHindi,
                category: story.category,
                difficulty: story.level === 'beginner' ? 'Beginner' : story.level === 'intermediate' ? 'Intermediate' : 'Advanced',
                vocabulary: JSON.stringify(allVocab),
                order: counts.stories + 1,
                xpReward: 50
            });
            counts.stories++;
        }

        // 5. Import Scenarios
        console.log(`🎭 Importing ${rolePlayScenarios.length} role-play scenarios...`);
        for (const scenario of rolePlayScenarios) {
            await db.insert(scenariosTable).values({
                title: scenario.title,
                titleHindi: scenario.titleHindi,
                description: scenario.situation,
                descriptionHindi: scenario.situationHindi,
                yourRole: scenario.yourRole,
                yourRoleHindi: scenario.yourRoleHindi,
                partnerRole: scenario.partnerRole,
                partnerRoleHindi: scenario.partnerRoleHindi,
                category: scenario.category,
                difficulty: scenario.difficulty === 'beginner' ? 'Beginner' : scenario.difficulty === 'intermediate' ? 'Intermediate' : 'Advanced',
                dialogues: JSON.stringify(scenario.exchanges),
                tips: JSON.stringify(scenario.exchanges.map(e => e.hintsHindi[0])),
                xpReward: 40
            });
            counts.scenarios++;
        }

        // 6. Import Speaking Topics
        console.log(`🎤 Importing ${speakingTopics.length} speaking topics...`);
        for (const topic of speakingTopics) {
            try {
                await db.insert(speakingTopicsTable).values({
                    title: topic.title,
                    hindiTitle: topic.hindiTitle,
                    difficulty: topic.difficulty,
                    emoji: topic.emoji,
                    category: topic.category,
                    hindiThoughts: JSON.stringify(topic.hindiThoughts),
                    sentenceFrames: JSON.stringify(topic.sentenceFrames),
                    modelAnswer: topic.modelAnswer,
                    freePrompt: topic.freePrompt,
                    confidenceTip: topic.confidenceTip,
                    order: counts.speaking + 1
                });
                counts.speaking++;
            } catch (err) {
                console.error(`❌ Failed to insert speaking topic: ${topic.title}`);
                throw err;
            }
        }

        // 7. Import Listenings
        console.log(`🎧 Importing ${listeningLessons.length} listening lessons...`);
        for (const lesson of listeningLessons) {
            try {
                await db.insert(listeningsTable).values({
                    title: lesson.title,
                    titleHindi: lesson.titleHindi,
                    description: lesson.description,
                    descriptionHindi: lesson.descriptionHindi,
                    difficulty: lesson.difficulty === 'beginner' ? 'Beginner' : lesson.difficulty === 'intermediate' ? 'Intermediate' : 'Advanced',
                    category: lesson.category,
                    audioText: lesson.audioText,
                    audioTextHindi: lesson.audioTextHindi,
                    duration: lesson.duration,
                    questions: JSON.stringify(lesson.questions),
                    vocabulary: JSON.stringify(lesson.vocabulary),
                    order: counts.listenings + 1
                });
                counts.listenings++;
            } catch (err) {
                console.error(`❌ Failed to insert listening lesson: ${lesson.title}`);
                throw err;
            }
        }

        console.log('🎉 Comprehensive Seeding Complete!');
        console.table(counts);

    } catch (error) {
        console.error('❌ Error during comprehensive seeding:', error);
        process.exit(1);
    }
}

seedComprehensive();
