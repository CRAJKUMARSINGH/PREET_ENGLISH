/**
 * Safe localStorage wrapper with error handling
 * Handles quota exceeded, private browsing, and other storage exceptions
 */

export const safeLocalStorage = {
  /**
   * Safely get item from localStorage
   * @returns string value or null if not found/error
   */
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn(`localStorage.getItem failed for "${key}":`, error);
      return null;
    }
  },

  /**
   * Safely set item in localStorage
   * @returns true if successful, false if failed
   */
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.warn(`localStorage.setItem failed for "${key}":`, error);
      // Common errors: QuotaExceededError, SecurityError (private browsing)
      return false;
    }
  },

  /**
   * Safely remove item from localStorage
   */
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`localStorage.removeItem failed for "${key}":`, error);
    }
  },

  /**
   * Safely clear all localStorage
   */
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn('localStorage.clear failed:', error);
    }
  },

  /**
   * Get and parse JSON from localStorage
   * @returns parsed object or null if not found/invalid
   */
  getJSON: <T = any>(key: string): T | null => {
    const value = safeLocalStorage.getItem(key);
    if (!value) return null;

    try {
      return JSON.parse(value) as T;
    } catch (error) {
      console.warn(`Failed to parse JSON for "${key}":`, error);
      // Clear corrupted data
      safeLocalStorage.removeItem(key);
      return null;
    }
  },

  /**
   * Stringify and set JSON in localStorage
   * @returns true if successful, false if failed
   */
  setJSON: <T = any>(key: string, value: T): boolean => {
    try {
      const jsonString = JSON.stringify(value);
      return safeLocalStorage.setItem(key, jsonString);
    } catch (error) {
      console.warn(`Failed to stringify JSON for "${key}":`, error);
      return false;
    }
  },

  /**
   * Check if localStorage is available
   */
  isAvailable: (): boolean => {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }
};

export default safeLocalStorage;
