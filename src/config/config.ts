import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';
import ApiError from '../helpers/apiErrorConverter';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('prod', 'dev').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    SECRET: Joi.string().required().description('JWT secret key'),
    ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description('minutes after which access tokens expire'),
    RESET_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description('minutes after which password reset tokens expire'),
    REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(3)
      .description('days after which refresh tokens expire'),
    ISS: Joi.string().description('Token issuer').required(),
    ALGO: Joi.string().description('Token Algorithm for encryption').required(),
    OTP_EXPIRATION_SECONDS: Joi.number().description(
      'Otp expiration time not givens in env',
    ),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new ApiError(`Config validation error: ${error.message}`, 500);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL,
  },
  security: {
    secret: envVars.SECRET,
    accessExpirationMinutes: envVars.ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.RESET_EXPIRATION_MINUTES,
    issuer: envVars.ISS,
    algo: envVars.ALGO,
    otpExpiration: envVars.OTP_EXPIRATION_SECONDS,
  },
  s3: {
    bucket: 'asdasd',
  },
};
