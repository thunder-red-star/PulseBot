const { BaseCluster } = require("kurasuta");
const fs = require("fs");

module.exports = class extends BaseCluster {
	async launch() {
		const Discord = require("discord.js");
		const myIntents = new Discord.Intents(32767);
		const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"] });
		const keepAlive = require("./server.js");
		const Chalk = require("chalk");
		const config = require("./config/config.json");
		const fs = require("fs");

		this.client.emoji = require("./data/emoji.json");
		const { deploy } = require("./deploy.js");

		let commandModules = fs.readFileSync("./data/modules.json", {
			encoding: "utf8",
		});
		commandModules = JSON.parse(commandModules);
		this.client.modules = Object.keys(commandModules.modules);

		this.client.brandColor = "#FF0000";

		this.commandsList = [];

		this.client.interactions = new Discord.Collection();

		this.client.modules.forEach((c) => {
			this.files = fs.readdirSync(`./interactions/${c}/`);
			this.files.forEach((f) => {
				this.interaction = require(`./interactions/${c}/${f}`);
				this.data = this.interaction.data.toJSON();
				this.commandsList.push(this.data);
				this.client.interactions.set(this.data.name, this.interaction);
			});
		});

		this.client.commandsList = this.commandsList;

        deploy(this.commandsList)

		require("./utils/eventLoader.js")(this.client);
		this.client.login(process.env.token);
	}
};
