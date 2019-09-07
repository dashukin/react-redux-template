/*
* Reducer
* */

import pageConstants from './page.constants';

export const defaultState = 'HOME';

// TODO: reconsider string constant usage
const page = (state = defaultState, action) => pageConstants[action.type] || state;

export default page;
