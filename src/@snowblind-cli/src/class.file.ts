import { IFile, IFolder } from "./types";

const fs = require('fs');
const path = require('path');

class SFile implements IFile {
	path: string;
	content: string;
	parentFolder: IFolder;
	constructor(path: string, content : string) {
		this.path = path;
		this.content = content;
	}

	create() {
		if (this.parentFolder) {
			this.path = path.join(this.parentFolder.path, this.path);
		} else {
			this.path = path.join(WORKING_DIR, this.path);
		}
		
		if (!fs.existsSync(this.path)) {
			fs.writeFile(this.path, this.content, (err : any) => {
				if (err) throw err;
				return true;
			});
		}
	}
}

module.exports = SFile;
