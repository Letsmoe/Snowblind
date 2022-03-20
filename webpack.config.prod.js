const path = require('path');

module.exports = [{
	mode: "production",
	entry: './index.js',
	experiments: {outputModule: true},
	output: {
		filename: "snowblind.min.js",
		path: path.resolve(__dirname, 'dist'),
		library: {
			type: "module"
		}
	}
}, {
	mode: "production",
	entry: './index.js',
	experiments: {outputModule: true},
	output: {
		filename: "snowblind.min.js",
		path: path.resolve(__dirname, '../bundles'),
		library: {
			type: "module"
		}
	}
}];