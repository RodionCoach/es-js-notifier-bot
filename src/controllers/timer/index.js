const botConfig = require('../../bot_config');

let startNotify = (ctx, period = botConfig.config.period) => {
  setTimeout(function repeat() {
    ctx.replyWithPhoto(process.env.FILE_ID);
    startNotify = setTimeout(repeat, period, ctx);
  }, period, ctx);
};

const stoptNotify = (ctx) => {
  ctx.reply('Bot has been Stopped!');
  clearTimeout(startNotify);
};

const actions = {
  startNotify,
  stoptNotify,
};

module.exports = actions;
