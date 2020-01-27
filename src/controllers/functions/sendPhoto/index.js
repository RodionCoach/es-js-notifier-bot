const { pushToBotsMessages } = require('../pushToBotsMessages');

const sendPhoto = ({ photoId, ctx }) => ctx.replyWithPhoto(photoId)
  .then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.log(`Something went wrong on bot reply - ${error}`));

module.exports = sendPhoto;
