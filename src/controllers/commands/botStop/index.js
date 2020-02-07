const {
  isAdmin,
  deleteMessage,
  isWorkingChat,
} = require('../../functions');
const { botNotify } = require('../../timer');
const { data, setBotConfig, pushToBotsMessages } = require('../../../config/bot_config');

const botStop = (ctx) => {
  deleteMessage(ctx);
  if (isAdmin(ctx) && isWorkingChat(ctx)) {
    if (data.config.isRunning) {
      setBotConfig({ propertyName: 'isRunning', value: !data.config.isRunning });
      botNotify(data.tasksPool.notifyPause, 'destroy');
      botNotify(data.tasksPool.notifyBack, 'destroy');
      botNotify(data.tasksPool.clearBotMessages, 'destroy');
      delete data.tasksPool.notifyPause;
      delete data.tasksPool.notifyBack;
      delete data.tasksPool.clearBotMessages;

      if (data.config.botReply) {
        ctx.reply('Bot has been Stopped!')
          .then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.info(`Something went wrong on bot reply - ${error}`));
      }
    } else if (data.config.botReply) {
      ctx.reply('The bot is not running yet!')
        .then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.info(`Something went wrong on bot reply - ${error}`));
    }
  }
};

module.exports = botStop;
