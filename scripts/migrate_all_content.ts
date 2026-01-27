import { db } from "../server/db";
import {
    lessons, vocabulary, scenarios, stories, listenings, speakingTopics,
    type InsertLesson, type InsertVocabulary, type InsertScenario,
    type InsertStory, type InsertListening, type InsertSpeakingTopic
} from "../shared/schema";
import { commonPhrases } from "../client/src/data/hindiCommonPhrasesData";
import { dialogues } from "../client/src/data/hindiDialoguesData";
import { rolePlayScenarios } from "../client/src/data/hindiRolePlayData";
import { stories as storyData } from "../client/src/data/hindiStoriesData";
import { listeningLessons } from "../client/src/data/hindiListeningData";
import { speakingTopics as speakingData } from "../client/src/data/speakingTopics";
import { advancedVocabulary } from "../client/src/data/advancedVocabularyData";

async function migrateAllContent() {
    console.log("🚀 Starting comprehensive data migration...");

    try {
        // 1. Migrate Common Phrases to Vocabulary
        console.log(`\n📦 Migrating ${commonPhrases.length} Common Phrases...`);
        const phraseInserts: InsertVocabulary[] = commonPhrases.map(p => ({
            word: p.hindi,
            translation: p.english,
            type: "phrase",
            category: p.category,
            difficulty: p.difficulty,
            context: p.usage
        }));
        // Batch insert
        for (let i = 0; i < phraseInserts.length; i += 100) {
            const batch = phraseInserts.slice(i, i + 100);
            await db.insert(vocabulary).values(batch).onConflictDoNothing();
        }
        console.log("✅ Common Phrases migrated.");

        // 2. Migrate Dialogues to Scenarios (or Lessons if appropriate)
        // Mapping dialogues to scenarios for now
        console.log(`\n📦 Migrating ${dialogues.length} Dialogues...`);
        for (const d of dialogues) {
            await db.insert(scenarios).values({
                title: d.title,
                description: d.description,
                difficulty: d.level.charAt(0).toUpperCase() + d.level.slice(1),
                category: d.category,
                content: JSON.stringify(d.lines), // Store conversation lines
                order: 0
            }).onConflictDoNothing();
        }
        console.log("✅ Dialogues migrated.");

        // 3. Migrate Role Play Scenarios
        console.log(`\n📦 Migrating ${rolePlayScenarios.length} Role Play Scenarios...`);
        for (const rp of rolePlayScenarios) {
            await db.insert(scenarios).values({
                title: rp.title,
                description: rp.description,
                difficulty: rp.difficulty,
                category: rp.category,
                content: JSON.stringify(rp.interaction),
                order: 0
            }).onConflictDoNothing();
        }
        console.log("✅ Role Play Scenarios migrated.");

        // 4. Migrate Stories
        console.log(`\n📦 Migrating ${storyData.length} Stories...`);
        for (const s of storyData) {
            await db.insert(stories).values({
                title: s.title,
                hindiTitle: s.titleHindi,
                content: s.hindiContent,
                translation: s.englishContent,
                difficulty: s.difficulty,
                category: s.category || "General",
                audioUrl: s.audio,
                coverImage: s.image
            }).onConflictDoNothing();
        }
        console.log("✅ Stories migrated.");

        // 5. Migrate Listening Exercises
        console.log(`\n📦 Migrating ${listeningLessons.length} Listening Exercises...`);
        for (const l of listeningLessons) {
            await db.insert(listenings).values({
                title: l.title,
                description: l.description,
                audioUrl: l.audioUrl,
                difficulty: l.difficulty,
                category: l.category,
                transcript: l.transcript,
                questions: JSON.stringify(l.questions)
            }).onConflictDoNothing();
        }
        console.log("✅ Listening Exercises migrated.");

        // 6. Migrate Speaking Topics
        console.log(`\n📦 Migrating ${speakingData.length} Speaking Topics...`);
        for (const st of speakingData) {
            await db.insert(speakingTopics).values({
                title: st.title,
                hindiTitle: st.hindiTitle,
                difficulty: st.difficulty,
                category: st.category,
                questions: JSON.stringify(st.questions || []),
                vocabulary: JSON.stringify(st.vocabulary || [])
            }).onConflictDoNothing();
        }
        console.log("✅ Speaking Topics migrated.");

        // 7. Migrate Advanced Vocabulary
        console.log(`\n📦 Migrating ${advancedVocabulary.length} Advanced Vocabulary...`);
        const advVocabInserts: InsertVocabulary[] = advancedVocabulary.map(v => ({
            word: v.term,
            translation: v.definition,
            type: "word",
            category: v.category,
            difficulty: "Advanced",
            context: v.example
        }));
        for (let i = 0; i < advVocabInserts.length; i += 100) {
            const batch = advVocabInserts.slice(i, i + 100);
            await db.insert(vocabulary).values(batch).onConflictDoNothing();
        }
        console.log("✅ Advanced Vocabulary migrated.");

        console.log("\n🎉 ALL DATA MIGRATED SUCCESSFULLY!");

    } catch (error) {
        console.error("❌ Migration failed:", error);
        process.exit(1);
    }
}

migrateAllContent();
