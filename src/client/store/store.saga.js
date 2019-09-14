/*
* Root saga
* */
import { fork, spawn, all } from 'redux-saga/effects';
import map from 'lodash/fp/map';
import { initI18n, watchI18n } from 'src/client/store/reducers/i18n/i18n.saga';
import { watchExample } from 'src/client/store/__example/example.saga';

export const startSagas = [
  initI18n,
];

export const watchSagas = [
  watchI18n,
  watchExample,
];

export function* watchSaga() {
  yield all(map(spawn, watchSagas));
}

export function* rootSaga() {
  yield spawn(watchSaga);
  yield all(map(fork, startSagas));
}
