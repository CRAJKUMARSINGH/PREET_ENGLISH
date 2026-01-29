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