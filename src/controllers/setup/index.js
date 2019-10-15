const session = require('telegraf/session'),
scheduleInit = require('../timer/taskInit');
const { keqboardChoice } = require('./markup');
const { isAdmin } = require('../admin/index');
const { initConfig } = require('../../bot_config');
const { botNotify } = require('../timer/index');
require('dotenv').config();

const botInit = (bot, stage, localSession) => {
  let running = false;
  const currentTasks = {};

  try {
    bot.settings((ctx) => isAdmin(ctx) && ctx.reply(`current bot settings: ${JSON.stringify(ctx.config)}`));
    bot.command('is_running', (ctx) => isAdmin(ctx) && ctx.reply(`bot is running: ${ctx.config.isRunning}`));
    bot.command('fresh_air', (ctx) => isAdmin(ctx) && !running && ctx.replyWithPhoto(process.env.FILE_ID));
    bot.command('setup', (ctx) => isAdmin(ctx) && !running && keqboardChoice(ctx, 'Please choise the option'));
    bot.command('run', (ctx) => {
      if (!running) {
        if (isAdmin(ctx)) {
          running = true;
          if (!currentTasks.notify) {
            currentTasks.notify = scheduleInit(ctx, ctx.replyWithPhoto, process.env.FILE_ID);
          }
          botNotify(currentTasks.notify, 'start');
          ctx.reply('Bot started!');
        }
      } else {
        ctx.reply('The bot is running already!');
      }
    });
    bot.command('run_default', (ctx) => {
      if (!running) {
        if (isAdmin(ctx)) {
          running = true;
          initConfig(process.env.BOT_OCCUR_TIME, process.env.BOT_RUNNING);
          if (!currentTasks.notify) {
            currentTasks.notify = scheduleInit(ctx, ctx.replyWithPhoto, process.env.FILE_ID);
          }
          botNotify(currentTasks.notify, 'start');
          ctx.reply('Bot started!');
        }
      } else {
        ctx.reply('The bot is running already!');
      }
    });
    bot.command('stop', (ctx) => {
      if (running) {
        if (isAdmin(ctx)) {
          running = false;
          botNotify(currentTasks.notify, 'stop');
          ctx.reply('Bot has been Stopped!');
        }
      } else {
        ctx.reply('The bot is not running yet!');
      }
    });

    bot.use(session());
    bot.use(stage.middleware());
    bot.use(localSession.middleware())
    bot.use( (ctx) => initConfig(ctx, process.env.BOT_OCCUR_TIME, process.env.BOT_RUNNING));

    bot.action('setTime', (ctx) => isAdmin(ctx) && ctx.scene.enter('setTime'));
    bot.action('cancellation', (ctx) => isAdmin(ctx) && ctx.scene.leave('setTime'));
  } catch (error) {
    console.log(error);
  }
};

module.exports = botInit;
