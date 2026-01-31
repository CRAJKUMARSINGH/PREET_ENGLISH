/**
 * Validation utilities for PREET_ENGLISH
 */

export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  
  const trimmedEmail = email.trim();
  if (trimmedEmail.length === 0 || trimmedEmail.length > 254) return false;
  
  // Check for common attack patterns - more comprehensive and strict
  const maliciousPatterns = [
    /<script/i,
    /<\/script>/i,
    /javascript:/i,
    /on\w+=/i,
    /\${/,
    /eval\(/i,
    /expression\(/i,
    /alert\(/i,
    /<[^>]*>/,  // Any HTML tags - this should catch <script>alert("xss")</script>
    /[<>]/      // Any angle brackets at all
  ];
  
  if (maliciousPatterns.some(pattern => pattern.test(trimmedEmail))) {
    return false;
  }
  
  // Reject emails with consecutive dots, multiple @ symbols, etc.
  if (trimmedEmail.includes('..') || 
      (trimmedEmail.match(/@/g) || []).length !== 1 ||
      trimmedEmail.startsWith('@') ||
      trimmedEmail.endsWith('@') ||
      trimmedEmail.includes('@.') ||
      trimmedEmail.includes('.@')) {
    return false;
  }
  
  // Split email into local and domain parts for length validation
  const [localPart, domainPart] = trimmedEmail.split('@');
  if (!localPart || !domainPart || localPart.length > 64 || domainPart.length > 253) {
    return false;
  }
  
  // Check individual domain labels (each part between dots) - max 63 chars each
  const domainLabels = domainPart.split('.');
  if (domainLabels.some(label => label.length > 63 || label.length === 0)) {
    return false;
  }
  
  // More comprehensive email regex that supports Unicode characters
  // This supports international domain names and Unicode local parts
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const quotedEmailRegex = /^"[^"]*"@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const unicodeEmailRegex = /^[\p{L}\p{N}.!#$%&'*+/=?^_`{|}~-]+@[\p{L}\p{N}](?:[\p{L}\p{N}-]{0,61}[\p{L}\p{N}])?(?:\.[\p{L}\p{N}](?:[\p{L}\p{N}-]{0,61}[\p{L}\p{N}])?)*$/u;
  
  return emailRegex.test(trimmedEmail) || quotedEmailRegex.test(trimmedEmail) || unicodeEmailRegex.test(trimmedEmail);
};

export const validatePassword = (password: string): boolean => {
  if (!password || typeof password !== 'string') return false;
  
  // Check for common attack patterns - more comprehensive
  const maliciousPatterns = [
    /<script/i,
    /<\/script>/i,
    /javascript:/i,
    /on\w+=/i,
    /\${/,
    /eval\(/i,
    /expression\(/i,
    /union\s+select/i,
    /drop\s+table/i,
    /'\s*or\s*'/i,  // SQL injection patterns
    /;\s*drop/i,
    /<[^>]*>/,  // Any HTML tags
    /qwerty/i   // Common weak patterns
  ];
  
  if (maliciousPatterns.some(pattern => pattern.test(password))) {
    return false;
  }
  
  // Password requirements
  const hasLower = /[a-z\p{Ll}]/u.test(password);
  const hasUpper = /[A-Z\p{Lu}]/u.test(password);
  const hasNumber = /[\d\p{N}]/u.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`\p{P}\p{S}]/u.test(password);
  const isLongEnough = password.length >= 8;
  const isNotTooLong = password.length <= 128;
  
  // Check if password contains only ASCII characters
  const isAsciiOnly = /^[\x00-\x7F]*$/.test(password);
  
  if (isAsciiOnly) {
    // For ASCII passwords, require traditional requirements
    return hasLower && hasUpper && hasNumber && hasSpecial && isLongEnough && isNotTooLong;
  } else {
    // For international passwords, be more flexible but still require numbers and specials
    const hasAnyLetter = /[\p{L}]/u.test(password);
    return hasAnyLetter && hasNumber && hasSpecial && isLongEnough && isNotTooLong;
  }
};

export const validateName = (name: string): boolean => {
  if (!name || typeof name !== 'string') return false;
  
  const trimmedName = name.trim();
  if (trimmedName.length < 2 || trimmedName.length > 100) return false;
  
  // Allow names with common patterns but reject obvious attacks
  const maliciousPatterns = [
    /<script/i,
    /<\/script>/i,
    /javascript:/i,
    /on\w+=/i,
    /\${/,
    /eval\(/i,
    /<[^>]*>/  // Any HTML tags
  ];
  
  if (maliciousPatterns.some(pattern => pattern.test(trimmedName))) {
    return false;
  }
  
  // Allow letters, spaces, hyphens, apostrophes, dots, and Unicode characters for international names
  const nameRegex = /^[\p{L}\p{M}\s\-'\.]+$/u;
  return nameRegex.test(trimmedName);
};

export const validatePhoneNumber = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') return false;
  
  // Indian phone number format
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
};

export const validateAge = (age: number): boolean => {
  if (typeof age !== 'number' || isNaN(age)) return false;
  return age >= 13 && age <= 100;
};