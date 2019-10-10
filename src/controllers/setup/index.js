const session = require('telegraf/session');
const { keqboardChoice } = require('./markup');
const { isAdmin } = require('../admin/index');
const { init, data } = require('../../bot_config');
const { botNotify } = require('../timer/index');
const scheduleInit = require('../timer/taskInit');

const botInit = (bot, stage) => {
  let running = false;
  const currentTask = {};

  try {
    init(process.env.BOT_MODE, process.env.BOT_INTERVAL, process.env.BOT_OCCUR_TIME);
    bot.start((ctx) => ctx.reply('Welcome'));
    bot.settings((ctx) => ctx.reply(`currently settings: ${JSON.stringify(data.config)}`));
    bot.command('fresh_air', (ctx) => isAdmin(ctx) && !running && ctx.replyWithPhoto(process.env.FILE_ID));
    bot.command('setup', (ctx) => isAdmin(ctx) && !running && keqboardChoice(ctx, 'Please choise bot behavior'));
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
    bot.command('run_default', (ctx) => {
      if (!running) {
        if (isAdmin(ctx)) {
          running = true;
          init(process.env.BOT_MODE, process.env.BOT_INTERVAL, process.env.BOT_OCCUR_TIME);
          if (!currentTask.notify) {
            currentTask.notify = scheduleInit(ctx.replyWithPhoto(process.env.FILE_ID));
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
          if (!currentTask.notify) {
            currentTask.notify = scheduleInit(ctx.replyWithPhoto);
          }
          botNotify(currentTask.notify, 'stop');
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
    bot.action('Cancel', (ctx) => isAdmin(ctx) && ctx.scene.leave());
  } catch (error) {
    console.log(error);
  }
};

module.exports = botInit;
