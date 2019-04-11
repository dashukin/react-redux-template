import {
  definePlugin,
  progressBarPlugin,
  faviconsPlugin,
} from './plugins';

const config = {
  devtool: '',
  plugins: [
    progressBarPlugin({
      production: true,
    }),
    definePlugin({
      PRODUCTION: JSON.stringify(true),
    }),
    // Generate favicons use only for production build
    // until plugin has memory leaks on continuous rebuild
    faviconsPlugin(),
  ],
  watch: false,
};

export default config;
