const Koa = require('koa');
const koaBody = require('koa-body');
const bot = require('./telegram');

if (process.env.ENV === 'prod') {
  bot.launch().catch((err) => { throw new Error(err.message); });

  const app = new Koa();
  app.use(koaBody());
  app.use((ctx, next) => (ctx.method === 'POST' || ctx.url === '/'
    ? bot.handleUpdate(ctx.request.body, ctx.response)
    : next()));
  app.listen(process.env.PORT);
} else if (process.env.ENV === 'dev') {
  bot.launch().catch((err) => { throw new Error(err.message); });
}
