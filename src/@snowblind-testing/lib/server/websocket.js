var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WebSocketServer } from "ws";
const generator = () => {
    const generated = {};
    const allowed = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let allowedLength = allowed.length;
    return {
        getUnique: (length) => {
            let str;
            do {
                str = "";
                for (let i = 0; i < length; i++) {
                    let ran = Math.round(Math.random() * allowedLength);
                    str += allowed[ran];
                }
            } while (str in generated);
            return str;
        }
    };
};
const unique = generator().getUnique;
class SocketServer {
    constructor(port = 7071, listeners = []) {
        this.port = port;
        this.listeners = listeners;
        this.rooms = [];
        this.connected = new Map();
        this.server = new WebSocketServer({ port: port });
        this.server.on("connection", this._connect.bind(this));
    }
    on(eventName, callback) {
        this.listeners.push([eventName, callback]);
    }
    emit(data) {
        let connected = this.getSockets();
        for (const socket of connected) {
            if (data instanceof Object) {
                data = JSON.stringify(data);
            }
            socket.send(data);
        }
    }
    _capture(socket, eventID) {
        return new Promise((resolve) => {
            socket._messageCapture = {
                id: eventID,
                callback: (id, data) => {
                    if (id === eventID) {
                        resolve(data);
                    }
                }
            };
        });
    }
    emitSingle(socket, data) {
        let id = unique(128);
        if (data instanceof Object) {
            data = JSON.stringify(data);
        }
        socket.send(data);
        return this._capture(socket, id);
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
    _connect(ws) {
        this.connected.set(ws, true);
        ws.didReadInitials = false;
        ws.on("message", (messageAsString) => __awaiter(this, void 0, void 0, function* () {
            const message = JSON.parse(messageAsString);
            this._run("didReceiveMessage", message);
        }));
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
