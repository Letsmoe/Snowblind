const jsdom = require("jsdom");
import fs from "fs";
import path from "path";
const { JSDOM } = jsdom;
const virtualConsole = new jsdom.VirtualConsole();
const TEST_URL = "index.test.js";
const BASE_PATH = path.join(__dirname, "../test");
const options = {
    contentType: "text/html",
    runScripts: "dangerously",
    pretendToBeVisual: true,
    resources: "usable",
    virtualConsole: virtualConsole
};
JSDOM.fromFile(path.join(__dirname, "../src/index.html"), options).then((dom) => {
    const window = dom.window;
    const jsFile = fs.readFileSync(path.join(BASE_PATH, TEST_URL), "utf8");
    const scriptElement = window.document.createElement("script");
    scriptElement.type = "module";
    scriptElement.textContent = jsFile;
    window.document.head.appendChild(scriptElement);
    window.onModulesLoaded = () => {
        console.log("ready to roll!");
    };
});
virtualConsole.sendTo(console);
