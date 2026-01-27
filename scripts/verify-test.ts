import { db } from "../server/db";
import { users, userStats, progress } from "../shared/schema";

async function verify() {
    console.log("--- MISSION VERIFICATION ---");
    const userCount = (await db.select().from(users)).length;
    const statsCount = (await db.select().from(userStats)).length;
    const progressCount = (await db.select().from(progress)).length;

    console.log(`Total Users: ${userCount}`);
    console.log(`Users with Stats: ${statsCount}`);
    console.log(`Progress Records: ${progressCount}`);

    if (userCount >= 1500 && progressCount > 0) {
        console.log("✅ CHANDRAYAN PRECISION VERIFIED: 1500+ users active.");
    } else {
        console.log("❌ VERIFICATION FAILED: Insufficient data.");
    }
}

verify().catch(console.error);
