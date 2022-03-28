const path = require('path');

module.exports = [{
	mode: "development",
	entry: './lib/index.js',
	experiments: {outputModule: true, topLevelAwait: true},
	output: {
		filename: "hooks.dev.js",
		path: path.resolve(__dirname, 'dist'),
		library: {
			type: "module"
		}
	}
},
{
	mode: "production",
	entry: './lib/index.js',
	experiments: {outputModule: true, topLevelAwait: true},
	output: {
		filename: "hooks.min.js",
		path: path.resolve(__dirname, 'dist'),
		library: {
			type: "module"
		}
	}
}];