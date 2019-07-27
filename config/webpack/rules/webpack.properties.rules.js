import { propertiesLoader, jsonLoader } from '../loaders';

export const propertiesRules = () => ({
  test: /\.properties$/,
  use: [
    jsonLoader(),
    propertiesLoader(),
  ],
});
