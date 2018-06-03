/*global
 	module, __dirname, require
 */

/**
 * @name path
 * @property resolve
 */

import {argv} from 'yargs';
import merge from 'webpack-merge';
import commonConfig from './webpack.config.common';
import devConfig from './webpack.config.dev';
import prodConfig from './webpack.config.prod';

import {
	DEV,
} from '../environment';

const envConfig = DEV ? devConfig: prodConfig;
const config = merge(commonConfig, envConfig);

export default config;