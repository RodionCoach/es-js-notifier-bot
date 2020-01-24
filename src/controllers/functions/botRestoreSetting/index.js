const {
  sendPhoto, deleteBotsMessages, setBotConfig,
} = require('../index');
const { data } = require('../../../bot_config');
const { botNotify } = require('../../timer/index');
const scheduleInit = require('../../timer/taskInit');

const botRestoreSetting = (ctx, tasksPool) => {
  if (data.config.isRunning) {
    if (data.config.runningByDefault) {
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
      if (!tasksPool.notifyPause && !tasksPool.notifyBack) {
        tasksPool.notifyPause = scheduleInit(sendPhoto, data.config.time, { photoId: data.imgs.needAir, ctx });
        tasksPool.notifyBack = scheduleInit(sendPhoto, data.config.pauseTime, { photoId: data.imgs.needJS, ctx });
        tasksPool.clearBotMessages = scheduleInit(deleteBotsMessages, data.config.clearTime,
          { dataConfig: data.config.botsMessagesIds, ctx });
      }
      botNotify(tasksPool.notifyPause, 'start');
      botNotify(tasksPool.notifyBack, 'start');
      botNotify(tasksPool.clearBotMessages, 'start');
    }
  }
  if (!tasksPool.notifyPause && !tasksPool.notifyBack) {
    tasksPool.notifyPause = scheduleInit(sendPhoto, data.config.time, { photoId: data.imgs.needAir, ctx });
    tasksPool.notifyBack = scheduleInit(sendPhoto, data.config.pauseTime, { photoId: data.imgs.needJS, ctx });
    tasksPool.clearBotMessages = scheduleInit(deleteBotsMessages, data.config.clearTime,
      { dataConfig: data.config.botsMessagesIds, ctx });
  }
  botNotify(tasksPool.notifyPause, 'start');
  botNotify(tasksPool.notifyBack, 'start');
  botNotify(tasksPool.clearBotMessages, 'start');
};

module.exports = botRestoreSetting;
