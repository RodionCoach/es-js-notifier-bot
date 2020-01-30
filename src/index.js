const Koa = require('koa');
const koaBody = require('koa-body');
const telegraf = require('./telegram');
require('dotenv').config();

(async () => {
  const bot = await telegraf();

  if (process.env.ENV === 'prod') {
    console.info(process.env.ENV);
    bot.telegram.setWebhook(`${process.env.WEBHOOK_PATH}/${process.env.BOT_TOKEN}`);
    const app = new Koa();
    app.use(koaBody());
    app.use((ctx, next) => (ctx.url === `/${process.env.BOT_TOKEN}`
      ? bot.handleUpdate(ctx.request.body, ctx.response)
      : next()));
    app.listen(process.env.PORT);
  } else if (process.env.ENV === 'dev') {
    console.info(process.env.ENV);
    bot.launch().catch((err) => { throw new Error(err.message); });
  }
})();

