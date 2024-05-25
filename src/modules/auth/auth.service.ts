import httpStatus from 'http-status';
import ApiError from '../../helpers/apiErrorConverter';
import passwordHelper from '../../helpers/passwordHelper';
import config from '../../config/config';
import { IUser } from '../../@types';
import { User } from '../../models';

/**
 * @async
 * @author Arnab Gupta
 * @param {object} body - User's Information
 * @returns {Promise<IUser>} User Object
 */
const register = async (body: object): Promise<IUser> => {
  return User.create(body);
};

/**
 * @async
 * @author Arnab Gupta
 * @param {string} token - User's Verification Token
 * @returns {Promise<boolean>} True/False
 */
const verify = async (token: string): Promise<boolean> => {
  // get user by token
  const user = await User.findOne({ verification_token: token });

  // throw error if user not found
  if (!user) {
    throw new ApiError(
      'Invalid or expired verification token',
      httpStatus.BAD_REQUEST,
    );
  }

  // check token validity
  const expirationTime = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
  const currentTime = new Date().getTime();
  const createdTime = new Date(String(user.modifiedAt)).getTime();
  if (currentTime - createdTime > expirationTime) {
    // Token has expired
    throw new ApiError(
      'Verification token has expired',
      httpStatus.BAD_REQUEST,
    );
  }

  // set user as active
  await User.updateOne(
    { verification_token: token },
    { $set: { is_active: true } },
  );

  // return true
  return true;
};

/**
 * @async
 * @author Arnab Gupta
 * @param {string} email - User's Email Address
 * @returns {Promise<IUser>} User object
 */
const forgot_password = async (email: string): Promise<IUser> => {
  // get user by token
  const user = await User.findOne({ email });

  // throw error if user not found
  if (!user) {
    throw new ApiError(
      'User with this email address not found',
      httpStatus.NOT_FOUND,
    );
  }

  const updatedUser = await User.findOneAndUpdate(
    { email },
    { $set: { verification_token: passwordHelper.generateToken() } },
    { new: true },
  );

  return updatedUser as IUser;
};

/**
 * @async
 * @author Arnab Gupta
 * @param {string} token - User's Token
 * @param {string} password - User's Password
 * @description Verify users token
 * @returns {Promise<boolean>} True/False
 */
const verify_pwd_token = async (
  token: string,
  password: string,
): Promise<boolean> => {
  // get user by token
  const user = await User.findOne({ verification_token: token });

  // throw error if user not found
  if (!user) {
    throw new ApiError(
      'Invalid or expired verification token',
      httpStatus.BAD_REQUEST,
    );
  }

  // check token validity
  const expirationTime =
    parseInt(config.security.resetPasswordExpirationMinutes) * 60 * 1000;
  const currentTime = new Date().getTime();
  const createdTime = new Date(String(user.modifiedAt)).getTime();
  if (currentTime - createdTime > expirationTime) {
    // Token has expired
    throw new ApiError(
      'Verification token has expired',
      httpStatus.BAD_REQUEST,
    );
  }

  // check if password is same as previous password
  if (passwordHelper.verifyPassword(password, String(user.password))) {
    throw new ApiError(
      'Password cannot be same as previous password',
      httpStatus.BAD_REQUEST,
    );
  }

  // update password
  user.password = password;
  await user.save();

  return true;
};

/**
 * @async
 * @author Arnab Gupta
 * @param {string} email - User's Email
 * @param {string} password - User's Password
 * @description Login user
 * @returns {Promise<IUser>} User object
 */
const login_user = async (email: string, password: string): Promise<IUser> => {
  // get user by email
  const user = await User.findOne({ email });

  // throw error if user not found
  if (!user) {
    throw new ApiError(
      'User with this email address not found',
      httpStatus.NOT_FOUND,
    );
  }

  // check if user is active
  if (!user.is_active) {
    throw new ApiError(
      'Please verify email to continue',
      httpStatus.BAD_REQUEST,
    );
  }

  // check if user is blocked
  if (user.is_blocked) {
    throw new ApiError('User is blocked', httpStatus.BAD_REQUEST);
  }

  // check password
  if (!passwordHelper.verifyPassword(password, String(user.password))) {
    throw new ApiError('Password is incorrect', httpStatus.BAD_REQUEST);
  }

  // return user
  return user;
};

/**
 * @async
 * @author Arnab Gupta
 * @param {string} email - User's Email
 * @description Get User by email address
 * @returns {Promise<IUser>} User object
 */
const generateNewToken = async (email: string): Promise<IUser> => {
  return User.findOneAndUpdate(
    { email },
    { $set: { verification_token: passwordHelper.generateToken() } },
    { new: true },
  ) as unknown as IUser;
};

export default {
  register,
  verify,
  forgot_password,
  verify_pwd_token,
  login_user,
  generateNewToken,
};
