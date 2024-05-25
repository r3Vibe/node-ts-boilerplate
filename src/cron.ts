import cron from 'node-cron';
import logger from './config/logger';

/**
 * Cron Job Runs Every Day 00:00:00
 */
cron.schedule('0 0 * * *', async () => {
  logger.info('Runs at midnight');
});
