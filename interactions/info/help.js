const Discord = require("discord.js");

const { SlashCommandBuilder } = require("@discordjs/builders");

const paginationEmbed = require("../../utils/pagination.js");

const fs = require("fs");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription(
			"Returns help for the bot. Really should be looking at slash commands though."
		),
	async execute(interaction, client) {
		let embeds = [];

		client.modules.forEach((c) => {
			files = fs.readdirSync(`./interactions/${c}/`);
			let dString = "";
			files.forEach((f) => {
				interaction1 = require(`../../interactions/${c}/${f}`);
				data = interaction1.data.toJSON();
				dString += "`/" + data.name + "`" + ": " + data.description + "\n";
			});
			embeds.push(
				new Discord.MessageEmbed()
					.setTitle("Help for " + c + " module")
					.setDescription(dString)
					.setColor(client.brandColor)
			);
		});

		paginationEmbed(interaction, embeds);
	},
};
