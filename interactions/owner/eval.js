const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("eval")
		.setDescription("Evaluate some arbitrary code.")
		.addStringOption(option =>
			option.setName('code')
				.setDescription('The code to evaluate.')
				.setRequired(true)),
	async execute(interaction, client) {
		if (interaction.user.id != "691009964570968144" && interaction.user.id != "646471436998934559") {
			await interaction.reply({ content: 'You can\'t do that!', ephemeral: true });
			return;
		}
		const code = interaction.options.getString('code');
		try {
			let evaled1 = eval(code).toString();
			let evaled = evaled1.replace(
				new RegExp(client.token, "gi"),
				"**********************************"
			);
			let typeofoutput = typeof evaled;
			if (typeofoutput !== "string") {
				evaled = require("util").inspect(evaled);
			}
			if (evaled.length > 1024) {
				const codeblok = new Discord.MessageEmbed()
					.setColor("#00FF00")
					.setTitle("Output")
					.setDescription(`The output is too long to display here.`)
				await interaction.reply({ embeds: [codeblok] });
			}
			const codeblok = new Discord.MessageEmbed()
				.setColor("#00FF00")
				.setTitle("Output")
				.setDescription(
					`
        \`\`\`js\n${evaled}\`\`\``
				)
				.addField("Type", `\`\`\`js\n${typeofoutput}\`\`\``);
			await interaction.reply({ embeds: [codeblok] });
		} catch (e) {
			message.react("811296689783832617");
			let error = e;
			const codeblok2 = new Discord.MessageEmbed()
				.setColor("#FF0000")
				.setTitle("Error").setDescription(`
    \`\`\`js\n${error}\`\`\`
    `);
			await interaction.reply({ embeds: [codeblok2] });
		}
	},
};
