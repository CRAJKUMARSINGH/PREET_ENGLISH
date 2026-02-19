import { PrismaClient } from '@prisma/client';

// PrismaClient singleton with connection pooling
// Prevents multiple instances in development (hot reload)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Connection pool configuration
export const prismaConfig = {
  connectionLimit: process.env.DATABASE_CONNECTION_LIMIT 
    ? parseInt(process.env.DATABASE_CONNECTION_LIMIT) 
    : 20, // Increased from 10 for better performance
  poolTimeout: 30000, // 30 seconds
  idleTimeout: 60000, // 60 seconds
};

// Graceful shutdown
process.on('beforeExit', async () => {
  console.log('Disconnecting Prisma client...');
  await prisma.$disconnect();
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, disconnecting Prisma client...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM received, disconnecting Prisma client...');
  await prisma.$disconnect();
  process.exit(0);
});

// Health check function
export async function checkDatabaseHealth(): Promise<{
  healthy: boolean;
  latency?: number;
  error?: string;
}> {
  try {
    const start = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    const latency = Date.now() - start;
    
    return {
      healthy: true,
      latency,
    };
  } catch (error) {
    return {
      healthy: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
