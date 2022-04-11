import { WebSocketServer, WebSocket } from "ws";

interface CustomWebSocket extends WebSocket {
	didReadInitials : boolean;
	_messageCapture: {
		id: string,
		callback : (id : string, data : string) => void
	}
}

const generator = () => {
	const generated : {[x: string]: boolean} = {};
	const allowed = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let allowedLength = allowed.length;
	return {
		getUnique: (length : number) => {
			let str : string;
			do {
				str = "";
				for (let i = 0; i < length; i++) {
					let ran = Math.round(Math.random() * allowedLength);
					str += allowed[ran];
				}
			} while (str in generated);
			return str;
		}
	}
}
const unique = generator().getUnique;

class SocketServer {
	public server : WebSocketServer;
	public rooms : any[] = [];
	public connected: Map<CustomWebSocket, boolean>;
	constructor(public port : number = 7071, private listeners : Array<[string, Function]> = []) {
		this.connected = new Map()
		this.server = new WebSocketServer({port: port})
		this.server.on("connection", this._connect.bind(this));
	}

	on(eventName: string, callback : Function) {
		this.listeners.push([eventName, callback]);
	}

	emit(data : object | string) : void {
		let connected = this.getSockets();
		for (const socket of connected) {
			if (data instanceof Object) {
				data = JSON.stringify(data);
			}
			socket.send(data);
		}
	}

	_capture(socket: CustomWebSocket, eventID: string) {
		return new Promise((resolve) => {
			socket._messageCapture = {
				id: eventID,
				callback: (id : string, data : string) => {
					if (id === eventID) {
						resolve(data)
					}
				}
			}
		})
	}

	emitSingle(socket : CustomWebSocket, data : object | string) {
		let id = unique(128);
		if (data instanceof Object) {
			data = JSON.stringify(data);
		}
		socket.send(data);
		return this._capture(socket, id)
	}

	getSockets() : CustomWebSocket[] {
		return Array.from(this.connected).map(x => x[0]);
	}

	_run(eventName: string, data : any) {
		for (const event of this.listeners) {
			if (event[0] === eventName) {
				event[1](data);
			}
		}
	}

	_connect(ws : CustomWebSocket) : void {
		this.connected.set(ws, true);
		ws.didReadInitials = false;
		ws.on("message", async (messageAsString: string) => {
			const message = JSON.parse(messageAsString);
			this._run("didReceiveMessage", message)
		});

		ws.on("close", () => {
			this.connected.delete(ws);
		});
	}
}

export { SocketServer };


/**
 * eventLoop.onFilesDidChange(() => {
			[...this.connected.keys()].forEach((client) => {
				client.send(JSON.stringify({ command: "RELOAD" }));
			});
		});
 */