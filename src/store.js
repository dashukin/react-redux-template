/*
* Application store
* */


import {
	createStore,
	combineReducers,
	applyMiddleware,
	compose
}								from 'redux';
import createSagaMiddleware		from 'redux-saga';
import {default as reducers}	from './reducer';
import rootSaga					from './saga';

// import routing dependencies
import {
	routerReducer,
	routerMiddleware
}								from 'react-router-redux';

import history					from './history';
const historyMiddleware = routerMiddleware(history);

// create saga middleware
const sagaMiddleware = createSagaMiddleware();

// combine reducers
const combinedReducers = combineReducers({...reducers, router: routerReducer});

// compose middleware
const composedMiddleware = compose(applyMiddleware(sagaMiddleware), applyMiddleware(historyMiddleware));

// create store
const store = createStore(combinedReducers, composedMiddleware);

// run root saga
sagaMiddleware.run(rootSaga);

window.store = store;

export default store;