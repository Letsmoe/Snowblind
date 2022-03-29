const fs = require('fs');
const path = require('path');
const WORKING_DIR = require('./defaults')
import { IFile, IFolder } from './types';

class Folder implements IFolder {
	path: string;
	content: Array<IFile | IFolder> | undefined;
	parentFolder: IFolder;
	constructor(currentPath: string, content: Array<IFile | IFolder> = []) {
		this.path = currentPath;
		this.content = [];
		this.append(content)
	}

	create() {
		if (this.parentFolder) {
			this.path = path.join(this.parentFolder.path, this.path);
		} else {
			this.path = path.join(WORKING_DIR, this.path);
		}
		
		if (!fs.existsSync(this.path)) {
			fs.mkdirSync(this.path);
		}

		for (const item of this.content) {
			item.create();
		}
	}

	append(content: Array<IFolder | IFile> = []) {
		content = [content].flat(1);
		for (const item of content) {
			item.parentFolder = this;
			this.content.push(item);
		}
	}
}

module.exports = Folder;