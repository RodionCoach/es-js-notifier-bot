const data = {
  config: {
    mode: null,
    interval: null,
    time: null,
  },
};

const init = (mode, interval, time, ...rest) => {
  data.config.mode = mode;
  data.config.interval = interval;
  data.config.time = time;
  console.log(rest);
};

module.exports = { data, init };

