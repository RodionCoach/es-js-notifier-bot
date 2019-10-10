const data = {
  config: {
    mode: null,
    period: null,
    time: null,
  },
};

const init = (mode, period, time, ...rest) => {
  data.config.mode = mode;
  data.config.period = +period;
  data.config.time = time;
  console.log(rest);
};

module.exports = { data, init };

