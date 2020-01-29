const WizardScene = require('telegraf/scenes/wizard');
const cron = require('node-cron');
const {
  isAdmin, deleteMessage,
} = require('../../../functions');
const { setBotConfig, pushToBotsMessages } = require('../../../../bot_config');
const { keqboardCancel } = require('../../markup');
require('dotenv').config();

const setClearTimeScene = new WizardScene('setClearTime',
  (ctx) => {
    keqboardCancel(ctx, 'Please type cron format of Clearing time: * * * * *');

    return ctx.wizard.next();
  },
  (ctx) => {
    if (!isAdmin(ctx)) {
      return ctx.scene.leave();
    }
    const message = (ctx.message && ctx.message.text) || ''; // cancellation check
    if (!message) {
      ctx.reply('Setup has been cancelled')
        .then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.info(`Something went wrong on bot reply - ${error}`));

      return ctx.scene.leave();
    }
    deleteMessage(ctx);
    if (cron.validate(message)) {
      setBotConfig({ propertyName: 'clearTime', value: message });
      ctx.reply(`Done!\nClearing time is ${message}`)
        .then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.info(`Something went wrong on bot reply - ${error}`));

      return ctx.scene.leave();
    }
    ctx.reply('Sorry!\nBad format, try again')
      .then((res) => pushToBotsMessages(res.message_id)).catch((error) => console.info(`Something went wrong on bot reply - ${error}`));
    ctx.wizard.back(); // set the listener to the previous function

    return ctx.wizard.steps[ctx.wizard.cursor](ctx);
  });

module.exports = setClearTimeScene;
