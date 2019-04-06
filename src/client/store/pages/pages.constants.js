/*
* Constants
* */

import { NOT_FOUND } from 'redux-first-router';
import keymirror from 'keymirror';

const pagesConstants = keymirror({
	HOME: 'HomePage',
	[NOT_FOUND]: 'NotFoundPage'
});

export default pagesConstants;