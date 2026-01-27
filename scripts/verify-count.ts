
import { db } from "../server/db";
import { lessons } from "@shared/schema";

async function verify() {
    const all = await db.select().from(lessons);
    console.log(`Total Lessons in Database: ${all.length}`);
    process.exit(0);
}

verify();
