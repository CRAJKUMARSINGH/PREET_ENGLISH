/**
 * Server-side type definitions
 */

import type { User as DbUser } from '../shared/schema';

// Extend Express Request type
declare global {
  namespace Express {
    interface User extends DbUser {}
  }
}

export {};
