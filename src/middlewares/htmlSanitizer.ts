import sanitizeHtml from 'sanitize-html';
import logger from '../config/logger';
import { NextFunction, Request, Response } from 'express';

// Middleware function to sanitize incoming HTML in request body
const sanitizeHtmlMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Check if the request body contains HTML content
  if (req.body && typeof req.body === 'object') {
    try {
      // Iterate through all properties in the request body
      for (const key in req.body) {
        if (
          Object.prototype.hasOwnProperty.call(req.body, key) &&
          typeof req.body[key] === 'string'
        ) {
          // Sanitize HTML content using sanitize-html
          req.body[key] = sanitizeHtml(req.body[key]);
        }
      }
      // Continue to the next middleware or route handler
      next();
    } catch (err) {
      // Handle any errors that may occur during the sanitization process
      logger.error('Error sanitizing HTML:', err);
      res.status(500).send('Internal Server Error');
    }
  } else {
    // If there is no request body or it's not an object, proceed to the next middleware
    next();
  }
};

export default sanitizeHtmlMiddleware;
