const Telegraf = require('telegraf');
const botTimer = require('./controllers/timer/index');
const botSetup = require('./controllers/timer/index');
const botData = require('./bot_config');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN || process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome'));
bot.settings((ctx) => ctx.reply(`currently settings: ${JSON.stringify(botData)}`));
bot.command('fresh_air', (ctx) => ctx.replyWithPhoto(process.env.FILE_ID));
bot.command('bot_setup', (ctx) => botSetup(ctx));

bot.command('run', (ctx) => botTimer.run(ctx));
bot.command('run_default', (ctx) => botTimer.run(ctx));
bot.command('stop', (ctx) => botTimer.stop(ctx));

module.exports = bot;
