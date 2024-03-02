import expressJoi from 'express-joi-validation';

export const validator = expressJoi.createValidator({
  passError: true,
});
