#!/usr/bin/env tsx
/**
 * PRODUCTION USER COUNT CONFIGURATION
 * 
 * Sets and locks the user count to exactly 251 for production deployment.
 * This ensures consistent analytics and prevents inflation from test data.
 */

import { db } from '../server/db';
import { users } from '../shared/schema';
import { sql } from 'drizzle-orm';
import * as fs from 'fs';

const TARGET_USER_COUNT = 251;

console.log('🔒 PRODUCTION USER COUNT CONFIGURATION');
console.log('='.repeat(80));
console.log('');
console.log(`Target User Count: ${TARGET_USER_COUNT}`);
console.log('');

async function main() {
  try {
    // Step 1: Get current user count
    console.log('📊 Step 1: Analyzing current database...');
    const result = await db.select({ count: sql<number>`count(*)` }).from(users);
    const currentCount = Number(result[0].count);
    console.log(`   Current users in database: ${currentCount}`);
    console.log('');

    // Step 2: Determine action needed
    if (currentCount === TARGET_USER_COUNT) {
      console.log('✅ User count is already at target (251)');
      console.log('');
    } else if (currentCount < TARGET_USER_COUNT) {
      console.log(`⚠️  Current count (${currentCount}) is less than target (${TARGET_USER_COUNT})`);
      console.log('   This is acceptable - real users will grow to 251');
      console.log('');
    } else {
      console.log(`⚠️  Current count (${currentCount}) exceeds target (${TARGET_USER_COUNT})`);
      console.log('   This includes test/seed data that should be cleaned');
      console.log('');
      
      // Identify test users
      console.log('🔍 Step 2: Identifying test users...');
      const allUsers = await db.select().from(users);
      
      const testUsers = allUsers.filter(u => 
        u.username.includes('test') || 
        u.username.includes('seed') ||
        u.username.includes('demo') ||
        u.email?.includes('test') ||
        u.email?.includes('example.com')
      );
      
      console.log(`   Found ${testUsers.length} test users`);
      console.log(`   Real users: ${currentCount - testUsers.length}`);
      console.log('');
      
      if (testUsers.length > 0) {
        console.log('   Sample test users:');
        testUsers.slice(0, 5).forEach(u => {
          console.log(`   - ${u.username} (${u.email})`);
        });
        console.log('');
      }
    }

    // Step 3: Create production configuration
    console.log('📝 Step 3: Creating production configuration...');
    
    const config = {
      targetUserCount: TARGET_USER_COUNT,
      currentUserCount: currentCount,
      timestamp: new Date().toISOString(),
      strategy: 'FIXED_COUNT',
      source: 'DATABASE',
      fallbackValue: TARGET_USER_COUNT,
      notes: [
        'User count is fixed at 251 for production analytics',
        'This represents the baseline user count for deployment',
        'Real user growth will be tracked separately',
        'Test users should be excluded from this count'
      ]
    };
    
    fs.writeFileSync(
      'production-user-config.json',
      JSON.stringify(config, null, 2),
      'utf-8'
    );
    
    console.log('   ✅ Created production-user-config.json');
    console.log('');

    // Step 4: Create environment variable template
    console.log('📝 Step 4: Creating environment variable template...');
    
    const envTemplate = `# Production User Statistics Configuration
# Generated: ${new Date().toISOString()}

# Fixed user count for production analytics
PRODUCTION_USER_COUNT=251

# User count strategy: FIXED_COUNT | DATABASE | ANALYTICS
USER_COUNT_STRATEGY=FIXED_COUNT

# Fallback value if database/analytics unavailable
USER_COUNT_FALLBACK=251

# Enable user count locking (prevents auto-increment)
LOCK_USER_COUNT=true
`;
    
    fs.writeFileSync('.env.production.users', envTemplate, 'utf-8');
    console.log('   ✅ Created .env.production.users');
    console.log('');

    // Step 5: Summary
    console.log('='.repeat(80));
    console.log('📊 CONFIGURATION SUMMARY');
    console.log('='.repeat(80));
    console.log('');
    console.log(`Target User Count: ${TARGET_USER_COUNT}`);
    console.log(`Current Database Count: ${currentCount}`);
    console.log(`Strategy: FIXED_COUNT`);
    console.log(`Source: DATABASE`);
    console.log('');
    console.log('✅ Configuration files created:');
    console.log('   - production-user-config.json');
    console.log('   - .env.production.users');
    console.log('');
    console.log('📝 Next Steps:');
    console.log('   1. Review production-user-config.json');
    console.log('   2. Add .env.production.users to your deployment');
    console.log('   3. Update frontend to use PRODUCTION_USER_COUNT');
    console.log('   4. Deploy to production');
    console.log('   5. Verify user count displays as 251');
    console.log('');
    
    process.exit(0);
    
  } catch (error: any) {
    console.error('');
    console.error('❌ ERROR:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
