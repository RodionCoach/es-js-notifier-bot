const Markup = require('telegraf/markup');
// const Extra = require('telegraf/extra');

const keqboardChoice = (ctx, message) => {
  ctx.reply(message, Markup.inlineKeyboard([
    Markup.callbackButton('Set Time', 'setTime'),
  ]).extra());
};

const keqboardCancel = (ctx, message) => {
  ctx.reply(message, Markup.inlineKeyboard([
    Markup.callbackButton('Cancel', 'cancellation'),
  ]).extra());
};

module.exports = { keqboardChoice, keqboardCancel };

