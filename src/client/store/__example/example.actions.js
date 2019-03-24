/*
* Actions
* */

import exampleConstants from './example.constants';

const {
	EXAMPLE_FETCH,
	EXAMPLE_FETCH_SUCCESS,
	EXAMPLE_FETCH_ERROR
} = exampleConstants;

export const fetchExample = () => ({
	type: EXAMPLE_FETCH
});

export const fetchExampleSuccess = payload => ({
	type: EXAMPLE_FETCH_SUCCESS,
	payload,
});

export const fetchExampleError = error => ({
	type: EXAMPLE_FETCH_ERROR,
	payload: error
});