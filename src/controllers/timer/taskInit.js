const cron = require('node-cron');
const { data } = require('../../bot_config');
require('dotenv').config();

const scheduleInit = (task, ...rest) => cron.schedule(`${data.config.time}`,
  () => {
    task(...rest);
  }, {
    scheduled: false,
    timezone: process.env.TIME_ZONE,
  });

module.exports = scheduleInit;

