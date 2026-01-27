import Database from 'better-sqlite3';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '..', 'preet_english.db');
const db = new Database(dbPath);

async function verifyGrade9() {
    console.log('🧐 Verifying Grade 9+ Launch Readiness...\n');
    const lessons = db.prepare('SELECT id, title, content FROM lessons ORDER BY id LIMIT 10').all() as any[];

    let allPassed = true;

    for (const lesson of lessons) {
        console.log(`Checking Lesson ${lesson.id}: ${lesson.title}`);

        try {
            const parsed = JSON.parse(lesson.content);
            const blocks = parsed.blocks || [];

            const vocabBlocks = blocks.filter((b: any) => b.type === 'vocabulary' || (b.type === 'text' && b.content.toLowerCase().includes('vocabulary')));
            const exerciseBlocks = blocks.filter((b: any) => ['quiz', 'speaking', 'translation'].includes(b.type));
            const culturalBlocks = blocks.filter((b: any) => b.type === 'cultural_note');

            console.log(` - Blocks found: ${blocks.length}`);
            console.log(` - Exercises: ${exerciseBlocks.length}`);
            console.log(` - Cultural Notes: ${culturalBlocks.length}`);

            if (blocks.length < 5) {
                console.warn(' ⚠️  Low block count!');
                allPassed = false;
            }
            if (exerciseBlocks.length < 2) {
                console.warn(' ⚠️  Few exercises!');
                // No hard fail here but warn
            }
            if (culturalBlocks.length === 0) {
                console.warn(' ⚠️  No cultural note!');
                allPassed = false;
            }

        } catch (e) {
            console.error(' ❌ FAILED: Content is not a valid JSON block system!');
            allPassed = false;
        }
    }

    if (allPassed) {
        console.log('\n✅ ALL SYSTEMS GO. Grade 9+ standards met for core curriculum.');
        process.exit(0);
    } else {
        console.log('\n❌ FAILED. Some lessons do not meet the strict Grade 9 requirements.');
        process.exit(1);
    }
}

verifyGrade9();
