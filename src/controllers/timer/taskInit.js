const cron = require('node-cron');
const { data } = require('../../bot_config'); // better to require it or to put in arguments
require('dotenv').config();

const scheduleInit = (task) => {
  const time = data.config.time.split(':');
  return cron.schedule(`${time[1]} ${time[0]} * * *`, () => {
    task(process.env.FILE_ID);
  }, {
    scheduled: false,
    timezone: process.env.TIME_ZONE,
  });
};

module.exports = scheduleInit;

