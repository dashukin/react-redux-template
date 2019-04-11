/**
 * @name path
 * @property resolve
 */

import webpackClientConfig from './webpack.config.client.babel';
import webpackServerConfig from './webpack.config.server.babel';

export default [
  webpackClientConfig,
  webpackServerConfig,
];
