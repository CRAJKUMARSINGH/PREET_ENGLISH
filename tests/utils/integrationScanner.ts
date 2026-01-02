/**
 * Integration Scanner Utility for Hindi Learning App Testing
 * Scans data file imports and detects orphaned files/exports
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// TYPES
// ============================================================================

export interface DataFileIntegration {
  dataFile: string;
  filePath: string;
  exports: string[];
  importedBy: ImportInfo[];
  isOrphaned: boolean;
  unusedExports: string[];
}

export interface ImportInfo {
  componentFile: string;
  componentPath: string;
  importedExports: string[];
}

export interface IntegrationScanResult {
  dataFiles: DataFileIntegration[];
  orphanedDataFiles: string[];
  totalDataFiles: number;
  integratedDataFiles: number;
}

// ============================================================================
// FILE SYSTEM HELPERS
// ============================================================================

/**
 * Recursively gets all files in a directory
 */
export function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  if (!fs.existsSync(dirPath)) {
    return arrayOfFiles;
  }

  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

/**
 * Gets all TypeScript/TSX files in a directory
 */
export function getTsFiles(dirPath: string): string[] {
  return getAllFiles(dirPath).filter(
    (file) => file.endsWith('.ts') || file.endsWith('.tsx')
  );
}

// ============================================================================
// EXPORT EXTRACTION
// ============================================================================

/**
 * Extracts exported names from a TypeScript file
 */
export function extractExports(filePath: string): string[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const exports: string[] = [];

  // Match: export const/let/var name
  const constExportRegex = /export\s+(?:const|let|var)\s+(\w+)/g;
  let match;
  while ((match = constExportRegex.exec(content)) !== null) {
    exports.push(match[1]);
  }

  // Match: export function name
  const funcExportRegex = /export\s+function\s+(\w+)/g;
  while ((match = funcExportRegex.exec(content)) !== null) {
    exports.push(match[1]);
  }

  // Match: export interface/type name
  const typeExportRegex = /export\s+(?:interface|type)\s+(\w+)/g;
  while ((match = typeExportRegex.exec(content)) !== null) {
    exports.push(match[1]);
  }

  // Match: export { name1, name2 }
  const namedExportRegex = /export\s*\{([^}]+)\}/g;
  while ((match = namedExportRegex.exec(content)) !== null) {
    const names = match[1].split(',').map((n) => n.trim().split(' as ')[0].trim());
    exports.push(...names.filter((n) => n.length > 0));
  }

  // Match: export default
  if (/export\s+default/.test(content)) {
    exports.push('default');
  }

  return [...new Set(exports)];
}

// ============================================================================
// IMPORT SCANNING
// ============================================================================

/**
 * Scans a file for imports from a specific data file
 */
export function scanFileForImports(
  filePath: string,
  dataFileName: string
): string[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const importedExports: string[] = [];

  // Remove file extension for matching
  const dataFileBase = dataFileName.replace(/\.(ts|tsx)$/, '');

  // Check if file imports from the data file
  const importRegex = new RegExp(
    `import\\s*\\{([^}]+)\\}\\s*from\\s*['"][^'"]*${dataFileBase}['"]`,
    'g'
  );

  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const names = match[1].split(',').map((n) => n.trim().split(' as ')[0].trim());
    importedExports.push(...names.filter((n) => n.length > 0));
  }

  // Check for default imports
  const defaultImportRegex = new RegExp(
    `import\\s+(\\w+)\\s+from\\s*['"][^'"]*${dataFileBase}['"]`
  );
  const defaultMatch = defaultImportRegex.exec(content);
  if (defaultMatch) {
    importedExports.push('default');
  }

  // Check for * imports
  const starImportRegex = new RegExp(
    `import\\s*\\*\\s*as\\s+(\\w+)\\s+from\\s*['"][^'"]*${dataFileBase}['"]`
  );
  const starMatch = starImportRegex.exec(content);
  if (starMatch) {
    importedExports.push('*');
  }

  return [...new Set(importedExports)];
}

/**
 * Scans all components for imports of a data file
 */
