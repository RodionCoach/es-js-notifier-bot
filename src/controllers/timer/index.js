const cron = require('node-cron');
require('dotenv').config();

const botNotify = (task, command) => {
  task[String(command)]();
};

const scheduleInit = ({ task = null, params = null, time = '*****' }) => cron.schedule(`${time}`,
  () => {
    try {
      task(params);
    } catch (error) {
      console.info(`Something went wrong during cron-task execution - ${error} : [${new Date()}]`);
    }
  }, {
    scheduled: false,
    timezone: process.env.TIME_ZONE,
  });

module.exports = { botNotify, scheduleInit };
