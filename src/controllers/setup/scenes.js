const WizardScene = require('telegraf/scenes/wizard');
const cron = require('node-cron');
const {
  isAdmin, deleteMessage, pushToBotsMessages, setBotConfig,
} = require('../functions/index');
const { validateBufferSize } = require('../validation/index');
const { keqboardCancel } = require('./markup');
require('dotenv').config();

const setTimeScene = new WizardScene('setTime',
  (ctx) => {
    keqboardCancel(ctx, 'Please type cron format time: * * * * *');

    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!isAdmin(ctx)) {
      return ctx.scene.leave();
    }
    const message = (ctx.message && ctx.message.text) || ''; // cancellation check
    if (!message) {
      ctx.reply('Setup has been cancelled').then((res) => pushToBotsMessages(res.message_id));

      return ctx.scene.leave();
    }
    deleteMessage(ctx);
    if (cron.validate(message)) {
      setBotConfig({ propertyName: 'time', value: message });
      await ctx.reply(`Done!\nBot occur time is ${message}`).then((res) => pushToBotsMessages(res.message_id));

      return ctx.scene.leave();
    }
    ctx.reply('Sorry!\nBad format, try again').then((res) => pushToBotsMessages(res.message_id));
    ctx.wizard.back(); // set the listener to the previous function

    return ctx.wizard.steps[ctx.wizard.cursor](ctx);
  });

const setPauseTimeScene = new WizardScene('setPauseTime',
  (ctx) => {
    keqboardCancel(ctx, 'Please type cron format pause time: * * * * *');
    return ctx.wizard.next();
  },
  (ctx) => {
    if (!isAdmin(ctx)) {
      return ctx.scene.leave();
    }
    const message = (ctx.message && ctx.message.text) || ''; // cancellation check
    if (!message) {
      ctx.reply('Setup has been cancelled').then((res) => pushToBotsMessages(res.message_id));

      return ctx.scene.leave();
    }
    deleteMessage(ctx);
    if (cron.validate(message)) {
      setBotConfig({ propertyName: 'pauseTime', value: message });
      ctx.reply(`Done!\nPause time is ${message}`).then((res) => pushToBotsMessages(res.message_id));

      return ctx.scene.leave();
    }
    ctx.reply('Sorry!\nBad format, try again').then((res) => pushToBotsMessages(res.message_id));
    ctx.wizard.back(); // set the listener to the previous function

    return ctx.wizard.steps[ctx.wizard.cursor](ctx);
  });

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
      ctx.reply('Setup has been cancelled').then((res) => pushToBotsMessages(res.message_id));

      return ctx.scene.leave();
    }
    deleteMessage(ctx);
    if (cron.validate(message)) {
      setBotConfig({ propertyName: 'clearTime', value: message });
      ctx.reply(`Done!\nClearing time is ${message}`).then((res) => pushToBotsMessages(res.message_id));

      return ctx.scene.leave();
    }
    ctx.reply('Sorry!\nBad format, try again').then((res) => pushToBotsMessages(res.message_id));
    ctx.wizard.back(); // set the listener to the previous function

    return ctx.wizard.steps[ctx.wizard.cursor](ctx);
  });

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
      ctx.reply('Setup has been cancelled').then((res) => pushToBotsMessages(res.message_id));

      return ctx.scene.leave();
    }
    deleteMessage(ctx);
    if (validateBufferSize()) {
      setBotConfig({ propertyName: 'botsMessagesBufferSize', value: message });
      ctx.reply(`Done!\nPause time is ${message}`).then((res) => pushToBotsMessages(res.message_id));

      return ctx.scene.leave();
    }
    ctx.reply('Sorry!\nBad format, try again').then((res) => pushToBotsMessages(res.message_id));
    ctx.wizard.back(); // set the listener to the previous function

    return ctx.wizard.steps[ctx.wizard.cursor](ctx);
  });

module.exports = {
  setTimeScene, setPauseTimeScene, setClearTimeScene, setBotsMessagesBufferSizeScene,
};

