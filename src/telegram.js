const EventEmitter = require('events');
const Telegraf = require('telegraf');
const botInit = require('./controllers/setup/index');
require('dotenv').config();

const emitter = new EventEmitter();
const bot = new Telegraf(process.env.BOT_TOKEN);

botInit(bot);
emitter.setMaxListeners(emitter.getMaxListeners() + 1);

module.exports = bot;
