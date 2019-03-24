/*
* Logger _middleware
* */

import { LOG_ACTIONS_ENABLED } from 'config/application';

export const loggerMiddleware = store => next => action => {
	if (LOG_ACTIONS_ENABLED) {
		console.warn(action);
	}

	return next(action);
};
