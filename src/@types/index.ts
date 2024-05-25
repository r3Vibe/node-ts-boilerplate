import { ObjectId } from 'mongoose';

/**
 * @description User from DB
 * @author Arnab Gupta
 */
export interface IUser {
  _id: ObjectId;
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string;
  password: string;
  is_active: boolean;
  has_social_login: boolean;
  is_blocked: boolean;
  verification_token: string;
  role: string;
  createdAt: string;
  modifiedAt: string;
}

/**
 * @description Social model
 * @author Arnab Gupta
 */
export interface ISocial {
  _id: ObjectId;
  social_id: string;
  type: string;
  user: ObjectId | IUser;
  createdAt: string;
  modifiedAt: string;
}

/**
 * @description Token model in DB
 * @author Arnab Gupta
 */
export interface tokenSchemaInterface {
  _id: ObjectId;
  token: string;
  type: string;
  createdAt: string;
  modifiedAt: string;
}

/**
 * @description Image model in DB
 * @author Arnab Gupta
 */
export interface IImages {
  _id: ObjectId;
  user: ObjectId | IUser;
  image_url: string;
  createdAt: string;
  modifiedAt: string;
}

/**
 * @description Token Paload data
 * @author Arnab Gupta
 */
export interface ITokenPayload {
  sub: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}
