const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'server', 'routes.ts');
let content = fs.readFileSync(filePath, 'utf-8');

console.log('🔧 Fixing authentication in routes.ts...');

// Count issues
const hardcodedUserCount = (content.match(/\|\| \{ id: 1 \}/g) || []).length;
const weakAuthCount = (content.match(/if \(req\.isAuthenticated && !req\.isAuthenticated\(\)\)/g) || []).length;

console.log(`Found ${hardcodedUserCount} hardcoded user IDs`);
console.log(`Found ${weakAuthCount} weak authentication checks`);

// Fix weak authentication checks
content = content.replace(
  /if \(req\.isAuthenticated && !req\.isAuthenticated\(\)\) return res\.status\(401\)\.json\(\{ message: "Unauthorized" \}\);\s+const user = \(req\.user as any\) \|\| \{ id: 1 \};/g,
  'if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });\n    const user = req.user as any;'
);

// Verify fixes
const remainingHardcoded = (content.match(/\|\| \{ id: 1 \}/g) || []).length;
const remainingWeak = (content.match(/if \(req\.isAuthenticated && !req\.isAuthenticated\(\)\)/g) || []).length;

console.log(`\nFixed ${hardcodedUserCount - remainingHardcoded} hardcoded user IDs`);
console.log(`Fixed ${weakAuthCount - remainingWeak} weak authentication checks`);
console.log(`Remaining issues: ${remainingHardcoded + remainingWeak}`);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('\n✅ Fixed authentication in routes.ts');
