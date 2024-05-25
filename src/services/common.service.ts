import { IUser } from '../@types';
import { User } from '../models';

/**
 * @async
 * @author Arnab Gupta
 * @param {string} id - User's ID
 * @description Get User by id
 * @returns {Promise<IUser | null>} User object or null
 */
const getUserById = async (id: string): Promise<IUser | null> => {
  return User.findById(id);
};

export default {
  getUserById,
};
