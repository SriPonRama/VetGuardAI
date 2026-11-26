import { env } from '../config/environment.js';
import { ApiError } from '../utils/apiError.js';
import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME } from '../utils/cookies.js';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

/**
 * Normalized list of allowed origins.
 */
function getAllowedOrigins() {
  const origins = [env.CORS_ORIGIN];
  if (!env.IS_PRODUCTION) {
    origins.push('http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5000', 'http://127.0.0.1:5000');
  }
  return origins;
}

/**
 * Robust CSRF and Origin verification middleware for state-changing requests.
 * Enforces Origin validation and custom security header requirements for cookie-authenticated sessions.
 */
export function csrfProtection(req, res, next) {
  if (SAFE_METHODS.has(req.method)) {
    return next();
  }

  // Check if cookies are present (browser session context)
  const hasAuthCookie = Boolean(
    req.cookies && (req.cookies[ACCESS_COOKIE_NAME] || req.cookies[REFRESH_COOKIE_NAME])
  );

  const originHeader = req.headers.origin;
  const refererHeader = req.headers.referer;
  const allowedOrigins = getAllowedOrigins();

  // 1. If Origin header is present, validate exact match against allowed origins
  if (originHeader) {
    const isAllowed = allowedOrigins.some((allowed) => allowed === originHeader);
    if (!isAllowed) {
      return next(ApiError.forbidden(`CSRF validation failed: Origin '${originHeader}' is not permitted.`));
    }
  } else if (hasAuthCookie && refererHeader) {
    // If Origin is missing on a cookie-bearing request, validate Referer prefix
    const isRefererAllowed = allowedOrigins.some((allowed) => refererHeader.startsWith(allowed));
    if (!isRefererAllowed) {
      return next(ApiError.forbidden(`CSRF validation failed: Referer '${refererHeader}' is not permitted.`));
    }
  }

  // 2. For browser cookie-based authentication, require custom anti-CSRF request header
  // Cross-site HTML forms cannot set custom headers under browser SOP.
  if (hasAuthCookie) {
    const hasCustomHeader = Boolean(
      req.headers['x-requested-with'] ||
      req.headers['x-vetguard-request'] ||
      req.headers['x-csrf-protection']
    );

    if (!hasCustomHeader) {
      return next(
        ApiError.forbidden(
          'CSRF validation failed: Missing required anti-CSRF custom header (e.g. X-Requested-With or X-VetGuard-Request).'
        )
      );
    }
  }

  next();
}
