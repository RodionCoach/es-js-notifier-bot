const cron = require('node-cron');
const { data } = require('../../bot_config'); // better to require it or to put in arguments

const scheduleInit = (task) => {
  let configuredTask;
  const interval = data.config.interval.split(':');
  const time = data.config.time.split(':');

  switch (data.config.mode) {
    case process.env.BOT_MODE_INTERVAL:
      configuredTask = cron.schedule(`*/${+interval[1] || ''} */${+interval[0] || ''} * * *`, () => {
        task(process.env.FILE_ID);
      }, {
        scheduled: false,
      });
      break;
    case process.env.BOT_MODE_TIME:
      configuredTask = cron.schedule(`${time[1]} ${time[0]} * * *`, () => {
        task(process.env.FILE_ID);
      }, {
        scheduled: false,
        timezone: process.env.TIME_ZONE,
      });
      break;
    default:
      configuredTask = cron.schedule(`*/${+interval[1] || ''} */${+interval[0] || ''} * * *`, () => {
        task(process.env.FILE_ID);
        console.log('bot running by default');
      }, {
        scheduled: false,
      });
      break;
  }
  return configuredTask;
};

module.exports = scheduleInit;

