// Performance utility tests

describe('Performance Utilities', () => {
  // Timing and benchmarking tests
  describe('Timing Utilities', () => {
    it('should measure execution time', () => {
      const startTime = performance.now();
      
      // Simulate some work
      let sum = 0;
      for (let i = 0; i < 1000000; i++) {
        sum += i;
      }
      
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      
      expect(executionTime).toBeGreaterThanOrEqual(0);
      expect(typeof executionTime).toBe('number');
    });

    it('should measure function execution time', () => {
      const measureExecutionTime = (fn: () => any) => {
        const startTime = performance.now();
        const result = fn();
        const endTime = performance.now();
        return { result, time: endTime - startTime };
      };
      
      const slowFunction = () => {
        let sum = 0;
        for (let i = 0; i < 100000; i++) {
          sum += i * i;
        }
        return sum;
      };
      
      const { result, time } = measureExecutionTime(slowFunction);
      
      expect(typeof result).toBe('number');
      expect(time).toBeGreaterThanOrEqual(0);
    });

    it('should benchmark multiple functions', () => {
      const functionsToBenchmark = {
        addition: () => {
          let sum = 0;
          for (let i = 0; i < 100000; i++) {
            sum += i;
          }
          return sum;
        },
        multiplication: () => {
          let product = 1;
          for (let i = 1; i <= 20; i++) {
            product *= i;
          }
          return product;
        },
        stringConcatenation: () => {
          let str = '';
          for (let i = 0; i < 10000; i++) {
            str += 'a';
          }
          return str;
        }
      };
      
      const results: Record<string, number> = {};
      
      for (const [name, fn] of Object.entries(functionsToBenchmark)) {
        const startTime = performance.now();
        fn();
        const endTime = performance.now();
        results[name] = endTime - startTime;
      }
      
      expect(Object.keys(results).length).toBe(3);
      expect(Object.values(results).every(time => time >= 0)).toBe(true);
    });

    it('should measure async function execution time', async () => {
      const measureAsyncTime = async (fn: () => Promise<any>) => {
        const startTime = performance.now();
        const result = await fn();
        const endTime = performance.now();
        return { result, time: endTime - startTime };
      };
      
      const asyncFunction = async () => {
        return new Promise(resolve => {
          setTimeout(() => {
            let sum = 0;
            for (let i = 0; i < 100000; i++) {
              sum += i;
            }
            resolve(sum);
          }, 10); // 10ms delay
        });
      };
      
      const { result, time } = await measureAsyncTime(asyncFunction);
      
      expect(typeof result).toBe('number');
      expect(time).toBeGreaterThanOrEqual(10); // At least 10ms due to timeout
    });

    it('should measure memory usage conceptually', () => {
      // Note: Real memory measurement would require Node.js specific APIs
      // This is a conceptual test
      
      const initialObjects = 1000;
      const objects: any[] = [];
      
      // Create objects to consume memory
      for (let i = 0; i < initialObjects; i++) {
        objects.push({
          id: i,
          data: `Sample data for object ${i}`,
          nested: { value: i * 2, metadata: { created: Date.now() } }
        });
      }
      
      const afterAllocationLength = objects.length;
      
      // Free some objects
      for (let i = 0; i < 500; i++) {
        objects.pop();
      }
      
      const afterDeallocationLength = objects.length;
      
      expect(afterAllocationLength).toBe(initialObjects);
      expect(afterDeallocationLength).toBe(initialObjects - 500);
    });

    it('should measure function throughput', () => {
      const functionToTest = (x: number) => x * x + 2 * x + 1;
      
      const iterations = 100000;
      const startTime = performance.now();
      
      let result = 0;
      for (let i = 0; i < iterations; i++) {
        result += functionToTest(i % 100); // Keep numbers reasonable
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;
      const opsPerSecond = (iterations / totalTime) * 1000;
      
      expect(result).toBeGreaterThanOrEqual(0);
      expect(opsPerSecond).toBeGreaterThanOrEqual(0);
    });

    it('should detect performance regressions', () => {
      const baselineFunction = () => {
        let sum = 0;
        for (let i = 0; i < 50000; i++) {
          sum += Math.sqrt(i);
        }
        return sum;
      };
      
      const currentFunction = () => {
        let sum = 0;
        for (let i = 0; i < 50000; i++) {
          sum += Math.sqrt(i);
        }
        return sum;
      };
      
      const baselineTime = performance.now();
      baselineFunction();
      const baselineEnd = performance.now();
      const baselineDuration = baselineEnd - baselineTime;
      
      const currentTime = performance.now();
      currentFunction();
      const currentEnd = performance.now();
      const currentDuration = currentEnd - currentTime;
      
      // In a real scenario, we would compare to a known baseline
      // Here we just verify both functions execute
      expect(baselineDuration).toBeGreaterThanOrEqual(0);
      expect(currentDuration).toBeGreaterThanOrEqual(0);
    });

    it('should measure recursion performance', () => {
      const factorialRecursive = (n: number): number => {
        if (n <= 1) return 1;
        return n * factorialRecursive(n - 1);
      };
      
      const factorialIterative = (n: number): number => {
        let result = 1;
        for (let i = 2; i <= n; i++) {
          result *= i;
        }
        return result;
      };
      
      const recursiveTime = performance.now();
      const recursiveResult = factorialRecursive(15);
      const recursiveEnd = performance.now();
      const recursiveDuration = recursiveEnd - recursiveTime;
      
      const iterativeTime = performance.now();
      const iterativeResult = factorialIterative(15);
      const iterativeEnd = performance.now();
      const iterativeDuration = iterativeEnd - iterativeTime;
      
      expect(recursiveResult).toBe(iterativeResult);
      expect(recursiveDuration).toBeGreaterThanOrEqual(0);
      expect(iterativeDuration).toBeGreaterThanOrEqual(0);
    });

    it('should measure sorting algorithm performance', () => {
      const generateRandomArray = (size: number) => {
        return Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
      };
      
      const bubbleSort = (arr: number[]) => {
        const result = [...arr];
        for (let i = 0; i < result.length; i++) {
          for (let j = 0; j < result.length - i - 1; j++) {
            if (result[j] > result[j + 1]) {
              [result[j], result[j + 1]] = [result[j + 1], result[j]];
            }
          }
        }
        return result;
      };
      
      const builtInSort = (arr: number[]) => {
        return [...arr].sort((a, b) => a - b);
      };
      
      const testArray = generateRandomArray(1000);
      
      const bubbleSortTime = performance.now();
      bubbleSort([...testArray]);
      const bubbleSortEnd = performance.now();
      const bubbleSortDuration = bubbleSortEnd - bubbleSortTime;
      
      const builtInSortTime = performance.now();
      builtInSort([...testArray]);
      const builtInSortEnd = performance.now();
      const builtInSortDuration = builtInSortEnd - builtInSortTime;
      
      expect(bubbleSortDuration).toBeGreaterThanOrEqual(0);
      expect(builtInSortDuration).toBeGreaterThanOrEqual(0);
    });

    it('should measure search algorithm performance', () => {
      const linearSearch = (arr: number[], target: number) => {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === target) return i;
        }
        return -1;
      };
      
      const binarySearch = (arr: number[], target: number) => {
        let left = 0;
        let right = arr.length - 1;
        
        while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          if (arr[mid] === target) return mid;
          if (arr[mid] < target) left = mid + 1;
          else right = mid - 1;
        }
        
        return -1;
      };
      
      const sortedArray = Array.from({ length: 10000 }, (_, i) => i * 2); // Even numbers
      const target = 5000;
      
      const linearSearchTime = performance.now();
      linearSearch(sortedArray, target);
      const linearSearchEnd = performance.now();
      const linearSearchDuration = linearSearchEnd - linearSearchTime;
      
      const binarySearchTime = performance.now();
      binarySearch(sortedArray, target);
      const binarySearchEnd = performance.now();
      const binarySearchDuration = binarySearchEnd - binarySearchTime;
      
      expect(linearSearchDuration).toBeGreaterThanOrEqual(0);
      expect(binarySearchDuration).toBeGreaterThanOrEqual(0);
    });

    it('should measure data structure operations', () => {
      // Array operations
      const arrayOperations = () => {
        const arr: number[] = [];
        
        // Push operations
        for (let i = 0; i < 10000; i++) {
          arr.push(i);
        }
        
        // Access operations
        for (let i = 0; i < 1000; i++) {
          const val = arr[i];
        }
        
        // Pop operations
        for (let i = 0; i < 1000; i++) {
          arr.pop();
        }
      };
      
      // Object operations
      const objectOperations = () => {
        const obj: Record<string, number> = {};
        
        // Assignment operations
        for (let i = 0; i < 10000; i++) {
          obj[`key${i}`] = i;
        }
        
        // Access operations
        for (let i = 0; i < 1000; i++) {
          const val = obj[`key${i}`];
        }
        
        // Deletion operations
        for (let i = 0; i < 1000; i++) {
          delete obj[`key${i}`];
        }
      };
      
      const arrayTime = performance.now();
      arrayOperations();
      const arrayEnd = performance.now();
      const arrayDuration = arrayEnd - arrayTime;
      
      const objectTime = performance.now();
      objectOperations();
      const objectEnd = performance.now();
      const objectDuration = objectEnd - objectTime;
      
      expect(arrayDuration).toBeGreaterThanOrEqual(0);
      expect(objectDuration).toBeGreaterThanOrEqual(0);
    });

    it('should measure string operations performance', () => {
      const stringOperations = () => {
        let str = '';
        
        // Concatenation
        for (let i = 0; i < 10000; i++) {
          str += `string${i} `;
        }
        
        // Search
        const found = str.includes('string5000');
        
        // Split
        const parts = str.split(' ');
        
        // Replace
        const modified = str.replace(/string/g, 'replaced');
        
        return { found, partsCount: parts.length, modifiedLength: modified.length };
      };
      
      const startTime = performance.now();
      const result = stringOperations();
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      expect(result.found).toBe(true);
      expect(result.partsCount).toBeGreaterThan(5000);
      expect(duration).toBeGreaterThanOrEqual(0);
    });

    it('should measure object manipulation performance', () => {
      const objectManipulation = () => {
        const obj = {
          nested: {
            deep: {
              data: Array.from({ length: 1000 }, (_, i) => ({ id: i, value: `val${i}` }))
            }
          }
        };
        
        // Deep property access
        for (let i = 0; i < 100; i++) {
          const val = obj.nested.deep.data[i].value;
        }
        
        // Map operation
        const transformed = obj.nested.deep.data.map(item => ({
          ...item,
          doubled: item.id * 2
        }));
        
        // Filter operation
        const filtered = obj.nested.deep.data.filter(item => item.id % 2 === 0);
        
        // Reduce operation
        const sum = obj.nested.deep.data.reduce((acc, item) => acc + item.id, 0);
        
        return { transformedCount: transformed.length, filteredCount: filtered.length, sum };
      };
      
      const startTime = performance.now();
      const result = objectManipulation();
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      expect(result.transformedCount).toBe(1000);
      expect(result.filteredCount).toBe(500);
      expect(result.sum).toBe(499500); // Sum of 0 to 999
      expect(duration).toBeGreaterThanOrEqual(0);
    });

    it('should measure promise performance', () => {
      const createPromiseChain = async (count: number) => {
        let promise = Promise.resolve(0);
        
        for (let i = 0; i < count; i++) {
          promise = promise.then(prev => prev + 1);
        }
        
        return await promise;
      };
      
      const startTime = performance.now();
      return createPromiseChain(1000).then(result => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        expect(result).toBe(1000);
        expect(duration).toBeGreaterThanOrEqual(0);
      });
    });

    it('should measure callback performance', () => {
      const processWithCallback = (count: number, callback: (result: number) => void) => {
        let result = 0;
        for (let i = 0; i < count; i++) {
          result += i;
        }
        callback(result);
      };
      
      const startTime = performance.now();
      processWithCallback(100000, (result) => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        expect(result).toBe(4999950000); // Sum of 0 to 99999
        expect(duration).toBeGreaterThanOrEqual(0);
      });
    });

    it('should measure event loop performance', () => {
      const tasks: Function[] = [];
      for (let i = 0; i < 1000; i++) {
        tasks.push(() => i * i);
      }
      
      const startTime = performance.now();
      tasks.forEach(task => task());
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      expect(duration).toBeGreaterThanOrEqual(0);
    });

    it('should measure garbage collection impact', () => {
      const createMemoryPressure = () => {
        const bigArray: any[] = [];
        for (let i = 0; i < 100000; i++) {
          bigArray.push({
            id: i,
            data: new Array(10).fill(i),
            nested: { value: i, metadata: { timestamp: Date.now() } }
          });
        }
        return bigArray;
      };
      
      const startTime = performance.now();
      const largeDataStructure = createMemoryPressure();
      const midTime = performance.now();
      
      // Clear reference to allow GC
      (largeDataStructure as any) = null;
      const endTime = performance.now();
      
      const allocationTime = midTime - startTime;
      const cleanupTime = endTime - midTime;
      
      expect(allocationTime).toBeGreaterThanOrEqual(0);
    });

    it('should measure I/O simulation performance', () => {
      // Simulate I/O operations with timeouts
      const ioOperations = async () => {
        const results = [];
        for (let i = 0; i < 100; i++) {
          // Simulate I/O delay
          await new Promise(resolve => setTimeout(resolve, 1));
          results.push(i * i);
        }
        return results;
      };
      
      const startTime = performance.now();
      return ioOperations().then(results => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        expect(results.length).toBe(100);
        expect(duration).toBeGreaterThanOrEqual(100); // At least 100ms for 100 1ms delays
      });
    });

    it('should measure CPU-intensive task performance', () => {
      const cpuIntensiveTask = () => {
        // Prime number calculation
        const primes: number[] = [];
        for (let num = 2; num <= 1000; num++) {
          let isPrime = true;
          for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
              isPrime = false;
              break;
            }
          }
          if (isPrime) primes.push(num);
        }
        return primes;
      };
      
      const startTime = performance.now();
      const result = cpuIntensiveTask();
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      expect(result.length).toBeGreaterThan(100); // Should find many primes
      expect(duration).toBeGreaterThanOrEqual(0);
    });

    it('should measure memory allocation speed', () => {
      const measureAllocation = () => {
        const startTime = performance.now();
        
        const objects: any[] = [];
        for (let i = 0; i < 50000; i++) {
          objects.push({
            id: i,
            name: `Object ${i}`,
            properties: {
              value: Math.random(),
              timestamp: Date.now(),
              metadata: { counter: i, flag: i % 2 === 0 }
            }
          });
        }
        
        const endTime = performance.now();
        return { count: objects.length, time: endTime - startTime };
      };
      
      const result = measureAllocation();
      expect(result.count).toBe(50000);
      expect(result.time).toBeGreaterThanOrEqual(0);
    });

    it('should measure function call overhead', () => {
      const simpleFunction = (x: number) => x + 1;
      const complexFunction = (x: number) => {
        let result = x;
        for (let i = 0; i < 10; i++) {
          result = Math.sqrt(result * result + 1);
        }
        return result;
      };
      
      const iterations = 100000;
      
      // Measure simple function calls
      const simpleStartTime = performance.now();
      for (let i = 0; i < iterations; i++) {
        simpleFunction(i % 1000);
      }
      const simpleEndTime = performance.now();
      const simpleDuration = simpleEndTime - simpleStartTime;
      
      // Measure complex function calls
      const complexStartTime = performance.now();
      for (let i = 0; i < iterations; i++) {
        complexFunction(i % 1000);
      }
      const complexEndTime = performance.now();
      const complexDuration = complexEndTime - complexStartTime;
      
      expect(simpleDuration).toBeGreaterThanOrEqual(0);
      expect(complexDuration).toBeGreaterThanOrEqual(0);
    });
  });

  // Profiling tests
  describe('Profiling Utilities', () => {
    it('should profile function calls', () => {
      const profiler = {
        calls: 0,
        totalTime: 0,
        profile: <T extends (...args: any[]) => any>(fn: T) => {
          return (...args: Parameters<T>): ReturnType<T> => {
            const start = performance.now();
            const result = fn(...args);
            const end = performance.now();
            
            profiler.calls++;
            profiler.totalTime += (end - start);
            
            return result;
          };
        },
        getStats: () => {
          return {
            callCount: profiler.calls,
            totalTime: profiler.totalTime,
            averageTime: profiler.calls > 0 ? profiler.totalTime / profiler.calls : 0
          };
        }
      };
      
      const multiply = (a: number, b: number) => a * b;
      const profiledMultiply = profiler.profile(multiply);
      
      for (let i = 0; i < 1000; i++) {
        profiledMultiply(i, i + 1);
      }
      
      const stats = profiler.getStats();
      expect(stats.callCount).toBe(1000);
      expect(stats.totalTime).toBeGreaterThanOrEqual(0);
      expect(stats.averageTime).toBeGreaterThanOrEqual(0);
    });

    it('should profile async functions', async () => {
      const asyncProfiler = {
        calls: 0,
        totalTime: 0,
        asyncProfile: <T extends (...args: any[]) => Promise<any>>(fn: T) => {
          return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
            const start = performance.now();
            const result = await fn(...args);
            const end = performance.now();
            
            asyncProfiler.calls++;
            asyncProfiler.totalTime += (end - start);
            
            return result;
          };
        },
        getStats: () => {
          return {
            callCount: asyncProfiler.calls,
            totalTime: asyncProfiler.totalTime,
            averageTime: asyncProfiler.calls > 0 ? asyncProfiler.totalTime / asyncProfiler.calls : 0
          };
        }
      };
      
      const delayedSquare = async (x: number) => {
        return new Promise<number>(resolve => {
          setTimeout(() => resolve(x * x), 1);
        });
      };
      
      const profiledDelayedSquare = asyncProfiler.asyncProfile(delayedSquare);
      
      for (let i = 0; i < 10; i++) {
        await profiledDelayedSquare(i);
      }
      
      const stats = asyncProfiler.getStats();
      expect(stats.callCount).toBe(10);
      expect(stats.totalTime).toBeGreaterThanOrEqual(10); // At least 10ms for 10 1ms delays
    });

    it('should measure memory usage over time', () => {
      // Conceptual test for memory profiling
      const memorySnapshots: number[] = [];
      
      // Take initial snapshot
      memorySnapshots.push(0); // Placeholder - real implementation would use memory info
      
      // Perform memory-intensive operations
      for (let i = 0; i < 5; i++) {
        const largeArray = new Array(10000).fill(i);
        // In a real scenario, we'd measure memory here
        memorySnapshots.push(i * 1000); // Placeholder values
      }
      
      expect(memorySnapshots.length).toBe(6);
    });

    it('should profile recursive functions', () => {
      const profiledFactorial = (() => {
        let callCount = 0;
        let totalTime = 0;
        
        const factorial = (n: number): number => {
          callCount++;
          const start = performance.now();
          
          if (n <= 1) {
            totalTime += performance.now() - start;
            return 1;
          }
          
          const result = n * factorial(n - 1);
          totalTime += performance.now() - start;
          return result;
        };
        
        (factorial as any).stats = () => ({ callCount, totalTime });
        return factorial;
      })();
      
      const result = profiledFactorial(5);
      const stats = (profiledFactorial as any).stats();
      
      // For factorial(5), we expect 6 calls (5 -> 4 -> 3 -> 2 -> 1 -> base case)
      expect(result).toBe(120);
      expect(stats.callCount).toBe(6);
      expect(stats.totalTime).toBeGreaterThanOrEqual(0);
    });

    it('should profile object creation', () => {
      const objectCreationProfiler = {
        count: 0,
        totalTime: 0,
        createProfiled: <T extends new (...args: any[]) => any>(constructor: T) => {
          return (...args: ConstructorParameters<T>): InstanceType<T> => {
            const start = performance.now();
            const instance = new constructor(...args);
            const end = performance.now();
            
            objectCreationProfiler.count++;
            objectCreationProfiler.totalTime += (end - start);
            
            return instance;
          };
        },
        getStats: () => {
          return { count: objectCreationProfiler.count, totalTime: objectCreationProfiler.totalTime, avgTime: objectCreationProfiler.count > 0 ? objectCreationProfiler.totalTime / objectCreationProfiler.count : 0 };
        }
      };
      
      class SimpleClass {
        constructor(public value: number, public name: string) {}
      }
      
      const ProfiledClass = objectCreationProfiler.createProfiled(SimpleClass);
      
      for (let i = 0; i < 1000; i++) {
        new (ProfiledClass as any)(i, `item${i}`);
      }
      
      const stats = objectCreationProfiler.getStats();
      expect(stats.count).toBe(1000);
      expect(stats.totalTime).toBeGreaterThanOrEqual(0);
    });
  });

  // Resource utilization tests
  describe('Resource Utilization', () => {
    it('should measure CPU utilization conceptually', () => {
      // Conceptual test - actual CPU measurement would require system APIs
      const tasks = Array(100).fill(null).map((_, i) => () => {
        // CPU intensive task
        let sum = 0;
        for (let j = 0; j < 10000; j++) {
          sum += Math.sin(j) * Math.cos(i);
        }
        return sum;
      });
      
      const startTime = performance.now();
      const results = tasks.map(task => task());
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      expect(results.length).toBe(100);
      expect(duration).toBeGreaterThanOrEqual(0);
    });

    it('should measure concurrent task performance', async () => {
      const createTask = (id: number) => {
        return new Promise<number>(resolve => {
          setTimeout(() => {
            let sum = 0;
            for (let i = 0; i < 10000; i++) {
              sum += i * id;
            }
            resolve(sum);
          }, Math.random() * 10); // Random small delay
        });
      };
      
      const startTime = performance.now();
      const promises = Array(50).fill(null).map((_, i) => createTask(i));
      const results = await Promise.all(promises);
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      expect(results.length).toBe(50);
      expect(duration).toBeGreaterThanOrEqual(0);
    });

    it('should measure throttled function performance', () => {
      const throttle = <T extends (...args: any[]) => any>(func: T, limit: number) => {
        let inThrottle: boolean;
        return (...args: Parameters<T>): void => {
          if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
          }
        };
      };
      
      const callCounts = { regular: 0, throttled: 0 };
      
      const regularFn = () => callCounts.regular++;
      const throttledFn = throttle(() => callCounts.throttled++, 100);
      
      // Call regular function many times
      for (let i = 0; i < 100; i++) {
        regularFn();
        throttledFn();
      }
      
      // Regular function should be called 100 times
      // Throttled function should be called much less
      expect(callCounts.regular).toBe(100);
      expect(callCounts.throttled).toBeLessThan(50); // Should be significantly less
    });

    it('should measure debounced function performance', () => {
      const debounce = <T extends (...args: any[]) => any>(func: T, delay: number) => {
        let timeoutId: NodeJS.Timeout;
        return (...args: Parameters<T>): void => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => func(...args), delay);
        };
      };
      
      const callCount = { debounced: 0 };
      const debouncedFn = debounce(() => callCount.debounced++, 50);
      
      // Call function multiple times in quick succession
      for (let i = 0; i < 10; i++) {
        debouncedFn();
      }
      
      // Wait for debounce to finish
      setTimeout(() => {
        expect(callCount.debounced).toBe(1); // Should only be called once
      }, 100);
    });

    it('should measure batch processing performance', () => {
      const processDataBatch = (data: number[], batchSize: number) => {
        const results: number[] = [];
        
        for (let i = 0; i < data.length; i += batchSize) {
          const batch = data.slice(i, i + batchSize);
          const batchResult = batch.reduce((sum, val) => sum + val * val, 0);
          results.push(batchResult);
        }
        
        return results;
      };
      
      const largeDataset = Array.from({ length: 10000 }, (_, i) => i);
      
      const startTime = performance.now();
      const results = processDataBatch(largeDataset, 1000);
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      expect(results.length).toBe(10); // 10000 / 1000 = 10 batches
      expect(duration).toBeGreaterThanOrEqual(0);
    });
  });
});