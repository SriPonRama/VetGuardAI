import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/environment.js';
import { requestLogger } from './middleware/requestLogger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import v1Routes from './routes/index.js';

const app = express();

// Allowed origins for CORS (exact origin allowlisting for credentialed requests)
const allowedOrigins = [env.CORS_ORIGIN];
if (!env.IS_PRODUCTION) {
  allowedOrigins.push('http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5000', 'http://127.0.0.1:5000');
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server) or approved origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser middleware (enables HTTP-only cookie extraction)
app.use(cookieParser());

// Request logging (sanitized, zero-credential)
app.use(requestLogger);

// Mount API v1 router
app.use(env.API_PREFIX, v1Routes);

// Root route confirmation
app.get('/', (req, res) => {
  res.json({
    service: 'VetGuard AI Backend Service',
    version: '1.0.0',
    documentation: `${env.API_PREFIX}/health`,
    timestamp: new Date().toISOString(),
  });
});

// 404 Handler
app.use(notFoundHandler);

// Centralized Error Handler
app.use(errorHandler);

export default app;
