const isAdmin = require('./isAdmin');
const pushToBotsMessages = require('./pushToBotsMessages');
const deleteMessage = require('./deleteMessage');
const deleteBotsMessages = require('./deleteBotsMessages');
const setBotConfig = require('./setBotConfig');
const botRestoreSettings = require('./botRestoreSettings');
const isWorkingChat = require('./isWorkingChat');

module.exports = {
  isAdmin,
  pushToBotsMessages,
  deleteMessage,
  deleteBotsMessages,
  setBotConfig,
  botRestoreSettings,
  isWorkingChat,
};

