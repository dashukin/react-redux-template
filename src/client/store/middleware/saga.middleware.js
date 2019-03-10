/**
 * Saga middleware
 */

import createSagaMiddleware from 'redux-saga';
import rootSaga from 'src/client/store/store.saga';

export const sagaMiddleware = createSagaMiddleware();

export const runSaga = () => {
	sagaMiddleware.run(rootSaga);
}