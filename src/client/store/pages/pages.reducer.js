/*
* Reducer
* */

import * as pagesConstants from './pages.constants';

// TODO: reconsider string constant usage
const example = (state = 'HOME', action) => (
	pagesConstants[action.payload] || state
);

export default example;