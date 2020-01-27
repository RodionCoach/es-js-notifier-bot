const EventEmitter = require('events');
const Telegraf = require('telegraf');
const Stage = require('telegraf/stage');
const botInit = require('./controllers/setup/index');
const {
  setTimeScene, setPauseTimeScene, setClearTimeScene, setBotsMessagesBufferSizeScene,
} = require('./controllers/setup/scenes');
require('dotenv').config();

const telegraf = async () => {
  const emitter = new EventEmitter();
  const bot = new Telegraf(process.env.BOT_TOKEN, { username: process.env.BOT_NAME });
  const stage = new Stage([setTimeScene, setPauseTimeScene, setClearTimeScene, setBotsMessagesBufferSizeScene]);

  await botInit(bot, stage);
  emitter.setMaxListeners(emitter.getMaxListeners() + 1);

  return bot;
};

module.exports = telegraf;
