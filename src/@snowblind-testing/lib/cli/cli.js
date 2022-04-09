import * as chokidar from "chokidar";
import * as child_process from "child_process";
import Yargs from "yargs";
import { OpenServer } from "../server/open-server.js";
import { eventLoop, informationContainer } from "../events.js";
import { getFiles } from "../filesystem/files.js";
import { SocketServer } from "../server/websocket.js";
import { showTestsResults } from "../result-display.js";
import { stats } from "../test.js";
import { shared } from "../shared.js";
const args = Yargs(process.argv)
    .option("watch", {
    alias: "w",
    describe: "Should the folder be watched for changes?",
    default: false,
    type: "boolean",
})
    .option("folder", {
    alias: "f",
    describe: "The file or folder to be used as an entry.",
    default: "./",
    type: "string",
})
    .option("browser", {
    alias: "b",
    describe: "Should the test be executed in a browser window - this will start a live server?",
    default: false,
    type: "boolean",
})
    .help().argv;
const PATH = args.folder;
informationContainer.folderPath = PATH;
function runOnce() {
    console.clear();
    child_process.spawn("node", ["./lib/cli/runtest.js", PATH, args.browser], { stdio: "inherit" });
}
if (args.watch) {
    chokidar
        .watch("**/*.js", { interval: 500, persistent: true })
        .on("change", (path, evt) => {
        let paths = getFiles(PATH);
        eventLoop.trigger("filesDidChange", { files: paths });
        if (args.browser === false) {
            runOnce();
        }
    });
}
if (args.browser === false) {
    runOnce();
}
else {
    OpenServer();
    const wsServer = new SocketServer();
    shared.server = wsServer;
    wsServer.on("didReceiveMessage", (message) => {
        for (const key in message) {
            stats[key] = message[key];
        }
        showTestsResults();
    });
}
