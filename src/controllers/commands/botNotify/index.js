const {
  isAdmin,
  deleteMessage,
  isWorkingChat,
  sendPhoto,
} = require('../../functions');
const { data } = require('../../../config/bot_config');

const botNotify = (ctx) => deleteMessage(ctx) && isAdmin(ctx) && isWorkingChat(ctx) && !data.config.isRunning
  && sendPhoto({ photoId: data.imgs.needAir, ctx });

module.exports = botNotify;
