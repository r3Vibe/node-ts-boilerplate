import { NextFunction, Request, Response } from 'express';

/**
 * @author Arnab Gupta
 * @description this middleware is used after multer-s3 to parse the returned file url to the key
 * @example uploadName('key')
 */
const setKeyValueAfterMulter = (key: string) => {
  return function (req: Request, res: Response, next: NextFunction) {
    const bodyData: { [key: string]: string | string[] } = {};
    // handle single file upload
    if (req.file) {
      const myFile = req.file as Express.MulterS3.File;
      bodyData[key] = myFile.location;
    }

    // handle multiple file uploads
    if (req.files) {
      const reqFiles = req.files as Express.MulterS3.File[];
      const allFiles: string[] = [];
      for (let i: number = 0; i < reqFiles.length; i++) {
        const file: Express.MulterS3.File = reqFiles[i];
        allFiles.push(file.location);
      }
      bodyData[key] = allFiles;
    }

    req.body = bodyData;

    next();
  };
};

export default setKeyValueAfterMulter;
