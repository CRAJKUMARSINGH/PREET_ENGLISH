/**
 * Component Reachability Tracker for Hindi Learning App Testing
 * Traces component tree from App.tsx and detects orphaned components
 */

import * as fs from 'fs';
import * as path from 'path';
import { getAllFiles, getTsFiles } from './integrationScanner';

// ============================================================================
// TYPES
// ============================================================================

export interface ComponentNode {
  name: string;
  path: string;
  children: string[];
  isReachable: boolean;
  reachableFrom: string[];
}

export interface ComponentTreeResult {
  rootComponent: string;
  allComponents: Map<string, ComponentNode>;
  reachableComponents: string[];
  orphanedComponents: string[];
  totalComponents: number;
}

export interface IntegrationReport {
  componentTree: ComponentTreeResult;
  orphanedComponents: OrphanedComponentInfo[];
  timestamp: Date;
}

export interface OrphanedComponentInfo {
  name: string;
  path: string;
  suggestedIntegration: string;
}

// ============================================================================
// COMPONENT EXTRACTION
// ============================================================================

/**
 * Extracts component name from file path
 */
export function getComponentName(filePath: string): string {
  const fileName = path.basename(filePath, path.extname(filePath));
  return fileName;
}

/**
 * Extracts imported components from a file
 */
export function extractImportedComponents(filePath: string): string[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const imports: string[] = [];

  // Match: import ComponentName from './path'
  const defaultImportRegex = /import\s+(\w+)\s+from\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = defaultImportRegex.exec(content)) !== null) {
    const componentName = match[1];
    const importPath = match[2];
    // Only include local imports (starting with . or @/)
    if (importPath.startsWith('.') || importPath.startsWith('@/')) {
      imports.push(componentName);
    }
  }

  // Match: import { Component1, Component2 } from './path'
  const namedImportRegex = /import\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]/g;
  while ((match = namedImportRegex.exec(content)) !== null) {
    const importPath = match[2];
    if (importPath.startsWith('.') || importPath.startsWith('@/')) {
      const names = match[1].split(',').map((n) => {
        const parts = n.trim().split(' as ');
        return parts[parts.length - 1].trim();
      });
      imports.push(...names.filter((n) => n.length > 0 && /^[A-Z]/.test(n)));
    }
  }

  return [...new Set(imports)];
}

/**
 * Extracts components used in JSX from a file
 */
export function extractUsedComponents(filePath: string): string[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const components: string[] = [];

  // Match JSX components: <ComponentName or <ComponentName>
  const jsxRegex = /<([A-Z][a-zA-Z0-9]*)/g;
  let match;
  while ((match = jsxRegex.exec(content)) !== null) {
    components.push(match[1]);
  }

  return [...new Set(components)];
}

// ============================================================================
// COMPONENT TREE BUILDING
// ============================================================================

/**
 * Builds a map of all components in specified directories
 */
export function buildComponentMap(componentDirs: string[]): Map<string, ComponentNode> {
  const componentMap = new Map<string, ComponentNode>();

  for (const dir of componentDirs) {
    const files = getTsFiles(dir);
    for (const file of files) {
      const name = getComponentName(file);
      const children = extractUsedComponents(file);
      
      componentMap.set(name, {
        name,
        path: file,
        children,
        isReachable: false,
        reachableFrom: []
      });
    }
  }

  return componentMap;
}

/**
 * Marks components as reachable starting from a root component
 */
export function markReachable(
  componentMap: Map<string, ComponentNode>,
  startComponent: string,
  visitedFrom: string = 'root'
): void {
  const component = componentMap.get(startComponent);
  if (!component) {
    return;
  }

  if (component.isReachable && component.reachableFrom.includes(visitedFrom)) {
    return; // Already visited from this path
  }

  component.isReachable = true;
  if (!component.reachableFrom.includes(visitedFrom)) {
    component.reachableFrom.push(visitedFrom);
  }

  // Mark all children as reachable
  for (const child of component.children) {
    markReachable(componentMap, child, startComponent);
  }
}

/**
 * Builds component tree starting from App.tsx
 */
