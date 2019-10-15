const EventEmitter = require('events'),
Telegraf = require('telegraf'),
LocalSession = require('telegraf-session-local'),
Stage = require('telegraf/stage'),
botInit = require('./controllers/setup/index');
const { setTimeScene } = require('./controllers/setup/scenes');
require('dotenv').config();

const emitter = new EventEmitter();
const bot = new Telegraf(process.env.BOT_TOKEN);
const stage = new Stage([setTimeScene]);

const localSession = new LocalSession({
  database: 'ctx_db.json',
  property: 'config',
  storage: LocalSession.storageFileAsync,
  state: { messages: [] }
});

localSession.DB.then(DB => {
  console.log('Current LocalSession DB:', DB.value())
})

botInit(bot, stage, localSession);
emitter.setMaxListeners(emitter.getMaxListeners() + 1);

module.exports = bot;
