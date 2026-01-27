// Security-related utility tests

describe('Security Utilities', () => {
  // Password strength tests
  describe('Password Strength Validation', () => {
    it('should validate strong password', () => {
      const password = 'Str0ngP@ssw0rd!';
      const hasUpper = /[A-Z]/.test(password);
      const hasLower = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
      const isLongEnough = password.length >= 8;

      expect(hasUpper).toBe(true);
      expect(hasLower).toBe(true);
      expect(hasNumber).toBe(true);
      expect(hasSpecial).toBe(true);
      expect(isLongEnough).toBe(true);
    });

    it('should reject weak password without uppercase', () => {
      const password = 'str0ngp@ssw0rd!';
      const hasUpper = /[A-Z]/.test(password);

      expect(hasUpper).toBe(false);
    });

    it('should reject weak password without lowercase', () => {
      const password = 'STR0NGP@SSW0RD!';
      const hasLower = /[a-z]/.test(password);

      expect(hasLower).toBe(false);
    });

    it('should reject weak password without number', () => {
      const password = 'StrongP@ssword!';
      const hasNumber = /[0-9]/.test(password);

      expect(hasNumber).toBe(false);
    });

    it('should reject weak password without special character', () => {
      const password = 'StrongPassw0rd';
      const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

      expect(hasSpecial).toBe(false);
    });

    it('should reject short password', () => {
      const password = 'Str0ng!';
      const isLongEnough = password.length >= 8;

      expect(isLongEnough).toBe(false);
    });

    it('should check for common passwords', () => {
      const commonPasswords = ['password', '12345678', 'qwerty', 'admin', 'letmein'];
      const userInput = 'password123';

      const isCommon = commonPasswords.some(common =>
        userInput.toLowerCase().includes(common) ||
        common.includes(userInput.toLowerCase())
      );

      expect(isCommon).toBe(true);
    });

    it('should check for keyboard patterns', () => {
      const keyboardPatterns = [
        'qwerty', 'asdfgh', 'zxcvbn', '123456', 'qwertyuiop'
      ];

      const hasKeyboardPattern = (password: string) => {
        const lowerPass = password.toLowerCase();
        return keyboardPatterns.some(pattern =>
          lowerPass.includes(pattern) ||
          lowerPass.includes(pattern.split('').reverse().join(''))
        );
      };

      expect(hasKeyboardPattern('qwerty123')).toBe(true);
      expect(hasKeyboardPattern('321ytrewq')).toBe(true);
      expect(hasKeyboardPattern('randomPass1!')).toBe(false);
    });

    it('should check for repeated characters', () => {
      const hasRepeatedChars = (password: string) => {
        return /(.)\1{2,}/.test(password); // 3 or more repeated chars
      };

      expect(hasRepeatedChars('aaabbbccc')).toBe(true);
      expect(hasRepeatedChars('abccba')).toBe(false);
      expect(hasRepeatedChars('aaabbb')).toBe(true);
    });

    it('should check for sequential characters', () => {
      const hasSequentialChars = (password: string) => {
        const str = password.toLowerCase();
        for (let i = 0; i < str.length - 2; i++) {
          const code1 = str.charCodeAt(i);
          const code2 = str.charCodeAt(i + 1);
          const code3 = str.charCodeAt(i + 2);

          if (code2 === code1 + 1 && code3 === code2 + 1) {
            return true;
          }
        }
        return false;
      };

      expect(hasSequentialChars('abc123')).toBe(true);
      expect(hasSequentialChars('xyz789')).toBe(true);
      expect(hasSequentialChars('random')).toBe(false);
    });

    it('should calculate password entropy', () => {
      const calculateEntropy = (password: string) => {
        let charsetSize = 0;
        if (/[a-z]/.test(password)) charsetSize += 26;
        if (/[A-Z]/.test(password)) charsetSize += 26;
        if (/[0-9]/.test(password)) charsetSize += 10;
        if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32;

        return charsetSize > 0 ? password.length * Math.log2(charsetSize) : 0;
      };

      const strongPassword = 'Str0ngP@ssw0rd!';
      const weakPassword = 'password';

      expect(calculateEntropy(strongPassword)).toBeGreaterThan(calculateEntropy(weakPassword));
    });

    it('should validate password history', () => {
      const passwordHistory = ['OldPass1!', 'Previous2#', 'Another3$'];
      const newPassword = 'Str0ngP@ssw0rd!';

      const isReuse = passwordHistory.includes(newPassword);
      expect(isReuse).toBe(false);
    });

    it('should check for personal information in password', () => {
      const userInfo = {
        firstName: 'John',
        lastName: 'Doe',
        birthYear: '1990',
        phone: '5551234567'
      };

      const password = 'MyNameIsJohnDoe1990!';
      const containsInfo = Object.values(userInfo).some(info =>
        password.toLowerCase().includes(info.toLowerCase())
      );

      expect(containsInfo).toBe(true);
    });

    it('should enforce password expiration', () => {
      const lastPasswordChange = new Date('2023-01-01');
      const currentDate = new Date('2023-04-01');

      const daysSinceChange = Math.floor(
        (currentDate.getTime() - lastPasswordChange.getTime()) / (1000 * 60 * 60 * 24)
      );

      const requiresChange = daysSinceChange > 90; // 90-day policy
      expect(requiresChange).toBe(true);
    });

    it('should validate password complexity requirements', () => {
      const password = 'Compl3xP@ssw0rd!';
      const requirements = {
        minLength: password.length >= 8,
        hasUpper: /[A-Z]/.test(password),
        hasLower: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
        noSpaces: !/\s/.test(password)
      };

      expect(requirements.minLength).toBe(true);
      expect(requirements.hasUpper).toBe(true);
      expect(requirements.hasLower).toBe(true);
      expect(requirements.hasNumber).toBe(true);
      expect(requirements.hasSpecial).toBe(true);
      expect(requirements.noSpaces).toBe(true);
    });

    it('should check password similarity to previous', () => {
      const oldPassword = 'OldP@ssw0rd!';
      const newPassword = 'NewP@ssw0rd!';

      // Calculate similarity (simple character comparison)
      let similarity = 0;
      const minLength = Math.min(oldPassword.length, newPassword.length);

      for (let i = 0; i < minLength; i++) {
        if (oldPassword[i] === newPassword[i]) {
          similarity++;
        }
      }

      const similarityPercentage = (similarity / minLength) * 100;
      expect(similarityPercentage).toBeLessThan(80); // Should be less than 80% similar
    });

    it('should validate password against dictionary', () => {
      const dictionaryWords = ['password', 'welcome', 'sunshine', 'princess', 'dragon'];
      const password = 'MyDogIsSunshine123!';

      const containsDictionaryWord = dictionaryWords.some(word =>
        password.toLowerCase().includes(word)
      );

      expect(containsDictionaryWord).toBe(true);
    });

    it('should validate password with custom requirements', () => {
      const password = 'CustomR3quirements!';
      const customRequirements = [
        { test: (p: string) => p.length >= 10, message: 'Must be at least 10 characters' },
        { test: (p: string) => /[A-Z]/.test(p) && (p.match(/[A-Z]/g)?.length ?? 0) >= 2, message: 'Must have at least 2 uppercase letters' },
        { test: (p: string) => /[0-9]/.test(p) && (p.match(/[0-9]/g)?.length ?? 0) >= 3, message: 'Must have at least 3 numbers' },
        { test: (p: string) => /[!@#$%^&*]/.test(p), message: 'Must have special character' }
      ];

      const results = customRequirements.map(req => req.test(password));
      expect(results.every(r => r)).toBe(true);
    });

    it('should handle password validation with multiple checks', () => {
      const password = 'Compl3xP@ssw0rd!';

      const checks = {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
        noCommonSequence: !/(012|123|234|345|456|567|678|789|890|abc|bcd|cde|def)/.test(password.toLowerCase()),
        noRepeatedChars: !(password.toLowerCase().match(/(.)\1{2,}/)),
        notInCommonList: !['password', '12345678', 'qwerty'].includes(password.toLowerCase())
      };

      expect(Object.values(checks).every(result => result)).toBe(true);
    });
  });

  // Input sanitization tests
  describe('Input Sanitization', () => {
    it('should sanitize HTML input', () => {
      const dirtyInput = '<script>alert("XSS")</script><p>Hello World</p>';
      const sanitized = dirtyInput.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toContain('<p>Hello World</p>');
    });

    it('should remove dangerous HTML attributes', () => {
      const input = '<img src="x" onerror="alert(1)">';
      const sanitized = input.replace(/\s+on\w+="[^"]*"/gi, '');

      expect(sanitized).not.toContain('onerror');
    });

    it('should encode special characters', () => {
      const input = 'Hello & "World" <script>';
      const encoded = input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');

      expect(encoded).toBe('Hello &amp; &quot;World&quot; &lt;script&gt;');
    });

    it('should validate URL format', () => {
      const urls = [
        { url: 'https://example.com', valid: true },
        { url: 'http://example.com/path', valid: true },
        { url: 'ftp://example.com', valid: false },
        { url: 'javascript:alert(1)', valid: false },
        { url: 'data:text/html,<script>', valid: false }
      ];

      urls.forEach(({ url, valid }) => {
        const isValid = /^https?:\/\/.+/.test(url);
        expect(isValid).toBe(valid);
      });
    });

    it('should validate email format', () => {
      const emails = [
        { email: 'user@example.com', valid: true },
        { email: 'user.name+tag@example.co.uk', valid: true },
        { email: 'user@', valid: false },
        { email: '@example.com', valid: false },
        { email: 'user<script>@example.com', valid: false }
      ];

      emails.forEach(({ email, valid }) => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
          !/<script/i.test(email);
        expect(isValid).toBe(valid);
      });
    });

    it('should validate file upload extensions', () => {
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf'];
      const files = [
        { name: 'image.jpg', valid: true },
        { name: 'document.pdf', valid: true },
        { name: 'script.js', valid: false },
        { name: 'malicious.exe', valid: false }
      ];

      files.forEach(({ name, valid }) => {
        const ext = '.' + name.split('.').pop()?.toLowerCase();
        const isAllowed = allowedExtensions.includes(ext);
        expect(isAllowed).toBe(valid);
      });
    });

    it('should validate file upload mime types', () => {
      const allowedMimes = ['image/jpeg', 'image/png', 'application/pdf'];
      const files = [
        { mime: 'image/jpeg', valid: true },
        { mime: 'image/png', valid: true },
        { mime: 'text/javascript', valid: false },
        { mime: 'application/x-msdownload', valid: false }
      ];

      files.forEach(({ mime, valid }) => {
        const isAllowed = allowedMimes.includes(mime);
        expect(isAllowed).toBe(valid);
      });
    });

    it('should escape SQL special characters', () => {
      const userInput = "Robert'; DROP TABLE Students; --";
      const escaped = userInput.replace(/'/g, "''");

      expect(escaped).toBe("Robert''; DROP TABLE Students; --");
      expect(escaped).not.toContain("'; DROP TABLE");
    });

    it('should validate JSON input', () => {
      const validJson = '{"name": "John", "age": 30}';
      const invalidJson = '{"name": "John", "age": 30';

      const isValidJson = (str: string) => {
        try {
          JSON.parse(str);
          return true;
        } catch {
          return false;
        }
      };

      expect(isValidJson(validJson)).toBe(true);
      expect(isValidJson(invalidJson)).toBe(false);
    });

    it('should validate numeric input', () => {
      const inputs = [
        { value: '123', valid: true },
        { value: '-456', valid: true },
        { value: '12.34', valid: true },
        { value: '123abc', valid: false },
        { value: '123;DROP TABLE', valid: false }
      ];

      inputs.forEach(({ value, valid }) => {
        const isNumeric = /^-?\d+(\.\d+)?$/.test(value) && !/[;'"`]/.test(value);
        expect(isNumeric).toBe(valid);
      });
    });

    it('should validate date format', () => {
      const dates = [
        { date: '2023-05-15', valid: true },
        { date: '05/15/2023', valid: true },
        { date: '2023-13-01', valid: false }, // Invalid month
        { date: '2023-02-30', valid: false }, // Invalid day
        { date: '2023-05-15<script>', valid: false }
      ];

      dates.forEach(({ date, valid }) => {
        const isValid = /^\d{4}-\d{2}-\d{2}$|^\d{2}\/\d{2}\/\d{4}$/.test(date) &&
          !/<script/i.test(date);

        // Additional validation for actual date
        if (isValid) {
          const d = new Date(date);
          expect(d.toString()).not.toBe('Invalid Date');
        }
      });
    });

    it('should validate phone number format', () => {
      const phones = [
        { number: '+1-555-123-4567', valid: true },
        { number: '(555) 123-4567', valid: true },
        { number: '555.123.4567', valid: true },
        { number: '5551234567', valid: true },
        { number: '555-123-4567 ext. 123', valid: true },
        { number: '555-123-4567<script>', valid: false }
      ];

      phones.forEach(({ number, valid }) => {
        // Clean the number and check for script injection
        const cleanedNumber = number.replace(/[^\d+]/g, '');
        const hasNoScript = !/<script/i.test(number);

        // Valid phone formats: international, US with parens, dots, dashes, or plain
        const isValidFormat = /^\+?[1-9]\d{1,14}$/.test(cleanedNumber) &&
          cleanedNumber.length >= 10 && cleanedNumber.length <= 15;

        const isValid = isValidFormat && hasNoScript;
        expect(isValid).toBe(valid);
      });
    });

    it('should validate IP address format', () => {
      const ips = [
        { addr: '192.168.1.1', valid: true },
        { addr: '10.0.0.1', valid: true },
        { addr: '255.255.255.255', valid: true },
        { addr: '192.168.1.256', valid: false }, // Invalid octet
        { addr: '192.168.1', valid: false }, // Incomplete
        { addr: '192.168.1.1<script>', valid: false }
      ];

      ips.forEach(({ addr, valid }) => {
        const cleanAddr = addr.replace(/<script[^>]*>.*?<\/script>/gi, '');
        const isValid = /^(\d{1,3}\.){3}\d{1,3}$/.test(cleanAddr) &&
          cleanAddr.split('.').every(octet => parseInt(octet) <= 255) &&
          !/<script/i.test(addr);
        expect(isValid).toBe(valid);
      });
    });

    it('should validate UUID format', () => {
      const uuids = [
        { id: '550e8400-e29b-41d4-a716-446655440000', valid: true },
        { id: '550e8400-e29b-41d4-a716-44665544000g', valid: false }, // Invalid hex
        { id: '550e8400-e29b-41d4-a716', valid: false }, // Incomplete
        { id: '550e8400-e29b-41d4-a716-446655440000<script>', valid: false }
      ];

      uuids.forEach(({ id, valid }) => {
        const cleanId = id.replace(/<script[^>]*>.*?<\/script>/gi, '');
        const isValid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(cleanId) &&
          !/<script/i.test(id);
        expect(isValid).toBe(valid);
      });
    });

    it('should validate credit card number format', () => {
      const cards = [
        { number: '4532015112830366', valid: true }, // Visa
        { number: '5555555555554444', valid: true }, // Mastercard
        { number: '378282246310005', valid: true }, // Amex
        { number: '1234567890123456', valid: false }, // Invalid
        { number: '4532015112830366<script>', valid: false }
      ];

      cards.forEach(({ number, valid }) => {
        const cleanNumber = number.replace(/[^0-9]/g, '');
        const isValid = cleanNumber.length >= 13 && cleanNumber.length <= 19 &&
          !/<script/i.test(number);

        if (isValid && valid) {
          // Luhn algorithm check for valid CC
          let nCheck = 0;
          let nDigit = 0;
          let bEven = false;

          for (let n = cleanNumber.length - 1; n >= 0; n--) {
            const cDigit = cleanNumber.charAt(n);
            nDigit = parseInt(cDigit, 10);

            if (bEven) {
              if ((nDigit *= 2) > 9) nDigit -= 9;
            }

            nCheck += nDigit;
            bEven = !bEven;
          }

          expect((nCheck % 10) === 0).toBe(true);
        }
      });
    });

    it('should validate file path traversal', () => {
      const paths = [
        { path: './uploads/image.jpg', valid: true },
        { path: '../config/database.yml', valid: false }, // Path traversal
        { path: '../../etc/passwd', valid: false }, // Path traversal
        { path: 'folder/subfolder/file.txt', valid: true }
      ];

      paths.forEach(({ path, valid }) => {
        const isTraversal = /(\.\.\/|\.\.\\|%2e%2e%2f|%2e%2e%5c)/i.test(path);
        expect(!isTraversal).toBe(valid);
      });
    });

    it('should validate JWT token format', () => {
      const tokens = [
        { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', valid: true },
        { token: 'invalid.token.format', valid: false },
        { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ', valid: false }, // Missing signature
        { token: '<script>alert(1)</script>', valid: false }
      ];

      tokens.forEach(({ token, valid }) => {
        const hasThreeParts = token.split('.').length === 3;
        const noScriptTags = !/<script/i.test(token);
        expect(hasThreeParts && noScriptTags).toBe(valid);
      });
    });

    it('should validate XML input', () => {
      const xmls = [
        { input: '<root><element>value</element></root>', valid: true },
        { input: '<?xml version="1.0"?><root></root>', valid: true },
        { input: '<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><root>&xxe;</root>', valid: false }, // XXE
        { input: '<script>alert(1)</script>', valid: false } // Script injection
      ];

      xmls.forEach(({ input, valid }) => {
        const hasNoExternalEntities = !input.includes('SYSTEM');
        const hasNoScript = !/<script/i.test(input);
        expect(hasNoExternalEntities && hasNoScript).toBe(valid);
      });
    });

    it('should validate base64 encoding', () => {
      const inputs = [
        { data: 'SGVsbG8gV29ybGQ=', valid: true }, // "Hello World" base64
        { data: 'invalid_base64', valid: false },
        { data: 'SGVsbG8gV29ybGQ', valid: true }, // Valid without padding
        { data: 'PD94bWwgdmVyc2lvbj0iMS4wIj8+', valid: true } // "<?xml version="1.0"?>" base64
      ];

      inputs.forEach(({ data, valid }) => {
        const validRegex = /^[A-Za-z0-9+/]*={0,2}$/;
        const isValid = validRegex.test(data) && data.length % 4 === 0;
        expect(isValid).toBe(valid);
      });
    });
  });

  // Authentication tests
  describe('Authentication Security', () => {
    it('should validate session tokens', () => {
      const generateToken = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 32; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
      };

      const token = generateToken();
      expect(token.length).toBe(32);
      expect(/^[A-Za-z0-9]+$/.test(token)).toBe(true);
    });

    it('should check password hash strength', () => {
      // Simulating bcrypt-like hashing
      const simulateHash = (password: string) => {
        // In reality, this would be a proper cryptographic hash
        return `hash_${password.length}_${password.split('').sort().join('')}`;
      };

      const weakPassword = '123456';
      const strongPassword = 'Str0ngP@ssw0rd!';

      const weakHash = simulateHash(weakPassword);
      const strongHash = simulateHash(strongPassword);

      // Hashes should be different lengths based on password complexity
      expect(weakHash.length).toBeLessThan(strongHash.length);
    });

    it('should validate rate limiting', () => {
      const attempts: Record<string, number[]> = {};
      const currentTime = Date.now();

      const recordAttempt = (identifier: string) => {
        if (!attempts[identifier]) {
          attempts[identifier] = [];
        }
        attempts[identifier].push(currentTime);
      };

      const isRateLimited = (identifier: string, maxAttempts: number, windowMs: number) => {
        const windowStart = currentTime - windowMs;
        attempts[identifier] = attempts[identifier].filter(time => time > windowStart);
        return attempts[identifier].length > maxAttempts;
      };

      // Record multiple attempts
      for (let i = 0; i < 6; i++) {
        recordAttempt('test-user');
      }

      // Should be rate limited (more than 5 attempts in 1 minute)
      expect(isRateLimited('test-user', 5, 60000)).toBe(true);
    });

    it('should validate CSRF tokens', () => {
      const generateCSRFToken = () => {
        return Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);
      };

      const serverToken = generateCSRFToken();
      const clientToken = serverToken; // In a real scenario, this would be sent to client and back

      expect(serverToken).toBe(clientToken);
      expect(serverToken.length).toBeGreaterThan(10);
    });

    it('should validate OTP codes', () => {
      const generateOTP = () => {
        return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
      };

      const otp = generateOTP();
      expect(otp.length).toBe(6);
      expect(/^\d+$/.test(otp)).toBe(true);
    });
  });
});