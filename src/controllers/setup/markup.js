const Markup = require('telegraf/markup');
// const Extra = require('telegraf/extra');

const keqboardChoice = (ctx, message) => ctx.reply(message, Markup.inlineKeyboard([
  [
    Markup.callbackButton('Set Time', 'setTime'),
    Markup.callbackButton('Set Pause Time', 'setPauseTime'),
  ], [
    Markup.callbackButton('Set Clearing Time', 'setClearTime'),
    Markup.callbackButton('Set Buffer Size', 'setBotsMessagesBufferSize'),
  ],
]).resize().extra());

const keqboardCancel = (ctx, message) => ctx.reply(message, Markup.inlineKeyboard([
  Markup.callbackButton('Cancel', 'cancellation'),
]).extra());

module.exports = { keqboardChoice, keqboardCancel };

