import { db } from './server/db.js';
import { users } from './shared/schema.js';
import { sql } from 'drizzle-orm';

async function showFirstFiveUsers() {
  try {
    const testUsers = await db.select()
      .from(users)
      .where(sql`username LIKE 'k6_user_%'`)
      .limit(5);
    
    console.log('🔍 First 5 Test Users Created:');
    testUsers.forEach((user, index) => {
      console.log(`${index + 1}. ID: ${user.id}, Username: ${user.username}`);
    });
    
    const totalCount = await db.select({ count: sql`count(*)` })
      .from(users)
      .where(sql`username LIKE 'k6_user_%'`);
    
    console.log(`\n📊 Total Test Users in Database: ${totalCount[0].count}`);
    
    // Show SQL query result
    console.log('\n🗄️ SQL Query Result:');
    console.log(`SELECT count(*) FROM users WHERE username LIKE 'k6_user_%';`);
    console.log(`Result: ${totalCount[0].count} rows`);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

showFirstFiveUsers();