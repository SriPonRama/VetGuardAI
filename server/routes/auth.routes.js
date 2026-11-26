import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { validateRegister, validateLogin, validateProvision } from '../validators/auth.validator.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { csrfProtection } from '../middleware/csrf.js';
import { loginLimiter, registerLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Public registration (FARMER only)
router.post('/register', registerLimiter, csrfProtection, validateRegister, authController.register);

// Login (All active users)
router.post('/login', loginLimiter, csrfProtection, validateLogin, authController.login);

// Refresh token rotation
router.post('/refresh', csrfProtection, authController.refresh);

// Logout
router.post('/logout', csrfProtection, authController.logout);

// Current authenticated user
router.get('/me', authenticate, authController.getMe);

// Privileged account provisioning (AUTHORITY only)
router.post('/provision', csrfProtection, authenticate, authorize('AUTHORITY'), validateProvision, authController.provision);

export default router;
