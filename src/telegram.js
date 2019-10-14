const EventEmitter = require('events');
const Telegraf = require('telegraf');
const Stage = require('telegraf/stage');
const botInit = require('./controllers/setup/index');
const { setInterval, setTime, setMode } = require('./controllers/setup/scenes');
require('dotenv').config();

const emitter = new EventEmitter();
const bot = new Telegraf(process.env.BOT_TOKEN);
const stage = new Stage([setInterval(), setTime(), setMode()], { default: 'bot_setup' });

botInit(bot, stage);
emitter.setMaxListeners(emitter.getMaxListeners() + 1);

module.exports = bot;
