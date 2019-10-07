const ready_bot = require('../telegram.js');
const actions = require('./actions.js');
const bot_config = require('../bot_config.js')

ready_bot.start((ctx) => ctx.reply('Welcome'));
ready_bot.settings((ctx) => ctx.reply('currently settings: ' + JSON.stringify(bot_config)));
ready_bot.command('fresh_air', (ctx) => ctx.replyWithPhoto('photo'));
ready_bot.command('bot_setup', (ctx) => ctx.reply('Please send me command: /periodicly'));

ready_bot.command('run', (ctx) => actions.run(ctx));
ready_bot.command('run_default', (ctx) => actions.run(ctx));
ready_bot.command('stop', (ctx) => actions.stop(ctx));

module.exports = ready_bot;