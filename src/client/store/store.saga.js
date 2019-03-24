/*
* Root saga
* */
import { fork } from 'redux-saga/effects';

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