const fs = require('fs');
require('dotenv').config();

const data = {
  config: {
    botId: null,
    time: null,
    pauseTime: null,
    clearTime: null,
    botReply: false,
    isRunning: false,
    botsMessagesAmount: 100,
    botMessagesPointer: 0,
    botsMessagesIds: [],
  },
  imgs: {
    needAir: process.env.FILE_ID.split(', ')[0],
    needJS: process.env.FILE_ID.split(', ')[1],
  },
};

const initConfig = ({
  time = null, pauseTime = null, isRunning = false, clearTime = null, botReply = false, ...rest
}) => {
  try {
    const contents = JSON.parse(fs.readFileSync('botconfig.json', 'utf8'));
    console.log(contents);
  } catch (error) {
    console.log(`Error file reading - ${error}`);
  }
  data.config.time = time;
  data.config.pauseTime = pauseTime;
  data.config.clearTime = clearTime;
  data.config.botReply = (botReply === 'true' && true) || false;
  data.config.isRunning = (isRunning === 'true' && true) || false;
  console.log('Bot setup by default', rest);
};

const writeConfig = () => {
  try {
    fs.writeFile('botconfig.json', JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log('Configs data has been replaced!');
    });
  } catch (error) {
    console.log(`Error file writing - ${error}`);
  }
};

module.exports = { data, initConfig, writeConfig };

