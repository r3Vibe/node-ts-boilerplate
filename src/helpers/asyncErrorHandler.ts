/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';

/**
 * @author Arnab Gupta
 * @description catchAsync takes a function as an input and catches any asyncronous errors inside and passes that to the global error handler. Do not forget to pass the next in your controller function
 * @example catchAsync((req,res,next) => {...})
 */
const catchAsync = (
  func: (_req: Request, _res: Response, next: NextFunction) => Promise<any>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((err) => {
      next(err);
    });
  };
};

export default catchAsync;
