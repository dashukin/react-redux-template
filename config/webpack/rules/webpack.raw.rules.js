import { rawLoader } from '../loaders/webpack.raw.loader';

export const inlineScriptsRules = () => ({
  test: /inline-scripts\/compiled/,
  use: [
    rawLoader(),
  ],
});
