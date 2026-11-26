import { env } from '../config/environment.js';

export const ACCESS_COOKIE_NAME = 'vg_access_token';
export const REFRESH_COOKIE_NAME = 'vg_refresh_token';

const ACCESS_MAX_AGE_MS = 15 * 60 * 1000; // 15 minutes
const REFRESH_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Common base cookie options.
 */
const getBaseOptions = () => ({
  httpOnly: true,
  secure: env.IS_PRODUCTION,
  sameSite: 'lax',
});

/**
 * Sets secure HTTP-only access and refresh cookies on the response.
 * @param {import('express').Response} res 
 * @param {object} tokens 
 * @param {string} tokens.accessToken 
 * @param {string} tokens.refreshToken 
 */
export function setAuthCookies(res, { accessToken, refreshToken }) {
  const base = getBaseOptions();

  // Access cookie (valid across entire API)
  res.cookie(ACCESS_COOKIE_NAME, accessToken, {
    ...base,
    path: '/',
    maxAge: ACCESS_MAX_AGE_MS,
  });

  // Refresh cookie (strictly restricted to /api/v1/auth)
  res.cookie(REFRESH_COOKIE_NAME, refreshToken, {
    ...base,
    path: '/api/v1/auth',
    maxAge: REFRESH_MAX_AGE_MS,
  });
}

/**
 * Clears authentication cookies using identical path and security flags.
 * @param {import('express').Response} res 
 */
export function clearAuthCookies(res) {
  const base = getBaseOptions();

  res.clearCookie(ACCESS_COOKIE_NAME, {
    ...base,
    path: '/',
  });

  res.clearCookie(REFRESH_COOKIE_NAME, {
    ...base,
    path: '/api/v1/auth',
  });
}
