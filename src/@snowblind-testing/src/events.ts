const callbacks = [];

const eventLoop = {
	onFilesDidChange: function(callback: Function) {
		callbacks.push({type: "filesDidChange", run: (...data : any[]) => callback(...data)})
	},
	trigger: function(event: string, data : any) {
		for (const callback of callbacks) {
			if (callback.type === event) {
				callback.run(data);
			}
		}
	}
}

const informationContainer = {
	folderPath: "./",
	fileArray: []
}

export {eventLoop, informationContainer}