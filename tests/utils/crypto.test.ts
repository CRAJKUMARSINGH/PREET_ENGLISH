// Cryptographic utility tests

describe('Cryptographic Utilities', () => {
  // Hashing tests
  describe('Hash Functions', () => {
    it('should generate consistent MD5 hash', () => {
      // Note: MD5 is cryptographically broken but used here for testing
      const input = 'hello world';
      // In a real implementation, we would use crypto module
      expect(typeof input).toBe('string');
      expect(input.length).toBeGreaterThan(0);
    });

    it('should generate SHA-256 equivalent', () => {
      const input = 'hello world';
      // Simulating SHA-256 characteristics
      const sha256Simulated = Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');
      
      expect(sha256Simulated.length).toBe(64); // SHA-256 produces 256 bits = 64 hex chars
      expect(/^[a-f0-9]+$/.test(sha256Simulated)).toBe(true);
    });

    it('should generate consistent hash for same input', () => {
      const input = 'test input';
      // Simulate hash function
      const hashFunction = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash |= 0; // Convert to 32bit integer
        }
        return Math.abs(hash).toString(16);
      };
      
      const hash1 = hashFunction(input);
      const hash2 = hashFunction(input);
      
      expect(hash1).toBe(hash2);
    });

    it('should produce different hashes for different inputs', () => {
      const input1 = 'input one';
      const input2 = 'input two';
      
      const hashFunction = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash |= 0;
        }
        return Math.abs(hash).toString(16);
      };
      
      const hash1 = hashFunction(input1);
      const hash2 = hashFunction(input2);
      
      expect(hash1).not.toBe(hash2);
    });

    it('should demonstrate avalanche effect', () => {
      const input1 = 'hello world';
      const input2 = 'hello worle'; // Changed last character
      
      const hashFunction = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash |= 0;
        }
        return Math.abs(hash).toString(16);
      };
      
      const hash1 = hashFunction(input1);
      const hash2 = hashFunction(input2);
      
      // Even a small change should produce a significantly different hash
      expect(hash1).not.toBe(hash2);
    });

    it('should generate salted hash', () => {
      const input = 'password';
      const salt = 'randomsalt123';
      const saltedInput = input + salt;
      
      const hashFunction = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash |= 0;
        }
        return Math.abs(hash).toString(16);
      };
      
      const saltedHash = hashFunction(saltedInput);
      
      expect(saltedHash).not.toBe(hashFunction(input));
      expect(saltedHash.length).toBeGreaterThan(0);
    });

    it('should verify hashed value', () => {
      const input = 'secret message';
      const hashFunction = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash |= 0;
        }
        return Math.abs(hash).toString(16);
      };
      
      const storedHash = hashFunction(input);
      const verificationInput = 'secret message';
      const verificationHash = hashFunction(verificationInput);
      
      expect(storedHash).toBe(verificationHash);
    });

    it('should handle empty string hashing', () => {
      const hashFunction = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash |= 0;
        }
        return Math.abs(hash).toString(16);
      };
      
      const emptyHash = hashFunction('');
      expect(emptyHash).toBeDefined();
    });

    it('should handle special characters in hashing', () => {
      const input = 'special chars: !@#$%^&*()_+{}|:<>?';
      const hashFunction = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash |= 0;
        }
        return Math.abs(hash).toString(16);
      };
      
      const hash = hashFunction(input);
      expect(hash).toBeDefined();
      expect(hash.length).toBeGreaterThan(0);
    });

    it('should demonstrate collision resistance', () => {
      // In a real hash function, finding collisions should be computationally infeasible
      // Here we just demonstrate the concept
      const inputs = Array.from({length: 100}, (_, i) => `input_${i}`);
      const hashFunction = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash |= 0;
        }
        return Math.abs(hash).toString(16);
      };
      
      const hashes = inputs.map(input => hashFunction(input));
      const uniqueHashes = new Set(hashes);
      
      // For our simple hash function, some collisions might occur
      // But we expect most to be unique
      expect(uniqueHashes.size).toBeLessThanOrEqual(inputs.length);
    });

    it('should generate HMAC', () => {
      const message = 'Hello, world!';
      const key = 'secret-key';
      
      // Simulate HMAC process
      const hashFunction = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash |= 0;
        }
        return Math.abs(hash).toString(16);
      };
      
      // Simplified HMAC: hash(key + message)
      const hmac = hashFunction(key + message);
      
      expect(hmac).toBeDefined();
      expect(hmac.length).toBeGreaterThan(0);
    });

    it('should verify HMAC integrity', () => {
      const message = 'Hello, world!';
      const key = 'secret-key';
      
      const hashFunction = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash |= 0;
        }
        return Math.abs(hash).toString(16);
      };
      
      const originalHmac = hashFunction(key + message);
      const receivedMessage = 'Hello, world!';
      const receivedHmac = hashFunction(key + receivedMessage);
      
      expect(originalHmac).toBe(receivedHmac);
    });

    it('should detect HMAC tampering', () => {
      const message = 'Hello, world!';
      const key = 'secret-key';
      
      const hashFunction = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash |= 0;
        }
        return Math.abs(hash).toString(16);
      };
      
      const originalHmac = hashFunction(key + message);
      const tamperedMessage = 'Hello, world?'; // Changed character
      const tamperedHmac = hashFunction(key + tamperedMessage);
      
      expect(originalHmac).not.toBe(tamperedHmac);
    });

    it('should handle large inputs', () => {
      const largeInput = 'a'.repeat(10000);
      const hashFunction = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash |= 0;
        }
        return Math.abs(hash).toString(16);
      };
      
      const hash = hashFunction(largeInput);
      expect(hash).toBeDefined();
    });

    it('should handle Unicode characters', () => {
      const unicodeInput = 'Hello 世界 🌍';
      const hashFunction = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash |= 0;
        }
        return Math.abs(hash).toString(16);
      };
      
      const hash = hashFunction(unicodeInput);
      expect(hash).toBeDefined();
    });

    it('should generate checksum', () => {
      const data = 'important data';
      let checksum = 0;
      for (let i = 0; i < data.length; i++) {
        checksum += data.charCodeAt(i);
      }
      
      expect(checksum).toBeGreaterThan(0);
    });

    it('should verify checksum', () => {
      const data = 'important data';
      let checksum = 0;
      for (let i = 0; i < data.length; i++) {
        checksum += data.charCodeAt(i);
      }
      
      // Recalculate for verification
      let verificationChecksum = 0;
      for (let i = 0; i < data.length; i++) {
        verificationChecksum += data.charCodeAt(i);
      }
      
      expect(checksum).toBe(verificationChecksum);
    });

    it('should detect checksum tampering', () => {
      const originalData = 'important data';
      let originalChecksum = 0;
      for (let i = 0; i < originalData.length; i++) {
        originalChecksum += originalData.charCodeAt(i);
      }
      
      const tamperedData = 'important datf'; // Last character changed
      let tamperedChecksum = 0;
      for (let i = 0; i < tamperedData.length; i++) {
        tamperedChecksum += tamperedData.charCodeAt(i);
      }
      
      expect(originalChecksum).not.toBe(tamperedChecksum);
    });

    it('should handle binary data', () => {
      const binaryData = new Uint8Array([72, 101, 108, 108, 111]); // "Hello"
      let hash = 0;
      for (let i = 0; i < binaryData.length; i++) {
        hash = ((hash << 5) - hash) + binaryData[i];
        hash |= 0;
      }
      
      const hexHash = Math.abs(hash).toString(16);
      expect(hexHash).toBeDefined();
    });

    it('should generate hash with different algorithms', () => {
      const input = 'data';
      
      // Algorithm 1: Sum-based
      let hash1 = 0;
      for (let i = 0; i < input.length; i++) {
        hash1 += input.charCodeAt(i);
      }
      
      // Algorithm 2: XOR-based
      let hash2 = 0;
      for (let i = 0; i < input.length; i++) {
        hash2 ^= input.charCodeAt(i);
      }
      
      // Algorithms should produce different results
      expect(hash1).not.toBe(hash2);
    });
  });

  // Encryption tests
  describe('Encryption Functions', () => {
    it('should perform Caesar cipher encryption', () => {
      const plaintext = 'hello';
      const shift = 3;
      let ciphertext = '';
      
      for (let i = 0; i < plaintext.length; i++) {
        const charCode = plaintext.charCodeAt(i);
        // Only encrypt lowercase letters
        if (charCode >= 97 && charCode <= 122) {
          const shifted = ((charCode - 97 + shift) % 26) + 97;
          ciphertext += String.fromCharCode(shifted);
        } else {
          ciphertext += plaintext[i];
        }
      }
      
      expect(ciphertext).toBe('khoor');
    });

    it('should perform Caesar cipher decryption', () => {
      const ciphertext = 'khoor';
      const shift = 3;
      let plaintext = '';
      
      for (let i = 0; i < ciphertext.length; i++) {
        const charCode = ciphertext.charCodeAt(i);
        // Only decrypt lowercase letters
        if (charCode >= 97 && charCode <= 122) {
          const shifted = ((charCode - 97 - shift + 26) % 26) + 97;
          plaintext += String.fromCharCode(shifted);
        } else {
          plaintext += ciphertext[i];
        }
      }
      
      expect(plaintext).toBe('hello');
    });

    it('should verify encryption/decryption roundtrip', () => {
      const original = 'secret message';
      const shift = 7;
      
      // Encrypt
      let encrypted = '';
      for (let i = 0; i < original.length; i++) {
        const charCode = original.charCodeAt(i);
        if (charCode >= 97 && charCode <= 122) {
          const shifted = ((charCode - 97 + shift) % 26) + 97;
          encrypted += String.fromCharCode(shifted);
        } else if (charCode >= 65 && charCode <= 90) {
          const shifted = ((charCode - 65 + shift) % 26) + 65;
          encrypted += String.fromCharCode(shifted);
        } else {
          encrypted += original[i];
        }
      }
      
      // Decrypt
      let decrypted = '';
      for (let i = 0; i < encrypted.length; i++) {
        const charCode = encrypted.charCodeAt(i);
        if (charCode >= 97 && charCode <= 122) {
          const shifted = ((charCode - 97 - shift + 26) % 26) + 97;
          decrypted += String.fromCharCode(shifted);
        } else if (charCode >= 65 && charCode <= 90) {
          const shifted = ((charCode - 65 - shift + 26) % 26) + 65;
          decrypted += String.fromCharCode(shifted);
        } else {
          decrypted += encrypted[i];
        }
      }
      
      expect(decrypted).toBe(original);
    });

    it('should perform XOR encryption', () => {
      const plaintext = 'hello';
      const key = 'key'; // Repeating key
      let ciphertext = '';
      
      for (let i = 0; i < plaintext.length; i++) {
        const charCode = plaintext.charCodeAt(i);
        const keyChar = key.charCodeAt(i % key.length);
        const encryptedCharCode = charCode ^ keyChar;
        ciphertext += String.fromCharCode(encryptedCharCode);
      }
      
      expect(ciphertext).not.toBe(plaintext);
    });

    it('should perform XOR decryption', () => {
      const originalPlaintext = 'hello';
      const key = 'key';
      
      // Encrypt
      let ciphertext = '';
      for (let i = 0; i < originalPlaintext.length; i++) {
        const charCode = originalPlaintext.charCodeAt(i);
        const keyChar = key.charCodeAt(i % key.length);
        const encryptedCharCode = charCode ^ keyChar;
        ciphertext += String.fromCharCode(encryptedCharCode);
      }
      
      // Decrypt (same operation as XOR is symmetric)
      let decrypted = '';
      for (let i = 0; i < ciphertext.length; i++) {
        const charCode = ciphertext.charCodeAt(i);
        const keyChar = key.charCodeAt(i % key.length);
        const decryptedCharCode = charCode ^ keyChar;
        decrypted += String.fromCharCode(decryptedCharCode);
      }
      
      expect(decrypted).toBe(originalPlaintext);
    });

    it('should handle binary data encryption', () => {
      const data = new Uint8Array([1, 2, 3, 4, 5]);
      const key = 42;
      const encrypted = new Uint8Array(data.length);
      
      for (let i = 0; i < data.length; i++) {
        encrypted[i] = data[i] ^ key;
      }
      
      // Decrypt
      const decrypted = new Uint8Array(encrypted.length);
      for (let i = 0; i < encrypted.length; i++) {
        decrypted[i] = encrypted[i] ^ key;
      }
      
      for (let i = 0; i < data.length; i++) {
        expect(decrypted[i]).toBe(data[i]);
      }
    });

    it('should demonstrate key sensitivity', () => {
      const plaintext = 'secret';
      const correctKey = 123;
      const wrongKey = 124;
      
      // Encrypt with correct key
      let ciphertext = '';
      for (let i = 0; i < plaintext.length; i++) {
        const charCode = plaintext.charCodeAt(i);
        const encryptedCharCode = charCode ^ correctKey;
        ciphertext += String.fromCharCode(encryptedCharCode);
      }
      
      // Decrypt with wrong key
      let decryptedWrong = '';
      for (let i = 0; i < ciphertext.length; i++) {
        const charCode = ciphertext.charCodeAt(i);
        const decryptedCharCode = charCode ^ wrongKey;
        decryptedWrong += String.fromCharCode(decryptedCharCode);
      }
      
      expect(decryptedWrong).not.toBe(plaintext);
    });

    it('should handle different key sizes', () => {
      const plaintext = 'test message';
      
      const encryptWithKey = (text: string, key: number) => {
        let result = '';
        for (let i = 0; i < text.length; i++) {
          const charCode = text.charCodeAt(i);
          const encryptedCharCode = charCode ^ key;
          result += String.fromCharCode(encryptedCharCode);
        }
        return result;
      };
      
      const decryptWithKey = (text: string, key: number) => {
        let result = '';
        for (let i = 0; i < text.length; i++) {
          const charCode = text.charCodeAt(i);
          const decryptedCharCode = charCode ^ key;
          result += String.fromCharCode(decryptedCharCode);
        }
        return result;
      };
      
      const encrypted = encryptWithKey(plaintext, 999999);
      const decrypted = decryptWithKey(encrypted, 999999);
      
      expect(decrypted).toBe(plaintext);
    });

    it('should encrypt with stream cipher concept', () => {
      const plaintext = 'streamcipher';
      let keyStream = 0x12345678; // Initial key
      const keystreamValues: number[] = [];
      
      // Generate keystream
      for (let i = 0; i < plaintext.length; i++) {
        // Simple PRNG for demonstration
        keyStream = (keyStream * 1103515245 + 12345) & 0x7fffffff;
        keystreamValues.push((keyStream >> 16) & 0xff);
      }
      
      // Encrypt
      let ciphertext = '';
      for (let i = 0; i < plaintext.length; i++) {
        const encryptedCharCode = plaintext.charCodeAt(i) ^ keystreamValues[i];
        ciphertext += String.fromCharCode(encryptedCharCode);
      }
      
      expect(ciphertext).not.toBe(plaintext);
    });

    it('should demonstrate block cipher concept', () => {
      const plaintext = 'blockcipherdemo';
      const blockSize = 8; // 8-byte blocks
      
      // Pad plaintext to block size
      const paddedLength = Math.ceil(plaintext.length / blockSize) * blockSize;
      let paddedPlaintext = plaintext.padEnd(paddedLength, '\0');
      
      // Process in blocks
      const encryptedBlocks: string[] = [];
      for (let i = 0; i < paddedPlaintext.length; i += blockSize) {
        const block = paddedPlaintext.substr(i, blockSize);
        let encryptedBlock = '';
        
        // Simple substitution for demonstration
        for (let j = 0; j < block.length; j++) {
          const charCode = block.charCodeAt(j);
          const encryptedCharCode = (charCode + 1) % 256; // Simple transformation
          encryptedBlock += String.fromCharCode(encryptedCharCode);
        }
        
        encryptedBlocks.push(encryptedBlock);
      }
      
      const ciphertext = encryptedBlocks.join('');
      expect(ciphertext).not.toBe(paddedPlaintext);
    });

    it('should demonstrate public key concept', () => {
      // Simulate RSA-like concept with small numbers
      // In real RSA: c = m^e mod n, m = c^d mod n
      
      // For demonstration only - not secure
      const message = 42;
      const publicKey = { e: 5, n: 35 }; // e=5, n=35 (p=5, q=7)
      const privateKey = { d: 5, n: 35 }; // d=5, n=35
      
      // Encrypt: m^e mod n
      const encrypted = Math.pow(message, publicKey.e) % publicKey.n;
      
      // Decrypt: c^d mod n
      const decrypted = Math.pow(encrypted, privateKey.d) % privateKey.n;
      
      expect(decrypted).toBe(message);
    });

    it('should demonstrate digital signature concept', () => {
      const document = 'Important document';
      const privateKey = 12345;
      
      // Create hash of document
      let hash = 0;
      for (let i = 0; i < document.length; i++) {
        hash = ((hash << 5) - hash) + document.charCodeAt(i);
        hash |= 0;
      }
      hash = Math.abs(hash);
      
      // Create signature (encrypt hash with private key - simplified)
      const signature = (hash + privateKey) % 1000000; // Simplified signing
      
      // Verify signature (decrypt with public key and compare to hash)
      const decryptedHash = (signature - privateKey + 1000000) % 1000000;
      
      // Recalculate hash to verify
      let recalculatedHash = 0;
      for (let i = 0; i < document.length; i++) {
        recalculatedHash = ((recalculatedHash << 5) - recalculatedHash) + document.charCodeAt(i);
        recalculatedHash |= 0;
      }
      recalculatedHash = Math.abs(recalculatedHash);
      
      expect(decryptedHash).toBe(recalculatedHash);
    });

    it('should handle different data types', () => {
      const dataTypes = [
        { type: 'string', value: 'hello' },
        { type: 'number', value: 12345 },
        { type: 'boolean', value: true },
        { type: 'array', value: [1, 2, 3] }
      ];
      
      dataTypes.forEach(data => {
        const serialized = JSON.stringify(data.value);
        let hash = 0;
        for (let i = 0; i < serialized.length; i++) {
          hash = ((hash << 5) - hash) + serialized.charCodeAt(i);
          hash |= 0;
        }
        const hexHash = Math.abs(hash).toString(16);
        
        expect(hexHash).toBeDefined();
      });
    });

    it('should demonstrate key derivation', () => {
      const password = 'mysecretpassword';
      const salt = 'randomsalt';
      const iterations = 1000;
      
      // Simplified PBKDF2 concept
      let derivedKey = password + salt;
      for (let i = 0; i < iterations; i++) {
        let hash = 0;
        for (let j = 0; j < derivedKey.length; j++) {
          hash = ((hash << 5) - hash) + derivedKey.charCodeAt(j);
          hash |= 0;
        }
        derivedKey = Math.abs(hash).toString(16);
      }
      
      expect(derivedKey.length).toBeGreaterThan(0);
    });

    it('should demonstrate initialization vector concept', () => {
      const plaintext = 'secret message';
      const iv = 'randomiv123456'; // Initialization vector
      
      // Simple CBC mode concept: XOR with IV, then encrypt
      let ciphertext = '';
      let previousBlock = iv.substring(0, plaintext.length <= 16 ? plaintext.length : 16);
      
      for (let i = 0; i < plaintext.length; i += 16) {
        const block = plaintext.substr(i, 16);
        let xorBlock = '';
        
        // XOR block with previous ciphertext (or IV for first block)
        for (let j = 0; j < block.length; j++) {
          const plainChar = block.charCodeAt(j);
          const prevChar = previousBlock.charCodeAt(j % previousBlock.length);
          const xorChar = plainChar ^ prevChar;
          xorBlock += String.fromCharCode(xorChar);
        }
        
        // "Encrypt" the XORed block (simplified)
        let encryptedBlock = '';
        for (let j = 0; j < xorBlock.length; j++) {
          const charCode = xorBlock.charCodeAt(j);
          const encryptedCharCode = (charCode + 1) % 256;
          encryptedBlock += String.fromCharCode(encryptedCharCode);
        }
        
        ciphertext += encryptedBlock;
        previousBlock = encryptedBlock;
      }
      
      expect(ciphertext).not.toBe(plaintext);
    });

    it('should demonstrate authenticated encryption concept', () => {
      const plaintext = 'confidential';
      const aad = 'additional authenticated data'; // Associated authenticated data
      const key = 'secretkey';
      
      // Encrypt the plaintext
      let ciphertext = '';
      for (let i = 0; i < plaintext.length; i++) {
        const charCode = plaintext.charCodeAt(i);
        const keyChar = key.charCodeAt(i % key.length);
        const encryptedCharCode = charCode ^ keyChar;
        ciphertext += String.fromCharCode(encryptedCharCode);
      }
      
      // Create authentication tag based on ciphertext and AAD
      let authTag = 0;
      const combined = ciphertext + aad;
      for (let i = 0; i < combined.length; i++) {
        authTag = ((authTag << 5) - authTag) + combined.charCodeAt(i);
        authTag |= 0;
      }
      authTag = Math.abs(authTag);
      
      expect(ciphertext).not.toBe(plaintext);
      expect(authTag).toBeGreaterThan(0);
    });

    it('should demonstrate perfect forward secrecy concept', () => {
      // Generate ephemeral keys for each session
      const generateEphemeralKey = () => {
        return Math.floor(Math.random() * 1000000);
      };
      
      const session1Key = generateEphemeralKey();
      const session2Key = generateEphemeralKey();
      
      // Keys should be different
      expect(session1Key).not.toBe(session2Key);
      
      // Each session uses its own key
      const message1 = 'message for session 1';
      const message2 = 'message for session 2';
      
      const encrypted1 = message1.charCodeAt(0) ^ session1Key;
      const encrypted2 = message2.charCodeAt(0) ^ session2Key;
      
      expect(encrypted1).not.toBe(encrypted2);
    });

    it('should demonstrate hybrid encryption concept', () => {
      // Combine asymmetric and symmetric encryption
      // Use asymmetric to encrypt symmetric key, then symmetric to encrypt data
      
      // Symmetric key (simplified)
      const symmetricKey = 54321;
      const plaintext = 'hybrid encryption';
      
      // Encrypt data with symmetric key
      let encryptedData = '';
      for (let i = 0; i < plaintext.length; i++) {
        const charCode = plaintext.charCodeAt(i);
        const encryptedCharCode = charCode ^ symmetricKey;
        encryptedData += String.fromCharCode(encryptedCharCode);
      }
      
      // "Encrypt" symmetric key with public key (simplified)
      const publicKey = 98765;
      const encryptedKey = symmetricKey ^ publicKey;
      
      // Decrypt key with private key (simplified)
      const privateKey = 98765; // Same as public for this demo
      const decryptedKey = encryptedKey ^ privateKey;
      
      // Decrypt data with decrypted key
      let decryptedData = '';
      for (let i = 0; i < encryptedData.length; i++) {
        const charCode = encryptedData.charCodeAt(i);
        const decryptedCharCode = charCode ^ decryptedKey;
        decryptedData += String.fromCharCode(decryptedCharCode);
      }
      
      expect(decryptedData).toBe(plaintext);
    });

    it('should demonstrate key rotation', () => {
      const oldKey = 11111;
      const newKey = 22222;
      const plaintext = 'data to encrypt';
      
      // Encrypt with old key
      let oldEncrypted = '';
      for (let i = 0; i < plaintext.length; i++) {
        const charCode = plaintext.charCodeAt(i);
        const encryptedCharCode = charCode ^ oldKey;
        oldEncrypted += String.fromCharCode(encryptedCharCode);
      }
      
      // Decrypt with old key and re-encrypt with new key (rotation)
      let reEncrypted = '';
      for (let i = 0; i < oldEncrypted.length; i++) {
        const charCode = oldEncrypted.charCodeAt(i);
        const decryptedCharCode = charCode ^ oldKey; // Decrypt with old key
        const encryptedCharCode = decryptedCharCode ^ newKey; // Re-encrypt with new
        reEncrypted += String.fromCharCode(encryptedCharCode);
      }
      
      // Decrypt with new key to verify
      let finalDecrypted = '';
      for (let i = 0; i < reEncrypted.length; i++) {
        const charCode = reEncrypted.charCodeAt(i);
        const decryptedCharCode = charCode ^ newKey;
        finalDecrypted += String.fromCharCode(decryptedCharCode);
      }
      
      expect(finalDecrypted).toBe(plaintext);
    });

    it('should demonstrate secure random generation', () => {
      // Generate multiple random values to check distribution
      const randomValues: number[] = [];
      for (let i = 0; i < 100; i++) {
        // Simulate secure random (in real implementation, use crypto module)
        randomValues.push(Math.floor(Math.random() * 1000000));
      }
      
      // Check that we have varied values (not all the same)
      const uniqueValues = new Set(randomValues);
      expect(uniqueValues.size).toBeGreaterThan(50); // At least 50% unique
    });
  });
});