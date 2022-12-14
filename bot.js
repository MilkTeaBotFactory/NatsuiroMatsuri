// Require modules
const {Client, GatewayIntentBits} = require("discord.js");
const dotenv = require("dotenv");
const fs = require("node:fs");
const logger = require("node-color-log");

// Color log settings
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

// Environment variables
dotenv.config();
const token = process.env.TOKEN;

// Define client
const client = new Client(
	{
		intents:
			[
				GatewayIntentBits.Guilds
			]
	}
);
/*
// Command handler
const commandFolder = fs.readdirSync("./Commands");
for (const Folder of commandFolder) {
	const commandFiles = fs.readdirSync(`./Commands/${Folder}`).filter((file) => file.endsWith(".js"));
	for (const Files of commandFiles) {
		const event = require(`./Commands/${Folder}/${Files}`);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		}
		else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
}
*/
// Event handler
const eventFolder = fs.readdirSync("./Events");
for (const Folder of eventFolder) {
	const eventFiles = fs.readdirSync(`./Events/${Folder}`).filter((file) => file.endsWith(".js"));
	for (const Files of eventFiles) {
		const event = require(`./Events/${Folder}/${Files}`);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		}
		else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
}

// Login
client.login(token).then();
