const { data } = require('../../../bot_config');

const sendPhoto = async ({ photoId, ctx }) => {
  const result = await ctx.replyWithPhoto(photoId);
  data.config.botsMessages.pushTo(ctx, result.message_id);
};

module.exports = sendPhoto;
