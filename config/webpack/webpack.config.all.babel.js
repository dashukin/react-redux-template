/**
 * @name path
 * @property resolve
 */

import webpackClientConfig from './webpack.config.babel';
import webpackServerConfig from './webpack.config.server.babel';

export default [
  webpackClientConfig,
  webpackServerConfig,
];
