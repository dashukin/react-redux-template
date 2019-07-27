/*
* webpack js rule
* */

import { webpackBabelLoader } from '../loaders';

export default () => ({
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    webpackBabelLoader,
  ],
});
