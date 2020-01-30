const {
  isAdmin,
  deleteMessage,
} = require('../../functions');
const { data, pushToBotsMessages } = require('../../../bot_config');

const botIsRunning = (ctx) => deleteMessage(ctx) && isAdmin(ctx) && ctx.reply(`bot is running: ${data.config.isRunning}`)
  .then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.info(`Something went wrong on bot reply - ${error}`));

module.exports = botIsRunning;
