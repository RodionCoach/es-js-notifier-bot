// const fs = require('fs');
const botConfig = require('../../bot_config');

const adminConfigurations = (bot) => {
  bot.on('photo', (ctx) => {
    if (ctx.message.chat.id === +process.env.ADMIN_CHAT_ID) {
      botConfig.imgs = ctx.message.photo;
      ctx.replyWithPhoto(botConfig.imgs[botConfig.imgs.length - 1].file_id);
    } else {
      ctx.reply('You are not admin!');
    }
  });
};

module.exports = adminConfigurations;
