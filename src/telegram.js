const EventEmitter = require('events');
const Telegraf = require('telegraf');
const Telegram = require('telegraf/telegram');
const Stage = require('telegraf/stage');
const botInit = require('./controllers/setup/index');
const { data } = require('./bot_config');
const { setTimeScene, setPauseTimeScene } = require('./controllers/setup/scenes');
require('dotenv').config();

const emitter = new EventEmitter();
const bot = new Telegraf(process.env.BOT_TOKEN, { username: process.env.BOT_NAME });
const stage = new Stage([setTimeScene, setPauseTimeScene]);

const telegram = new Telegram(process.env.BOT_TOKEN, { username: process.env.BOT_NAME });
telegram.getMe().then((res) => { data.botId = res.id; }).catch((error) => error);

botInit(bot, stage);
emitter.setMaxListeners(emitter.getMaxListeners() + 1);

module.exports = bot;
