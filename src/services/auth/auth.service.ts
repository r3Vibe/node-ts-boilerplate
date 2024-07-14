import { User } from '../../models';

const findUserById = async (id: string) => {
  return User.findById(id);
};

export default {
  findUserById,
};
