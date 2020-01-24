const botSettings = require('./botSettings');
const botClearMessages = require('./botClearMessages');
const botIsRunning = require('./botIsRunning');
const botSetup = require('./botSetup');
const botNotifyFreshAir = require('./botNotify');
const botRun = require('./botRun');
const botRunByDefault = require('./botRunByDefault');
const botStop = require('./botStop');

module.exports = {
  botClearMessages, botIsRunning, botSetup, botNotifyFreshAir, botSettings, botRun, botRunByDefault, botStop,
};
