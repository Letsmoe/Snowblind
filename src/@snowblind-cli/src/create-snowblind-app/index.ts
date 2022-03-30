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

const packageJSONContent = {
	"name": argv._[0],
	"version": "0.0.1",
	"description": "",
	"private": true,
	"dependencies": {},
	"scripts": {
		"start": "start",
		"build": "build",
		"test": "test"
	},
	"author": "",
	"license": "MIT",
	"devDependencies": {},
}

const templatePath = path.join(__dirname, "./templates");

const _src = new Folder("src", [
	new SFile("index.ts", readFile(path.join(templatePath, "index-ts.txt"))),
	new SFile(
		"tsconfig.json",
		readFile(path.join(templatePath, "tsconfig.txt"))
	),
	new Folder("img"),
]);
const _lib = new Folder("lib");
const _test = new Folder("test", [
	new SFile(
		"main.test.js",
		readFile(path.join(templatePath, "./test/main.test.txt"))
	)
]);

ROOT_FOLDER.append([
	_src,
	_lib,
	_test,
	new SFile(
		"README.md",
		readFile(path.join(templatePath, "readme.txt"))
	),
	new SFile(
		"package.json",
		JSON.stringify(packageJSONContent)
	)
]);

ROOT_FOLDER.create();

/**
 * All files created, install Snowblind, Snowblind Hooks and Snowblind Typecheck
 */

const DOCUMENT_DIR = path.join(process.cwd(), argv._[0]);


const { spawn } = require('child_process');
const figlet = require('figlet');

process.chdir(DOCUMENT_DIR);
console.log("Installing @snowblind/core, @snowblind/hooks and @snowblind/testing");

const innerChild = spawn("npm", ["install", "@snowblind/core", "@snowblind/hooks", "typescript", "webpack", "webpack-cli", "--save-dev"], {detached: true, stdio: "inherit"});
innerChild.on("exit", () => {
	const data = figlet.textSync("Welcome To\n  Snowblind", {
		font: "Big",
		horizontalLayout: "fitted",
		verticalLayout: "fitted",
	})
	console.log(data);
	console.log("🎉🎉 We're done creating the project, let's explore it! 🎉🎉");
	process.exit()
})