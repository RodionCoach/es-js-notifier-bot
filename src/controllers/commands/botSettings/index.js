const {
  isAdmin, deleteMessage,
} = require('../../functions');
const { data, pushToBotsMessages } = require('../../../config/bot_config');

const botSettings = (ctx) => deleteMessage(ctx) && isAdmin(ctx) && ctx.reply(`current bot settings: ${JSON.stringify({
  config: { ...data.config, currentChatId: ctx.message.chat.id },
})}`)
  .then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.info(`Something went wrong on bot reply - ${error}`));

module.exports = botSettings;
