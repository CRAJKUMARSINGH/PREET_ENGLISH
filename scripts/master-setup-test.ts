
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const dbFile = "sqlite.db";

try {
    console.log("💣 STARTING NUCLEAR RESET");

    // 1. Delete DB
    if (fs.existsSync(dbFile)) {
        console.log(`Deleting ${dbFile}...`);
        fs.unlinkSync(dbFile);
    }

    // 2. DB Push
    console.log("📦 Pushing Drizzle Schema...");
    execSync("npx cross-env DATABASE_URL=file:sqlite.db npm run db:push", { stdio: "inherit" });

    // 3. Migrate Content
    console.log("🚚 Migrating Content...");
    execSync("npx tsx scripts/migrate_all_content_inline.ts", { stdio: "inherit" });

    // 4. Seed 5871
    console.log("🌱 Seeding Lesson 5871...");
    execSync("npx tsx script/seedLesson5871.ts", { stdio: "inherit" });

    // 5. Verify Setup
    console.log("🔍 Verifying Setup...");
    execSync("npx cross-env DATABASE_URL=file:sqlite.db npx tsx scripts/debug-verify.ts", { stdio: "inherit" });

    // 6. Run Test
    console.log("🚀 Launching Chandrayan Test...");
    execSync("npx cross-env DATABASE_URL=file:sqlite.db npx tsx scripts/chandrayan-precision-test.ts", { stdio: "inherit" });

    // 7. Verify Test
    console.log("📊 Verifying Test Results...");
    execSync("npx cross-env DATABASE_URL=file:sqlite.db npx tsx scripts/verify-test.ts", { stdio: "inherit" });

    console.log("✅ SEQUENCE COMPLETE");

} catch (error) {
    console.error("❌ SEQUENCE FAILED", error);
    process.exit(1);
}
