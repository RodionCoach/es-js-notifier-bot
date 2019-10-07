const bot_data = require('../../bot_config');
const fs = require('fs');

function adminConfigurations(bot) {
  bot.on('photo', (ctx) => {  
    if(ctx.message.chat.id === +process.env.ADMIN_CHAT_ID){
      bot_data.imgs = ctx.message.photo;
      ctx.replyWithPhoto(bot_data.imgs[bot_data.imgs.length-1].file_id);
    }else{
      ctx.reply('You are not admin!');
    };
  });
};

module.exports = adminConfigurations;