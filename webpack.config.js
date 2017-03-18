/*global
 	module, __dirname, require
 */

/**
 * @nape webpack
 * @type {Object}
 * @property NoEmitOnErrorsPlugin
 */

/**
 * @name path
 * @property resolve
 */

var webpack = require('webpack'),
	path = require('path');

module.exports = {
	entry: {
		client: './client/src/index'
	},
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, './client/build/js'),
		publicPath: '../client/build/'
	},
	module: {
		loaders: [{
			test: /\.js/,
			exclude: '/node_modules/',
			loader: 'babel-loader'
		}, {
			test: /\.(png|jpg|gif)$/,
			loader: 'file-loader?name=images/img-[hash:6].[ext]'
		}]
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin()
	]
};