// Central Registry for all Static Data Modules
// This ensures no data file is "orphaned" and provides a single entry point for the app.
export * from "./hindiLearningData";
export * from "./hindiStoriesData";
export * from "./speakingTopics";
export * from "./advancedVocabularyData";
// Note: Legacy files (hindiCommonPhrases, hindiRolePlay, etc.) have been migrated to the database
// and are no longer exported here to prevent duplicate sources of truth. 
