const session = require('telegraf/session');
const { keqboardChoice } = require('./markup');
const { isAdmin } = require('../admin/index');
const { initConfig, data } = require('../../bot_config');
const { botNotify } = require('../timer/index');
const scheduleInit = require('../timer/taskInit');
require('dotenv').config();

const botInit = (bot, stage) => {
  let running = false;
  const currentTasks = {};

  try {
    initConfig(process.env.BOT_MODE, process.env.BOT_MODE_TIME, process.env.BOT_OCCUR_TIME, process.env.BOT_RUNNING);
    bot.settings((ctx) => ctx.reply(`current bot settings: ${JSON.stringify(data.config)}`));
    bot.command('is_running', (ctx) => isAdmin(ctx) && ctx.reply(`bot is running: ${data.config.isRunning}`));
    bot.command('fresh_air', (ctx) => isAdmin(ctx) && !running && ctx.replyWithPhoto(process.env.FILE_ID));
    bot.command('setup', (ctx) => isAdmin(ctx) && !running && keqboardChoice(ctx, 'Please choise bot behavior'));
    bot.command('run', (ctx) => {
      if (!running) {
        if (isAdmin(ctx)) {
          running = true;
          if (!currentTasks.notify) {
            currentTasks.notify = scheduleInit(ctx.replyWithPhoto);
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
          init(process.env.BOT_MODE, process.env.BOT_INTERVAL, process.env.BOT_OCCUR_TIME);
          if (!currentTasks.notify) {
            currentTasks.notify = scheduleInit(ctx.replyWithPhoto);
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
    bot.action('setInterval', (ctx) => isAdmin(ctx) && ctx.scene.enter('setInterval'));
    bot.action('setTime', (ctx) => isAdmin(ctx) && ctx.scene.enter('setTime'));
    bot.action('setMode', (ctx) => isAdmin(ctx) && ctx.scene.enter('setMode'));
    bot.action('setModeInterval', () => { data.config.mode = process.env.BOT_MODE_INTERVAL; });
    bot.action('setModeTime', () => { data.config.mode = process.env.BOT_MODE_TIME; });
  } catch (error) {
    console.log(error);
  }
};

module.exports = botInit;
