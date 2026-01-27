
import { db } from "../server/db";
import { lessons, vocabulary, conversationLines, scenarios } from "@shared/schema";
import { stories } from "../client/src/data/hindiStoriesData";
import { hindiLearningData } from "../client/src/data/hindiLearningData";
import { advancedVocabularyData } from "../client/src/data/advancedVocabularyData";
import { eq } from "drizzle-orm";

/**
 * MASTER DATA BRIDGE
 * Integrates all orphaned client-side static data into the central database.
 * This makes the app "brilliant" by unifying all available content.
 */

async function bridge() {
    console.log("🌉 Starting Master Data Bridge...");

    let order = 50000; // Start high to avoid clashing with main sequence
    let created = 0;

    // 1. INTEGRATE STORIES
    console.log("📚 Integrating Stories...");
    for (const story of stories) {
        const slug = `story-${story.id}-${story.title.toLowerCase().replace(/ /g, "-")}`;

        // Check if exists
        const [existing] = await db.select().from(lessons).where(eq(lessons.slug, slug));
        if (existing) continue;

        // Build markdown content from paragraphs
        let content = `# ${story.title}\n\n`;
        story.paragraphs.forEach(p => {
            content += `### ${p.english}\n*${p.hindi}*\n\n`;
        });
        content += `--- \n**Moral:** ${story.moral}\n*${story.moralHindi}*`;

        const [lesson] = await db.insert(lessons).values({
            title: story.title,
            hindiTitle: story.titleHindi,
            slug,
            description: `Moral story: ${story.title}. Category: ${story.category}`,
            hindiDescription: `${story.category} से नैतिक कहानी: ${story.titleHindi}`,
            content,
            difficulty: story.level === "beginner" ? "Beginner" : (story.level === "intermediate" ? "Intermediate" : "Advanced"),
            category: "Stories",
            order: order++,
            emojiTheme: "📖"
        }).returning();

        // Insert vocabulary from story
        for (const p of story.paragraphs) {
            for (const v of p.vocabulary) {
                await db.insert(vocabulary).values({
                    lessonId: lesson.id,
                    word: v.word,
                    definition: v.meaning,
                    hindiTranslation: v.hindiMeaning,
                    example: p.english
                });
            }
        }
        created++;
    }

    // 2. INTEGRATE PRONUNCIATION CHALLENGES (Learning Context)
    console.log("🗣️ Integrating Pronunciation Challenges...");
    for (const [key, data] of Object.entries((hindiLearningData as any).pronunciationChallenges)) {
        const d = data as any;
        const slug = `pronunciation-${key}`;
        const [existing] = await db.select().from(lessons).where(eq(lessons.slug, slug));
        if (existing) continue;

        let content = `# ${d.title}\n\n${d.description}\n\n`;
        d.words.forEach((w: any) => {
            content += `- **${w.word}**: ${w.hindi} (${w.tip})\n`;
        });

        const [lesson] = await db.insert(lessons).values({
            title: d.title,
            hindiTitle: d.title,
            slug,
            description: `Pronunciation challenge for Hindi speakers: ${d.title}`,
            hindiDescription: `हिंदी भाषियों के लिए उच्चारण चुनौती: ${d.title}`,
            content,
            difficulty: "Beginner",
            category: "Pronunciation",
            order: order++,
            emojiTheme: "🔊"
        }).returning();

        for (const w of d.words) {
            await db.insert(vocabulary).values({
                lessonId: lesson.id,
                word: w.word,
                definition: w.tip,
                hindiTranslation: w.hindi,
                example: `Common pronunciation challenge for ${d.title}`
            });
        }
        created++;
    }

    // 3. INTEGRATE ADVANCED VOCABULARY
    console.log("💎 Integrating Advanced Vocabulary...");
    for (const item of advancedVocabularyData) {
        const slug = `vocab-item-${item.english.toLowerCase()}`;
        const [existing] = await db.select().from(lessons).where(eq(lessons.slug, slug));
        if (existing) continue;

        let content = `# Word of the day: ${item.english}\n\n`;
        content += `**Meaning:** ${item.hindi}\n`;
        content += `**Pronunciation:** ${item.pronunciation}\n`;
        content += `**Part of Speech:** ${item.partOfSpeech}\n\n`;
        content += `### Examples:\n`;
        item.examples.forEach(ex => {
            content += `- ${ex.english} (*${ex.hindi}*)\n`;
        });

        const [lesson] = await db.insert(lessons).values({
            title: `Word: ${item.english}`,
            hindiTitle: `शब्द: ${item.hindi}`,
            slug,
            description: `Learn the word '${item.english}' and its usage.`,
            hindiDescription: `'${item.english}' शब्द और उसका उपयोग सीखें।`,
            content,
            difficulty: item.difficulty === "beginner" ? "Beginner" : (item.difficulty === "intermediate" ? "Intermediate" : "Advanced"),
            category: "Advanced Vocabulary",
            order: order++,
            emojiTheme: "🌟"
        }).returning();

        await db.insert(vocabulary).values({
            lessonId: lesson.id,
            word: item.english,
            definition: item.partOfSpeech,
            hindiTranslation: item.hindi,
            example: item.examples[0].english
        });
        created++;
    }

    console.log(`✅ Bridge complete! Integrated ${created} static items into DB.`);
    process.exit(0);
}

bridge().catch(console.error);
