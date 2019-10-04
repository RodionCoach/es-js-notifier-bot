import Telegraf from 'telegraf';

const bot = new Telegraf(`${process.env.BOT_TOKEN}`);
bot.start((ctx: any) => ctx.reply('Welcome'));
bot.help((ctx: any) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx: any) => ctx.reply('👍'));
bot.hears('hi', (ctx: any) => ctx.reply('Hey there'));
bot.launch().catch(er => {throw new Error(er.message)});
