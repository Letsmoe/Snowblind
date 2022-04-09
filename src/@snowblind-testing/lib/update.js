import { stats } from "./test.js";
class Stash {
    constructor(_value) {
        this._value = _value;
    }
    replaceWith(value) {
        this._value = value;
        // Attempt sending the new value.
        this.send();
    }
    set server(server) {
        this._server = server;
    }
    send() {
        if (this._server) {
            this._server.send(this._value);
        }
    }
}
const sendStash = new Stash(JSON.stringify(stats));
if (typeof process == "undefined") {
    function connectToServer() {
        const ws = new WebSocket('ws://localhost:7071');
        const timer = setInterval(() => {
            if (ws.readyState === 1) {
                clearInterval(timer);
                sendStash.server = ws;
                ws.onmessage = (webSocketMessage) => {
                    const messageBody = JSON.parse(webSocketMessage.data);
                    console.log(messageBody);
                    if (messageBody.command == "RELOAD") {
                        window.location.reload();
                    }
                };
            }
        }, 10);
    }
    connectToServer();
}
function updateStats() {
    sendStash.replaceWith(JSON.stringify(stats));
}
export { updateStats };
