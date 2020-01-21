const session = require('telegraf/session');
const scheduleInit = require('../timer/taskInit');
const { keqboardChoice } = require('./markup');
const { isAdmin, deleteMessage, deleteBotMessages } = require('../functions/index');
const { data, initConfig } = require('../../bot_config');
const { botNotify } = require('../timer/index');
require('dotenv').config();

const botInit = (bot, stage) => {
  const tasksPool = {};

  // const cleanTasks = (tasks) => { for (const i in tasks) { if (tasks.i) { delete tasks[i]; } } };
  initConfig({
    time: process.env.BOT_OCCUR_TIME,
    pauseTime: process.env.BOT_PAUSE_TIME,
    clearTime: process.env.BOT_CLEAR_TIME,
    botReply: process.env.BOT_REPLY_MESSAGES,
    isRunning: process.env.BOT_RUNNING,
  });
  bot.catch((err) => { // catch the bot error
    console.log('Something went wrong', err);
  });
  bot.settings(
    (ctx) => deleteMessage(ctx) && isAdmin(ctx) && ctx.reply(`current bot settings: ${JSON.stringify(data.config)}`),
  );
  bot.command('is_running',
    (ctx) => deleteMessage(ctx) && isAdmin(ctx) && ctx.reply(`bot is running: ${data.config.isRunning}`));
  bot.command('fresh_air',
    (ctx) => deleteMessage(ctx) && isAdmin(ctx) && !data.config.isRunning && ctx.replyWithPhoto(data.imgs.needAir));
  bot.command('setup',
    (ctx) => deleteMessage(ctx) && isAdmin(ctx) && !data.config.isRunning && keqboardChoice(ctx, 'Please choise the option'));
  bot.command('clear_bot_messages',
    (ctx) => deleteMessage(ctx) && deleteBotMessages(ctx));
  bot.command('run', (ctx) => {
    deleteMessage(ctx);
    if (isAdmin(ctx)) {
      if (!data.config.isRunning) {
        data.config.isRunning = !data.config.isRunning;
        if (!tasksPool.notifyPause && !tasksPool.notifyBack) {
          tasksPool.notifyPause = scheduleInit(ctx.replyWithPhoto, data.config.time, data.imgs.needAir);
          tasksPool.notifyBack = scheduleInit(ctx.replyWithPhoto, data.config.pauseTime, data.imgs.needJS);
          tasksPool.clearBotMessages = scheduleInit(ctx.replyWithPhoto, data.config.clearTime);
        }
        botNotify(tasksPool.notifyPause, 'start');
        botNotify(tasksPool.notifyBack, 'start');
        if (data.config.botReply) ctx.reply('Bot started!');
      } else if (data.config.botReply) ctx.reply('The bot is running already!');
    }
  });
  bot.command('run_default', (ctx) => {
    deleteMessage(ctx);
    if (isAdmin(ctx)) {
      if (!data.config.isRunning) {
        initConfig({
          time: process.env.BOT_OCCUR_TIME, pauseTime: process.env.BOT_PAUSE_TIME, clearTime: process.env.BOT_CLEAR_TIME, botReply: true, isRunning: true,
        });
        if (!tasksPool.notifyPause && !tasksPool.notifyBack) {
          tasksPool.notifyPause = scheduleInit(ctx.replyWithPhoto, data.config.time, data.imgs.needAir);
          tasksPool.notifyBack = scheduleInit(ctx.replyWithPhoto, data.config.pauseTime, data.imgs.needJS);
          tasksPool.clearBotMessages = scheduleInit(deleteBotMessages, data.config.clearTime, ctx);
        }
        botNotify(tasksPool.notifyPause, 'start');
        botNotify(tasksPool.notifyBack, 'start');
        if (data.config.botReply) ctx.reply('Bot started by default!');
      } else if (data.config.botReply) ctx.reply('The bot is running already!');
    }
  });
  bot.command('stop', (ctx) => {
    deleteMessage(ctx);
    if (isAdmin(ctx)) {
      if (data.config.isRunning) {
        data.config.isRunning = !data.config.isRunning;
        botNotify(tasksPool.notifyPause, 'destroy');
        botNotify(tasksPool.notifyBack, 'destroy');
        delete tasksPool.notifyPause;
        delete tasksPool.notifyBack;
        delete tasksPool.clearBotMessages;
        if (data.config.botReply) ctx.reply('Bot has been Stopped!');
      } else if (data.config.botReply) ctx.reply('The bot is not running yet!');
    }
  });

  bot.use(session());
  bot.use(stage.middleware());
  bot.action('setTime', (ctx) => isAdmin(ctx) && ctx.scene.enter('setTime'));
  bot.action('setPauseTime', (ctx) => isAdmin(ctx) && ctx.scene.enter('setPauseTime'));

  bot.on('text', async () => console.log(data.botId));
};

module.exports = botInit;
