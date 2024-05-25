/* eslint-disable @typescript-eslint/ban-ts-comment */
import morgan from 'morgan';
import config from './config';
import logger from './logger';

// @ts-expect-error
morgan.token('message', (req, res) => res.locals.errorMessage || '');

/**
 * @author Arnab Gupta
 * @description morgan is being used to log the incoming http request
 */
const getIpFormat = () => (config.env === 'prod' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

export const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

export const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});
