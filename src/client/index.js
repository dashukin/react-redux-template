import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// import pages
import Scenes from './pages/index';

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