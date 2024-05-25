import jwt from 'jsonwebtoken';
import config from '../config/config';
import moment from 'moment';
import ApiError from './apiErrorConverter';
import status from 'http-status';
import { ITokenPayload, IUser } from '../@types';
import { Token } from '../models';

/**
 * @author Arnab Gupta
 * @description given the payload this fucntion will generate the jwt token
 * @param {ITokenPayload} payload
 * @returns {string} JWT Token
 */
const makeToken = (payload: ITokenPayload): string => {
  return jwt.sign(payload, config.security.secret, {
    algorithm: config.security.algo,
  });
};

/**
 * @author Arnab Gupta
 * @description this function will generate access and refresh tokens for the provided user
 * @param user
 * @returns '{access: string, refresh: string}'
 */
const generateAuthTokens = async (
  user: IUser,
): Promise<{
  access: {
    token: string;
    expiry: number;
  };
  refresh: {
    token: string;
    expiry: number;
  };
}> => {
  const accessExp = moment()
    .add(config.security.accessExpirationMinutes, 'minutes')
    .unix();

  // generate the access token
  const accessToken = makeToken({
    sub: String(user._id),
    iat: moment().unix(),
    exp: accessExp,
    aud: 'access',
    iss: config.security.issuer,
  });

  const refreshExp = moment()
    .add(config.security.refreshExpirationDays, 'days')
    .unix();

  // generate the refresh tokens
  const refreshToken = makeToken({
    sub: String(user._id),
    iat: moment().unix(),
    exp: refreshExp,
    aud: 'refresh',
    iss: config.security.issuer,
  });

  return {
    access: { token: accessToken, expiry: accessExp },
    refresh: { token: refreshToken, expiry: refreshExp },
  };
};

/**
 * @async
 * @author Arnab Gupta
 * @description verify the given token
 * @param token
 * @param type
 * @returns the verified token's payload
 */
const verifyToken = async (token: string, type: string) => {
  // check for blacklisted tokens
  const tokenInDb = await Token.findOne({ token, type });

  if (tokenInDb) {
    if (type === 'access') {
      throw new ApiError('Invalid Token', status.UNAUTHORIZED);
    }
    throw new ApiError('Invalid Token', status.FORBIDDEN);
  }

  // verify the token
  return jwt.verify(token, config.security.secret, {
    algorithms: config.security.algo,
    issuer: config.security.issuer,
    audience: type,
  });
};

/**
 * @author Arnab Gupta
 * @description blacklist a token
 * @param token
 * @param type
 * @returns new token object from the database
 */
const blacklistToken = async (token: string, type: string) => {
  return Token.create({ token, type });
};

export default {
  generateAuthTokens,
  verifyToken,
  blacklistToken,
};
