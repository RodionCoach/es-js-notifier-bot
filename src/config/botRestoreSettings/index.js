const { botNotify, scheduleInit } = require('../../controllers/timer');
const { data, setBotConfig } = require('../../bot_config');
const { deleteBotsMessages, sendPhoto } = require('../../controllers/functions');

const botRestoreSettings = (telegram) => {
  if (data.config.isRunning) {
    if (data.config.runningByDefault) {
      setBotConfig({
        propertyName: 'multiply',
        value: {
          time: process.env.BOT_OCCUR_TIME,
          pauseTime: process.env.BOT_PAUSE_TIME,
          clearTime: process.env.BOT_CLEAR_TIME,
          botReply: true,
        },
      });
    }
    data.tasksPool.notifyPause = scheduleInit(
      {
        task: sendPhoto,
        time: data.config.time,
        params: { photoId: data.imgs.needAir, telegram },
      },
    );
    data.tasksPool.notifyBack = scheduleInit(
      {
        task: sendPhoto,
        time: data.config.pauseTime,
        params: { photoId: data.imgs.needJS, telegram },
      },
    );
    data.tasksPool.clearBotMessages = scheduleInit(
      {
        task: deleteBotsMessages,
        time: data.config.clearTime,
        params: { dataConfig: data.config.botsMessagesIds, telegram },
      },
    );
    botNotify(data.tasksPool.notifyPause, 'start');
    botNotify(data.tasksPool.notifyBack, 'start');
    botNotify(data.tasksPool.clearBotMessages, 'start');

    console.info('Bots settings have been restored');
  }
};

module.exports = botRestoreSettings;
