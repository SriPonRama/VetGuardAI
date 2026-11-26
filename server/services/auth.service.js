import { prisma } from '../config/database.js';
import { env } from '../config/environment.js';
import { ApiError } from '../utils/apiError.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
} from '../utils/token.js';

// Constant-time generic authentication error to prevent user enumeration
const genericAuthError = () => ApiError.unauthorized('Invalid email or password.');

// Pre-computed dummy bcrypt hash for timing equalization when user does not exist
const DUMMY_HASH = '$2b$12$e8/4yH0U4Jv4e1n3L8qFwe7v9iG8gM2pG1jQ9sZ8wE3rT5yU7iO1a';

/**
 * Public Farmer Registration.
 * Server strictly enforces role: FARMER.
 */
export async function registerFarmer({ fullName, email, password, phone, userAgent, ipAddress }) {
  // 1. Check for duplicate email
  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existing) {
    throw ApiError.conflict('Email address is already in use.');
  }

  // 2. Hash password
  const passwordHash = await hashPassword(password);

  // 3. Create User record and initial RefreshToken session atomically
  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        fullName,
        email,
        passwordHash,
        phone,
        role: 'FARMER',
        isActive: true,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    // Generate initial refresh token
    const rawRefreshToken = generateRefreshToken();
    const tokenHash = hashToken(rawRefreshToken);
    const expiresAt = new Date(Date.now() + env.JWT_REFRESH_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000);

    const session = await tx.refreshToken.create({
      data: {
        tokenHash,
        userId: user.id,
        expiresAt,
        userAgent,
        ipAddress,
      },
    });

    // Generate access token with session id (sid)
    const accessToken = generateAccessToken({
      userId: user.id,
      sessionId: session.id,
    });

    return {
      user,
      accessToken,
      refreshToken: rawRefreshToken,
    };
  });

  return result;
}

/**
 * User Login.
 * Constant-time comparison defends against timing attacks.
 * Generic errors conceal email existence and account active status.
 */
export async function login({ email, password, userAgent, ipAddress }) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      passwordHash: true,
      fullName: true,
      phone: true,
      role: true,
      isActive: true,
    },
  });

  if (!user) {
    // Run dummy compare to match execution time and prevent user enumeration
    await comparePassword(password, DUMMY_HASH);
    throw genericAuthError();
  }

  const isPasswordValid = await comparePassword(password, user.passwordHash);
  if (!isPasswordValid) {
    throw genericAuthError();
  }

  if (!user.isActive) {
    // Return identical generic error for deactivated users
    throw genericAuthError();
  }

  // Generate new refresh token & session
  const rawRefreshToken = generateRefreshToken();
  const tokenHash = hashToken(rawRefreshToken);
  const expiresAt = new Date(Date.now() + env.JWT_REFRESH_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000);

  const session = await prisma.refreshToken.create({
    data: {
      tokenHash,
      userId: user.id,
      expiresAt,
      userAgent,
      ipAddress,
    },
  });

  const accessToken = generateAccessToken({
    userId: user.id,
    sessionId: session.id,
  });

  const safeUser = {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    phone: user.phone,
    role: user.role,
  };

  return {
    user: safeUser,
    accessToken,
    refreshToken: rawRefreshToken,
  };
}

/**
 * Refresh-Token Rotation with Concurrency Handling and Reuse Detection.
 */
export async function refreshRotation({ rawRefreshToken, userAgent, ipAddress }) {
  if (!rawRefreshToken || typeof rawRefreshToken !== 'string') {
    throw ApiError.unauthorized('Refresh token is required.');
  }

  const tokenHash = hashToken(rawRefreshToken);

  const tokenRecord = await prisma.refreshToken.findUnique({
    where: { tokenHash },
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

  if (!tokenRecord) {
    throw ApiError.unauthorized('Invalid refresh token.');
  }

  // 1. Detect if token was already revoked
  if (tokenRecord.revokedAt !== null) {
    // Check grace period for legitimate concurrent requests (e.g. within 15 seconds)
    const timeSinceRevocation = Date.now() - new Date(tokenRecord.revokedAt).getTime();
    const GRACE_PERIOD_MS = 15000;

    if (timeSinceRevocation > GRACE_PERIOD_MS) {
      // Confirmed reuse of a stale/compromised token:
      // Revoke all active sessions for this user immediately!
      await prisma.refreshToken.updateMany({
        where: {
          userId: tokenRecord.userId,
          revokedAt: null,
        },
        data: {
          revokedAt: new Date(),
        },
      });

      console.warn(`[SECURITY ALERT] Refresh token reuse detected for user ${tokenRecord.userId}. All sessions revoked.`);
      throw ApiError.unauthorized('Compromised session detected: All sessions for this account have been terminated.');
    }

    // Within grace window, reject without mass revocation
    throw ApiError.unauthorized('Refresh token already rotated. Please use latest credentials.');
  }

  // 2. Check token expiration
  if (new Date(tokenRecord.expiresAt) < new Date()) {
    throw ApiError.unauthorized('Refresh token has expired.');
  }

  // 3. Check user active status
  if (!tokenRecord.user || !tokenRecord.user.isActive) {
    throw ApiError.unauthorized('User account is inactive.');
  }

  // 4. Rotate atomically in transaction
  const newRawToken = generateRefreshToken();
  const newHash = hashToken(newRawToken);
  const newExpiresAt = new Date(Date.now() + env.JWT_REFRESH_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000);

  const result = await prisma.$transaction(async (tx) => {
    // Mark old token revoked and record replacement
    await tx.refreshToken.update({
      where: { id: tokenRecord.id },
      data: {
        revokedAt: new Date(),
        replacedByTokenHash: newHash,
      },
    });

    // Create replacement token record
    const newSession = await tx.refreshToken.create({
      data: {
        tokenHash: newHash,
        userId: tokenRecord.userId,
        expiresAt: newExpiresAt,
        userAgent,
        ipAddress,
      },
    });

    // Issue new access token tied to replacement session
    const accessToken = generateAccessToken({
      userId: tokenRecord.user.id,
      sessionId: newSession.id,
    });

    return {
      accessToken,
      refreshToken: newRawToken,
      user: tokenRecord.user,
    };
  });

  return result;
}

/**
 * Session Revocation (Logout).
 */
export async function logout({ rawRefreshToken, sessionId }) {
  if (rawRefreshToken) {
    const tokenHash = hashToken(rawRefreshToken);
    await prisma.refreshToken.updateMany({
      where: {
        tokenHash,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  } else if (sessionId) {
    await prisma.refreshToken.updateMany({
      where: {
        id: sessionId,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }

  return { success: true };
}

/**
 * Privileged Account Provisioning (AUTHORITY only).
 */
export async function provisionAccount({ fullName, email, password, phone, role, provisionedByUserId }) {
  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existing) {
    throw ApiError.conflict('Email address is already in use.');
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      passwordHash,
      phone,
      role,
      isActive: true,
    },
    select: {
      id: true,
      email: true,
      fullName: true,
      phone: true,
      role: true,
      createdAt: true,
    },
  });

  // Audit log provisioning event (no secrets)
  console.log(
    `[AUDIT] Privileged user ${user.id} (${user.role}) provisioned by AUTHORITY ${provisionedByUserId} at ${new Date().toISOString()}`
  );

  return user;
}
