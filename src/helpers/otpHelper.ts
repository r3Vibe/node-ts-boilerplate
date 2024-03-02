import * as OTPAuth from 'otpauth';
import config from '../config/config';

/**
 * @author Arnab Gupta
 * @param key
 * @description generate a base32 hash for the user
 * @returns {string} 456896
 */
const generateOTPHash = (key: string) => {
  return OTPAuth.Secret.fromUTF8(key).base32;
};

/**
 * @author Arnab Gupta
 * @param secret
 * @description generate a time based otp for the user
 * @returns {string} 456896
 */
const generateOTP = (secret: string) => {
  const totp = new OTPAuth.TOTP({
    issuer: config.security.issuer,
    label: config.security.issuer,
    algorithm: 'SHA1',
    digits: 6,
    secret,
    period: config.security.otpExpiration,
  });

  return totp.generate();
};

/**
 * @author Arnab Gupta
 * @description Verify the already generated totp for the current time
 * @param secret
 * @param token
 * @returns {number} Token Delta or null
 */
const verifyOTP = (secret: string, token: string) => {
  const totp = new OTPAuth.TOTP({
    issuer: config.security.issuer,
    label: config.security.issuer,
    algorithm: 'SHA1',
    digits: 6,
    secret,
    period: config.security.otpExpiration,
  });

  return totp.validate({ token, window: 1 });
};

export default { generateOTPHash, generateOTP, verifyOTP };
