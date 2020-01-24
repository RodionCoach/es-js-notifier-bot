const {
  isAdmin, deleteMessage, pushToBotsMessages,
} = require('../../index');
const { data } = require('../../../../bot_config');

const botIsRunning = (ctx) => deleteMessage(ctx) && isAdmin(ctx) && ctx.reply(`bot is running: ${data.config.isRunning}`)
  .then((res) => pushToBotsMessages(res.message_id));

module.exports = botIsRunning;
