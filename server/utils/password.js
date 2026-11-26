import bcrypt from 'bcrypt';
import { ApiError } from './apiError.js';

const BCRYPT_ROUNDS = 12;
const MAX_PASSWORD_BYTES = 72;

/**
 * Validates password UTF-8 byte length against bcrypt's internal 72-byte ceiling.
 * @param {string} password 
 * @throws {ApiError} If password exceeds 72 bytes
 */
export function validatePasswordByteLength(password) {
  if (typeof password !== 'string') {
    throw ApiError.badRequest('Password must be a string.');
  }

  const byteLength = Buffer.byteLength(password, 'utf8');
  if (byteLength > MAX_PASSWORD_BYTES) {
    throw ApiError.badRequest('Password exceeds maximum length of 72 bytes.');
  }
}

/**
 * Hashes a plaintext password using bcrypt with cost factor 12.
 * @param {string} password 
 * @returns {Promise<string>}
 */
export async function hashPassword(password) {
  validatePasswordByteLength(password);
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

/**
 * Compares plaintext password with stored hash.
 * Constant-time comparison defends against timing attacks.
 * @param {string} password 
 * @param {string} hash 
 * @returns {Promise<boolean>}
 */
export async function comparePassword(password, hash) {
  if (typeof password !== 'string' || typeof hash !== 'string') {
    return false;
  }

  const byteLength = Buffer.byteLength(password, 'utf8');
  if (byteLength > MAX_PASSWORD_BYTES) {
    return false;
  }

  return bcrypt.compare(password, hash);
}
