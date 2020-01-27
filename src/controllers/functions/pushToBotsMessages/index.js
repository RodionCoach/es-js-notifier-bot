const { setBotConfig } = require('../../functions/index');
const { data } = require('../../../bot_config');

const pushToBotsMessages = (messageId) => {
  if (data.config.botsMessagesIds.length === data.config.botsMessagesBufferSize) {
    if (data.config.botMessagesPointer === data.config.botsMessagesIds.length) {
      setBotConfig({ propertyName: 'botMessagesPointer', value: 0 });
    }

    setBotConfig({ value: () => { data.config.botsMessagesIds[data.config.botMessagesPointer] = messageId; } });
    setBotConfig({ propertyName: 'botMessagesPointer', value: data.config.botMessagesPointer + 1 });

    return;
  }

  data.config.botsMessagesIds.push(messageId);
};

module.exports = pushToBotsMessages;
