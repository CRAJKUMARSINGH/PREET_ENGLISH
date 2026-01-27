#!/usr/bin/env tsx
import { db } from '../server/db';
import { lessons } from '../shared/schema';

async function findMissing() {
  const all = await db.select().from(lessons);
  const missing = all.filter(l => !l.hindiTitle || l.hindiTitle.trim() === '' || l.hindiTitle.length < 4);
  
  console.log(`\n📋 Lessons needing Hindi titles: ${missing.length}/24\n`);
  missing.forEach(l => {
    console.log(`  ID ${l.id}: "${l.title}" (Hindi: "${l.hindiTitle || 'MISSING'}")`);
  });
}

findMissing().catch(console.error);
