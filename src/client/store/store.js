import { createStore, compose } from 'redux';
import { connectRoutes } from 'redux-first-router';
import { END } from 'redux-saga';
import get from 'lodash/get';
import { routesMap } from '../routes';
import { createCombinedReducers } from './store.reducer';
import { createStoreMiddlewareEnhancer } from './store.middleware';
import { getSagaMiddleware } from './_middleware/saga.middleware';
import rootSaga, { watchSaga } from './store.saga';

const reduxDevtoolsCompose = get(window, '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__');

export const createAppStore = (options = {}) => (initialState) => {
  const { preloadTasks = [], isSSR = false, services } = options;
  const isBrowser = typeof window === 'object';
  const devToolsAvailable = isBrowser && (typeof reduxDevtoolsCompose === 'function');
  const composer = devToolsAvailable ? reduxDevtoolsCompose : compose;

  const sagaMiddleware = getSagaMiddleware({ services });
  const { reducer, middleware, enhancer } = connectRoutes(routesMap);
  const storeMidlewareEnhancer = createStoreMiddlewareEnhancer(middleware, sagaMiddleware);

  const combinedReducers = createCombinedReducers({
    location: reducer,
  });

  const storeEnhancers = composer(enhancer, storeMidlewareEnhancer);

  return new Promise((resolve, reject) => {
    const store = createStore(
      combinedReducers,
      initialState,
      storeEnhancers,
    );

    // temporary debug
    if (!PRODUCTION && isBrowser) {
      window.store = store;
    }

    const mainTaskPromise = sagaMiddleware.run(rootSaga).toPromise();
    const preloadTasksPromises = preloadTasks.map(task => task(store.dispatch));

    const allPromises = [mainTaskPromise, ...preloadTasksPromises];

    // terminate all forked tasks to make promises be resolved
    store.dispatch(END);

    Promise.all(allPromises)
      .then(() => {
        // Once all pending promises are resolved - reapply watchers for client side
        if (!isSSR) {
          sagaMiddleware.run(watchSaga);
        }
        resolve(store);
      }).catch((error) => {
        reject(error);
      });
  });
};
