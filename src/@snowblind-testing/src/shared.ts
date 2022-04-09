import { SocketServer } from "./server/websocket.js";
import {stats} from "./test.js";

class UploadStash {
	private _server: WebSocket;
	constructor(private _value: string) {}

	replaceWith(value: string) {
		this._value = value;
		// Attempt sending the new value.
		this.send();
	}

	set server(server: WebSocket) {
		this._server = server;
	}

	send() {
		if (this._server) {
			this._server.send(this._value)
		}
	}
}

const sendStash = new UploadStash(JSON.stringify(stats));

if (typeof process == "undefined") {
	function connectToServer() {
		const ws = new WebSocket('ws://localhost:7071');
		ws.onopen = () => {
			sendStash.server = ws;
			ws.onmessage = (webSocketMessage) => {
				const messageBody = JSON.parse(webSocketMessage.data);
				console.log(messageBody);
				
				if (messageBody.command == "RELOAD") {
					window.location.reload();
				}
			};
		}
	}
	connectToServer();
}

function updateStats() {
	sendStash.replaceWith(JSON.stringify(stats))
}

const shared : {server: SocketServer, stats: any[]} = {
	server: undefined, stats: []
}

export {updateStats, shared}