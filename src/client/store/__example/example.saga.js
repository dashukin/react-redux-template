/*
* Saga
* */

import { normalizeExampleData } from 'src/common/services/normalize';
import {
  takeLatest, all, call, put, fork, getContext,
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
    const services = yield getContext('services');
    const { exampleApiService } = services;
    const response = yield call(exampleApiService.fetchExampleData);
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
