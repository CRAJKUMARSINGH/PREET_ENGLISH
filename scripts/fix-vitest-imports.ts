#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

const filesToFix = [
  'tests/unit/client/lib/validators.test.tsx',
  'tests/unit/client/lib/helpers.test.tsx',
  'tests/unit/client/lib/formatters.test.tsx',
  'tests/unit/client/hooks/use-progress.test.tsx',
  'tests/unit/client/hooks/use-lessons.test.tsx',
  'tests/unit/client/hooks/use-bilingual.test.tsx',
  'tests/unit/client/hooks/use-auth.test.tsx',
  'tests/unit/client/components/ui/Tabs.test.tsx',
  'tests/unit/client/components/ui/Select.test.tsx',
  'tests/unit/client/components/ui/Input.test.tsx',
  'tests/unit/client/components/ui/Dialog.test.tsx',
  'tests/unit/client/components/ui/Card.test.tsx',
  'tests/unit/client/components/ui/Button.test.tsx',
  'tests/unit/client/components/HindiStoryCard.test.tsx',
  'tests/unit/client/components/gamification/XPProgressBar.test.tsx',
  'tests/unit/client/components/gamification/StreakCounter.test.tsx',
  'tests/unit/client/components/gamification/LevelIndicator.test.tsx',
  'tests/unit/client/components/gamification/DailyGoalCard.test.tsx',
  'tests/unit/client/components/gamification/AchievementBadge.test.tsx',
  'tests/test-setup/setup.ts',
];

console.log('🔧 Fixing Vitest imports to Jest...\n');

let fixedCount = 0;

for (const filePath of filesToFix) {
  if (fs.existsSync(filePath)) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Replace vitest imports with jest equivalents
      const originalContent = content;
      
      // Replace vitest imports
      content = content.replace(
        /import\s*{\s*([^}]*)\s*}\s*from\s*['"]vitest['"]/g,
        (match, imports) => {
          // Map vitest imports to jest equivalents
          const mappedImports = imports
            .split(',')
            .map((imp: string) => {
              const trimmed = imp.trim();
              if (trimmed === 'vi') return 'jest';
              return trimmed;
            })
            .join(', ');
          
          return `import { ${mappedImports} } from '@jest/globals'`;
        }
      );
      
      // Replace vi. calls with jest.
      content = content.replace(/\bvi\./g, 'jest.');
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed: ${filePath}`);
        fixedCount++;
      } else {
        console.log(`⏭️  Skipped: ${filePath} (no changes needed)`);
      }
    } catch (error) {
      console.error(`❌ Error fixing ${filePath}:`, error);
    }
  } else {
    console.log(`⚠️  File not found: ${filePath}`);
  }
}

console.log(`\n🎉 Fixed ${fixedCount} files!`);
console.log('\nNext: Run npm test to verify fixes');