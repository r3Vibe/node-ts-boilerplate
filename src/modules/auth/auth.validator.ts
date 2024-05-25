import Joi from 'joi';

/** register account */
const register = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

/** login account */
const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

/** reset verify account */
const reset = Joi.object({
  email: Joi.string().email().required(),
});

/** reset password account */
const resetpwd = Joi.object({
  password: Joi.string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{};':"\\|,.<>?]).{8,}$/,
    )
    .required(),
  token: Joi.string().required(),
});

/** logout account */
const logout = Joi.object({
  access: Joi.string().required(),
  refresh: Joi.string().required(),
});

/** validate refresh endpoint */
const refresh = Joi.object({
  refresh: Joi.string().required(),
});

/** validate social endpoint */
const emailOnly = Joi.object({
  email: Joi.string().email().required(),
});

export default {
  register,
  login,
  reset,
  resetpwd,
  logout,
  refresh,
  emailOnly,
};
