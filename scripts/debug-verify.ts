import { db } from "../server/db";
import { users, userStats, progress, lessons } from "../shared/schema";

async function verify() {
    console.log("--- DEBUG VERIFICATON START ---");

    try {
        const lessonCount = (await db.select().from(lessons)).length;
        console.log(`Lessons Count: ${lessonCount}`);

        const userCount = (await db.select().from(users)).length;
        console.log(`Users Count: ${userCount}`);

        const statsCount = (await db.select().from(userStats)).length;
        console.log(`UserStats Count: ${statsCount}`);

        const progressCount = (await db.select().from(progress)).length;
        console.log(`Progress Count: ${progressCount}`);
    } catch (err) {
        console.error("Query Error:", err);
    }

    console.log("--- DEBUG VERIFICATON END ---");
}

verify();
