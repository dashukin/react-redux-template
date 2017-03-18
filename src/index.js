/*
* Scenes export file
* */

// required for async/await and generators
import 'babel-polyfill';

import config from './config';

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {default as reducers} from './reducer';
import rootSaga from './saga';

import AppRoot from './scenes/AppRoot';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(combineReducers(reducers), applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const ConnectedApp = () => {
	return (
		<Provider store={store}>
			<AppRoot />
		</Provider>
	);
};

ReactDOM.render(<ConnectedApp />, document.getElementById(config.rootId));