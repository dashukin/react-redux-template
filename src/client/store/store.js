import { createStore, compose } from 'redux';
import { END } from 'redux-saga';
import get from 'lodash/get';
import rootReducer from './store.reducer';
import { createStoreMiddlewareEnhancer } from './store.middleware';
import { runSaga } from './_middleware/saga.middleware';
import rootSaga, { watchSaga } from './store.saga';

const storeMidlewareEnhancer = createStoreMiddlewareEnhancer();
const reduxDevtoolsCompose = get(window, '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__');

export const createAppStore = ({ preloadTasks = [], isSSR = false } = {}) => initialState => {
	const isBrowser = typeof window === 'object';
	const devToolsAvailable = isBrowser && (typeof reduxDevtoolsCompose === 'function');
	const composer = devToolsAvailable ? reduxDevtoolsCompose : compose;

	return new Promise((resolve, reject) => {
		const store = createStore(
			rootReducer,
			initialState,
			composer(storeMidlewareEnhancer)
		);

		// temporary debug
		if (!PRODUCTION && isBrowser) {
			window.store = store;
		}

		const mainTaskPromise = runSaga(rootSaga).done;
		const preloadTasksPromises = preloadTasks.map(task => task(store.dispatch));

		const allPromises = [mainTaskPromise, ...preloadTasksPromises];

		// terminate all forked tasks to make promises be resolved
		store.dispatch(END);

		Promise.all(allPromises)
			.then(() => {
				// Once all pending promises are resolved - reapply watchers for client side
				if (!isSSR) {
					runSaga(watchSaga);
				}
				resolve(store);
			}).catch(error => {
				reject(error);
		});
	});
};

