const {
  isAdmin, deleteMessage, sendPhoto,
} = require('../../index');
const { data } = require('../../../../bot_config');

const botNotify = (ctx) => deleteMessage(ctx) && isAdmin(ctx) && !data.config.isRunning && sendPhoto({ photoId: data.imgs.needAir, ctx });

module.exports = botNotify;
