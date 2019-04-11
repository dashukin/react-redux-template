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

import {
  progressBarPlugin,
  definePlugin,
} from './plugins';

const config = {
  mode: 'development',
  devtool: 'eval-source-map',
  watch: true,
  plugins: [
    progressBarPlugin(),
    definePlugin({
      PRODUCTION: JSON.stringify(false),
    }),
  ],
};

export default config;
