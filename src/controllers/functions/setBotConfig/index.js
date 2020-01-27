const { data, saveBotConfig } = require('../../../bot_config');

const setBotConfig = ({ params = null, propertyName = '', value = null }) => {
  if (typeof value === 'function') {
    value(params);
    saveBotConfig();

    return;
  }

  if (propertyName === 'multiply') {
    for (const i in value) {
      if (i in value) {
        data.config[i] = value[i];
      }
    }

    return;
  }

  if (data.config[propertyName] === value) return;

  data.config[propertyName] = value;
  saveBotConfig();
};

module.exports = setBotConfig;
