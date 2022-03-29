"use strict";
exports.__esModule = true;
var fs = require('fs');
var path = require('path');
var SFile = /** @class */ (function () {
    function SFile(path, content) {
        this.path = path;
        this.content = content;
    }
    SFile.prototype.create = function () {
        if (this.parentFolder) {
            this.path = path.join(this.parentFolder.path, this.path);
        }
        else {
            this.path = path.join(WORKING_DIR, this.path);
        }
        if (!fs.existsSync(this.path)) {
            fs.writeFile(this.path, this.content, function (err) {
                if (err)
                    throw err;
                return true;
            });
        }
    };
    return SFile;
}());
module.exports = SFile;
