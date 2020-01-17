const deleteMessage = async (ctx) => {
  await ctx.deleteMessage(ctx.message.message_id);
};

module.exports = deleteMessage;
