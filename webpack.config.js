/*global
 	module, __dirname, require
 */

/**
 * @name webpack
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
		bundle: './src/index'
	},
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, './build/js'),
		publicPath: '../build/'
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
	],
	devtool: '#cheap-module-eval-source-map',
	resolve: {
		alias: {
			src: path.resolve(__dirname, 'src'),
			components: path.resolve(__dirname, 'src/components'),
			constants: path.resolve(__dirname, 'src/constants'),
			data: path.resolve(__dirname, 'src/data'),
			scenes: path.resolve(__dirname, 'src/scenes'),
			scss: path.resolve(__dirname, 'src/scss'),
			services: path.resolve(__dirname, 'src/services')
		}
	}
};