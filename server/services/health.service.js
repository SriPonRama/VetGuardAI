import os from 'os';
import { checkDatabaseConnection } from '../config/database.js';
import { env } from '../config/environment.js';

/**
 * Service to aggregate application health and diagnostic metrics.
 */
export async function getHealthStatus() {
  const dbStatus = await checkDatabaseConnection();
  const memoryUsage = process.memoryUsage();

  const isHealthy = dbStatus.isConnected;

  return {
    status: isHealthy ? 'healthy' : 'degraded',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: env.NODE_ENV,
    services: {
      api: {
        status: 'operational',
      },
      database: {
        status: dbStatus.isConnected ? 'connected' : 'disconnected',
        ...(dbStatus.latencyMs !== null && { latencyMs: dbStatus.latencyMs }),
        message: dbStatus.message,
      },
    },
    system: {
      memoryUsageMB: Math.round(memoryUsage.rss / 1024 / 1024),
      heapUsedMB: Math.round(memoryUsage.heapUsed / 1024 / 1024),
      totalMemoryMB: Math.round(os.totalmem() / 1024 / 1024),
      freeMemoryMB: Math.round(os.freemem() / 1024 / 1024),
    },
  };
}
