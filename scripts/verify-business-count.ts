
import { db } from "../server/db";
import { lessons } from "@shared/schema";
import { eq } from "drizzle-orm";

async function verify() {
    const business = await db.select().from(lessons).where(eq(lessons.category, "Business"));
    console.log(`Total Business Lessons: ${business.length}`);
    process.exit(0);
}

verify();
