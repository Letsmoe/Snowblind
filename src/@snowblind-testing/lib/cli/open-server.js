import { WebSocketServer } from "ws";
import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import * as mime from "mime-types";
import { showTestsResults } from "../result-display.js";
import { stats } from "../test.js";
import { eventLoop, informationContainer } from "../events.js";
import { getFiles } from "../filesystem/files.js";
function OpenSocketServer(port = 7071) {
    const wss = new WebSocketServer({ port: port });
    const clients = new Map();
    wss.on("connection", (ws) => {
        clients.set(ws, true);
        ws.on("message", (messageAsString) => {
            const message = JSON.parse(messageAsString);
            for (const key in message) {
                stats[key] = message[key];
            }
            showTestsResults();
        });
        eventLoop.onFilesDidChange(() => {
            [...clients.keys()].forEach((client) => {
                client.send(JSON.stringify({ command: "RELOAD" }));
            });
        });
        ws.on("close", () => {
            clients.delete(ws);
        });
    });
    console.log("Opened a WebSocket Server on port " + port);
}
function LoadFile(fileName) {
    let realPath = path.join(process.cwd(), fileName);
    if (fs.existsSync(realPath) && fs.lstatSync(realPath).isFile()) {
        let content = fs.readFileSync(realPath, "utf8");
        let type = mime.lookup(realPath);
        return [type, content];
    }
    else {
        console.warn("File does not exist: " + realPath);
        return ["text/plain", ""];
    }
}
function OpenServer(port = 7072) {
    let fileArray = getFiles(informationContainer.folderPath);
    eventLoop.onFilesDidChange((data) => {
        fileArray = data.files;
    });
    // Create an instance of the http server to handle HTTP requests
    let app = http.createServer((req, res) => {
        let requestURL = req.url;
        let type, file;
        if (requestURL.startsWith("/index") || requestURL === "/") {
            type = "text/html";
            file = `<head><title>Snowblind - Testing</title></head>
			<body></body>
			<script>
				function runTestFiles(f) {
					const readyArray = Array(f.length).fill(false);
					for (let i = 0; i < f.length; i++) {
						const g = f[i];
						import(g).then(() => {
							readyArray[i] = true;
						})
					}
				}

				runTestFiles(${JSON.stringify(fileArray)})
			</script>`;
        }
        else {
            [type, file] = LoadFile(requestURL);
        }
        // Set a response type of plain text for the response
        res.writeHead(200, { 'Content-Type': type });
        // Send back a response and end the connection
        res.end(file);
    });
    // Start the server on port 3000
    app.listen(port, '127.0.0.1');
    console.log("Opened a local server on port " + port);
    OpenSocketServer();
}
export { OpenServer, OpenSocketServer };
