/* eslint-disable @typescript-eslint/no-explicit-any */
import app from './app';
import config from './config/config';
import logger from './config/logger';
import mongoose from 'mongoose';

// define server
let server: any;

// connect to mongodb
mongoose.connect(config.mongoose.url).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}, Mode: ${config.env}`);
  });
});

// handle process exit
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

// handle unexpected errors or unhandled errors
const unexpectedErrorHandler = (error: any) => {
  logger.error(error);
  exitHandler();
};

// set error handler function
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

// close the server properly on sigterm
process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
