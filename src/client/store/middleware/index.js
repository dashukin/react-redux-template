/*
* Middleware export file
* */

import {applyMiddleware, compose} from 'redux';

import {sagaMiddleware, runSaga} from './saga.middleware';
import {loggerMiddleware} from './logger.middleware';
import historyMiddleWare from './history.middleware';

export const middleware = compose(applyMiddleware(sagaMiddleware, historyMiddleWare, loggerMiddleware));
export const runSagaMiddleware = runSaga;