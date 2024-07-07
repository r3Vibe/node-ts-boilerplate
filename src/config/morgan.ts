/* eslint-disable @typescript-eslint/ban-ts-comment */
import morgan from 'morgan';
import { config, logger } from '.';

// @ts-expect-error
morgan.token('message', (req, res) => res.locals.errorMessage || '');

/**
 * @author Arnab Gupta
 * @description morgan is being used to log the incoming http request
 */
const getIpFormat = () => (config.env === 'prod' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

export default { successHandler, errorHandler };
