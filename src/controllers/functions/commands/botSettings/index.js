const {
  isAdmin, deleteMessage, pushToBotsMessages,
} = require('../../index');
const { data } = require('../../../../bot_config');

const botSettings = (ctx) => deleteMessage(ctx) && isAdmin(ctx) && ctx.reply(`current bot settings: ${JSON.stringify(data.config)}`)
  .then((res) => pushToBotsMessages(res.message_id));

module.exports = botSettings;
