#!/usr/bin/env node

import * as chokidar from "chokidar";
import * as child_process from "child_process";
import {colarg} from "colarg";
import {WebServer} from "../server/webserver.js";
import { eventLoop, informationContainer } from "../events.js";
import { getFiles } from "../filesystem/files.js";
import { SocketServer } from "../server/websocket.js";
import { showTestsResults } from "../result-display.js";
import { stats } from "../test.js";
import { shared } from "../shared.js";

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const args = colarg(process.argv.slice(2))
	.option({
		name: "watch",
		alias: "w",
		description: "Should the folder be watched for changes?",
		defaults: false,
		type: "boolean",
	})
	.option({
		name: "folder",
		alias: "f",
		description: "The file or folder to be used as an entry.",
		defaults: "./",
		type: "string",
	})
	.option({
		name: "browser",
		alias: "b",
		description: "Should the test be executed in a browser window - this will start a live server?",
		defaults: false,
		type: "boolean",
	})
	.help().args;

shared.root = args.folder; // Register root folder for use in other application
shared.paths = getFiles(shared.root);
function run() {
	console.clear();

	const scriptPath = `${__dirname}/runtest.js`;

	child_process.spawn("node", [scriptPath, shared.root, args.browser], { stdio: "inherit" });
}

if (args.watch) {
	chokidar
		.watch("**/*.js", { interval: 500, persistent: true })
		.on("change", () => {
			let paths = getFiles(shared.root);
			shared.paths = paths;
			eventLoop.trigger("filesDidChange", {files: paths});
			if (args.browser === false) {
				run();
			}
		});
}
if (args.browser === false) {
	run();
} else {
	new WebServer()
	const wsServer = new SocketServer();
	shared.server = wsServer;
	wsServer.on("didReceiveMessage", (message: { [x: string]: any; }) => {
		for (const key in message) {
			stats[key] = message[key];
		}
		showTestsResults();
	})
}