/**
 * @author Arnab Gupta
 * @description ApiError is extending the default Error class to provide robust error handling for the rest api. statusCode, tatus and isOperational is added exta in this class
 */
class ApiError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
