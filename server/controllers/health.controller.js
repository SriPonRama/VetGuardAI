import { getHealthStatus } from '../services/health.service.js';
import { successResponse } from '../utils/apiResponse.js';

/**
 * Health check controller.
 * GET /api/v1/health
 */
export async function getHealth(req, res, next) {
  try {
    const health = await getHealthStatus();

    return successResponse(res, {
      statusCode: 200,
      message: 'VetGuard AI API status report',
      data: health,
    });
  } catch (error) {
    next(error);
  }
}
