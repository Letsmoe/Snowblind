const path = require('path');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin')

const commonConfig = {
	mode: "production",
	devtool: "source-map",
	entry: "./src/index.js",
}

const exportDistConfig = Object.assign({}, commonConfig, {
	output: {
		filename: "typecheck.min.js",
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new CleanWebpackPlugin()
	]
})

const exportBundleConfig = Object.assign({}, commonConfig, {
	output: {
		filename: "typecheck.min.js",
		path: path.resolve(__dirname, '../bundles'),
	},
})

module.exports = [exportDistConfig, exportBundleConfig]