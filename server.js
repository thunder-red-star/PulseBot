const express = require("express"),
	server = express(),
	Axios = require("axios");

server.all("/", (req, res) => {
	res.send("Powerful Discord Bot! ");
});

function keepAlive() {
	// ping the webserver the bot put up itself
	setInterval(() => {
		Axios.get("https://powerful.williamvongphan.repl.co");
	}, 60000);
	// make webserver listen to the pings
	server.listen(3000, () => {
		console.log("Server is Ready!");
	});
}
module.exports = keepAlive;
