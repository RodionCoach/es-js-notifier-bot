const session = require('telegraf/session');
const scheduleInit = require('../timer/taskInit');
const { keqboardChoice } = require('./markup');
const { isAdmin, deleteMessage } = require('../functions/index');
const { data, initConfig } = require('../../bot_config');
const { botNotify } = require('../timer/index');
require('dotenv').config();

const botInit = (bot, stage) => {
  const currentTasks = {};

  // const cleanTasks = (tasks) => { for (const i in tasks) { if (tasks.i) { delete tasks[i]; } } };
  initConfig(process.env.BOT_OCCUR_TIME, process.env.BOT_PAUSE_TIME, process.env.BOT_RUNNING);
  bot.catch((err) => { // catch the bot error
    console.log('Something went wrong', err);
  });
  bot.settings(
    (ctx) => isAdmin(ctx) && ctx.reply(`current bot settings: ${JSON.stringify(data.config)}`) && deleteMessage(ctx),
  );
  bot.command('is_running',
    (ctx) => isAdmin(ctx) && ctx.reply(`bot is running: ${data.config.isRunning}`) && deleteMessage(ctx));
  bot.command('fresh_air',
    (ctx) => isAdmin(ctx) && !data.config.isRunning && ctx.replyWithPhoto(data.imgs.needAir) && deleteMessage(ctx));
  bot.command('setup',
    (ctx) => isAdmin(ctx) && !data.config.isRunning && keqboardChoice(ctx, 'Please choise the option') && deleteMessage(ctx));
  bot.command('run', async (ctx) => {
    if (isAdmin(ctx)) {
      if (!data.config.isRunning) {
        data.config.isRunning = !data.config.isRunning;
        if (!currentTasks.notifyPause && !currentTasks.notifyBack) {
          currentTasks.notifyPause = scheduleInit(ctx.replyWithPhoto, data.config.time, data.imgs.needAir);
          currentTasks.notifyBack = scheduleInit(ctx.replyWithPhoto, data.config.pauseTime, data.imgs.needJS);
        }
        botNotify(currentTasks.notify, 'start');
        ctx.reply('Bot started!');
      } else {
        ctx.reply('The bot is running already!');
      }
    }
    deleteMessage(ctx);
  });
  bot.command('run_default', (ctx) => {
    if (isAdmin(ctx)) {
      if (!data.config.isRunning) {
        initConfig(process.env.BOT_OCCUR_TIME, process.env.BOT_PAUSE_TIME);
        data.config.isRunning = !data.config.isRunning;
        if (!currentTasks.notifyPause && !currentTasks.notifyBack) {
          currentTasks.notifyPause = scheduleInit(ctx.replyWithPhoto, data.config.time, data.imgs.needAir);
          currentTasks.notifyBack = scheduleInit(ctx.replyWithPhoto, data.config.pauseTime, data.imgs.needJS);
        }
        botNotify(currentTasks.notifyPause, 'start');
        ctx.reply('Bot started!');
      } else {
        ctx.reply('The bot is running already!');
      }
    }
    deleteMessage(ctx);
  });
  bot.command('stop', (ctx) => {
    if (isAdmin(ctx)) {
      if (data.config.isRunning) {
        data.config.isRunning = !data.config.isRunning;
        botNotify(currentTasks.notifyPause, 'destroy');
        botNotify(currentTasks.notifyBack, 'destroy');
        delete currentTasks.notifyPause;
        delete currentTasks.notifyBack;
        ctx.reply('Bot has been Stopped!');
      } else {
        ctx.reply('The bot is not running yet!');
      }
    }
    deleteMessage(ctx);
  });

  bot.use(session());
  bot.use(stage.middleware());
  bot.action('setTime', (ctx) => isAdmin(ctx) && ctx.scene.enter('setTime'));
};

module.exports = botInit;
