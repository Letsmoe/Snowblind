import { shared } from "../shared.js";
// Open a WebSocket connection.
const ws = new WebSocket("ws://localhost:7071");
ws.onopen = () => {
    ws.onmessage = (message) => {
        const msg = JSON.parse(message.data);
        console.log(msg);
    };
};
/**
 * Returns a list of browser instances connected to a browser listing all the properties, version numbers and other collected information.
 * @date 4/8/2022 - 6:35:50 PM
 *
 * @returns {Array<WebSocket>}
 */
function getInstances() {
    return Array.from(shared.server.getSockets()).map(x => x[0]);
}
export { getInstances };
