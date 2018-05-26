/*
* Reducer
* */

import exampleConstants from './example.constants';

const {
	EXAMPLE_FETCH_SUCCESS,
	EXAMPLE_FETCH_ERROR
} = exampleConstants;

const initialState = {
	ids: [],
	error: undefined,
};

const example = (state = initialState, action) => {
	switch (action.type) {
		case EXAMPLE_FETCH_SUCCESS:
			const ids = get(action, 'payload.ids', []);

			return {...state, ids};

		case EXAMPLE_FETCH_ERROR:
			const error = get(action, 'payload');

			return {...state, error};

		default:
			return state;
	}
};

export default example;