import { Router } from 'express';
import User from '../models/user.model';

const router = Router();

/**
 * @swagger
 * /test-route:
 *   post:
 *     summary: Test if the setup is working
 *     description: Some test
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: testing....
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                      type: string
 */
router.post('/test-route', (req, res, next) => {
  res.send({ message: 'working well' });
});

/**
 * @swagger
 * /get-me-a-drink:
 *   get:
 *     summary: dummy endpoint
 *     description: get a drink
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: drink coming...
 */
router.get('/get-me-a-drink', async (req, res, next) => {
  await User.create({
    email: 'mama@mail.com',
    first_name: 'mama',
    last_name: 'momo',
  });
  res.send({ message: 'ok' });
});

export default router;
