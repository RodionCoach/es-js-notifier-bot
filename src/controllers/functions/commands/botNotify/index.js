const {
  isAdmin, deleteMessage, sendPhoto, isWorkingChat,
} = require('../../index');
const { data } = require('../../../../bot_config');

const botNotify = (ctx) => deleteMessage(ctx) && isAdmin(ctx) && isWorkingChat(ctx) && !data.config.isRunning
  && sendPhoto({ photoId: data.imgs.needAir, ctx });

module.exports = botNotify;
