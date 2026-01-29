
import { db } from "../server/db";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";

async function checkUser() {
    console.log("🔍 Checking for k6_user_0...");
    try {
        const result = await db.select().from(users).where(eq(users.username, 'k6_user_0'));
        const user = result[0];

        if (user) {
            console.log(`✅ User Found: ${user.username}`);
            console.log(`🔑 Stored Hash: ${user.password}`);
        } else {
            console.log("❌ User k6_user_0 NOT FOUND");
        }
    } catch (e) {
        console.error("DB Error:", e);
    }
}

checkUser();
