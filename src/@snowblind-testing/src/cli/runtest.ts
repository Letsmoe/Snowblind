import * as fs from 'fs';
import * as path from 'path';

const PATH = path.join(process.cwd(), process.argv[2]);
const RUN_BROWSER = process.argv[3];
/**
 * get all test files in the test/ folder
 */
function getTestFiles() {
	let f = fs.readdirSync(PATH).filter(x => x.match(/.*?\.(?:test|spec)\.js/));
	if (f) {
		return f.length == 0 ? null : f
	}
}

/**
 * run the test files
 * @param f 
 */
function runTestFiles(f : any[] = []) {
	for (let i = 0; i < f.length; i++) {
		const g = f[i];
		import(fs.realpathSync(path.join(PATH, g)))
	}
}

function run() {
	if (fs.existsSync(PATH)) {
		let files : any[] = getTestFiles();
		if (files) {
			runTestFiles(files)
		} else {
			console.error('No test files found.')
		}
	} else {
		console.error(`'${PATH}' doesn't exist`)
	}
}

run()