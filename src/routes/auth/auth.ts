import express from 'express';
import { validator } from '../../helpers';
import { userValidator } from '../../validators';
import { userController } from '../../controllers';

const router = express.Router();

router.get('/test-endpoit', (req, res) => {
  // #swagger.deprecated = true
  res.send('Working wel');
});

router.get(
  '/get-user-by-id/:id',
  validator.params(userValidator.updateProfile),
  userController.getemailEvent,
);

router.post(
  '/check-body',
  validator.body(userValidator.updateProfile),
  userController.check,
);

export default router;
