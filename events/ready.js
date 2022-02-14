const Discord = require("discord.js");
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const ms = require('ms')

const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function bytesToSize(bytes) {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Bytes';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

module.exports = async (client) => {
    console.log("Logged in as " + client.user.tag)
	client.user.setActivity(
		"slash commands in " + client.guilds.cache.size + " guilds.",
		{ type: "WATCHING" }
	);

	setInterval(() => {
		client.user.setActivity(
			"slash commands in " + client.guilds.cache.size + " guilds.",
			{ type: "WATCHING" }
		);
	}, 15000);
};
