import { stats } from "./test.js";
function hexToRGB(color) {
    color = color.toString();
    var r = parseInt(color.substring(1, 3), 16);
    var g = parseInt(color.substring(3, 5), 16);
    var b = parseInt(color.substring(5, 7), 16);
    return `${r};${g};${b}`;
}
const hex = (color, bg = false) => {
    if (color.startsWith("#")) {
        color = hexToRGB(color);
    }
    else if (color.startsWith("\x1b")) {
        return (...text) => `${color}${text.join(" ")}\x1b[0m`;
    }
    return (...text) => {
        return `\x1b[${bg ? "48" : "38"};2;${color}m ${text.join(" ")} \x1b[0m`;
    };
};
const bgHex = (color) => hex(color, true);
class ConsoleLogger {
    constructor(indent = 0, tabChar = "    ", color = "\x1b[0m") {
        this._tab = tabChar;
        this.indent = indent;
        this._color = color;
        this.lastState = {
            tab: tabChar,
            indent: indent,
            color: color
        };
    }
    log(...text) {
        console.log(hex(this._color)(this._tab.repeat(this.indent), ...text));
    }
    set color(color) {
        this._color = color;
    }
    set tabChar(tab) {
        this._tab = tab;
    }
    save() {
        this.lastState.tab = this._tab;
        this.lastState.indent = this.indent;
        this.lastState.color = this._color;
    }
    restore() {
        this._tab = this.lastState.tab;
        this.indent = this.lastState.indent;
        this._color = this.lastState.color;
    }
    blank() {
        this.log();
    }
}
var con = new ConsoleLogger();
let log = con.log.bind(con);
const legendItems = {
    "[async]": {
        description: "Property was executed asynchronously.",
        color: "#157A6E"
    },
    "[dom]": {
        description: "Property was executed with JSDOM enabled.",
        color: "#FFD166"
    }
};
function displayLegend() {
    // Display legend header.
    con.save();
    log("Legend:");
    con.indent = 1;
    // Loop through all items and print them to the screen;
    const longestName = Object.keys(legendItems).reduce((acc, x) => x.length > acc ? x.length : acc, 0);
    for (const name in legendItems) {
        let item = legendItems[name];
        let description = item.description;
        let color = item.color || "\x1b[0m";
        // set the new color and print the item.
        con.color = color;
        log(name.padEnd(longestName, " "), "=", description);
    }
    con.blank();
    // Restore old settings.
    con.restore();
}
function displayTitle() {
    const logTitle = stats.failed > 0 ? bgHex("#E0005A") : bgHex("#829E2E");
    const ratio = Math.round(stats.failed / stats.total * 100).toString();
    log(logTitle("Test Results"));
    log(`Tests run: ${stats.total}`);
    log(`Tests: ${logTitle(`${stats.passed} passed`)}, ${stats.total} total, ${logTitle(ratio + "% Failed")}`);
}
function getSpinner(state) {
    let states = "⣾⣽⣻⢿⡿⣟⣯⣷";
    return states[state % states.length];
}
let updateCallback;
function showTestsResults() {
    // Check if all tasks executed.
    console.clear();
    // CHeck if we're still awaiting values.
    let noneIsAwaiting = stats.describes.map(desc => desc.it.map(it => it.expects.map(expect => expect.awaiting))).flat(Infinity).indexOf(true) == -1;
    if (noneIsAwaiting) {
        clearInterval(updateCallback);
    }
    const arrExecuted = stats.describes.map(desc => desc.it.map(it => it.expects.map(expect => expect.isFinished))).flat(Infinity).indexOf(false) == -1;
    if (arrExecuted) {
        // Display legend and title.
        displayLegend();
        displayTitle();
        // Save the console state.
        con.save();
        // Loop through all `describe` statements
        for (const e of stats.describes) {
            const descName = e.name;
            const its = e.it;
            con.indent = 0;
            con.blank();
            log(descName);
            for (var i = 0; i < its.length; i++) {
                var _e = its[i];
                con.indent = 1;
                log(`${_e.name}`);
                for (var ii = 0; ii < _e.expects.length; ii++) {
                    const expect = _e.expects[ii];
                    con.indent = 2;
                    let status;
                    if (expect.awaiting === true) {
                        // The result still isn't there, show a spinner
                        if (typeof expect.spinnerState == 'undefined') {
                            expect.spinnerState = -1;
                        }
                        expect.spinnerState += 1;
                        status = `${getSpinner(expect.spinnerState)} ${hex("#E0005A")("Running!")}`;
                        if (updateCallback) {
                            clearInterval(updateCallback);
                        }
                        updateCallback = setInterval(() => {
                            showTestsResults();
                        }, 250);
                    }
                    else if (expect.status === true) {
                        status = hex("#829E2E")("√");
                    }
                    else if (expect.status === false) {
                        status = hex("#E0005A")("X");
                    }
                    log(`${status} ${expect.name} ${expect.async ? hex(legendItems["[async]"].color)("[async]") : ""}`);
                }
            }
        }
        // Restore console state.
        con.restore();
    }
}
export { showTestsResults };
