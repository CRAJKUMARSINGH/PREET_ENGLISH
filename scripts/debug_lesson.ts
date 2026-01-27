
import { db } from "../server/db";
import { lessons } from "../shared/schema";
import { eq } from "drizzle-orm";

async function inspectLesson() {
    const lesson = await db.query.lessons.findFirst({
        where: eq(lessons.id, 33374)
    });
    console.log("Raw Content:", lesson?.content);
    console.log("Type:", typeof lesson?.content);
    process.exit(0);
}

inspectLesson();
