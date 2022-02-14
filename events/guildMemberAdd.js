const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = async member => {
	// find the welcome channel in the cache, if not found find the general channel, if not found find the system channel,
	let welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome');
	if (!welcomeChannel) {
		welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'general');
		if (!welcomeChannel) {
			welcomeChannel = member.guild.channels.cache.get(member.guild.systemChannelID);
		}
	}

	// create a new canvas, this is where the welcome image will be drawn
	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	// load the fonts in the fonts folder

	// main font for stuypulse website
	Canvas.registerFont('./fonts/avenir.otf', { family: 'Avenir' })
	// main font in stuypulse logo
	Canvas.registerFont('./fonts/futura.ttf', { family: 'Futura' })

}
