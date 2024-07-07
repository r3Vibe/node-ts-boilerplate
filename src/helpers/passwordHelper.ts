import crypto from 'crypto';
import { config } from '../config';

/**
 * @author Arnab Gupta
 * @description used to generate password hash
 * @param password
 * @param salt
 * @returns password hash
 */
function hashPassword(password: string) {
  const hash = crypto.createHash('sha512');
  hash.update(password + config.security.secret);
  return hash.digest('hex');
}

/**
 * @author Arnab Gupta
 * @description verify the user given password against the password hash
 * @param password
 * @param salt
 * @param hashedPassword
 * @returns true/false
 */
function verifyPassword(password: string, hashedPassword: string) {
  const hash = hashPassword(password);
  return hash === hashedPassword;
}

/**
 * @author Arnab Gupta
 * @description generate tokens
 * @returns token
 */
function generateToken() {
  return crypto.randomBytes(20).toString('hex');
}

export default {
  hashPassword,
  verifyPassword,
  generateToken,
};
