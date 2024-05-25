import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import config from '../config/config';
import { Request } from 'express';

const s3 = new S3Client();

/**
 * @description this middleware is used to upload files to s3 bucket
 * @example upload.single('key') upload.array('key')
 */
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.s3.bucket,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req: Request, file, cb) {
      const extension = file.originalname.split('.').pop(); // Get the extension from the original file name
      const uniqueKey = Date.now().toString() + '.' + extension; // Use a unique key with the extension
      cb(null, uniqueKey);
    },
  }),
});

export default upload;
