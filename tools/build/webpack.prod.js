const $ = require('./helpers');
const uglifyJSPlugin = require('uglifyjs-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	target: 'node',
	entry: {
		'tracklists': $.root('./src/tracklists/tracklists.ts'),
		'tracklist_tracks': $.root('./src/tracklist_tracks/tracklist_tracks.ts')
	},
	output: {
		path: $.root('dist'),
		filename: '[name]/index.js',
		libraryTarget: 'commonjs2'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'awesome-typescript-loader?declaration=false',
				exclude: [/\.(spec|e2e)\.ts$/]
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js', '.json'],
		modules: [
			'node_modules',
			'src'
		]
	},
	plugins: [
		new uglifyJSPlugin({
			uglifyOptions: {
				ecma: 6
			}
		}),
		new copyWebpackPlugin([
			{
				from: 'src/host.json',
				to: 'host.json'
			},
			{
				context: 'src',
				from: '**/function.json',
				to: ''
			}
		])
	],
	node: {
		__filename: false,
		__dirname: false,
	}
};
