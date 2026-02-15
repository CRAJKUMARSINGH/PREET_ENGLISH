import { db } from "../server/db";
import { lessons, vocabulary, quizzes, stories, scenarios, speakingTopics } from "../shared/schema";
import { sql } from "drizzle-orm";

interface ContentInventory {
    tableName: string;
    count: number;
    sampleIds: number[];
    checksum: string;
}

async function verifyContentIntegrity(): Promise<void> {
    console.log("🔍 CONTENT INTEGRITY VERIFICATION");
    console.log("=".repeat(60));
    console.log(`Timestamp: ${new Date().toISOString()}\n`);

    const inventory: ContentInventory[] = [];

    // Check Lessons
    const lessonCount = await db.select({ count: sql<number>`count(*)` }).from(lessons);
    const sampleLessons = await db.select({ id: lessons.id }).from(lessons).limit(5);
    inventory.push({
        tableName: "lessons",
        count: lessonCount[0].count,
        sampleIds: sampleLessons.map(l => l.id),
        checksum: Buffer.from(JSON.stringify(sampleLessons)).toString('base64').slice(0, 16)
    });

    // Check Vocabulary
    const vocabCount = await db.select({ count: sql<number>`count(*)` }).from(vocabulary);
    const sampleVocab = await db.select({ id: vocabulary.id }).from(vocabulary).limit(5);
    inventory.push({
        tableName: "vocabulary",
        count: vocabCount[0].count,
        sampleIds: sampleVocab.map(v => v.id),
        checksum: Buffer.from(JSON.stringify(sampleVocab)).toString('base64').slice(0, 16)
    });

    // Check Quizzes
    const quizCount = await db.select({ count: sql<number>`count(*)` }).from(quizzes);
    const sampleQuizzes = await db.select({ id: quizzes.id }).from(quizzes).limit(5);
    inventory.push({
        tableName: "quizzes",
        count: quizCount[0].count,
        sampleIds: sampleQuizzes.map(q => q.id),
        checksum: Buffer.from(JSON.stringify(sampleQuizzes)).toString('base64').slice(0, 16)
    });

    // Check Stories
    const storyCount = await db.select({ count: sql<number>`count(*)` }).from(stories);
    const sampleStories = await db.select({ id: stories.id }).from(stories).limit(5);
    inventory.push({
        tableName: "stories",
        count: storyCount[0].count,
        sampleIds: sampleStories.map(s => s.id),
        checksum: Buffer.from(JSON.stringify(sampleStories)).toString('base64').slice(0, 16)
    });

    // Check Scenarios
    const scenarioCount = await db.select({ count: sql<number>`count(*)` }).from(scenarios);
    const sampleScenarios = await db.select({ id: scenarios.id }).from(scenarios).limit(5);
    inventory.push({
        tableName: "scenarios",
        count: scenarioCount[0].count,
        sampleIds: sampleScenarios.map(s => s.id),
        checksum: Buffer.from(JSON.stringify(sampleScenarios)).toString('base64').slice(0, 16)
    });

    // Check Speaking Topics
    const topicCount = await db.select({ count: sql<number>`count(*)` }).from(speakingTopics);
    const sampleTopics = await db.select({ id: speakingTopics.id }).from(speakingTopics).limit(5);
    inventory.push({
        tableName: "speaking_topics",
        count: topicCount[0].count,
        sampleIds: sampleTopics.map(t => t.id),
        checksum: Buffer.from(JSON.stringify(sampleTopics)).toString('base64').slice(0, 16)
    });

    // Display Results
    console.log("📊 CONTENT INVENTORY:");
    console.log("-".repeat(60));

    let totalContent = 0;
    inventory.forEach(item => {
        console.log(`\n${item.tableName.toUpperCase()}`);
        console.log(`  Count: ${item.count}`);
        console.log(`  Sample IDs: [${item.sampleIds.join(', ')}]`);
        console.log(`  Checksum: ${item.checksum}`);
        totalContent += item.count;
    });

    console.log("\n" + "=".repeat(60));
    console.log(`📦 TOTAL CONTENT ITEMS: ${totalContent}`);
    console.log("=".repeat(60));

    // Save inventory to file for comparison
    const fs = await import('fs/promises');
    const inventoryPath = '.agent/artifacts/content-inventory.json';
    await fs.writeFile(
        inventoryPath,
        JSON.stringify({
            timestamp: new Date().toISOString(),
            inventory,
            totalCount: totalContent
        }, null, 2)
    );

    console.log(`\n✅ Inventory saved to: ${inventoryPath}`);
    console.log("\n💡 Run this script again after code changes to verify integrity.");
}

verifyContentIntegrity().catch(console.error);
