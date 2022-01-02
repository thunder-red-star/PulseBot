const Discord = require("discord.js");

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("invite")
		.setDescription("Returns some invite links for the bot."),
	async execute(interaction, client) {
		let inviteEmbed = new Discord.MessageEmbed()
			.setTitle("Invite")
			.setDescription(
				"This bot isn't gonna be useful for you yet, so no invite. And even if you do invite it, I will make it leave the server. Invite the actual bot which will hopefully have this bot's commands later on."
			)
			.setColor(client.brandColor);
		await interaction.reply({ embeds: [inviteEmbed] });
	},
};
