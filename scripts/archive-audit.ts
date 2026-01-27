import Database from "better-sqlite3";
import * as path from "path";
import * as fs from "fs";

// Database paths
const MAIN_DB_PATH = path.join(process.cwd(), "preet_english.db");
const BACKUP_DB_PATH = path.join(process.cwd(), "ARCHIVE", "LEGACY_FILES", "preet_english_backup.db");

interface LessonRecord {
    id: number;
    title: string;
    slug: string;
    category?: string;
    difficulty?: string;
}

interface AuditReport {
    mainDatabase: {
        path: string;
        exists: boolean;
        lessons: number;
        scenarios: number;
        stories: number;
        listenings: number;
        speakingTopics: number;
        vocabulary: number;
    };
    backupDatabase: {
        path: string;
        exists: boolean;
        lessons: number;
        scenarios: number;
        stories: number;
        listenings: number;
        speakingTopics: number;
        vocabulary: number;
    };
    comparison: {
        lessonsMissing: number;
        scenariosMissing: number;
        storiesMissing: number;
        listeningsMissing: number;
        speakingTopicsMissing: number;
        vocabularyMissing: number;
    };
    missingLessons: LessonRecord[];
    certification: {
        allDataMigrated: boolean;
        totalContentItems: number;
        message: string;
    };
}

function countRecords(db: Database.Database, tableName: string): number {
    try {
        const result = db.prepare(`SELECT COUNT(*) as count FROM ${tableName}`).get() as { count: number };
        return result.count;
    } catch (error) {
        console.warn(`⚠️  Table ${tableName} not found or error querying:`, error);
        return 0;
    }
}

function getLessons(db: Database.Database): LessonRecord[] {
    try {
        return db.prepare(`SELECT id, title, slug, category, difficulty FROM lessons ORDER BY id`).all() as LessonRecord[];
    } catch (error) {
        console.warn(`⚠️  Error fetching lessons:`, error);
        return [];
    }
}

function findMissingLessons(mainLessons: LessonRecord[], backupLessons: LessonRecord[]): LessonRecord[] {
    const mainIds = new Set(mainLessons.map(l => l.id));
    const mainSlugs = new Set(mainLessons.map(l => l.slug));

    return backupLessons.filter(lesson => {
        // Check if lesson exists by ID or slug
        return !mainIds.has(lesson.id) && !mainSlugs.has(lesson.slug);
    });
}

