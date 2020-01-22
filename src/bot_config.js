const fs = require('fs');
const { deleteBotsMessages } = require('./controllers/functions/index');
require('dotenv').config();

const data = {
  config: {
    botId: null,
    time: null,
    pauseTime: null,
    clearTime: null,
    botReply: false,
    isRunning: false,
    botsMessages: {
      botsMessagesAmount: 10,
      botsMessagesIds: [],
      pushTo(ctx, messageId) {
        if (this.botsMessagesIds.length >= this.botsMessagesAmount) {
          deleteBotsMessages({ dataConfig: this.botsMessagesIds, ctx });
          this.botsMessagesIds.push(messageId);
          return;
        }
        this.botsMessagesIds.push(messageId);
      },
    },
  },
  imgs: {
    needAir: process.env.FILE_ID.split(', ')[0],
    needJS: process.env.FILE_ID.split(', ')[1],
  },
};

const initConfig = ({
  time = null, pauseTime = null, isRunning = false, clearTime = null, botReply = false, ...rest
}) => {
  // console.log(fs.readFile('botconfig.json'));
  data.config.time = time;
  data.config.pauseTime = pauseTime;
  data.config.clearTime = clearTime;
  data.config.botReply = (botReply === 'true' && true) || false;
  data.config.isRunning = (isRunning === 'true' && true) || false;
  console.log('Bot setup by default', rest);
  fs.writeFile('botconfig.json', JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('Data has been replaced!');
  });
};

module.exports = { data, initConfig };

