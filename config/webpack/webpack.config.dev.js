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
	mode: 'development',
	devtool: 'eval-source-map',
	watch: true,
	plugins: [
		progressBarPlugin(),
	]
};

export default config;