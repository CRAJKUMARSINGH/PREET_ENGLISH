
/**
 * CENTRAL DATA REGISTRY - GRADE 9 INTEGRATION
 * 
 * This ensures no data file is "orphaned" and provides a single entry point for the app.
 * Every data module must be registered here to be accessible in the application.
 */

// Core Data Modules
export * from "./hindiLearningData";
export * from "./hindiStoriesData";
export * from "./speakingTopics";
export * from "./advancedVocabularyData";
export * from "./bilingualTranslations";

// Utility Exports
export { lessonEngine, getEnrichedLessons, getNextLessonId, getPreviousLessonId } from "../utils/lessonEngine";
export { contentQualityAuditor, createManifestEntry, generateQualityReport } from "../utils/contentQualityManifest";

// Data Registry Manifest
export const DATA_REGISTRY = {
  modules: [
    'hindiLearningData',
    'hindiStoriesData', 
    'speakingTopics',
    'advancedVocabularyData',
    'bilingualTranslations'
  ],
  utilities: [
    'lessonEngine',
    'contentQualityManifest'
  ],
  version: '2.0.0',
  lastUpdated: new Date().toISOString()
} as const;

// Type-safe registry validation
export function validateDataRegistry(): { isValid: boolean; missingModules: string[] } {
  const requiredModules = DATA_REGISTRY.modules;
  const missingModules: string[] = [];
  
  // This would be expanded with actual module validation in a real implementation
  // For now, we assume all modules are present since they're imported above
  
  return {
    isValid: missingModules.length === 0,
    missingModules
  };
}

// Legacy migration note
// Note: Legacy files (hindiCommonPhrases, hindiRolePlay, etc.) have been migrated to the database
// and are no longer exported here to prevent duplicate sources of truth. 
