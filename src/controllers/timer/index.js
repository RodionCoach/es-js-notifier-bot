const cron = require('node-cron');
require('dotenv').config();

const botNotify = (task, command) => {
  task[String(command)]();
};

const scheduleInit = (task = () => {}, time = '*****', params) => cron.schedule(`${time}`,
  () => {
    task(params); // probably need spread
  }, {
    scheduled: false,
    timezone: process.env.TIME_ZONE,
  });

module.exports = { botNotify, scheduleInit };
