// const fs = require('fs');

const adminConfigurations = (bot) => {
  bot.on('photo', (ctx) => {
    if (ctx.message.chat.id === +process.env.ADMIN_CHAT_ID) {
      ctx.imgs = ctx.message.photo;
      ctx.replyWithPhoto(ctx.imgs[ctx.imgs.length - 1].file_id);
    } else {
      ctx.reply('You are not admin!');
    }
  });
};

const deleteMessage = async (ctx) => {
  await ctx.deleteMessage(ctx.message.message_id);
};

const isAdmin = (ctx) => process.env.ADMIN_CHAT_ID.includes(`${ctx.from.id}`);

module.exports = { adminConfigurations, deleteMessage, isAdmin };
