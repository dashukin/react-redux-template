import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import {
	APPLICATION_ELEMENT_ID
} from 'config/application';

import store from './store/store';

class Application extends PureComponent {
	render() {
		return (
			<Provider store={store}>
				<Scenes />
			</Provider>
		);
	}
};

Application.propTypes = {

};

export const renderApplication = () => {
	ReactDOM.render(<Application />, document.getElementById(APPLICATION_ELEMENT_ID));
}
