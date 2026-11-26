import { env } from '../config/environment.js';

/**
 * Lightweight request logging middleware.
 */
export function requestLogger(req, res, next) {
  if (env.IS_TEST) {
    return next();
  }

  const startTime = Date.now();
  const { method, originalUrl } = req;

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;
    const logPrefix = `[HTTP] ${method} ${originalUrl} ${statusCode} - ${duration}ms`;

    if (statusCode >= 500) {
      console.error(logPrefix);
    } else if (statusCode >= 400) {
      console.warn(logPrefix);
    } else if (env.NODE_ENV === 'development') {
      console.log(logPrefix);
    }
  });

  next();
}
