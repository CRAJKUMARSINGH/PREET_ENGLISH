const fs = require('fs');
const path = require('path');

console.log('🔧 Applying Perfect App Fixes...\n');

let fixCount = 0;

// Fix 1: Remove @ts-ignore from server/index.ts
console.log('1. Fixing @ts-ignore in health check...');
const indexPath = path.join(process.cwd(), 'server', 'index.ts');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

// Import selectOne at top
if (!indexContent.includes('import { selectOne }')) {
  indexContent = indexContent.replace(
    'import { db } from "./db.js";',
    'import { db } from "./db.js";\nimport { selectOne } from "./lib/db-helpers";'
  );
}

// Fix health check
indexContent = indexContent.replace(
  /\/\/ @ts-ignore\s+await db\.select\(\)\.from\(users\)\.limit\(1\);/,
  'await selectOne<any>(db.select().from(users).limit(1));'
);

fs.writeFileSync(indexPath, indexContent, 'utf-8');
fixCount++;
console.log('   ✅ Fixed\n');

// Fix 2: Add proper User type
console.log('2. Creating proper User type interface...');
const typesPath = path.join(process.cwd(), 'server', 'types.ts');
const userTypeContent = `/**
 * Server-side type definitions
 */

import type { User as DbUser } from '../shared/schema';

// Extend Express Request type
declare global {
  namespace Express {
    interface User extends DbUser {}
  }
}

export {};
`;

fs.writeFileSync(typesPath, userTypeContent, 'utf-8');
fixCount++;
console.log('   ✅ Created server/types.ts\n');

// Fix 3: Update routes to use proper User type
console.log('3. Updating routes with proper User type...');
const routesPath = path.join(process.cwd(), 'server', 'routes.ts');
let routesContent = fs.readFileSync(routesPath, 'utf-8');

// Add import at top
if (!routesContent.includes('import "./types"')) {
  routesContent = 'import "./types";\n' + routesContent;
}

// Replace 'as any' with proper type
routesContent = routesContent.replace(/const user = req\.user as any;/g, 'const user = req.user!;');
routesContent = routesContent.replace(/\(req\.user as any\)/g, 'req.user!');

fs.writeFileSync(routesPath, routesContent, 'utf-8');
fixCount++;
console.log('   ✅ Fixed\n');

// Fix 4: Add database retry logic
console.log('4. Adding database connection retry logic...');
const dbPath = path.join(process.cwd(), 'server', 'db.ts');
let dbContent = fs.readFileSync(dbPath, 'utf-8');

// Add retry function before db initialization
const retryLogic = `
// Retry logic for database connections
async function connectWithRetry<T>(
  connectFn: () => T,
  maxRetries: number = 5,
  delayMs: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return connectFn();
    } catch (error) {
      if (attempt === maxRetries) {
        logger.error(\`Failed to connect to database after \${maxRetries} attempts\`);
        throw error;
      }
      logger.warn(\`Database connection attempt \${attempt} failed, retrying in \${delayMs}ms...\`);
      await new Promise(resolve => setTimeout(resolve, delayMs * attempt));
    }
  }
  throw new Error('Unreachable');
}

`;

// Insert after imports
dbContent = dbContent.replace(
  "config({ path: '.env.local' });",
  "config({ path: '.env.local' });\n" + retryLogic
);

fs.writeFileSync(dbPath, dbContent, 'utf-8');
fixCount++;
console.log('   ✅ Fixed\n');

// Fix 5: Add process error handlers
console.log('5. Adding global error handlers...');
indexContent = fs.readFileSync(indexPath, 'utf-8');

const errorHandlers = `
// Global error handlers
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

`;

// Add before server listen
indexContent = indexContent.replace(
  'if (process.env.NODE_ENV !== "test" && !process.env.VERCEL) {',
  errorHandlers + '\nif (process.env.NODE_ENV !== "test" && !process.env.VERCEL) {'
);

fs.writeFileSync(indexPath, indexContent, 'utf-8');
fixCount++;
console.log('   ✅ Fixed\n');

// Fix 6: Improve CSP
console.log('6. Improving Content Security Policy...');
indexContent = fs.readFileSync(indexPath, 'utf-8');

indexContent = indexContent.replace(
  /scriptSrc: \["'self'", "'unsafe-inline'", "'unsafe-eval'", "https:\/\/cdn\.polyfill\.io"\],/,
  'scriptSrc: ["\'self\'", "https://cdn.polyfill.io"],'
);

fs.writeFileSync(indexPath, indexContent, 'utf-8');
fixCount++;
console.log('   ✅ Fixed\n');

// Fix 7: Reduce request size limits
console.log('7. Reducing request size limits...');
indexContent = fs.readFileSync(indexPath, 'utf-8');

indexContent = indexContent.replace(
  /app\.use\(express\.json\(\{ limit: "10mb" \}\)\);/,
  'app.use(express.json({ limit: "1mb" }));'
);
indexContent = indexContent.replace(
  /app\.use\(express\.urlencoded\(\{ extended: false, limit: "10mb" \}\)\);/,
  'app.use(express.urlencoded({ extended: false, limit: "1mb" }));'
);

fs.writeFileSync(indexPath, indexContent, 'utf-8');
fixCount++;
console.log('   ✅ Fixed\n');

// Fix 8: Increase memory limit
console.log('8. Adjusting memory limit for production...');
indexContent = fs.readFileSync(indexPath, 'utf-8');

indexContent = indexContent.replace(
  /const maxMemory = 512 \* 1024 \* 1024; \/\/ 512MB/,
  'const maxMemory = 1024 * 1024 * 1024; // 1GB'
);

fs.writeFileSync(indexPath, indexContent, 'utf-8');
fixCount++;
console.log('   ✅ Fixed\n');

console.log(`\n✅ Applied ${fixCount} fixes successfully!`);
console.log('\n📋 Next Steps:');
console.log('1. Run: npm test');
console.log('2. Run: npm run check:full');
console.log('3. Run: npm run build');
console.log('4. Verify content: npm run audit:lessons');
