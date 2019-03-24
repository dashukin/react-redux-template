/*global
 	module, __dirname, require
 */

/**
 * @name webpack
 * @property DefinePlugin
 * @property DedupePlugin
 * @property UglifyJsPlugin
 * @property LoaderOptionsPlugin
 * @property AggressiveMergingPlugin
 * @property HotModuleReplacementPlugin
 */

import webpack from 'webpack';
import { progressBarPlugin } from './plugins';

const config = {
	devtool: '',
	plugins: [
		progressBarPlugin({
			production: true
		}),
	],
	watch: false
};

export default config;