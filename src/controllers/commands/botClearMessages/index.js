const {
  isAdmin, deleteMessage, deleteBotsMessages,
} = require('../../functions');
const { data } = require('../../../config/bot_config');

const botClearMessages = (ctx) => deleteMessage(ctx) && isAdmin(ctx) && deleteBotsMessages({ dataConfig: data.config.botsMessagesIds, ctx });

module.exports = botClearMessages;
