/*
* Reducer
* */

import pagesConstants from './pages.constants';

// TODO: reconsider string constant usage
const example = (state = 'HOME', action) => pagesConstants[action.type] || state;

export default example;
