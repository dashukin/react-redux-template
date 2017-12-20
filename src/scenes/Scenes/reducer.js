/*
* Scenes reducer
* */

// import all reducers here

import constants from './constants';
const {
	FETCH_DATA,
	FETCH_DATA_SUCCESS,
	FETCH_DATA_ERROR,
	FETCH_DATA_STATUS_LOADING,
	FETCH_DATA_STATUS_LOADED,
	FETCH_DATA_STATUS_ERROR
} = constants;

const initialState = {
	readyState: undefined
};

export const scenesReducer = (state = initialState, action) => {
	console.warn(action);

	let readyState;

	switch (action.type) {
		case FETCH_DATA:
			readyState = FETCH_DATA_STATUS_LOADING;

			return {...state, readyState};
			break;

		case FETCH_DATA_SUCCESS:
			readyState = FETCH_DATA_STATUS_LOADED;

			return {...state, readyState};
			break;

		case FETCH_DATA_ERROR:
			readyState = FETCH_DATA_STATUS_ERROR;

			return {...state, readyState};
			break;

		default:
			return state;
	}
};

const reducers = {
	scenesReducer
	// spread all reducers here
};

export default reducers;