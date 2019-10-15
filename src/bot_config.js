const data = {
  config: {
    time: null,
    isRunning: null,
  },
};

const initConfig = (time, isRunning, ...rest) => {
  data.config.time = time;
  data.config.isRunning = (isRunning === 'true' && true) || false;
  console.log(rest);
};

module.exports = { data, initConfig };

