const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const db = new Database('./preet_english.db');

// Get all existing lesson titles from database
const existingLessons = db.prepare('SELECT title, hindi_title FROM lessons').all();
const existingTitles = new Set(existingLessons.map(l => l.title.toLowerCase().trim()));
const existingHindiTitles = new Set(existingLessons.filter(l => l.hindi_title).map(l => l.hindi_title.toLowerCase().trim()));

console.log(`📊 Current database has ${existingLessons.length} lessons\n`);

// Check all lessonData files in REFERENCE_APP
const refPath = './REFERENCE_APP_PREET_ENGLISH';
const lessonDataFiles = [
  'lessonData.ts',
  'lessonData2.ts',
  'lessonData3.ts',
  'lessonData4.ts',
  'lessonData5.ts',
  'lessonData_beginner.ts',
  'lessonData_intermediate.ts',
  'lessonData_advanced.ts',
  'lessonData_expansion.ts',
  'lessonData-intermediate.ts'
];

let totalUnique = 0;
const allUniqueLessons = [];

lessonDataFiles.forEach(file => {
  const filePath = path.join(refPath, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract lesson titles using regex
    const titleMatches = content.match(/title:\s*["'`]([^"'`]+)["'`]/g) || [];
    const hindiMatches = content.match(/hindiTitle:\s*["'`]([^"'`]+)["'`]/g) || [];
    
    const titles = titleMatches.map(m => m.replace(/title:\s*["'`]/, '').replace(/["'`]$/, ''));
    const hindiTitles = hindiMatches.map(m => m.replace(/hindiTitle:\s*["'`]/, '').replace(/["'`]$/, ''));
    
    let uniqueCount = 0;
    titles.forEach((title, i) => {
      const normalizedTitle = title.toLowerCase().trim();
      const hindiTitle = hindiTitles[i] || '';
      const normalizedHindi = hindiTitle.toLowerCase().trim();
      
      if (!existingTitles.has(normalizedTitle) && (!normalizedHindi || !existingHindiTitles.has(normalizedHindi))) {
        uniqueCount++;
        allUniqueLessons.push({ title, hindiTitle, source: file });
      }
    });
    
    console.log(`📁 ${file}: ${titles.length} lessons found, ${uniqueCount} unique`);
    totalUnique += uniqueCount;
  } else {
    console.log(`❌ ${file}: File not found`);
  }
});

console.log(`\n📊 Total unique lessons across all files: ${totalUnique}`);

if (allUniqueLessons.length > 0 && allUniqueLessons.length <= 50) {
  console.log('\n--- Sample Unique Lessons ---');
  allUniqueLessons.slice(0, 20).forEach((l, i) => {
    console.log(`${i+1}. ${l.title} | ${l.hindiTitle || 'N/A'} (from ${l.source})`);
  });
}

// Save unique lessons to file for potential migration
if (allUniqueLessons.length > 0) {
  fs.writeFileSync('unique-lessons-from-ts-files.json', JSON.stringify(allUniqueLessons, null, 2));
  console.log(`\n✅ Saved ${allUniqueLessons.length} unique lessons to unique-lessons-from-ts-files.json`);
}

db.close();
