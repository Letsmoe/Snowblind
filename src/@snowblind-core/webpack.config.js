const path = require('path');

module.exports = [{
	mode: "production",
	entry: "./lib/snowblind.js",
	experiments: {
		outputModule: true
	},
	output: {
		filename: "snowblind.min.js",
		path: path.resolve(__dirname, 'dist'),
		library: {
			type: "module"
		}
	}
}];