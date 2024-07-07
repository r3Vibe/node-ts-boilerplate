import express from 'express';
import authRouter from './auth/auth';
import { auth } from '../middlewares';

const router = express.Router();

router.use(auth('profile'));

router.use('/auth', authRouter);

export default router;
