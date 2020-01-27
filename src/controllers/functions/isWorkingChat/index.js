const isWorkingChat = (ctx) => +process.env.BOT_WORKING_CHAT_ID === ctx.message.chat.id;

module.exports = isWorkingChat;
