/**
 * Saga middleware
 */

import createSagaMiddleware from 'redux-saga';
import rootSaga from 'src/saga';

export const sagaMiddleware = createSagaMiddleware();

export const runSaga = () => {
	sagaMiddleware.run(rootSaga);
}