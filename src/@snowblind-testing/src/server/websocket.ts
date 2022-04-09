import { WebSocketServer, WebSocket } from "ws";
import { eventLoop } from "../events.js";

class SocketServer {
	public server : WebSocketServer;
	constructor(public port : number = 7071, public connected : Map<WebSocket, boolean> = new Map(), private listeners : Array<[string, Function]> = []) {
		this.server = new WebSocketServer({port: port})
		this.server.on("connection", this._establishConnection.bind(this));
	}

	on(eventName: string, callback : Function) {
		this.listeners.push([eventName, callback]);
	}

	send(data : string) : void {
		let connected = this.getSockets();
		for (const socket of connected) {
			socket.send(data);
		}
	}

	getSockets() : WebSocket[] {
		return Array.from(this.connected).map(x => x[0]);
	}

	_run(eventName: string, data : any) {
		for (const event of this.listeners) {
			if (event[0] === eventName) {
				event[1](data);
			}
		}
	}

	_establishConnection(ws : WebSocket) : void {
		this.connected.set(ws, true);
		ws.on("message", (messageAsString: string) => {
			const message = JSON.parse(messageAsString);
			this._run("didReceiveMessage", message)
		});

		eventLoop.onFilesDidChange(() => {
			[...this.connected.keys()].forEach((client) => {
				client.send(JSON.stringify({ command: "RELOAD" }));
			});
		});

		ws.on("close", () => {
			this.connected.delete(ws);
		});
	}
}

export { SocketServer };
