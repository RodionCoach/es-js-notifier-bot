const {
  isAdmin, deleteMessage, setBotConfig, pushToBotsMessages,
} = require('../../index');
const { data } = require('../../../../bot_config');

const botReply = (ctx) => {
  if (deleteMessage(ctx) && isAdmin(ctx)) {
    setBotConfig({ propertyName: 'botReply', value: !data.config.botReply });
    ctx.reply(`${data.config.botReply ? 'Allow' : 'Prevent'} bot's reply`)
      .then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.log(`Something went wrong on bot reply - ${error}`));
  }
};

module.exports = botReply;
