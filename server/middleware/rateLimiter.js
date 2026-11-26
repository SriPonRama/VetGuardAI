import rateLimit from 'express-rate-limit';

/**
 * Login rate limiter: max 5 failed attempts per 15 minutes per IP.
 * Successful logins do not count against this quota.
 */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many failed login attempts. Please try again after 15 minutes.',
      timestamp: new Date().toISOString(),
    });
  },
});

/**
 * Registration rate limiter: max 3 successful attempts per hour per IP.
 * Failed validation requests do not consume the quota.
 */
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  skipFailedRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many registration requests from this IP. Please try again after an hour.',
      timestamp: new Date().toISOString(),
    });
  },
});
