const path = require('path');

module.exports = [{
	mode: "development",
	entry: "./lib/index.js",
	experiments: {
		outputModule: true
	},
	output: {
		filename: "router.dev.js",
		path: path.resolve(__dirname, 'dist'),
		library: {
			type: "module"
		}
	}
}, {
	mode: "production",
	entry: "./lib/index.js",
	experiments: {
		outputModule: true
	},
	output: {
		filename: "router.min.js",
		path: path.resolve(__dirname, 'dist'),
		library: {
			type: "module"
		}
	}
}];