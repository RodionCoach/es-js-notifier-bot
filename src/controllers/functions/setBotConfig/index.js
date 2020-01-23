const { data, saveBotConfig } = require('../../../bot_config');

const setBotConfig = async ({ params = null, propertyName = '', value = null }) => {
  if (typeof value === 'function') {
    value(params);
    saveBotConfig();
    return;
  }

  data.config[propertyName] = value;
  saveBotConfig();
};

module.exports = setBotConfig;
