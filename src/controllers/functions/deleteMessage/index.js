const deleteMessage = async (ctx) => {
  try {
    await ctx.deleteMessage(ctx.message.message_id);
  } catch (error) {
    console.info(`Something went wrong, can't delete your message including bot command - ${error}`);
  }
  return true;
};

module.exports = deleteMessage;
