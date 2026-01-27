
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import Database from "better-sqlite3";
import * as pgSchema from "../shared/schema-postgres";
import { users, lessons, vocabulary, conversationLines, progress, userStats, scenarios, stories, listenings, speakingTopics, activityFeed, contentRatings } from "../shared/schema";
import { config } from "dotenv";
import { eq } from "drizzle-orm";

// Load environment variables
config();

async function migrate() {
    console.log("🚀 Starting database migration from SQLite to PostgreSQL...");

    // SQLite connection
    const sqliteDbPath = "preet_english.db"; // Assumed default
    console.log(`📂 Connecting to SQLite database at: ${sqliteDbPath}`);
    const sqlite = new Database(sqliteDbPath);

    // PostgreSQL connection
    const pgUrl = process.env.DATABASE_URL;
    if (!pgUrl) {
        throw new Error("❌ DATABASE_URL is missing in .env");
    }
    console.log(`🐘 Connecting to PostgreSQL...`);
    const client = postgres(pgUrl);
    const pgDb = drizzle(client, { schema: pgSchema });

    try {
        // 1. Migrate Users
        console.log("migrating users...");
        const sqliteUsers = sqlite.prepare("SELECT * FROM users").all() as any[];
        if (sqliteUsers.length > 0) {
            await pgDb.insert(pgSchema.users).values(
                sqliteUsers.map(u => ({
                    username: u.username,
                    password: u.password,
                    isAdmin: Boolean(u.is_admin),
                    // id will be auto-generated or can be preserved if needed explicitly, 
                    // but usually better to let serial handle it unless relations depend on exact IDs.
                    // For simplicity and relational integrity, we will TRY to preserve IDs if possible or rely on order.
                    // Drizzle insert with specified ID might work depending on PG config. 
                    // Let's assume we map fields directly.
                    createdAt: new Date(),
                }))
            ).onConflictDoNothing(); // Prevent duplicates if running multiple times
        }
        console.log(`✅ Migrated ${sqliteUsers.length} users.`);

        // 2. Migrate Lessons
        console.log("migrating lessons...");
        const sqliteLessons = sqlite.prepare("SELECT * FROM lessons").all() as any[];
        if (sqliteLessons.length > 0) {
            // We need to map SQLite columns to Postgres columns carefully
            await pgDb.insert(pgSchema.lessons).values(
                sqliteLessons.map(l => ({
                    id: l.id, // Preserve ID for relations
                    title: l.title,
                    slug: l.slug,
                    description: l.description,
                    content: l.content,
                    difficulty: l.difficulty,
                    order: l.order,
                    imageUrl: l.image_url,
                    emojiTheme: l.emoji_theme,
                    hindiTitle: l.hindi_title,
                    hindiDescription: l.hindi_description,
                    category: l.category,
                    createdAt: new Date(),
                }))
            ).onConflictDoNothing();
        }
        console.log(`✅ Migrated ${sqliteLessons.length} lessons.`);

        // 3. Migrate Vocabulary (Dependent on Lessons)
        console.log("migrating vocabulary...");
        const sqliteVocab = sqlite.prepare("SELECT * FROM vocabulary").all() as any[];
        if (sqliteVocab.length > 0) {
            await pgDb.insert(pgSchema.vocabulary).values(
                sqliteVocab.map(v => ({
                    lessonId: v.lesson_id,
                    word: v.word,
                    pronunciation: v.pronunciation,
                    definition: v.definition,
                    example: v.example,
                    hindiTranslation: v.hindi_translation,
                    hindiPronunciation: v.hindi_pronunciation,
                    exampleHindi: v.example_hindi,
                    usageHindi: v.usage_hindi,
                    audioUrl: v.audio_url,
                    createdAt: new Date(),
                }))
            ).onConflictDoNothing();
        }
        console.log(`✅ Migrated ${sqliteVocab.length} vocabulary items.`);

        // 4. Migrate Conversation Lines (Dependent on Lessons)
        console.log("migrating conversation lines...");
        const sqliteLines = sqlite.prepare("SELECT * FROM conversation_lines").all() as any[];
        if (sqliteLines.length > 0) {
            await pgDb.insert(pgSchema.conversationLines).values(
                sqliteLines.map(l => ({
                    lessonId: l.lesson_id,
                    speaker: l.speaker,
                    englishText: l.english_text,
                    hindiText: l.hindi_text,
                    emoji: l.emoji,
                    lineOrder: l.line_order,
                    createdAt: new Date(),
                }))
            ).onConflictDoNothing();
        }
        console.log(`✅ Migrated ${sqliteLines.length} conversation lines.`);

        // 5. Migrate Scenarios
        console.log("migrating scenarios...");
        const sqliteScenarios = sqlite.prepare("SELECT * FROM scenarios").all() as any[];
        if (sqliteScenarios.length > 0) {
            await pgDb.insert(pgSchema.scenarios).values(
                sqliteScenarios.map(s => ({
                    id: s.id,
                    title: s.title,
                    titleHindi: s.title_hindi,
                    description: s.description || "", // Handle potentially null description if schema allows but data is missing
                    descriptionHindi: s.description_hindi,
                    yourRole: s.your_role,
                    yourRoleHindi: s.your_role_hindi,
                    partnerRole: s.partner_role,
                    partnerRoleHindi: s.partner_role_hindi,
                    category: s.category,
                    difficulty: s.difficulty,
                    dialogues: JSON.parse(s.dialogues), // SQLite likely stores JSON as string
                    tips: s.tips ? JSON.parse(s.tips) : null,
                    xpReward: s.xp_reward,
                    createdAt: new Date(),
                }))
            ).onConflictDoNothing();
        }
        console.log(`✅ Migrated ${sqliteScenarios.length} scenarios.`);


        console.log("🎉 Migration completed successfully!");
    } catch (error) {
        console.error("❌ Migration failed:", error);
    } finally {
        sqlite.close();
        await client.end();
    }
}

migrate();
