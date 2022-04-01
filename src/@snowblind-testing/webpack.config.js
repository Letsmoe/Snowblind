const path = require('path');

module.exports = {
	mode: "production",
	entry: './lib/index.js',
	experiments: {outputModule: true},
	output: {
		filename: "testing.min.js",
		path: path.resolve(__dirname, 'dist'),
		library: {
			type: "module"
		}
	}
};