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
				"You can invite this bot but it doesn't do much yet. Check my profile!"
			)
			.setColor(client.brandColor);
		await interaction.reply({ embeds: [inviteEmbed] });
	},
};
