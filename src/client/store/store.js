import { createStore, compose } from 'redux';
import { connectRoutes } from 'redux-first-router';
import get from 'lodash/get';
import { routesMap } from '../routes';
import { createCombinedReducers } from './store.reducer';
import { createStoreMiddlewareEnhancer } from './store.middleware';
import { getSagaMiddleware } from './middleware/saga.middleware';
import { rootSaga } from './store.saga';

const reduxDevtoolsCompose = get(window, '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__');

/**
 *
 * @param options
 * @param {Object} options.services
 * @param {Object} options.history
 * @param {Boolean} [options.isSSR]
 * @param {Object} [options.initialState] - initial applciation state
 * @return {function(*=): Promise<any>}
 */
export const createAppStore = async (options = {}) => {
  try {
    const {
      isSSR = false,
      services,
      history,
      initialState,
    } = options;
    const devToolsAvailable = !isSSR && (typeof reduxDevtoolsCompose === 'function');
    const composer = devToolsAvailable ? reduxDevtoolsCompose : compose;

    const sagaMiddleware = getSagaMiddleware({ services });
    const {
      reducer: routerReducer,
      middleware: routerMiddleware,
      enhancer: routerEnhancer,
      thunk: routerTaskRunner,
    } = connectRoutes(routesMap, {
      createHistory: () => history,
      initialDispatch: true,
    });

    const storeMidlewareEnhancer = createStoreMiddlewareEnhancer(routerMiddleware, sagaMiddleware);

    const combinedReducers = createCombinedReducers({
      location: routerReducer,
    });

    const storeEnhancers = composer(routerEnhancer, storeMidlewareEnhancer);

    const store = createStore(
      combinedReducers,
      initialState,
      storeEnhancers,
    );

    const mainTaskPromise = sagaMiddleware.run(rootSaga).toPromise();

    const routeTasksPromise = routerTaskRunner(store);

    await Promise.all([mainTaskPromise, routeTasksPromise]);

    return store;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
