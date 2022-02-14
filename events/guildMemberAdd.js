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
	const canvas = Canvas.createCanvas(500, 500);
	const ctx = canvas.getContext('2d');

	// load the fonts in the fonts folder

	// main font for stuypulse website
	Canvas.registerFont('./fonts/avenir.otf', { family: 'Avenir' })
	// main font in stuypulse logo
	Canvas.registerFont('./fonts/futura.ttf', { family: 'Futura' })

	// load the StuyPulse battery shell from the assets folder
	const battery = await Canvas.loadImage('./assets/battery.png');

	// draw the battery shell onto the canvas, it should take up the entire canvas
	ctx.drawImage(battery, 0, 0, canvas.width, canvas.height);

	// set the font to Avenir in red, size 30, and give it center text alignment
	ctx.font = '30px Avenir';
	ctx.textAlign = 'center';
	ctx.fillStyle = '#ff0000';

	// write the welcome message to the canvas
	ctx.fillText('Welcome to ' + member.guild.name + ", " + member.user.username + "!", canvas.width / 2, 250);

	// at y = 400, write how many members we have, but write the number of members in the Futura font instead of the Avenir font
	ctx.font = '40px Futura';
	ctx.fillText(member.guild.memberCount, canvas.width / 2, 400);
	ctx.font = '30px Avenir';
	ctx.fillText("members", canvas.width / 2, 440);

	// get the user's avatar and draw it to the canvas
	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));

	// draw the avatar to the canvas centered horizontally and between 250 and 400 pixels vertically, with a size of 100x100
	ctx.drawImage(avatar, canvas.width / 2 - 50, 250, 100, 100);

	// create a new attachment from the canvas
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome.png');

	// send the attachment to the welcome channel
	welcomeChannel.send(attachment);
}