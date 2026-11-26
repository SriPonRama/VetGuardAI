import { PrismaClient } from '@prisma/client';
import { env } from './environment.js';

/**
 * Global Prisma Client singleton.
 * Prevents multiple client instances in development hot-reloading.
 */
let prisma;

const prismaOptions = {
  log: env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
};

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(prismaOptions);
} else {
  if (!global.__vetguard_prisma) {
    global.__vetguard_prisma = new PrismaClient(prismaOptions);
  }
  prisma = global.__vetguard_prisma;
}

/**
 * Gracefully probes database connectivity without leaking credentials or stack traces.
 * @returns {Promise<{ isConnected: boolean, latencyMs: number | null, message: string }>}
 */
export async function checkDatabaseConnection() {
  const startTime = Date.now();
  try {
    if (!env.DATABASE_URL) {
      return {
        isConnected: false,
        latencyMs: null,
        message: 'DATABASE_URL is not configured',
      };
    }

    // Execute minimal probe
    await prisma.$queryRawUnsafe('SELECT 1');
    const latencyMs = Date.now() - startTime;

    return {
      isConnected: true,
      latencyMs,
      message: 'Connected',
    };
  } catch (_error) {
    return {
      isConnected: false,
      latencyMs: null,
      message: 'Database unreachable',
    };
  }
}

export { prisma };
export default prisma;
