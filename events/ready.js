const Discord = require("discord.js");
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
var csvWriter = require('csv-write-stream');
var memoryUsage = require('memory-usage');
const output = require('../utils/d3no.js');
const d3 = require('d3-node')().d3;
const d3nLine = require('d3node-linechart');
const Canvas = require('canvas');
Canvas.registerFont('./fonts/ginto.ttf', { family: 'sans-serif' });
const { svg2png } = require('svg-png-converter');
const ms = require('ms')
const os = require('os-utils');
const sloc = require('sloc');
const fastFolderSize = require('fast-folder-size/sync');

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
