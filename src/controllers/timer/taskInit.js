const cron = require('node-cron');
require('dotenv').config();

const scheduleInit = (task = () => {}, time = '*****', params) => cron.schedule(`${time}`,
  () => {
    task(params); // probably need spread
  }, {
    scheduled: false,
    timezone: process.env.TIME_ZONE,
  });

module.exports = scheduleInit;

