const EventEmitter = require('events');
const Telegraf = require('telegraf');
const Stage = require('telegraf/stage');
const botInit = require('./controllers/setup/index');
const { setTime } = require('./controllers/setup/scenes');
require('dotenv').config();

const emitter = new EventEmitter();
const bot = new Telegraf(process.env.BOT_TOKEN);
const stage = new Stage([setTime()], { default: 'bot_setup' });

botInit(bot, stage, Stage);
emitter.setMaxListeners(emitter.getMaxListeners() + 1);

module.exports = bot;
