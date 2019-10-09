const bot = require('./telegram');

bot.launch().catch((err) => { throw new Error(err.message); });
