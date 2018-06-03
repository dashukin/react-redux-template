/*
* Logger middleware
* */

import config from 'src/config';

export const loggerMiddleware = store => next => action => {
	if (config.DEV === true) {
		console.warn(action);
	}

	return next(action);
};
