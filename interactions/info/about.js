const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("about")
		.setDescription("Returns some info about this bot!"),
	async execute(interaction, client) {
		let joinEmbed = new Discord.MessageEmbed()
			.setDescription("soon:tm:")
			.setColor(client.brandColor)
			.setTimestamp();
		await interaction.reply({ embeds: [joinEmbed] });
	},
};
