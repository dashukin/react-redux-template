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
import {
	definePlugin,
	progressBarPlugin
} from './plugins';

const config = {
	devtool: '',
	plugins: [
		progressBarPlugin({
			production: true
		}),
		definePlugin({
			PRODUCTION: JSON.stringify(true)
		})
	],
	watch: false
};

export default config;