/**
 * @name path
 * @property resolve
 */

import merge from 'webpack-merge';
import commonConfig from './webpack.config.client.common';
import devConfig from './webpack.config.client.dev';
import prodConfig from './webpack.config.client.prod';

import {
  DEV,
} from '../environment';

const envConfig = DEV ? devConfig : prodConfig;
const config = merge(commonConfig, envConfig);

export default config;
