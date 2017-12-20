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

// import material-ui dependencies
import createMuiTheme		from 'material-ui/styles/createMuiTheme';
import {MuiThemeProvider}	from 'material-ui/styles';
import primary				from 'src/colorPallete/primary';
import error				from 'src/colorPallete/error';
import ascent				from 'src/colorPallete/ascent';

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

const muiTheme = createMuiTheme({
	palette: {
		primary: primary,
		secondary: ascent,
		error: error
	}
});

// create root application
const App = () => {
	return (
		<Provider store={store}>
			<MuiThemeProvider theme={muiTheme}>
				<Scenes />
			</MuiThemeProvider>
		</Provider>
	);
};

ReactDOM.render(<App />, document.getElementById(config.ROOT_ID));