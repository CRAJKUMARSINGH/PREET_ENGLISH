/**
 * Data validation utilities for tests
 */

export interface ValidationError {
  field: string;
  message: string;
  item?: any;
}

export const validateRequiredFields = (
  data: Record<string, unknown>[] | Record<string, unknown>,
  requiredFields: string[],
  dataName: string
): ValidationError[] => {
  const errors: ValidationError[] = [];
  const items = Array.isArray(data) ? data : [data];

  items.forEach((item, index) => {
    requiredFields.forEach(field => {
      if (!(field in item) || item[field] === undefined || item[field] === null) {
        errors.push({
          field,
          message: `Missing required field '${field}' in ${dataName}[${index}]`,
          item
        });
      }
    });
  });

  return errors;
};

export const validateCategories = (
  data: Record<string, unknown>[],
  dataName: string
): ValidationError[] => {
  const errors: ValidationError[] = [];

  data.forEach((item, index) => {
    if (!item.category || typeof item.category !== 'string' || item.category.trim().length === 0) {
      errors.push({
        field: 'category',
        message: `Invalid category in ${dataName}[${index}]`,
        item
      });
    }
  });

  return errors;
};

export const validateUniqueIds = (
  data: Record<string, unknown>[],
  dataName: string
): ValidationError[] => {
  const errors: ValidationError[] = [];
  const seenIds = new Set();

  data.forEach((item, index) => {
    const id = item.id;
    if (seenIds.has(id)) {
      errors.push({
        field: 'id',
        message: `Duplicate ID '${id}' found in ${dataName}[${index}]`,
        item
      });
    } else {
      seenIds.add(id);
    }
  });

  return errors;
};

export const extractCategories = (data: Record<string, unknown>[]): string[] => {
  const categories = new Set<string>();
  
  data.forEach(item => {
    if (item.category && typeof item.category === 'string') {
      categories.add(item.category);
    }
  });

  return Array.from(categories);
};

export const validateDifficulty = (
  item: Record<string, unknown>,
  dataName: string,
  recordId: string | number
): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  const validDifficulties = ['beginner', 'intermediate', 'advanced'];
  const difficulty = item.difficulty;
  
  if (!difficulty || typeof difficulty !== 'string') {
    errors.push({
      field: 'difficulty',
      message: `Missing or invalid difficulty field in ${dataName}[${recordId}]`,
      item
    });
  } else if (!validDifficulties.includes(difficulty.toLowerCase())) {
    errors.push({
      field: 'difficulty',
      message: `Invalid difficulty '${difficulty}' in ${dataName}[${recordId}]. Must be one of: ${validDifficulties.join(', ')}`,
      item
    });
  }
  
  return errors;
};

export const extractDifficultyLevels = (data: Record<string, unknown>[]): string[] => {
  const difficulties = new Set<string>();
  
  data.forEach(item => {
    if (item.difficulty && typeof item.difficulty === 'string') {
      difficulties.add(item.difficulty.toLowerCase());
    }
  });

  return Array.from(difficulties);
};

export const validateArrayFields = (
  data: Record<string, unknown>[],
  arrayFields: string[],
  dataName: string
): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  data.forEach((item, index) => {
    arrayFields.forEach(field => {
      if (field in item && !Array.isArray(item[field])) {
        errors.push({
          field,
          message: `Field '${field}' should be an array in ${dataName}[${index}]`,
          item
        });
      }
    });
  });
  
  return errors;
};