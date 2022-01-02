const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Ping pong! Returns API ping and latency as well."),
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
