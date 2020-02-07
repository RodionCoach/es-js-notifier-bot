const {
  isAdmin,
  deleteMessage,
  deleteBotsMessages,
  isWorkingChat,
  sendPhoto,
} = require('../../functions');
const { botNotify, scheduleInit } = require('../../timer');
const { data, setBotConfig, pushToBotsMessages } = require('../../../config/bot_config');

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
          runningByDefault: true,
          botReply: true,
          isRunning: true,
        },
      });
      if (!data.tasksPool.notifyPause && !data.tasksPool.notifyBack) {
        data.tasksPool.notifyPause = scheduleInit({ task: sendPhoto, time: data.config.time, params: { photoId: data.imgs.needAir, ctx } });
        data.tasksPool.notifyBack = scheduleInit({ task: sendPhoto, time: data.config.pauseTime, params: { photoId: data.imgs.needJS, ctx } });
        data.tasksPool.clearBotMessages = scheduleInit({
          task: deleteBotsMessages,
          time: data.config.clearTime,
          params: { dataConfig: data.config.botsMessagesIds, ctx },
        });
      }
      botNotify(data.tasksPool.notifyPause, 'start');
      botNotify(data.tasksPool.notifyBack, 'start');
      botNotify(data.tasksPool.clearBotMessages, 'start');
      if (data.config.botReply) {
        ctx.reply('Bot started by default!')
          .then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.info(`Something went wrong on bot reply - ${error}`));
      }
    } else if (data.config.botReply) {
      ctx.reply('The bot is running already!')
        .then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.info(`Something went wrong on bot reply - ${error}`));
    }
  }
};

module.exports = botRunByDefault;
