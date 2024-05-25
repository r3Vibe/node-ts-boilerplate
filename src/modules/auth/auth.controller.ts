import ApiError from '../../helpers/apiErrorConverter';
import { ApiResponse } from '../../helpers/apiResponse';
import catchAsync from '../../helpers/asyncErrorHandler';
import tokenHelper from '../../helpers/tokenHelper';
import service from './auth.service';
import userService from '../../services/common.service';
import httpStatus from 'http-status';

/**
 * @async
 * @author Arnab Gupta
 * @description Create new user
 */
const register = catchAsync(async (req, res, next) => {
  await service.register(req.body);
  res
    .status(httpStatus.CREATED)
    .send(new ApiResponse({}, 'Account created successfully'));
});

/**
 * @async
 * @author Arnab Gupta
 * @description When user forgets password
 */
const forgot_password = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  await service.forgot_password(email);

  res
    .status(httpStatus.OK)
    .send(new ApiResponse({}, 'Password reset link sent successfully'));
});

/**
 * @async
 * @author Arnab Gupta
 * @description Reset user password
 */
const reset_password = catchAsync(async (req, res, next) => {
  const { token, password } = req.body;

  await service.verify_pwd_token(token, password);

  res
    .status(httpStatus.OK)
    .send(new ApiResponse({}, 'Password reset successfully'));
});

/**
 * @async
 * @author Arnab Gupta
 * @description Login user
 */
const login_user = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await service.login_user(email, password);
  const tokens = await tokenHelper.generateAuthTokens(user);
  res
    .status(httpStatus.OK)
    .send(new ApiResponse({ user, tokens }, 'Login successfully'));
});

/**
 * @async
 * @author Arnab Gupta
 * @description Logout the user
 * @returns It will send the response back
 */
const logoutUser = catchAsync(async (req, res, next) => {
  // send back the response
  const { access, refresh } = req.body;
  await tokenHelper.blacklistToken(access, 'access');
  await tokenHelper.blacklistToken(refresh, 'refresh');
  return res.status(httpStatus.NO_CONTENT).send();
});

/**
 * @async
 * @author Arnab Gupta
 * @description Refresh the access and refresh tokens
 * @returns It will send the response back
 */
const refreshTokens = catchAsync(async (req, res, next) => {
  // send back the response
  const { refresh } = req.body;

  const payload = await tokenHelper.verifyToken(refresh, 'refresh');
  const user = await userService.getUserById(String(payload?.sub));

  if (!user) {
    throw new ApiError('Invalid Token', httpStatus.BAD_REQUEST);
  }

  await tokenHelper.blacklistToken(refresh, 'refresh');

  const tokens = await tokenHelper.generateAuthTokens(user);

  return res
    .status(httpStatus.OK)
    .send(new ApiResponse({ tokens }, 'Tokens Refreshed'));
});

export default {
  register,
  forgot_password,
  reset_password,
  login_user,
  logoutUser,
  refreshTokens,
};
