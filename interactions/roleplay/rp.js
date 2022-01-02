const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("rp")
		.setDescription(
			"Roleplay a specific person's discord account. For now, this is only directly accessible through slash commands."
		),
	async execute(interaction, client) {
		return interaction.reply(
			"Pong! 🏓\nLatency: `" +
				(Date.now() - interaction.createdTimestamp) +
				"`\nAPI: `" +
				client.ws.ping +
				"`"
		);
	},
};
