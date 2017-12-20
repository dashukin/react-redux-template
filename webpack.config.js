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

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		bundle: './src/index'
	},
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, './dist/js'),
		publicPath: '/dist/'
	},
	module: {
		rules: [{
			test: /\.js/,
			exclude: /node_modules/,
			use: ['babel-loader']
		}, {
			test: /\.(png|jpg|gif)$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: 'images/img-[hash:6].[ext]'
				}
			}]
		}, {
			test: /\.(css)$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader'
				}]
			})
		}]
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin('css/[name].css')
	],
	devtool: '#cheap-module-eval-source-map',
	resolve: {
		alias: {
			src: 		path.resolve(__dirname, 'src'),
			components:	path.resolve(__dirname, 'src/components'),
			constants:	path.resolve(__dirname, 'src/constants'),
			data:		path.resolve(__dirname, 'src/data'),
			models:		path.resolve(__dirname, 'src/models'),
			scenes:		path.resolve(__dirname, 'src/scenes'),
			scss:		path.resolve(__dirname, 'src/scss'),
			services:	path.resolve(__dirname, 'src/services'),
			utils:		path.resolve(__dirname, 'src/utils')
		}
	}
};