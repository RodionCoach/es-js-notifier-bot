const cron = require('node-cron');
require('dotenv').config();

const scheduleInit = (task, time, ...rest) => cron.schedule(`${time}`,
  () => {
    task(...rest);
  }, {
    scheduled: false,
    timezone: process.env.TIME_ZONE,
  });

module.exports = scheduleInit;

