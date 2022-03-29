const fs = require('fs');

function read(path : string) : string | never {
	if (fs.existsSync(path)) {
		return fs.readFileSync(path, 'utf8');
	} else {
		throw new Error("File not found: " + path);
	}
}

module.exports = read