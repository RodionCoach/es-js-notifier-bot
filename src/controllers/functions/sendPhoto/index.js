const { data, pushToBotsMessages } = require('../../../bot_config');

const sendPhoto = ({ photoId, ctx = null, telegram = null }) => {
  if (ctx !== null) {
    ctx.replyWithPhoto(photoId)
      .then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.log(`Something went wrong on bot reply - ${error}`));
  } else {
    telegram.sendPhoto(data.config.currentChatId, photoId);
  }
};

module.exports = sendPhoto;
