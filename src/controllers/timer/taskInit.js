const cron = require('node-cron');
require('dotenv').config();

const scheduleInit = (ctx, task, ...rest) => cron.schedule(`${ctx.config.time}`,
  () => {
    task(...rest);
  }, {
    scheduled: false,
    timezone: process.env.TIME_ZONE,
  });

module.exports = scheduleInit;

