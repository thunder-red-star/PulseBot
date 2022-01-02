const net = require("net");

class TCPServer {
	constructor(port, host) {
		this.port = port;
		this.host = host;
		this.server = null;
		this.clients = [];
		this.onConnect = null;
		this.onDisconnect = null;
		this.onMessage = null;
	}

	start() {
		this.server = net.createServer((socket) => {
			this.clients.push(socket);
			if (this.onConnect) {
				this.onConnect(socket);
			}
			socket.on("data", (data) => {
				if (this.onMessage) {
					this.onMessage(socket, data);
				}
			});
			socket.on("close", () => {
				this.clients.splice(this.clients.indexOf(socket), 1);
				if (this.onDisconnect) {
					this.onDisconnect(socket);
				}
			});
		});
		this.server.listen(this.port, this.host);
	}
}
