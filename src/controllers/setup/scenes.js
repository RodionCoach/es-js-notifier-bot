const WizardScene = require('telegraf/scenes/wizard');
const botConfig = require('../../bot_config');

const setInterval = () => new WizardScene('setInterval',
  (ctx) => {
    ctx.reply('Please type the interval.\nPlease use this format 00:00');
    return ctx.wizard.next();
  },
  (ctx) => {
    console.log(ctx.message);
    if (new RegExp(process.env.TIME_REX_EXP).test(ctx.message.text)) {
      // eslint-disable-next-line prefer-template
      botConfig.period = new Date('1970-01-01T' + ctx.message + 'Z').getTime() / 1000;
      ctx.reply(`Done!\nBot occur interval is ${ctx.message}`);
      return ctx.scene.leave();
    }
    ctx.reply('Sorry! Bad format, try again fool');
    ctx.scene.enter('setInterval');
    return ctx.wizard.back();
  });

const setDate = () => new WizardScene('setDate',
  (ctx) => {
    ctx.reply('Done');
    return ctx.scene.leave();
  });

const scenes = {
  setInterval,
  setDate,
};

module.exports = scenes;

