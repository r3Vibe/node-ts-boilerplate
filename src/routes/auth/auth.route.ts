import { Router } from 'express';
import authController from '../../controllers/auth/auth.controller';

const router = Router();

router.post('/login', authController.loginUser);

export default router;
