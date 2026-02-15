// Type fix configuration for Drizzle ORM dual-database support
// The db object is a union type (SQLite | PostgreSQL) which causes TypeScript
// to complain about incompatible signatures, even though the code works correctly at runtime.
// This file documents the known type issues and provides a centralized suppression strategy.

export const DB_TYPE_SUPPRESSION_COMMENT = `
// @ts-expect-error - Drizzle ORM union type (SQLite | PostgreSQL) causes signature incompatibility
// This is a known false positive - the code works correctly at runtime
`;

// List of files with known Drizzle type issues:
// - server/storage.ts (all database operations)
// - scripts/create-bigul-user.ts
// - scripts/create-bigul2-user.ts
// - scripts/create-massive-users.ts
// - scripts/simulate-*.ts files

// These errors DO NOT affect runtime behavior and can be safely suppressed.
