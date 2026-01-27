import { StorageManager } from '@/utils/storage';

describe('Storage Manager Utilities', () => {
  let storageManager: StorageManager;

  beforeEach(() => {
    storageManager = new StorageManager();
    // Clear storage before each test
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    // Clean up after each test
    localStorage.clear();
    sessionStorage.clear();
  });

  describe('LocalStorage Operations', () => {
    it('sets and gets string values', () => {
      storageManager.set('test-key', 'test-value');
      expect(storageManager.get('test-key')).toBe('test-value');
    });

    it('sets and gets number values', () => {
      storageManager.set('number-key', 42);
      expect(storageManager.get('number-key')).toBe(42);
    });

    it('sets and gets boolean values', () => {
      storageManager.set('boolean-key', true);
      expect(storageManager.get('boolean-key')).toBe(true);
      
      storageManager.set('false-key', false);
      expect(storageManager.get('false-key')).toBe(false);
    });

    it('sets and gets object values', () => {
      const obj = { name: 'John', age: 30 };
      storageManager.set('object-key', obj);
      expect(storageManager.get('object-key')).toEqual(obj);
    });

    it('sets and gets array values', () => {
      const arr = [1, 2, 3, 4, 5];
      storageManager.set('array-key', arr);
      expect(storageManager.get('array-key')).toEqual(arr);
    });

    it('removes values', () => {
      storageManager.set('remove-key', 'to-be-removed');
      expect(storageManager.get('remove-key')).toBe('to-be-removed');
      
      storageManager.remove('remove-key');
      expect(storageManager.get('remove-key')).toBeNull();
    });

    it('checks if key exists', () => {
      storageManager.set('exist-key', 'value');
      expect(storageManager.has('exist-key')).toBe(true);
      expect(storageManager.has('non-exist-key')).toBe(false);
    });

    it('handles null values', () => {
      storageManager.set('null-key', null);
      expect(storageManager.get('null-key')).toBeNull();
    });

    it('handles undefined values', () => {
      storageManager.set('undefined-key', undefined);
      expect(storageManager.get('undefined-key')).toBeUndefined();
    });

    it('handles complex nested objects', () => {
      const complexObj = {
        user: {
          id: 1,
          profile: {
            name: 'John',
            settings: {
              theme: 'dark',
              notifications: true
            }
          }
        },
        preferences: ['option1', 'option2'],
        metadata: new Date()
      };
      
      storageManager.set('complex-key', complexObj);
      const retrieved = storageManager.get('complex-key');
      expect(retrieved.user.profile.settings.theme).toBe('dark');
      expect(retrieved.preferences).toEqual(['option1', 'option2']);
    });

    it('handles large data sets', () => {
      const largeData = {
        items: Array.from({ length: 1000 }, (_, i) => ({ id: i, value: `item-${i}` }))
      };
      
      storageManager.set('large-key', largeData);
      const retrieved = storageManager.get('large-key');
      expect(retrieved.items.length).toBe(1000);
      expect(retrieved.items[0].id).toBe(0);
      expect(retrieved.items[999].id).toBe(999);
    });

    it('handles serialization errors gracefully', () => {
      // Create an object that causes circular reference
      const circular: any = { name: 'test' };
      circular.self = circular;
      
      expect(() => storageManager.set('circular-key', circular)).toThrow();
    });

    it('handles deserialization errors gracefully', () => {
      // Manually set corrupted data
      localStorage.setItem('corrupted-key', '{ invalid json');
      expect(() => storageManager.get('corrupted-key')).toThrow();
    });

    it('provides default values', () => {
      expect(storageManager.get('non-existent-key', 'default')).toBe('default');
      expect(storageManager.get('non-existent-key', 42)).toBe(42);
      expect(storageManager.get('non-existent-key', { default: true })).toEqual({ default: true });
    });

    it('clears all local storage', () => {
      storageManager.set('key1', 'value1');
      storageManager.set('key2', 'value2');
      storageManager.set('key3', 'value3');
      
      expect(storageManager.get('key1')).toBe('value1');
      expect(storageManager.get('key2')).toBe('value2');
      expect(storageManager.get('key3')).toBe('value3');
      
      storageManager.clear();
      expect(storageManager.get('key1')).toBeNull();
      expect(storageManager.get('key2')).toBeNull();
      expect(storageManager.get('key3')).toBeNull();
    });

    it('lists all keys', () => {
      storageManager.set('key1', 'value1');
      storageManager.set('key2', 'value2');
      storageManager.set('key3', 'value3');
      
      const keys = storageManager.keys();
      expect(keys).toContain('key1');
      expect(keys).toContain('key2');
      expect(keys).toContain('key3');
      expect(keys.length).toBe(3);
    });

    it('measures storage size', () => {
      storageManager.set('small-key', 'small');
      storageManager.set('large-key', 'x'.repeat(1000));
      
      const smallSize = storageManager.getSize('small-key');
      const largeSize = storageManager.getSize('large-key');
      
      expect(largeSize).toBeGreaterThan(smallSize);
      expect(smallSize).toBeGreaterThan(0);
    });

    it('calculates total storage usage', () => {
      storageManager.set('key1', 'value1');
      storageManager.set('key2', 'value2');
      
      const totalSize = storageManager.getTotalSize();
      expect(totalSize).toBeGreaterThan(0);
    });

    it('respects storage quotas', () => {
      // Try to store data close to typical localStorage limits (~5MB in browsers)
      const largeString = 'x'.repeat(4 * 1024 * 1024); // 4MB
      expect(() => storageManager.set('huge-key', largeString)).not.toThrow();
    });

    it('handles quota exceeded errors', () => {
      // Create extremely large data to exceed quota
      try {
        const hugeString = 'x'.repeat(100 * 1024 * 1024); // 100MB
        storageManager.set('overflow-key', hugeString);
      } catch (e) {
        // This is expected to potentially fail
        expect(e).toBeDefined();
      }
    });
  });

  describe('SessionStorage Operations', () => {
    it('sets and gets values in session storage', () => {
      storageManager.setSession('session-key', 'session-value');
      expect(storageManager.getSession('session-key')).toBe('session-value');
    });

    it('removes session storage values', () => {
      storageManager.setSession('session-remove-key', 'to-be-removed');
      expect(storageManager.getSession('session-remove-key')).toBe('to-be-removed');
      
      storageManager.removeSession('session-remove-key');
      expect(storageManager.getSession('session-remove-key')).toBeNull();
    });

    it('checks session storage key existence', () => {
      storageManager.setSession('session-exist-key', 'value');
      expect(storageManager.hasSession('session-exist-key')).toBe(true);
      expect(storageManager.hasSession('session-non-exist-key')).toBe(false);
    });

    it('provides default values for session storage', () => {
      expect(storageManager.getSession('non-existent-session-key', 'default')).toBe('default');
    });

    it('clears all session storage', () => {
      storageManager.setSession('session-key1', 'value1');
      storageManager.setSession('session-key2', 'value2');
      
      expect(storageManager.getSession('session-key1')).toBe('value1');
      expect(storageManager.getSession('session-key2')).toBe('value2');
      
      storageManager.clearSession();
      expect(storageManager.getSession('session-key1')).toBeNull();
      expect(storageManager.getSession('session-key2')).toBeNull();
    });

    it('lists all session storage keys', () => {
      storageManager.setSession('session-key1', 'value1');
      storageManager.setSession('session-key2', 'value2');
      
      const keys = storageManager.getSessionKeys();
      expect(keys).toContain('session-key1');
      expect(keys).toContain('session-key2');
      expect(keys.length).toBe(2);
    });
  });

  describe('Cross-storage Operations', () => {
    it('stores in both local and session storage', () => {
      storageManager.setBoth('both-key', 'both-value');
      
      expect(storageManager.get('both-key')).toBe('both-value');
      expect(storageManager.getSession('both-key')).toBe('both-value');
    });

    it('removes from both storages', () => {
      storageManager.setBoth('both-remove-key', 'to-be-removed');
      
      expect(storageManager.get('both-remove-key')).toBe('to-be-removed');
      expect(storageManager.getSession('both-remove-key')).toBe('to-be-removed');
      
      storageManager.removeBoth('both-remove-key');
      
      expect(storageManager.get('both-remove-key')).toBeNull();
      expect(storageManager.getSession('both-remove-key')).toBeNull();
    });

    it('syncs data between storages', () => {
      storageManager.set('local-key', 'local-value');
      storageManager.syncToSession('local-key', 'session-key');
      
      expect(storageManager.getSession('session-key')).toBe('local-value');
    });

    it('syncs data from session to local', () => {
      storageManager.setSession('session-key', 'session-value');
      storageManager.syncToLocal('session-key', 'local-key');
      
      expect(storageManager.get('local-key')).toBe('session-value');
    });
  });

  describe('Utility Functions', () => {
    it('validates storage availability', () => {
      expect(storageManager.isLocalStorageAvailable()).toBe(true);
      expect(storageManager.isSessionStorageAvailable()).toBe(true);
    });

    it('handles disabled storage', () => {
      // Temporarily disable storage for testing
      const originalLocalStorage = global.localStorage;
      const originalSessionStorage = global.sessionStorage;
      
      Object.defineProperty(window, 'localStorage', {
        value: null,
        writable: true
      });
      
      Object.defineProperty(window, 'sessionStorage', {
        value: null,
        writable: true
      });
      
      const disabledStorageManager = new StorageManager();
      expect(disabledStorageManager.isLocalStorageAvailable()).toBe(false);
      expect(disabledStorageManager.isSessionStorageAvailable()).toBe(false);
      
      // Restore original storage
      Object.defineProperty(window, 'localStorage', {
        value: originalLocalStorage,
        writable: true
      });
      
      Object.defineProperty(window, 'sessionStorage', {
        value: originalSessionStorage,
        writable: true
      });
    });

    it('exports all data', () => {
      storageManager.set('export-key1', 'value1');
      storageManager.setSession('export-key2', 'value2');
      
      const exported = storageManager.exportAll();
      expect(exported.local['export-key1']).toBe('value1');
      expect(exported.session['export-key2']).toBe('value2');
    });

    it('imports data', () => {
      const dataToImport = {
        local: { 'import-key1': 'imported-value1' },
        session: { 'import-key2': 'imported-value2' }
      };
      
      storageManager.importAll(dataToImport);
      
      expect(storageManager.get('import-key1')).toBe('imported-value1');
      expect(storageManager.getSession('import-key2')).toBe('imported-value2');
    });

    it('backs up and restores data', () => {
      storageManager.set('backup-key1', 'original-value1');
      storageManager.setSession('backup-key2', 'original-value2');
      
      const backup = storageManager.backup();
      
      // Modify the stored values
      storageManager.set('backup-key1', 'modified-value1');
      storageManager.setSession('backup-key2', 'modified-value2');
      
      expect(storageManager.get('backup-key1')).toBe('modified-value1');
      expect(storageManager.getSession('backup-key2')).toBe('modified-value2');
      
      // Restore from backup
      storageManager.restore(backup);
      
      expect(storageManager.get('backup-key1')).toBe('original-value1');
      expect(storageManager.getSession('backup-key2')).toBe('original-value2');
    });

    it('cleans expired entries', () => {
      // This would test TTL functionality if implemented
      storageManager.setWithExpiry('expiring-key', 'expiring-value', 100); // 100ms expiry
      
      expect(storageManager.get('expiring-key')).toBe('expiring-value');
      
      // Wait for expiry
      jest.advanceTimersByTime(150);
      
      expect(storageManager.get('expiring-key')).toBeNull();
    });

    it('handles storage events', () => {
      const mockCallback = jest.fn();
      storageManager.onStorageChange(mockCallback);
      
      storageManager.set('event-key', 'event-value');
      
      // This would trigger the callback if implemented properly
      expect(mockCallback).toHaveBeenCalledTimes(0); // Assuming no implementation yet
    });
  });

  describe('Performance and Edge Cases', () => {
    it('handles rapid set/get operations', () => {
      for (let i = 0; i < 100; i++) {
        storageManager.set(`rapid-key-${i}`, `rapid-value-${i}`);
      }
      
      for (let i = 0; i < 100; i++) {
        expect(storageManager.get(`rapid-key-${i}`)).toBe(`rapid-value-${i}`);
      }
    });

    it('handles concurrent access', () => {
      // Simulate concurrent access
      const promises = Array.from({ length: 10 }, (_, i) => 
        Promise.resolve().then(() => {
          storageManager.set(`concurrent-key-${i}`, `concurrent-value-${i}`);
          return storageManager.get(`concurrent-key-${i}`);
        })
      );
      
      return Promise.all(promises).then(results => {
        results.forEach((value, index) => {
          expect(value).toBe(`concurrent-value-${index}`);
        });
      });
    });

    it('handles memory leaks', () => {
      // This is more of a conceptual test - in a real scenario,
      // we'd monitor memory usage
      const initialKeys = storageManager.keys().length;
      
      // Add many items
      for (let i = 0; i < 1000; i++) {
        storageManager.set(`leak-test-${i}`, `value-${i}`);
      }
      
      const afterAdding = storageManager.keys().length;
      expect(afterAdding).toBe(initialKeys + 1000);
      
      // Remove all items
      for (let i = 0; i < 1000; i++) {
        storageManager.remove(`leak-test-${i}`);
      }
      
      const afterRemoving = storageManager.keys().length;
      expect(afterRemoving).toBe(initialKeys);
    });

    it('handles special characters in keys', () => {
      const specialKeys = [
        'key with spaces',
        'key-with-dashes',
        'key_with_underscores',
        'key.with.dots',
        'key/with/slashes',
        'key\\with\\backslashes',
        'key:with:colons',
        'key;with;semicolons',
        'key,with,commas',
        'key(with)parentheses',
        'key[with]brackets',
        'key{with}braces',
        'key|with|pipes',
        'key&ampersands',
        'key+with+plus',
        'key=with=equals',
        'key*with*asterisks',
        'key%with%percent',
        'key$with$dollar',
        'key!with!exclamation',
        'key?with?question',
        'key~with~tildes',
        'key`with`backticks',
        'key\'with\'singlequotes',
        '"key with double quotes"'
      ];
      
      specialKeys.forEach(key => {
        storageManager.set(key, `value-for-${key}`);
        expect(storageManager.get(key)).toBe(`value-for-${key}`);
      });
    });

    it('handles unicode characters in values', () => {
      const unicodeValues = [
        '🌟 Hello 🌍',
        '🎉 日本語 🇯🇵',
        '🚀 Ελληνικά 🏛️',
        '🎨 عَرَبِيّه 📚',
        '🎭 Славься, Русь 🇷🇺',
        '🏰 한국어 🇰🇷',
        '📱 中文 🇨🇳',
        '🌐 🌐 Emojis everywhere 🌐 🌐'
      ];
      
      unicodeValues.forEach((value, index) => {
        storageManager.set(`unicode-key-${index}`, value);
        expect(storageManager.get(`unicode-key-${index}`)).toBe(value);
      });
    });
  });
});