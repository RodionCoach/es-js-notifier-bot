const session = require('telegraf/session');
const scheduleInit = require('../timer/taskInit');
const { keqboardChoice } = require('./markup');
const { isAdmin } = require('../admin/index');
const { data, initConfig } = require('../../bot_config');
const { botNotify } = require('../timer/index');
require('dotenv').config();

const botInit = (bot, stage) => {
  const currentTasks = {};

  try {
    initConfig(process.env.BOT_OCCUR_TIME, process.env.BOT_RUNNING);
    bot.settings((ctx) => isAdmin(ctx) && ctx.reply(`current bot settings: ${JSON.stringify(data.config)}`));
    bot.command('is_running', (ctx) => isAdmin(ctx) && ctx.reply(`bot is running: ${data.config.isRunning}`));
    bot.command('cleanup_db', (ctx) => {
      if (isAdmin(ctx)) {
        data.config = null;
      }
    });
    // eslint-disable-next-line max-len
    bot.command('fresh_air', (ctx) => (isAdmin(ctx) && !data.config.isRunning && ctx.replyWithPhoto(process.env.FILE_ID)));
    // eslint-disable-next-line max-len
    bot.command('setup', (ctx) => isAdmin(ctx) && !data.config.isRunning && keqboardChoice(ctx, 'Please choise the option'));
    bot.command('run', (ctx) => {
      if (!data.config.isRunning) {
        if (isAdmin(ctx)) {
          data.config.isRunning = true;
          if (!currentTasks.notify) {
            currentTasks.notify = scheduleInit(ctx.replyWithPhoto, process.env.FILE_ID);
          }
          botNotify(currentTasks.notify, 'start');
          ctx.reply('Bot started!');
        }
      } else {
        ctx.reply('The bot is running already!');
      }
    });
    bot.command('run_default', (ctx) => {
      if (!data.config.isRunning) {
        if (isAdmin(ctx)) {
          data.config.isRunning = true;
          initConfig(process.env.BOT_OCCUR_TIME, process.env.BOT_RUNNING);
          if (!currentTasks.notify) {
            currentTasks.notify = scheduleInit(ctx.replyWithPhoto, process.env.FILE_ID);
          }
          botNotify(currentTasks.notify, 'start');
          ctx.reply('Bot started!');
        }
      } else {
        ctx.reply('The bot is running already!');
      }
    });
    bot.command('stop', (ctx) => {
      if (data.config.isRunning) {
        if (isAdmin(ctx)) {
          data.config.isRunning = false;
          botNotify(currentTasks.notify, 'stop');
          ctx.reply('Bot has been Stopped!');
        }
      } else {
        ctx.reply('The bot is not running yet!');
      }
    });

    bot.use(session());
    bot.use(stage.middleware());
    bot.action('setTime', (ctx) => isAdmin(ctx) && ctx.scene.enter('setTime'));
    bot.action('cancellation', (ctx) => isAdmin(ctx) && ctx.scene.leave('setTime'));
  } catch (error) {
    console.log(error);
  }
};

module.exports = botInit;
