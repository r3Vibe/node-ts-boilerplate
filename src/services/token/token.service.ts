import { Token } from '../../models';

const findToken = async (token: string, type: string) => {
  return Token.findOne({ token, type });
};

const createToken = async (token: string, type: string) => {
  return Token.create({ token, type });
};

export default { findToken, createToken };
