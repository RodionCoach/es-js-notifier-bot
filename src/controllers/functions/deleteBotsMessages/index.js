const { setBotConfig } = require('../../functions/index');

const deleteBotsMessages = async ({ dataConfig = [], ctx }) => {
  dataConfig.forEach(async (item, i) => {
    try {
      await ctx.deleteMessage(item);
      dataConfig.splice(i);
    } catch (error) {
      console.log(`Some went wrong by delete bot message with id ${item} - ${error}`);
      dataConfig.splice(i);
    }
  });

  setBotConfig({ propertyName: 'botsMessagesIds', value: dataConfig });
};

module.exports = deleteBotsMessages;
