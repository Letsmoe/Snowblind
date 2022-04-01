import fs from "fs";
import path from "path";
const getFilesFromDir = (dir, filter, recursive = false) => {
    let fileList = [];
    if (!fs.existsSync(dir)) {
        return fileList;
    }
    var files = fs.readdirSync(dir);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(dir, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory() && recursive) {
            fileList = fileList.concat(getFilesFromDir(filename, filter, recursive));
        }
        else if (filename.match(filter)) {
            fileList.push(filename);
        }
    }
    return fileList;
};
export { getFilesFromDir };
