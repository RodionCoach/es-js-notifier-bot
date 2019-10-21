const isAdmin = (ctx) => process.env.ADMIN_CHAT_ID.includes(`${ctx.from.id}`);

module.exports = isAdmin;
