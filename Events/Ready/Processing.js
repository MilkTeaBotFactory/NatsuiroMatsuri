// Color log settings
const logger = require("node-color-log");
logger.setDate(() => new Date().toLocaleString(undefined, {
	year:   "numeric",
	month:  "2-digit",
	day:    "2-digit",
	hour:   "2-digit",
	hour12: false,
	minute: "2-digit",
	second: "2-digit",
}).replace(/\//g, "-"));
// logger.setLevel('info');

module.exports = {
	name: "ready",
	once: true,
	execute(client) {
		client.user.setPresence(
			{
				activities: [
					{
						name: "まつりとサラ",
						type: 0
					}
				],
				status:     "idle"
			}
		);
		logger.debug(`⏳️Trying to login system with ${client.user.tag}...`);
		logger.debug("✔️Logged in success!");
		logger.info(`Logged in user:${client.user.tag}!`);
		const Guilds = client.guilds.cache.map(guild => guild.name);
		logger.info("Here's all of guilds I already join.");
		for (const guildsKey in Guilds) {
			logger.info(`・${Guilds[guildsKey]}`);
		}
	},
};