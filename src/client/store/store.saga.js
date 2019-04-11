/*
* Root saga
* */
import { fork, all } from 'redux-saga/effects';
import map from 'lodash/fp/map';

const startSagas = [

];

function* rootSaga() {
  yield all(map(fork, startSagas));
}

const watchSagas = [

];

export function* watchSaga() {
  yield all(map(fork, watchSagas));
}


export default rootSaga;
