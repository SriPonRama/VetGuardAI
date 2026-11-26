import { prisma } from '../config/database.js';
import { env } from '../config/environment.js';
import { hashPassword } from '../utils/password.js';

/**
 * Bootstrap script to provision the primary initial AUTHORITY account.
 * Reads credentials strictly from environment variables.
 * Usage: npm run auth:seed
 */
async function seedAuthority() {
  console.log('=== VetGuard AI: Initial Authority Account Bootstrap ===\n');

  const email = env.INITIAL_AUTHORITY_EMAIL || process.env.INITIAL_AUTHORITY_EMAIL;
  const password = env.INITIAL_AUTHORITY_PASSWORD || process.env.INITIAL_AUTHORITY_PASSWORD;
  const fullName = env.INITIAL_AUTHORITY_NAME || process.env.INITIAL_AUTHORITY_NAME || 'Primary Authority Administrator';

  if (!email || !password) {
    console.error('[BOOTSTRAP ERROR] INITIAL_AUTHORITY_EMAIL and INITIAL_AUTHORITY_PASSWORD must be configured in environment.');
    console.error('Example: INITIAL_AUTHORITY_EMAIL=admin@vetguard.test INITIAL_AUTHORITY_PASSWORD=AdminStrong123! npm run auth:seed');
    process.exit(1);
  }

  try {
    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existing) {
      console.log(`[BOOTSTRAP NOTICE] Authority account for ${existing.email} already exists (ID: ${existing.id}, Role: ${existing.role}).`);
      process.exit(0);
    }

    const passwordHash = await hashPassword(password);

    const authorityUser = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        passwordHash,
        fullName: fullName.trim(),
        role: 'AUTHORITY',
        isActive: true,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true,
      },
    });

    console.log(`[BOOTSTRAP SUCCESS] Successfully created initial AUTHORITY user:`);
    console.log(`  ID: ${authorityUser.id}`);
    console.log(`  Email: ${authorityUser.email}`);
    console.log(`  Role: ${authorityUser.role}`);
    console.log(`  Created: ${authorityUser.createdAt.toISOString()}`);
  } catch (err) {
    console.error('[BOOTSTRAP FAILED] An unexpected error occurred during seeding:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedAuthority();
