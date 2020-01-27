const {
  isAdmin, deleteMessage, pushToBotsMessages, setBotConfig, isWorkingChat,
} = require('../../index');
const { botNotify } = require('../../../timer/index');
const { data } = require('../../../../bot_config');

const botStop = (ctx, tasksPool) => {
  deleteMessage(ctx);
  if (isAdmin(ctx) && isWorkingChat(ctx)) {
    if (data.config.isRunning) {
      setBotConfig({ propertyName: 'isRunning', value: !data.config.isRunning });
      botNotify(tasksPool.notifyPause, 'destroy');
      botNotify(tasksPool.notifyBack, 'destroy');
      botNotify(tasksPool.clearBotMessages, 'destroy');
      delete tasksPool.notifyPause;
      delete tasksPool.notifyBack;
      delete tasksPool.clearBotMessages;
      if (data.config.botReply) {
        ctx.reply('Bot has been Stopped!')
          .then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.log(`Something went wrong on bot reply - ${error}`));
      }
    } else if (data.config.botReply) {
      ctx.reply('The bot is not running yet!')
        .then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.log(`Something went wrong on bot reply - ${error}`));
    }
  }
};

module.exports = botStop;
