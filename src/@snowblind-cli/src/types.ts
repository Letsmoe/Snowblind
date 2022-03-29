export interface IFile {
	create: Function;
	path: string;
	content: string;
	parentFolder: IFolder;
}

export interface IFolder {
	path: string;
	parentFolder: IFolder;
	content: Array<IFile | IFolder> | undefined;
	create: Function;
}