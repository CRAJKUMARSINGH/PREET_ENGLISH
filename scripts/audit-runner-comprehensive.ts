
import { db } from "../server/db";
import { lessons, vocabulary, conversationLines } from "../shared/schema";
import { eq } from "drizzle-orm";
import { AuditPhase } from "./audit-phase";
import * as fs from 'fs';
import * as path from 'path';

// Define the Lesson interface again here to match what audit-phase expects
// This avoids circular dependency issues if we tried to import it from audit-phase locally
interface Lesson {
    id: number;
    title: string;
    slug: string;
    description: string;
    content: string;
    difficulty: string;
    order: number;
    imageUrl: string | null;
    emojiTheme: string | null;
    hindiTitle: string | null;
    hindiDescription: string | null;
    category: string;
}

async function runComprehensiveAudit() {
    console.log("🚀 Starting Comprehensive 'Grade 9' Audit Runner (Raw Mode)...");

    const auditor = new AuditPhase();
    const summary = await auditor.performAudit();

    // Calculate detailed stats
    const totalLessons = summary.results.filter((r: any) => r.type === 'lesson').length;
    const passedLessons = summary.results.filter((r: any) => r.type === 'lesson' && r.status === 'pass').length;
    const failedLessons = summary.results.filter((r: any) => r.type === 'lesson' && r.status === 'fail').length;
    const warningLessons = summary.results.filter((r: any) => r.type === 'lesson' && r.status === 'warning').length;


    const qualityScore = summary.qualityScore || 0;

    const report = `# 📊 Comprehensive Audit Report (Target: Grade 9)
Generated at: ${new Date().toLocaleString()}

## 📈 Executive Summary
- **Overall Quality Grade**: ${qualityScore.toFixed(1)}/10
- **Total Lessons**: ${totalLessons}
- **Pass Rate**: ${((passedLessons / totalLessons) * 100).toFixed(1)}%
- **Failures**: ${failedLessons} (Critical)
- **Warnings**: ${warningLessons} (Needs Improvement)

## 🚨 Critical Failures (Action Required)
${summary.results
            .filter((r: any) => r.status === 'fail')
            .map((r: any) => `- **[${r.type.toUpperCase()}] ${r.id}**: ${r.issues.join(', ')}`)
            .slice(0, 50)
            .join('\n') || "No critical failures found!"}
${summary.results.filter((r: any) => r.status === 'fail').length > 50 ? `\n...and ${summary.results.filter((r: any) => r.status === 'fail').length - 50} more.` : ''}

## ⚠️ Warnings (To Enrich)
${summary.results
            .filter((r: any) => r.status === 'warning')
            .map((r: any) => `- **[${r.type.toUpperCase()}] ${r.id}**: ${r.issues.join(', ')}`)
            .slice(0, 50) // Limit to 50 items to keep report readable
            .join('\n')}
${summary.results.filter((r: any) => r.status === 'warning').length > 50 ? `\n...and ${summary.results.filter((r: any) => r.status === 'warning').length - 50} more.` : ''}

## 💡 Improvements Suggestions
- Improve cultural sensitivity in ${summary.results.filter((r: any) => r.issues.some((i: string) => i.includes('cultural'))).length} items.
- Add audio to ${summary.results.filter((r: any) => r.type === 'vocabulary' && !r.score).length} vocabulary words (check done separately).

`;

    const reportPath = path.resolve(process.cwd(), 'AUDIT_REPORT_FULL.md');
    fs.writeFileSync(reportPath, report);

    // EXPORT FAILED IDs for Mass Enrichment
    const failedIds = summary.results
        .filter((r: any) => r.type === 'lesson' && (r.status === 'fail' || r.status === 'warning'))
        .map((r: any) => parseInt(r.id.replace('lesson-', '')));


    const jsonPath = path.resolve(process.cwd(), 'failed_lessons.json');
    fs.writeFileSync(jsonPath, JSON.stringify(failedIds, null, 2));

    console.log(`\n📄 Report generated at: ${reportPath}`);
    console.log(`\n📄 Failed IDs saved to: ${jsonPath} (Count: ${failedIds.length})`);
    console.log(`\nFinal Verdict: ${qualityScore >= 9.0 ? '✅ READY FOR LAUNCH' : '🚧 NEEDS ENRICHMENT'}`);

    if (qualityScore < 9.0) {
        console.log("Recommended Action: Run mass-enrichment script on failed/warning items.");
        process.exit(1); // Exit with error code to signal CI/CD pipeline
    }
}

// ESM compatible execution check
import { fileURLToPath } from 'url';

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    runComprehensiveAudit().catch(err => {
        console.error("Audit failed:", err);
        process.exit(1);
    });
}
