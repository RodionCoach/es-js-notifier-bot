const Markup = require('telegraf/markup');
const session = require('telegraf/session');
const botConfig = require('../../bot_config');
const botTimer = require('../timer/index');

const botInit = (bot, stage) => {
  bot.start((ctx) => ctx.reply('Welcome'));
  bot.settings((ctx) => ctx.reply(`currently settings: ${JSON.stringify(botConfig)}`));
  bot.command('fresh_air', (ctx) => ctx.replyWithPhoto(process.env.FILE_ID));
  bot.command('bot_setup', (ctx) => {
    ctx.reply('PLease choise bot behavior', Markup.inlineKeyboard([
      Markup.callbackButton('Set interval', 'setInterval'),
      Markup.callbackButton('Set date', 'setDate'),
    ]).extra());
  });
  bot.command('run', (ctx) => botTimer.startNotify(ctx));
  bot.command('run_default', (ctx) => botTimer.startNotify(ctx));
  bot.command('stop', (ctx) => botTimer.stoptNotify(ctx));
  bot.use(session());
  bot.use(stage.middleware());
  bot.action('setInterval', (ctx) => ctx.scene.enter('setInterval'));
  bot.action('setDate', (ctx) => ctx.scene.enter('setDate'));
};

module.exports = botInit;
