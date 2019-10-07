const bot_config = require('../bot_config.js');

let startNotify = (ctx, period=bot_config.period) => {
  console.log(period);
  setTimeout(function repeat(ctx) {
    ctx.reply('Проветрюли!');
    console.log(startNotify);
    startNotify = setTimeout(repeat, period, ctx);
  }, period, ctx);
};

const stoptNotify = (ctx) => {
  ctx.reply('Stopped!');
  clearTimeout(startNotify);
}

const actions = {
  run: startNotify,
  stop: stoptNotify,
};

module.exports = actions;