const callbacks = [];
const eventLoop = {
    onFilesDidChange: function (callback) {
        callbacks.push({ type: "filesDidChange", run: (...data) => callback(...data) });
    },
    trigger: function (event, data) {
        for (const callback of callbacks) {
            if (callback.type === event) {
                callback.run(data);
            }
        }
    }
};
const informationContainer = {
    folderPath: "./",
    fileArray: []
};
export { eventLoop, informationContainer };
