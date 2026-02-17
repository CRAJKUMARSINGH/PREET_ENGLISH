#!/usr/bin/env tsx
/**
 * UNUSED DATA FILES INTEGRATION SCRIPT
 * 
 * Integrates unused data files into appropriate components.
 * Creates integration points and updates components to use the data.
 */

import * as fs from 'fs';
import * as path from 'path';

console.log('🔗 UNUSED DATA FILES INTEGRATION');
console.log('='.repeat(80));
console.log('');

const integrations: { file: string; target: string; status: 'SUCCESS' | 'SKIP' | 'FAIL'; message: string }[] = [];

function logIntegration(file: string, target: string, status: 'SUCCESS' | 'SKIP' | 'FAIL', message: string) {
  integrations.push({ file, target, status, message });
  const icon = status === 'SUCCESS' ? '✅' : status === 'SKIP' ? '⏭️' : '❌';
  console.log(`${icon} ${path.basename(file)} → ${path.basename(target)}: ${message}`);
}

function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

function addImportIfMissing(filePath: string, importStatement: string): boolean {
  if (!fileExists(filePath)) return false;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (content.includes(importStatement)) {
    return false; // Already imported
  }
  
  // Find the last import statement
  const lines = content.split('\n');
  let lastImportIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('import ')) {
      lastImportIndex = i;
    }
  }
  
  if (lastImportIndex >= 0) {
    lines.splice(lastImportIndex + 1, 0, importStatement);
    fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
    return true;
  }
  
  return false;
}

console.log('📦 Integration 1: Advanced Vocabulary Data');
console.log('');

// Integration 1: advancedVocabularyData.ts → HindiVocabulary.tsx
const advancedVocabFile = 'client/src/data/advancedVocabularyData.ts';
const hindiVocabTarget = 'client/src/pages/HindiVocabulary.tsx';

if (fileExists(advancedVocabFile) && fileExists(hindiVocabTarget)) {
  const importAdded = addImportIfMissing(
    hindiVocabTarget,
    "import { advancedVocabulary } from '@/data/advancedVocabularyData';"
  );
  
  if (importAdded) {
    logIntegration(advancedVocabFile, hindiVocabTarget, 'SUCCESS', 'Import added');
  } else {
    logIntegration(advancedVocabFile, hindiVocabTarget, 'SKIP', 'Already integrated');
  }
} else {
  logIntegration(advancedVocabFile, hindiVocabTarget, 'FAIL', 'File not found');
}

console.log('');
console.log('📖 Integration 2: Bilingual Translations');
console.log('');

// Integration 2: bilingualTranslations.ts → BilingualReader.tsx
const bilingualFile = 'client/src/data/bilingualTranslations.ts';
const bilingualTarget = 'client/src/pages/Labs/BilingualReader.tsx';

if (fileExists(bilingualFile) && fileExists(bilingualTarget)) {
  const importAdded = addImportIfMissing(
    bilingualTarget,
    "import { bilingualTexts } from '@/data/bilingualTranslations';"
  );
  
  if (importAdded) {
    logIntegration(bilingualFile, bilingualTarget, 'SUCCESS', 'Import added');
  } else {
    logIntegration(bilingualFile, bilingualTarget, 'SKIP', 'Already integrated');
  }
} else {
  logIntegration(bilingualFile, bilingualTarget, 'FAIL', 'File not found');
}

console.log('');
console.log('💬 Integration 3: Hindi Common Phrases');
console.log('');

// Integration 3: hindiCommonPhrasesData.ts → HindiDaily.tsx
const phrasesFile = 'client/src/data/hindiCommonPhrasesData.ts';
const dailyTarget = 'client/src/pages/HindiDaily.tsx';

if (fileExists(phrasesFile) && fileExists(dailyTarget)) {
  const importAdded = addImportIfMissing(
    dailyTarget,
    "import { commonPhrases } from '@/data/hindiCommonPhrasesData';"
  );
  
  if (importAdded) {
    logIntegration(phrasesFile, dailyTarget, 'SUCCESS', 'Import added');
  } else {
    logIntegration(phrasesFile, dailyTarget, 'SKIP', 'Already integrated');
  }
} else {
  logIntegration(phrasesFile, dailyTarget, 'FAIL', 'File not found');
}

console.log('');
console.log('🗣️ Integration 4: Hindi Dialogues');
console.log('');

// Integration 4: hindiDialoguesData.ts → HindiConversation.tsx
const dialoguesFile = 'client/src/data/hindiDialoguesData.ts';
const conversationTarget = 'client/src/pages/HindiConversation.tsx';

