const session = require('telegraf/session');
const scheduleInit = require('../timer/taskInit');
const { keqboardChoice } = require('./markup');
const { isAdmin, deleteMessage } = require('../admin/index');
const { data, initConfig } = require('../../bot_config');
const { botNotify } = require('../timer/index');
require('dotenv').config();

const botInit = (bot, stage) => {
  const currentTasks = {};

  // const cleanTasks = (tasks) => { for (const i in tasks) { if (tasks.i) { delete tasks[i]; } } };
  initConfig(process.env.BOT_OCCUR_TIME, process.env.BOT_RUNNING);
  bot.catch((err) => { // catch the bot error
    console.log('Something went wrong', err);
  });
  bot.settings(
    (ctx) => (isAdmin(ctx) && ctx.reply(`current bot settings: ${JSON.stringify(data.config)}`)) || deleteMessage(ctx),
  );
  bot.command('is_running',
    (ctx) => (isAdmin(ctx) && ctx.reply(`bot is running: ${data.config.isRunning}`)) || deleteMessage(ctx));
  bot.command('fresh_air',
    (ctx) => (isAdmin(ctx) && ctx.replyWithPhoto(process.env.FILE_ID)) || deleteMessage(ctx));
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
        initConfig(process.env.BOT_OCCUR_TIME);
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
  bot.command('stop', (ctx) => {
    if (isAdmin(ctx)) {
      if (data.config.isRunning) {
        data.config.isRunning = !data.config.isRunning;
        botNotify(currentTasks.notify, 'destroy');
        delete currentTasks.notify;
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
};

module.exports = botInit;
