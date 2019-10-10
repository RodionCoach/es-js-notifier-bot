const WizardScene = require('telegraf/scenes/wizard');
const { keqboardCancel } = require('./markup');
const { data } = require('../../bot_config');

const timeRegExp = new RegExp(process.env.TIME_REX_EXP);
const modeRegExp = new RegExp(process.env.MODE_REX_EXP);

const setInterval = () => new WizardScene('setInterval',
  (ctx) => {
    keqboardCancel(ctx, 'Please type the interval.\nPlease use this format 00:00\n\nor press "Cancel"');
    return ctx.wizard.next();
  },
  async (ctx) => {
    const message = ctx.message.text;
    if (timeRegExp.test(message)) {
      data.config.period = new Date(`1970-01-01T${message}Z`).getTime() / 1000;
      ctx.reply(`Done!\nBot occur interval is ${message}`);
      return ctx.scene.leave();
    }
    await ctx.reply('Sorry! Bad format, try again, you fool');
    return ctx.wizard.back();
  });

const setTime = () => new WizardScene('setTime',
  (ctx) => {
    keqboardCancel(ctx, 'Please type the occur time.\nPlease use this format 00:00\n\nor press "Cancel"');
    return ctx.wizard.next();
  },
  async (ctx) => {
    const message = ctx.message.text;
    if (timeRegExp.test(message)) {
      data.config.time = message;
      ctx.reply(`Done!\nBot occur time is ${message}`);
      return ctx.scene.leave();
    }
    await ctx.reply('Sorry! Bad format, try again, you fool');
    return ctx.wizard.back();
  });

const setMode = () => new WizardScene('setMode',
  (ctx) => {
    keqboardCancel(ctx, 'Please type the bot mode.\nPlease type "interval" or "time"\n\nor press "Cancel"');
    return ctx.wizard.next();
  },
  async (ctx) => {
    const message = ctx.message.text;
    if (modeRegExp.test(message)) {
      data.config.mode = message;
      ctx.reply(`Done!\nBot mode now is ${message}`);
      return ctx.scene.leave();
    }
    await ctx.reply('Sorry! Bad format, try again, you fool');
    return ctx.wizard.back();
  });

module.exports = { setInterval, setTime, setMode };

