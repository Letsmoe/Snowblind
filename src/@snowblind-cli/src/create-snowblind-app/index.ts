#! /usr/bin/env node
const yargs = require("yargs");
const path = require("path");

const argv = yargs
	.command(
		"create-snowblind-app <name> [typescript] [webpack]",
		"Generates the project structure of a default Snowblind project."
	)
	.positional("name", {
		describe: "The name under which the project is being created.",
		type: "string",
		demandOption: true,
	})
	.option("typescript", {
		alias: "ts",
		description:
			"Whether to generate tsconfig.json and .ts files rather than .js files. Enabled by default.",
		type: "boolean",
		default: true,
	})
	.option("webpack", {
		alias: "w",
		description:
			"Whether to generate webpack.config.js. Enabled by default.",
		type: "boolean",
		default: true,
	})
	.help()
	.alias("help", "h").argv;

const Folder = require("../class.folder");
const SFile = require("../class.file");
const readFile = require("../read");

const ROOT_FOLDER = new Folder(argv._[0]);

/**
 * Files
 */

const templatePath = path.join(__dirname, "./templates");
const testFiles = [];

const _src = new Folder("src", [
	new SFile("index.ts", readFile(path.join(templatePath, "index-ts.txt"))),
	new Folder("img"),
]);
const _dist = new Folder("dist");
const _lib = new Folder("lib");
const _test = new Folder("test", testFiles);

ROOT_FOLDER.append([
	_src,
	_dist,
	_lib,
	_test,
	new SFile(
		"tsconfig.json",
		readFile(path.join(templatePath, "tsconfig.txt"))
	),
]);

ROOT_FOLDER.create();

/**
 * All files created, install Snowblind, Snowblind Hooks and Snowblind Typecheck
 */

const DOCUMENT_DIR = path.join(process.cwd(), argv._[0]);


const { spawn } = require('child_process');

process.chdir(DOCUMENT_DIR);

const child = spawn('npm', ['init'], {detached: true, stdio: 'inherit'});

child.on('exit', function() {
	const innerChild = spawn("npm", ["install", "@snowblind/core", "@snowblind/hooks", "--save-dev"], {detached: true, stdio: "inherit"});
	innerChild.on("exit", () => {
		console.log("🎉🎉 We're done creating the project, let's explore it! 🎉🎉");
		process.exit()
	})
})