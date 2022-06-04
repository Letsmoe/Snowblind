import * as fs from 'fs';
import * as path from 'path';
import { describe, it, expect } from '../test.js';
const PATH = path.join(process.cwd(), process.argv[2]);
const RUN_BROWSER = process.argv[3];
/**
 * get all test files in the test/ folder
 */
function getTestFiles() {
    let f = fs.readdirSync(PATH).filter(x => x.match(/.*?\.(?:test|spec)\.js/));
    if (f) {
        return f.length == 0 ? null : f;
    }
}
/**
 * run the test files
 * @param f
 */
function runTestFiles(f = []) {
    for (let i = 0; i < f.length; i++) {
        const g = f[i];
        import(fs.realpathSync(path.join(PATH, g))).then(data => {
            if (data.default) {
                data.default(describe, it, expect);
            }
        });
    }
}
function run() {
    if (fs.existsSync(PATH)) {
        let files = getTestFiles();
        if (files) {
            runTestFiles(files);
        }
        else {
            console.error('No test files found.');
        }
    }
    else {
        console.error(`'${PATH}' doesn't exist`);
    }
}
run();
