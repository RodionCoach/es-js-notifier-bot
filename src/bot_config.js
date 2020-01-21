require('dotenv').config();

const data = {
  config: {
    botId: null,
    time: null,
    pauseTime: null,
    clearTime: null,
    botReply: false,
    isRunning: false,
    botMessagesId: [],
  },
  imgs: {
    needAir: process.env.FILE_ID.split(', ')[0],
    needJS: process.env.FILE_ID.split(', ')[1],
  },
};

const initConfig = ({
  time = null, pauseTime = null, isRunning = false, clearTime = null, botReply = false, ...rest
}) => {
  data.config.time = time;
  data.config.pauseTime = pauseTime;
  data.config.clearTime = clearTime;
  data.config.botReply = (botReply === 'true' && true) || false;
  data.config.isRunning = (isRunning === 'true' && true) || false;
  console.log('Bot setup by default', rest);
};

module.exports = { data, initConfig };

