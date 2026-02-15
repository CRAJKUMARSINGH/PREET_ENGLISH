/**
 * Storage utilities for PREET_ENGLISH
 */

export class StorageManager {
  private prefix: string;

  constructor(prefix = 'preet_english_') {
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  // LocalStorage methods
  set(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(this.getKey(key), serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      throw error; // Re-throw for test expectations
    }
  }

  get<T>(key: string, defaultValue?: T): T | null {
    // First check if it's a TTL key
    const ttlItem = localStorage.getItem(this.getKey(key + '_ttl'));
    if (ttlItem) {
      try {
        const item = JSON.parse(ttlItem);
        const now = new Date();
        
        if (now.getTime() > item.expiry) {
          localStorage.removeItem(this.getKey(key + '_ttl'));
          return defaultValue !== undefined ? defaultValue : null;
        }
        
        return item.value;
      } catch (error) {
        // Fall through to regular get
      }
    }

    // Regular get
    try {
      const item = localStorage.getItem(this.getKey(key));
      if (item === null) {
        return defaultValue !== undefined ? defaultValue : null;
      }
      const parsed = JSON.parse(item);
      return parsed;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw error; // Re-throw for test expectations
    }
  }

  remove(key: string): void {
    localStorage.removeItem(this.getKey(key));
  }

  has(key: string): boolean {
    return localStorage.getItem(this.getKey(key)) !== null;
  }

  clear(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }

  keys(): string[] {
    const keys = Object.keys(localStorage);
    return keys
      .filter(key => key.startsWith(this.prefix))
      .map(key => key.substring(this.prefix.length));
  }

  getSize(key: string): number {
    const item = localStorage.getItem(this.getKey(key));
    return item ? item.length : 0;
  }

  getTotalSize(): number {
    let totalSize = 0;
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        const item = localStorage.getItem(key);
        if (item) {
          totalSize += item.length;
        }
      }
    });
    return totalSize;
  }

  // SessionStorage methods
  setSession(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      sessionStorage.setItem(this.getKey(key), serializedValue);
    } catch (error) {
      console.error('Error saving to sessionStorage:', error);
    }
  }

  getSession<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = sessionStorage.getItem(this.getKey(key));
      if (item === null) {
        return defaultValue !== undefined ? defaultValue : null;
      }
      return JSON.parse(item);
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return defaultValue !== undefined ? defaultValue : null;
    }
  }

  removeSession(key: string): void {
    sessionStorage.removeItem(this.getKey(key));
  }

  hasSession(key: string): boolean {
    return sessionStorage.getItem(this.getKey(key)) !== null;
  }

  clearSession(): void {
    const keys = Object.keys(sessionStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        sessionStorage.removeItem(key);
      }
    });
  }

  getSessionKeys(): string[] {
    const keys = Object.keys(sessionStorage);
    return keys
      .filter(key => key.startsWith(this.prefix))
      .map(key => key.substring(this.prefix.length));
  }

  // Cross-storage methods
  setBoth(key: string, value: any): void {
    this.set(key, value);
    this.setSession(key, value);
  }

  removeBoth(key: string): void {
    this.remove(key);
    this.removeSession(key);
  }

  syncToSession(localKey: string, sessionKey: string): void {
    const value = this.get(localKey);
    if (value !== null) {
      this.setSession(sessionKey, value);
    }
  }

  syncToLocal(sessionKey: string, localKey: string): void {
    const value = this.getSession(sessionKey);
    if (value !== null) {
      this.set(localKey, value);
    }
  }

  // Utility methods
  isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  isSessionStorageAvailable(): boolean {
    try {
      const test = '__sessionStorage_test__';
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  exportAll(): { local: Record<string, any>; session: Record<string, any> } {
    const localData: Record<string, any> = {};
    const sessionData: Record<string, any> = {};

    // Export localStorage
    const localKeys = Object.keys(localStorage);
    localKeys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        const cleanKey = key.substring(this.prefix.length);
        localData[cleanKey] = this.get(cleanKey);
      }
    });

    // Export sessionStorage
    const sessionKeys = Object.keys(sessionStorage);
    sessionKeys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        const cleanKey = key.substring(this.prefix.length);
        sessionData[cleanKey] = this.getSession(cleanKey);
      }
    });

    return { local: localData, session: sessionData };
  }

  importAll(data: { local?: Record<string, any>; session?: Record<string, any> }): void {
    if (data.local) {
      Object.entries(data.local).forEach(([key, value]) => {
        this.set(key, value);
      });
    }

    if (data.session) {
      Object.entries(data.session).forEach(([key, value]) => {
        this.setSession(key, value);
      });
    }
  }

  backup(): { local: Record<string, any>; session: Record<string, any> } {
    return this.exportAll();
  }

  restore(backup: { local?: Record<string, any>; session?: Record<string, any> }): void {
    this.clear();
    this.clearSession();
    this.importAll(backup);
  }

  // TTL (Time To Live) methods
  setWithExpiry(key: string, value: any, ttlMs: number): void {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttlMs,
    };
    localStorage.setItem(this.getKey(key + '_ttl'), JSON.stringify(item));
  }

  getWithExpiry<T>(key: string, defaultValue?: T): T | null {
    const itemStr = localStorage.getItem(this.getKey(key + '_ttl'));
    if (!itemStr) {
      return defaultValue !== undefined ? defaultValue : null;
    }

    try {
      const item = JSON.parse(itemStr);
      const now = new Date();
      
      if (now.getTime() > item.expiry) {
        localStorage.removeItem(this.getKey(key + '_ttl'));
        return defaultValue !== undefined ? defaultValue : null;
      }
      
      return item.value;
    } catch (error) {
      console.error('Error reading expired item from localStorage:', error);
      return defaultValue !== undefined ? defaultValue : null;
    }
  }

  cleanExpired(): void {
    const keys = this.keys();
    keys.forEach(key => {
      this.getWithExpiry(key); // This will remove expired items
    });
  }

  // Event handling
  onStorageChange(callback: (key: string, newValue: any, oldValue: any) => void): void {
    window.addEventListener('storage', (e) => {
      if (e.key && e.key.startsWith(this.prefix)) {
        const cleanKey = e.key.substring(this.prefix.length);
        const newValue = e.newValue ? JSON.parse(e.newValue) : null;
        const oldValue = e.oldValue ? JSON.parse(e.oldValue) : null;
        callback(cleanKey, newValue, oldValue);
      }
    });
  }

  // Legacy methods for backward compatibility
  setItem(key: string, value: any): void {
    this.set(key, value);
  }

  getItem<T>(key: string, defaultValue?: T): T | null {
    return this.get(key, defaultValue);
  }

  removeItem(key: string): void {
    this.remove(key);
  }

  exists(key: string): boolean {
    return this.has(key);
  }
}

// Default instance
export const storage = new StorageManager();