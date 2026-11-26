import { ApiError } from '../utils/apiError.js';
import { validatePasswordByteLength } from '../utils/password.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_POLICY_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$/;

/**
 * Validates public farmer registration request.
 */
export function validateRegister(req, res, next) {
  const { fullName, email, password, phone } = req.body;

  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2 || fullName.trim().length > 100) {
    return next(ApiError.badRequest('Full name is required (2 to 100 characters).'));
  }

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    return next(ApiError.badRequest('A valid email address is required.'));
  }

  if (!password || typeof password !== 'string') {
    return next(ApiError.badRequest('Password is required.'));
  }

  // Validate bcrypt 72-byte limit
  try {
    validatePasswordByteLength(password);
  } catch (err) {
    return next(err);
  }

  if (!PASSWORD_POLICY_REGEX.test(password)) {
    return next(
      ApiError.badRequest(
        'Password must be 8-64 characters long and include at least one uppercase letter, one lowercase letter, and one number.'
      )
    );
  }

  if (phone !== undefined && phone !== null && phone !== '') {
    if (typeof phone !== 'string' || phone.trim().length < 6 || phone.trim().length > 30) {
      return next(ApiError.badRequest('Phone number must be between 6 and 30 characters if provided.'));
    }
  }

  // Normalize sanitized values onto req.body
  req.body.fullName = fullName.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.password = password;
  req.body.phone = phone ? phone.trim() : null;

  // Explicitly strip any client-supplied role or privileged fields
  delete req.body.role;
  delete req.body.isActive;
  delete req.body.id;

  next();
}

/**
 * Validates login request.
 */
export function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (!email || typeof email !== 'string' || !email.trim()) {
    return next(ApiError.badRequest('Email is required.'));
  }

  if (!password || typeof password !== 'string') {
    return next(ApiError.badRequest('Password is required.'));
  }

  req.body.email = email.trim().toLowerCase();
  req.body.password = password;

  next();
}

/**
 * Validates privileged account provisioning request (AUTHORITY only).
 */
export function validateProvision(req, res, next) {
  const { fullName, email, password, phone, role } = req.body;

  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2 || fullName.trim().length > 100) {
    return next(ApiError.badRequest('Full name is required (2 to 100 characters).'));
  }

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    return next(ApiError.badRequest('A valid email address is required.'));
  }

  if (!role || (role !== 'VETERINARIAN' && role !== 'AUTHORITY')) {
    return next(ApiError.badRequest("Role must be specified as either 'VETERINARIAN' or 'AUTHORITY'."));
  }

  if (!password || typeof password !== 'string') {
    return next(ApiError.badRequest('Password is required.'));
  }

  try {
    validatePasswordByteLength(password);
  } catch (err) {
    return next(err);
  }

  if (!PASSWORD_POLICY_REGEX.test(password)) {
    return next(
      ApiError.badRequest(
        'Password must be 8-64 characters long and include at least one uppercase letter, one lowercase letter, and one number.'
      )
    );
  }

  if (phone !== undefined && phone !== null && phone !== '') {
    if (typeof phone !== 'string' || phone.trim().length < 6 || phone.trim().length > 30) {
      return next(ApiError.badRequest('Phone number must be between 6 and 30 characters if provided.'));
    }
  }

  req.body.fullName = fullName.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.role = role;
  req.body.password = password;
  req.body.phone = phone ? phone.trim() : null;

  delete req.body.isActive;
  delete req.body.id;

  next();
}
