// const fs = require('fs');
const botData = require('../../bot_config');

function adminConfigurations(bot) {
  bot.on('photo', (ctx) => {
    if (ctx.message.chat.id === +process.env.ADMIN_CHAT_ID) {
      botData.imgs = ctx.message.photo;
      ctx.replyWithPhoto(botData.imgs[botData.imgs.length - 1].file_id);
    } else {
      ctx.reply('You are not admin!');
    }
  });
}

module.exports = adminConfigurations;
