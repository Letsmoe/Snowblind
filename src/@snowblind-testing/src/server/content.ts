const ws = new WebSocket("ws://localhost:7071", ["PROTOCOL", "PROTOCOL1"]);
ws.onopen = function(ev) {
	ws.onmessage = function(messageEvent) {
		let data = JSON.parse(messageEvent.data);
		if (data.command === "RELOAD") {
			ws.send(JSON.stringify({ command: "GET_PATHS" }))
		} else if (data.inResponseTo === "GET_PATHS") {
			// Run the paths;
			for (const path of data.data) {
				import(path);
			}
		} else if (data.command === "GET_INFO") {
			// Return all information about the browser instance
			ws.send(JSON.stringify({
				inResponseTo: "GET_INFO",
				data: {
					userAgent: navigator.userAgent,
				},
				expectedResultCount: 1
			}))
		}
	}

	ws.send(JSON.stringify({ command: "GET_PATHS" }))
}