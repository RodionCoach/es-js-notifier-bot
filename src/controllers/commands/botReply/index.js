const {
  isAdmin, deleteMessage,
} = require('../../functions');
const { data, setBotConfig, pushToBotsMessages } = require('../../../config/bot_config');

const botReply = (ctx) => {
  if (deleteMessage(ctx) && isAdmin(ctx)) {
    setBotConfig({ propertyName: 'botReply', value: !data.config.botReply });
    ctx.reply(`${data.config.botReply ? 'Allow' : 'Prevent'} bot's reply`)
      .then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.info(`Something went wrong on bot reply - ${error}`));
  }
};

module.exports = botReply;
