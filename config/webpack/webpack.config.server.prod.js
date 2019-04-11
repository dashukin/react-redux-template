import {
  definePlugin,
  progressBarPlugin,
} from './plugins';

const config = {
  devtool: '',
  plugins: [
    progressBarPlugin({
      name: 'Server',
      production: true,
    }),
    definePlugin({
      PRODUCTION: JSON.stringify(true),
    }),
  ],
  watch: false,
};

export default config;
