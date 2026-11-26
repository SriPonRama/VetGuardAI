import * as authService from '../services/auth.service.js';
import { successResponse } from '../utils/apiResponse.js';
import { setAuthCookies, clearAuthCookies, REFRESH_COOKIE_NAME } from '../utils/cookies.js';

/**
 * Public Farmer Registration Controller.
 * POST /api/v1/auth/register
 */
export async function register(req, res, next) {
  try {
    const { fullName, email, password, phone } = req.body;
    const userAgent = req.headers['user-agent'] || null;
    const ipAddress = req.ip || req.socket.remoteAddress || null;

    const { user, accessToken, refreshToken } = await authService.registerFarmer({
      fullName,
      email,
      password,
      phone,
      userAgent,
      ipAddress,
    });

    setAuthCookies(res, { accessToken, refreshToken });

    return successResponse(res, {
      statusCode: 201,
      message: 'Farmer account successfully registered.',
      data: { user },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * User Login Controller.
 * POST /api/v1/auth/login
 */
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const userAgent = req.headers['user-agent'] || null;
    const ipAddress = req.ip || req.socket.remoteAddress || null;

    const { user, accessToken, refreshToken } = await authService.login({
      email,
      password,
      userAgent,
      ipAddress,
    });

    setAuthCookies(res, { accessToken, refreshToken });

    return successResponse(res, {
      statusCode: 200,
      message: 'Login successful.',
      data: { user },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Refresh-Token Rotation Controller.
 * POST /api/v1/auth/refresh
 */
export async function refresh(req, res, next) {
  try {
    const rawRefreshToken = req.cookies ? req.cookies[REFRESH_COOKIE_NAME] : null;
    const userAgent = req.headers['user-agent'] || null;
    const ipAddress = req.ip || req.socket.remoteAddress || null;

    const { accessToken, refreshToken, user } = await authService.refreshRotation({
      rawRefreshToken,
      userAgent,
      ipAddress,
    });

    setAuthCookies(res, { accessToken, refreshToken });

    return successResponse(res, {
      statusCode: 200,
      message: 'Session refreshed successfully.',
      data: { user },
    });
  } catch (err) {
    // Clear potentially invalid cookies on refresh failure
    clearAuthCookies(res);
    next(err);
  }
}

/**
 * Logout Controller.
 * POST /api/v1/auth/logout
 */
export async function logout(req, res, next) {
  try {
    const rawRefreshToken = req.cookies ? req.cookies[REFRESH_COOKIE_NAME] : null;
    const sessionId = req.sessionId || null;

    await authService.logout({ rawRefreshToken, sessionId });

    clearAuthCookies(res);

    return successResponse(res, {
      statusCode: 200,
      message: 'Successfully logged out.',
    });
  } catch (err) {
    clearAuthCookies(res);
    next(err);
  }
}

/**
 * Get Current Authenticated User Controller.
 * GET /api/v1/auth/me
 */
export async function getMe(req, res, _next) {
  return successResponse(res, {
    statusCode: 200,
    message: 'Current authenticated user profile.',
    data: { user: req.user },
  });
}

/**
 * Privileged Account Provisioning Controller (AUTHORITY only).
 * POST /api/v1/auth/provision
 */
export async function provision(req, res, next) {
  try {
    const { fullName, email, password, phone, role } = req.body;

    const user = await authService.provisionAccount({
      fullName,
      email,
      password,
      phone,
      role,
      provisionedByUserId: req.user.id,
    });

    return successResponse(res, {
      statusCode: 201,
      message: `Account successfully provisioned with role ${role}.`,
      data: { user },
    });
  } catch (err) {
    next(err);
  }
}
