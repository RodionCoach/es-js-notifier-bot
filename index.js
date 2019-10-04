const Telegraf = require('telegraf');

const bot = new Telegraf('920827169:AAE-8CDdbv7-RGfd_QPsRNX62M4-7T0WEH0');
bot.start((ctx) => ctx.reply('Welcome'));
bot.ventilate((ctx) => ctx.reply('Проветрюли!'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch().catch((err) => {throw new Error(err.message)});
