"use strict";
exports.__esModule = true;
var fs = require('fs');
var path = require('path');
var WORKING_DIR = require('./defaults');
var Folder = /** @class */ (function () {
    function Folder(currentPath, content) {
        if (content === void 0) { content = []; }
        this.path = currentPath;
        this.content = [];
        this.append(content);
    }
    Folder.prototype.create = function () {
        if (this.parentFolder) {
            this.path = path.join(this.parentFolder.path, this.path);
        }
        else {
            this.path = path.join(WORKING_DIR, this.path);
        }
        if (!fs.existsSync(this.path)) {
            fs.mkdirSync(this.path);
        }
        for (var _i = 0, _a = this.content; _i < _a.length; _i++) {
            var item = _a[_i];
            item.create();
        }
    };
    Folder.prototype.append = function (content) {
        if (content === void 0) { content = []; }
        content = [content].flat(1);
        for (var _i = 0, content_1 = content; _i < content_1.length; _i++) {
            var item = content_1[_i];
            item.parentFolder = this;
            this.content.push(item);
        }
    };
    return Folder;
}());
module.exports = Folder;
