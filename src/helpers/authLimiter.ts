import rateLimit from 'express-rate-limit';
import { RequestHandler } from 'express';

const authLimiter: RequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: 'Maximux request limit reached',
  skipSuccessfulRequests: true,
});

const otpLimiter: RequestHandler = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1,
  message: 'Wait 1 minute before requesting another otp',
  statusCode: 400,
  skipSuccessfulRequests: true,
});

export { authLimiter, otpLimiter };
