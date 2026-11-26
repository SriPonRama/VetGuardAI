import { env } from '../config/environment.js';
import { errorResponse } from '../utils/apiResponse.js';

/**
 * Centralized error-handling middleware.
 * Sanitizes errors to prevent credential or internal stack leak in production.
 */
export function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode || (err.status >= 400 && err.status < 600 ? err.status : 500);

  // Default error message
  let message = err.message || 'An unexpected internal server error occurred.';

  // If internal error and in production, mask details
  if (statusCode === 500 && env.IS_PRODUCTION) {
    message = 'An unexpected internal error occurred. Please try again later.';
  }

  const errorData = {
    statusCode,
    message,
    errors: err.errors || null,
  };

  // Only include stack trace in development
  if (env.NODE_ENV === 'development' && err.stack) {
    errorData.stack = err.stack;
  }

  // Log server errors
  if (statusCode >= 500) {
    console.error(`[Unhandled Error] ${req.method} ${req.originalUrl}:`, err);
  }

  return errorResponse(res, errorData);
}
