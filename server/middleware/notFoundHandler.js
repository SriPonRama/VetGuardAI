import { errorResponse } from '../utils/apiResponse.js';

/**
 * 404 Not Found middleware.
 */
export function notFoundHandler(req, res, _next) {
  return errorResponse(res, {
    statusCode: 404,
    message: `Resource not found: ${req.method} ${req.originalUrl}`,
  });
}
