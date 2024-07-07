import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../helpers/apiErrorConverter';
import { roles } from '../config';
import tokenHelper from '../helpers/tokenHelper';
import { ITokenPayload } from '../@types';
import config from '../config/config';
import { userService } from '../services';

const auth =
  (...requiredRights: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // extract the authorization header from the request
      const authHeader = req.headers['authorization'];

      // if not provided we can not let the user pass
      if (!authHeader) {
        return next(
          new ApiError('Please Login To Continue', httpStatus.UNAUTHORIZED),
        );
      }

      // get the token string only
      const token = authHeader.replace('Bearer', '').trim();

      // verify the token and get the payload
      const payload = (await tokenHelper.verifyToken(
        token,
        'access',
      )) as ITokenPayload;

      // check for valid issuer
      if (payload.iss !== config.security.issuer) {
        return next(
          new ApiError(
            'Invalid Token! Issuer Mismatch',
            httpStatus.UNAUTHORIZED,
          ),
        );
      }

      // check for valid token type
      if (payload.aud !== 'access') {
        return next(
          new ApiError(
            'Invalid Token! Token Type Mismatch',
            httpStatus.UNAUTHORIZED,
          ),
        );
      }

      // get the user from db
      const user = await userService.findUserById(payload.sub);

      // in case user not found in db for some reason
      if (!user) {
        return next(new ApiError('User not found', httpStatus.UNAUTHORIZED));
      }

      // check if the user has the correct access level
      if (requiredRights.length) {
        const userRights = roles.roleRights.get(user.role);
        const hasRequiredRights = requiredRights.every((requiredRight) =>
          userRights.includes(requiredRight),
        );
        if (!hasRequiredRights) {
          throw new ApiError(
            'You do not have the required permissions',
            httpStatus.FORBIDDEN,
          );
        }
      }

      // assign the user
      req.user = user;

      next();
    } catch (err) {
      next(err);
    }
  };

export default auth;
