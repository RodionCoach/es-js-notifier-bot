const initConfig = (ctx, time, isRunning, ...rest) => {
  ctx.config.time = time;
  ctx.config.isRunning = (isRunning === 'true' && true) || false;
  console.log(rest);
};

module.exports = { initConfig };

