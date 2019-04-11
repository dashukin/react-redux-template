/*
* Saga
* */

import ApiService from 'src/common/services/api';
import { normalizeData } from 'src/common/services/normalize';
import {
  takeLatest, call, put,
} from 'redux-saga/effects';
import exampleConstants from './example.constants';
import {
  fetchExampleSuccess,
  fetchExampleError,
} from './example.actions';

const {
  EXAMPLE_FETCH,
} = exampleConstants;

function* fetchExampleData() {
  try {
    const response = yield call(ApiService.fetchData);
    const normalizedData = normalizeData(response.data);

    yield put(fetchExampleSuccess(normalizedData));
  } catch (error) {
    yield put(fetchExampleError({ error }));
  }
}

function* watchFetchExampleData() {
  yield takeLatest(EXAMPLE_FETCH, fetchExampleData);
}

export function* watchExample() {
  yield watchFetchExampleData();
}
