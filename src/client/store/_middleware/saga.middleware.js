/**
 * Saga _middleware
 */

import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();

export const runSaga = saga => (
  sagaMiddleware.run(saga)
);
