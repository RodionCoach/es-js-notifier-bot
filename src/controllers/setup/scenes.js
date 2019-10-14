const WizardScene = require('telegraf/scenes/wizard');
const { keqboardCancel, keqboardModes } = require('./markup');
const { data } = require('../../bot_config');
require('dotenv').config();

const regExp = new RegExp(process.env.REG_EXP);

const setInterval = () => new WizardScene('setInterval',
  (ctx) => {
    keqboardCancel(ctx, 'Please type the interval.\nPlease use this format hh:mm\n\nor press "Cancel"');
    return ctx.wizard.next();
  },
  async (ctx) => {
    const message = (ctx.message && ctx.message.text) || '';
    if (regExp.test(message)) {
      data.config.interval = message;
      ctx.reply(`Done!\nBot occur interval is ${message}`);
      return ctx.scene.leave();
    // eslint-disable-next-line no-else-return
    } else if (message === '') {
      await ctx.reply('Action has been cancelled!');
      return ctx.scene.leave();
    } else {
      await ctx.reply('Sorry! Bad format, try again, you fool');
      return ctx.wizard.back();
    }
  });

const setTime = () => new WizardScene('setTime',
  (ctx) => {
    keqboardCancel(ctx, 'Please type the occur time.\nPlease use this format hh:mm\n\nor press "Cancel"');
    return ctx.wizard.next();
  },
  async (ctx) => {
    const message = (ctx.message && ctx.message.text) || '';
    if (regExp.test(message)) {
      data.config.time = message;
      await ctx.reply(`Done!\nBot occur time is ${message}`);
      return ctx.scene.leave();
    // eslint-disable-next-line no-else-return
    } else if (message === '') {
      await ctx.reply('Action has been cancelled!');
      return ctx.scene.leave();
    } else {
      await ctx.reply('Sorry! Bad format, try again, you fool');
      return ctx.wizard.back();
    }
  });

const setMode = () => new WizardScene('setMode',
  (ctx) => {
    keqboardModes(ctx, 'Please type the bot mode.\nPlease type "interval" or "time"\n\nor press "Cancel"');
    return ctx.wizard.next();
  },
  (ctx) => {
    const message = (ctx.message && ctx.message.text) || '';
    if (message === '') {
      ctx.reply('Action has been cancelled!');
      return ctx.scene.leave();
    }
    ctx.reply(`Done!\nBot mode now is ${data.config.mode}`);
    return ctx.scene.leave();
  });

module.exports = { setInterval, setTime, setMode };

