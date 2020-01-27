const Markup = require('telegraf/markup');
const { pushToBotsMessages } = require('../functions/index');
// const Extra = require('telegraf/extra');

const keqboardChoice = (ctx, message) => ctx.reply(message, Markup.inlineKeyboard([
  [
    Markup.callbackButton('Set Time', 'setTime'),
    Markup.callbackButton('Set Pause Time', 'setPauseTime'),
  ], [
    Markup.callbackButton('Set Clearing Time', 'setClearTime'),
    Markup.callbackButton('Set Buffer Size', 'setBotsMessagesBufferSize'),
  ],
]).resize().extra()).then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.log(`Something went wrong on bot reply - ${error}`));

const keqboardCancel = (ctx, message) => ctx.reply(message, Markup.inlineKeyboard([
  Markup.callbackButton('Cancel', 'cancellation'),
]).extra()).then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.log(`Something went wrong on bot reply - ${error}`));

module.exports = { keqboardChoice, keqboardCancel };

