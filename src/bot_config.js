const data = {
  config: {
    mode: null,
    period: null,
    time: null,
  },
  setConfigMode(v) { this.config.mode = v; },
  setConfigPeriod(v) { this.config.period = v; },
  setConfigDate(v) { this.config.date = v; },
};

const init = (mode, period, time, ...rest) => {
  data.config.mode = mode;
  data.config.period = +period * 1000;
  data.config.time = time;
  console.log(rest);
};

module.exports = { data, init };

