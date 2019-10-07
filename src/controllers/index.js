const ready_bot = require('../telegram.js');

ready_bot.on('sticker', (ctx) => ctx.reply('👍'));
ready_bot.hears('hi', (ctx) => ctx.reply('Hey there'));

module.exports = ready_bot;