// import User from '../../models/user.model';
import ApiError from '../../helpers/apiErrorConverter';
import { Ilogin } from '../../interfaces';

const loginUser = async (creds: Ilogin) => {
  if (creds.email === 'user@mail.com' && creds.password === 'test') {
    return true;
  }
  throw new ApiError('Invalid Creds', 401);
};

export default {
  loginUser,
};
