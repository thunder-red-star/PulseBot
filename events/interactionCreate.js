const Discord = require("discord.js"),
	fs = require("fs"),
	humanizeDuration = require("humanize-duration"),
	cooldowns = new Discord.Collection(),
	Axios = require("axios"),
	config = require("../config/config.json"),
	chalk = require("chalk");

function randomElement(array) {
	return array[Math.floor(Math.random() * array.length)];
}

module.exports = async (interaction) => {
	console.log(interaction);
	console.log("An interaction was used...");
	let client = interaction.client;

	if (!interaction.isCommand()) return;

	const command = client.interactions.get(interaction.commandName);

	if (!command) return;
	const options = interaction.options;
	try {
		await command.execute(interaction, client, options);
	} catch (error) {
		console.error(error);
		await interaction.reply({
			content: "There was an error while executing this command!",
			ephemeral: true,
		});
	}
};
