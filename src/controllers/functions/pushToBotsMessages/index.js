const { data } = require('../../../bot_config');

const pushToBotsMessages = (messageId) => {
  if (data.botsMessagesIds.length === data.botsMessagesAmount) {
    if (data.botMessagesPointer === data.botsMessagesIds.length) {
      data.botMessagesPointer = 0;
    }
    data.botsMessagesIds[data.botMessagesPointer] = messageId;
    data.botsMessagesIds.push(messageId);
    data.botMessagesPointer += data.botMessagesPointer;

    return;
  }
  data.botsMessagesIds.push(messageId);
};

module.exports = pushToBotsMessages;
