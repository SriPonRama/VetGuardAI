import dotenv from 'dotenv';

dotenv.config();

/**
 * Validates and normalizes environment variables.
 * Fails safely with sensible defaults for local development.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return 5000;
  if (port >= 0) return port;
  return 5000;
};

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: normalizePort(process.env.PORT || 5000),
  DATABASE_URL: process.env.DATABASE_URL || '',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  API_PREFIX: process.env.API_PREFIX || '/api/v1',
  IS_PRODUCTION: (process.env.NODE_ENV || 'development') === 'production',
  IS_TEST: (process.env.NODE_ENV || 'development') === 'test',

  // Authentication & JWT Configuration
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'vetguard-dev-access-secret-32-chars-minimum-key!!',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'vetguard-dev-refresh-secret-32-chars-minimum-key!!',
  JWT_ISSUER: process.env.JWT_ISSUER || 'vetguard-api',
  JWT_AUDIENCE: process.env.JWT_AUDIENCE || 'vetguard-client',
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  JWT_REFRESH_EXPIRES_IN_DAYS: 7,

  // Initial Authority Bootstrap
  INITIAL_AUTHORITY_EMAIL: process.env.INITIAL_AUTHORITY_EMAIL || '',
  INITIAL_AUTHORITY_PASSWORD: process.env.INITIAL_AUTHORITY_PASSWORD || '',
  INITIAL_AUTHORITY_NAME: process.env.INITIAL_AUTHORITY_NAME || 'Primary Authority Administrator',
};

// Validate critical variables in production
if (env.IS_PRODUCTION) {
  if (!env.DATABASE_URL) {
    console.warn('[CONFIG WARNING] DATABASE_URL is not set in production environment.');
  }
  if (!process.env.JWT_ACCESS_SECRET || process.env.JWT_ACCESS_SECRET.length < 32) {
    throw new Error('[FATAL CONFIG] Strong JWT_ACCESS_SECRET (min 32 chars) must be configured in production.');
  }
  if (!process.env.JWT_REFRESH_SECRET || process.env.JWT_REFRESH_SECRET.length < 32) {
    throw new Error('[FATAL CONFIG] Strong JWT_REFRESH_SECRET (min 32 chars) must be configured in production.');
  }
}
