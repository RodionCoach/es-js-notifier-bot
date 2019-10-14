const { isAdmin } = require('../admin/index');
const { initConfig, data } = require('../../bot_config');
const { botNotify } = require('../timer/index');
const scheduleInit = require('../timer/taskInit');
require('dotenv').config();

const botInit = (bot) => {
  const currentTask = {};

  try {
    initConfig(process.env.BOT_MODE, process.env.BOT_MODE_TIME, process.env.BOT_OCCUR_TIME, process.env.BOT_RUNNING);
    bot.settings((ctx) => isAdmin(ctx) && ctx.reply(`current bot settings: ${JSON.stringify(data.config)}`));
    bot.command('is_running', (ctx) => isAdmin(ctx) && ctx.reply(`bot is running: ${data.config.isRunning}`));
    bot.command('run', (ctx) => {
      if (!data.config.isRunning) {
        if (isAdmin(ctx)) {
          data.config.isRunning = !data.config.isRunning;
          if (!currentTask.notify) {
            currentTask.notify = scheduleInit(ctx.replyWithPhoto);
          }
          botNotify(currentTask.notify, 'start');
          ctx.reply('Bot started!');
        }
      } else if (isAdmin(ctx)) {
        ctx.reply('The bot is running already!');
      }
    });
    bot.command('stop', (ctx) => {
      if (data.config.isRunning) {
        if (isAdmin(ctx)) {
          data.config.isRunning = !data.config.isRunning;
          botNotify(currentTask.notify, 'stop');
          ctx.reply('Bot has been Stopped!');
        }
      } else if (isAdmin(ctx)) {
        ctx.reply('The bot is not running yet!');
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = botInit;
