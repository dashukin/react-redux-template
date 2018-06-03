/*
* Scenes export file
* */

// required for async/await and generators
import 'babel-polyfill';

import config			from './config';

import React			from 'react';
import ReactDOM			from 'react-dom';
import {Provider}		from 'react-redux';
import ApiService		from 'services/Api/ApiService';

// import scenes
import Scenes from 'scenes/Scenes/index';

// create store
import store from './store';

// configure Api Service
ApiService.configure({
	requestInterceptor: (request) => {

	},
	responseInterceptor: (response) => {

	},
	errorInterceptor: function (error) {

	}
});


// create root application
const App = () => {
	return (
		<Provider store={store}>
			<Scenes />
		</Provider>
	);
};

ReactDOM.render(<App />, document.getElementById(config.ROOT_ID));