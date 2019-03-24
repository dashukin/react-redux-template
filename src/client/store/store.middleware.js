import { applyMiddleware } from 'redux';
import {
	sagaMiddleware,
	loggerMiddleware,
	historyMiddleware
} from './_middleware';

export const createStoreMiddlewareEnhancer = () => applyMiddleware(
	sagaMiddleware,
	historyMiddleware,
	loggerMiddleware
);