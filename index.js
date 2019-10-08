const bot = require('./src/telegram');

bot.launch().catch((err) => { throw new Error(err.message); });
