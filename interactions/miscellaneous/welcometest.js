const { SlashCommandBuilder } = require("@discordjs/builders");
const Builders = require('@discordjs/builders');

const Discord = require("discord.js");
const Canvas = require('canvas')
module.exports = {
	data: new SlashCommandBuilder()
		.setName("welcometest")
		.setDescription("Tests the welcome image generator without needing anyone to join.")
		.addStringOption(
			new Builders.SlashCommandStringOption()
				.setName('id')
				.setDescription('Someone to "welcome".')
		)
		.addStringOption(
			new Builders.SlashCommandStringOption()
				.setName('servername')
				.setDescription('A server name to use in place of the current one.')
		)
		.addIntegerOption(
			new Builders.SlashCommandIntegerOption()
				.setName('membercount')
				.setDescription('A member count to use in place of the actual one.')
		),
	async execute(interaction, client) {
		let Id = interaction.options.getString('id')
		let MemberCount = interaction.options.getInteger('membercount')
		let ServerName = interaction.options.getString('servername')
		if (Id == null || Id == undefined) {
			Id = 1
		}
		if (MemberCount == null || MemberCount == undefined) {
			MemberCount = interaction.guild.memberCount
		}
		if (ServerName == null || ServerName == undefined) {
			ServerName = interaction.guild.name
		}
		let fetchedMember = interaction.member
		try {
			fetchedMember = await client.users.fetch(Id)
		}
		catch {
			fetchedMember = interaction.user
		}
		let member = fetchedMember || interaction.user
		// find the welcome channel in the cache, if not found find the general channel, if not found find the system channel,
		let welcomeChannel = interaction.guild.channels.cache.find(channel => channel.name === 'welcome');
		if (!welcomeChannel) {
			welcomeChannel = interaction.guild.channels.cache.find(channel => channel.name === 'general');
			if (!welcomeChannel) {
				welcomeChannel = interaction.guild.channels.cache.get(interaction.guild.systemChannelId);
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
		ctx.font = '24px Avenir';
		ctx.textAlign = 'center';
		ctx.fillStyle = '#ff0000';

		// write the welcome message to the canvas
		ctx.fillText('Welcome to ' + ServerName + ",", canvas.width / 2, 230);

		ctx.font = '40px Futura';
		ctx.fillText(member.username + "!", canvas.width / 2, 265);

		// at y = 400, write how many members we have, but write the number of members in the Futura font instead of the Avenir font
		ctx.font = '40px Futura';
		ctx.fillText(MemberCount, canvas.width / 2, 415);
		ctx.font = '24px Avenir';
		ctx.fillText("members", canvas.width / 2, 440);

		// get the user's avatar and draw it to the canvas
		const avatar = await Canvas.loadImage(member.displayAvatarURL({ format: 'png' }));

		// clip the avatar to a circle and create a circle border around the avatar with a width of 3 pixels
		ctx.beginPath();
		ctx.arc(canvas.width / 2, 325, 50, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();

		// draw the avatar to the canvas centered horizontally and between 250 and 400 pixels vertically, with a size of 100x100, and with a circular border
		ctx.drawImage(avatar, canvas.width / 2 - 50, 275, 100, 100);


		ctx.lineWidth = 3;
		ctx.strokeStyle = '#ff0000';
		ctx.beginPath();
		ctx.arc(canvas.width / 2, 325, 50, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.stroke();

		// create a new attachment from the canvas
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome.png');

		// create an embed with the attachment and send it to the welcome channel
		const embed = new Discord.MessageEmbed()
			.setColor('#ff0000')
			.setTitle('Welcome to ' + ServerName + '!')
			.setDescription('Welcome to ' + ServerName + ", " + member.username + '!')
			.setImage('attachment://welcome.png')
			.setTimestamp()
			.setFooter('StuyPulse', 'https://i.imgur.com/Q0QYQ8l.png');

		welcomeChannel.send({ embeds: [embed], files: [attachment] });
		await interaction.reply({ content: "done!" })
	},
};
