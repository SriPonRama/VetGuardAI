import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import { env } from '../config/environment.js';

/**
 * Generates signed JWT access token with minimal claims and pinned algorithm.
 * @param {object} params
 * @param {string} params.userId
 * @param {string} params.sessionId
 * @returns {string}
 */
export function generateAccessToken({ userId, sessionId }) {
  const payload = {
    sub: userId,
    sid: sessionId,
  };

  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    algorithm: 'HS256',
    issuer: env.JWT_ISSUER,
    audience: env.JWT_AUDIENCE,
    expiresIn: env.JWT_ACCESS_EXPIRES_IN,
  });
}

/**
 * Verifies and decodes JWT access token.
 * Validates signature, pinned algorithm, issuer, audience, and expiry.
 * @param {string} token 
 * @returns {object} Decoded JWT payload
 */
export function verifyAccessToken(token) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET, {
    algorithms: ['HS256'],
    issuer: env.JWT_ISSUER,
    audience: env.JWT_AUDIENCE,
  });
}

/**
 * Generates cryptographically secure high-entropy random string for refresh token.
 * @returns {string} Plaintext opaque token (40 bytes hex = 80 characters)
 */
export function generateRefreshToken() {
  return crypto.randomBytes(40).toString('hex');
}

/**
 * Computes deterministic SHA-256 hash of raw token for database storage.
 * Raw token is NEVER stored in PostgreSQL.
 * @param {string} token 
 * @returns {string} 64-character SHA-256 hex digest
 */
export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}
