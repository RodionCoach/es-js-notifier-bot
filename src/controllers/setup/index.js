const session = require('telegraf/session');
const Telegram = require('telegraf/telegram');
const { isAdmin } = require('../functions');
const { initConfig, botRestoreSettings } = require('../../bot_config');
const {
  botClearMessages,
  botIsRunning,
  botSetup,
  botNotifyFreshAir,
  botSettings,
  botRun,
  botRunByDefault,
  botStop,
  botReply,
} = require('../commands');
require('dotenv').config();

const botInit = async (bot, stage) => {
  // const cleanTasks = (tasks) => { for (const i in tasks) { if (tasks.i) { delete tasks[i]; } } };
  const telegram = new Telegram(process.env.BOT_TOKEN, { username: process.env.BOT_NAME });
  const result = await telegram.getMe().catch((error) => error);

  initConfig({ botId: result.id });
  botRestoreSettings(telegram);

  bot.catch((err) => { // catch the bots error
    console.log(`Something went wrong - ${err} : [${new Date()}]`);
  });

  bot.settings(botSettings);
  bot.command('is_running', botIsRunning);
  bot.command('fresh_air', botNotifyFreshAir);
  bot.command('allow_reply', (ctx) => botReply(ctx));
  bot.command('setup', botSetup);
  bot.command('clear_bot_messages', botClearMessages);
  bot.command('run', (ctx) => botRun(ctx));
  bot.command('run_default', (ctx) => botRunByDefault(ctx));
  bot.command('stop', (ctx) => botStop(ctx));

  bot.use(session());
  bot.use(stage.middleware());

  bot.action('setTime', (ctx) => isAdmin(ctx) && ctx.scene.enter('setTime'));
  bot.action('setPauseTime', (ctx) => isAdmin(ctx) && ctx.scene.enter('setPauseTime'));
  bot.action('setClearTime', (ctx) => isAdmin(ctx) && ctx.scene.enter('setClearTime'));
  bot.action('setBotsMessagesBufferSize', (ctx) => isAdmin(ctx) && ctx.scene.enter('setBotsMessagesBufferSize'));
};

module.exports = botInit;
