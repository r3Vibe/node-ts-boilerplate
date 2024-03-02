/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../config/config';
import ApiError from './apiErrorConverter';
import { Response, Request, NextFunction } from 'express';

const handleProdErrors = (res: Response, error: any) => {
  if (error.isOperational) {
    return res.status(error.statusCode).send({
      status: error.status,
      message: error.message,
      stackTrace: config.env === 'dev' ? error.stack : null,
    });
  } else {
    return res.status(500).send({ status: 'error', message: error.message });
  }
};

const CaseErrorHandler = (err: any) => {
  return new ApiError(`Invalid Value ${err.value} For Field ${err.path}`, 400);
};

const DuplicateKeyError = (err: any) => {
  const keys = Object.keys(err.keyValue);
  if (keys.length > 0) {
    const firstKey = keys[0];
    const firstKeysValue = err.keyValue[firstKey];
    return new ApiError(`${firstKeysValue} already exists`, 400);
  }
};

const ValidationErrorHandler = (err: any) => {
  const errors = Object.values(err.errors).map((val: any) => val.message);
  const errorMsg = errors.join('. ');
  const msg = `Invalid input data ${errorMsg}`;
  return new ApiError(msg, 400);
};

const HandleJoiError = (err: any) => {
  const errMsgs = err.error.details.map((item: any) =>
    item.message.replace(/['"]/g, ''),
  );
  return new ApiError(errMsgs[0], 400);
};

const JsonWebTokenErrorHandler = (error: any) => {
  return new ApiError(error.message, 401);
};

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (error.name === 'CastError') error = CaseErrorHandler(error);
  if (error.code === 11000) error = DuplicateKeyError(error);
  if (error.name === 'ValidationError') error = ValidationErrorHandler(error);
  if (
    error.type &&
    (error.type === 'body' || error.type === 'params' || error.type === 'query')
  )
    error = HandleJoiError(error);
  if (error.name === 'JsonWebTokenError')
    error = JsonWebTokenErrorHandler(error);
  if (error.name === 'TokenExpiredError')
    error = JsonWebTokenErrorHandler(error);

  res.locals.errorMessage = error.message;
  handleProdErrors(res, error);
};

export default globalErrorHandler;
