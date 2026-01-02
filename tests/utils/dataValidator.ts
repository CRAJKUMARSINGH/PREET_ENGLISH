/**
 * Data Validation Utilities for Hindi Learning App Testing
 * Validates data file schemas, required fields, and generates reports
 */

import { DataFileSchema, validDifficultyLevels } from '../config/testConfig';

// ============================================================================
// TYPES
// ============================================================================

export interface ValidationError {
  file: string;
  recordId: string | number;
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  totalRecords: number;
  validRecords: number;
  invalidRecords: number;
}

export interface DataFileValidationReport {
  fileName: string;
  filePath: string;
  result: ValidationResult;
  timestamp: Date;
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validates that a record has all required fields
 */
export function validateRequiredFields(
  record: Record<string, unknown>,
  requiredFields: string[],
  fileName: string,
  recordId: string | number
): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const field of requiredFields) {
    if (!(field in record)) {
      errors.push({
        file: fileName,
        recordId,
        field,
        message: `Missing required field: ${field}`,
        severity: 'error'
      });
    } else if (record[field] === null || record[field] === undefined) {
      errors.push({
        file: fileName,
        recordId,
        field,
        message: `Required field is null or undefined: ${field}`,
        severity: 'error'
      });
    } else if (typeof record[field] === 'string' && (record[field] as string).trim() === '') {
      errors.push({
        file: fileName,
        recordId,
        field,
        message: `Required field is empty string: ${field}`,
        severity: 'error'
      });
    }
  }

  return errors;
}

/**
 * Validates enum field values
 */
export function validateEnumField(
  record: Record<string, unknown>,
  field: string,
  validValues: string[],
  fileName: string,
  recordId: string | number
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (field in record && record[field] !== null && record[field] !== undefined) {
    const value = record[field] as string;
    if (!validValues.includes(value)) {
      errors.push({
        file: fileName,
        recordId,
        field,
        message: `Invalid enum value "${value}" for field ${field}. Valid values: ${validValues.join(', ')}`,
        severity: 'error'
      });
    }
  }

  return errors;
}

/**
 * Validates array fields are non-empty
 */
export function validateArrayFields(
  record: Record<string, unknown>,
  arrayFields: string[],
  fileName: string,
  recordId: string | number
): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const field of arrayFields) {
    if (field in record) {
      const value = record[field];
      if (!Array.isArray(value)) {
        errors.push({
          file: fileName,
          recordId,
          field,
          message: `Field ${field} should be an array but got ${typeof value}`,
          severity: 'error'
        });
      } else if (value.length === 0) {
        errors.push({
          file: fileName,
          recordId,
          field,
          message: `Array field ${field} is empty`,
          severity: 'warning'
        });
      }
    }
  }

  return errors;
}

/**
 * Validates difficulty field specifically
 */
export function validateDifficulty(
  record: Record<string, unknown>,
  fileName: string,
  recordId: string | number
): ValidationError[] {
  if ('difficulty' in record) {
    return validateEnumField(
      record,
      'difficulty',
      [...validDifficultyLevels],
      fileName,
      recordId
    );
  }
  return [];
}

/**
 * Validates a single record against a schema
 */
export function validateRecord(
  record: Record<string, unknown>,
  schema: DataFileSchema,
  recordId: string | number
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate required fields
  errors.push(...validateRequiredFields(record, schema.requiredFields, schema.name, recordId));

  // Validate enum fields
  if (schema.enumFields) {
    for (const enumField of schema.enumFields) {
      errors.push(...validateEnumField(record, enumField.field, enumField.validValues, schema.name, recordId));
    }
  }

  // Validate array fields
  if (schema.arrayFields) {
    errors.push(...validateArrayFields(record, schema.arrayFields, schema.name, recordId));
  }

  return errors;
}

/**
 * Validates an entire data file (array of records)
 */
