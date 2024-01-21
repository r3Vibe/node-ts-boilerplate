import catchAsync from '../../helpers/asyncErrorHandler';
import { Ilogin } from '../../interfaces';
import service from '../../services/auth/auth.service';

const loginUser = catchAsync(async (req, res, next) => {
  const data: Ilogin = req.body as Ilogin;
  await service.loginUser(data);
  return res.send('ok');
});

export default { loginUser };
