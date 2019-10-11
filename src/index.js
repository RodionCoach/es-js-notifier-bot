const Koa = require('koa');
const koaBody = require('koa-body');
const bot = require('./telegram');

if (process.env.ENV === 'prod') {
  bot.telegram.setWebhook(process.env.WEBHOOK_PATH);
  const app = new Koa();
  app.use(koaBody());
  app.use((ctx, next) => (ctx.method === 'POST' || ctx.url === '/'
    ? bot.handleUpdate(ctx.request.body, ctx.response)
    : next()));
  app.listen(process.env.PORT);
  bot.telegram.startWebhook(process.env.WEBHOOK_PATH);
} else if (process.env.ENV === 'dev') {
  bot.launch().catch((err) => { throw new Error(err.message); });
}
