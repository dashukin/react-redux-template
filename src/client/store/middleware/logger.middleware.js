/*
* Logger middleware
* */

import { LOG_ACTIONS_ENABLED } from 'config/application';
import Logger from 'src/common/utils/logger';

// eslint-disable-next-line no-unused-vars
export const loggerMiddleware = (store) => {
  const logger = new Logger({
    name: 'Actions middleware',
  });

  return next => (action) => {
    if (LOG_ACTIONS_ENABLED) {
      // eslint-disable-next-line no-console
      logger.info(action);
    }

    return next(action);
  };
};
