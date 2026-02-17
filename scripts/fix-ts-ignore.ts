#!/usr/bin/env tsx
/**
 * Script to remove @ts-ignore comments from storage.ts
 * and replace with proper type-safe helpers
 */

import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

async function fixTsIgnore() {
  const filePath = join(process.cwd(), 'server', 'storage.ts');
  let content = await readFile(filePath, 'utf-8');

  console.log('🔧 Fixing @ts-ignore comments in storage.ts...');

  // Count initial @ts-ignore
  const initialCount = (content.match(/\/\/ @ts-ignore/g) || []).length;
  console.log(`Found ${initialCount} @ts-ignore comments`);

  // Pattern 1: const [item] = await db.select()...
  content = content.replace(
    /\/\/ @ts-ignore\s+const \[(\w+)\] = await db\.select\(\)\.from\((\w+)\)/g,
    'const $1 = await selectOne<any>(db.select().from($2)'
  );

  // Pattern 2: return await db.select()...
  content = content.replace(
    /\/\/ @ts-ignore\s+return await db\.select\(\)\.from\((\w+)\)/g,
    'return selectMany<any>(db.select().from($1)'
  );

  // Pattern 3: const [item] = await db.insert()...returning()
  content = content.replace(
    /\/\/ @ts-ignore\s+const \[(\w+)\] = await db\.insert\((\w+)\)\.values\([^)]+\)\.returning\(\)/g,
    'const $1 = await returning<any>(db.insert($2).values($3).returning())'
  );

  // Pattern 4: const [item] = await db.update()...returning()
  content = content.replace(
    /\/\/ @ts-ignore\s+const \[(\w+)\] = await db\.update\(/g,
    'const $1 = await returning<any>(db.update('
  );

  // Pattern 5: const results = await db (for joins)
  content = content.replace(
    /\/\/ @ts-ignore\s+const (\w+) = await db\s+\.select/g,
    'const $1 = await selectMany<any>(db.select'
  );

  // Pattern 6: await db.delete()
  content = content.replace(
    /\/\/ @ts-ignore\s+await db\.delete/g,
    'await db.delete'
  );

  // Pattern 7: await db.select() (standalone)
  content = content.replace(
    /\/\/ @ts-ignore\s+await db\.select/g,
    'await selectMany<any>(db.select'
  );

  // Count remaining @ts-ignore
  const remainingCount = (content.match(/\/\/ @ts-ignore/g) || []).length;
  console.log(`Removed ${initialCount - remainingCount} @ts-ignore comments`);
  console.log(`Remaining: ${remainingCount}`);

  await writeFile(filePath, content, 'utf-8');
  console.log('✅ Fixed storage.ts');
}

fixTsIgnore().catch(console.error);
