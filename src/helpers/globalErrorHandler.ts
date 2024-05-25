/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../config/config';
import ApiError from './apiErrorConverter';
import { Response, Request, NextFunction } from 'express';

/**
 * @author Arnab Gupta
 * @description takes the error and sends a readable message back to the client
 */
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

/**
 * @author Arnab Gupta
 * @description handle casterror and make a readable message for the client
 */
const CaseErrorHandler = (err: any) => {
  return new ApiError(`Invalid Value ${err.value} For Field ${err.path}`, 400);
};

/**
 * @author Arnab Gupta
 * @description handle duplicate key error and make a readable message for the client
 */
const DuplicateKeyError = (err: any) => {
  const keys = Object.keys(err.keyValue);
  if (keys.length > 0) {
    const firstKey = keys[0];
    const firstKeysValue = err.keyValue[firstKey];
    return new ApiError(`${firstKeysValue} already exists`, 400);
  }
};

/**
 * @author Arnab Gupta
 * @description handle validation error and make a readable message for the client
 */
const ValidationErrorHandler = (err: any) => {
  const errors = Object.values(err.errors).map((val: any) => val.message);
  const errorMsg = errors.join('. ');
  const msg = `Invalid input data ${errorMsg}`;
  return new ApiError(msg, 400);
};

/**
 * @author Arnab Gupta
 * @description handle joi validation error and make a readable message for the client
 */
const HandleJoiError = (err: any) => {
  const errMsgs = err.error.details.map((item: any) =>
    item.message.replace(/['"]/g, ''),
  );
  return new ApiError(errMsgs[0], 400);
};

/**
 * @author Arnab Gupta
 * @description handlejwt error and make a readable message for the client
 */
const JsonWebTokenErrorHandler = (error: any) => {
  return new ApiError(error.message, 401);
};

/**
 * @author Arnab Gupta
 * @description globalErrorHandler is the error handler we use in the express app. all different error scenarios are handled here
 */
const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  // MongoDb errors thrown from mongoose
  if (error.name === 'CastError') error = CaseErrorHandler(error); // when you pass abc string to a integer field
  if (error.code === 11000) error = DuplicateKeyError(error); // when a field is unique and same value is passed
  if (error.name === 'ValidationError') error = ValidationErrorHandler(error); // when default or custom validations faild against the value

  if (
    error.type &&
    (error.type === 'body' || error.type === 'params' || error.type === 'query')
  )
    error = HandleJoiError(error); // joi validation erros agains req.body / req.params / req.query

  if (error.name === 'JsonWebTokenError')
    error = JsonWebTokenErrorHandler(error); // json web token errors

  if (error.name === 'TokenExpiredError')
    error = JsonWebTokenErrorHandler(error); // json web token expiry errors

  res.locals.errorMessage = error.message;
  handleProdErrors(res, error);
};

export default globalErrorHandler;
