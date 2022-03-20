const path = require('path');

module.exports = {
	mode: "development",
	entry: {
		testing: './index.testing.js',
		snowblind: './index.js'
	},
	experiments: {outputModule: true},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, 'dist'),
		library: {
			type: "module"
		}
	}
};