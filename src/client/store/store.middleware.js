import { applyMiddleware } from 'redux';
import {
	sagaMiddleware,
	loggerMiddleware,
} from './_middleware';

export const createStoreMiddlewareEnhancer = (...extraMiddleware) => (
	applyMiddleware(
		sagaMiddleware,
		loggerMiddleware,
		...extraMiddleware
	)
);