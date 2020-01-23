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
    botsMessagesAmount: null,
    botMessagesPointer: null,
    botsMessagesIds: null,
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
      console.log('Configs data has been replaced!');
    });
  } catch (error) {
    console.log(`Error file writing - ${error}`);
  }
};

const initConfig = ({
  botId = null,
  time = null,
  pauseTime = null,
  isRunning = false,
  botsMessagesAmount = null,
  botMessagesPointer = 0,
  botsMessagesIds = null,
  clearTime = null,
  botReply = false,
  ...rest
}) => {
  let contents = data;

  try {
    contents = JSON.parse(fs.readFileSync('botconfig.json', 'utf8'));
  } catch (error) {
    console.log(`Error file reading - ${error}`);
  }

  data.config.botId = botId || contents.config.botId;
  data.config.time = time || contents.config.time || process.env.BOT_OCCUR_TIME;
  data.config.pauseTime = pauseTime || contents.config.pauseTime || process.env.BOT_PAUSE_TIME;
  data.config.clearTime = clearTime || contents.config.clearTime || process.env.BOT_CLEAR_TIME;
  data.config.botsMessagesAmount = botsMessagesAmount || contents.config.botsMessagesAmount || process.env.BOT_MESSAGES_AMOUNT;
  data.config.botMessagesPointer = botMessagesPointer !== null ? botMessagesPointer : contents.config.botMessagesPointer;
  data.config.botsMessagesIds = botsMessagesIds || contents.config.botsMessagesIds;
  data.config.botReply = botReply;
  data.config.isRunning = isRunning;

  saveBotConfig();
  console.log('Bot setup by default', rest);
};

module.exports = { data, initConfig, saveBotConfig };

