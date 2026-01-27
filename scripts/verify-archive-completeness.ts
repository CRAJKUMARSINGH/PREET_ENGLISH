
/**
 * DEEP ARCHIVE AUDIT & CERTIFICATION SCRIPT
 * 
 * This script recursively scans the ARCHIVE for known content definition files,
 * extracts content identifiers (Titles), and verifies their presence in the main database.
 */

import Database from 'better-sqlite3';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const dbPath = (process.env.DATABASE_URL || 'preet_english.db').replace('file:', '');
const db = new Database(dbPath);

// Configuration: Map of Archive Files to Target DB Tables and Types
const AUDIT_TARGETS = [
    // SCENARIOS
    {
        path: 'ARCHIVE/OLD_PROJECTS/scripts/seed-scenarios.ts',
        type: 'Scenario',
        table: 'scenarios',
        titleField: 'title',
        regex: /title:\s*['"]((?:\\.|[^'"])+)['"] /g
    },
    // STORIES
    {
        path: 'ARCHIVE/OLD_PROJECTS/scripts/seed-stories.ts',
        type: 'Story',
        table: 'stories',
        titleField: 'title',
        regex: /title:\s*["']([^"']+)["']/g
    },
    {
        path: 'ARCHIVE/OLD_PROJECTS/scripts/seed-stories-batch2.ts',
        type: 'Story',
        table: 'stories',
        titleField: 'title',
        regex: /title:\s*["']([^"']+)["']/g
    },
    // LISTENINGS
    {
        path: 'ARCHIVE/OLD_PROJECTS/scripts/seed-listenings.ts',
        type: 'Listening',
        table: 'listening_exercises',
        titleField: 'title',
        regex: /title:\s*["']([^"']+)["']/g
    },
    {
        path: 'ARCHIVE/OLD_PROJECTS/scripts/seed-listenings-batch2.ts',
        type: 'Listening',
        table: 'listening_exercises',
        titleField: 'title',
        regex: /title:\s*["']([^"']+)["']/g
    },
    // LESSONS - ELITE
    {
        path: 'ARCHIVE/OLD_PROJECTS/scripts/inject-elite-lessons.ts',
        type: 'Lesson',
        table: 'lessons',
        titleField: 'title',
        regex: /title:\s*["']([^"']+)["']/g
    },
    // LESSONS - BATCH 3
    {
        path: 'ARCHIVE/OLD_PROJECTS/scripts/generate-batch3-lessons.ts',
        type: 'Lesson',
        table: 'lessons',
        titleField: 'title',
        regex: /title:\s*["']([^"']+)["']/g
    },
    // LESSONS - FINAL BATCH
    {
        path: 'ARCHIVE/OLD_PROJECTS/scripts/generate-final-batch.ts',
        type: 'Lesson',
        table: 'lessons',
        titleField: 'title',
        regex: /title:\s*["']([^"']+)["']/g
    },
    // LESSONS - UNCLE JI
    {
        path: 'ARCHIVE/OLD_PROJECTS/scripts/restore-uncle-ji.ts',
        type: 'Lesson',
        table: 'lessons',
        titleField: 'title',
        regex: /title:\s*["']([^"']+)["']/g
    }
];

// Special check for enriched lessons (ID based)
const ENRICHED_LESSONS = [5871, 5872, 5873, 5874, 5875];

async function verifyArchive() {
    console.log('🔍 STARTING DEEP ARCHIVE AUDIT...\n');
    let totalArchived = 0;
    let totalMissing = 0;
    let missingItems: string[] = [];

    // 1. Verify Content from Files
    for (const target of AUDIT_TARGETS) {
        const fullPath = path.resolve(process.cwd(), target.path);

        if (!fs.existsSync(fullPath)) {
            console.log(`⚠️  File not found (skipping): ${target.path}`);
            continue;
        }

        const content = fs.readFileSync(fullPath, 'utf8');
        let match;
        const itemsInFile = new Set<string>();

        // Extract titles using regex
        while ((match = target.regex.exec(content)) !== null) {
            if (match[1] && match[1].length > 2) {
                // Unescape any escaped characters (e.g., \\' -> ') before adding
                const unescaped = match[1].replace(/\\\\/g, '\\').replace(/\\'/g, "'").replace(/\\"/g, '"');
                itemsInFile.add(unescaped);
            }
        }

        console.log(`📄 Scanning ${path.basename(target.path)} (${target.type})... Found ${itemsInFile.size} items.`);

        // Verify against DB
        for (const title of itemsInFile) {
            totalArchived++;
            try {
                // Use LIKE for case-insensitive/loose matching
                const stmt = db.prepare(`SELECT id FROM ${target.table} WHERE ${target.titleField} LIKE ?`);
                const result = stmt.get(title); // Exact match first

                if (!result) {
                    // Try partial match if exact fails (e.g. quote differences)
                    const fuzzy = stmt.get(`%${title}%`);
                    if (!fuzzy) {
                        console.log(`   ❌ MISSING: "${title}"`);
                        missingItems.push(`[${target.type}] ${title} (Source: ${path.basename(target.path)})`);
                        totalMissing++;
                    }
                }
            } catch (err) {
                console.error(`Error checking ${title}:`, err);
            }
        }
    }

    // 2. Verify Enriched Lessons
    console.log('\n🔍 Verifying Enriched Lessons (Content Check)...');
    for (const id of ENRICHED_LESSONS) {
        const stmt = db.prepare('SELECT content FROM lessons WHERE id = ?');
        const lesson = stmt.get(id) as { content: string };

        if (lesson && lesson.content && lesson.content.length > 100) {
            // Basic heuristic: Enriched content should be substantial
            console.log(`   ✅ Lesson ${id} has content (${lesson.content.length} bytes)`);
        } else {
            console.log(`   ❌ Lesson ${id} appears invalid or missing content.`);
            missingItems.push(`[Lesson] ID ${id} (Enriched Content Missing)`);
            totalMissing++;
        }
    }

    // Report
    console.log('\n===========================================');
    console.log('AUDIT REPORT SUMMARY');
    console.log('===========================================');
    console.log(`Total Archived Items Scanned: ${totalArchived}`);
    console.log(`Total Database Matches:       ${totalArchived - totalMissing}`);
    console.log(`Total MISSING Items:          ${totalMissing}`);

    if (totalMissing === 0) {
        console.log('\n✅ CERTIFICATION: 100% of scanned ARCHIVE content is present in the database.');
    } else {
        console.log('\n❌ CERTIFICATION FAILED. The following items are missing:');
        missingItems.forEach(i => console.log(`   - ${i}`));
        process.exit(1);
    }
}

verifyArchive();
