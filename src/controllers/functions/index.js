const isAdmin = require('./isAdmin');
const deleteMessage = require('./deleteMessage');
const deleteBotsMessages = require('./deleteBotsMessages');
const sendPhoto = require('./sendPhoto');
const pushToBotsMessages = require('./pushToBotsMessages');
const setBotConfig = require('./setBotConfig');
const botRestoreSetting = require('./botRestoreSetting');

module.exports = {
  isAdmin, deleteMessage, deleteBotsMessages, sendPhoto, pushToBotsMessages, setBotConfig, botRestoreSetting,
};

