/*
* Logger _middleware
* */

import { LOG_ACTIONS_ENABLED } from 'config/application';

// eslint-disable-next-line no-unused-vars
export const loggerMiddleware = store => next => (action) => {
  if (LOG_ACTIONS_ENABLED) {
    // eslint-disable-next-line no-console
    console.warn(action);
  }

  return next(action);
};
