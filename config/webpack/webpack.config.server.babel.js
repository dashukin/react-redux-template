import merge from 'webpack-merge';
import commonConfig from './webpack.config.server.common';
import devConfig from './webpack.config.server.dev';
import prodConfig from './webpack.config.server.prod';

import {
  DEV,
} from '../environment';

const envConfig = DEV ? devConfig : prodConfig;
const config = merge(commonConfig, envConfig);

export default config;
