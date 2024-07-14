import Joi from 'joi';

const updateProfile = Joi.object({
  id: Joi.string().optional(),
});

export default { updateProfile };