export function buildComponentTree(
  appFilePath: string,
  componentDirs: string[],
  pagesDir: string
): ComponentTreeResult {
  // Build map of all components
  const allDirs = [...componentDirs, pagesDir];
  const componentMap = buildComponentMap(allDirs);

  // Add App.tsx to the map
  const appName = 'App';
  const appChildren = extractUsedComponents(appFilePath);
  componentMap.set(appName, {
    name: appName,
    path: appFilePath,
    children: appChildren,
    isReachable: true,
    reachableFrom: ['root']
  });

  // Mark all components reachable from App
  for (const child of appChildren) {
    markReachable(componentMap, child, appName);
  }

  // Also check pages for their children
  const pageFiles = getTsFiles(pagesDir);
  for (const pageFile of pageFiles) {
    const pageName = getComponentName(pageFile);
    const pageComponent = componentMap.get(pageName);
    if (pageComponent && pageComponent.isReachable) {
      const pageChildren = extractUsedComponents(pageFile);
      for (const child of pageChildren) {
        markReachable(componentMap, child, pageName);
      }
    }
  }

  // Collect results
  const reachableComponents: string[] = [];
  const orphanedComponents: string[] = [];

  componentMap.forEach((component, name) => {
    if (name !== appName) {
      if (component.isReachable) {
        reachableComponents.push(name);
      } else {
        orphanedComponents.push(name);
      }
    }
  });

  return {
    rootComponent: appName,
    allComponents: componentMap,
    reachableComponents,
    orphanedComponents,
    totalComponents: componentMap.size - 1 // Exclude App itself
  };
}

/**
 * Finds orphaned components not reachable from any route
 */
export function findOrphanedComponents(
  componentDirs: string[],
  appFilePath: string = 'client/src/App.tsx',
  pagesDir: string = 'client/src/pages'
): OrphanedComponentInfo[] {
  const tree = buildComponentTree(appFilePath, componentDirs, pagesDir);
  
  return tree.orphanedComponents.map((name) => {
    const component = tree.allComponents.get(name);
    const dirName = component ? path.dirname(component.path).split('/').pop() : 'unknown';
    
    return {
      name,
      path: component?.path || 'unknown',
      suggestedIntegration: `Consider adding ${name} to a page in ${dirName} or importing it in a parent component`
    };
  });
}

/**
 * Generates a complete integration report
 */
export function generateIntegrationReport(
  componentDirs: string[],
  appFilePath: string = 'client/src/App.tsx',
  pagesDir: string = 'client/src/pages'
): IntegrationReport {
  const tree = buildComponentTree(appFilePath, componentDirs, pagesDir);
  const orphaned = findOrphanedComponents(componentDirs, appFilePath, pagesDir);

  return {
    componentTree: tree,
    orphanedComponents: orphaned,
    timestamp: new Date()
  };
}

/**
 * Formats integration report for console output
 */
export function formatComponentReport(report: IntegrationReport): string {
  const lines: string[] = [];
  const tree = report.componentTree;

  lines.push(`\n${'='.repeat(60)}`);
  lines.push('Component Reachability Report');
  lines.push(`${'='.repeat(60)}`);
  lines.push(`Timestamp: ${report.timestamp.toISOString()}`);
  lines.push(`Total Components: ${tree.totalComponents}`);
  lines.push(`Reachable Components: ${tree.reachableComponents.length}`);
  lines.push(`Orphaned Components: ${tree.orphanedComponents.length}`);

  if (tree.orphanedComponents.length > 0) {
    lines.push('\n❌ Orphaned Components (not reachable from any route):');
    for (const orphan of report.orphanedComponents) {
      lines.push(`\n  - ${orphan.name}`);
      lines.push(`    Path: ${orphan.path}`);
      lines.push(`    Suggestion: ${orphan.suggestedIntegration}`);
    }
  } else {
    lines.push('\n✅ All components are reachable from the main app flow!');
  }

  lines.push(`\n${'='.repeat(60)}\n`);

  return lines.join('\n');
}

/**
 * Checks if a specific component is reachable
 */
export function isComponentReachable(
  componentName: string,
  componentDirs: string[],
  appFilePath: string = 'client/src/App.tsx',
  pagesDir: string = 'client/src/pages'
): boolean {
  const tree = buildComponentTree(appFilePath, componentDirs, pagesDir);
  const component = tree.allComponents.get(componentName);
  return component?.isReachable ?? false;
}

/**
 * Gets the path from App to a specific component
 */
export function getComponentPath(
  componentName: string,
  componentDirs: string[],
  appFilePath: string = 'client/src/App.tsx',
  pagesDir: string = 'client/src/pages'
): string[] {
  const tree = buildComponentTree(appFilePath, componentDirs, pagesDir);
  const component = tree.allComponents.get(componentName);
  
  if (!component || !component.isReachable) {
    return [];
  }

  return component.reachableFrom;
}
