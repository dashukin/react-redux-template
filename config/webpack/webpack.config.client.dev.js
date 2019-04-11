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
