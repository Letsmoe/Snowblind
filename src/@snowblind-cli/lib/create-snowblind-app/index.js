#! /usr/bin/env node
var yargs = require("yargs");
var path = require("path");
var argv = yargs
    .command("create-snowblind-app <name> [typescript] [webpack]", "Generates the project structure of a default Snowblind project.")
    .positional("name", {
    describe: "The name under which the project is being created.",
    type: "string",
    demandOption: true
})
    .option("typescript", {
    alias: "ts",
    description: "Whether to generate tsconfig.json and .ts files rather than .js files. Enabled by default.",
    type: "boolean",
    "default": true
})
    .option("webpack", {
    alias: "w",
    description: "Whether to generate webpack.config.js. Enabled by default.",
    type: "boolean",
    "default": true
})
    .help()
    .alias("help", "h").argv;
var Folder = require("../class.folder");
var SFile = require("../class.file");
var readFile = require("../read");
var ROOT_FOLDER = new Folder(argv._[0]);
/**
 * Files
 */
var templatePath = path.join(__dirname, "./templates");
var testFiles = [];
var _src = new Folder("src", [
    new SFile("index.ts", readFile(path.join(templatePath, "index-ts.txt"))),
    new Folder("img"),
]);
var _dist = new Folder("dist");
var _lib = new Folder("lib");
var _test = new Folder("test", testFiles);
ROOT_FOLDER.append([
    _src,
    _dist,
    _lib,
    _test,
    new SFile("tsconfig.json", readFile(path.join(templatePath, "tsconfig.txt"))),
]);
ROOT_FOLDER.create();
/**
 * All files created, install Snowblind, Snowblind Hooks and Snowblind Typecheck
 */
var DOCUMENT_DIR = path.join(process.cwd(), argv._[0]);
var spawn = require('child_process').spawn;
process.chdir(DOCUMENT_DIR);
var child = spawn('npm', ['init'], { detached: true, stdio: 'inherit' });
child.on('exit', function () {
    var innerChild = spawn("npm", ["install", "@snowblind/core", "@snowblind/hooks", "--save-dev"], { detached: true, stdio: "inherit" });
    innerChild.on("exit", function () {
        console.log("🎉🎉 We're done creating the project, let's explore it! 🎉🎉");
        process.exit();
    });
});
