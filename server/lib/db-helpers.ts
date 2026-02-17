/**
 * Database Type Helpers
 * Provides type-safe wrappers for Drizzle ORM operations
 * Eliminates the need for @ts-ignore comments
 */

import type { SQL } from "drizzle-orm";

/**
 * Type-safe wrapper for select queries that return arrays.
 * Handles Drizzle builders by casting to any internally but returning Promise<T[]>.
 */
export function selectMany<T>(builder: any): Promise<T[]> {
  return builder as Promise<T[]>;
}

/**
 * Type-safe wrapper for select queries that return a single item.
 */
export function selectOne<T>(builder: any): Promise<T | undefined> {
  return (builder as Promise<any[]>).then(results => results[0] as T | undefined);
}

/**
 * Type-safe wrapper for insert/update queries with returning clause.
 * Use this when you are SURE a record will be returned.
 */
export function returningOne<T>(builder: any): Promise<T> {
  return (builder as Promise<any[]>).then(results => {
    if (!results || results.length === 0) throw new Error("Database operation failed to return a result (expected 1)");
    return results[0] as T;
  });
}

/**
 * Alternative name for backward compatibility with existing storage.ts
 */
export const returning = returningOne;

/**
 * Type-safe wrapper for insert/update queries that may return undefined.
 */
export function returningOptional<T>(builder: any): Promise<T | undefined> {
  return (builder as Promise<any[]>).then(results => results[0] as T | undefined);
}


/**
 * Type-safe wrapper for count queries.
 */
export function selectCount(builder: any): Promise<number> {
  return (builder as Promise<any[]>).then(results => {
    const result = results[0] as any;
    return result?.count ? Number(result.count) : 0;
  });
}
