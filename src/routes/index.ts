import { Router } from 'express';

// routes
import authRouter from '../modules/auth/auth.route';

const router = Router();

// auth routes
router.use('/auth', authRouter);

export default router;
