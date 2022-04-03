import * as chokidar from "chokidar";
import * as child_process from "child_process";
import Yargs from "yargs";
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
const RUN_BROWSER = args.browser;
function runOnce() {
    console.clear();
    child_process.spawn("node", ["./lib/cli/runtest.js", PATH, RUN_BROWSER], { stdio: "inherit" });
}
if (args.watch) {
    chokidar
        .watch("**/*.js", { interval: 500, persistent: true })
        .on("change", (path, evt) => {
        runOnce();
    });
}
runOnce();
