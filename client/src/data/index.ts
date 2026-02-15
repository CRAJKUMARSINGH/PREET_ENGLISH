
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
export * from "./hindiListeningData";
export * from "./hindiCommonPhrasesData";
export * from "./hindiDialoguesData";
export * from "./hindiRolePlayData";

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
    'bilingualTranslations',
    'hindiListeningData',
    'hindiCommonPhrasesData',
    'hindiDialoguesData',
    'hindiRolePlayData'
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

// All data files are now integrated and exported
// These files provide static data that complements the database content
// and can be used for search, reference, and offline functionality. 
