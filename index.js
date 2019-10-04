const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.BOT_KEY);
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Проветрюли!'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch().catch((err) => {throw new Error(err.message)});
