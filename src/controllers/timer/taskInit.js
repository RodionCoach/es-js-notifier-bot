const cron = require('node-cron');
const { data } = require('../../bot_config'); // better to require it or to put in arguments

const scheduleInit = () => {
  let configTask;
  switch (data.config.mode) {
    case 'interval':
      cron.schedule('* * * * *', () => {

      }, {
        scheduled: false,
      });
      break;
    case 'time':
      cron.schedule('* * * * *', () => {
        console.log('stopped task');
      }, {
        scheduled: false,
      });
      break;
    default:
      cron.schedule('* * * * *', () => {
        console.log('stopped task');
      }, {
        scheduled: false,
      });
      break;
  }
  return configTask;
};

module.exports = scheduleInit;

