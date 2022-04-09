import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import * as mime from "mime-types";
import { eventLoop, informationContainer } from "../events.js";
import { getFiles } from "../filesystem/files.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
function LoadFile(fileName) {
    if (fs.existsSync(fileName) && fs.lstatSync(fileName).isFile()) {
        let content = fs.readFileSync(fileName, "utf8");
        let type = mime.lookup(fileName);
        return [type, content];
    }
    else {
        console.warn("File does not exist: " + fileName);
        return ["text/plain", ""];
    }
}
const __dirname = dirname(fileURLToPath(import.meta.url));
const adjustPath = (newPath) => {
    return path.join(__dirname, newPath);
};
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
					for (let i = 0; i < f.length; i++) {
						const g = f[i];
						import(g)
					}
				}

				runTestFiles(${JSON.stringify(fileArray)})
			</script>`;
        }
        else if (requestURL.startsWith("/overview")) {
            [type, file] = LoadFile(adjustPath("../overview.html"));
        }
        else {
            [type, file] = LoadFile(path.join(process.cwd(), requestURL));
        }
        // Set a response type of plain text for the response
        res.writeHead(200, { 'Content-Type': type });
        // Send back a response and end the connection
        res.end(file);
    });
    // Start the server on port 3000
    app.listen(port, '127.0.0.1');
    console.log("Opened a local server on port " + port);
}
export { OpenServer };
