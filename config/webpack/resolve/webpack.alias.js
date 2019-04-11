import path from 'path';
import { APP_SRC_DIR, CONFIG_DIR } from '../../environment';

export const alias = () => ({
  src: path.resolve(APP_SRC_DIR),
  components: path.resolve(APP_SRC_DIR, 'components'),
  constants: path.resolve(APP_SRC_DIR, 'constants'),
  data: path.resolve(APP_SRC_DIR, 'data'),
  services: path.resolve(APP_SRC_DIR, 'services'),
  selectors: path.resolve(APP_SRC_DIR, 'selectors'),
  utils: path.resolve(APP_SRC_DIR, 'utils'),
  config: path.resolve(CONFIG_DIR),
});