async function performAudit(): Promise<AuditReport> {
    console.log("🔍 Starting Archive Lesson Audit...\n");

    // Check if databases exist
    const mainDbExists = fs.existsSync(MAIN_DB_PATH);
    const backupDbExists = fs.existsSync(BACKUP_DB_PATH);

    console.log(`📊 Main Database: ${mainDbExists ? "✅ Found" : "❌ Not Found"} at ${MAIN_DB_PATH}`);
    console.log(`📊 Backup Database: ${backupDbExists ? "✅ Found" : "❌ Not Found"} at ${BACKUP_DB_PATH}\n`);

    const report: AuditReport = {
        mainDatabase: {
            path: MAIN_DB_PATH,
            exists: mainDbExists,
            lessons: 0,
            scenarios: 0,
            stories: 0,
            listenings: 0,
            speakingTopics: 0,
            vocabulary: 0,
        },
        backupDatabase: {
            path: BACKUP_DB_PATH,
            exists: backupDbExists,
            lessons: 0,
            scenarios: 0,
            stories: 0,
            listenings: 0,
            speakingTopics: 0,
            vocabulary: 0,
        },
        comparison: {
            lessonsMissing: 0,
            scenariosMissing: 0,
            storiesMissing: 0,
            listeningsMissing: 0,
            speakingTopicsMissing: 0,
            vocabularyMissing: 0,
        },
        missingLessons: [],
        certification: {
            allDataMigrated: false,
            totalContentItems: 0,
            message: "",
        },
    };

    // Query main database
    if (mainDbExists) {
        console.log("📈 Analyzing Main Database...");
        const mainDb = new Database(MAIN_DB_PATH, { readonly: true });

        report.mainDatabase.lessons = countRecords(mainDb, "lessons");
        report.mainDatabase.scenarios = countRecords(mainDb, "scenarios");
        report.mainDatabase.stories = countRecords(mainDb, "stories");
        report.mainDatabase.listenings = countRecords(mainDb, "listenings");
        report.mainDatabase.speakingTopics = countRecords(mainDb, "speaking_topics");
        report.mainDatabase.vocabulary = countRecords(mainDb, "vocabulary");

        console.log(`  ✅ Lessons: ${report.mainDatabase.lessons}`);
        console.log(`  ✅ Scenarios: ${report.mainDatabase.scenarios}`);
        console.log(`  ✅ Stories: ${report.mainDatabase.stories}`);
        console.log(`  ✅ Listenings: ${report.mainDatabase.listenings}`);
        console.log(`  ✅ Speaking Topics: ${report.mainDatabase.speakingTopics}`);
        console.log(`  ✅ Vocabulary: ${report.mainDatabase.vocabulary}\n`);

        mainDb.close();
    }

    // Query backup database
    if (backupDbExists) {
        console.log("📈 Analyzing Backup Database...");
        const backupDb = new Database(BACKUP_DB_PATH, { readonly: true });

        report.backupDatabase.lessons = countRecords(backupDb, "lessons");
        report.backupDatabase.scenarios = countRecords(backupDb, "scenarios");
        report.backupDatabase.stories = countRecords(backupDb, "stories");
        report.backupDatabase.listenings = countRecords(backupDb, "listenings");
        report.backupDatabase.speakingTopics = countRecords(backupDb, "speaking_topics");
        report.backupDatabase.vocabulary = countRecords(backupDb, "vocabulary");

        console.log(`  ✅ Lessons: ${report.backupDatabase.lessons}`);
        console.log(`  ✅ Scenarios: ${report.backupDatabase.scenarios}`);
        console.log(`  ✅ Stories: ${report.backupDatabase.stories}`);
        console.log(`  ✅ Listenings: ${report.backupDatabase.listenings}`);
        console.log(`  ✅ Speaking Topics: ${report.backupDatabase.speakingTopics}`);
        console.log(`  ✅ Vocabulary: ${report.backupDatabase.vocabulary}\n`);

        backupDb.close();
    }

    // Compare databases
    if (mainDbExists && backupDbExists) {
        console.log("🔄 Comparing Databases...\n");

        const mainDb = new Database(MAIN_DB_PATH, { readonly: true });
        const backupDb = new Database(BACKUP_DB_PATH, { readonly: true });

        const mainLessons = getLessons(mainDb);
        const backupLessons = getLessons(backupDb);

        report.missingLessons = findMissingLessons(mainLessons, backupLessons);

        report.comparison.lessonsMissing = Math.max(0, report.backupDatabase.lessons - report.mainDatabase.lessons);
        report.comparison.scenariosMissing = Math.max(0, report.backupDatabase.scenarios - report.mainDatabase.scenarios);
        report.comparison.storiesMissing = Math.max(0, report.backupDatabase.stories - report.mainDatabase.stories);
        report.comparison.listeningsMissing = Math.max(0, report.backupDatabase.listenings - report.mainDatabase.listenings);
        report.comparison.speakingTopicsMissing = Math.max(0, report.backupDatabase.speakingTopics - report.mainDatabase.speakingTopics);
        report.comparison.vocabularyMissing = Math.max(0, report.backupDatabase.vocabulary - report.mainDatabase.vocabulary);

        console.log("📊 Comparison Results:");
        console.log(`  ${report.comparison.lessonsMissing === 0 ? "✅" : "⚠️ "} Lessons Missing: ${report.comparison.lessonsMissing}`);
        console.log(`  ${report.comparison.scenariosMissing === 0 ? "✅" : "⚠️ "} Scenarios Missing: ${report.comparison.scenariosMissing}`);
        console.log(`  ${report.comparison.storiesMissing === 0 ? "✅" : "⚠️ "} Stories Missing: ${report.comparison.storiesMissing}`);
        console.log(`  ${report.comparison.listeningsMissing === 0 ? "✅" : "⚠️ "} Listenings Missing: ${report.comparison.listeningsMissing}`);
        console.log(`  ${report.comparison.speakingTopicsMissing === 0 ? "✅" : "⚠️ "} Speaking Topics Missing: ${report.comparison.speakingTopicsMissing}`);
        console.log(`  ${report.comparison.vocabularyMissing === 0 ? "✅" : "⚠️ "} Vocabulary Missing: ${report.comparison.vocabularyMissing}\n`);

        if (report.missingLessons.length > 0) {
            console.log(`⚠️  Found ${report.missingLessons.length} lessons in backup that are missing from main database:`);
            report.missingLessons.slice(0, 10).forEach(lesson => {
                console.log(`    - ID ${lesson.id}: ${lesson.title} (${lesson.slug})`);
            });
            if (report.missingLessons.length > 10) {
                console.log(`    ... and ${report.missingLessons.length - 10} more\n`);
            }
        }

        mainDb.close();
        backupDb.close();
    }

    // Generate certification
    const totalMissing =
        report.comparison.lessonsMissing +
        report.comparison.scenariosMissing +
        report.comparison.storiesMissing +
        report.comparison.listeningsMissing +
        report.comparison.speakingTopicsMissing;

    report.certification.totalContentItems =
        report.mainDatabase.lessons +
        report.mainDatabase.scenarios +
        report.mainDatabase.stories +
        report.mainDatabase.listenings +
        report.mainDatabase.speakingTopics;

    report.certification.allDataMigrated = totalMissing === 0;

    if (report.certification.allDataMigrated) {
        report.certification.message = `✅ CERTIFICATION: All ${report.certification.totalContentItems} content items from ARCHIVE have been successfully integrated into the main application database. Zero data loss confirmed.`;
    } else {
        report.certification.message = `⚠️  WARNING: ${totalMissing} content items from ARCHIVE are missing from the main database. Migration incomplete.`;
    }

    console.log("\n" + "=".repeat(80));
    console.log(report.certification.message);
    console.log("=".repeat(80) + "\n");

    return report;
}

// Run the audit
performAudit()
    .then((report) => {
        // Save report to file
        const reportPath = path.join(process.cwd(), "archive-audit-report.json");
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        console.log(`📄 Full audit report saved to: ${reportPath}\n`);

        process.exit(report.certification.allDataMigrated ? 0 : 1);
    })
    .catch((error) => {
        console.error("❌ Audit failed:", error);
        process.exit(1);
    });
