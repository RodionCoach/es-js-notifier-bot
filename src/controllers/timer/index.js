const bot_data = require('../../bot_config');

let startNotify = (ctx, period = bot_data.config.period) => {
  setTimeout(function repeat(ctx) {
    ctx.replyWithPhoto(process.env.FILE_ID);
    startNotify = setTimeout(repeat, period, ctx);
  }, period, ctx);
};

const stoptNotify = (ctx) => {
  ctx.reply('Bot has been Stopped!');
  clearTimeout(startNotify);
}

const actions = {
  run: startNotify,
  stop: stoptNotify,
};

module.exports = actions;