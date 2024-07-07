import Joi from 'joi';
import objectId from '../custom.validator';

const updateProfile = Joi.object({
  id: Joi.string().optional().custom(objectId),
});

export default { updateProfile };
