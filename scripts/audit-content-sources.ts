import fs from 'fs';
import path from 'path';
import { db } from '../server/db';
import { lessons } from '../shared/schema';

// Helper to recursively find files
function findFiles(dir: string, pattern: RegExp, fileList: string[] = []) {
    if (!fs.existsSync(dir)) return fileList;

    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (!filePath.includes('node_modules') && !filePath.includes('.git')) {
                findFiles(filePath, pattern, fileList);
            }
        } else if (pattern.test(file)) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

// Function to extract potential titles or IDs from files
function analyzeFile(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const titleMatch = content.match(/title:\s*["']([^"']+)["']/i);
    const hindiTitleMatch = content.match(/hindiTitle:\s*["']([^"']+)["']/i);
    const lessonIdMatch = content.match(/lessonId\s*=\s*(\d+)/) || content.match(/id:\s*(\d+)/);

    return {
        file: filePath,
        suggestedTitle: titleMatch ? titleMatch[1] : null,
        suggestedHindiTitle: hindiTitleMatch ? hindiTitleMatch[1] : null,
        suggestedId: lessonIdMatch ? parseInt(lessonIdMatch[1]) : null
    };
}

async function audit() {
    console.log("🔍 Starting Comprehensive Content Audit...");

    // 1. Get Active Lessons
    const activeLessons = await db.select().from(lessons);
    const activeTitles = new Set(activeLessons.map(l => l.title.toLowerCase())); // Normalize for case-insensitive check
    const activeIds = new Set(activeLessons.map(l => l.id));

    console.log(`✅ Active Lessons in DB: ${activeLessons.length}`);

    // 2. Scan Sources
    const sourceDirs = [
        path.join(process.cwd(), 'script'),
        path.join(process.cwd(), 'scripts'),
        path.join(process.cwd(), 'ARCHIVE'),
        path.join(process.cwd(), 'archived_prep')
    ];

    const potentialLessons: any[] = [];

    for (const dir of sourceDirs) {
        console.log(`Scanning ${dir}...`);
        // Look for typescript/javascript seed/enrich/generate files
        const files = findFiles(dir, /(seed|enrich|generate|lesson).*\.(ts|js|json)$/i);

        for (const file of files) {
            // Skip some obvious non-content files
            if (file.includes('schema') || file.includes('test')) continue;

            const info = analyzeFile(file);
            if (info.suggestedTitle) {
                potentialLessons.push(info);
            }
        }
    }

    // 3. Compare and Report
    console.log(`\n📊 Audit Results:`);
    console.log(`Found ${potentialLessons.length} potential lesson sources.`);

    const missingLessons = potentialLessons.filter(l =>
        l.suggestedTitle && !activeTitles.has(l.suggestedTitle.toLowerCase())
    );

    const missingIds = potentialLessons.filter(l =>
        l.suggestedId && !activeIds.has(l.suggestedId)
    );

    console.log(`\n🚩 POTENTIALLY MISSING CONTENT (${missingLessons.length} files):`);

    if (missingLessons.length > 0) {
        missingLessons.forEach(l => {
            console.log(`   - [${l.suggestedId || '?'}] "${l.suggestedTitle}" (Found in: ${path.relative(process.cwd(), l.file)})`);
        });
    } else {
        console.log("   Great news! All scanned lesson titles seem to be present in the database.");
    }

    // Specific check for Unique "Uncle Ji" content
    const uncleJiLesson = potentialLessons.find(l => l.file.includes('seedLesson5871.ts'));
    if (uncleJiLesson) {
        console.log(`\n🧐 Special Check: seedLesson5871.ts (Uncle Ji)`);
        // Check if 5871 exists in DB
        const dbLesson = activeLessons.find(l => l.id === 5871);
        if (dbLesson) {
            console.log(`   ID 5871 exists in DB as: "${dbLesson.title}"`);
            if (dbLesson.title !== "Introduction & Greetings") {
                console.log(`   ⚠️ CONTENT MISMATCH: Script has "Introduction & Greetings" but DB has "${dbLesson.title}"`);
            } else {
                console.log(`   ✅ DB Content matches Script Title.`);
            }
        } else {
            console.log(`   ❌ ID 5871 is MISSING from DB.`);
        }
    }

    // Generate Restoration Plan
    if (missingLessons.length > 0) {
        console.log(`\n💡 Recommendation: Run a restoration script to ingest these files.`);
        fs.writeFileSync('audit-missing-content.json', JSON.stringify(missingLessons, null, 2));
        console.log(`   Saved detailed missing list to 'audit-missing-content.json'`);
    }
}

audit().catch(console.error);
