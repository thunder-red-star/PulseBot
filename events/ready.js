const Discord = require("discord.js");
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

module.exports = (client) => {
	client.user.setActivity(
		"and defending " + client.guilds.cache.size + " guilds.",
		{ type: "WATCHING" }
	);
	setInterval(() => {
		client.user.setActivity(
			"slash commands in " + client.guilds.cache.size + " guilds.",
			{ type: "WATCHING" }
		);
	}, 15000);
};