export function validateDataFile(
  data: Record<string, unknown>[],
  schema: DataFileSchema
): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  let validRecords = 0;
  let invalidRecords = 0;

  // Check minimum count
  if (data.length < schema.expectedMinCount) {
    errors.push({
      file: schema.name,
      recordId: 'file',
      field: 'count',
      message: `Expected at least ${schema.expectedMinCount} records but found ${data.length}`,
      severity: 'error'
    });
  }

  // Validate each record
  for (let i = 0; i < data.length; i++) {
    const record = data[i];
    const recordId = (record.id as string | number) || i;
    const recordErrors = validateRecord(record, schema, recordId);

    const actualErrors = recordErrors.filter(e => e.severity === 'error');
    const actualWarnings = recordErrors.filter(e => e.severity === 'warning');

    errors.push(...actualErrors);
    warnings.push(...actualWarnings);

    if (actualErrors.length === 0) {
      validRecords++;
    } else {
      invalidRecords++;
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    totalRecords: data.length,
    validRecords,
    invalidRecords
  };
}

/**
 * Generates a validation report for a data file
 */
export function generateValidationReport(
  fileName: string,
  filePath: string,
  result: ValidationResult
): DataFileValidationReport {
  return {
    fileName,
    filePath,
    result,
    timestamp: new Date()
  };
}

/**
 * Formats validation report as string for console output
 */
export function formatValidationReport(report: DataFileValidationReport): string {
  const lines: string[] = [];
  
  lines.push(`\n${'='.repeat(60)}`);
  lines.push(`Validation Report: ${report.fileName}`);
  lines.push(`${'='.repeat(60)}`);
  lines.push(`File: ${report.filePath}`);
  lines.push(`Timestamp: ${report.timestamp.toISOString()}`);
  lines.push(`Status: ${report.result.isValid ? '✅ VALID' : '❌ INVALID'}`);
  lines.push(`Total Records: ${report.result.totalRecords}`);
  lines.push(`Valid Records: ${report.result.validRecords}`);
  lines.push(`Invalid Records: ${report.result.invalidRecords}`);
  
  if (report.result.errors.length > 0) {
    lines.push(`\nErrors (${report.result.errors.length}):`);
    for (const error of report.result.errors) {
      lines.push(`  ❌ [${error.recordId}] ${error.field}: ${error.message}`);
    }
  }
  
  if (report.result.warnings.length > 0) {
    lines.push(`\nWarnings (${report.result.warnings.length}):`);
    for (const warning of report.result.warnings) {
      lines.push(`  ⚠️ [${warning.recordId}] ${warning.field}: ${warning.message}`);
    }
  }
  
  lines.push(`${'='.repeat(60)}\n`);
  
  return lines.join('\n');
}

/**
 * Validates unique IDs in a data array
 */
export function validateUniqueIds(
  data: Record<string, unknown>[],
  fileName: string
): ValidationError[] {
  const errors: ValidationError[] = [];
  const seenIds = new Set<string | number>();

  for (const record of data) {
    if ('id' in record) {
      const id = record.id as string | number;
      if (seenIds.has(id)) {
        errors.push({
          file: fileName,
          recordId: id,
          field: 'id',
          message: `Duplicate ID found: ${id}`,
          severity: 'error'
        });
      }
      seenIds.add(id);
    }
  }

  return errors;
}

/**
 * Validates category values are non-empty strings
 */
export function validateCategories(
  data: Record<string, unknown>[],
  fileName: string
): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const record of data) {
    const recordId = (record.id as string | number) || 'unknown';
    if ('category' in record) {
      const category = record.category;
      if (typeof category !== 'string') {
        errors.push({
          file: fileName,
          recordId,
          field: 'category',
          message: `Category should be a string but got ${typeof category}`,
          severity: 'error'
        });
      } else if (category.trim() === '') {
        errors.push({
          file: fileName,
          recordId,
          field: 'category',
          message: 'Category is an empty string',
          severity: 'error'
        });
      }
    }
  }

  return errors;
}

/**
 * Extracts all unique categories from a data array
 */
export function extractCategories(data: Record<string, unknown>[]): string[] {
  const categories = new Set<string>();
  
  for (const record of data) {
    if ('category' in record && typeof record.category === 'string') {
      categories.add(record.category);
    }
  }
  
  return Array.from(categories).sort();
}

/**
 * Extracts all unique difficulty levels from a data array
 */
export function extractDifficultyLevels(data: Record<string, unknown>[]): string[] {
  const difficulties = new Set<string>();
  
  for (const record of data) {
    if ('difficulty' in record && typeof record.difficulty === 'string') {
      difficulties.add(record.difficulty);
    }
  }
  
  return Array.from(difficulties).sort();
}
