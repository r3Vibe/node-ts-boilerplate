import { Request, Response, NextFunction } from 'express';

const catchAsync = (
  func: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((err) => next(err));
  };
};

export default catchAsync;
