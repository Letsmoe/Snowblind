const path = require('path');

module.exports = [{
		mode: "development",
		entry: './lib/index.js',
		experiments: {
			outputModule: true,
			topLevelAwait: true
		},
		output: {
			filename: "hooks.dev.js",
			path: path.resolve(__dirname, 'dist'),
			library: {
				type: "module"
			}
		},
		module: {
			rules: [
				// …
				{
					test: /\.mdx?$/,
					use: [
						// `babel-loader` is optional:
						{
							loader: 'babel-loader',
							options: {}
						},
						{
							loader: '@mdx-js/loader',
							/** @type {import('@mdx-js/loader').Options} */
							options: {
								/* jsxImportSource: …, otherOptions… */ }
						}
					]
				}
			]
		}
	},
	{
		mode: "production",
		entry: './lib/index.js',
		experiments: {
			outputModule: true,
			topLevelAwait: true
		},
		output: {
			filename: "hooks.min.js",
			path: path.resolve(__dirname, 'dist'),
			library: {
				type: "module"
			}
		}
	}
];