const path = require('path');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		contentBase: './dist',
	},
	entry: './src/index.js',
	output: {
		filename: "typecheck.js",
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new CleanWebpackPlugin()
	]
};