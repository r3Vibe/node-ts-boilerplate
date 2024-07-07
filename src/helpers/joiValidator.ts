import expressJoi from 'express-joi-validation';

/**
 * @author Arnab Gupta
 * @description create and return a validator object for requets validation
 */
const validator = expressJoi.createValidator({
  passError: true,
});

export default validator;
