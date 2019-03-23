/*
* Scenes export file
* */

// required for async/await and generators
import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// import scenes
import Scenes from './scenes/index';

// create store
import store from './store/store';

// create root application
const CreateApp = () => {
	return (
		<Provider store={store}>
			<Scenes />
		</Provider>
	);
};

ReactDOM.render(<CreateApp />, document.getElementById('application'));