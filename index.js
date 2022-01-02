const { ShardingManager } = require("kurasuta");
const { join } = require("path");
const chalk = require("chalk");
const shardconfig = require("./config/shardconfig.json");
const config = require("./config/config.json");
const fs = require("fs");

const sharder = new ShardingManager(join(__dirname, "main"), {
	token: config.token,
	shardCount: shardconfig.shardCount,
});

sharder.on("ready", async (cluster) => {
	console.log(chalk.green.bold(`Shard ${cluster.id + 1} is ready.`));
});
sharder.spawn();