export function scanDataFileImports(
  dataFilePath: string,
  componentDirs: string[]
): ImportInfo[] {
  const dataFileName = path.basename(dataFilePath);
  const imports: ImportInfo[] = [];

  for (const dir of componentDirs) {
    const files = getTsFiles(dir);
    for (const file of files) {
      const importedExports = scanFileForImports(file, dataFileName);
      if (importedExports.length > 0) {
        imports.push({
          componentFile: path.basename(file),
          componentPath: file,
          importedExports
        });
      }
    }
  }

  // Also scan pages directory
  const pagesDir = 'client/src/pages';
  if (fs.existsSync(pagesDir)) {
    const pageFiles = getTsFiles(pagesDir);
    for (const file of pageFiles) {
      const importedExports = scanFileForImports(file, dataFileName);
      if (importedExports.length > 0) {
        imports.push({
          componentFile: path.basename(file),
          componentPath: file,
          importedExports
        });
      }
    }
  }

  return imports;
}

// ============================================================================
// ORPHAN DETECTION
// ============================================================================

/**
 * Finds orphaned data files (not imported by any component)
 */
export function findOrphanedDataFiles(
  dataDir: string,
  componentDirs: string[]
): DataFileIntegration[] {
  const dataFiles = getTsFiles(dataDir);
  const integrations: DataFileIntegration[] = [];

  for (const dataFile of dataFiles) {
    const fileName = path.basename(dataFile);
    const exports = extractExports(dataFile);
    const imports = scanDataFileImports(dataFile, componentDirs);

    // Find which exports are actually used
    const usedExports = new Set<string>();
    for (const imp of imports) {
      for (const exp of imp.importedExports) {
        if (exp === '*') {
          // Star import uses all exports
          exports.forEach((e) => usedExports.add(e));
        } else {
          usedExports.add(exp);
        }
      }
    }

    // Find unused exports (excluding types/interfaces which may be used implicitly)
    const unusedExports = exports.filter(
      (exp) => !usedExports.has(exp) && !exp.startsWith('I') && exp !== 'default'
    );

    integrations.push({
      dataFile: fileName,
      filePath: dataFile,
      exports,
      importedBy: imports,
      isOrphaned: imports.length === 0,
      unusedExports
    });
  }

  return integrations;
}

/**
 * Generates a complete integration scan result
 */
export function scanIntegration(
  dataDir: string,
  componentDirs: string[]
): IntegrationScanResult {
  const dataFiles = findOrphanedDataFiles(dataDir, componentDirs);
  const orphanedDataFiles = dataFiles
    .filter((df) => df.isOrphaned)
    .map((df) => df.dataFile);

  return {
    dataFiles,
    orphanedDataFiles,
    totalDataFiles: dataFiles.length,
    integratedDataFiles: dataFiles.filter((df) => !df.isOrphaned).length
  };
}

/**
 * Formats integration scan result for console output
 */
export function formatIntegrationReport(result: IntegrationScanResult): string {
  const lines: string[] = [];

  lines.push(`\n${'='.repeat(60)}`);
  lines.push('Data File Integration Report');
  lines.push(`${'='.repeat(60)}`);
  lines.push(`Total Data Files: ${result.totalDataFiles}`);
  lines.push(`Integrated Files: ${result.integratedDataFiles}`);
  lines.push(`Orphaned Files: ${result.orphanedDataFiles.length}`);

  if (result.orphanedDataFiles.length > 0) {
    lines.push('\n❌ Orphaned Data Files (not imported by any component):');
    for (const file of result.orphanedDataFiles) {
      lines.push(`  - ${file}`);
    }
  }

  lines.push('\nData File Details:');
  for (const df of result.dataFiles) {
    const status = df.isOrphaned ? '❌' : '✅';
    lines.push(`\n${status} ${df.dataFile}`);
    lines.push(`   Exports: ${df.exports.join(', ')}`);
    
    if (df.importedBy.length > 0) {
      lines.push('   Imported by:');
      for (const imp of df.importedBy) {
        lines.push(`     - ${imp.componentFile}: ${imp.importedExports.join(', ')}`);
      }
    }
    
    if (df.unusedExports.length > 0) {
      lines.push(`   ⚠️ Unused exports: ${df.unusedExports.join(', ')}`);
    }
  }

  lines.push(`\n${'='.repeat(60)}\n`);

  return lines.join('\n');
}
