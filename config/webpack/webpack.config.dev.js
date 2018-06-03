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

const config = {
	mode: 'development',
	devtool: 'eval-source-map',
	watch: true
};

export default config;