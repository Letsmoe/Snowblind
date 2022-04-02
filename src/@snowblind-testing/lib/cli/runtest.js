import * as fs from 'fs';
import * as path from 'path';
const PATH = process.argv[2];
/**
 * search for test folder
 */
function searchTestFolder() {
    if (!fs.existsSync(PATH)) {
        return false;
    }
    return true;
}
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
    const readyArray = Array(f.length).fill(false);
    for (let i = 0; i < f.length; i++) {
        const g = f[i];
        console.log(path.join(PATH, g));
        import(fs.realpathSync(path.join(PATH, g))).then(() => {
            readyArray[i] = true;
        });
    }
}
function run() {
    if (searchTestFolder()) {
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
