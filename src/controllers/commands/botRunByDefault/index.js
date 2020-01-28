const {
  isAdmin,
  deleteMessage,
  deleteBotsMessages,
  isWorkingChat,
  sendPhoto,
} = require('../../functions');
const { botNotify, scheduleInit } = require('../../timer');
const { data, setBotConfig, pushToBotsMessages } = require('../../../bot_config');

const botRunByDefault = (ctx) => {
  deleteMessage(ctx);
  if (isAdmin(ctx) && isWorkingChat(ctx)) {
    if (!data.config.isRunning) {
      setBotConfig({
        propertyName: 'multiply',
        value: {
          time: process.env.BOT_OCCUR_TIME,
          pauseTime: process.env.BOT_PAUSE_TIME,
          clearTime: process.env.BOT_CLEAR_TIME,
          botReply: true,
          isRunning: true,
        },
      });
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
        ctx.reply('Bot started by default!')
          .then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.log(`Something went wrong on bot reply - ${error}`));
      }
    } else if (data.config.botReply) {
      ctx.reply('The bot is running already!')
        .then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.log(`Something went wrong on bot reply - ${error}`));
    }
  }
};

module.exports = botRunByDefault;
