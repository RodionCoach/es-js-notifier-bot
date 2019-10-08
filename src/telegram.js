const EventEmitter = require('events');
const Telegraf = require('telegraf');
const Stage = require('telegraf/stage');
const scenes = require('./controllers/setup/scenes');
const botInit = require('./controllers/setup/index');
require('dotenv').config();

const emitter = new EventEmitter();
const setInterval = scenes.setInterval();
const setDate = scenes.setDate();

const bot = new Telegraf(process.env.BOT_TOKEN || 3000);
const stage = new Stage([setInterval, setDate], { default: 'bot_setup' });

botInit(bot, stage);
emitter.setMaxListeners(emitter.getMaxListeners() + 1);

module.exports = bot;
