const data = {
  config: {
    mode: process.env.BOT_MODE,
    period: +process.env.BOT_INTERVAL,
    date: process.env.BOT_DATE_TRIGGER,
  },
};

module.exports = data;
