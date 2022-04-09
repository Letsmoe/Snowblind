import * as fs from 'fs';
import * as path from 'path';
function getFiles(folderPath) {
    let f = fs.readdirSync(folderPath).filter(x => x.match(/.*?\.(?:test|spec)\.js/)).map(x => "/" + path.join(folderPath, x));
    if (f) {
        return f.length == 0 ? null : f;
    }
}
export { getFiles };