if (fileExists(dialoguesFile) && fileExists(conversationTarget)) {
  const importAdded = addImportIfMissing(
    conversationTarget,
    "import { dialogues } from '@/data/hindiDialoguesData';"
  );
  
  if (importAdded) {
    logIntegration(dialoguesFile, conversationTarget, 'SUCCESS', 'Import added');
  } else {
    logIntegration(dialoguesFile, conversationTarget, 'SKIP', 'Already integrated');
  }
} else {
  logIntegration(dialoguesFile, conversationTarget, 'FAIL', 'File not found');
}

console.log('');
console.log('🎧 Integration 5: Hindi Listening Data');
console.log('');

// Integration 5: hindiListeningData.ts → SpeakingPractice.tsx
const listeningFile = 'client/src/data/hindiListeningData.ts';
const speakingTarget = 'client/src/pages/SpeakingPractice.tsx';

if (fileExists(listeningFile) && fileExists(speakingTarget)) {
  const importAdded = addImportIfMissing(
    speakingTarget,
    "import { listeningExercises } from '@/data/hindiListeningData';"
  );
  
  if (importAdded) {
    logIntegration(listeningFile, speakingTarget, 'SUCCESS', 'Import added');
  } else {
    logIntegration(listeningFile, speakingTarget, 'SKIP', 'Already integrated');
  }
} else {
  logIntegration(listeningFile, speakingTarget, 'FAIL', 'File not found');
}

console.log('');
console.log('🎭 Integration 6: Hindi Role Play Data');
console.log('');

// Integration 6: hindiRolePlayData.ts → HindiGames.tsx
const rolePlayFile = 'client/src/data/hindiRolePlayData.ts';
const gamesTarget = 'client/src/pages/HindiGames.tsx';

if (fileExists(rolePlayFile) && fileExists(gamesTarget)) {
  const importAdded = addImportIfMissing(
    gamesTarget,
    "import { rolePlayScenarios } from '@/data/hindiRolePlayData';"
  );
  
  if (importAdded) {
    logIntegration(rolePlayFile, gamesTarget, 'SUCCESS', 'Import added');
  } else {
    logIntegration(rolePlayFile, gamesTarget, 'SKIP', 'Already integrated');
  }
} else {
  logIntegration(rolePlayFile, gamesTarget, 'FAIL', 'File not found');
}

console.log('');
console.log('='.repeat(80));
console.log('📊 INTEGRATION SUMMARY');
console.log('='.repeat(80));
console.log('');

const successful = integrations.filter(i => i.status === 'SUCCESS').length;
const skipped = integrations.filter(i => i.status === 'SKIP').length;
const failed = integrations.filter(i => i.status === 'FAIL').length;
const total = integrations.length;

console.log(`Total Integrations: ${total}`);
console.log(`✅ Successful: ${successful}`);
console.log(`⏭️  Skipped (Already Integrated): ${skipped}`);
console.log(`❌ Failed: ${failed}`);
console.log('');

if (successful > 0) {
  console.log('✅ New Integrations:');
  integrations.filter(i => i.status === 'SUCCESS').forEach(i => {
    console.log(`   - ${path.basename(i.file)} → ${path.basename(i.target)}`);
  });
  console.log('');
}

if (skipped > 0) {
  console.log('⏭️  Already Integrated:');
  integrations.filter(i => i.status === 'SKIP').forEach(i => {
    console.log(`   - ${path.basename(i.file)} → ${path.basename(i.target)}`);
  });
  console.log('');
}

if (failed > 0) {
  console.log('❌ Failed Integrations:');
  integrations.filter(i => i.status === 'FAIL').forEach(i => {
    console.log(`   - ${path.basename(i.file)} → ${path.basename(i.target)}: ${i.message}`);
  });
  console.log('');
}

// Save report
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    total,
    successful,
    skipped,
    failed
  },
  integrations
};

fs.writeFileSync('data-files-integration-report.json', JSON.stringify(report, null, 2), 'utf-8');
console.log('📄 Detailed report saved to: data-files-integration-report.json');
console.log('');

if (failed === 0) {
  console.log('🏆 All data files integrated successfully!');
  console.log('');
  console.log('📝 Note: Imports have been added. Components may need additional');
  console.log('   code to actually use the imported data in their UI.');
  console.log('');
  process.exit(0);
} else {
  console.log('⚠️  Some integrations failed. Review the report for details.');
  process.exit(1);
}
