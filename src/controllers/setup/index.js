const { isAdmin } = require('../admin/index');
const { init, data } = require('../../bot_config');
const { botNotify } = require('../timer/index');
const scheduleInit = require('../timer/taskInit');
require('dotenv').config();

const botInit = (bot) => {
  let running = false;
  const currentTask = {};

  try {
    init(process.env.BOT_MODE, process.env.BOT_MODE_TIME, process.env.BOT_OCCUR_TIME);
    bot.start((ctx) => ctx.reply('Welcome'));
    bot.settings((ctx) => ctx.reply(`currently settings: ${JSON.stringify(data.config)}`));
    bot.command('run', (ctx) => {
      if (!running) {
        if (isAdmin(ctx)) {
          running = true;
          if (!currentTask.notify) {
            currentTask.notify = scheduleInit(ctx.replyWithPhoto);
          }
          botNotify(currentTask.notify, 'start');
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
          botNotify(currentTask.notify, 'stop');
          ctx.reply('Bot has been Stopped!');
        }
      } else {
        ctx.reply('The bot is not running yet!');
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = botInit;
