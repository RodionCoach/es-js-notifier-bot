const WizardScene = require('telegraf/scenes/wizard');
const cron = require('node-cron');
const { isAdmin } = require('../functions/index');
const { data } = require('../../bot_config');
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
      ctx.reply('Setup has been cancelled');
      return ctx.scene.leave();
    }
    if (cron.validate(message)) {
      data.config.time = message;
      await ctx.reply(`Done!\nBot occur time is ${message}`);
      ctx.reply('Please type end of pause');
      return ctx.scene.next();
    }
    ctx.reply('Sorry! Bad format, try again');
    ctx.wizard.back(); // set the listener to the previous function
    return ctx.wizard.steps[ctx.wizard.cursor](ctx);
  },
  (ctx) => {
    if (!isAdmin(ctx)) {
      return ctx.scene.leave();
    }
    const message = (ctx.message && ctx.message.text) || ''; // cancellation check
    if (!message) {
      ctx.reply('Setup has been cancelled');
      return ctx.scene.next();
    }
    if (cron.validate(message)) {
      data.config.pauseTime = message;
      ctx.reply(`Done!\nBot occur time is ${message}`);
      return ctx.scene.leave();
    }
    ctx.reply('Sorry! Bad format, try again');
    ctx.wizard.back(); // set the listener to the previous function
    return ctx.wizard.steps[ctx.wizard.cursor](ctx);
  });

module.exports = { setTimeScene };

