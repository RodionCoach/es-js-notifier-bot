const Markup = require('telegraf/markup');
// const Extra = require('telegraf/extra');

const keqboardChoice = (ctx, message) => {
  ctx.reply(message, Markup.inlineKeyboard([
    Markup.callbackButton('Set Interval', 'setInterval'),
    Markup.callbackButton('Set Time', 'setTime'),
    Markup.callbackButton('Set Mode', 'setMode'),
  ]).extra());
};

const keqboardCancel = (ctx, message) => {
  ctx.reply(message, Markup.inlineKeyboard([
    Markup.callbackButton('Cancel', 'cancellation'),
  ]).extra());
};

const keqboardModes = (ctx, message) => {
  ctx.reply(message, Markup.inlineKeyboard([
    Markup.callbackButton('Interval', 'setModeInterval'),
    Markup.callbackButton('Time', 'setModeTime'),
    Markup.callbackButton('Cancel', 'cancellation'),
  ]).extra());
};

module.exports = { keqboardChoice, keqboardCancel, keqboardModes };

