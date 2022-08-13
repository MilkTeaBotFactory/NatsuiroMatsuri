// Require modules
const {Client, GatewayIntentBits} = require('discord.js');
const dotenv = require('dotenv');
const fs = require('node:fs');
const logger = require('node-color-log');
const path = require('node:path');

// Color log settings
logger.setDate(() => new Date().toLocaleString(undefined, {
	year:   'numeric',
	month:  '2-digit',
	day:    '2-digit',
	hour:   '2-digit',
	hour12: false,
	minute: '2-digit',
	second: '2-digit',
}).replace(/\//g, '-'));
logger.setLevel('info');

// Environment variables
dotenv.config();
const token = process.env.TOKEN;

// Define client
const client = new Client({intents: [GatewayIntentBits.Guilds]});

// TODO:Command Handler

// Event handler
const eventFolder = fs.readdirSync("./Events")
for (const Folder of eventFolder) {
	logger.debug(Folder)
	const eventFiles = fs.readdirSync(`./Events/${Folder}`).filter(file => file.endsWith('.js'));
	for (const Files of eventFiles) {
		const filePath = path.join("./Events", Folder, Files);
		logger.debug(filePath);
		const event = require(filePath);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
}

// Login
client.login(token).then();
