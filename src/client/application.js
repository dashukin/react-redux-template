import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
	APPLICATION_ELEMENT_ID
} from 'config/environment';

// create store
import store from './store/store';

const createApplication = () => {
	return (
		<Provider store={store}>
			<Scenes />
		</Provider>
	);
};

const renderApplication = () => {
	const App = createApplication();

	ReactDOM.render(<App />, document.getElementById(APPLICATION_ELEMENT_ID));
}

export default renderApplication;
