/*
* Scenes actions
* */

import constants from './constants';

const {
	FETCH_DATA,
	FETCH_DATA_SUCCESS,
	FETCH_DATA_ERROR
} = constants;

export const fetchData = () => {
	return {
		type: FETCH_DATA
	};
};

export const fetchDataSuccess = () => {
	return {
		type: FETCH_DATA_SUCCESS
	};
};

export const fetchDataError = () => {
	return {
		type: FETCH_DATA_ERROR
	};
};
