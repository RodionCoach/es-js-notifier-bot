require('dotenv').config();

const data = {
  config: {
    time: null,
    pauseTime: null,
    isRunning: null,
  },
  imgs: {
    needAir: process.env.FILE_ID.split(', ')[0],
    needJS: process.env.FILE_ID.split(', ')[1],
  },
};

const initConfig = (time, pauseTime, isRunning, ...rest) => {
  data.config.time = time;
  data.config.time = pauseTime;
  data.config.isRunning = (isRunning === 'true' && true) || false;
  console.log('Bot setup by default', rest);
};

module.exports = { data, initConfig };

