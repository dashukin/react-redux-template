import { applyMiddleware } from 'redux';
import {
	sagaMiddleware,
	loggerMiddleware,
	historyMiddleware
} from './_middleware';

export const createStoreMiddlewareEnhancer = (...extraMiddleware) => (
	applyMiddleware(
		sagaMiddleware,
		historyMiddleware,
		loggerMiddleware,
		...extraMiddleware
	)
);