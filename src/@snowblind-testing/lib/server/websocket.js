import { WebSocketServer } from "ws";
import { eventLoop } from "../events.js";
class SocketServer {
    constructor(port = 7071, connected = new Map(), listeners = []) {
        this.port = port;
        this.connected = connected;
        this.listeners = listeners;
        this.server = new WebSocketServer({ port: port });
        this.server.on("connection", this._establishConnection.bind(this));
    }
    on(eventName, callback) {
        this.listeners.push([eventName, callback]);
    }
    send(data) {
        let connected = this.getSockets();
        for (const socket of connected) {
            socket.send(data);
        }
    }
    getSockets() {
        return Array.from(this.connected).map(x => x[0]);
    }
    _run(eventName, data) {
        for (const event of this.listeners) {
            if (event[0] === eventName) {
                event[1](data);
            }
        }
    }
    _establishConnection(ws) {
        this.connected.set(ws, true);
        ws.on("message", (messageAsString) => {
            const message = JSON.parse(messageAsString);
            this._run("didReceiveMessage", message);
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
