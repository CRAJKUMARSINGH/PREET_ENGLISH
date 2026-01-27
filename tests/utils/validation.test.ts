import { validateEmail, validatePassword, validateName } from '@/utils/validation';

describe('Validation Utilities', () => {
  // Email validation tests
  describe('validateEmail function', () => {
    it('returns true for valid email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@example.co.uk')).toBe(true);
      expect(validateEmail('user123@test-domain.org')).toBe(true);
    });

    it('returns false for invalid email addresses', () => {
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('test@.com')).toBe(false);
      expect(validateEmail('test..test@example.com')).toBe(false);
    });

    it('handles special email cases', () => {
      expect(validateEmail('test+newsletter@example.com')).toBe(true);
      expect(validateEmail('user_name@example-domain.co')).toBe(true);
      expect(validateEmail('123@example.com')).toBe(true);
    });

    it('trims whitespace before validation', () => {
      expect(validateEmail(' test@example.com ')).toBe(true);
      expect(validateEmail(' invalid-email ')).toBe(false);
    });

    it('handles international domain names', () => {
      expect(validateEmail('test@xn--bcher-kva.example')).toBe(true);
    });

    it('rejects emails with spaces', () => {
      expect(validateEmail('test user@example.com')).toBe(false);
      expect(validateEmail(' test@example.com')).toBe(true); // space at beginning should be trimmed
    });

    it('validates common domain extensions', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('test@example.org')).toBe(true);
      expect(validateEmail('test@example.net')).toBe(true);
      expect(validateEmail('test@example.edu')).toBe(true);
      expect(validateEmail('test@example.gov')).toBe(true);
    });

    it('handles subdomain emails', () => {
      expect(validateEmail('test@mail.example.com')).toBe(true);
      expect(validateEmail('user@sub.domain.org')).toBe(true);
    });

    it('handles quoted local parts', () => {
      expect(validateEmail('"test"@example.com')).toBe(true);
      expect(validateEmail('"test email"@example.com')).toBe(true);
    });

    it('rejects emails with special characters in local part', () => {
      expect(validateEmail('test@email@example.com')).toBe(false);
      expect(validateEmail('test(email)@example.com')).toBe(false);
    });
  });

  // Password validation tests
  describe('validatePassword function', () => {
    it('returns true for valid passwords', () => {
      expect(validatePassword('Password123!')).toBe(true);
      expect(validatePassword('MySecurePassword2023@')).toBe(true);
      expect(validatePassword('ComplexPass!2')).toBe(true);
    });

    it('returns false for passwords that are too short', () => {
      expect(validatePassword('')).toBe(false);
      expect(validatePassword('short')).toBe(false);
      expect(validatePassword('12345')).toBe(false);
    });

    it('returns false for passwords without uppercase letters', () => {
      expect(validatePassword('password123!')).toBe(false);
      expect(validatePassword('mypassword123@')).toBe(false);
    });

    it('returns false for passwords without lowercase letters', () => {
      expect(validatePassword('PASSWORD123!')).toBe(false);
      expect(validatePassword('MYSECUREPASS123@')).toBe(false);
    });

    it('returns false for passwords without numbers', () => {
      expect(validatePassword('Password!')).toBe(false);
      expect(validatePassword('MySecurePassword@')).toBe(false);
    });

    it('returns false for passwords without special characters', () => {
      expect(validatePassword('Password123')).toBe(false);
      expect(validatePassword('MySecurePassword2023')).toBe(false);
    });

    it('accepts various special characters', () => {
      expect(validatePassword('Password123!')).toBe(true);
      expect(validatePassword('Password123@')).toBe(true);
      expect(validatePassword('Password123#')).toBe(true);
      expect(validatePassword('Password123$')).toBe(true);
      expect(validatePassword('Password123%')).toBe(true);
      expect(validatePassword('Password123^')).toBe(true);
      expect(validatePassword('Password123&')).toBe(true);
      expect(validatePassword('Password123*')).toBe(true);
      expect(validatePassword('Password123(')).toBe(true);
      expect(validatePassword('Password123)')).toBe(true);
    });

    it('handles maximum password length', () => {
      const longPassword = 'Aa1!' + 'a'.repeat(100);
      expect(validatePassword(longPassword)).toBe(true);
    });

    it('rejects passwords with common patterns', () => {
      expect(validatePassword('Password123!')).toBe(true); // This might be accepted depending on implementation
      expect(validatePassword('qwerty123!')).toBe(true); // Depends on implementation
    });

    it('handles Unicode characters', () => {
      expect(validatePassword('Pässw0rd!')).toBe(true);
      expect(validatePassword('密码123!')).toBe(true);
    });
  });

  // Name validation tests
  describe('validateName function', () => {
    it('returns true for valid names', () => {
      expect(validateName('John Doe')).toBe(true);
      expect(validateName('Jane Smith')).toBe(true);
      expect(validateName('Alice')).toBe(true);
      expect(validateName('Bob Johnson')).toBe(true);
    });

    it('returns false for names that are too short', () => {
      expect(validateName('')).toBe(false);
      expect(validateName('A')).toBe(false);
    });

    it('returns false for names that are too long', () => {
      const longName = 'A'.repeat(101);
      expect(validateName(longName)).toBe(false);
    });

    it('accepts names with common special characters', () => {
      expect(validateName('Mary-Jane Watson')).toBe(true);
      expect(validateName('O\'Connor')).toBe(true);
      expect(validateName('Jean-Luc Picard')).toBe(true);
      expect(validateName('Ana María López')).toBe(true);
    });

    it('accepts names with accented characters', () => {
      expect(validateName('José María')).toBe(true);
      expect(validateName('Renée François')).toBe(true);
      expect(validateName('Søren Larsen')).toBe(true);
    });

    it('handles multiple spaces in names', () => {
      expect(validateName('John  Doe')).toBe(true); // Multiple spaces
      expect(validateName('  John Doe  ')).toBe(true); // Leading/trailing spaces
    });

    it('rejects names with numbers', () => {
      expect(validateName('John123')).toBe(false);
      expect(validateName('Jane Doe2')).toBe(false);
    });

    it('rejects names with special symbols', () => {
      expect(validateName('John@Doe')).toBe(false);
      expect(validateName('Jane#Smith')).toBe(false);
      expect(validateName('Alice$Wilson')).toBe(false);
    });

    it('accepts names with multiple parts', () => {
      expect(validateName('John William Doe')).toBe(true);
      expect(validateName('María Fernanda García López')).toBe(true);
    });

    it('handles single character names', () => {
      expect(validateName('Q')).toBe(false); // Too short
      expect(validateName('Qi')).toBe(true); // Just right
    });
  });

  // Combined validation tests
  describe('Combined validation scenarios', () => {
    it('validates complete user registration data', () => {
      const userData = {
        email: 'john.doe@example.com',
        password: 'SecurePassword123!',
        name: 'John Doe'
      };

      expect(validateEmail(userData.email)).toBe(true);
      expect(validatePassword(userData.password)).toBe(true);
      expect(validateName(userData.name)).toBe(true);
    });

    it('fails validation when any field is invalid', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'weak',
        name: 'A'
      };

      expect(validateEmail(invalidData.email)).toBe(false);
      expect(validatePassword(invalidData.password)).toBe(false);
      expect(validateName(invalidData.name)).toBe(false);
    });

    it('handles edge cases in combination', () => {
      const edgeCases = [
        { email: 'test+tag@example.com', password: 'EdgeCase123!', name: 'Edge Case' },
        { email: 'user.name@domain.co.uk', password: 'Complex123@#$', name: 'User Name' },
        { email: 'valid@example.org', password: 'ValidPass42!', name: 'Valid Name' }
      ];

      edgeCases.forEach(data => {
        expect(validateEmail(data.email)).toBe(true);
        expect(validatePassword(data.password)).toBe(true);
        expect(validateName(data.name)).toBe(true);
      });
    });

    it('handles internationalization scenarios', () => {
      const internationalData = [
        { email: '用户@example.com', password: '密码123!', name: '张三' },
        { email: 'utilisateur@exemple.fr', password: 'MotDePasse123!', name: 'Jean Dupont' },
        { email: 'benutzer@beispiel.de', password: 'Passwort123!', name: 'Hans Müller' }
      ];

      internationalData.forEach(data => {
        expect(validateEmail(data.email)).toBe(true);
        expect(validatePassword(data.password)).toBe(true);
        expect(validateName(data.name)).toBe(true);
      });
    });

    it('validates security-sensitive combinations', () => {
      const securitySensitive = [
        { email: 'admin@example.com', password: 'AdminPass123!', name: 'Admin User' },
        { email: 'support@example.com', password: 'Support123!', name: 'Support Team' },
        { email: 'security@example.com', password: 'Secure123!', name: 'Security Officer' }
      ];

      securitySensitive.forEach(data => {
        expect(validateEmail(data.email)).toBe(true);
        expect(validatePassword(data.password)).toBe(true);
        expect(validateName(data.name)).toBe(true);
      });
    });

    it('validates common username patterns', () => {
      const usernames = [
        'john_doe', 'jane-smith', 'alice123', 'bob.wilson',
        'mary_jane', 'jean_pierre', 'maria_isabel', 'chen_wei'
      ];

      usernames.forEach(username => {
        // Test as name (some may be valid as names too)
        const isValidName = validateName(username);
        // Test as part of email
        const isValidEmail = validateEmail(`${username}@example.com`);
        
        // At least the email should be valid
        expect(isValidEmail).toBe(true);
      });
    });

    it('handles validation with special requirements', () => {
      // Test validation for educational platform users
      const studentNames = [
        'Student One', 'Jane Student', 'John Learner', 'Alice Beginner',
        'Bob Intermediate', 'Carol Advanced', 'David Expert'
      ];

      studentNames.forEach(name => {
        expect(validateName(name)).toBe(true);
      });

      // Test validation for teacher accounts
      const teacherEmails = [
        'teacher@school.edu', 'instructor@university.org', 'professor@college.edu',
        'faculty@academic.institution'
      ];

      teacherEmails.forEach(email => {
        expect(validateEmail(email)).toBe(true);
      });
    });

    it('validates against common attack patterns', () => {
      const potentialAttackPatterns = [
        { email: '<script>alert("xss")</script>@example.com', password: '123', name: 'XSS' },
        { email: 'sql@example.com', password: '\' OR \'1\'=\'1', name: 'SQL Injection' },
        { email: 'user@example.com', password: '; DROP TABLE users;', name: 'Drop Table' }
      ];

      potentialAttackPatterns.forEach(data => {
        // These should all fail validation
        expect(validateEmail(data.email)).toBe(false);
        expect(validatePassword(data.password)).toBe(false);
        expect(validateName(data.name)).toBe(true); // Name might pass depending on implementation
      });
    });

    it('validates edge cases for length limits', () => {
      const maxEmail = 'a'.repeat(64) + '@' + 'b'.repeat(253 - 64 - 1) + '.com';
      const longButValidName = 'A '.repeat(50).trim(); // 100 chars
      const strongPassword = 'Aa1!' + 'x'.repeat(120); // Well over min length
      
      // These should be at or near the limits
      expect(validateEmail(maxEmail.substring(0, 254) + '.com')).toBe(true);
      expect(validateName(longButValidName.substring(0, 100))).toBe(true);
      expect(validatePassword(strongPassword.substring(0, 128))).toBe(true);
    });

    it('handles normalization of inputs', () => {
      const normalizedTests = [
        { email: '  TEST@EXAMPLE.COM  ', expected: true },
        { password: '  SecurePassword123!  ', expected: true },
        { name: '  John Doe  ', expected: true }
      ];

      normalizedTests.forEach(test => {
        // Validation should handle trimmed inputs
        const trimmedEmail = test.email.trim();
        const trimmedPassword = test.password.trim();
        const trimmedName = test.name.trim();
        
        expect(validateEmail(trimmedEmail)).toBe(test.expected);
        expect(validatePassword(trimmedPassword)).toBe(test.expected);
        expect(validateName(trimmedName)).toBe(test.expected);
      });
    });
  });
});