const Telegraf = require('telegraf');
const bot_timer = require('./controllers/timer/index');
const bot_setup = require('./controllers/timer/index');
const bot_data = require('./bot_config');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN || 3000);

bot.start((ctx) => ctx.reply('Welcome'));
bot.settings((ctx) => ctx.reply('currently settings: ' + JSON.stringify(bot_data)));
bot.command('fresh_air', (ctx) => ctx.replyWithPhoto(process.env.FILE_ID));
bot.command('bot_setup', (ctx) => bot_setup(ctx));

bot.command('run', (ctx) => bot_timer.run(ctx));
bot.command('run_default', (ctx) => bot_timer.run(ctx));
bot.command('stop', (ctx) => bot_timer.stop(ctx));

module.exports = bot;