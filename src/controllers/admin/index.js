// const fs = require('fs');
const { data } = require('../../bot_config');

const adminConfigurations = (bot) => {
  bot.on('photo', (ctx) => {
    if (ctx.message.chat.id === +process.env.ADMIN_CHAT_ID) {
      data.imgs = ctx.message.photo;
      ctx.replyWithPhoto(data.imgs[data.imgs.length - 1].file_id);
    } else {
      ctx.reply('You are not admin!');
    }
  });
};

const isAdmin = (ctx) => process.env.ADMIN_CHAT_ID.includes(`${ctx.from.id}`);

module.exports = { adminConfigurations, isAdmin };
