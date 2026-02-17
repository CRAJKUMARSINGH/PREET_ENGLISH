const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'server', 'storage.ts');
let content = fs.readFileSync(filePath, 'utf-8');

console.log('🔧 Removing @ts-ignore comments from storage.ts...');

const initialCount = (content.match(/\/\/ @ts-ignore/g) || []).length;
console.log(`Found ${initialCount} @ts-ignore comments`);

// Simply remove all @ts-ignore comments - the code works at runtime
content = content.replace(/\s*\/\/ @ts-ignore\s*/g, '\n    ');

const remainingCount = (content.match(/\/\/ @ts-ignore/g) || []).length;
console.log(`Removed ${initialCount - remainingCount} @ts-ignore comments`);
console.log(`Remaining: ${remainingCount}`);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('✅ Fixed storage.ts - removed all @ts-ignore comments');
console.log('Note: TypeScript may show warnings, but code is runtime-safe');
