const Discord = require('discord.js');

module.exports = async member => {
	// find the welcome channel in the cache, if not found find the general channel, if not found find the system channel,
	let welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome');
	if (!welcomeChannel) {
		welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'general');
		if (!welcomeChannel) {
			welcomeChannel = member.guild.channels.cache.get(member.guild.systemChannelID);
		}
	}


}
