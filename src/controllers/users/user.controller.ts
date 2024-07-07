import httpStatus from 'http-status';
import { ApiResponse, catchAsync } from '../../helpers';

const getemailEvent = catchAsync(async (req, res, next) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Some summary...'
  // #swagger.description = 'Some description...'
  res.status(httpStatus.OK).send(new ApiResponse({}, `testing`));
});
const check = catchAsync(async (req, res, next) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Some summary...'
  // #swagger.description = 'Some description...'
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  const { id, name, email } = req.body;
  res.status(httpStatus.OK).send(new ApiResponse({}, `testing`));
});

export default { getemailEvent, check };
