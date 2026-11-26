import { prisma } from '../config/database.js';
import { ApiError } from '../utils/apiError.js';
import { verifyAccessToken } from '../utils/token.js';
import { ACCESS_COOKIE_NAME } from '../utils/cookies.js';

/**
 * Authentication verification middleware.
 * Verifies JWT signature, extracts session identifier (sid),
 * checks active session state in PostgreSQL, and verifies active user status and database role.
 */
export async function authenticate(req, res, next) {
  try {
    // 1. Extract token from cookie (or fallback to Authorization header for programmatic API tests)
    let token = req.cookies ? req.cookies[ACCESS_COOKIE_NAME] : null;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.substring(7);
    }

    if (!token) {
      return next(ApiError.unauthorized('Authentication required: No access token provided.'));
    }

    // 2. Verify JWT signature, expiry, issuer, audience and algorithm
    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return next(new ApiError(401, 'Access token has expired.', { code: 'TOKEN_EXPIRED' }));
      }
      return next(ApiError.unauthorized('Invalid access token.'));
    }

    // 3. Verify session identifier (sid) against PostgreSQL database
    const session = await prisma.refreshToken.findUnique({
      where: { id: decoded.sid },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
            phone: true,
            role: true,
            isActive: true,
          },
        },
      },
    });

    if (!session) {
      return next(ApiError.unauthorized('Session not found or has been invalidated.'));
    }

    if (session.revokedAt !== null) {
      return next(ApiError.unauthorized('Session has been revoked.'));
    }

    if (new Date(session.expiresAt) < new Date()) {
      return next(ApiError.unauthorized('Session has expired.'));
    }

    // 4. Verify user active status and load current database role
    const user = session.user;
    if (!user || !user.isActive) {
      return next(ApiError.unauthorized('User account is inactive or not found.'));
    }

    // 5. Attach safe user representation and session id to request
    req.user = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      role: user.role,
    };
    req.sessionId = session.id;

    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Role-Based Access Control (RBAC) middleware factory.
 * Enforces allowed roles using the verified database role attached to req.user.
 * @param  {...string} allowedRoles Allowed UserRole enum values ('FARMER', 'VETERINARIAN', 'AUTHORITY')
 */
export function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(ApiError.unauthorized('Authentication required.'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        ApiError.forbidden(
          `Access forbidden: Role '${req.user.role}' is not authorized to perform this action.`
        )
      );
    }

    next();
  };
}
