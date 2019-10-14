const Scene = require('telegraf/scenes/base');
// const { keqboardCancel } = require('./markup');
// const { data } = require('../../bot_config');
require('dotenv').config();

// const regExp = new RegExp(process.env.REG_EXP);

const setTime = new Scene('setTime');

// (ctx) => {
//   keqboardCancel(ctx, 'Please type the occur time.\nPlease use this format hh:mm\n\nor press "Cancel"');
//   return ctx.wizard.next();
// },
// async (ctx) => {
//   const message = (ctx.message && ctx.message.text) || '';
//   if (regExp.test(message)) {
//     data.config.time = message;
//     await ctx.reply(`Done!\nBot occur time is ${message}`);
//     return ctx.scene.leave();
//   // eslint-disable-next-line no-else-return
//   } else if (message === '') {
//     await ctx.reply('Action has been cancelled!');
//     return ctx.scene.leave();
//   } else {
//     await ctx.reply('Sorry! Bad format, try again, you fool');
//     return ctx.wizard.back();
//   }
// });

module.exports = { setInterval, setTime };

