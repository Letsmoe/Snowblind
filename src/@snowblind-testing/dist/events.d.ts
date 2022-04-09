declare const eventLoop: {
    onFilesDidChange: (callback: Function) => void;
    trigger: (event: string, data: any) => void;
};
declare const informationContainer: {
    folderPath: string;
    fileArray: any[];
};
export { eventLoop, informationContainer };
//# sourceMappingURL=events.d.ts.map