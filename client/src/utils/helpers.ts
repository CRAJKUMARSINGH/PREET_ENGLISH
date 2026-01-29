/**
 * Helper utilities for PREET_ENGLISH
 */

// String helper functions
export const extractVowels = (str: string): string => {
  // Include \s to preserve spaces between vowels
  return str.match(/[aeiouAEIOU\s]/g)?.join('') || '';
};

export const reverseString = (str: string): string => {
  return str.split('').reverse().join('');
};

export const countSubstring = (str: string, substring: string): number => {
  return (str.match(new RegExp(substring, 'g')) || []).length;
};

export const isPalindrome = (str: string): boolean => {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
};

export const removeDuplicateChars = (str: string): string => {
  return [...new Set(str)].join('');
};

export const getCharFrequency = (str: string): Record<string, number> => {
  return str.split('').reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

export const findLongestWord = (str: string): string => {
  const words = str.split(/\s+/);
  return words.reduce((longest, word) => 
    word.length > longest.length ? word : longest, '');
};

export const capitalizeWords = (str: string): string => {
  return str.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};

export const removeVowels = (str: string): string => {
  return str.replace(/[aeiouAEIOU]/g, '');
};

export const countWords = (str: string): number => {
  return str.trim().split(/\s+/).filter(Boolean).length;
};

export const generateRandomString = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export const unescapeHtml = (str: string): string => {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&');
};

export const isNumeric = (str: string): boolean => {
  return /^\d+$/.test(str) && str !== '';
};

export const toCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, g => g[1].toUpperCase());
};

export const toKebabCase = (str: string): string => {
  return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`).replace(/^-/, '');
};

// Array helper functions
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const removeDuplicates = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const flattenArray = <T>(array: (T | T[])[]): T[] => {
  return array.flat(Infinity) as T[];
};

export const arrayIntersection = <T>(arr1: T[], arr2: T[]): T[] => {
  return arr1.filter(x => arr2.includes(x));
};

export const arrayDifference = <T>(arr1: T[], arr2: T[]): T[] => {
  return arr1.filter(x => !arr2.includes(x));
};

export const groupBy = <T, K extends keyof T>(array: T[], key: K): Record<string, T[]> => {
  return array.reduce((acc, item) => {
    const groupKey = String(item[key]);
    (acc[groupKey] = acc[groupKey] || []).push(item);
    return acc;
  }, {} as Record<string, T[]>);
};

export const range = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export const partition = <T>(array: T[], predicate: (item: T) => boolean): [T[], T[]] => {
  return [
    array.filter(predicate),
    array.filter(item => !predicate(item))
  ];
};

export const sum = (numbers: number[]): number => {
  return numbers.reduce((acc, curr) => acc + curr, 0);
};

export const average = (numbers: number[]): number => {
  return numbers.length > 0 ? sum(numbers) / numbers.length : 0;
};

export const rotateArray = <T>(array: T[], positions: number = 1): T[] => {
  const len = array.length;
  const actualPositions = ((positions % len) + len) % len;
  return [...array.slice(actualPositions), ...array.slice(0, actualPositions)];
};

export const zipArrays = <T, U>(arr1: T[], arr2: U[]): [T, U][] => {
  return arr1.map((item, index) => [item, arr2[index]]);
};

export const uniqueBy = <T, K>(array: T[], keyFn: (item: T) => K): T[] => {
  const seen = new Set<K>();
  return array.filter(item => {
    const key = keyFn(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

// Object helper functions
export const deepMerge = (target: any, source: any): any => {
  const result = { ...target };
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
};

export const getNestedProperty = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

export const setNestedProperty = (obj: any, path: string, value: any): void => {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
};

export const filterObject = <T>(obj: Record<string, T>, predicate: (key: string, value: T) => boolean): Record<string, T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => predicate(key, value))
  );
};

export const mapObject = <T, U>(obj: Record<string, T>, mapper: (key: string, value: T) => U): Record<string, U> => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, mapper(key, value)])
  );
};

export const swapKeysValues = <T extends string | number>(obj: Record<string, T>): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [String(value), key])
  );
};

export const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => keys.includes(key as K))
  ) as Pick<T, K>;
};

export const omit = <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as K))
  ) as Omit<T, K>;
};

export const deepFreeze = <T>(obj: T): T => {
  Object.getOwnPropertyNames(obj).forEach(prop => {
    const value = (obj as any)[prop];
    if (value !== null && typeof value === 'object') {
      deepFreeze(value);
    }
  });
  return Object.freeze(obj);
};

export const withDefaults = <T>(provided: Partial<T>, defaults: T): T => {
  return { ...defaults, ...provided };
};

export const transformKeys = <T>(obj: Record<string, T>, transformer: (key: string) => string): Record<string, T> => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [transformer(key), value])
  );
};

export const flattenObject = (obj: any, prefix = ''): Record<string, any> => {
  const flattened: Record<string, any> = {};
  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(flattened, flattenObject(value, newKey));
    } else {
      flattened[newKey] = value;
    }
  }
  return flattened;
};

export const isEmpty = (obj: any): boolean => {
  return Object.keys(obj).length === 0;
};

export const invertObject = <T extends string | number>(obj: Record<string, T>): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [String(value), key])
  );
};

export const sortObjectKeys = <T>(obj: Record<string, T>): Record<string, T> => {
  return Object.keys(obj).sort().reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {} as Record<string, T>);
};

export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};