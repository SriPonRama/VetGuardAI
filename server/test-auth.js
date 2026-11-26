import app from './app.js';
import { prisma } from './config/database.js';
import { env } from './config/environment.js';
import jwt from 'jsonwebtoken';

const TEST_PORT = 5006;
const BASE_URL = `http://127.0.0.1:${TEST_PORT}`;
const API_PREFIX = env.API_PREFIX;

// Helper to extract cookies from response headers
function extractCookies(res) {
  const raw = res.headers.getSetCookie ? res.headers.getSetCookie() : [res.headers.get('set-cookie')].filter(Boolean);
  const cookies = {};
  for (const c of raw) {
    const parts = c.split(';')[0].split('=');
    if (parts.length >= 2) {
      cookies[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
  }
  return cookies;
}

function makeCookieHeader(cookies) {
  return Object.entries(cookies)
    .map(([k, v]) => `${k}=${v}`)
    .join('; ');
}

async function runAuthTests() {
  console.log('====================================================');
  console.log(' VetGuard AI — Phase 1C: Auth & RBAC Test Suite');
  console.log('====================================================\n');

  const server = app.listen(TEST_PORT);
  await new Promise((resolve) => server.once('listening', resolve));
  console.log(`Test server active on port ${TEST_PORT}\n`);

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✔ [PASS] ${message}`);
      passed++;
    } else {
      console.error(`✘ [FAIL] ${message}`);
      failed++;
    }
  }

  // Common headers required by CSRF / Origin policy
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Origin': 'http://127.0.0.1:5173',
    'X-VetGuard-Request': 'true',
  };

  const testEmailPrefix = `test_${Date.now()}`;
  const farmerEmail = `${testEmailPrefix}_farmer@vetguard.test`;
  const farmerPassword = 'FarmerPassword123!';
  let farmerCookies = {};
  let farmerUserId = null;

  try {
    // -------------------------------------------------------------------------
    // TEST 1: Successful farmer registration
    // -------------------------------------------------------------------------
    console.log('[TEST GROUP 1] Farmer Registration & Validation');
    const regRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/register`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        fullName: 'Test Farmer John',
        email: farmerEmail,
        password: farmerPassword,
        phone: '+1234567890',
      }),
    });
    const regBody = await regRes.json();
    farmerCookies = extractCookies(regRes);
    farmerUserId = regBody.data?.user?.id;

    assert(regRes.status === 201, '1. Farmer registration returns HTTP 201');
    assert(regBody.data?.user?.role === 'FARMER', '1b. Server strictly assigns role: FARMER');
    assert(regBody.data?.user?.email === farmerEmail.toLowerCase(), '1c. Email is normalized');
    assert(farmerCookies.vg_access_token && farmerCookies.vg_refresh_token, '1d. Sets vg_access_token and vg_refresh_token cookies');
    assert(!regBody.data?.user?.passwordHash, '1e. passwordHash is never returned in API response');

    // -------------------------------------------------------------------------
    // TEST 2: Duplicate registration rejected
    // -------------------------------------------------------------------------
    const dupRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/register`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        fullName: 'Duplicate Farmer',
        email: farmerEmail,
        password: farmerPassword,
      }),
    });
    assert(dupRes.status === 409, '2. Duplicate email registration rejected with HTTP 409 Conflict');

    // -------------------------------------------------------------------------
    // TEST 3: Client role escalation attempt ignored/blocked
    // -------------------------------------------------------------------------
    const escalateEmail = `${testEmailPrefix}_escalate@vetguard.test`;
    const escRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/register`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        fullName: 'Hacker User',
        email: escalateEmail,
        password: farmerPassword,
        role: 'AUTHORITY',
        isActive: false,
      }),
    });
    const escBody = await escRes.json();
    assert(escBody.data?.user?.role === 'FARMER', '3. Role escalation attempt ignored: created user has role FARMER');

    // -------------------------------------------------------------------------
    // TEST 4: Password hashing verification
    // -------------------------------------------------------------------------
    console.log('\n[TEST GROUP 2] Password Security');
    const dbUser = await prisma.user.findUnique({ where: { email: farmerEmail } });
    assert(dbUser && dbUser.passwordHash.startsWith('$2b$12$'), '4. Password hashed with bcrypt at cost factor 12');
    assert(!dbUser.passwordHash.includes(farmerPassword), '4b. Plaintext password is never stored');

    // -------------------------------------------------------------------------
    // TEST 5: Weak password rejection
    // -------------------------------------------------------------------------
    const weakRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/register`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        fullName: 'Weak User',
        email: `${testEmailPrefix}_weak@vetguard.test`,
        password: 'weak',
      }),
    });
    assert(weakRes.status === 400, '5. Weak password (<8 chars, no upper/digit) rejected with HTTP 400');

    // -------------------------------------------------------------------------
    // TEST 6: UTF-8 password byte-length validation (>72 bytes)
    // -------------------------------------------------------------------------
    const longPassword = 'A1a' + 'x'.repeat(75);
    const longRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/register`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        fullName: 'Long Pass User',
        email: `${testEmailPrefix}_long@vetguard.test`,
        password: longPassword,
      }),
    });
    assert(longRes.status === 400, '6. Password exceeding bcrypt 72-byte ceiling rejected with HTTP 400');

    // -------------------------------------------------------------------------
    // TEST 7: Successful login
    // -------------------------------------------------------------------------
    console.log('\n[TEST GROUP 3] Authentication & Login');
    const loginRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/login`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        email: farmerEmail,
        password: farmerPassword,
      }),
    });
    const loginBody = await loginRes.json();
    farmerCookies = extractCookies(loginRes);

    assert(loginRes.status === 200, '7. Successful login returns HTTP 200');
    assert(farmerCookies.vg_access_token && farmerCookies.vg_refresh_token, '7b. Login sets fresh HTTP-only cookies');
    assert(loginBody.data?.user?.email === farmerEmail, '7c. Returns authenticated user information');

    // -------------------------------------------------------------------------
    // TEST 8: Generic errors for invalid credentials (email exists vs does not exist)
    // -------------------------------------------------------------------------
    const wrongPassRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/login`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ email: farmerEmail, password: 'WrongPassword123!' }),
    });
    const wrongPassBody = await wrongPassRes.json();

    const nonExistentRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/login`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ email: 'nonexistent@vetguard.test', password: 'SomePassword123!' }),
    });
    const nonExistentBody = await nonExistentRes.json();

    assert(
      wrongPassRes.status === 401 &&
      nonExistentRes.status === 401 &&
      wrongPassBody.message === 'Invalid email or password.' &&
      nonExistentBody.message === 'Invalid email or password.',
      '8. Generic error message ("Invalid email or password.") hides email existence'
    );

    // -------------------------------------------------------------------------
    // TEST 9: Inactive user login rejection
    // -------------------------------------------------------------------------
    const inactiveEmail = `${testEmailPrefix}_inactive@vetguard.test`;
    await prisma.user.create({
      data: {
        email: inactiveEmail,
        passwordHash: dbUser.passwordHash,
        fullName: 'Inactive Farmer',
        role: 'FARMER',
        isActive: false,
      },
    });
    const inactiveRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/login`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ email: inactiveEmail, password: farmerPassword }),
    });
    assert(inactiveRes.status === 401, '9. Inactive user login rejected with generic 401');

    // -------------------------------------------------------------------------
    // TEST 10: Valid access token (GET /me)
    // -------------------------------------------------------------------------
    console.log('\n[TEST GROUP 4] Token & Session Verification');
    const meRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/me`, {
      method: 'GET',
      headers: {
        'Cookie': makeCookieHeader(farmerCookies),
      },
    });
    const meBody = await meRes.json();
    assert(meRes.status === 200, '10. GET /auth/me with valid access token cookie returns HTTP 200');
    assert(meBody.data?.user?.email === farmerEmail, '10b. Returns user identity matched from DB session');

    // -------------------------------------------------------------------------
    // TEST 11: Invalid and expired access tokens
    // -------------------------------------------------------------------------
    const invalidTokenRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/me`, {
      method: 'GET',
      headers: {
        'Cookie': 'vg_access_token=tampered_invalid_token_value',
      },
    });
    assert(invalidTokenRes.status === 401, '11. Tampered access token rejected with HTTP 401');

    const expiredToken = jwt.sign(
      { sub: farmerUserId, sid: 'dummy-sid' },
      env.JWT_ACCESS_SECRET,
      { algorithm: 'HS256', issuer: env.JWT_ISSUER, audience: env.JWT_AUDIENCE, expiresIn: '-1s' }
    );
    const expiredRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/me`, {
      method: 'GET',
      headers: {
        'Cookie': `vg_access_token=${expiredToken}`,
      },
    });
    const expiredBody = await expiredRes.json();
    assert(expiredRes.status === 401 && expiredBody.errors?.code === 'TOKEN_EXPIRED', '11b. Expired access token returns 401 with code TOKEN_EXPIRED');

    // -------------------------------------------------------------------------
    // TEST 12: Session revocation (DB session revoked -> access token rejected)
    // -------------------------------------------------------------------------
    // Extract the exact session id (sid) from current access token and mark revoked in DB
    const decodedCurrent = jwt.decode(farmerCookies.vg_access_token);
    await prisma.refreshToken.update({
      where: { id: decodedCurrent.sid },
      data: { revokedAt: new Date() },
    });
    const revokedSessionRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/me`, {
      method: 'GET',
      headers: {
        'Cookie': makeCookieHeader(farmerCookies),
      },
    });
    assert(revokedSessionRes.status === 401, '12. Active access token rejected if associated DB session is revoked');

    // -------------------------------------------------------------------------
    // TEST 13: Refresh-token rotation
    // -------------------------------------------------------------------------
    console.log('\n[TEST GROUP 5] Refresh Token Rotation & Concurrency');
    // Log back in to get clean session
    const reloginRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/login`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ email: farmerEmail, password: farmerPassword }),
    });
    farmerCookies = extractCookies(reloginRes);
    const oldRefreshCookie = farmerCookies.vg_refresh_token;

    const refreshRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/refresh`, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        'Cookie': makeCookieHeader(farmerCookies),
      },
    });
    const refreshBody = await refreshRes.json();
    const rotatedCookies = extractCookies(refreshRes);

    assert(refreshRes.status === 200, '13. Refresh rotation returns HTTP 200');
    assert(rotatedCookies.vg_refresh_token && rotatedCookies.vg_refresh_token !== oldRefreshCookie, '13b. Refresh token was replaced with new token');
    assert(rotatedCookies.vg_access_token, '13c. New access token issued');

    // Verify old refresh token is marked revoked in DB
    const crypto = await import('node:crypto');
    const oldHash = crypto.createHash('sha256').update(oldRefreshCookie).digest('hex');
    const oldTokenRecord = await prisma.refreshToken.findUnique({ where: { tokenHash: oldHash } });
    assert(oldTokenRecord && oldTokenRecord.revokedAt !== null, '13d. Old refresh token record atomically marked revoked');

    // -------------------------------------------------------------------------
    // TEST 14: Refresh-token replay detection & user session invalidation
    // -------------------------------------------------------------------------
    // Artificially age the old token's revokedAt past the 15-second grace window to test confirmed malicious reuse
    await prisma.refreshToken.update({
      where: { id: oldTokenRecord.id },
      data: { revokedAt: new Date(Date.now() - 30000) },
    });

    const replayRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/refresh`, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        'Cookie': `vg_refresh_token=${oldRefreshCookie}`,
      },
    });
    assert(replayRes.status === 401, '14. Replay of stale revoked refresh token returns 401');

    // Verify all sessions for this user were revoked
    const unrevokedCount = await prisma.refreshToken.count({
      where: { userId: farmerUserId, revokedAt: null },
    });
    assert(unrevokedCount === 0, '14b. Token reuse detection revoked all active sessions for the compromised user');

    // -------------------------------------------------------------------------
    // TEST 15: Concurrent refresh requests handled safely within grace period
    // -------------------------------------------------------------------------
    // Log in afresh
    const freshLogin = await fetch(`${BASE_URL}${API_PREFIX}/auth/login`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ email: farmerEmail, password: farmerPassword }),
    });
    const freshCookies = extractCookies(freshLogin);

    // Fire 2 concurrent refresh requests
    const [c1, c2] = await Promise.all([
      fetch(`${BASE_URL}${API_PREFIX}/auth/refresh`, {
        method: 'POST',
        headers: { ...defaultHeaders, 'Cookie': makeCookieHeader(freshCookies) },
      }),
      fetch(`${BASE_URL}${API_PREFIX}/auth/refresh`, {
        method: 'POST',
        headers: { ...defaultHeaders, 'Cookie': makeCookieHeader(freshCookies) },
      }),
    ]);
    const c1Status = c1.status;
    const c2Status = c2.status;
    assert(
      (c1Status === 200 && c2Status === 401) || (c2Status === 200 && c1Status === 401) || (c1Status === 200 && c2Status === 200),
      '15. Concurrent refresh requests safely handled without corrupting sessions'
    );

    // -------------------------------------------------------------------------
    // TEST 16: Logout and cookie clearing
    // -------------------------------------------------------------------------
    console.log('\n[TEST GROUP 6] Logout & Cookie Clearing');
    const logoutRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/logout`, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        'Cookie': makeCookieHeader(freshCookies),
      },
    });
    const rawSetCookie = logoutRes.headers.getSetCookie ? logoutRes.headers.getSetCookie() : [logoutRes.headers.get('set-cookie')];
    const isCleared = rawSetCookie.some((c) => c && (c.includes('vg_access_token=;') || c.includes('Max-Age=0') || c.toLowerCase().includes('expires=thu, 01 jan 1970')));
    assert(logoutRes.status === 200, '16. Logout returns HTTP 200');
    assert(isCleared, '16b. Logout response sends cookie clearing headers');

    // -------------------------------------------------------------------------
    // TEST 17, 18, 19: Role-Based Access Control & Privileged Provisioning
    // -------------------------------------------------------------------------
    console.log('\n[TEST GROUP 7] Role-Based Access Control (RBAC)');
    // 17: Farmer blocked from provisioning
    const farmerAuthRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/login`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ email: farmerEmail, password: farmerPassword }),
    });
    const activeFarmerCookies = extractCookies(farmerAuthRes);

    const farmerProvRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/provision`, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        'Cookie': makeCookieHeader(activeFarmerCookies),
      },
      body: JSON.stringify({
        fullName: 'Dr. Illegitimate Vet',
        email: `${testEmailPrefix}_illegalvet@vetguard.test`,
        password: 'VetPassword123!',
        role: 'VETERINARIAN',
      }),
    });
    assert(farmerProvRes.status === 403, '17. FARMER role blocked from provisioning with HTTP 403 Forbidden');

    // Create a Veterinarian user for testing
    const vetEmail = `${testEmailPrefix}_vet@vetguard.test`;
    const vetPassword = 'VetPassword123!';
    const bcrypt = await import('bcrypt');
    const vetHash = await bcrypt.hash(vetPassword, 12);
    await prisma.user.create({
      data: {
        email: vetEmail,
        passwordHash: vetHash,
        fullName: 'Dr. Sarah Veterinarian',
        role: 'VETERINARIAN',
      },
    });

    const vetLoginRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/login`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ email: vetEmail, password: vetPassword }),
    });
    const vetCookies = extractCookies(vetLoginRes);

    // 18: Veterinarian blocked from provisioning
    const vetProvRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/provision`, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        'Cookie': makeCookieHeader(vetCookies),
      },
      body: JSON.stringify({
        fullName: 'Dr. Another Vet',
        email: `${testEmailPrefix}_vet2@vetguard.test`,
        password: 'VetPassword123!',
        role: 'VETERINARIAN',
      }),
    });
    assert(vetProvRes.status === 403, '18. VETERINARIAN role blocked from provisioning with HTTP 403 Forbidden');

    // Create an AUTHORITY user for testing
    const authEmail = `${testEmailPrefix}_authority@vetguard.test`;
    const authPassword = 'AuthorityPassword123!';
    const authHash = await bcrypt.hash(authPassword, 12);
    await prisma.user.create({
      data: {
        email: authEmail,
        passwordHash: authHash,
        fullName: 'Regional Livestock Authority',
        role: 'AUTHORITY',
      },
    });

    const authLoginRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/login`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ email: authEmail, password: authPassword }),
    });
    const authorityCookies = extractCookies(authLoginRes);

    // 19: Authority successfully provisions a Veterinarian
    const provSuccessEmail = `${testEmailPrefix}_provisioned_vet@vetguard.test`;
    const provRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/provision`, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        'Cookie': makeCookieHeader(authorityCookies),
      },
      body: JSON.stringify({
        fullName: 'Dr. Officially Provisioned Vet',
        email: provSuccessEmail,
        password: 'VetOfficialPassword123!',
        role: 'VETERINARIAN',
      }),
    });
    const provBody = await provRes.json();
    assert(provRes.status === 201, '19. AUTHORITY successfully provisions a VETERINARIAN with HTTP 201');
    assert(provBody.data?.user?.role === 'VETERINARIAN', '19b. Provisioned user role is VETERINARIAN');

    // -------------------------------------------------------------------------
    // TEST 20: Missing and malformed inputs
    // -------------------------------------------------------------------------
    console.log('\n[TEST GROUP 8] Input Validation, CSRF & Security');
    const badInputRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/register`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ email: 'bad-email-without-at', fullName: '' }),
    });
    assert(badInputRes.status === 400, '20. Malformed input rejected with HTTP 400');

    // -------------------------------------------------------------------------
    // TEST 21: CSRF & Origin validation
    // -------------------------------------------------------------------------
    // Malicious origin on state-changing request
    const evilOriginRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/logout`, {
      method: 'POST',
      headers: {
        'Origin': 'https://evil-attacker-site.com',
        'Cookie': makeCookieHeader(authorityCookies),
        'X-VetGuard-Request': 'true',
      },
    });
    assert(evilOriginRes.status === 403, '21. Request from unauthorized Origin rejected with HTTP 403');

    // Missing anti-CSRF custom header on cookie request
    const missingCsrfHeaderRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/logout`, {
      method: 'POST',
      headers: {
        'Origin': 'http://127.0.0.1:5173',
        'Cookie': makeCookieHeader(authorityCookies),
        // No X-VetGuard-Request or X-Requested-With
      },
    });
    assert(missingCsrfHeaderRes.status === 403, '21b. Cookie-bearing request without anti-CSRF custom header rejected with HTTP 403');

    // -------------------------------------------------------------------------
    // TEST 22: CORS restrictions
    // -------------------------------------------------------------------------
    const corsPreflightRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/login`, {
      method: 'OPTIONS',
      headers: {
        'Origin': 'https://unauthorized-cors-domain.com',
        'Access-Control-Request-Method': 'POST',
      },
    });
    const allowOrigin = corsPreflightRes.headers.get('access-control-allow-origin');
    assert(allowOrigin !== 'https://unauthorized-cors-domain.com', '22. CORS denies unauthorized origin');

    // -------------------------------------------------------------------------
    // TEST 23: Rate limiting on login
    // -------------------------------------------------------------------------
    console.log('\n[TEST GROUP 9] Rate Limiting');
    // Rapidly fire failed logins to trigger rate limit (max 5)
    let triggeredRateLimit = false;
    for (let i = 0; i < 7; i++) {
      const rlRes = await fetch(`${BASE_URL}${API_PREFIX}/auth/login`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({ email: farmerEmail, password: 'WrongPasswordForRateLimit!' }),
      });
      if (rlRes.status === 429) {
        triggeredRateLimit = true;
        break;
      }
    }
    assert(triggeredRateLimit, '23. Excessive failed login attempts trigger HTTP 429 Too Many Requests');

    // -------------------------------------------------------------------------
    // TEST 24: No secret or credential leakage in responses or logs
    // -------------------------------------------------------------------------
    console.log('\n[TEST GROUP 10] Secret & Credential Leakage');
    const jsonString = JSON.stringify(regBody) + JSON.stringify(loginBody) + JSON.stringify(meBody) + JSON.stringify(provBody);
    const leakedHash = jsonString.includes('$2b$12$');
    const leakedRawToken = jsonString.includes(oldRefreshCookie);
    assert(!leakedHash && !leakedRawToken, '24. User responses never leak passwordHash or raw tokens');

  } catch (err) {
    console.error('Test execution exception:', err);
    failed++;
  } finally {
    // Clean up test data
    console.log('\n[CLEANUP] Cleaning up test users and refresh tokens...');
    try {
      await prisma.user.deleteMany({
        where: {
          email: {
            contains: testEmailPrefix,
          },
        },
      });
      console.log('✔ Test data safely cleaned up.');
    } catch (e) {
      console.warn('Cleanup error:', e.message);
    }

    server.close(async () => {
      try {
        await prisma.$disconnect();
      } catch {}
      console.log('\n====================================================');
      console.log(` Summary: ${passed} passed, ${failed} failed`);
      console.log('====================================================');
      process.exit(failed > 0 ? 1 : 0);
    });
  }
}

runAuthTests();
