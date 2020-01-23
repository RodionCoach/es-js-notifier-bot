const { pushToBotsMessages } = require('../../functions/index');

const sendPhoto = async ({ photoId, ctx }) => {
  const result = await ctx.replyWithPhoto(photoId);
  pushToBotsMessages(result.message_id);
};

module.exports = sendPhoto;
