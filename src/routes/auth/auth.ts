import express from 'express';

const router = express.Router();

router.get('/test-endpoit', (req, res) => {
  res.send('Working wel');
});

export default router;
