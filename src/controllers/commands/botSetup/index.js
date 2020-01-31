const {
  isAdmin, deleteMessage,
} = require('../../functions');
const { keqboardChoice } = require('../../setup/markup');
const { data, pushToBotsMessages } = require('../../../bot_config');

const botSetup = (ctx) => deleteMessage(ctx) && isAdmin(ctx) && !data.config.isRunning && keqboardChoice(ctx, 'Please choise the option')
  .then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.info(`Something went wrong on bot reply - ${error}`));

module.exports = botSetup;
