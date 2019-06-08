/*
* Saga
* */

import ApiService from 'src/common/services/api';
import { normalizeExampleData } from 'src/common/services/normalize';
import {
  takeLatest, all, call, put, fork,
} from 'redux-saga/effects';
import map from 'lodash/fp/map';
import exampleConstants from './example.constants';
import {
  fetchExampleSuccess,
  fetchExampleError,
} from './example.actions';

const {
  EXAMPLE_FETCH,
} = exampleConstants;

export function* fetchExampleData() {
  try {
    const response = yield call(ApiService.fetchData);
    const normalizedData = normalizeExampleData(response.data);

    yield put(fetchExampleSuccess(normalizedData));
  } catch (error) {
    yield put(fetchExampleError({ error }));
  }
}

export function* watchFetchExampleData() {
  yield takeLatest(EXAMPLE_FETCH, fetchExampleData);
}

export const watchers = [
  watchFetchExampleData,
  fetchExampleData,
];

export function* watchExample() {
  yield all(map(fork, watchers));
}

export function* checkSession() {
  try {
    yield call(fetchUserSession);
  } catch (e) {
    console.log(e);
  }
}

export function* fetchUserSession() {
  yield console.log('fetchUserSession called');
}
