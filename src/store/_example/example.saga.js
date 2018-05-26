/*
* Saga
* */

import ApiService from 'services/api/ApiService';
import {normalizeData} from 'services/normalize';
import {takeEvery, takeLatest, call, put} from 'redux-saga/effects';
import exampleConstants from './example.constants';
import {
	fetchExampleSuccess,
	fetchExampleError
} from './example.actions';

const {
	EXAMPLE_FETCH
} = exampleConstants;

const fetchExampleData = function* () {
	try {
		const response = yield call(ApiService.fetchData);
		const normalizedData = normalizeData(response.data);

		yield put(fetchExampleSuccess(normalizedData));
	} catch (error) {
		yield put(fetchExampleError({error}));
	}
};

const watchFetchExampleData = function* () {
	yield takeLatest(EXAMPLE_FETCH, fetchExampleData);
};

export const watchExample = function* () {
	yield watchFetchExampleData();
};