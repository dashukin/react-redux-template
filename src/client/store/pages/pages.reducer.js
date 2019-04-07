/*
* Reducer
* */

import pagesConstants from './pages.constants';

// TODO: reconsider string constant usage
const example = (state = 'HOME', action) => {
	return pagesConstants[action.type] || state
};

export default example;