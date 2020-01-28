const {
  isAdmin,
  deleteMessage,
  deleteBotsMessages,
  isWorkingChat,
  sendPhoto,
} = require('../../functions');
const { botNotify, scheduleInit } = require('../../timer');
const { data, setBotConfig, pushToBotsMessages } = require('../../../bot_config');

const botRun = (ctx) => {
  deleteMessage(ctx);
  if (isAdmin(ctx) && isWorkingChat(ctx)) {
    if (!data.config.isRunning) {
      setBotConfig({ propertyName: 'isRunning', value: !data.config.isRunning });
      if (!data.tasksPool.notifyPause && !data.tasksPool.notifyBack) {
        data.tasksPool.notifyPause = scheduleInit(sendPhoto, data.config.time, { photoId: data.imgs.needAir, ctx });
        data.tasksPool.notifyBack = scheduleInit(sendPhoto, data.config.pauseTime, { photoId: data.imgs.needJS, ctx });
        data.tasksPool.clearBotMessages = scheduleInit(deleteBotsMessages, data.config.clearTime,
          { dataConfig: data.config.botsMessagesIds, ctx });
      }
      botNotify(data.tasksPool.notifyPause, 'start');
      botNotify(data.tasksPool.notifyBack, 'start');
      botNotify(data.tasksPool.clearBotMessages, 'start');
      if (data.config.botReply) {
        ctx.reply('Bot started!')
          .then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.log(`Something went wrong on bot reply - ${error}`));
      }
    } else if (data.config.botReply) {
      ctx.reply('The bot is running already!')
        .then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.log(`Something went wrong on bot reply - ${error}`));
    }
  }
};

module.exports = botRun;
