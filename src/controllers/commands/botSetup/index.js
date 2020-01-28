const {
  isAdmin, deleteMessage,
} = require('../../functions');
const { keqboardChoice } = require('../../setup/markup');
const { data } = require('../../../bot_config');

const botSetup = (ctx) => deleteMessage(ctx) && isAdmin(ctx) && !data.config.isRunning && keqboardChoice(ctx, 'Please choise the option');

module.exports = botSetup;
