const data = {
  config: {
    mode: null,
    interval: null,
    time: null,
    isRunning: null,
  },
};

const initConfig = (mode, interval, time, isRunning, ...rest) => {
  data.config.mode = mode;
  data.config.interval = interval;
  data.config.time = time;
  data.config.isRunning = (isRunning === 'true' && true) || false;
  console.log(rest);
};

module.exports = { data, initConfig };

