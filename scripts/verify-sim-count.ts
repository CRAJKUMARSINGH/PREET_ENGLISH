
import { db } from "../server/db";
import { users, progress } from "../shared/schema";
import { sql } from "drizzle-orm";

async function verify() {
    const userCount = await db.select({ count: sql<number>`count(*)` }).from(users).where(sql`username like 'sim_user_%'`);
    const progressCount = await db.select({ count: sql<number>`count(*)` }).from(progress).where(sql`user_id >= 10000`);

    console.log(`Simulated Users: ${userCount[0].count}`);
    console.log(`Simulated Progress: ${progressCount[0].count}`);
}

import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    verify().catch(console.error);
}
