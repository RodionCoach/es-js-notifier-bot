const Koa = require('koa');
const koaBody = require('koa-body');
const bot = require('./telegram');

if (process.env.ENV === 'prod') {
  bot.telegram.setWebhook('https://es-js-notifier-bot.herokuapp.com/');

  const app = new Koa();
  app.use(koaBody());
  app.use((ctx, next) => (ctx.method === 'POST' || ctx.url === '/'
    ? bot.handleUpdate(ctx.request.body, ctx.response)
    : next()));
  bot.startWebhook('https://es-js-notifier-bot.herokuapp.com/', process.env.PORT);
  app.listen(process.env.PORT);
} else if (process.env.ENV === 'dev') {
  bot.launch().catch((err) => { throw new Error(err.message); });
}
