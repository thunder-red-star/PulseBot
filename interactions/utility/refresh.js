const { SlashCommandBuilder } = require("@discordjs/builders");
const { deployGuild } = require("../../deploy.js");
const confirmEmbed = require("../../utils/confirm.js");
const Discord = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("refresh")
		.setDescription(
			"Refreshes the list of slash commands that your server can use."
		),
	async execute(interaction, client) {
		if (!interaction.member.permissions.has("MANAGE_SERVER"))
			return interaction.reply(
				"You don't have permission to use that command."
			);
		let commandsList = client.commandsList;
		let commands = "";
		commandsList.forEach((command) => {
			commands +=
				"`/" + command["name"] + "`: " + command["description"] + "\n";
		});
		let update = await confirmEmbed(
			interaction,
			"Refresh Slash Commands",
			"Do you want to refresh the slash commands for this server? The following slash commands will be refreshed and/or added:\n" +
				commands,
			"Successfully deployed slash commands to the server!",
			"Canceled deploying slash commands to the server."
		);
		if (update) {
			deployGuild(commandsList, interaction.guild);
		}
	},
};
