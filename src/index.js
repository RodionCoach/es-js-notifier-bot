const Koa = require('koa');
const koaBody = require('koa-body');
const bot = require('./telegram');

bot.telegram.setWebhook(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/setWebhook`);

const app = new Koa();
app.use(koaBody());
app.use((ctx, next) => (ctx.method === 'POST' || ctx.url === `/bot${process.env.BOT_TOKEN}/setWebhook`
  ? bot.handleUpdate(ctx.request.body, ctx.response)
  : next()));
app.listen(process.env.PORT || 8000);

// bot.launch().catch((err) => { throw new Error(err.message); });
