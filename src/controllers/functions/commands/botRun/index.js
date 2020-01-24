const {
  isAdmin, deleteMessage, pushToBotsMessages, setBotConfig, deleteBotsMessages, sendPhoto,
} = require('../../index');
const { botNotify } = require('../../../timer/index');
const { data } = require('../../../../bot_config');
const scheduleInit = require('../../../timer/taskInit');

const botRun = (ctx, tasksPool) => {
  deleteMessage(ctx);
  if (isAdmin(ctx)) {
    if (!data.config.isRunning) {
      setBotConfig({ propertyName: 'isRunning', value: !data.config.isRunning });
      if (!tasksPool.notifyPause && !tasksPool.notifyBack) {
        tasksPool.notifyPause = scheduleInit(sendPhoto, data.config.time, { photoId: data.imgs.needAir, ctx });
        tasksPool.notifyBack = scheduleInit(sendPhoto, data.config.pauseTime, { photoId: data.imgs.needJS, ctx });
        tasksPool.clearBotMessages = scheduleInit(deleteBotsMessages, data.config.clearTime,
          { dataConfig: data.config.botsMessagesIds, ctx });
      }
      botNotify(tasksPool.notifyPause, 'start');
      botNotify(tasksPool.notifyBack, 'start');
      botNotify(tasksPool.clearBotMessages, 'start');
      if (data.config.botReply) ctx.reply('Bot started!').then((res) => pushToBotsMessages(res.message_id));
    } else if (data.config.botReply) ctx.reply('The bot is running already!').then((res) => pushToBotsMessages(res.message_id));
  }
};

module.exports = botRun;
