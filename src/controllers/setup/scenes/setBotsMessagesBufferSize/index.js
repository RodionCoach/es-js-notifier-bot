const WizardScene = require('telegraf/scenes/wizard');
const {
  isAdmin, deleteMessage, pushToBotsMessages, setBotConfig,
} = require('../../../functions/index');
const { keqboardCancel } = require('../../markup');
const { validateBufferSize } = require('../../../validation/index');
require('dotenv').config();

const setBotsMessagesBufferSizeScene = new WizardScene('setBotsMessagesBufferSize',
  (ctx) => {
    keqboardCancel(ctx, 'Please type bots messages buffer size: [1-100]');

    return ctx.wizard.next();
  },
  (ctx) => {
    if (!isAdmin(ctx)) {
      return ctx.scene.leave();
    }
    const message = (ctx.message && ctx.message.text) || ''; // cancellation check
    if (!message) {
      ctx.reply('Setup has been cancelled')
        .then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.log(`Something went wrong on bot reply - ${error}`));

      return ctx.scene.leave();
    }
    deleteMessage(ctx);
    if (validateBufferSize(message)) {
      setBotConfig({ propertyName: 'botsMessagesBufferSize', value: message });
      ctx.reply(`Done!\nMessage's Buffer Size is ${message}`)
        .then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.log(`Something went wrong on bot reply - ${error}`));

      return ctx.scene.leave();
    }
    ctx.reply('Sorry!\nBad format, try again')
      .then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.log(`Something went wrong on bot reply - ${error}`));
    ctx.wizard.back(); // set the listener to the previous function

    return ctx.wizard.steps[ctx.wizard.cursor](ctx);
  });

module.exports = setBotsMessagesBufferSizeScene;
