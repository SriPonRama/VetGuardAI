import app from './app.js';
import { env } from './config/environment.js';
import { prisma } from './config/database.js';

const server = app.listen(env.PORT, () => {
  console.log(`[VetGuard AI] Backend listening on port ${env.PORT} (${env.NODE_ENV})`);
  console.log(`[VetGuard AI] Health endpoint: http://localhost:${env.PORT}${env.API_PREFIX}/health`);
});

/**
 * Handle graceful termination
 */
async function handleShutdown(signal) {
  console.log(`\n[VetGuard AI] Received ${signal}. Initiating graceful shutdown...`);

  server.close(async () => {
    console.log('[VetGuard AI] HTTP server closed.');
    try {
      await prisma.$disconnect();
      console.log('[VetGuard AI] Database connection disconnected.');
    } catch (err) {
      console.error('[VetGuard AI] Error during database disconnection:', err);
    }
    process.exit(0);
  });

  // Force exit if shutdown hangs
  setTimeout(() => {
    console.error('[VetGuard AI] Forced exit due to shutdown timeout.');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));
