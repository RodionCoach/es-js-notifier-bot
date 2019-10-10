const botNotify = (task, command) => {
  task[String(command)]();
};

module.exports = { botNotify };
