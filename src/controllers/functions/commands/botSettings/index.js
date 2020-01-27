const {
  isAdmin, deleteMessage, pushToBotsMessages,
} = require('../../index');
const { data } = require('../../../../bot_config');

const botSettings = (ctx) => deleteMessage(ctx) && isAdmin(ctx) && ctx.reply(`current bot settings: ${JSON.stringify({
  ...data.config,
  currentCtx: 'is too long to display',
  currentChatId: ctx.message.chat.id,
})}`)
  .then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.log(`Something went wrong on bot reply - ${error}`));

module.exports = botSettings;
