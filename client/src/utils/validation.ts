/**
 * Validation utilities for PREET_ENGLISH
 */

export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  
  const trimmedEmail = email.trim();
  if (trimmedEmail.length === 0) return false;
  
  // Check for common attack patterns
  const maliciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+=/i,
    /\${/,
    /eval\(/i,
    /expression\(/i
  ];
  
  if (maliciousPatterns.some(pattern => pattern.test(trimmedEmail))) {
    return false;
  }
  
  // More comprehensive email validation
  // Reject emails with consecutive dots, multiple @ symbols, etc.
  if (trimmedEmail.includes('..') || 
      (trimmedEmail.match(/@/g) || []).length !== 1 ||
      trimmedEmail.startsWith('@') ||
      trimmedEmail.endsWith('@') ||
      trimmedEmail.includes('@.') ||
      trimmedEmail.includes('.@')) {
    return false;
  }
  
  // Basic email regex that handles most cases including quoted local parts
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const quotedEmailRegex = /^"[^"]*"@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  return emailRegex.test(trimmedEmail) || quotedEmailRegex.test(trimmedEmail);
};

export const validatePassword = (password: string): boolean => {
  if (!password || typeof password !== 'string') return false;
  
  // Check for common attack patterns
  const maliciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+=/i,
    /\${/,
    /eval\(/i,
    /expression\(/i,
    /union\s+select/i,
    /drop\s+table/i
  ];
  
  if (maliciousPatterns.some(pattern => pattern.test(password))) {
    return false;
  }
  
  // At least 8 characters, one uppercase, one lowercase, one number, one special character
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password);
  const isLongEnough = password.length >= 8;
  const isNotTooLong = password.length <= 128;
  
  return hasLower && hasUpper && hasNumber && hasSpecial && isLongEnough && isNotTooLong;
};

export const validateName = (name: string): boolean => {
  if (!name || typeof name !== 'string') return false;
  
  const trimmedName = name.trim();
  if (trimmedName.length < 2 || trimmedName.length > 100) return false;
  
  // Allow names with common patterns but reject obvious attacks
  const maliciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+=/i,
    /\${/,
    /eval\(/i
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