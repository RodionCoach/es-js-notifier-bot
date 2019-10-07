const ready_bot = require('./src/controllers/index.js');

ready_bot.launch().catch((err) => {throw new Error(err.message)});
