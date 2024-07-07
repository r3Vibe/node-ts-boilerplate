/* eslint-disable @typescript-eslint/no-namespace */
import { ObjectId } from 'mongoose';

/**
 * @author Arnab Gupta
 */
declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Make sure to use the same type as your user object
    }
  }
}

export interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  bio: string;
  profile_image: string;
  password?: string;
  is_active: boolean;
  has_social_login: boolean;
  is_blocked: boolean;
  verification_token: string;
  role: string;
  slug: string;
  recent: string[];
  createdAt: string;
  modifiedAt: string;
}

export interface ITokenPayload {
  sub: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

export interface tokenSchemaInterface {
  _id: ObjectId;
  token: string;
  type: string;
  createdAt: string;
  modifiedAt: string;
}
