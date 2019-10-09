// const cron = require('node-cron');
const { data } = require('../../bot_config');

let startNotify = (ctx, period = data.config.period) => {
  setTimeout(function repeat() {
    ctx.replyWithPhoto(process.env.FILE_ID);
    startNotify = setTimeout(repeat, period, ctx);
  }, period, ctx);
};

const stoptNotify = () => {
  clearTimeout(startNotify);
};

module.exports = { startNotify, stoptNotify };
