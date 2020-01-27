const fs = require('fs');
require('dotenv').config();

const data = {
  config: {
    botId: null,
    time: null,
    pauseTime: null,
    clearTime: null,
    botReply: null,
    isRunning: null,
    runningByDefault: null,
    botsMessagesBufferSize: null,
    botMessagesPointer: null,
    botsMessagesIds: null,
    currentCtx: null,
  },
  imgs: {
    needAir: process.env.FILE_ID.split(', ')[0],
    needJS: process.env.FILE_ID.split(', ')[1],
  },
};

const saveBotConfig = () => {
  try {
    fs.writeFile('botconfig.json', JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log('Config`s data has been replaced!');
    });
  } catch (error) {
    console.log(`Error file writing - ${error}`);
  }
};

const readBotConfig = () => {
  try {
    const botConfig = JSON.parse(fs.readFileSync('botconfig.json', 'utf8'));

    return botConfig;
  } catch (error) {
    console.log(`Error file reading - ${error}`);

    return data;
  }
};

const initConfig = ({
  botId = null,
  time = null,
  pauseTime = null,
  isRunning = null,
  runningByDefault = null,
  botsMessagesBufferSize = null,
  botMessagesPointer = 0,
  botsMessagesIds = null,
  clearTime = null,
  botReply = false,
  currentCtx = null,
  ...rest
}) => {
  const contents = readBotConfig();

  data.config.botId = botId;
  data.config.time = time || contents.config.time || process.env.BOT_OCCUR_TIME;
  data.config.pauseTime = pauseTime || contents.config.pauseTime || process.env.BOT_PAUSE_TIME;
  data.config.clearTime = clearTime || contents.config.clearTime || process.env.BOT_CLEAR_TIME;
  data.config.botsMessagesBufferSize = botsMessagesBufferSize || contents.config.botsMessagesBufferSize || process.env.BOT_MESSAGES_AMOUNT;
  data.config.botMessagesPointer = botMessagesPointer !== null ? botMessagesPointer : contents.config.botMessagesPointer;
  data.config.botsMessagesIds = botsMessagesIds || contents.config.botsMessagesIds || [];
  data.config.botReply = botReply || contents.config.botReply || false;
  data.config.isRunning = isRunning || contents.config.isRunning || false;
  data.config.runningByDefault = runningByDefault || contents.config.runningByDefault || false;
  data.config.currentCtx = currentCtx || contents.config.currentCtx;

  saveBotConfig();
  console.log('Bot setup by default', rest);
};

module.exports = {
  data, initConfig, saveBotConfig, readBotConfig,
};

