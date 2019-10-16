const session = require('telegraf/session');
const scheduleInit = require('../timer/taskInit');
const { keqboardChoice } = require('./markup');
const { isAdmin, deleteMessage } = require('../admin/index');
const { data, initConfig } = require('../../bot_config');
const { botNotify } = require('../timer/index');
require('dotenv').config();

const botInit = (bot, stage) => {
  const currentTasks = {};
  initConfig(process.env.BOT_OCCUR_TIME, process.env.BOT_RUNNING);
  bot.catch((err) => { // catch the bot error
    console.log('Something went wrong', err);
  });
  bot.settings(
    (ctx) => (isAdmin(ctx) && ctx.reply(`current bot settings: ${JSON.stringify(data.config)}`)) || deleteMessage(ctx),
  );
  bot.command('is_running',
    (ctx) => (isAdmin(ctx) && ctx.reply(`bot is running: ${data.config.isRunning}`)) || deleteMessage(ctx));
  bot.command('cleanup_db', (ctx) => {
    if (isAdmin(ctx)) {
      data.config = null;
    }
  });
  bot.command('fresh_air',
    (ctx) => (isAdmin(ctx) && !data.config.isRunning && ctx.replyWithPhoto(process.env.FILE_ID)) || deleteMessage(ctx));
  bot.command('setup',
    (ctx) => (isAdmin(ctx) && !data.config.isRunning && keqboardChoice(ctx, 'Please choise the option')) || deleteMessage(ctx));
  bot.command('run', (ctx) => {
    if (isAdmin(ctx)) {
      if (!data.config.isRunning) {
        data.config.isRunning = !data.config.isRunning;
        if (!currentTasks.notify) {
          currentTasks.notify = scheduleInit(ctx.replyWithPhoto, process.env.FILE_ID);
        }
        botNotify(currentTasks.notify, 'start');
        ctx.reply('Bot started!');
      } else {
        ctx.reply('The bot is running already!');
      }
    } else {
      deleteMessage(ctx);
    }
  });
  bot.command('run_default', (ctx) => {
    if (isAdmin(ctx)) {
      if (!data.config.isRunning) {
        data.config.isRunning = !data.config.isRunning;
        initConfig(process.env.BOT_OCCUR_TIME, process.env.BOT_RUNNING);
        if (!currentTasks.notify) {
          currentTasks.notify = scheduleInit(ctx.replyWithPhoto, process.env.FILE_ID);
        }
        botNotify(currentTasks.notify, 'start');
        ctx.reply('Bot started!');
      } else {
        ctx.reply('The bot is running already!');
      }
    } else {
      deleteMessage(ctx);
    }
  });
  bot.command('stop', (ctx) => {
    if (isAdmin(ctx)) {
      if (data.config.isRunning) {
        data.config.isRunning = !data.config.isRunning;
        botNotify(currentTasks.notify, 'stop');
        ctx.reply('Bot has been Stopped!');
      } else {
        ctx.reply('The bot is not running yet!');
      }
    } else {
      deleteMessage(ctx);
    }
  });

  bot.use(session());
  bot.use(stage.middleware());
  bot.action('setTime', (ctx) => isAdmin(ctx) && ctx.scene.enter('setTime'));
/*   bot.use((ctx, next) => { // Works when I send some post request to my app. Should be for local session
    ctx.session.config = {};
    ctx.session.config.isRunning = data.config.isRunning;
    ctx.session.config.time = data.config.time;
    console.log('ctx.session.config', ctx.session.config);
    next();
  }); */
};

module.exports = botInit;
