var fs = require('fs');
function read(path) {
    if (fs.existsSync(path)) {
        return fs.readFileSync(path, 'utf8');
    }
    else {
        throw new Error("File not found: " + path);
    }
}
module.exports = read;
