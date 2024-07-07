import winston from 'winston';
import { config } from '.';

/**
 * @author Arnab Gupta
 * @description format the logs
 */
const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

/**
 * @author Arnab Gupta
 * @description winston logger to store and show the different logs
 */
const logger = winston.createLogger({
  level: config.env === 'dev' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === 'dev'
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`),
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

export default logger;
