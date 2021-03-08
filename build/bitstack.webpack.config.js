// @ts-check

'use strict';

const path = require('path');
const webpack = require('webpack');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

/** @type {import('webpack').Configuration}*/
const config = {
	target: 'node',
	mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')

	entry: './src/app.ts', // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
	output: {
		// the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
		path: path.resolve(__dirname, '..', 'dist'),
		filename: 'app.js',
		libraryTarget: 'commonjs'
	},
	resolve: {
		// support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
		extensions: ['.ts', '.js']
	},
	devtool: 'inline-source-map',
	plugins: [
		new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ }),
		new webpack.IgnorePlugin({ resourceRegExp: /^kcors$/ }),
		// @ts-ignore
		new WebpackShellPluginNext({
			onAfterDone: {
				scripts: ['nodemon dist/app.js'],
				blocking: true,
				parallel: false
			}
		}),
		new ForkTsCheckerWebpackPlugin()
	],
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
				options: {
					transpileOnly: true
				}
			}
		]
	},
	watchOptions: {
		poll: true,
		ignored: /node_modules/
	  }
};
module.exports = config;
