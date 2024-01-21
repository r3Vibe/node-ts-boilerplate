import { Router } from 'express';

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

export default router;
