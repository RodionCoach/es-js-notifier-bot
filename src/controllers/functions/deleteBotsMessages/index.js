const { data } = require('../../../bot_config');

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
  data.config.botsMessages = dataConfig;
};

module.exports = deleteBotsMessages;
