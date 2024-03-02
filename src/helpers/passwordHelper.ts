import crypto from 'crypto';

function hashPassword(password: string, salt: string) {
  const hash = crypto.createHash('sha512');
  hash.update(password + salt);
  return hash.digest('hex');
}

function verifyPassword(
  password: string,
  salt: string,
  hashedPassword: string,
) {
  const hash = hashPassword(password, salt);
  return hash === hashedPassword;
}

export default {
  hashPassword,
  verifyPassword,
};
