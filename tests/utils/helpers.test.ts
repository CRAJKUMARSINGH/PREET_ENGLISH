// Generic helper function tests

describe('Helper Functions', () => {
  // Array helper tests
  describe('Array Utilities', () => {
    it('should shuffle an array', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = [...original].sort(() => Math.random() - 0.5);
      
      expect(shuffled.length).toBe(original.length);
      expect(shuffled.every(item => original.includes(item))).toBe(true);
    });

    it('should remove duplicates from an array', () => {
      const arrayWithDuplicates = [1, 2, 2, 3, 3, 3, 4, 5, 5];
      const uniqueArray = [...new Set(arrayWithDuplicates)];
      
      expect(uniqueArray).toEqual([1, 2, 3, 4, 5]);
      expect(uniqueArray.length).toBeLessThan(arrayWithDuplicates.length);
    });

    it('should chunk an array', () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const chunkSize = 3;
      const chunks = [];
      
      for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
      }
      
      expect(chunks).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
      expect(chunks.length).toBe(3);
    });

    it('should flatten nested arrays', () => {
      const nestedArray = [1, [2, 3], [4, [5, 6]], 7];
      const flattened = nestedArray.flat(2);
      
      expect(flattened).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('should find intersection of arrays', () => {
      const arr1 = [1, 2, 3, 4, 5];
      const arr2 = [3, 4, 5, 6, 7];
      const intersection = arr1.filter(x => arr2.includes(x));
      
      expect(intersection).toEqual([3, 4, 5]);
    });

    it('should find difference between arrays', () => {
      const arr1 = [1, 2, 3, 4, 5];
      const arr2 = [3, 4, 5, 6, 7];
      const difference = arr1.filter(x => !arr2.includes(x));
      
      expect(difference).toEqual([1, 2]);
    });

    it('should group array elements', () => {
      const people = [
        { name: 'John', age: 25 },
        { name: 'Jane', age: 25 },
        { name: 'Bob', age: 30 }
      ];
      
      const grouped = people.reduce((acc, person) => {
        (acc[person.age] = acc[person.age] || []).push(person);
        return acc;
      }, {} as Record<number, typeof people>);
      
      expect(grouped[25]).toHaveLength(2);
      expect(grouped[30]).toHaveLength(1);
    });

    it('should create array range', () => {
      const range = (start: number, end: number) => 
        Array.from({ length: end - start + 1 }, (_, i) => start + i);
      
      expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
      expect(range(0, 3)).toEqual([0, 1, 2, 3]);
    });

    it('should partition array based on condition', () => {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const [evens, odds] = [
        numbers.filter(n => n % 2 === 0),
        numbers.filter(n => n % 2 !== 0)
      ];
      
      expect(evens).toEqual([2, 4, 6, 8, 10]);
      expect(odds).toEqual([1, 3, 5, 7, 9]);
    });

    it('should calculate array sum', () => {
      const numbers = [1, 2, 3, 4, 5];
      const sum = numbers.reduce((acc, curr) => acc + curr, 0);
      
      expect(sum).toBe(15);
    });

    it('should find max value in array', () => {
      const numbers = [3, 7, 2, 9, 1];
      const max = Math.max(...numbers);
      
      expect(max).toBe(9);
    });

    it('should find min value in array', () => {
      const numbers = [3, 7, 2, 9, 1];
      const min = Math.min(...numbers);
      
      expect(min).toBe(1);
    });

    it('should calculate average of array', () => {
      const numbers = [1, 2, 3, 4, 5];
      const avg = numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length;
      
      expect(avg).toBe(3);
    });

    it('should reverse an array', () => {
      const original = [1, 2, 3, 4, 5];
      const reversed = [...original].reverse();
      
      expect(reversed).toEqual([5, 4, 3, 2, 1]);
    });

    it('should rotate array elements', () => {
      const array = [1, 2, 3, 4, 5];
      const rotated = [...array.slice(1), array[0]]; // Move first to end
      
      expect(rotated).toEqual([2, 3, 4, 5, 1]);
    });

    it('should zip two arrays', () => {
      const arr1 = ['a', 'b', 'c'];
      const arr2 = [1, 2, 3];
      const zipped = arr1.map((item, index) => [item, arr2[index]]);
      
      expect(zipped).toEqual([['a', 1], ['b', 2], ['c', 3]]);
    });

    it('should unzip zipped arrays', () => {
      const zipped = [['a', 1], ['b', 2], ['c', 3]];
      const arr1 = zipped.map(pair => pair[0]) as string[];
      const arr2 = zipped.map(pair => pair[1]) as number[];
      
      expect(arr1).toEqual(['a', 'b', 'c']);
      expect(arr2).toEqual([1, 2, 3]);
    });

    it('should create array of unique objects based on property', () => {
      const objects = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 1, name: 'John Duplicate' }
      ];
      
      const uniqueById = objects.filter((obj, index, self) =>
        index === self.findIndex(o => o.id === obj.id)
      );
      
      expect(uniqueById).toHaveLength(2);
      expect(uniqueById[0].id).toBe(1);
      expect(uniqueById[1].id).toBe(2);
    });

    it('should perform deep equality check for arrays', () => {
      const arr1 = [1, [2, 3], { a: 4 }];
      const arr2 = [1, [2, 3], { a: 4 }];
      const arr3 = [1, [2, 3], { a: 5 }];
      
      expect(JSON.stringify(arr1)).toBe(JSON.stringify(arr2));
      expect(JSON.stringify(arr1)).not.toBe(JSON.stringify(arr3));
    });

    it('should sort array by multiple criteria', () => {
      const people = [
        { name: 'John', age: 30, city: 'NYC' },
        { name: 'Jane', age: 25, city: 'LA' },
        { name: 'Bob', age: 30, city: 'Chicago' }
      ];
      
      const sorted = [...people].sort((a, b) => {
        if (a.age !== b.age) return a.age - b.age;
        return a.name.localeCompare(b.name);
      });
      
      expect(sorted[0].name).toBe('Jane');
      expect(sorted[1].name).toBe('Bob');
      expect(sorted[2].name).toBe('John');
    });
  });

  // String helper tests
  describe('String Utilities', () => {
    it('should reverse a string', () => {
      const original = 'hello';
      const reversed = original.split('').reverse().join('');
      
      expect(reversed).toBe('olleh');
    });

    it('should count occurrences of substring', () => {
      const str = 'hello world, hello';
      const count = (str.match(/hello/g) || []).length;
      
      expect(count).toBe(2);
    });

    it('should truncate string with ellipsis', () => {
      const longStr = 'This is a very long string that needs truncating';
      const truncated = longStr.length > 20 ? longStr.substring(0, 20) + '...' : longStr;
      
      expect(truncated).toBe('This is a very long ...');
      expect(truncated.length).toBeLessThanOrEqual(23); // 20 + 3 for ...
    });

    it('should convert string to camelCase', () => {
      const snake_case = 'hello_world_example';
      const camelCase = snake_case.replace(/_([a-z])/g, g => g[1].toUpperCase());
      
      expect(camelCase).toBe('helloWorldExample');
    });

    it('should convert string to kebab-case', () => {
      const camelCase = 'helloWorldExample';
      const kebabCase = camelCase.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`).replace(/^-/, '');
      
      expect(kebabCase).toBe('hello-world-example');
    });

    it('should check if string is palindrome', () => {
      const palindrome = 'racecar';
      const nonPalindrome = 'hello';
      
      const isPalindrome = (str: string) => str === str.split('').reverse().join('');
      
      expect(isPalindrome(palindrome)).toBe(true);
      expect(isPalindrome(nonPalindrome)).toBe(false);
    });

    it('should remove duplicate characters from string', () => {
      const str = 'hello world';
      const unique = [...new Set(str)].join('');
      
      expect(unique).toBe('helo wrd');
    });

    it('should count character frequencies', () => {
      const str = 'hello';
      const freq = str.split('').reduce((acc, char) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      expect(freq['l']).toBe(2);
      expect(freq['h']).toBe(1);
      expect(freq['e']).toBe(1);
      expect(freq['o']).toBe(1);
    });

    it('should find longest word in string', () => {
      const str = 'The quick brown fox jumps';
      const words = str.split(/\s+/);
      const longest = words.reduce((longest, word) => 
        word.length > longest.length ? word : longest, '');
      
      expect(longest).toBe('quick');
    });

    it('should capitalize first letter of each word', () => {
      const str = 'hello world from typescript';
      const capitalized = str.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ');
      
      expect(capitalized).toBe('Hello World From Typescript');
    });

    it('should extract vowels from string', () => {
      const str = 'hello world';
      const vowels = str.match(/[aeiouAEIOU]/g)?.join('') || '';
      
      expect(vowels).toBe('eo o');
    });

    it('should remove vowels from string', () => {
      const str = 'hello world';
      const noVowels = str.replace(/[aeiouAEIOU]/g, '');
      
      expect(noVowels).toBe('hll wrld');
    });

    it('should count words in string', () => {
      const str = 'This is a sample sentence';
      const wordCount = str.trim().split(/\s+/).filter(Boolean).length;
      
      expect(wordCount).toBe(5);
    });

    it('should generate random string', () => {
      const generateRandomString = (length: number) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
      };
      
      const randomStr = generateRandomString(10);
      expect(randomStr.length).toBe(10);
      expect(/^[A-Za-z0-9]+$/.test(randomStr)).toBe(true);
    });

    it('should escape HTML entities', () => {
      const htmlStr = '<div>Hello & "world"</div>';
      const escaped = htmlStr
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
      
      expect(escaped).toBe('&lt;div&gt;Hello &amp; &quot;world&quot;&lt;/div&gt;');
    });

    it('should unescape HTML entities', () => {
      const escapedStr = '&lt;div&gt;Hello &amp; &quot;world&quot;&lt;/div&gt;';
      const unescaped = escapedStr
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&amp;/g, '&');
      
      expect(unescaped).toBe('<div>Hello & "world"</div>');
    });

    it('should check if string contains only digits', () => {
      const isNumeric = (str: string) => /^\d+$/.test(str);
      
      expect(isNumeric('12345')).toBe(true);
      expect(isNumeric('123a5')).toBe(false);
      expect(isNumeric('')).toBe(false);
    });

    it('should pad string with characters', () => {
      const str = '5';
      const paddedLeft = str.padStart(3, '0');
      const paddedRight = str.padEnd(3, '0');
      
      expect(paddedLeft).toBe('005');
      expect(paddedRight).toBe('500');
    });

    it('should repeat string', () => {
      const str = 'abc';
      const repeated = str.repeat(3);
      
      expect(repeated).toBe('abcabcabc');
    });
  });

  // Object helper tests
  describe('Object Utilities', () => {
    it('should merge objects deeply', () => {
      const obj1 = { a: 1, b: { c: 2 } };
      const obj2 = { b: { d: 3 }, e: 4 };
      
      const deepMerge = (target: any, source: any) => {
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
      
      const merged = deepMerge(obj1, obj2);
      
      expect(merged.a).toBe(1);
      expect(merged.b.c).toBe(2);
      expect(merged.b.d).toBe(3);
      expect(merged.e).toBe(4);
    });

    it('should get nested object property', () => {
      const obj = { a: { b: { c: 'value' } } };
      const path = 'a.b.c';
      
      const getNestedProp = (obj: any, path: string) => {
        return path.split('.').reduce((current, key) => current?.[key], obj);
      };
      
      expect(getNestedProp(obj, path)).toBe('value');
    });

    it('should set nested object property', () => {
      const obj = { a: { b: {} } };
      const path = 'a.b.c';
      const value = 'newValue';
      
      const setNestedProp = (obj: any, path: string, value: any) => {
        const parts = path.split('.');
        let current = obj;
        for (let i = 0; i < parts.length - 1; i++) {
          if (!current[parts[i]]) current[parts[i]] = {};
          current = current[parts[i]];
        }
        current[parts[parts.length - 1]] = value;
      };
      
      setNestedProp(obj, path, value);
      expect(obj.a.b.c).toBe(value);
    });

    it('should filter object properties', () => {
      const obj = { a: 1, b: 2, c: 3, d: 4 };
      const filtered = Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => value % 2 === 0)
      );
      
      expect(filtered).toEqual({ b: 2, d: 4 });
    });

    it('should map object values', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const mapped = Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, value * 2])
      );
      
      expect(mapped).toEqual({ a: 2, b: 4, c: 6 });
    });

    it('should swap object keys and values', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const swapped = Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [value, key])
      );
      
      expect(swapped).toEqual({ 1: 'a', 2: 'b', 3: 'c' });
    });

    it('should pick specific properties from object', () => {
      const obj = { a: 1, b: 2, c: 3, d: 4 };
      const propsToPick = ['a', 'c'];
      
      const picked = Object.fromEntries(
        Object.entries(obj).filter(([key]) => propsToPick.includes(key))
      );
      
      expect(picked).toEqual({ a: 1, c: 3 });
      expect(picked).not.toHaveProperty('b');
      expect(picked).not.toHaveProperty('d');
    });

    it('should omit specific properties from object', () => {
      const obj = { a: 1, b: 2, c: 3, d: 4 };
      const propsToOmit = ['b', 'd'];
      
      const omitted = Object.fromEntries(
        Object.entries(obj).filter(([key]) => !propsToOmit.includes(key))
      );
      
      expect(omitted).toEqual({ a: 1, c: 3 });
      expect(omitted).not.toHaveProperty('b');
      expect(omitted).not.toHaveProperty('d');
    });

    it('should freeze object deeply', () => {
      const obj = { a: 1, b: { c: 2 } };
      
      const deepFreeze = (obj: any) => {
        Object.getOwnPropertyNames(obj).forEach(prop => {
          if (obj[prop] !== null && typeof obj[prop] === 'object') {
            deepFreeze(obj[prop]);
          }
        });
        return Object.freeze(obj);
      };
      
      const frozen = deepFreeze(obj);
      
      expect(Object.isFrozen(frozen)).toBe(true);
      expect(Object.isFrozen(frozen.b)).toBe(true);
    });

    it('should create object with default values', () => {
      const defaults = { a: 0, b: '', c: false };
      const provided = { a: 5, b: 'hello' };
      
      const withDefaults = { ...defaults, ...provided };
      
      expect(withDefaults).toEqual({ a: 5, b: 'hello', c: false });
    });

    it('should check object equality', () => {
      const obj1 = { a: 1, b: { c: 2 } };
      const obj2 = { a: 1, b: { c: 2 } };
      const obj3 = { a: 1, b: { c: 3 } };
      
      expect(JSON.stringify(obj1)).toBe(JSON.stringify(obj2));
      expect(JSON.stringify(obj1)).not.toBe(JSON.stringify(obj3));
    });

    it('should transform object keys', () => {
      const obj = { firstName: 'John', lastName: 'Doe' };
      
      const transformKeys = (obj: any, transformer: (key: string) => string) => {
        return Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [transformer(key), value])
        );
      };
      
      const snakeCased = transformKeys(obj, key => 
        key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
      );
      
      expect(snakeCased).toEqual({ first_name: 'John', last_name: 'Doe' });
    });

    it('should flatten nested object', () => {
      const nestedObj = { a: 1, b: { c: 2, d: { e: 3 } } };
      
      const flattenObj = (obj: any, prefix = ''): any => {
        const flattened: any = {};
        for (const key in obj) {
          const value = obj[key];
          const newKey = prefix ? `${prefix}.${key}` : key;
          
          if (value && typeof value === 'object' && !Array.isArray(value)) {
            Object.assign(flattened, flattenObj(value, newKey));
          } else {
            flattened[newKey] = value;
          }
        }
        return flattened;
      };
      
      const flattened = flattenObj(nestedObj);
      
      expect(flattened).toEqual({ 'a': 1, 'b.c': 2, 'b.d.e': 3 });
    });

    it('should get object size', () => {
      const obj = { a: 1, b: 2, c: { d: 3 } };
      const size = Object.keys(obj).length;
      
      expect(size).toBe(3);
    });

    it('should invert object', () => {
      const obj = { a: 'x', b: 'y', c: 'z' };
      const inverted = Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [value, key])
      );
      
      expect(inverted).toEqual({ x: 'a', y: 'b', z: 'c' });
    });

    it('should check if object is empty', () => {
      const isEmpty = (obj: any) => Object.keys(obj).length === 0;
      
      expect(isEmpty({})).toBe(true);
      expect(isEmpty({ a: 1 })).toBe(false);
    });

    it('should create object from arrays of keys and values', () => {
      const keys = ['a', 'b', 'c'];
      const values = [1, 2, 3];
      
      const obj = keys.reduce((acc, key, index) => {
        acc[key] = values[index];
        return acc;
      }, {} as Record<string, number>);
      
      expect(obj).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should sort object properties', () => {
      const obj = { b: 2, a: 1, c: 3 };
      const sorted = Object.keys(obj).sort().reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;
      }, {} as Record<string, number>);
      
      expect(Object.keys(sorted)).toEqual(['a', 'b', 'c']);
    });

    it('should clone object deeply', () => {
      const original = { a: 1, b: { c: 2, d: [3, 4] } };
      const cloned = JSON.parse(JSON.stringify(original));
      
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.b).not.toBe(original.b);
    });
  });
});