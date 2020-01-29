const fs = require('fs');
require('dotenv').config();

const data = {
  config: {
    botId: null,
    currentChatId: null,
    time: null,
    pauseTime: null,
    clearTime: null,
    botReply: null,
    isRunning: null,
    runningByDefault: null,
    botsMessagesBufferSize: null,
    botMessagesPointer: null,
    botsMessagesIds: null,
  },
  imgs: {
    needAir: process.env.FILE_ID.split(', ')[0],
    needJS: process.env.FILE_ID.split(', ')[1],
  },
  tasksPool: null,
};

const saveBotConfig = () => {
  try {
    fs.writeFileSync('botconfig.json', JSON.stringify({ ...data, tasksPool: {} }));
    console.info(`Config's data has been replaced! - [${new Date()}]`);
  } catch (error) {
    console.info(`Error file writing - ${error}`);
  }
};

const readBotConfig = () => {
  try {
    const botConfig = JSON.parse(fs.readFileSync('botconfig.json', 'utf8'));

    return botConfig;
  } catch (error) {
    console.info(`Error file reading - ${error}`);

    return data;
  }
};

const initConfig = ({
  botId = null,
  currentChatId = null,
  time = null,
  pauseTime = null,
  isRunning = null,
  runningByDefault = null,
  botsMessagesBufferSize = null,
  botMessagesPointer = 0,
  botsMessagesIds = null,
  clearTime = null,
  botReply = false,
  tasksPool = null,
  ...rest
}) => {
  const contents = readBotConfig();

  data.config.botId = botId;
  data.config.currentChatId = process.env.BOT_WORKING_CHAT_ID || currentChatId || contents.config.currentChatId;
  data.config.time = time || contents.config.time || process.env.BOT_OCCUR_TIME;
  data.config.pauseTime = pauseTime || contents.config.pauseTime || process.env.BOT_PAUSE_TIME;
  data.config.clearTime = clearTime || contents.config.clearTime || process.env.BOT_CLEAR_TIME;
  data.config.botsMessagesBufferSize = botsMessagesBufferSize || contents.config.botsMessagesBufferSize || process.env.BOT_MESSAGES_AMOUNT;
  data.config.botMessagesPointer = botMessagesPointer !== null ? botMessagesPointer : contents.config.botMessagesPointer;
  data.config.botsMessagesIds = botsMessagesIds || contents.config.botsMessagesIds || [];
  data.config.botReply = botReply || contents.config.botReply || false;
  data.config.isRunning = isRunning || contents.config.isRunning || false;
  data.config.runningByDefault = runningByDefault || contents.config.runningByDefault || false;
  data.tasksPool = tasksPool || {};

  saveBotConfig();
  console.info('Bot setup by default', rest);
};

const setBotConfig = ({ params = null, propertyName = '', value = null }) => {
  if (value === null) {
    saveBotConfig();
    return;
  }

  if (typeof value === 'function') {
    value(params);
    saveBotConfig();

    return;
  }

  if (propertyName === 'multiply') {
    for (const i in value) {
      if (i in value) {
        data.config[i] = value[i];
      }
    }

    return;
  }

  if (data.config[propertyName] === value) return;

  data.config[propertyName] = value;
  saveBotConfig();
};

const pushToBotsMessages = (messageId) => {
  if (data.config.botsMessagesIds.length - 1 === data.config.botsMessagesBufferSize) {
    if (data.config.botsMessagesIds.length - 1 === data.config.botMessagesPointer) {
      setBotConfig({ propertyName: 'botMessagesPointer', value: 0 });
    }

    setBotConfig({ value: () => { data.config.botsMessagesIds[data.config.botMessagesPointer] = messageId; } });
    setBotConfig({ propertyName: 'botMessagesPointer', value: data.config.botMessagesPointer + 1 });

    return;
  }

  data.config.botsMessagesIds.push(messageId);
  setBotConfig({});
};

module.exports = {
  data,
  initConfig,
  saveBotConfig,
  readBotConfig,
  setBotConfig,
  pushToBotsMessages,
};

