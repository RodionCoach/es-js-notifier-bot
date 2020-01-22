const EventEmitter = require('events');
const Telegraf = require('telegraf');
const Stage = require('telegraf/stage');
const Telegram = require('telegraf/telegram');
const botInit = require('./controllers/setup/index');
const { setTimeScene, setPauseTimeScene } = require('./controllers/setup/scenes');
const { data } = require('./bot_config');
require('dotenv').config();

const telegraf = async () => {
  const emitter = new EventEmitter();
  const bot = new Telegraf(process.env.BOT_TOKEN, { username: process.env.BOT_NAME });
  const stage = new Stage([setTimeScene, setPauseTimeScene]);

  const telegram = new Telegram(process.env.BOT_TOKEN, { username: process.env.BOT_NAME });
  const result = await telegram.getMe().catch((error) => error);
  console.log('result', result);
  data.config.botId = result.id;

  botInit(bot, stage);
  emitter.setMaxListeners(emitter.getMaxListeners() + 1);

  return bot;
};

module.exports = telegraf;
