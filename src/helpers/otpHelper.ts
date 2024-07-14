import * as OTPAuth from 'otpauth';
import { config } from '../config';
import crypto from 'crypto';
import { IUser } from '../@types';
import otpService from '../services/otp/otp.service';
import ApiError from './apiErrorConverter';
import httpStatus from 'http-status';

/**
 * @author Arnab Gupta
 * @param key
 * @description generate a base32 hash for the user
 * @returns {string} 456896
 */
const generateOTPHash = (key: string): string => {
  return OTPAuth.Secret.fromUTF8(key).base32;
};

/**
 * @author Arnab Gupta
 * @param secret
 * @description generate a time based otp for the user
 * @returns {string} 456896
 */
const generateTOTP = (secret: string): string => {
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
const verifyTOTP = (secret: string, token: string): number | null => {
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

/**
 * @author Arnab Gupta
 * @description Create Normal 6 Digit OTP
 * @returns {string} 445944
 */
const makeOTP = (): string => {
  return crypto.randomInt(100000, 999999).toString();
};

/**
 * @author Arnab Gupta
 * @description Save otp agains a user in database
 * @param {IUser} user
 * @param {string} otp
 * @returns {Promise<void>}
 */
const storeOTP = async (user: IUser, otp: string): Promise<void> => {
  await otpService.saveOtp(otp, String(user._id));
};

/**
 * @author Arnab Gupta
 * @description Verify the otp
 * @returns {void}
 */
const verifyOTP = async (user: IUser, otp: string): Promise<boolean> => {
  // get the otp from database
  const otpInDb = await otpService.getOtp(String(user._id), otp);

  // throw error if otp not found
  if (!otpInDb) {
    throw new ApiError('Invalid OTP', httpStatus.BAD_REQUEST);
  }

  // check otp expiry
  if (
    new Date(otpInDb.createdAt).getTime() +
      config.security.otpExpiration * 1000 <
    Date.now()
  ) {
    throw new ApiError('OTP Expired', httpStatus.BAD_REQUEST);
  }

  // all check passed then delete the otp
  await otpService.deleteOtp(String(user._id), otp);

  return true;
};

export default {
  generateOTPHash,
  generateTOTP,
  verifyTOTP,
  makeOTP,
  storeOTP,
  verifyOTP,
};
