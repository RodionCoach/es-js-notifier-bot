const session = require('telegraf/session');
const Telegram = require('telegraf/telegram');
const scheduleInit = require('../timer/taskInit');
const { keqboardChoice } = require('./markup');
const {
  isAdmin, deleteMessage, deleteBotsMessages, sendPhoto, pushToBotsMessages, setBotConfig,
} = require('../functions/index');
const { data, initConfig } = require('../../bot_config');
const { botNotify } = require('../timer/index');
require('dotenv').config();

const botInit = async (bot, stage) => {
  const tasksPool = {};

  // const cleanTasks = (tasks) => { for (const i in tasks) { if (tasks.i) { delete tasks[i]; } } };
  const telegram = new Telegram(process.env.BOT_TOKEN, { username: process.env.BOT_NAME });
  const result = await telegram.getMe().catch((error) => error);
  setBotConfig({ propertyName: 'botId', value: result.id });

  initConfig({});

  bot.catch((err) => { // catch the bots error
    console.log('Something went wrong', err);
  });
  bot.settings(
    (ctx) => deleteMessage(ctx) && isAdmin(ctx) && ctx.reply(`current bot settings: ${JSON.stringify(data.config)}`)
      .then((res) => pushToBotsMessages(res.message_id)),
  );
  bot.command('is_running',
    (ctx) => deleteMessage(ctx) && isAdmin(ctx) && ctx.reply(`bot is running: ${data.config.isRunning}`)
      .then((res) => pushToBotsMessages(res.message_id)));
  bot.command('fresh_air',
    (ctx) => deleteMessage(ctx) && isAdmin(ctx) && !data.config.isRunning && sendPhoto({ photoId: data.imgs.needAir, ctx }));
  bot.command('setup',
    (ctx) => deleteMessage(ctx) && isAdmin(ctx) && !data.config.isRunning && keqboardChoice(ctx, 'Please choise the option'));
  bot.command('clear_bot_messages',
    (ctx) => deleteMessage(ctx) && isAdmin(ctx) && deleteBotsMessages({ dataConfig: data.config.botsMessagesIds, ctx }));
  bot.command('run', (ctx) => {
    deleteMessage(ctx);
    if (isAdmin(ctx)) {
      if (!data.config.isRunning) {
        setBotConfig({ propertyName: 'isRunning', value: !data.config.isRunning });
        if (!tasksPool.notifyPause && !tasksPool.notifyBack) {
          tasksPool.notifyPause = scheduleInit(sendPhoto, data.config.time, { photoId: data.imgs.needAir, ctx });
          tasksPool.notifyBack = scheduleInit(sendPhoto, data.config.pauseTime, { photoId: data.imgs.needJS, ctx });
          tasksPool.clearBotMessages = scheduleInit(deleteBotsMessages, data.config.clearTime,
            { dataConfig: data.config.botsMessagesIds, ctx });
        }
        botNotify(tasksPool.notifyPause, 'start');
        botNotify(tasksPool.notifyBack, 'start');
        botNotify(tasksPool.clearBotMessages, 'start');
        if (data.config.botReply) ctx.reply('Bot started!').then((res) => pushToBotsMessages(res.message_id));
      } else if (data.config.botReply) ctx.reply('The bot is running already!').then((res) => pushToBotsMessages(res.message_id));
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
          tasksPool.notifyPause = scheduleInit(sendPhoto, data.config.time, { photoId: data.imgs.needAir, ctx });
          tasksPool.notifyBack = scheduleInit(sendPhoto, data.config.pauseTime, { photoId: data.imgs.needJS, ctx });
          tasksPool.clearBotMessages = scheduleInit(deleteBotsMessages, data.config.clearTime,
            { dataConfig: data.config.botsMessagesIds, ctx });
        }
        botNotify(tasksPool.notifyPause, 'start');
        botNotify(tasksPool.notifyBack, 'start');
        botNotify(tasksPool.clearBotMessages, 'start');
        if (data.config.botReply) ctx.reply('Bot started by default!').then((res) => pushToBotsMessages(res.message_id));
      } else if (data.config.botReply) ctx.reply('The bot is running already!').then((res) => pushToBotsMessages(res.message_id));
    }
  });
  bot.command('stop', (ctx) => {
    deleteMessage(ctx);
    if (isAdmin(ctx)) {
      if (data.config.isRunning) {
        setBotConfig({ propertyName: 'isRunning', value: !data.config.isRunning });
        botNotify(tasksPool.notifyPause, 'destroy');
        botNotify(tasksPool.notifyBack, 'destroy');
        botNotify(tasksPool.clearBotMessages, 'destroy');
        delete tasksPool.notifyPause;
        delete tasksPool.notifyBack;
        delete tasksPool.clearBotMessages;
        if (data.config.botReply) ctx.reply('Bot has been Stopped!').then((res) => pushToBotsMessages(res.message_id));
      } else if (data.config.botReply) ctx.reply('The bot is not running yet!').then((res) => pushToBotsMessages(res.message_id));
    }
  });

  bot.use(session());
  bot.use(stage.middleware());
  bot.action('setTime', (ctx) => isAdmin(ctx) && ctx.scene.enter('setTime'));
  bot.action('setPauseTime', (ctx) => isAdmin(ctx) && ctx.scene.enter('setPauseTime'));
};

module.exports = botInit;
