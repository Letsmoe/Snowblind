import fs from "fs";
import path from "path";
import Yargs from "yargs";
import { getFilesFromDir } from "./filesystem.js";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Parse command line arguments.
const argv = Yargs(process.argv.slice(2))
    .scriptName("flake")
    .usage("$0 <file> [config] [jsdom] [recursive]")
    .positional("file", {
    type: "string",
    describe: "The path to a .test.js file to run Or a path to a folder."
})
    .option("recursive", {
    type: "boolean",
    default: false,
    describe: "Whether to search a passed directory recursively.",
    alias: "r"
})
    .option("config", {
    alias: "c",
    type: "string",
    describe: "A JSON file containing information about the methods to run.",
    default: ""
})
    .option("jsdom", {
    alias: "j",
    type: "boolean",
    describe: "Whether to run the script in a headless browser.",
    default: true
})
    .help().argv;
const FILE_PATH = argv._[0];
const RECURSIVE = argv.r;
const ABS_PATH = path.join(__dirname, FILE_PATH);
if (FILE_PATH) {
    const STATS = fs.lstatSync(ABS_PATH);
    const IS_DIRECTORY = STATS.isDirectory();
    var fileList = [];
    if (IS_DIRECTORY) {
        fileList = getFilesFromDir(ABS_PATH, new RegExp(/.*?\.test\.js/), RECURSIVE);
    }
    else {
        fileList.push(ABS_PATH);
    }
    for (const path of fileList) {
        runTestSuite(path, argv.c, argv.j);
    }
}
function runTestSuite(path, config, jsdom) {
    if (config) {
        // Load config here.
        throw new Error("NOT IMPLEMENTED YET!");
    }
    if (path) {
        let showTestResults = require(path);
        showTestResults();
    }
}
